'use client'

import { motion } from 'framer-motion'
import HeroHologram from './HeroHologram'
import ParallaxWrapper from './ParallaxWrapper'
import ScrollFloat from './ScrollFloat'
import ThreeDWaves from './ThreeDWaves'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden perspective-[1200px]">
      <ThreeDWaves />

      {/* ✨ Ambient Hero Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(139,92,246,0.18),transparent_60%)]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6">
        <ScrollFloat>
          <ParallaxWrapper>
            <motion.div
              initial={{ opacity: 0, y: 60, rotateX: -6 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="z-10 transform-style-preserve-3d"
            >
              {/* 2-column layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* LEFT: Text */}
                <div className="text-center md:text-left">
                  <p className="text-indigo-400 text-lg font-medium mb-3 tracking-widest uppercase">
                    Hey, I'm
                  </p>
                  <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-500 bg-clip-text text-transparent animate-glow">
                    Mehraj Gaud
                  </h1>
                  <p className="mt-3 text-2xl text-gray-300 font-medium">
                    Full-Stack Developer
                  </p>
                  <p className="mt-6 text-gray-400 max-w-xl mx-auto md:mx-0 text-lg">
                    I design and build high-end, scalable web experiences with modern technologies.
                  </p>
                </div>

                {/* RIGHT: Hologram */}
                <div className="flex justify-center md:justify-end md:translate-y-4">
                  <HeroHologram src="/me.png" alt="Mehraj hologram" />
                </div>
              </div>
            </motion.div>
          </ParallaxWrapper>
        </ScrollFloat>
      </div>
    </section>
  )
}
