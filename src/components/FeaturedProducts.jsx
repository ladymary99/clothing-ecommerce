import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import anime from 'animejs'
import { useInView } from 'react-intersection-observer'
import '../styles/FeaturedProducts.css'

const ProductCard = ({ image, price, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const buttonRef = useRef(null)
  
  useEffect(() => {
    if (inView) {
      // Animate button on hover
      const button = buttonRef.current
      
      const handleMouseEnter = () => {
        anime({
          targets: button,
          scale: 1.05,
          duration: 300,
          easing: 'easeOutQuad'
        })
      }
      
      const handleMouseLeave = () => {
        anime({
          targets: button,
          scale: 1,
          duration: 300,
          easing: 'easeOutQuad'
        })
      }
      
      if (button) {
        button.addEventListener('mouseenter', handleMouseEnter)
        button.addEventListener('mouseleave', handleMouseLeave)
      }
      
      return () => {
        if (button) {
          button.removeEventListener('mouseenter', handleMouseEnter)
          button.removeEventListener('mouseleave', handleMouseLeave)
        }
      }
    }
  }, [inView])

  return (
    <div 
      ref={ref}
      className={`product-card ${inView ? 'visible' : ''}`}
      style={{ 
        transitionDelay: `${index * 0.15}s` 
      }}
    >
      <div className="product-image">
        <img src={image} alt="Product" />
        <span className="price-tag">{price}</span>
      </div>
      <button ref={buttonRef} className="btn add-to-cart-btn">
        Add to cart
      </button>
    </div>
  )
}

const FeaturedProducts = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  useEffect(() => {
    if (inView) {
      // Animate heading when in view
      gsap.fromTo(
        headingRef.current,
        { 
          opacity: 0,
          x: -50
        },
        { 
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out'
        }
      )
    }
  }, [inView])
  
  const products = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '30$'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/1176618/pexels-photo-1176618.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '30$'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/1484771/pexels-photo-1484771.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '30$'
    }
  ]

  return (
    <section id="featured" className="featured-products section" ref={sectionRef}>
      <div className="container" ref={ref}>
        <div className="section-header">
          <h2 ref={headingRef} className="section-title">
            Best Seller Products
          </h2>
          <div className="section-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        <div className="products-grid">
          {products.map((product, index) => (
            <ProductCard 
              key={product.id} 
              image={product.image} 
              price={product.price}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts