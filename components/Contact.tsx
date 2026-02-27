'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Send, Sparkles } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <section
      id="contact"
      className="relative py-40 px-6 max-w-xl mx-auto text-center overflow-hidden"
    >
      {/* ✨ Ambient Orbs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-semibold mb-6"
      >
        Let’s Build Something ✨
      </motion.h2>

      <p className="text-gray-400 mb-12 max-w-md mx-auto">
        Have an idea, a project, or just want to say hi?  
        I’m always open to meaningful conversations.
      </p>

      {/* Form Card */}
      <motion.form
        onSubmit={async (e) => {
          e.preventDefault()

          const form = e.currentTarget
          const formData = new FormData(form)
          const email = String(formData.get('email') || '')
          const message = String(formData.get('message') || '')

          const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, message }),
          })

          if (res.ok) setSent(true)
        }}


        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass relative p-10 space-y-6"
      >
        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <input
                name="email"
                required
                placeholder="Email"
                className="w-full bg-transparent border-b border-white/20 p-3
                           focus:outline-none focus:border-violet-400
                           transition"
              />

              <textarea
                name="message"
                required
                placeholder="Message"
                rows={4}
                className="w-full bg-transparent border-b border-white/20 p-3
                           focus:outline-none focus:border-violet-400
                           transition resize-none"
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="group mt-6 w-full flex items-center justify-center gap-2
                           px-6 py-4 rounded-xl
                           bg-gradient-to-r from-indigo-500 to-violet-500
                           font-medium"
              >
                Send Message
                <Send size={18} className="group-hover:translate-x-1 transition" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-4 py-12"
            >
              <motion.div
                initial={{ rotate: -20 }}
                animate={{ rotate: 0 }}
                transition={{ type: 'spring' }}
                className="w-16 h-16 rounded-full
                           bg-gradient-to-br from-violet-500 to-indigo-500
                           flex items-center justify-center"
              >
                <Sparkles />
              </motion.div>

              <p className="text-lg font-medium text-violet-400">
                Message sent successfully!
              </p>

              <p className="text-gray-400 text-sm">
                I’ll get back to you as soon as possible 🚀
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </section>
  )
}
