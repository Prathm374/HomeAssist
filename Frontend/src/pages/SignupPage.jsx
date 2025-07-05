import { Link } from "react-router-dom";
import { useState } from "react";
import { useUserStore } from "../store/useUserStore.js";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignupPage() {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
  });
  const { signupUser } = useUserStore();
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { success, message } = await signupUser(newUser);
    if (success) {
      toast.success(message || "Registration successful!");
      navigate("/home");
    } else {
      toast.error(message || "Registration failed");
    }
  };
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
    <div className="col-sm-8 col-md-5 col-lg-4 col-xl-3">
      <div className="container shadow-lg rounded-3 vstack gap-4">
        <h2 className="pt-4 text-center">Sign Up</h2>
        <div className="form-floating ">
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="form-floating ">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
          <label htmlFor="password">Password</label>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
        <p className="text-center">
          Already have an account? <Link to="/">Log in</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
    </div>
  );
}
