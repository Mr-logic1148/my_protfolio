import FloatingSocials from '@/components/FloatingSocials'
import MorphicCrystalBackground from '@/components/MorphicCrystalBackground'
import Navbar from '@/components/Navbar'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="relative isolate">
        <MorphicCrystalBackground />
        <div className="relative z-10">
          <Navbar />
          <FloatingSocials />
          {children}
        </div>
      </body>
    </html>
  )
}