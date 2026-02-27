import BackgroundEffects from '@/components/BackGroundEffects'
import CursorSpotlight from '@/components/CursorSpotlight'
import FloatingSocials from '@/components/FloatingSocials'
import Navbar from '@/components/Navbar'
import './globals.css'

export const metadata = {
  title: 'Mehraj Gaud – Portfolio',
  description: 'Full-Stack Developer & UI/UX Designer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <Navbar />
        <BackgroundEffects />
        <CursorSpotlight />
        <FloatingSocials />
        {children}
      </body>
    </html>
  )
}
