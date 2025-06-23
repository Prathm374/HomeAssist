import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        maxlength: [50, 'Username cannot be more than 50 characters']
    },
    password: {
        type: String,
        required: [function(){ return this.loginType==='local'}, "Password is required"],
        minlength: [6, 'Password must be at least 6 characters long'],
        maxlength: [100, 'Password cannot be more than 100 characters'],
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    loginType: {
        type: String,
        enum: ['local', 'google'], 
        default: 'local'
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);

export default User;