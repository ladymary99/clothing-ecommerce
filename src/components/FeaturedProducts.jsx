import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import anime from "animejs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "../styles/FeaturedProducts.css";

const ProductCard = ({ image, price }) => {
  const buttonRef = useRef(null);

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
  }, []);

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={image} alt="Product" className="product-actual-image" />
        <span className="pricetag">{price}</span>
      </div>
      <div className="product-details">
        {" "}
        <button ref={buttonRef} className="add-to-cart-btn">
          Add to cart
        </button>
      </div>
    </div>
  );
};

const FeaturedProducts = () => {
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
      image: "/assets/picnews.jpg",
      price: "30$",
    },
    {
      id: 2,
      image: "/assets/pent1.jpg",
      price: "30$",
    },
    {
      id: 3,
      image: "/assets/pent2.jpg",
      price: "30$",
    },
    {
      id: 4,
      image: "/assets/pent3.jpg",
      price: "40$",
    },
    {
      id: 5,
      image: "/assets/pent4.jpg",
      price: "50$",
    },
    {
      id: 6,
      image: "/assets/pent6.jpg",
      price: "60$",
    },
  ];

  const animateSlideContent = (swiperInstance) => {
    if (!swiperInstance || !swiperInstance.slides) return;
    swiperInstance.slides.forEach((slide) => {
      const productCard = slide.querySelector(".product-card");
      const imageWrapper = slide.querySelector(".product-image-wrapper");
      const priceTag = slide.querySelector(".pricetag");
      const addToCartBtn = slide.querySelector(".add-to-cart-btn");
      const isVisible = slide.classList.contains("swiper-slide-active");

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
          });
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
      <div className="section-header-column">
        <div className="section-header">
          <h2 ref={headingRef} className="section-title">
            Best Seller Products
          </h2>
        </div>
      </div>
      <div className="container featured-products-layout">
        <div className="products-carousel-column">
          <Swiper
  modules={[Navigation]}
  navigation
  loop={true}               // ✅ loop enabled
  centeredSlides={false}
  spaceBetween={0}
  slidesPerView={1}         // ✅ BASE MUST BE 1
  breakpoints={{
    0: {
      slidesPerView: 1,     // 📱 mobile: FULL SCREEN
      spaceBetween: 0,
    },
    768: {
      slidesPerView: 2,     // tablet
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,     // desktop
      spaceBetween: 40,
    },
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
          <div className="carousel-underline" />
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
