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
      </div>
      <div className="collection-info">
        <h3 className="collection-title pixel-text">{title}</h3>
        <span className="collection-arrow">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
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
      image:
        "https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "jeans",
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/4210866/pexels-photo-4210866.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Shorts",
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800",
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
