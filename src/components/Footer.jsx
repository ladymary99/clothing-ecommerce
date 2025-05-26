import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import anime from "animejs";

import "../styles/Footer.css";

const Footer = () => {
  const emailInputRef = useRef(null);
  const submitBtnRef = useRef(null);

  useEffect(() => {
    // Animation for submit button
    const handleSubmitHover = () => {
      anime({
        targets: submitBtnRef.current,
        backgroundColor: ["#000000", "#ff3300"],
        duration: 300,
        easing: "easeOutQuad",
      });
    };

    const handleSubmitLeave = () => {
      anime({
        targets: submitBtnRef.current,
        backgroundColor: ["#ff3300", "#000000"],
        duration: 300,
        easing: "easeOutQuad",
      });
    };

    const submitBtn = submitBtnRef.current;
    if (submitBtn) {
      submitBtn.addEventListener("mouseenter", handleSubmitHover);
      submitBtn.addEventListener("mouseleave", handleSubmitLeave);
    }

    return () => {
      if (submitBtn) {
        submitBtn.removeEventListener("mouseenter", handleSubmitHover);
        submitBtn.removeEventListener("mouseleave", handleSubmitLeave);
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form submission animation
    gsap.to(emailInputRef.current, {
      borderColor: "#00cc66",
      duration: 0.3,
      yoyo: true,
      repeat: 1,
    });

    // Reset form
    emailInputRef.current.value = "";
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-column">
            <h3 className="footer-title">links</h3>
            <ul className="footer-links">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
              <li>
                <a href="#collections">Collections</a>
              </li>
              <li>
                <a href="#contact">Contact us</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Follow us</h3>
            <ul className="footer-links">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Contact</h3>
            <ul className="footer-links">
              <li>
                <a href="#">Privacy policy</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="mailto:info@clothingbrand.com">confi@clothing.com</a>
              </li>
              <li>paris, france</li>
            </ul>
          </div>

          <div className="footer-column footer-newsletter">
            <h3 className="footer-title">
              Submit Your Email for news and black friday shopping
            </h3>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                ref={emailInputRef}
                placeholder="Your email address"
                required
              />
              <button
                type="submit"
                className="btn submit-btn"
                ref={submitBtnRef}
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        <p className="footer-logo">CONFI</p>
      </div>
    </footer>
  );
};

export default Footer;
