import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'

/* ─── Image Imports ───────────────────────────────────────────── */
import heroSlide1 from '../assets/images/hero_slide_1.png'
import heroSlide2 from '../assets/images/hero_slide_2.png'
import heroSlide3 from '../assets/images/hero_slide_3.png'
import serviceBuying from '../assets/images/service_buying.png'
import serviceSelling from '../assets/images/service_selling.png'
import serviceRental from '../assets/images/service_rental.png'
import propApartment from '../assets/images/prop_apartment.png'
import propIndependent from '../assets/images/prop_independent.png'
import propBuilderFloor from '../assets/images/prop_builder_floor.png'
import propCommercial from '../assets/images/prop_commercial.png'
import whoWeAreImg from '../assets/images/who_we_are.png'

/* ─── Static Data ─────────────────────────────────────────────── */

const heroSlides = [
  { img: heroSlide1, tagline: 'Premium Apartments & Flats' },
  { img: heroSlide2, tagline: 'Residential Colonies & Floors' },
  { img: heroSlide3, tagline: 'Luxury Interiors & Living' },
]

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '100+', label: 'Happy Clients' },
  { value: '50+', label: 'Active Listings' },
  { value: '100%', label: 'Personalised Service' },
]

const properties = [
  {
    id: 1,
    type: 'Apartment',
    status: 'FOR SALE',
    price: 'From ₹ 45 Lakhs',
    title: '2 & 3 BHK Flats',
    location: 'Ramprastha Colony, Ghaziabad',
    beds: 3, baths: 2, sqft: 1250,
    image: propApartment,
  },
  {
    id: 2,
    type: 'Independent Floor',
    status: 'FOR SALE',
    price: 'From ₹ 1.70 Cr',
    title: 'Independent Builder Floor',
    location: 'Ramprastha Colony, Ghaziabad',
    beds: 4, baths: 3, sqft: 2200,
    image: propIndependent,
  },
  {
    id: 3,
    type: 'Builder Floor',
    status: 'FOR SALE',
    price: 'From ₹ 55 Lakhs',
    title: 'Builder Floor — Ready to Move',
    location: 'Ramprastha Colony, Ghaziabad',
    beds: 2, baths: 2, sqft: 900,
    image: propBuilderFloor,
  },
  {
    id: 4,
    type: 'Commercial',
    status: 'FOR SALE',
    price: 'On Request',
    title: 'Commercial Space — Vaishali Plaza',
    location: 'Vaishali, Near Ramprastha Colony',
    sqft: 450,
    image: propCommercial,
  },
]

const services = [
  {
    image: serviceBuying,
    title: 'Property Buying Assistance',
    desc: 'Shortlisting based on your requirement, arranging site visits, and providing price negotiation support — we handle it all.',
    color: 'from-amber-50 to-orange-50',
    border: 'border-amber-200',
  },
  {
    image: serviceSelling,
    title: 'Property Selling Support',
    desc: 'Marketing your property locally, filtering genuine buyers, and assisting during deal finalisation for the best value.',
    color: 'from-emerald-50 to-teal-50',
    border: 'border-emerald-200',
  },
  {
    image: serviceRental,
    title: 'Rental & Lease Services',
    desc: 'Finding reliable tenants, rental agreement coordination, and periodic assistance as required — fully managed.',
    color: 'from-sky-50 to-blue-50',
    border: 'border-sky-200',
  },
]

const testimonials = [
  {
    name: 'Rahul Verma',
    role: 'Home Buyer',
    quote: '"Property Mines helped me find a 3BHK in Ramprastha Colony within my exact budget. No pressure, no fake listings — just honest guidance. Highly recommended!"',
    avatar: 'RV',
    color: 'bg-amber-500',
  },
  {
    name: 'Sunita & Deepak',
    role: 'First-Time Buyers',
    quote: '"We were first-time buyers and had no idea about the process. The team at Property Mines walked us through everything patiently. We got our dream home!"',
    avatar: 'SD',
    color: 'bg-emerald-500',
  },
  {
    name: 'Pradeep Sharma',
    role: 'Property Seller',
    quote: '"Sold my builder floor in Ramprastha Colony within 3 weeks at a great price. They brought genuine buyers and handled all the paperwork. Excellent service!"',
    avatar: 'PS',
    color: 'bg-violet-500',
  },
]

/* ─── Animated Counter ────────────────────────────────────────── */
function Counter({ target, duration = 1800 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const numeric = parseInt(target.replace(/\D/g, ''))
          const steps = 60
          const step = numeric / steps
          let current = 0
          const timer = setInterval(() => {
            current += step
            if (current >= numeric) {
              setCount(numeric)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  const suffix = target.replace(/\d/g, '')
  return <span ref={ref}>{count}{suffix}</span>
}

/* ─── Property Card ───────────────────────────────────────────── */
function PropertyCard({ prop, delay }) {
  return (
    <div
      className={`animate-fade-up delay-${delay} card-hover bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 flex flex-col`}
    >
      {/* Image area */}
      <div className="relative h-52 img-zoom overflow-hidden">
        <img src={prop.image} alt={prop.title} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-semibold px-2.5 py-1 rounded-full text-gray-800 shadow">
          {prop.type}
        </div>
        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
          {prop.status}
        </div>
        <div className="absolute bottom-3 left-3 bg-gray-900/80 text-white text-sm font-bold px-3 py-1 rounded-lg backdrop-blur">
          {prop.price}
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-lg leading-snug">{prop.title}</h3>
        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
          <span>📍</span> {prop.location}
        </p>

        <div className="mt-4 flex items-center gap-4 text-sm text-gray-600 border-t border-gray-100 pt-4">
          {prop.beds && <span className="flex items-center gap-1">🛏️ {prop.beds} Beds</span>}
          {prop.baths && <span className="flex items-center gap-1">🚿 {prop.baths} Baths</span>}
          <span className="flex items-center gap-1">📐 {prop.sqft} sqft</span>
        </div>

        <Link
          to="/properties"
          className="shine mt-4 block text-center bg-gray-900 hover:bg-amber-500 text-white text-sm font-semibold py-2.5 rounded-xl transition-all duration-300"
        >
          View Details →
        </Link>
      </div>
    </div>
  )
}

/* ─── Main Home Component ─────────────────────────────────────── */
export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % heroSlides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <div className="bg-[#fffdf8] min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Slider */}
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: currentSlide === i ? 1 : 0 }}
          >
            <img
              src={slide.img}
              alt={slide.tagline}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                currentSlide === i ? 'w-8 bg-amber-400' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Floating cards decoration */}
        <div className="absolute top-24 right-16 animate-float hidden lg:block z-20">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl px-5 py-4 border border-amber-100">
            <p className="text-xs text-gray-400 font-medium">Featured Area</p>
            <p className="text-sm font-bold text-gray-800 mt-0.5">Ramprastha Colony</p>
            <p className="text-amber-500 font-bold text-base mt-1">2 & 3 BHK from ₹45L*</p>
          </div>
        </div>
        <div className="absolute bottom-32 left-16 animate-float hidden lg:block z-20" style={{ animationDelay: '1.5s' }}>
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl px-5 py-4 border border-emerald-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-xs text-gray-500 font-medium">100+ Happy Clients</p>
            </div>
            <p className="text-sm font-bold text-gray-800 mt-1.5">⭐⭐⭐⭐⭐ Rated</p>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="animate-fade-up inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-sm font-semibold px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Ghaziabad • Ramprastha Colony
          </div>
          <h1 className="animate-fade-up delay-100 font-display text-5xl sm:text-6xl md:text-7xl font-black text-white leading-tight drop-shadow-lg">
            Find your next
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
              perfect property
            </span>
            with PROPERTY MINES
          </h1>
          <p className="animate-fade-up delay-200 text-gray-200 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            {heroSlides[currentSlide].tagline} — From residential apartments to independent houses
            and commercial spaces, we help you discover verified properties.
          </p>
          <div className="animate-fade-up delay-300 flex flex-wrap justify-center gap-4 mt-10">
            <Link
              to="/properties"
              className="shine animate-pulse-glow px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-amber-300 hover:scale-105 transition-all duration-300 text-base"
            >
              Explore Properties →
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-white/10 backdrop-blur-md text-white font-bold rounded-xl shadow-md hover:bg-white/20 hover:scale-105 border border-white/20 transition-all duration-300 text-base"
            >
              Contact Us
            </Link>
          </div>

          {/* Quick search bar */}
          <div className="animate-fade-up delay-400 mt-12 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-2 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="🔍  Search by location, property type..."
              className="flex-1 px-4 py-3 text-sm text-gray-700 bg-transparent outline-none placeholder-gray-400"
            />
            <button className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl text-sm transition-colors duration-200">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className={`animate-fade-up delay-${i * 100 + 100} text-center`}>
              <div className="text-3xl md:text-4xl font-black text-amber-400">
                <Counter target={s.value} />
              </div>
              <p className="text-gray-400 text-sm mt-1 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHO WE ARE ───────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* Left: real image */}
          <div className="relative animate-fade-up">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
              <img src={whoWeAreImg} alt="Our Team" className="w-full h-full object-cover" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl px-6 py-4 border border-amber-100 animate-float">
              <p className="text-4xl font-black text-amber-500">15+</p>
              <p className="text-sm text-gray-500 font-medium">Years of Trust</p>
            </div>
            <div className="absolute -top-4 -left-4 bg-amber-500 text-white rounded-2xl px-4 py-2 shadow-lg text-sm font-bold">
              ✅ RERA Registered
            </div>
          </div>

          {/* Right: text */}
          <div className="animate-fade-up delay-200">
            <span className="text-amber-500 text-sm font-bold uppercase tracking-widest">Who We Are</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-gray-900 mt-3 leading-tight">
              Redefining Real Estate<br />
              <span className="text-amber-500">with Integrity</span>
            </h2>
            <p className="text-gray-600 mt-5 leading-relaxed text-base">
              Property Mines is not just a consultancy; we are your partners in finding the perfect space.
              Founded with a vision to bring transparency and professionalism to the Ghaziabad real estate market.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {['RERA Registered', 'Verified Listings', 'Zero Hidden Charges', 'End-to-End Support'].map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs flex-shrink-0">✓</span>
                  {f}
                </div>
              ))}
            </div>
            <Link
              to="/about"
              className="shine inline-flex items-center gap-2 mt-8 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl shadow-md transition-all duration-300 hover:scale-105"
            >
              Read Our Story →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ──────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-b from-amber-50/60 to-orange-50/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-amber-500 text-sm font-bold uppercase tracking-widest">Exclusive Listings</span>
              <h2 className="font-display text-4xl md:text-5xl font-black text-gray-900 mt-2">
                Featured Properties
              </h2>
            </div>
            <Link
              to="/properties"
              className="flex items-center gap-2 text-gray-700 hover:text-amber-500 font-semibold text-sm transition-colors duration-200 whitespace-nowrap"
            >
              View All Listings →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.map((prop, i) => (
              <PropertyCard key={prop.id} prop={prop} delay={(i + 1) * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-amber-500 text-sm font-bold uppercase tracking-widest">Our Expertise</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-gray-900 mt-3">
              Comprehensive Services
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              We offer end-to-end real estate solutions designed to make your property journey smooth and hassle-free.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <div
                key={i}
                className={`animate-fade-up delay-${(i + 1) * 100} card-hover rounded-3xl bg-gradient-to-br ${svc.color} border ${svc.border} overflow-hidden`}
              >
                <div className="h-48 overflow-hidden">
                  <img src={svc.image} alt={svc.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-8">
                  <h3 className="font-bold text-gray-900 text-xl mb-3">{svc.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{svc.desc}</p>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1 mt-6 text-amber-600 font-semibold text-sm hover:gap-2 transition-all duration-200"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-amber-400 text-amber-600 font-bold rounded-xl hover:bg-amber-500 hover:text-white transition-all duration-300"
            >
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-amber-400 text-sm font-bold uppercase tracking-widest">Client Stories</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mt-3">
              Trusted by Families
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`animate-fade-up delay-${(i + 1) * 100} card-hover bg-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8`}
              >
                {/* Stars */}
                <div className="flex gap-1 text-amber-400 text-lg mb-4">
                  {'★★★★★'.split('').map((s, j) => <span key={j}>{s}</span>)}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic">{t.quote}</p>
                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/10">
                  <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-black text-white leading-tight">
            Ready to Find Your <br />Dream Home?
          </h2>
          <p className="text-white/80 mt-4 text-lg">
            Let our experts guide you through every step of your property journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link
              to="/properties"
              className="shine px-8 py-4 bg-white text-amber-600 font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Browse Properties
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-gray-900 text-white font-bold rounded-xl shadow-xl hover:scale-105 transition-all duration-300"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
