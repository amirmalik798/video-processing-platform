// Stores active SSE connections:
// clientId -> response stream
const clients = new Map();

export const addClient = (clientId, res) => {
    clients.set(clientId, res);
};

export const removeClient = (clientId) => {
    clients.delete(clientId);
};

export const getClient = (clientId) => {
    return clients.get(clientId);
};

export const getClientCount = () => {
    return clients.size;
};