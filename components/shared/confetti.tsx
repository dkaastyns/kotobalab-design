"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  color: string
  size: number
  rotation: number
  duration: number
  delay: number
}

const COLORS = [
  "oklch(0.79 0.07 5)",   // primary pink
  "oklch(0.84 0.12 85)",  // streak orange
  "oklch(0.75 0.09 155)", // success green
  "oklch(0.72 0.09 230)", // info blue
  "oklch(0.68 0.12 280)", // violet
  "oklch(0.85 0.15 70)",  // yellow/gold
]

export function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const generated = Array.from({ length: 80 }).map((_, idx) => {
      const angle = Math.random() * Math.PI * 2 // random angle
      const velocity = 150 + Math.random() * 300 // random velocity
      const x = Math.cos(angle) * velocity
      // shoot upwards and spread
      const y = Math.sin(angle) * velocity - 150 
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      const size = 6 + Math.random() * 8
      const rotation = Math.random() * 360
      const duration = 1.8 + Math.random() * 1.5
      const delay = Math.random() * 0.15

      return {
        id: idx,
        x,
        y,
        color,
        size,
        rotation,
        duration,
        delay,
      }
    })
    setParticles(generated)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden flex items-center justify-center z-50">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: p.x,
            y: [0, p.y * 0.5, p.y, p.y + 350], // fall down simulating gravity
            scale: [0, 1.2, 1, 0.4],
            opacity: [1, 1, 0.9, 0],
            rotate: p.rotation + 720,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.1, 0.8, 0.25, 1], // quick throw, slow fall
          }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.45 ? "50%" : Math.random() > 0.5 ? "2px" : "0px", // mix of circles, rounded chips, squares
          }}
        />
      ))}
    </div>
  )
}
