import "./LoginHero.css";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

export default function LoginHero() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup");
  };

  const handleScrollDown = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row align-items-center g-5 py-5">
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-info lh-1 mb-3">
              Elevate Your Home with HomeAssist
            </h1>
            <p className="lead text-light">
              At HomeAssist, we simplify home care. From cleaning and repairs to
              personalized assistance, our reliable professionals ensure your
              home is in top shape.
            </p>
            <p className="lead text-light">
              Let us handle the hard work, so you can focus on what matters
              most.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <button
                onClick={handleGetStarted}
                type="button"
                className="cssbuttons-io-button" >
                Get started
                <div className="icon">
                  <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </button>
              <button
                onClick={handleScrollDown}
                type="button"
                className="cssbuttons-io-button btn2"
              >
                Learn More
                <div className="icon">
                  <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
          <div className="col-10 col-sm-8 col-lg-6 heroLogin">
            <div className="loginForm">
              <Login />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
