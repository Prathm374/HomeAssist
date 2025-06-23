import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    services: [{
        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
            required: [true, 'Service ID is required']
        },
        cost: {
            type: Number,
            required: [true, 'Service cost is required'],
            min: [0, 'Cost cannot be negative']
        },
    }],
    status: {
        type: String,
        enum: ['In Progress', 'Completed', 'Cancelled'],
        default: 'In Progress',
        required: [true, 'Order status is required']
    },
    name: {
        type: String,
        required: [true, 'Customer name is required'],
        trim: true,
        maxlength: [100, 'Customer name cannot be more than 100 characters']
    },
    address: {
        type: String,
        required: [true, 'Customer address is required'],
        trim: true,
        maxlength: [200, 'Customer address cannot be more than 200 characters']
    },
    appointmentDate: {
        type: Date,
        required: [true, 'Appointment date is required'],
        validate: {
            validator: function(v) {
                return v > new Date();
            },
            message: props => `Appointment date ${props.value} must be in the future!`
        }
    },
    appointmentTime: {
        type: String,
        required: [true, 'Appointment time is required'],
        validate: {
            validator: function(v) {
                return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
            },
            message: props => `${props.value} is not a valid time format! Use HH:mm.`
        }
    },
    paymentMode: {
        type: String,
        enum: ['cash', 'credit', 'debit'],
        default: 'cash',
        required: [true, 'Payment mode is required']
    },
    totalCost: {
        type: Number,
        required: [true, 'Total cost is required'],
        min: [0, 'Total cost cannot be negative']
    }
}, { 
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
export default Order;