import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

/* ─── Animated Counter ──────────────────────────────────────────── */
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

  const suffix = target.replace(/[0-9]/g, '')
  return <span ref={ref}>{count}{suffix}</span>
}

/* ─── Data ──────────────────────────────────────────────────────── */
const stats = [
  { value: '10+', label: 'Years Experience', icon: '🏆', color: 'from-amber-400 to-orange-400' },
  { value: '100+', label: 'Happy Clients', icon: '😊', color: 'from-emerald-400 to-teal-400' },
  { value: '50+', label: 'Active Listings', icon: '🏠', color: 'from-sky-400 to-blue-400' },
  { value: '100%', label: 'Transparency', icon: '🔍', color: 'from-violet-400 to-purple-400' },
]

const values = [
  {
    icon: '🤝',
    title: 'Honesty & Transparency',
    desc: 'We guide you like a family member, not just a customer. Every deal is built on open communication with no hidden agenda.',
    bg: 'from-amber-50 to-orange-50',
    border: 'border-amber-200',
    iconBg: 'bg-amber-100',
  },
  {
    icon: '📍',
    title: 'Local Market Expertise',
    desc: 'Ghaziabad, especially Ramprastha Colony and surrounding areas — we know the local market deeply with real on-ground experience.',
    bg: 'from-sky-50 to-blue-50',
    border: 'border-sky-200',
    iconBg: 'bg-sky-100',
  },
  {
    icon: '👤',
    title: 'Personalised Service',
    desc: 'We focus on personalised service rather than just online listings. We understand your requirement first, then shortlist.',
    bg: 'from-violet-50 to-purple-50',
    border: 'border-violet-200',
    iconBg: 'bg-violet-100',
  },
  {
    icon: '📄',
    title: 'Clear Documentation',
    desc: 'We stay fully transparent about pricing and documentation, ensuring your investment is legally sound and stress-free.',
    bg: 'from-emerald-50 to-teal-50',
    border: 'border-emerald-200',
    iconBg: 'bg-emerald-100',
  },
]


const team = [
  {
    name: 'Property Mines Team',
    role: 'Founder & Property Advisor',
    desc: '10+ years of local real estate expertise in Ramprastha Colony. Trusted by 100+ families across Ghaziabad.',
    avatar: 'PM',
    color: 'from-amber-400 to-orange-500',
  },
  {
    name: 'Client Relations',
    role: 'Customer Support',
    desc: 'Dedicated to ensuring every client feels heard and gets the right property match for their budget and lifestyle.',
    avatar: 'CR',
    color: 'from-pink-400 to-rose-500',
  },
  {
    name: 'Legal & Documentation',
    role: 'Documentation Expert',
    desc: 'Expert in property documentation, registry coordination and loan processing to ensure smooth transactions.',
    avatar: 'LD',
    color: 'from-sky-400 to-blue-500',
  },
]

const milestones = [
  { year: '2014', title: 'Founded', desc: 'Property Mines started as a small consultancy focused on Ramprastha Colony, Ghaziabad.' },
  { year: '2016', title: 'First 25 Clients', desc: 'Crossed 25 successful property deals purely through word-of-mouth referrals.' },
  { year: '2019', title: 'Expanded Services', desc: 'Added rental management and documentation services to serve clients end-to-end.' },
  { year: '2022', title: 'Digital Presence', desc: 'Launched online listings to connect with clients across NCR and beyond.' },
  { year: '2024', title: '100+ Happy Clients', desc: 'Proudly served over 100 families with personalised, honest guidance.' },
]

/* ─── Main About Component ──────────────────────────────────────── */
export default function About() {
  return (
    <div className="bg-[#fffdf8] min-h-screen">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        {/* Bright gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-300/30 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-orange-300/25 blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 text-amber-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Who We Are
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-gray-900 leading-tight">
            PROPERTY MINES —
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              your trusted property partner
            </span>
          </h1>
          <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            We focus on personalised service rather than just online listings.
            Ghaziabad-based real estate consultancy specialising in Ramprastha Colony and surrounding areas.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link
              to="/contact"
              className="shine px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-amber-300 hover:scale-105 transition-all duration-300"
            >
              Get in Touch →
            </Link>
            <Link
              to="/properties"
              className="px-8 py-3.5 bg-white text-gray-800 font-bold rounded-xl shadow-md hover:scale-105 border border-gray-200 transition-all duration-300"
            >
              Explore Properties
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center group">
              <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {s.icon}
              </div>
              <div className="text-3xl md:text-4xl font-black text-amber-400">
                <Counter target={s.value} />
              </div>
              <p className="text-gray-400 text-xs mt-1 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── OUR JOURNEY ───────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100 aspect-[4/3] flex items-center justify-center shadow-2xl">
              <span className="text-[9rem]">🏡</span>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl px-6 py-4 border border-amber-100 animate-float">
              <p className="text-4xl font-black text-amber-500">10+</p>
              <p className="text-sm text-gray-500 font-medium">Years of Trust</p>
            </div>
            <div className="absolute -top-4 -left-4 bg-amber-500 text-white rounded-2xl px-4 py-2 shadow-lg text-sm font-bold">
              📍 Ramprastha Colony
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="text-amber-500 text-sm font-bold uppercase tracking-widest">About Us</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-gray-900 mt-3 leading-tight">
              Defining Real Estate Excellence<br />
              <span className="text-amber-500">in Ramprastha Colony</span>
            </h2>
            <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-800">PROPERTY MINES</strong> is a Ghaziabad-based real estate consultancy
                specialising in residential and commercial properties in and around Ramprastha Colony.
                We work directly with property owners and carefully screened builders to bring you genuine options.
              </p>
              <p>
                Our approach is simple — understand your requirement in detail, show only relevant properties,
                and stay fully transparent about pricing and documentation.
              </p>
              <p>
                We believe in long-term relationships, so most of our new clients come through
                word-of-mouth and referrals — that's the trust we've built over 10+ years.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4 p-4 bg-amber-50 border border-amber-100 rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                PM
              </div>
              <div>
                <p className="font-bold text-gray-900">Property Mines</p>
                <p className="text-amber-600 text-sm font-medium">Trusted Property Advisor, Ghaziabad</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ──────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-b from-amber-50/60 to-orange-50/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-amber-500 text-sm font-bold uppercase tracking-widest">Our Purpose</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-gray-900 mt-3">
              Mission & Vision
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="card-hover p-10 bg-white rounded-3xl border border-amber-100 shadow-md">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-3xl mb-6">
                🎯
              </div>
              <h3 className="font-display text-2xl font-black text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To make property buying and selling simple, safe and stress-free for every client we work with.
                We aim to simplify the complex process by providing honest guidance and end-to-end support.
              </p>
            </div>
            {/* Vision */}
            <div className="card-hover p-10 bg-white rounded-3xl border border-violet-100 shadow-md">
              <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center text-3xl mb-6">
                🔭
              </div>
              <h3 className="font-display text-2xl font-black text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the <strong className="text-gray-800">most preferred and trusted real estate consultancy</strong> in
                Ghaziabad and the NCR region. We envision a future where Aroras Properties is synonymous with quality
                living and smart investments, setting new benchmarks in the industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR VALUES ────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-amber-500 text-sm font-bold uppercase tracking-widest">What Drives Us</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-gray-900 mt-3">
              Our Core Values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className={`card-hover p-7 rounded-3xl bg-gradient-to-br ${v.bg} border ${v.border}`}
              >
                <div className={`w-14 h-14 ${v.iconBg} rounded-2xl flex items-center justify-center text-2xl shadow-sm mb-5`}>
                  {v.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-b from-amber-50/60 to-orange-50/40">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-amber-500 text-sm font-bold uppercase tracking-widest">Our Story</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-gray-900 mt-3">
              Milestones We're Proud Of
            </h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-300 to-orange-300 rounded-full hidden md:block" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={i} className="flex gap-8 items-start">
                  {/* Year bubble */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-black text-xs text-center shadow-lg shadow-amber-200 z-10">
                    {m.year}
                  </div>
                  {/* Content */}
                  <div className="card-hover flex-1 bg-white rounded-2xl p-6 shadow-sm border border-amber-50">
                    <h3 className="font-bold text-gray-900 text-lg">{m.title}</h3>
                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-amber-500 text-sm font-bold uppercase tracking-widest">The People</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-gray-900 mt-3">
              Meet Our Team
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div
                key={i}
                className="card-hover bg-white rounded-3xl p-8 text-center border border-gray-100 shadow-md"
              >
                <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-2xl font-black shadow-xl mb-5`}>
                  {member.avatar}
                </div>
                <h3 className="font-bold text-gray-900 text-xl">{member.name}</h3>
                <p className="text-amber-500 font-semibold text-sm mt-1">{member.role}</p>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-black text-white">
            Let's Find Your Perfect Home
          </h2>
          <p className="text-white/80 mt-4 text-lg">
            Join 1200+ families who trusted Aroras Properties with their biggest investment.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link
              to="/properties"
              className="shine px-8 py-4 bg-white text-amber-600 font-bold rounded-xl shadow-xl hover:scale-105 transition-all duration-300"
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
