'use client'

import { motion } from 'framer-motion'

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute w-125 h-125 bg-purple-600/30 rounded-full blur-[120px]"
        animate={{
          x: [0, 100, -80, 0],
          y: [0, -120, 80, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ top: '10%', left: '15%' }}
      />

      <motion.div
        className="absolute w-100 h-100 bg-indigo-500/25 rounded-full blur-[120px]"
        animate={{
          x: [0, -120, 100, 0],
          y: [0, 100, -80, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ top: '50%', right: '10%' }}
      />

      <motion.div
        className="absolute w-[300px] h-[300px] bg-fuchsia-500/20 rounded-full blur-[100px]"
        animate={{
          x: [0, 60, -60, 0],
          y: [0, -60, 60, 0],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ bottom: '10%', left: '40%' }}
      />
    </div>
  )
}
