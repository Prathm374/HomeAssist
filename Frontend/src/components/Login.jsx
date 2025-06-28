import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { useUserStore } from "../store/useUserStore.js";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginUser, loginWithGoogle } = useUserStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { success, message } = await loginUser({ username, password });
    if (success) {
      toast.success("Login successful!");
      navigate("/home");
    } else {
      toast.error(message || "Login failed");
    }
  };

  return (
    <div className="wrap">
      <form onSubmit={handleLogin}>
        <h1 className="text-gray-900">Login</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <i className="bx bxs-user"></i>
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <i className="bx bxs-lock-alt"></i>
        </div>
        <div className="oAuth">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              const token = credentialResponse.credential;
              await loginWithGoogle(token);
            }}
            onError={() => {
              alert("Google login failed.");
            }}
          />
        </div>
        <div className="register-link">
          <p>
            Don't have an account? <NavLink to={"/signup"}>Register</NavLink>
          </p>
        </div>
        <button type="submit" className="btn btn-info btn1">
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
