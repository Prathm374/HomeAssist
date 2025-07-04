import { useEffect } from "react";
import "./LoginPage.css";
import LoginNav from "../components/LoginNav";
import Hero from "../components/LoginHero";
import services from "../services.json";
import Footer from "../components/Footer";
import defaultImg from "../assets/file.png";
import { useUserStore } from "../store/useUserStore.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function FeatureCard({ service, setActiveImg, defaultImg }) {
  return (
    <div
      className="feature-card"
      onMouseEnter={() => setActiveImg(service.image)}
      onMouseLeave={() => setActiveImg(defaultImg)}
    >
      <h3>{service.heading}</h3>
      <p>{service.altText}</p>
    </div>
  );
}

export default function LoginPage() {
  const token = useUserStore((state) => state.token);
  const [activeImg, setActiveImg] = useState(defaultImg);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token, navigate]);
  return (
    <div>
      <div className="navHero loginNavHero">
        <LoginNav />
        <Hero />
      </div>
      <div className="featHead">
        <h2 style={{ marginTop: "5%" }}>Comprehensive Services Tailored To Your Needs</h2>
        <div className="d-flex align-items-center justify-content-center features-row">
          <FeatureCard
            service={services[0]}
            setActiveImg={setActiveImg}
            defaultImg={defaultImg}
          />
          <FeatureCard
            service={services[1]}
            setActiveImg={setActiveImg}
            defaultImg={defaultImg}
          />
          <div className="center-image">
            <img src={activeImg} alt="Feature Center" />
          </div>
          <FeatureCard
            service={services[2]}
            setActiveImg={setActiveImg}
            defaultImg={defaultImg}
          />
          <FeatureCard
            service={services[3]}
            setActiveImg={setActiveImg}
            defaultImg={defaultImg}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
