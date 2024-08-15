import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ContactPage.css";
import img2 from "../assets/contactUs3.jpg";
import img1 from "../assets/Life.png";

export default function ContactPage() {
    document.addEventListener('DOMContentLoaded', (event) => {
        document.querySelector('.content').classList.add('animated');
    });
    return (
        <div className="navHero contactpg">
            <Navbar />

            <div className="contactCont">
                <img src={img1} alt="img1" className="conImg1" />
                <div className="content">
                    <div className="timeline">
                        <div className="timeline-item left">
                            <div className="timeline-content">
                                <h3>Phone: </h3>
                                <p>+123 456 7890</p>
                            </div>
                        </div>
                        <div className="timeline-item right">
                            <div className="timeline-content">
                                <h3>Email</h3>
                                <p>contact@homeassist.com</p>
                            </div>
                        </div>
                        <div className="timeline-item left">
                            <div className="timeline-content">
                                <h3>Office Address</h3>
                                <p>123 HomeAssist St, City</p>
                            </div>
                        </div>
                    </div>
                </div>

                <img src={img2} alt="img2" className="conImg2" />
            </div>

            <Footer />
        </div>
    );
}
