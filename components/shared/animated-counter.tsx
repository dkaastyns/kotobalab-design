"use client"

import { useEffect, useRef } from "react"
import { useInView, useMotionValue, useSpring } from "framer-motion"

interface AnimatedCounterProps {
  value: number
  duration?: number
  className?: string
}

export function AnimatedCounter({
  value,
  duration = 1.5, // slightly longer for a smooth effect
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
    ease: [0.25, 1, 0.5, 1], // easeOutQuart
  })

  useEffect(() => {
    if (inView) {
      motionValue.set(value)
    }
  }, [inView, value, motionValue])

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(
          Math.floor(latest)
        )
      }
    })
  }, [springValue])

  return <span ref={ref} className={className} />
}
