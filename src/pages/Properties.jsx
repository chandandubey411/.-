import React, { useState, useMemo } from 'react'
import PropertyCard from '../components/PropertyCard'
import propertiesData from '../data/propertiesData'
import bannerProperties from '../assets/images/banner_properties.png'

const FILTERS = ['All', 'Apartment', 'Villa', 'Plot', 'Commercial']
const INITIAL_SHOW = 12
const LOAD_MORE_COUNT = 8

export default function Properties() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [visibleCount, setVisibleCount] = useState(INITIAL_SHOW)

  /* Filtered list */
  const filtered = useMemo(() => {
    return propertiesData.filter((p) => {
      const matchType = activeFilter === 'All' || p.type === activeFilter
      const query = search.toLowerCase()
      const matchSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.type.toLowerCase().includes(query) ||
        p.price.toLowerCase().includes(query)
      return matchType && matchSearch
    })
  }, [activeFilter, search])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const handleFilterChange = (f) => {
    setActiveFilter(f)
    setVisibleCount(INITIAL_SHOW)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setVisibleCount(INITIAL_SHOW)
  }

  return (
    <div className="bg-[#fffdf8] min-h-screen">

      {/* ── HERO BANNER ────────────────────────────────────────── */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        <img src={bannerProperties} alt="Properties" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-sm font-semibold px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Exclusive Listings
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight drop-shadow-lg">
            Find Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
              Dream Property
            </span>
          </h1>
          <p className="mt-5 text-gray-200 text-lg max-w-2xl mx-auto">
            Explore our handpicked selection of premium apartments, villas, plots, and commercial spaces across prime locations in Delhi NCR.
          </p>
        </div>
      </section>
      {/* ── SEARCH + FILTERS ────────────────────────────────────── */}
      <section className="sticky top-16 md:top-20 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center gap-4">
          {/* Search */}
          <div className="relative w-full sm:w-80 flex-shrink-0">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search location or property..."
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all bg-gray-50"
            />
            {search && (
              <button
                onClick={() => { setSearch(''); setVisibleCount(INITIAL_SHOW) }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 text-lg leading-none"
              >
                ×
              </button>
            )}
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => handleFilterChange(f)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  activeFilter === f
                    ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-200'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-amber-400 hover:text-amber-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Result count */}
          <p className="text-sm text-gray-500 sm:ml-auto whitespace-nowrap">
            Showing <span className="font-bold text-gray-800">{visible.length}</span> of{' '}
            <span className="font-bold text-gray-800">{filtered.length}</span> properties
          </p>
        </div>
      </section>

      {/* ── CARDS GRID ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-6xl mb-4">🏚️</p>
            <h2 className="font-display text-2xl font-black text-gray-700 mb-2">No Properties Found</h2>
            <p className="text-gray-500">Try adjusting your search or filter.</p>
            <button
              onClick={() => { setSearch(''); setActiveFilter('All'); setVisibleCount(INITIAL_SHOW) }}
              className="mt-6 px-6 py-2.5 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visible.map((prop) => (
                <PropertyCard key={prop.id} prop={prop} />
              ))}
            </div>

            {/* Show More / Show Less */}
            {(hasMore || visibleCount > INITIAL_SHOW) && (
              <div className="mt-14 text-center">
                <p className="text-gray-500 text-sm mb-5">
                  Showing{' '}
                  <span className="font-bold text-gray-800">{visible.length}</span> of{' '}
                  <span className="font-bold text-gray-800">{filtered.length}</span> properties
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  {/* Show More */}
                  {hasMore && (
                    <button
                      onClick={() => setVisibleCount((v) => v + LOAD_MORE_COUNT)}
                      className="shine inline-flex items-center gap-2 px-9 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-amber-300 hover:scale-105 transition-all duration-300"
                    >
                      Show More <span className="text-base">↓</span>
                    </button>
                  )}

                  {/* Show Less */}
                  {visibleCount > INITIAL_SHOW && (
                    <button
                      onClick={() => {
                        setVisibleCount(INITIAL_SHOW)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                      className="inline-flex items-center gap-2 px-9 py-3.5 bg-white text-gray-700 font-bold rounded-2xl shadow-md border border-gray-200 hover:border-amber-400 hover:text-amber-600 hover:scale-105 transition-all duration-300"
                    >
                      Show Less <span className="text-base">↑</span>
                    </button>
                  )}
                </div>

                {!hasMore && (
                  <p className="text-xs text-gray-400 mt-4">
                    ✅ All {filtered.length} properties displayed
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 mx-6 mb-14 rounded-3xl max-w-7xl md:mx-auto">
        <div className="text-center px-6">
          <h2 className="font-display text-3xl md:text-4xl font-black text-white">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-white/80 mt-3 text-base">
            Tell us your requirements and our experts will find the perfect property for you.
          </p>
          <a
            href="/contact"
            className="shine inline-block mt-8 px-8 py-3.5 bg-white text-amber-600 font-bold rounded-xl shadow-xl hover:scale-105 transition-all duration-300"
          >
            Talk to Our Expert →
          </a>
        </div>
      </section>

    </div>
  )
}
