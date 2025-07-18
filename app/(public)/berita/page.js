export default async function BeritaPage() {
  const res = await fetch('/laravel-api/api/v1/berita', {
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!res.ok) {
    const text = await res.text()
    console.error('Respon error dari backend:', text)
    throw new Error('Gagal mengambil data berita')
  }

  const beritaList = await res.json()

  return (
    <div className="max-w-6xl mx-auto py-24 px-6 bg-gradient-to-b from-white to-white min-h-screen">
      <h1 className="text-3xl font-bold text-blue-900 mb-10 border-b-4 border-green-500 inline-block pb-2">
        Berita Desa
      </h1>

      <div className="grid gap-8 md:grid-cols-2">
        {beritaList.map((berita) => (
          <div
            key={berita.id}
            className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            {berita.gambar && (
              <img
                src={`/laravel-api/storage/${berita.gambar}`}
                alt={berita.judul}
                className="w-full h-56 object-cover"
              />
            )}
            <div className="p-5">
              <h2 className="text-xl font-semibold text-blue-900 mb-2">
                {berita.judul}
              </h2>
              <p className="text-gray-700 text-sm line-clamp-5">
                {berita.isi}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
