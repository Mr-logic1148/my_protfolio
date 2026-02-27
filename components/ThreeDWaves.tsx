'use client'

import { motion } from 'framer-motion'

export default function ThreeDWaves() {
  return (
    <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
      <motion.svg
        viewBox="0 0 1200 800"
        className="w-full h-full"
        preserveAspectRatio="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <defs>
          <linearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {[...Array(8)].map((_, i) => (
          <motion.path
            key={i}
            d={`M 0 ${200 + i * 40} Q 300 ${150 + i * 20}, 600 ${200 + i * 30} T 1200 ${250 + i * 25}`}
            fill="none"
            stroke="url(#waveGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.svg>
    </div>
  )
}
