import "./MainPage.css";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import services from "../services.json";
import Footer from "../components/Footer";

export default function Mainpage() {

  // document.querySelector(".feat:nth-child(2)").classList.add("flex-row-reverse"); 

  return (
    <div>
      <div className="navHero">
        <Navbar />
        <Hero />
      </div>
      <div className="featHead">
        <h2>Services Crafted Uniqu<span className="text-dark">ely for You: </span></h2>
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
