import { Link } from "react-router-dom";
import { useState } from "react";
import { useUserStore } from "../store/useUserStore.js";
import { useNavigate } from "react-router-dom";

export default function SignupPage(){
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
  });
  const { signupUser } = useUserStore();
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { success, message } = await signupUser(newUser);
    if(success) {
      navigate("/home");
    } else {
      alert(message || "Registration failed");
    }
  };
  return (
    <div className="vh-100" style={{"overflow": "hidden"}}>
      <div
        className="container shadow-lg rounded-3 vstack gap-4"
        style={{ marginTop: "10%", width: "25%" }}
      >
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
    </div>
  );
};