'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ReactNode } from 'react'

export default function ScrollFloat({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll()

  const y = useTransform(scrollY, [0, 400], [0, -80])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.85])

  return (
    <motion.div style={{ y, opacity }}>
      {children}
    </motion.div>
  )
}
