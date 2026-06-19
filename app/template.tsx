"use client"

import { motion } from "framer-motion"
import React from "react"

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        ease: [0.25, 1, 0.5, 1], // easeOutQuart for premium feel
        duration: 0.5,
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}
