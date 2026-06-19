"use client"

import React from "react"
import { motion } from "framer-motion"

interface ScrollFadeUpProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  yOffset?: number
}

export function ScrollFadeUp({
  children,
  delay = 0,
  duration = 0.55,
  yOffset = 30,
}: ScrollFadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 1, 0.5, 1], // easeOutQuart
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}
