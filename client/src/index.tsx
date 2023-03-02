import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import CreateBid from './pages/CreateBid';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import History from './pages/History';
import Auction from './pages/Auction';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/create-bid',
        element: <CreateBid />,
    },
    {
        path: '/history',
        element: <History />,
    },
    {
        path: '/auction',
        element: <Auction />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <ChakraProvider>
            <RouterProvider router={router} />
        </ChakraProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
