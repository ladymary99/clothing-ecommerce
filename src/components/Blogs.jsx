// File: BlogSection.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Blogs.css";

const blogs = [
  {
    id: 1,
    image: "/assets/blog1.jpg",
    title: "The Rise of Minimal Luxury: Why Less Is More in Modern Fashion",
    subtitle:
      "In today’s fast-paced fashion world, the idea of luxury has shifted. Consumers are no longer impressed by loud logos or over-the-top designs. ",
  },
  {
    id: 2,
    image: "/assets/blog3.jpg",
    title: "Behind the Seams: The Story of Our Signature Fabrics",
    subtitle:
      "What makes a Vanté garment truly stand out? It's not just the silhouette — it’s what lies beneath the surface: our fabrics.",
  },
  {
    id: 3,
    image: "/assets/blog4.jpg",
    title: "How to Style Statement Neutrals Like a Fashion Insider",
    subtitle:
      "Neutral tones are the foundation of any sophisticated wardrobe — but styling them with impact is an art. ",
  },
];

gsap.registerPlugin(ScrollTrigger);

const BlogSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".blog-card",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section className="blog-section-wrapper" ref={sectionRef}>
      <h2 className="blog-title">From the Vanté Journal</h2>{" "}
      {/* Moved outside the grid */}
      <div className="blog-section">
        {blogs.map((blog) => (
          <div className="blog-card" key={blog.id}>
            <div className="image-container">
              <img src={blog.image} alt={blog.title} />
              <div className="hover-arrow">
                <img src="/assets/arrow.svg" alt="Arrow" />
              </div>
            </div>
            <div className="text">
              <h3>{blog.title}</h3>
              <p>{blog.subtitle}</p>
              <span className="author">by Jayson Burgess</span>
            </div>
            <button className="blog-btn">More</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
