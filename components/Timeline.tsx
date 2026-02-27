'use client'

import { motion } from 'framer-motion'

type ExperienceItem = {
  role: string
  company: string
  period: string
  description: string[]
}

const experience: ExperienceItem[] = [
  {
    role: 'Web Developer (Intern)',
    company: 'Fly Affinity',
    period: 'May 2024 – July 2024',
    description: [
      'Increased user engagement by 66.67% through the design and optimization of interactive website pages.',
      'Implemented a dynamic, interactive map feature, enhancing navigation and location functionality.',
      'Conducted regular website audits, reducing page load time by 30% through code optimization.',
      'Regularly updated the website with new features and improvements based on user feedback and web development trends.',
    ],
  },
  {
    role: 'IT Associate',
    company: 'Fly Affinity',
    period: 'October2024 – February 2025',
    description: [
      'Implemented data-driven solutions to improve operational efficiency and troubleshoot IT-related issues.',
      'Developed automation scripts in Python to optimize internal workflows, reducing manual tasks by 30%.',
      'Assisted in maintaining web interfaces for machine learning-based solutions.',
    ],
  },
  {
    role: 'Technology Support Placement',
    company: 'McDonald’s',
    period: 'June 2025 – September 2025',
    description: [
      'Supported enterprise-level systems and point-of-sale infrastructure',
      'Assisted in resolving technical incidents across restaurant environments',
      'Gained exposure to large-scale IT operations and support processes',
    ],
  },
]

export default function Timeline() {
  return (
    <section id="experience" className="py-32 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-16">Experience</h2>

      <div className="relative border-l border-white/20">
        {experience.map((item, index) => (
          <motion.div
            key={item.role}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="ml-8 mb-16"
          >
            {/* Dot */}
            <span className="absolute -left-[6px] mt-2 h-3 w-3 rounded-full bg-indigo-500" />

            <h3 className="text-xl font-medium">
              {item.role}
              <span className="text-indigo-400"> @ {item.company}</span>
            </h3>

            <p className="text-sm text-gray-400 mt-1">{item.period}</p>

            <ul className="mt-4 space-y-2 text-gray-300">
              {item.description.map((point) => (
                <li key={point} className="leading-relaxed">
                  – {point}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
