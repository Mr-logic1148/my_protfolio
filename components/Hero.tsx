'use client'

import { motion } from 'framer-motion'
import HeroHologram from './HeroHologram'
import ParallaxWrapper from './ParallaxWrapper'
import ScrollFloat from './ScrollFloat'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden perspective-[1200px]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(139,92,246,0.12),transparent_55%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <ScrollFloat>
          <ParallaxWrapper>
            <motion.div
              initial={{ opacity: 0, y: 60, rotateX: -6 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="transform-style-preserve-3d"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="text-center md:text-left">
                  <p className="mb-3 text-lg font-medium uppercase tracking-widest text-indigo-400">
                    Hey, I&apos;m
                  </p>

                  <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-500 bg-clip-text text-transparent animate-glow">
                    Mehraj Gaud
                  </h1>

                  <p className="mt-3 text-2xl font-medium text-main">
                    Computer Scientist
                  </p>

                  <p className="mt-6 max-w-xl mx-auto md:mx-0 text-lg text-muted">
                    I design and build high-end, scalable web experiences with modern technologies.
                  </p>
                </div>

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