import "./Footer.css";
import { FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer>
      <div id="footlogo">&copy; 2024 | HomeAssist | All Rights Reserved</div>
      <div className="connectUs">
        <a href="https://github.com/Prathm374" target="_blank" rel="noreferrer">
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/prathmeshg374/"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedinIn />
        </a>
        <a
          href="https://www.instagram.com/prathmesh_374/"
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram />
        </a>
      </div>
    </footer>
  );
}
