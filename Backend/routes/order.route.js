import express from 'express';
import { createOrder, getUserOrders, updateOrder, cancelOrder, completeOrder } from '../controllers/order.controller.js';
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router();

router.post('/', verifyToken, createOrder);
router.put('/:id', verifyToken, updateOrder);
router.patch('/:id/cancel', verifyToken, cancelOrder);
router.patch('/:id/complete', verifyToken, completeOrder);
router.get('/', verifyToken, getUserOrders);

export default router;