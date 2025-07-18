import "./Whoop404.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { NavLink } from 'react-router-dom';

//Fix this issue if possible:
// {
//   import Parallax from "parallax-js";
//   import ReactDOM from "react-dom";

//   const scene = document.getElementById("scene");
//   const parallax = new Parallax(scene);
// }

export default function AboutPage() {
  return (
    <div className="error404">
      <Navbar />
      <section className="wrapper">
        <div className="container">
          <div id="scene" className="scene" data-hover-only="false">
            <div className="circle" data-depth="1.2"></div>

            <div className="one" data-depth="0.9">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>

            <div className="two" data-depth="0.60">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>

            <div className="three" data-depth="0.40">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>

            <p className="p404" data-depth="0.50">
              404
            </p>
            <p className="p404" data-depth="0.10">
              404
            </p>
          </div>

          <div className="text">
            <article>
              <p>
                Uh oh! Looks like you got lost. <br />
                Go back to the homepage if you dare!
              </p>
              <button><NavLink to="/home">i dare!</NavLink></button>
            </article>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
