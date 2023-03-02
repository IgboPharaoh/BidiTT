import { stringify } from 'query-string';

export interface Bid {
    id: number;
    time: number;
    name: string;
    hasPaid: boolean;
    amount: number;
    description: string;
}

export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface PostReq {
    submitNewBid: (name: string, description: string, amount: number) => Promise<SubmitBid>;
    getBid: (id: number) => Promise<Bid>;
    getBids: () => Promise<Bid[]>;
    request: <T extends object>(method: ApiMethod, path: string, args?: object) => Promise<T>;
    url: string;
    getPostsWebSocket: () => void;
    getAddress: () => any;
}

export interface SubmitBid {
    bid: Bid;
    paymentRequest: string;
}

class POSTSAPI implements PostReq {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    getAddress = async (): Promise<any> => {
        return this.request<any>('GET', '/new-address');
    };

    submitNewBid = (name: string, description: string, amount: number): Promise<SubmitBid> => {
        return this.request<{ bid: Bid; paymentRequest: string }>('POST', '/bids', { name, description, amount });
    };

    getBid = async (id: number): Promise<Bid> => {
        return this.request<Bid>('GET', `/bids/${id}`);
    };

    getBids = (): Promise<Bid[]> => {
        return this.request<Bid[]>('GET', '/bids');
    };

    getPostsWebSocket() {
        let wsUrl = this.url.replace('https', 'wss').replace('http', 'ws');
        return new WebSocket(`${wsUrl}/bids`);
    }

    request = async <T extends object>(method: ApiMethod, path: string, args?: object): Promise<T> => {
        let body = null;
        let query = '';
        const headers = new Headers();
        headers.append('Accept', 'application/json');

        if (method === 'POST' || method === 'PUT') {
            body = JSON.stringify(args);
            headers.append('Content-Type', 'application/json');
        } else if (args !== undefined) {
            query = `?${stringify(args as any)}`;
        }
        let params = { method, headers, body };

        return fetch(this.url + path + query, params)
            .then(async (res) => {
                console.log('params:', { params }, { path }, { query });
                if (!res.ok) {
                    let errorMessage;
                    try {
                        const errorBody = await res.json();
                        if (!errorBody.error) throw new Error(`there is no error body`);
                        errorMessage = errorBody.error;
                    } catch (error) {
                        throw new Error(`${res.status} ${res.statusText}`);
                    }
                    throw new Error(errorMessage);
                }
                return res.json();
            })
            .then((res) => res.data as T)
            .catch((e) => {
                console.error(`API error calling ${method} ${path}`, e, 'show me the error');
                throw e;
            });
    };
}

// export default new POSTSAPI(process.env.API_PATH as string);
export default new POSTSAPI('http://localhost:3001/api');
