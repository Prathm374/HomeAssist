import "./MainPage.css";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import services from "../services.json";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Mainpage() {
  const [data, setData] = useState();
  const getData = async () => {
    const response = await axios.get("http://localhost:5000/");
    setData(response.data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="navHero">
        <Navbar />
        <Hero />
      </div>
      <div className="featHead">
        {/* <h2>comprehensive services tailored to your needs</h2> */}
        <h2>{data}</h2>
        <div className="feat">
          {services.map((service) => {
            return (
              <Features
                heading={service.heading}
                services={service.services}
                key={service.id}
                text={service.text}
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
