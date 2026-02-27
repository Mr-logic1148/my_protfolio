'use client'

import { motion } from 'framer-motion'
import { Activity, Database, ShieldCheck } from 'lucide-react'

type Project = {
  title: string
  subtitle: string
  description: string[]
  icon: React.ElementType
}

const projects: Project[] = [
  {
    title: 'DataPopulus - Country Data Visualization Platform',
    subtitle: 'Software Engineering Project',
    description: [
      'Built a full-stack web application using Node.js, Pug, and MySQL to visualise country-level data including GNP, cities, and languages.',
      'Used Docker for containerisation and implemented CI/CD pipelines with CircleCI and unit testing with Jest.',
      'Collaborated in an Agile team of 5 using GitHub, delivering the project on time with strong code quality.',
    ],
    icon: Database,
  },
  {
    title: 'COVID-19 Symptom Checker',
    subtitle: 'Machine Learning / Data Science Project',
    description: [
      'Developed a Naïve Bayes model to predict COVID-19 severity, achieving 93.75% accuracy with a low error rate.',
      'Performed data preprocessing including normalization, encoding categorical variables, and feature selection.',
      'Validated the model with external test inputs, demonstrating strong real-world prediction reliability.',
    ],
    icon: Activity,
  },
  {
    title: 'Machine Learning-based IDS',
    subtitle: 'Final Year Project',
    description: [
      'Designed and trained a CNN model using CICIDS-2017 and KDD Cup99 datasets to detect network intrusions.',
      'Achieved 92% accuracy in identifying threats such as DoS Hulk and DDoS attacks.',
      'Evaluated performance using F1 score, ROC curve, and detailed analytical reporting.',
    ],
    icon: ShieldCheck,
  },
]

export default function Projects() {
  return (
    <section id = "projects" className="py-32 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-16">Selected Projects</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ rotateX: 6, rotateY: -6, scale: 1.02 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="glass p-8 min-h-[320px] flex flex-col"
          >
            <project.icon className="text-indigo-400 mb-6" size={32} />

            <h3 className="text-xl font-medium mb-1">{project.title}</h3>
            <p className="text-sm text-indigo-300 mb-4">
              {project.subtitle}
            </p>

            <ul className="space-y-3 text-gray-300 text-sm leading-relaxed">
              {project.description.map((point) => (
                <li key={point}>– {point}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
