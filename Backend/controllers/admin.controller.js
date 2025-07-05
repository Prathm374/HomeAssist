import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import Service from "../models/service.model.js";

// 📊 Dashboard Stats 
// !! These stats are per month and wont consider the year. Please make sure to consider the year in the stats.
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments({
      status: { $ne: "Cancelled" },
    });
    const totalRevenue = await Order.aggregate([
      { $match: { status: { $ne: "Cancelled" } } },
      { $group: { _id: null, total: { $sum: "$totalCost" } } },
    ]);
    const topServices = await Order.aggregate([
      
      { $unwind: "$services" },
      { $group: { _id: "$services.service", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "services",
          localField: "_id",
          foreignField: "_id",
          as: "serviceDetails",
        },
      },
      { $unwind: "$serviceDetails" },
      {
        $project: {
          name: "$serviceDetails.name",
          count: 1,
        },
      },
    ]);
    const usersPerMonth = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const ordersPerMonth = await Order.aggregate([
      { $match: { status: { $ne: "Cancelled" } } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const now = new Date();
    const thisMonth = now.getMonth() + 1;
    const lastMonth = thisMonth === 1 ? 12 : thisMonth - 1;

    const usersByMonth = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
    ]);

    const ordersByMonth = await Order.aggregate([
      { $match: { status: { $ne: "Cancelled" } } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
    ]);
    const revenueByMonth = await Order.aggregate([
      { $match: { status: { $ne: "Cancelled" } } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$totalCost" },
        },
      },
    ]);

    const getMonthCount = (arr, month, prop = "count") =>
      arr.find((item) => item._id === month)?.[prop] || 0;

    const currentUserCount = getMonthCount(usersByMonth, thisMonth, "count");
    const prevUserCount = getMonthCount(usersByMonth, lastMonth, "count");
    const currentOrderCount = getMonthCount(ordersByMonth, thisMonth, "count");
    const prevOrderCount = getMonthCount(ordersByMonth, lastMonth, "count");
    const currentRevenue = getMonthCount(revenueByMonth, thisMonth, "total");
    const prevRevenue = getMonthCount(revenueByMonth, lastMonth, "total");

    const userGrowth =
      prevUserCount === 0
        ? 100
        : ((currentUserCount - prevUserCount) / prevUserCount) * 100;

    const orderGrowth =
      prevOrderCount === 0
        ? 100
        : ((currentOrderCount - prevOrderCount) / prevOrderCount) * 100;

    const revenueGrowth =
      prevRevenue === 0
        ? 100
        : ((currentRevenue - prevRevenue) / prevRevenue) * 100;

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        topServices,
        usersPerMonth,
        ordersPerMonth,
        userGrowth: Math.round(userGrowth),
        orderGrowth: Math.round(orderGrowth),
        topService: topServices[0] || null,
        revenueByMonth,
        revenueGrowth: Math.round(revenueGrowth),
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 👤 Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, role } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { username, role },
      { new: true, runValidators: true, select: "-password" }
    );
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Order.deleteMany({ user: req.params.id });
    res
      .status(200)
      .json({ success: true, message: "User and their orders deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📦 Orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("services.service")
      .populate("user", "username");
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    const {
      name,
      address,
      appointmentDate,
      appointmentTime,
      paymentMode,
      status,
      selectedServiceIds,
    } = req.body;
    const services = await Service.find({ _id: { $in: selectedServiceIds } });
    const serviceObjects = services.map((service) => ({
      service: service._id,
      cost: service.price,
    }));
    const totalCost = services.reduce((sum, s) => sum + s.price, 0);

    Object.assign(order, {
      name,
      address,
      appointmentDate,
      appointmentTime,
      paymentMode,
      status,
      services: serviceObjects,
      totalCost,
    });

    await order.save();
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🛠️ Services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ success: true, data: services });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      categoryId,
      categoryName,
      categoryImage,
    } = req.body;
    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      { name, description, price, categoryId, categoryName, categoryImage },
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
