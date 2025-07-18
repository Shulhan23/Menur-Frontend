'use client'

import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default function PetaDesa() {
  const [mapReady, setMapReady] = useState(false)
  const [isMapLocked, setIsMapLocked] = useState(true)
  const [showHint, setShowHint] = useState(true)
  const mapRef = useRef(null)
  const mapContainerRef = useRef(null)

  const CENTER_LAT = -7.009337
  const CENTER_LNG = 110.512058
  const ZOOM_LEVEL = 15

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    const map = L.map(mapContainerRef.current, {
      center: [CENTER_LAT, CENTER_LNG],
      zoom: ZOOM_LEVEL,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      zoomControl: true,
      tap: false
    })
    mapRef.current = map

    const street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    })

    const satellite = L.tileLayer(
      'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
      {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google Satellite'
      }
    )

    street.addTo(map)
    L.control.layers({ Street: street, Satellite: satellite }).addTo(map)

    const polygonCoords = [
  
    ]

    L.polygon(polygonCoords, {
      color: 'green',
      fillColor: '#aaffaa',
      fillOpacity: 0.5
    }).addTo(map)

    const markers = [

    ]

    markers.forEach(({ lat, lng, label }) => {
      L.marker([lat, lng]).addTo(map).bindPopup(`<b>${label}</b>`)
    })

    const resetButton = L.control({ position: 'topright' })
    resetButton.onAdd = function () {
      const btn = L.DomUtil.create('button', 'leaflet-bar leaflet-control')
      btn.innerHTML = '↺'
      btn.title = 'Kembali ke lokasi awal'
      btn.style.cursor = 'pointer'
      btn.style.width = '34px'
      btn.style.height = '34px'
      btn.onclick = () => {
        map.setView([CENTER_LAT, CENTER_LNG], ZOOM_LEVEL)
      }
      return btn
    }
    resetButton.addTo(map)

    setMapReady(true)
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    if (isMapLocked) {
      map.dragging.disable()
      map.scrollWheelZoom.disable()
      map.doubleClickZoom.disable()
    } else {
      map.dragging.enable()
      map.scrollWheelZoom.enable()
      map.doubleClickZoom.enable()
    }
  }, [isMapLocked])

  const handleDoubleClick = () => {
    setIsMapLocked(prev => !prev)
    if (showHint) setShowHint(false)
  }

  return (
    <div className="w-full mt-4 text-center relative">
      {showHint && (
        <p className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-80 text-sm text-gray-800 px-4 py-1 rounded shadow z-[500]">
          Ketuk dua kali pada peta untuk mengaktifkan interaksi
        </p>
      )}
      <div
        ref={mapContainerRef}
        id="petaDesa"
        onDoubleClick={handleDoubleClick}
        className="w-full h-[500px] rounded-xl cursor-pointer"
        style={{ zIndex: 0 }}
      />
    </div>
  )
}
