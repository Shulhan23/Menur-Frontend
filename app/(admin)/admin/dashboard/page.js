'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const router = useRouter()
  const [berita, setBerita] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/laravel-api/api/v1/check-auth', {
          credentials: 'include',
          headers: { Accept: 'application/json' }
        })

        if (!res.ok) {
          router.replace('/login')
          return
        }

        const beritaRes = await fetch('/laravel-api/api/v1/berita', {
          credentials: 'include',
          headers: { Accept: 'application/json' }
        })

        if (beritaRes.ok) {
          const data = await beritaRes.json()
          setBerita(data)
        } else {
          throw new Error('Gagal ambil data berita')
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  if (loading) return <p className="p-6 text-gray-600">Memuat...</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-green-800">Dashboard Berita</h1>
      {berita.length === 0 ? (
        <p className="text-gray-600">Belum ada berita.</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {berita.map((item) => (
            <li
              key={item.id}
              className="bg-white rounded shadow p-4 border border-gray-100"
            >
              <h2 className="font-semibold text-lg text-green-700">
                {item.judul}
              </h2>
              <p className="text-gray-700 mt-2 text-sm line-clamp-4">
                {item.isi}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
