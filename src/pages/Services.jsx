import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import bannerServices from '../assets/images/banner_services.png'
import imgNoHiddenCharges from '../assets/images/img_no_hidden_charges.png'

/* ─── Data ──────────────────────────────────────────────────────── */

const services = [
  {
    id: '',
    icon: '🏠',
    title: 'Property Buying Assistance',
    tagline: 'Find Your Perfect Home',
    desc: 'We shortlist properties based on your exact requirement, arrange convenient site visits, and provide full price negotiation support so you get the best deal without any stress.',
    points: [
      'Shortlisting based on your requirement and budget',
      'Arranging site visits at your convenience',
      'Price negotiation support for the best deal',
      'Guidance through paperwork and possession',
    ],
    cta: 'Find Your Home',
    ctaLink: '/properties',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&auto=format&fit=crop',
    color: 'from-amber-50 to-orange-50',
    iconBg: 'bg-amber-100',
    accent: 'text-amber-500',
    border: 'border-amber-200',
    btnClass: 'bg-amber-500 hover:bg-amber-600',
    reverse: false,
  },
  {
    id: 'selling',
    icon: '💼',
    title: 'Property Selling Support',
    tagline: 'Get the Best Value',
    desc: 'We market your property locally to genuine buyers, filter out non-serious inquiries, and assist you through the entire deal finalisation process for a smooth and transparent sale.',
    points: [
      'Marketing your property locally and on portals',
      'Filtering genuine buyers to save your time',
      'Assistance during deal finalisation',
      'Complete transparency in pricing and documentation',
    ],
    cta: 'Sell Your Property',
    ctaLink: '/contact',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=700&auto=format&fit=crop',
    color: 'from-emerald-50 to-teal-50',
    iconBg: 'bg-emerald-100',
    accent: 'text-emerald-600',
    border: 'border-emerald-200',
    btnClass: 'bg-emerald-500 hover:bg-emerald-600',
    reverse: true,
  },
  {
    id: 'rental',
    icon: '🔑',
    title: 'Rental & Lease Services',
    tagline: 'Hassle-Free Renting',
    desc: 'Finding tenants for your property, coordinating rental agreements, and providing periodic assistance as required — we manage the entire rental process so you can sit back.',
    points: [
      'Finding reliable tenants for your property',
      'Rental agreement coordination and registration',
      'Periodic assistance as required',
      'Tenant background verification included',
    ],
    cta: 'Explore Rental Options',
    ctaLink: '/contact',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=700&auto=format&fit=crop',
    color: 'from-sky-50 to-blue-50',
    iconBg: 'bg-sky-100',
    accent: 'text-sky-600',
    border: 'border-sky-200',
    btnClass: 'bg-sky-500 hover:bg-sky-600',
    reverse: false,
  },
  {
    id: 'legal',
    icon: '📄',
    title: 'Documentation Guidance',
    tagline: 'Legally Clear, Stress-Free',
    desc: 'We help with sale deed and property registry, provide loan documentation assistance, and coordinate with lawyers if needed — ensuring your investment is 100% secure.',
    points: [
      'Help with sale deed and property registry',
      'Loan documentation assistance',
      'Coordination with lawyers if needed',
      'Property title verification and search',
    ],
    cta: 'Get Documentation Help',
    ctaLink: '/contact',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=700&auto=format&fit=crop',
    color: 'from-violet-50 to-purple-50',
    iconBg: 'bg-violet-100',
    accent: 'text-violet-600',
    border: 'border-violet-200',
    btnClass: 'bg-violet-500 hover:bg-violet-600',
    reverse: true,
  },
]
//     ],
// cta: 'Explore Rentals',
//   ctaLink: '/properties',
//     image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=700&auto=format&fit=crop',
//       color: 'from-rose-50 to-pink-50',
//         iconBg: 'bg-rose-100',
//           accent: 'text-rose-600',
//             border: 'border-rose-200',
//               btnClass: 'bg-rose-500 hover:bg-rose-600',
//                 reverse: false,
//   },
// ]

const steps = [
  { step: '01', icon: '💬', title: 'Consultation', desc: 'We listen to your requirements, budget, and preferences to understand exactly what you are looking for.' },
  { step: '02', icon: '🔍', title: 'Property Selection', desc: 'We curate a list of properties that match your criteria and arrange site visits at your convenience.' },
  { step: '03', icon: '✅', title: 'Verification', desc: 'Our legal team conducts thorough due diligence to ensure the property has a clean title and no issues.' },
  { step: '04', icon: '🤝', title: 'Finalization', desc: 'We assist in price negotiation and paperwork to get you the best deal possible.' },
  { step: '05', icon: '🎉', title: 'Handover', desc: 'Congratulations! We hand over the keys and assist with post-purchase formalities.' },
]

const faqs = [
  { q: 'Do you charge a commission from buyers?', a: 'No, our services for property buyers are completely free of charge. We earn our fee from the seller/developer, so you get expert guidance at zero cost.' },
  { q: 'How long does it take to get a home loan approved?', a: 'With our partner banks and pre-arranged documentation process, most loans get approved within 5-7 working days. We guide you through every step to ensure a smooth process.' },
  { q: 'Do you help with property registration?', a: 'Yes, absolutely. Our legal team handles the complete registration process at the sub-registrar office, including drafting of sale deeds and payment of stamp duty.' },
  { q: 'Can you help me find a tenant for my investment property?', a: 'Yes, our rental management service covers everything — from tenant sourcing and background verification to rent agreement drafting and monthly collection.' },
  { q: 'Do you only operate in Ghaziabad?', a: 'While Raj Nagar Extension and Ghaziabad are our primary markets, we also assist clients in nearby NCR areas like Noida, Indirapuram, and Greater Noida.' },
]

/* ─── FAQ Item ──────────────────────────────────────────────────── */
function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-amber-300 shadow-md shadow-amber-100' : 'border-gray-200'}`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-amber-50 transition-colors duration-200"
      >
        <span className={`font-semibold text-sm md:text-base ${isOpen ? 'text-amber-600' : 'text-gray-800'}`}>
          {faq.q}
        </span>
        <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${isOpen ? 'bg-amber-500 text-white rotate-45' : 'bg-gray-100 text-gray-500'}`}>
          +
        </span>
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <p className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">
          {faq.a}
        </p>
      </div>
    </div>
  )
}

/* ─── Main Services Component ───────────────────────────────────── */
export default function Services() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="bg-[#fffdf8] min-h-screen">

      {/* ── HERO BANNER ────────────────────────────────────────── */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        <img src={bannerServices} alt="Our Services" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-sm font-semibold px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            What We Offer
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight drop-shadow-lg">
            Comprehensive
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
              Real Estate Services
            </span>
          </h1>
          <p className="mt-5 text-gray-200 text-lg max-w-2xl mx-auto leading-relaxed">
            From finding your dream home to securing the best mortgage deals,
            we guide you through every step of your property journey.
          </p>

          {/* Service quick-links */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-semibold text-white hover:bg-white/20 hover:border-amber-400/50 transition-all duration-200"
              >
                {s.title.split(' ').slice(0, 2).join(' ')}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE SECTIONS (alternating) ──────────────────────── */}
      {services.map((svc) => (
        <section
          key={svc.id}
          id={svc.id}
          className={`py-20 ${svc.reverse ? 'bg-white' : `bg-gradient-to-br ${svc.color}`}`}
        >
          <div className={`max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center ${svc.reverse ? 'md:flex md:flex-row-reverse' : ''}`}>

            {/* Image */}
            <div className={`relative img-zoom rounded-3xl overflow-hidden shadow-2xl border ${svc.border} ${svc.reverse ? 'md:order-2' : ''}`}>
              <img
                src={svc.image}
                alt={svc.title}
                className="w-full h-72 md:h-[380px] object-cover"
                loading="lazy"
              />
              {/* Floating icon */}
              <div className={`absolute top-4 left-4 ${svc.iconBg} backdrop-blur rounded-xl px-3 py-2 text-2xl shadow-lg`}>
                {svc.icon}
              </div>
            </div>

            {/* Text */}
            <div className={svc.reverse ? 'md:order-1' : ''}>
              <span className={`text-xs font-bold uppercase tracking-widest ${svc.accent}`}>
                {svc.tagline}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-black text-gray-900 mt-3 leading-tight">
                {svc.title}
              </h2>
              <p className="text-gray-600 mt-4 leading-relaxed text-sm md:text-base">
                {svc.desc}
              </p>
              <ul className="mt-6 space-y-3">
                {svc.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className={`mt-0.5 w-5 h-5 rounded-full ${svc.iconBg} ${svc.accent} flex items-center justify-center text-xs flex-shrink-0 font-bold`}>
                      ✓
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
              <Link
                to={svc.ctaLink}
                className={`shine inline-flex items-center gap-2 mt-8 px-7 py-3 ${svc.btnClass} text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-all duration-300 text-sm`}
              >
                {svc.cta} →
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* ── HOW WE WORK ─────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-b from-amber-50/60 to-orange-50/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-amber-500 text-sm font-bold uppercase tracking-widest">Our Process</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-gray-900 mt-3">How We Work</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Our transparent and structured process ensures a hassle-free experience for every client.
            </p>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-amber-200 via-orange-300 to-amber-200 hidden md:block" />

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 relative z-10">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="card-hover flex flex-col items-center text-center bg-white rounded-2xl p-6 shadow-md border border-amber-100"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-2xl shadow-lg shadow-amber-200 mb-4">
                    {step.icon}
                  </div>
                  <span className="text-xs font-black text-amber-400 tracking-widest mb-1">{step.step}</span>
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/contact"
              className="shine inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-amber-300 hover:scale-105 transition-all duration-300"
            >
              Start Your Journey With Us →
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ───────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-amber-500 text-sm font-bold uppercase tracking-widest">Our Edge</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-gray-900 mt-3">
              Why Choose Property Mines?
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&auto=format&fit=crop', title: '15+ Years of Expertise', desc: 'Deep knowledge of Ghaziabad real estate, built over 15+ years of hands-on experience.' },
              { img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&auto=format&fit=crop', title: '100% Legally Safe Deals', desc: 'Every property is thoroughly verified. We ensure your investment is legally sound and clear.' },
              { img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&auto=format&fit=crop', title: 'End-to-End Guidance', desc: 'From search to registration, we handle every step so you don\'t have to worry about anything.' },
              { img: imgNoHiddenCharges, title: 'No Hidden Charges', desc: 'Transparent fee structure with zero surprises. What we quote is exactly what you pay.' },
              { img: 'https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?w=400&auto=format&fit=crop', title: '24/7 Client Support', desc: 'Our team is always available to answer your questions and address concerns at any time.' },
              { img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&auto=format&fit=crop', title: 'Fast Processing', desc: 'We leverage technology and partnerships to close deals 3x faster than industry average.' },
            ].map((item, i) => (
              <div
                key={i}
                className="card-hover rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 overflow-hidden"
              >
                <div className="h-40 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQS ────────────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-b from-amber-50/60 to-orange-50/40">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-amber-500 text-sm font-bold uppercase tracking-widest">Common Questions</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-gray-900 mt-3">
              Service FAQs
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem
                key={i}
                faq={faq}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-black text-white leading-tight">
            Ready to Start Your<br />Real Estate Journey?
          </h2>
          <p className="text-white/80 mt-4 text-lg max-w-2xl mx-auto">
            Whether you need expert advice, a property valuation, or loan assistance,
            our team is just a call away. Experience the Property Mines difference today.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link
              to="/contact"
              className="shine px-8 py-4 bg-white text-amber-600 font-bold rounded-xl shadow-xl hover:scale-105 transition-all duration-300"
            >
              Contact Us Now →
            </Link>
            <Link
              to="/properties"
              className="px-8 py-4 bg-gray-900 text-white font-bold rounded-xl shadow-xl hover:scale-105 transition-all duration-300"
            >
              Browse Properties
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
