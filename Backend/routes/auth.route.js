import express from 'express';
import { login, register, me, google } from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', verifyToken, me);
router.post('/google', google);

export default router;