import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useInView } from "react-intersection-observer";
import "../styles/NewsSection.css";

const NewsSection = () => {
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const buttonRef = useRef(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      const tl = gsap.timeline();

      tl.fromTo(
        textRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          buttonRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        );
    }
  }, [inView]);

  return (
    <section id="news" className="news-section " ref={ref}>
      <div className="container">
        <div className="news-grid">
          <div className="news-content" ref={textRef}>
            <h2 className="news-title pixel-text">NEWS</h2>
            <p className="news-text">
              we bring confidence in every things you wear and make you feel
              like you are a super model
            </p>
            <button ref={buttonRef} className=" news-btn">
              shop now
            </button>
          </div>

          <div className="news-image" ref={imageRef}>
            <img src="/assets/picnews.jpg" alt="CONLI Pants" />
            <img src="/assets/picnews2.jpg" alt="CONLI Pants" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
