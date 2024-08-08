import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/login", { username, password });
            if (response.data.success) {
                toast.success("Login Success.");
                navigate("/home");                
            } else {
                toast.error("Invalid username or password. Please try again.");
            }
        } catch (error) {
            console.error("There was an error!", error);
            toast.error("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="wrap">
            <form onSubmit={handleLogin}>
                <h1 className="text-dark">Login</h1>
                <div className="input-box">
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required 
                    />
                    <i className='bx bxs-user'></i>
                </div>

                <div className="input-box">
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                    <i className='bx bxs-lock-alt'></i>
                </div>
                <div className="remember-forget">
                    <label style={{color: "#54D1C9"}}><input type="checkbox" /> Remember Me </label>
                    <a href="/">Forgot Password?</a>
                </div>
                <div className="register-link">
                    <p>Don't have an account? <NavLink to={"/signup"}>Register</NavLink></p>
                </div>
                <button type="submit" className="btn btn-info btn1">Login</button>
            </form>
            <ToastContainer />
        </div>
    );
}
