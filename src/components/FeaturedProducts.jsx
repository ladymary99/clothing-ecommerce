import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import anime from "animejs";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation"; // Keep this for styling the navigation buttons
// import "swiper/css/pagination"; // Pagination CSS import removed
// import required modules
import { Navigation } from "swiper/modules"; // Pagination module import removed
import "../styles/FeaturedProducts.css";

const ProductCard = ({ image, price }) => {
  const buttonRef = useRef(null);

  // ... existing code ... <useEffect for button animation>
  useEffect(() => {
    const button = buttonRef.current;
    const handleMouseEnter = () => {
      anime({
        targets: button,
        scale: 1.05,
        duration: 300,
        easing: "easeOutQuad",
      });
    };
    const handleMouseLeave = () => {
      anime({
        targets: button,
        scale: 1,
        duration: 300,
        easing: "easeOutQuad",
      });
    };
    if (button) {
      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (button) {
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={image} alt="Product" className="product-actual-image" />
        <span className="price-tag">{price}</span> {/* Price moved here */}
      </div>
      <div className="product-details">
        {" "}
        {/* This div now primarily for the button */}
        <button ref={buttonRef} className="btn add-to-cart-btn">
          Add to cart
        </button>
      </div>
    </div>
  );
};

const FeaturedProducts = () => {
  // ... existing code ... <refs, useEffect for heading animation, products array, animateSlideContent function>
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.5 }
      );
    }
  }, []);

  const products = [
    {
      id: 1,
      image:
        "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "30$",
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/1176618/pexels-photo-1176618.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "30$",
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/1484771/pexels-photo-1484771.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "30$",
    },
    {
      id: 4,
      image:
        "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "40$",
    },
    {
      id: 5,
      image:
        "https://images.pexels.com/photos/2048548/pexels-photo-2048548.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "50$",
    },
    {
      id: 6,
      image:
        "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "60$",
    },
  ];

  const animateSlideContent = (swiperInstance) => {
    if (!swiperInstance || !swiperInstance.slides) return;
    swiperInstance.slides.forEach((slide) => {
      const productCard = slide.querySelector(".product-card");
      const imageWrapper = slide.querySelector(".product-image-wrapper");
      const priceTag = slide.querySelector(".price-tag"); // Will be found within imageWrapper now
      const addToCartBtn = slide.querySelector(".add-to-cart-btn");
      const isVisible =
        slide.classList.contains("swiper-slide-active") ||
        slide.classList.contains("swiper-slide-visible");
      if (isVisible) {
        gsap.to(productCard, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.2,
        });
        if (imageWrapper)
          gsap.to(imageWrapper, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            delay: 0.4,
          });
        if (priceTag)
          gsap.to(priceTag, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            delay: 0.55,
          }); // Animation should still work
        if (addToCartBtn)
          gsap.to(addToCartBtn, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            delay: 0.7,
          });
      } else {
        gsap.set(productCard, { opacity: 0, y: 20 });
        if (imageWrapper) gsap.set(imageWrapper, { opacity: 0, y: 15 });
        if (priceTag) gsap.set(priceTag, { opacity: 0, y: 15 });
        if (addToCartBtn) gsap.set(addToCartBtn, { opacity: 0, y: 15 });
      }
    });
  };

  return (
    <section
      id="featured"
      className="featured-products section"
      ref={sectionRef}
    >
      <div className="container featured-products-layout">
        <div className="products-carousel-column">
          {/* ... existing code ... <Swiper component setup> */}
          <Swiper
            ref={swiperRef}
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            loop={false}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 40 },
            }}
            className="products-swiper"
            onSwiper={(swiper) => {
              setTimeout(() => animateSlideContent(swiper), 0);
            }}
            onSlideChangeTransitionEnd={(swiper) => {
              animateSlideContent(swiper);
            }}
          >
            {" "}
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                {" "}
                <ProductCard image={product.image} price={product.price} />{" "}
              </SwiperSlide>
            ))}{" "}
          </Swiper>
        </div>

        <div className="connecting-line-container">
          <div className="line"></div>
          <div className="arrow-right"></div>
        </div>

        <div className="section-header-column">
          <div className="section-header">
            <h2 ref={headingRef} className="section-title">
              Best
              <br />
              Seller
              <br />
              <span className="title-products-highlight">Products</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
