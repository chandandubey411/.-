import React from 'react'
import { Link } from 'react-router-dom'

/* Badge color per status */
const statusColor = {
  'FOR SALE': 'bg-emerald-500',
  'FOR RENT': 'bg-sky-500',
}

/* Badge color per type */
const typeBadge = {
  Apartment: 'bg-gray-900/75',
  Villa: 'bg-violet-700/80',
  Plot: 'bg-amber-600/85',
  Commercial: 'bg-sky-700/80',
}

export default function PropertyCard({ prop }) {
  return (
    <div className="group card-hover bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 flex flex-col">

      {/* ── Image ── */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={prop.image}
          alt={prop.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Type badge */}
        <span className={`absolute top-3 left-3 ${typeBadge[prop.type] ?? 'bg-gray-800/75'} text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm`}>
          {prop.type}
        </span>

        {/* Status badge */}
        <span className={`absolute top-3 right-3 ${statusColor[prop.status] ?? 'bg-gray-500'} text-white text-xs font-bold px-2.5 py-1 rounded-full shadow`}>
          {prop.status}
        </span>

        {/* Price */}
        <div className="absolute bottom-3 left-3 bg-gray-900/80 text-white text-sm font-bold px-3 py-1 rounded-lg backdrop-blur-sm">
          {prop.price}
        </div>
      </div>

      {/* ── Details ── */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-1">
          {prop.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
          <span>📍</span>
          <span className="truncate">{prop.location}</span>
        </p>

        {/* Specs */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3 flex-wrap text-xs text-gray-500">
          {prop.beds != null && (
            <span className="flex items-center gap-1">
              <span className="text-sm">🛏️</span> {prop.beds} Beds
            </span>
          )}
          {prop.baths != null && (
            <span className="flex items-center gap-1">
              <span className="text-sm">🚿</span> {prop.baths} Baths
            </span>
          )}
          {prop.size != null && (
            <span className="flex items-center gap-1">
              <span className="text-sm">📐</span> {prop.size} sq.yds
            </span>
          )}
        </div>

        {/* CTA */}
        <Link
          to={`/properties/${prop.id}`}
          className="shine mt-4 block text-center bg-gray-900 group-hover:bg-amber-500 text-white text-sm font-semibold py-2.5 rounded-xl transition-all duration-300"
        >
          View Details →
        </Link>
      </div>
    </div>
  )
}
