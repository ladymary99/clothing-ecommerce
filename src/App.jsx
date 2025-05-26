import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './components/Header'
import Hero from './components/Hero'
import FeaturedProducts from './components/FeaturedProducts'
import NewsSection from './components/NewsSection'
import Collections from './components/Collections'
import Footer from './components/Footer'
import Loader from './components/Loader'
import './styles/App.css'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

function App() {
  const appRef = useRef(null)
  const loaderRef = useRef(null)

  useEffect(() => {
    // Initialize page transition
    const loader = loaderRef.current
    const app = appRef.current

    gsap.to(loader, {
      opacity: 0,
      duration: 1,
      delay: 1,
      onComplete: () => {
        loader.style.display = 'none'
        
        // Reveal sections with stagger
        gsap.fromTo(
          '.reveal-section',
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            stagger: 0.2,
            ease: 'power2.out'
          }
        )
      }
    })

    // Set up scroll-based animations
    const sections = document.querySelectorAll('section')
    
    sections.forEach(section => {
      gsap.fromTo(
        section,
        { opacity: 0.6, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 30%',
            scrub: true
          }
        }
      )
    })

    return () => {
      // Clean up ScrollTrigger instances to prevent memory leaks
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <>
      <Loader ref={loaderRef} />
      <div ref={appRef} className="app">
        <Header />
        <main>
          <Hero />
          <FeaturedProducts />
          <NewsSection />
          <Collections />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App