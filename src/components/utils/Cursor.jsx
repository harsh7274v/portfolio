import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(true)
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)

  useEffect(() => {
    // Only enable custom cursor on desktop
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    setHidden(false)

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    const handleLinkHoverStart = () => setLinkHovered(true)
    const handleLinkHoverEnd = () => setLinkHovered(false)

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    
    // Add event listeners to all links and buttons
    const links = document.querySelectorAll('a, button')
    links.forEach((link) => {
      link.addEventListener('mouseenter', handleLinkHoverStart)
      link.addEventListener('mouseleave', handleLinkHoverEnd)
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      
      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleLinkHoverStart)
        link.removeEventListener('mouseleave', handleLinkHoverEnd)
      })
    }
  }, [])

  if (hidden) return null

  return (
    <>
      {/* Cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-primary-500 rounded-full z-[9999] pointer-events-none mix-blend-difference"
        style={{
          translateX: position.x - 6,
          translateY: position.y - 6
        }}
        animate={{
          scale: clicked ? 0.5 : 1
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      />
      
      {/* Cursor circle */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-primary-500 rounded-full z-[9998] pointer-events-none"
        style={{
          translateX: position.x - 20,
          translateY: position.y - 20
        }}
        animate={{
          scale: linkHovered ? 1.5 : 1,
          opacity: linkHovered ? 0.5 : 0.15
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1
        }}
      />
    </>
  )
}

export default Cursor