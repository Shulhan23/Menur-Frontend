'use client'
import Header from './header'
import Footer from './footer'
import { usePathname } from 'next/navigation'

export default function LayoutClient({ children }) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <>
      <Header />
      <div className={`${!isHome ? 'pt-[80px]' : ''}`}>
        {children}
      </div>
      <Footer />
    </>
  )
}
