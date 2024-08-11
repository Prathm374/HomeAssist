import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import LoginNav from "../components/LoginNav";
import Hero from "../components/LoginHero";
import services from "../services.json";
import Footer from "../components/Footer";
import pin from "../assets/pin-unscreen.gif";
import workerImg from "../assets/file.png";

export default function LoginPage() {
    // const [scrollPosition, setScrollPosition] = useState(0);
    // const [ftAnimation, setFtAnimation] = useState(false);
    // const handleScroll = () => {
    //   const position = window.scrollY;
    //   setScrollPosition(position);
    // };

    // useEffect(() => {
    //   window.addEventListener("scroll", handleScroll, { passive: true });

    //   return () => {
    //     window.removeEventListener("scroll", handleScroll);
    //   };
    // }, []);

    // useEffect(() => {
    //   const logNav = document.querySelector(".logNav");
    //   const navBtns = document.querySelector(".navBtns");

    //   if (logNav && navBtns) {
    //     if (scrollPosition >= window.innerHeight * 0.1) {
    //       logNav.classList.add("opacNav");
    //       navBtns.removeAttribute("hidden");
    //     } else {
    //       logNav.classList.remove("opacNav");
    //       navBtns.setAttribute("hidden", true);
    //     }
    //   }
    // }, [scrollPosition]);

    return (
        <div>
            <div className="navHero loginNavHero">
                <LoginNav />
                <Hero />
            </div>
            <div className="featHead">
                <h2>comprehensive services tailored to your needs</h2>
                {/* <div className="feat hammered-card">
        <img src={pin} alt="Svg" id="svgImg" />
          {services.map((service) => {
            return (
              <div className="container px-4 pt-2 col-lg-5 col-md-5 col-sm-11 my-5" id="abc">
                
                <h2 className="pb-2 d-flex justify-content-center border-bottom" id="head">
                  <img src={service.image} alt="Svg" id="svgImg" />
                  {service.heading}
                </h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
                  {service.altText}
                </div>
              </div>
            );
          })}
        </div> */}
                <div className="container logft mt-4">
                    <div className="corners c1">
                        <span>Home Care and Cleaning</span>
                    </div>
                    <div className="corners c2"><span>Systems & Repair Solutions</span>
                    </div>
                    <div className="corners c3"><span>Outdoor & Garden Services</span></div>
                    <div className="corners c4"><span>Personal & Pet Support</span></div>
                    <div className="circle d-flex align-items-center justify-content-center">
                        <img src={workerImg} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
