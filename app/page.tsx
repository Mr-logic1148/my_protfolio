import Contact from '@/components/Contact'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Timeline from '@/components/Timeline'

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Hero />
      <Projects />
      <Timeline />
      <Skills />
      <Contact />
    </main>
  )
}