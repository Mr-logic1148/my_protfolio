'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { ReactNode } from 'react'

export default function ParallaxWrapper({ children }: { children: ReactNode }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [8, -8])
  const rotateY = useTransform(x, [-100, 100], [-8, 8])

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  return (
    <motion.div
      onMouseMove={handleMouse}
      style={{ rotateX, rotateY }}
      className="transition-transform duration-300"
    >
      {children}
    </motion.div>
  )
}
