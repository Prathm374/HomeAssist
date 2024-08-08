import React, { useState, useEffect } from "react";
import "./MainPage.css";
import LoginNav from "../components/LoginNav";
import Hero from "../components/LoginHero";
import Features from "../components/Features";
import services from "../services.json";
import Footer from "../components/Footer";

export default function LoginPage() {
  // const [scrollPosition, setScrollPosition] = useState(0);

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
        <div className="feat">
          {services.map((service) => {
            return (
              <Features
                heading={""}
                services={""}
                key={service.id}
                text={""}
                image={service.image}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
