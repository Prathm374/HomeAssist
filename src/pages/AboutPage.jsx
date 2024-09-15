import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./AboutPage.css";

// export default function AboutPage() {
//     return (
//             <div className="navHero aboutpg">
//                 <Navbar />
//                 <main>
//         <section className="about-section">
//           <div className="container">
//             <h1 className="about-title">About HomeAssist</h1>
//             <div className="about-content">
//               <p>
//                 HomeAssist is your trusted partner in home services. We are dedicated to making your living space
//                 comfortable, clean, and well-maintained. Our team of professionals brings expertise and care to every
//                 task, ensuring your home receives the attention it deserves.
//               </p>
//               <p>
//                 Founded on the principles of reliability, quality, and customer satisfaction, HomeAssist has grown
//                 to become a leading provider of comprehensive home services. From cleaning and repairs to outdoor
//                 maintenance and personal assistance, we cover all aspects of home care.
//               </p>
//               <p>
//                 Our mission is to simplify your life by offering a one-stop solution for all your home service needs.
//                 With HomeAssist, you can enjoy peace of mind knowing that your home is in capable hands.
//               </p>
//             </div>
//           </div>
//         </section>
//         <section className="values-section">
//           <div className="container">
//             <h2 className="values-title">Our Values</h2>
//             <div className="row">
//               <div className="col-md-4">
//                 <div className="value-card">
//                   <h3>Quality</h3>
//                   <p>We strive for excellence in every service we provide, ensuring the highest standards of quality.</p>
//                 </div>
//               </div>
//               <div className="col-md-4">
//                 <div className="value-card">
//                   <h3>Reliability</h3>
//                   <p>You can count on us to be there when you need us, delivering consistent and dependable service.</p>
//                 </div>
//               </div>
//               <div className="col-md-4">
//                 <div className="value-card">
//                   <h3>Customer-Centric</h3>
//                   <p>Your satisfaction is our top priority. We tailor our services to meet your unique needs and preferences.</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//                 <Footer />
//             </div>
//     );
// }

export default function AboutPage() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main>
        <section className="hero-section">
          <div className="container">
            <h1 className="hero-title">About HomeAssist</h1>
            <p className="hero-subtitle">
              Your trusted partner in home services, dedicated to making your living space comfortable, clean, and well-maintained.
            </p>
          </div>
        </section>

        <section className="content-section">
          <div className="container flex-container">
            <div className="flex-item">
              <h2 className="section-title">Our Mission</h2>
              <p className="section-text">
                At HomeAssist, we strive to simplify your life by offering a one-stop solution for all your home service needs. 
                Our team of professionals brings expertise and care to every task, ensuring your home receives the attention it deserves.
                We aim to create a hassle-free experience for homeowners, providing reliable, high-quality services that save time and reduce stress.
              </p>
            </div>
            <div className="flex-item">
              <h2 className="section-title">Our Values</h2>
              <ul className="values-list section-text">
                <li>Quality: We strive for excellence in every service we provide, ensuring your complete satisfaction.</li>
                <li>Reliability: You can count on us to be there when you need us, delivering consistent and dependable service.</li>
                <li>Customer-Centric: Your satisfaction is our top priority. We tailor our services to meet your unique needs and preferences.</li>
                <li>Integrity: We operate with honesty and transparency in all our dealings, building trust with our clients.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="highlight-section">
          <div className="container">
            <h2 className="highlight-title">Why Choose HomeAssist?</h2>
            <div className="highlight-grid">
              <div className="highlight-card">
                <h3>Experienced Professionals</h3>
                <p>Our team consists of skilled experts with years of experience in their respective fields, ensuring top-notch service delivery.</p>
              </div>
              <div className="highlight-card">
                <h3>Comprehensive Services</h3>
                <p>From cleaning and repairs to outdoor maintenance and personal assistance, we offer a wide range of services to meet all your home care needs.</p>
              </div>
              <div className="highlight-card">
                <h3>Customized Solutions</h3>
                <p>We understand that every home is unique. That's why we offer tailored solutions to address your specific requirements and preferences.</p>
              </div>
              <div className="highlight-card">
                <h3>Reliable & Timely</h3>
                <p>We value your time and always strive to deliver our services promptly and efficiently, without compromising on quality.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}