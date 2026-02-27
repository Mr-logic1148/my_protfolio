'use client'

import { motion } from 'framer-motion'
import {
  BarChart3,
  Brain,
  Code2,
  Layers,
  Wrench,
} from 'lucide-react'

type SkillCategory = {
  title: string
  icon: React.ElementType
  skills: string[]
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Machine Learning & Data Science',
    icon: Brain,
    skills: [
      'TensorFlow',
      'Scikit-learn',
      'Pandas',
      'NumPy',
      'Model Deployment',
      'Hyperparameter Tuning',
    ],
  },
  {
    title: 'Data Visualization',
    icon: BarChart3,
    skills: [
      'Tableau',
      'Power BI',
      'Matplotlib',
      'Seaborn',
    ],
  },
  {
    title: 'Programming Languages',
    icon: Code2,
    skills: [
      'Python',
      'SQL',
      'R',
      'Java',
      'Node.js',
    ],
  },
  {
    title: 'Testing & DevOps',
    icon: Wrench,
    skills: [
      'Jest',
      'CircleCI',
      'Nodemon',
      'Integration Testing',
      'Unit Testing',
    ],
  },
  {
    title: 'Software Engineering Practices',
    icon: Layers,
    skills: [
      'Data Preprocessing',
      'SDLC',
      'Agile Methodology',
      'Version Control (Git)',
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-16 text-center">
        Skills & Expertise
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            className="glass p-8 rounded-2xl shadow-lg hover:shadow-indigo-500/20 transition"
          >
            <div className="flex items-center gap-4 mb-6">
              <category.icon className="text-indigo-400" size={32} />
              <h3 className="text-xl font-medium">
                {category.title}
              </h3>
            </div>

            <ul className="flex flex-wrap gap-3">
              {category.skills.map((skill) => (
                <li
                  key={skill}
                  className="px-4 py-2 rounded-full text-sm bg-white/10 text-gray-200 backdrop-blur-md shadow-md"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
