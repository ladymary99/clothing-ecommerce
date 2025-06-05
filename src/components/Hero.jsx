import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Stars } from "@react-three/drei";
import { gsap } from "gsap";
import anime from "animejs";
import WalkingCharacter from "./WalkingCharacter";
import ParticleSystem from "./ParticleSystem";
import BackgroundElements from "./BackgroundElements";
import StarField from "./StarField";
import CharacterTrail from "./CharacterTrail";
import "../styles/Hero.css";

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    // GSAP animations for hero content
    const tl = gsap.timeline({ delay: 1.5 });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

    // Anime.js animations for text effect
    anime({
      targets: ".pixel-letter",
      opacity: [0, 1],
      translateY: [20, 0],
      easing: "easeOutExpo",
      duration: 1000,
      delay: (el, i) => 2000 + i * 100,
    });

    // Parallax effect on scroll
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const heroElement = heroRef.current;

      if (heroElement) {
        // Move hero content based on scroll position for parallax
        const yPos = scrollTop * 0.4;
        gsap.to(heroElement.querySelector(".hero-content"), {
          y: yPos,
          ease: "none",
          duration: 0.1,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleModelLoaded = () => {
    setModelLoaded(true);
  };

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="container hero-container">
        <div className="hero-content">
          <h1 ref={titleRef} className="hero-title">
            confidence
          </h1>
          <div ref={textRef} className="hero-text">
            <p>
              we bring confidence in
              <br />
              every things you wear
              <br />
              and make you feel like
              <br />
              you are a super model
            </p>
          </div>
          <button ref={buttonRef} className="hero-btn">
            Shop now
          </button>
        </div>

        <div className={`hero-model ${modelLoaded ? "loaded" : ""}`}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            style={{ width: "100%", height: "100%" }}
          >
            {/* Enhanced Lighting */}
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <directionalLight position={[-10, -10, -5]} intensity={0.3} />
            <spotLight
              position={[0, 10, 0]}
              angle={0.3}
              penumbra={1}
              intensity={0.5}
              castShadow
            />

            {/* Background elements */}
            <ParticleSystem />
            <BackgroundElements />
            <StarField />

            {/* Main character */}
            <WalkingCharacter onLoaded={handleModelLoaded} />
            <CharacterTrail characterPosition={[0, -1, 0]} />

            {/* Built-in stars for extra sparkle */}
            <Stars
              radius={30}
              depth={30}
              count={300}
              factor={2}
              saturation={0}
              fade
              speed={0.3}
            />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={true}
              autoRotate={true}
              autoRotateSpeed={0.5}
            />
            <Environment preset="night" />
          </Canvas>
        </div>

        <div className="hero-scroll-indicator">
          <div className="scroll-line"></div>
          <div className="scroll-text">Scroll</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
