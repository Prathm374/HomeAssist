import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import LoginNav from "../components/LoginNav";
import Hero from "../components/LoginHero";
import services from "../services.json";
import Footer from "../components/Footer";
import pin from "../assets/pin-unscreen.gif";
import workerImg from "../assets/file.png";
import { useUserStore } from "../store/useUserStore.js";
import { useNavigate } from "react-router-dom";
import { use } from "react";

export default function LoginPage() {
  const token = useUserStore((state) => state.token);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token]);
  return (
    <div>
      <div className="navHero loginNavHero">
        <LoginNav />
        <Hero />
      </div>
      {/* <div className="featHead">
                <h2>Comprehensive Services Tailored To Your Needs</h2>
                <div className="container logft mt-4 hammered-card">
                    {services.map((service) => {
                        return (
                            <div className={`corners c${service.id}`}>
                                <span>{service.heading}</span>
                                <p>{service.altText}</p>
                            </div>
                        );
                    })}
                    <div className="circle d-flex align-items-center justify-content-center">
                        <img src={workerImg} />
                    </div>
                </div>
            </div> 
             <Footer /> */}
    </div>
  );
}
