import { Variants } from "framer-motion"

export const fadeInUp: Variants = {
  initial: {
    y: 20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1], // easeOut Cubic-like
    },
  },
}

export const fadeInDown: Variants = {
  initial: {
    y: -20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
}

export const staggerItem: Variants = {
  initial: {
    y: 15,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
    },
  },
}

export const scaleIn: Variants = {
  initial: {
    scale: 0.92,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
}

export const slideInFromRight: Variants = {
  initial: {
    x: "100%",
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 26,
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.35,
    },
  },
}

export const slideInFromBottom: Variants = {
  initial: {
    y: 40,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 240,
      damping: 24,
    },
  },
}

export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 1, 0.5, 1], // easeOutQuart
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: [0.25, 1, 0.5, 1],
    },
  },
}

export const tapScale = {
  whileHover: { scale: 1.02, transition: { duration: 0.1 } },
  whileTap: { scale: 0.98, transition: { duration: 0.1 } },
}

export const buttonScale = {
  whileHover: { scale: 1.04, y: -1 },
  whileTap: { scale: 0.96, y: 0 },
}
