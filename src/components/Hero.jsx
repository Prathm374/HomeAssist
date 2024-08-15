import React from "react";
import img2 from "../assets/Screenshot 2024-08-15 185010.png";
import "./Hero.css";

export default function Hero() {
    return (
        <div>
            <div className="px-4 pt-5 mt-5 text-center">
                <h1 className="display-4 fw-bold text-light">
                Redefine Comfort with HomeAssist
                </h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4 text-light text fst-italic fw-medium">
                    At HomeAssist, we transform home care into a breeze. Whether it’s sparkling <span className="highlight">clean spaces</span>, <span className="highlight">swift repairs</span>, or <span className="highlight">tailored support</span>, our skilled team ensures your home stays exceptional.
                    </p>
                    <p className="lead mb-4 text-light">
                    We take care of the tough tasks, letting you enjoy life’s finer moments.
                    </p>
                </div>
                <div className="" style={{ maxHeight: "40vh" }}>
                    <div className="container px-5">
                        <img
                            src={img2}
                            className="img-fluid rounded-4 shadow-lg mb-4"
                            alt="HomeAssist Logo"
                            width="700"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
