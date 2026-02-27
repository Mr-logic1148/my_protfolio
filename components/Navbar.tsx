'use client'

import { motion } from 'framer-motion'

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
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="glass flex items-center gap-8 px-8 py-4 rounded-2xl">
        {links.map(link => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm text-gray-300 hover:text-white transition"
          >
            {link.label}
          </a>
        ))}

        <a
          href="/cv.pdf"
          className="ml-4 px-5 py-2 rounded-xl text-sm font-medium
                     bg-gradient-to-r from-indigo-500 to-violet-500
                     hover:scale-105 transition"
        >
          Download CV
        </a>
      </div>
    </motion.nav>
  )
}
