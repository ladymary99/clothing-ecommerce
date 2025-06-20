// src/components/Services.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Services.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    image: "/assets/icon1.svg",
    title: "Style Journal",
    description:
      "Explore the Vanté blog for behind-the-scenes looks, trend forecasts",
  },
  {
    image: "/assets/icon2.svg",
    title: "Design Consultation",
    description:
      "We offer expert styling and design guidance tailored to your identity",
  },
  {
    image: "/assets/icon3.svg",
    title: "Tailored Collections",
    description:
      "Limited, hand-picked seasonal collections designed exclusively ",
  },
  {
    image: "/assets/icon4.svg",
    title: "Worldwide Delivery",
    description:
      "From Paris to Tokyo Vanté pieces are shipped globally with premium packaging and express service.",
  },
];

const Services = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section className="services-section">
      <h2 className="servicetitle">Our Services</h2>
      <div className="services-grid" ref={sectionRef}>
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="icon">
              <img src={service.image} alt={service.title} />
            </div>
            <h3 className="title-service">{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
