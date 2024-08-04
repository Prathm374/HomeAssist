import React from "react";
import "./Login.css";

export default function Login() {
  return (
    
    <div className="wrap">
    <form action="/" method="post">
        <h1 className="text-info">Login</h1>
        <div className="input-box">
            <input type="text" placeholder="Username" required />
            <i className='bx bxs-user'></i>
        </div>
     
        <div className="input-box">
            <input type="password" placeholder="Password" required />
            <i className='bx bxs-lock-alt'></i>
        </div>
        <div className="remember-forget">
            <label style={{color: "#54D1C9"}}><input type="checkbox" /> Remember Me </label>
            <a href="forgotpass.html">Forgot Password?</a>
        </div>
        <div className="register-link">
            <p>Dont have an account? <a href="signup.html">Register</a></p>
        </div>


        <button type="submit" className="btn btn-info btn1" disabled>Login</button>
    </form>
        </div>
  );
}

{/* <div className="formLog">
     <form action="/new" method="post">
        <label htmlFor="username">Username: </label>
      <input type="text" name="username" placeholder="johnDoe123" /><br />
     <label htmlFor="password">Password: </label>
<input type="password" name="password" placeholder="Password" />
       </form>
    </div> 
    */}

{/*
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
 submit button styles:  style="background-color: white; border-radius: 40px; color: #54D1C9;"
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
*/}
