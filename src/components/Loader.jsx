import { forwardRef, useEffect, useRef } from 'react'
import anime from 'animejs'
import '../styles/Loader.css'

const Loader = forwardRef((props, ref) => {
  const lettersRef = useRef(null)
  
  useEffect(() => {
    // Loader animation
    anime({
      targets: '.loader-letter',
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(100),
      easing: 'easeOutExpo',
      duration: 800
    })
    
    // For smoother looping effect
    anime({
      targets: '.loader-letter',
      translateY: [0, -10, 0],
      opacity: [1, 0.8, 1],
      easing: 'easeInOutSine',
      duration: 1200,
      loop: true,
      delay: anime.stagger(100),
    })
  }, [])

  return (
    <div ref={ref} className="loader">
      <div className="loader-content" ref={lettersRef}>
        <span className="loader-letter">C</span>
        <span className="loader-letter">O</span>
        <span className="loader-letter">N</span>
        <span className="loader-letter">L</span>
        <span className="loader-letter">I</span>
      </div>
    </div>
  )
})

export default Loader