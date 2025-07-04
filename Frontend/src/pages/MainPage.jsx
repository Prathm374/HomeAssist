import "./MainPage.css";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore.js";
import { useNavigate } from "react-router-dom";
import { useServiceStore } from "../store/useServiceStore.js";

export default function Mainpage() {
  const { user } = useUserStore();
  const { services, fetchServices } = useServiceStore();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

useEffect(() => {
  fetchServices();
    if (user?.role === "admin") {
      const modalShown = localStorage.getItem("adminModalShown");
      if (!modalShown) {
        setShowModal(true);
        localStorage.setItem("adminModalShown", "true");
      }
    }
  }, [user]);

  const handleChoice = (mode) => {
    if (mode === "admin") {
      navigate("/admin");
    } else {
      setShowModal(false);
    }
  };
  return (
    <div>
      <div className="navHero">
        <Navbar />
        <Hero />
      </div>
      <div className="featHead">
        <h2>Services Crafted Uniquely for You</h2>
        <div className="feat">
          {[...new Set(services.map((s) => s.categoryName))].map((catName) => {
            const categoryServices = services.filter((s) => s.categoryName === catName);
            const { categoryId, categoryName, categoryImage } = categoryServices[0];
            return (
              <Features
                heading={categoryName}
                services={categoryServices.map((s) => s.name)}
                key={categoryId}
                text={categoryServices.map((s) => s.description)}
                image={categoryImage}
              />
            );
          })}
        </div>
      </div>
      { showModal && (
      <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content shadow">
                <div className="modal-header border-0">
                  <h5 className="modal-title fw-bold">Welcome Admin</h5>
                </div>
                <div className="modal-body text-center">
                  <p className="mb-3">
                    Choose how you'd like to use the platform:
                  </p>
                  <div className="d-flex justify-content-center gap-3">
                    <button
                      className="btn btn-primary px-4"
                      onClick={(e) => {e.preventDefault(); handleChoice("admin");}}
                    >
                      Continue as Admin
                    </button>
                    <button
                      className="btn btn-outline-secondary px-4"
                      onClick={(e) => { e.preventDefault(); handleChoice("user");}}
                    >
                      Continue as User
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div> )}
      <Footer />
    </div>
  );
}
