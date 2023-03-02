import { EventEmitter } from 'events';

export interface Bid {
    id: number;
    time: number;
    name: string;
    hasPaid: boolean;
    amount: number;
    description: string;
}

class PostsManager extends EventEmitter {
    bids: Bid[] = [];

    // adds a bid to the list
    createbid(name: string, description: string, amount: number): Bid {
        const bid = {
            id: Math.floor(Math.random() * 1000000) + 1000,
            time: Date.now(),
            amount,
            name,
            description,
            hasPaid: false,
        };

        this.bids.push(bid);
        return bid;
    }

    getBid(id: number): Bid | undefined {
        return this.bids.find((p) => p.id === id);
    }

    // mark paid bids
    markBidPaid(id: number) {
        let updatedPost;
        this.bids = this.bids.map((p) => {
            if (p.id === id) {
                updatedPost = { ...p, hasPaid: true };
                return updatedPost;
            }
            return p;
        });

        if (updatedPost) {
            this.emit(updatedPost);
        }
    }

    // get paid bid
    getPaidBids() {
        return this.bids.filter((p) => p.hasPaid && true).sort((a, b) => b.time - a.time);
    }
}

export default new PostsManager();
