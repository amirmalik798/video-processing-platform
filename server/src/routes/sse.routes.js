import express from 'express';
import { connectClient } from '../controllers/sse.controller.js';

const router = express.Router();

// Establish SSE connection
router.get('/events', connectClient);

export default router;