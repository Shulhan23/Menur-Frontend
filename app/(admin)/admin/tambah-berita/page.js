'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TambahBeritaPage() {
  const router = useRouter()
  const [judul, setJudul] = useState('')
  const [isi, setIsi] = useState('')
  const [gambar, setGambar] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!judul.trim() || !isi.trim()) {
      alert('Judul dan isi wajib diisi.')
      return
    }

    if (gambar && !gambar.type.startsWith('image/')) {
      alert('File gambar tidak valid.')
      return
    }

    const formData = new FormData()
    formData.append('judul', judul.trim())
    formData.append('isi', isi.trim())
    if (gambar) formData.append('gambar', gambar)

    setLoading(true)

    try {
      const csrf = await fetch('/laravel-api/sanctum/csrf-cookie', {
        credentials: 'include'
      })

      const token = decodeURIComponent(
        document.cookie
          .split('; ')
          .find((c) => c.startsWith('XSRF-TOKEN='))?.split('=')[1] || ''
      )

      const res = await fetch('/laravel-api/api/v1/berita', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'X-XSRF-TOKEN': token,
          Accept: 'application/json'
        },
        body: formData
      })

      if (res.ok) {
        router.push('/admin/dashboard')
      } else {
        const error = await res.json()
        alert(error.message || 'Gagal menambah berita.')
      }
    } catch (error) {
      console.error('Error saat kirim berita:', error)
      alert('Terjadi kesalahan server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-6 text-green-800">Tambah Berita Baru</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Judul</label>
          <input
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            className="w-full border px-3 py-2 rounded shadow-sm focus:ring-green-600 focus:border-green-600"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Isi</label>
          <textarea
            value={isi}
            onChange={(e) => setIsi(e.target.value)}
            className="w-full border px-3 py-2 rounded shadow-sm focus:ring-green-600 focus:border-green-600"
            rows="6"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Gambar (opsional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setGambar(e.target.files[0])}
            className="w-full"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-green-700 text-white px-5 py-2 rounded hover:bg-green-800 disabled:opacity-50"
        >
          {loading ? 'Menyimpan...' : 'Simpan Berita'}
        </button>
      </form>
    </div>
  )
}
