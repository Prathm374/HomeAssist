import express from 'express';
import { getAdminStats, getAllOrders, getAllServices, getAllUsers, updateOrder, updateService, updateUser, deleteOrder, deleteService, deleteUser } from '../controllers/admin.controller.js';
import { verifyToken, isAdmin } from '../middleware/verifyToken.js';

const router = express.Router();

router.use(verifyToken, isAdmin);

// Stats
router.get('/stats', getAdminStats);

// User management
router.get('/users', getAllUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Order management
router.get('/orders', getAllOrders);
router.put('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);

// Service management
router.get('/services', getAllServices);
router.put('/services/:id', updateService);
router.delete('/services/:id', deleteService);

export default router;