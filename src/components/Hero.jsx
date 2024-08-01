import React, { useState } from "react";
import img2 from "./2.png";
import "./Hero.css";

// Not Responsive

export default function Hero() {
  const [disp, setDisp] = useState(true);
  const [btnText, setBtnText] = useState("Get Started");

  const handleLogin = () => {
    setDisp(!disp);
    if(disp){
      setBtnText("< Back");
    }
    else{
      setBtnText("Get Started");
    }
  };

  return (
    <div>
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row align-items-center g-5 py-5">
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-info lh-1 mb-3">
              Elevate Your Home with HomeAssist
            </h1>
            <p className="lead text-light">
              At HomeAssist, we simplify home care. From cleaning and repairs to
              personalized assistance, our reliable professionals ensure your
              home is in top shape.
            </p>
            <p className="lead text-light">
              Let us handle the hard work, so you can focus on what matters
              most.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <button
                onClick={handleLogin}
                type="button"
                className="btn btn-primary btn-lg px-4 me-md-2"
              >
                {btnText}
              </button>
              <button
                type="button"
                className="btn btn-outline-info btn-lg px-4 text-light"
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="col-10 col-sm-8 col-lg-6 heroLogin">
            {/* Demo Image */}
            {disp && (
              <img
                src={img2}
                className="d-block mx-lg-auto img-fluid"
                id="heroImg"
                alt="HomeAssist Logo"
                loading="lazy"
              />
            )}
            {!disp && (
              <div className="container d-flex col-6 justify-content-around">
                <button className="btn btn-primary">Login</button>
                <button className="btn btn-outline-info">Login</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
