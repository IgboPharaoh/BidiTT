# BidiTT

What is it for?

BidiT is an application that is designed to help users easily created bids and leveraging the power of lightning to participate in an auction system with HTLCs.
This repository houses the codebase for the BidiT application both the client and server.
The client folder of the application houses the frontend section of the application, built with Reactjs while the server folder houses the backend section of the application built with nodejs.

# Config

The project depends on a few environment variables to be set.
The aplication backend connects to an lnd node and the required enviroment variables are   
*PORT: chosen port through which your application backend  can be accessed  
*API_PATH: Your client api path, usually in the format of http://localhost:3001/api  
*LND_GRPC_URL: Url of your bitcoin node  
*LND_MACAROON: base64 of your lnd macaroon file path  
*LND_TLS_CERT: base64 of your lnd tls cert
 The .envrc root file has a list of them.

## **How to run this repo locally?**

In the project directory:
npm install  
npm run dev:server to start the backend server


In your project/client directory:  
Run yarn install  
Run yarn start to start the client

