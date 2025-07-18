import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-green-600 text-white py-12 text-sm">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        <div>
          <h4 className="text-yellow-300 font-bold mb-2">Pemerintah Desa Menur</h4>
          <p>Jalan Raya Menur No. 1</p>
          <p>Desa Menur, Kec. Mranggen</p>
          <p>Kabupaten Demak, Jawa Tengah</p>
          <p>Provinsi Jawa Tengah, 59567</p>
        </div>

        <div>
          <h4 className="text-yellow-300 font-bold mb-2">Hubungi Kami</h4>
          <p>📞 0821-2345-6789</p>
          <p>✉ desa.menur@demakkab.go.id</p>
          <div className="flex items-center gap-4 mt-2">
          </div>
        </div>

        <div>
          <h4 className="text-yellow-300 font-bold mb-2">Nomor Telepon Penting</h4>
          <ul className="list-none space-y-1">
            <li>Ahmad Siswoto / Kades Menur</li>
            <li>Ambulan Desa: 0812-xxxx-xxxx</li>
          </ul>
        </div>

        <div>
          <h4 className="text-yellow-300 font-bold mb-2">Jelajahi</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Website Kemendesa</a></li>
            <li><a href="#" className="hover:underline">Website Kemendagri</a></li>
            <li><a href="#" className="hover:underline">Website Kabupaten Demak</a></li>
            <li><a href="#" className="hover:underline">Cek DPT Online</a></li>
          </ul>
        </div>

      </div>

      <div className="text-center mt-10 pt-4 border-t border-white/30 text-xs">
        © 2025 Digital Desa Menur. Semua Hak Dilindungi.
      </div>
    </footer>
  )
}
