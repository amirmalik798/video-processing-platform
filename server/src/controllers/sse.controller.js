import crypto from 'crypto';
import { 
    addClient,
    removeClient, 
    getClientCount } from '../store/sse.store.js';

const HEARTBEAT_INTERVAL = 30000;

export const connectClient = (req, res) => {
    res.setHeader(
        'Content-Type',
        'text/event-stream'
    );

    res.setHeader(
        'Cache-Control',
        'no-cache'
    );

    res.setHeader(
        'Connection',
        'keep-alive'
    );

    res.flushHeaders();

    const heartbeat = setInterval(() => {
        res.write(': ping\n\n');
    }, HEARTBEAT_INTERVAL);

    const clientId = crypto.randomUUID();

    addClient(clientId, res);

    console.log(`Client Connected: ${clientId}`);

    console.log(`Active Clients: ${getClientCount()}`);

    res.write(`event: connected\n` +
        `data: ${JSON.stringify({ clientId })}\n\n`
    );

    req.on('close', () => {
        clearInterval(heartbeat);
        
        removeClient(clientId);

        console.log(`Client Disconnected: ${clientId}`);

        console.log(`Active Clients: ${getClientCount()}`);
    });
};


