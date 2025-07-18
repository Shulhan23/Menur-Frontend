'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Profil', href: '/profil' },
    { label: 'Struktur', href: '/struktur' },
    { label: 'Administrasi', href: '/administrasi' },
    { label: 'Berita', href: '/berita' },
  ]

  return (
<header
  className={`fixed top-0 left-0 w-full z-50 transition-all
     ${scrolled || pathname !== '/'
      ? 'bg-blue-900 shadow-md' // Scroll ke bawah: semua perangkat -> biru
      : 'bg-blue-900 md:bg-white/10 md:backdrop-blur-md' // Di atas: HP -> biru, PC -> transparan
    }`}
    >
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
        {/* Logo dan Judul */}
        <div className="flex items-center gap-3">
          <Image
            src="/assets/logo-desa.png"
            alt="Logo Desa Menur"
            width={90}
            height={40}
            priority
          />
          <div className="flex flex-col text-white md:text-white">
            <h1 className="text-lg font-semibold">Desa Menur</h1>
            <p className="text-sm text-white md:text-gray-200">
              Website Resmi Pemerintah Desa Menur
            </p>
          </div>
        </div>

        {/* Tombol Hamburger (mobile only) */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-black focus:outline-none z-50"
        >
          <svg width="30" height="30" viewBox="0 0 24 24">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Navbar Desktop */}
        <nav className="hidden md:block">
          <ul className="flex gap-6 text-white font-medium">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`inline-block px-3 py-2 border-b-2 transition duration-200 ${
                      isActive
                        ? 'border-white'
                        : 'border-transparent hover:border-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      {/* Overlay for Sidebar */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* Sidebar Mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <span className="font-bold text-green-800">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="text-xl text-gray-700"
          >
            ✕
          </button>
        </div>
        <ul className="flex flex-col p-4 gap-3 text-green-800 font-semibold">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2 rounded-md transition duration-200 active:scale-95 ${
                    isActive
                      ? 'bg-green-100 border-l-4 border-green-600'
                      : 'hover:bg-green-50'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </header>
  )
}
