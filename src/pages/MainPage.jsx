import "./MainPage.css";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import services from "../services.json";
import Footer from "../components/Footer";

export default function Mainpage() {

  return (
    <div>
      <div className="navHero">
        <Navbar />
        <Hero />
      </div>
      <div className="featHead">
        <h2>Services Crafted Uniquel<span className="text-dark">y for You: </span></h2>
        <div className="feat">
          {services.map((service) => {
            return (
              <Features
                heading={service.heading}
                services={service.services}
                key={service.id}
                text={service.text}
                image={service.image}
                mpimg={service.mpimg}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
