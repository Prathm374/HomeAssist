import User from '../models/user.model.js';
import Order from '../models/order.model.js';
import Service from '../models/service.model.js';

export const createOrder = async (req, res) => {
    try {
        const { name, address, appointmentDate, appointmentTime, paymentMode, selectedServiceIds } = req.body;
        if(!selectedServiceIds || selectedServiceIds.length === 0) {
            return res.status(400).json({ success: false, message: "No services selected." });
        }
        const services = await Service.find({ _id: { $in: selectedServiceIds } });

        const serviceObjects = services.map(service => ({
            service: service._id,
            cost: service.price,
        }));
        const totalCost = services.reduce((sum, s) => sum + s.price, 0);
        const newOrder = await Order.create({
            user: req.user.id,
            name,
            address,
            appointmentDate,
            appointmentTime,
            paymentMode,
            services: serviceObjects,
            totalCost,
        });
        await User.findByIdAndUpdate(req.user.id, { $push: { orders: newOrder._id } });
        res.status(201).json({ success: true, message: "Order placed successfully", data: newOrder });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Server error" });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if(!order){
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        if(order.user.toString() !== req.user.id){
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }

        const { name, address, appointmentDate, appointmentTime, paymentMode, selectedServiceIds } = req.body;
        if(!selectedServiceIds || selectedServiceIds.length === 0) {
            return res.status(400).json({ success: false, message: "No services selected." });
        }

        const services = await Service.find({ _id: { $in: selectedServiceIds } });
        const serviceObjects = services.map(service => ({
            service: service._id,
            cost: service.price,
        }));
        const totalCost = services.reduce((sum, s) => sum + s.price, 0);

        order.name = name;
        order.address = address;
        order.appointmentDate = appointmentDate;
        order.appointmentTime = appointmentTime;
        order.paymentMode = paymentMode;
        order.services = serviceObjects;
        order.totalCost = totalCost;

        await order.save();
        res.status(200).json({ success: true, message: "Order updated successfully", data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Server error" });
    }
};

export const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if(!order) {
            return res.status(404).json({ success: false, message: "Order not found." });
        } 
        if(order.user.toString() !== req.user.id){
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }

        order.status = 'Cancelled';
        await order.save();
        res.status(200).json({ success: true, message: "Order cancelled successfully", data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Server error" });
    }
};

export const completeOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if(!order) {
            return res.status(404).json({ success: false, message: "Order not found." });
        } 
        if(order.user.toString() !== req.user.id){
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }

        order.status = 'Completed';
        await order.save();
        res.status(200).json({ success: true, message: "Order completed successfully", data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Server error" });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('services.service');
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Server error" });        
    }
};