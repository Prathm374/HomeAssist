import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        const newUser = new User({ username, password, role: 'user' });
        await newUser.save();
        res.status(201).json({ success:true, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({success:false, message: error.message || 'Server error' });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username }).select('+password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'Username does not exist.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({success: false, message: 'Invalid password.' });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {expiresIn: '1d'});
        res.json({ success: true, token, user: { id: user._id, username: user.username, role: user.role } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Server error' });
    }
};

export const me = async (req, res)=> {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Server error' });
    }
};

export const google = async (req, res)=>{
    try {
        const { credential } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        const { email } = payload;
        let user = await User.findOne({username: email});
        if(!user){
            user = await User.create({username: email, loginType: 'google'});
        }
        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {
            expiresIn: "1D"
        });
        res.status(200).json({success: true, token, user});
    } catch (error) {
        res.status(401).json({success: false, message: "Invalid Google token."});
    }
};