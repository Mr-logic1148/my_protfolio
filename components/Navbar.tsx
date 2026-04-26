'use client'

import { motion } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

const links = [
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-6 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="glass nav-panel-glow flex items-center gap-4 rounded-2xl px-5 py-3">
        <div className="flex items-center gap-5">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted transition hover:text-main"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="ml-2 h-6 w-px bg-white/10" />

        <ThemeToggle />

        <a
          href="/cv.pdf"
          className="nav-glow rounded-xl px-4 py-2 text-sm font-medium text-main transition hover:scale-105"
        >
          Download CV
        </a>
      </div>
    </motion.nav>
  )
}