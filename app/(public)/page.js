'use client'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const PetaDesa = dynamic(() => import('@/components/public/PetaDesa'), { ssr: false })

export default function HomePage() {
  return (
    <main>
      {/* HERO SECTION */}
      <section
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/desa-padi.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center px-4">
          <div>
            <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">
              Selamat Datang di Website Desa Menur
            </h2>
            <p className="text-white text-lg md:text-xl max-w-2xl mx-auto">
              Kami hadir memberikan informasi yang cepat, transparan, dan terpercaya untuk seluruh warga desa.
            </p>
          </div>
        </div>
      </section>

      {/* INFO BOXES */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          {/* ... */}
        </div>
      </section>

      {/* PETA DESA */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Peta Desa Menur</h2>
          <PetaDesa />
        </div>
      </section>
    </main>
  )
}
