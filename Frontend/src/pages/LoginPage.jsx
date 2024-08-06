import "./MainPage.css";
import LoginNav from "../components/LoginNav";
import Hero from "../components/Hero";
import Features from "../components/Features";
import services from "../services.json";
import Footer from "../components/Footer";

export default function LoginPage() {
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
                heading={service.heading}
                services={service.services}
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
