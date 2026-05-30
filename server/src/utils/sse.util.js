import { getClient } from '../store/sse.store.js';

const sendEvent = (clientId, event, data) => {
    const client = getClient(clientId);

    if (!client) return;

    client.write(
        `event: ${event}\n` + 
        `data: ${JSON.stringify(data)}\n\n`
    );
};

export const sendProgress = (clientId, progress) => {
    sendEvent(clientId, 'progress', { progress });
};

export const sendCompleted = (clientId) => {
    sendEvent(clientId, 'completed', { status: 'completed' });
};