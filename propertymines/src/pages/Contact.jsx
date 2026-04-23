import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, Box, Torus, OrbitControls } from '@react-three/drei'
import { Link } from 'react-router-dom'
import * as THREE from 'three'

/* ─── 3D Scene Objects ──────────────────────────────────────────── */

function FloatingBuilding({ position, color, scale = 1, speed = 1 }) {
  const ref = useRef()
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed
    ref.current.rotation.y = t * 0.3
    ref.current.position.y = position[1] + Math.sin(t) * 0.15
  })
  return (
    <group ref={ref} position={position} scale={scale}>
      {/* Building base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 1, 0.5]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
      {/* Building top */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[0.35, 0.5, 0.35]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 1.1, 0]}>
        <coneGeometry args={[0.25, 0.3, 4]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.6} roughness={0.2} />
      </mesh>
      {/* Windows */}
      {[-0.15, 0.15].map((x, i) =>
        [-0.2, 0.2].map((y, j) => (
          <mesh key={`${i}-${j}`} position={[x, y, 0.26]}>
            <boxGeometry args={[0.1, 0.1, 0.01]} />
            <meshStandardMaterial
              color="#fcd34d"
              emissive="#fcd34d"
              emissiveIntensity={0.5}
            />
          </mesh>
        ))
      )}
    </group>
  )
}

function FloatingSphere({ position, color, speed = 1 }) {
  const ref = useRef()
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed
    ref.current.rotation.x = t * 0.5
    ref.current.rotation.z = t * 0.3
    ref.current.position.y = position[1] + Math.sin(t * 1.2) * 0.2
  })
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.25, 32, 32]} />
      <MeshDistortMaterial
        color={color}
        distort={0.4}
        speed={2}
        metalness={0.3}
        roughness={0.2}
      />
    </mesh>
  )
}

function FloatingTorus({ position, color, speed = 1 }) {
  const ref = useRef()
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed
    ref.current.rotation.x = t * 0.4
    ref.current.rotation.y = t * 0.6
    ref.current.position.y = position[1] + Math.cos(t) * 0.15
  })
  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[0.2, 0.07, 16, 100]} />
      <meshStandardMaterial color={color} metalness={0.7} roughness={0.1} />
    </mesh>
  )
}

function ParticleField() {
  const count = 80
  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return arr
  }, [])

  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.04
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#f59e0b" transparent opacity={0.6} />
    </points>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#fff" />
      <pointLight position={[-5, 3, 2]} intensity={0.8} color="#f59e0b" />
      <pointLight position={[3, -3, -2]} intensity={0.5} color="#fb923c" />

      <ParticleField />

      {/* Buildings */}
      <FloatingBuilding position={[-2, 0.5, 0]} color="#6366f1" scale={0.9} speed={0.8} />
      <FloatingBuilding position={[1.5, -0.5, -1]} color="#0ea5e9" scale={1.1} speed={0.6} />
      <FloatingBuilding position={[0, 1.2, -2]} color="#10b981" scale={0.7} speed={1} />
      <FloatingBuilding position={[-1, -1, -1.5]} color="#8b5cf6" scale={0.8} speed={0.9} />
      <FloatingBuilding position={[2.5, 1, 0.5]} color="#f43f5e" scale={0.6} speed={1.1} />

      {/* Distort spheres */}
      <FloatingSphere position={[0.5, 0.5, 0.5]} color="#f59e0b" speed={0.7} />
      <FloatingSphere position={[-1.5, -0.8, 0]} color="#fb923c" speed={1.2} />
      <FloatingSphere position={[2, -1.2, -0.5]} color="#fcd34d" speed={0.9} />

      {/* Torus rings */}
      <FloatingTorus position={[-0.5, 1.5, 0]} color="#f59e0b" speed={0.8} />
      <FloatingTorus position={[1, -0.5, 1]} color="#fb923c" speed={1.1} />
      <FloatingTorus position={[-2, 0, -1]} color="#fde68a" speed={0.6} />
    </>
  )
}

/* ─── Contact Form ──────────────────────────────────────────────── */

const interests = [
  'Buying Property', 'Selling Property', 'Home Loan', 'Rental Management',
  'Legal Assistance', 'Property Valuation', 'General Inquiry',
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', interest: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1800)
  }

  return (
    <div className="bg-[#fffdf8] min-h-screen">

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-300/30 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-orange-300/25 blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 text-amber-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Get In Touch
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-gray-900 leading-tight">
            Let's Discuss
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              Your Dream Home
            </span>
          </h1>
          <p className="mt-5 text-gray-600 text-lg max-w-xl mx-auto">
            Fill out the form below and our team will get back to you shortly.
          </p>
        </div>
      </section>

      {/* ── MAIN GRID: 3JS + FORM ───────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* LEFT: 3D Canvas + Info ── */}
          <div className="flex flex-col gap-6">
            {/* Three.js Canvas */}
            <div className="relative rounded-3xl overflow-hidden border border-amber-200 shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800" style={{ height: '420px' }}>
              <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                <Suspense fallback={null}>
                  <Scene />
                </Suspense>
              </Canvas>
              {/* Overlay label */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-2.5 text-center">
                  <p className="text-amber-300 text-xs font-bold uppercase tracking-widest">Interactive 3D</p>
                  <p className="text-white text-sm font-semibold mt-0.5">Drag to explore</p>
                </div>
              </div>
            </div>

            {/* Contact Info Cards */}
            <div className="grid gap-4">
              {[
                { icon: '📍', title: 'Visit Our Office', detail: 'Shop No.16, KM Srathi, Raj Nagar Ext.', sub: 'Ghaziabad, Uttar Pradesh 201017' },
                { icon: '📞', title: 'Call Us Anytime', detail: '+91 98765 43210', sub: 'Mon–Sat from 10am to 7pm' },
                { icon: '✉️', title: 'Email Support', detail: 'info@arorasproperties.com', sub: 'We reply usually within 24 hours' },
              ].map((info, i) => (
                <div key={i} className="card-hover flex items-start gap-4 bg-white rounded-2xl p-5 border border-amber-100 shadow-sm">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{info.title}</p>
                    <p className="text-gray-700 text-sm mt-0.5">{info.detail}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{info.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map embed */}
            <div className="rounded-2xl overflow-hidden border border-amber-100 shadow-md h-48">
              <iframe
                title="Aroras Properties Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.5!2d77.4526!3d28.6821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDQwJzU1LjYiTiA3N8KwMjcnMDkuNCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>

          {/* RIGHT: Contact Form ── */}
          <div className="bg-white rounded-3xl shadow-xl border border-amber-100 p-8 md:p-10 sticky top-24">
            {submitted ? (
              /* Success State */
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-4xl mb-6 shadow-lg">
                  ✅
                </div>
                <h3 className="font-display text-2xl font-black text-gray-900">Message Sent!</h3>
                <p className="text-gray-500 mt-3 max-w-xs">
                  Thank you! Our team will reach out to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', interest: '', message: '' }) }}
                  className="mt-8 px-7 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl font-black text-gray-900 mb-1">Send Us a Message</h2>
                <p className="text-gray-500 text-sm mb-8">Fill out the form below and our team will get back to you shortly.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name + Phone */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Full Name <span className="text-red-400">*</span></label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all bg-gray-50 placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Phone <span className="text-red-400">*</span></label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 98765..."
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all bg-gray-50 placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all bg-gray-50 placeholder-gray-400"
                    />
                  </div>

                  {/* Interest */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">I'm Interested In <span className="text-red-400">*</span></label>
                    <select
                      name="interest"
                      value={form.interest}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all bg-gray-50 text-gray-700 appearance-none"
                    >
                      <option value="">Select a service...</option>
                      {interests.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us more about your requirements..."
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all bg-gray-50 placeholder-gray-400 resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`shine w-full py-4 rounded-xl font-bold text-white text-base transition-all duration-300 flex items-center justify-center gap-3
                      ${loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:shadow-lg hover:shadow-amber-200 hover:scale-[1.02] active:scale-100'
                      }`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>Send Message 🚀</>
                    )}
                  </button>

                  <p className="text-xs text-gray-400 text-center">
                    🔒 Your information is safe and will never be shared.
                  </p>
                </form>
              </>
            )}
          </div>

        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 mx-6 mb-14 rounded-3xl max-w-7xl md:mx-auto">
        <div className="text-center px-6">
          <h2 className="font-display text-3xl md:text-4xl font-black text-white">
            Ready to Find Your Perfect Property?
          </h2>
          <p className="text-white/80 mt-3 text-base max-w-xl mx-auto">
            Browse our exclusive listings and let our experts guide you to your dream home.
          </p>
          <Link
            to="/properties"
            className="shine inline-block mt-8 px-8 py-3.5 bg-white text-amber-600 font-bold rounded-xl shadow-xl hover:scale-105 transition-all duration-300"
          >
            Explore Properties →
          </Link>
        </div>
      </section>

    </div>
  )
}
