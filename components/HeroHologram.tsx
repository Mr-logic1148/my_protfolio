'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

type HeroHologramProps = {
  src: string
  alt: string
}

export default function HeroHologram({ src, alt }: HeroHologramProps) {
  const { scrollY } = useScroll()

  // Disappear as you scroll down
  const opacity = useTransform(scrollY, [0, 240], [1, 0])
  const y = useTransform(scrollY, [0, 240], [0, -40])
  const scale = useTransform(scrollY, [0, 240], [1, 0.92])

  return (
    <motion.div
      style={{ opacity, y, scale }}
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 1, ease: 'easeOut' }}
      className="relative mx-auto mt-10 w-[240px] sm:w-[280px] md:w-[320px]"
    >
      {/* Glow aura */}
      <div className="absolute inset-0 -z-10 rounded-[32px] blur-2xl bg-violet-500/25" />

      {/* Hologram frame */}
      <div className="relative rounded-[32px] border border-white/15 bg-white/5 backdrop-blur-xl shadow-[0_20px_70px_rgba(124,58,237,0.28)] overflow-hidden">
        {/* Image */}
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={src}
            alt={alt}
            fill
            priority
            className="object-cover object-top"
          />
        </div>

        {/* Scanlines */}
        <div className="pointer-events-none absolute inset-0 hologram-scanlines" />

        {/* Soft gradient sheen */}
        <div className="pointer-events-none absolute inset-0 hologram-sheen" />

        {/* Moving scan beam */}
        <div className="pointer-events-none absolute inset-0 hologram-beam" />
      </div>

      {/* Floating effect */}
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[70%] h-8 blur-xl bg-indigo-500/25 rounded-full"
        animate={{ opacity: [0.4, 0.75, 0.4], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}
