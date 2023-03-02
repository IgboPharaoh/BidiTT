import { Invoice, Readable } from '@radar/lnrpc';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import expressWs from 'express-ws';
import env from './env';
import { initNode, node } from './node';
import postsManager from './bids';

const app = expressWs(express()).app;
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

// Routes
app.ws('api/bids', (ws) => {
    postsManager.getPaidBids().forEach((post) => {
        console.log(post);
        ws.send(
            JSON.stringify({
                type: 'post',
                data: post,
            })
        );
    });

    const postListener = (post: any) => {
        ws.send(
            JSON.stringify({
                type: 'post',
                data: post,
            })
        );
    };
    postsManager.addListener('post', postListener);

    const pingInterval = setInterval(() => {
        ws.send(JSON.stringify({ type: 'ping' }));
    }, 10000);

    ws.addEventListener('close', () => {
        postsManager.removeListener('post', postListener);
        clearInterval(pingInterval);
    });
});

// generate new address
app.get('/api/new-address', (req, res) => {
    const address = node.newAddress();
    res.json({
        data: address,
    });
});

// check

// paid bids
app.get('/api/bids', (req, res) => {
    res.json({ data: postsManager.getPaidBids() });
});

// specific bis
app.get('/api/bids/:id', (req, res) => {
    const post = postsManager.getBid(parseInt(req.params.id, 10));

    if (post) {
        res.json({ data: post });
    } else {
        res.status(404).json({ error: `No post found with ID ${req.params.id}` });
    }
});

// create new bid
app.post('/api/bids', async (req, res, next) => {
    try {
        const { name, description, amount } = req.body;
        if (!name || !amount) {
            throw new Error('Name and content fields are required to make a post');
        }

        const bid = postsManager.createbid(name, description, amount);
        const invoice = await node.addInvoice({
            memo: `new bid created #${bid.id}`,
            value: amount,
            expiry: '120',
        });

        res.json({
            data: {
                bid,
                paymentRequest: invoice.paymentRequest,
            },
        });
    } catch (error) {
        next(error);
    }
});

// first route
app.get('/', async (req, res, next) => {
    res.send('You need to load the webpack-dev-server page, not the server page!');
});

// initialize node and server
console.log('Initializing lightnind node');
initNode().then(() => {
    console.log('lightning node initialized');
    console.log('Starting server.........');
    app.listen(env.PORT, () => {
        console.log(`[server]: Server is running at http://localhost:${env.PORT} `);
    });

    // Subscribe to all invoices, mark posts as paid
    const stream = node.subscribeInvoices() as any as Readable<Invoice>;
    stream.on('data', (chunk) => {
        // Skip unpaid / irrelevant invoice updates
        if (!chunk.settled || !chunk.amtPaidSat || !chunk.memo) return;

        // Extract post id from memo, skip if we can't find an id
        const id = parseInt(chunk.memo.replace('new bid created #', ''), 10);
        if (!id) return;

        // Mark the invoice as paid!
        postsManager.markBidPaid(id);
    });
});
