"use client"

import React, { useRef, useState } from "react"
import { motion } from "framer-motion"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  magneticPull?: number // Adjust the strength of the magnetic effect
}

export function MagneticButton({
  children,
  className = "",
  magneticPull = 0.2, // standard pull
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current!.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * magneticPull, y: middleY * magneticPull })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative inline-block w-full sm:w-auto ${className}`}
    >
      {children}
    </motion.div>
  )
}
