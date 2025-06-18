import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import anime from "animejs";
import { useInView } from "react-intersection-observer";
import "../styles/Collections.css";

const CollectionCard = ({ image, title, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cardRef = useRef(null);

  useEffect(() => {
    if (inView && cardRef.current) {
      // Animate card when in view
      anime({
        targets: cardRef.current,
        opacity: [0, 1],
        translateY: [50, 0],
        easing: "easeOutExpo",
        duration: 1000,
        delay: index * 200,
      });

      // Set up hover animations
      const card = cardRef.current;

      const handleMouseEnter = () => {
        anime({
          targets: card.querySelector(".collection-title"),
          translateY: -10,
          duration: 300,
          easing: "easeOutQuad",
        });

        anime({
          targets: card.querySelector(".collection-arrow"),
          translateX: 5,
          opacity: 1,
          duration: 300,
          easing: "easeOutQuad",
        });

        anime({
          targets: card.querySelector("img"),
          scale: 1.05,
          duration: 600,
          easing: "easeOutQuad",
        });
      };

      const handleMouseLeave = () => {
        anime({
          targets: card.querySelector(".collection-title"),
          translateY: 0,
          duration: 300,
          easing: "easeOutQuad",
        });

        anime({
          targets: card.querySelector(".collection-arrow"),
          translateX: 0,
          opacity: 0.7,
          duration: 300,
          easing: "easeOutQuad",
        });

        anime({
          targets: card.querySelector("img"),
          scale: 1,
          duration: 600,
          easing: "easeOutQuad",
        });
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [inView, index]);

  return (
    <div ref={cardRef} className="collection-card">
      <div className="collection-image">
        <img src={image} alt={title} />
        <h3 className="collection-title">{title}</h3>

        {/* <img src="/assets/arrow.svg" alt="arrow" className="collection-arrow" /> */}
      </div>
    </div>
  );
};

const Collections = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      // Animate title when in view
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [inView]);

  const collections = [
    {
      id: 1,
      image: "/assets/pent5.jpg",
      title: "jeans",
    },
    {
      id: 2,
      image: "/assets/pent3.jpg",
      title: "Shorts",
    },
    {
      id: 3,
      image: "/assets/pent7.jpg",
      title: "jackets",
    },
  ];

  return (
    <section
      id="collections"
      className="collections-section section"
      ref={sectionRef}
    >
      <div className="container" ref={ref}>
        <h2 ref={titleRef} className="section-title collections-title">
          Collections
        </h2>

        <div className="collections-grid">
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              image={collection.image}
              title={collection.title}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
