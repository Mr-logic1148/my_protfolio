'use client'

import { useRef } from 'react'

type MagneticButtonProps = {
  label: string
}

export default function MagneticButton({ label }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | null>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`
  }

  const reset = () => {
    if (ref.current) {
      ref.current.style.transform = 'translate(0, 0)'
    }
  }

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className="glass px-8 py-4 rounded-xl transition-transform"
    >
      {label}
    </button>
  )
}
