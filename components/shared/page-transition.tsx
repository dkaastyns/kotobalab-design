"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { pageTransition } from "@/lib/animations"

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex min-w-0 flex-1 flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
