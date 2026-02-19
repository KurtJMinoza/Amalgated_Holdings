import { useState, useEffect, useRef } from 'react'
import { motion as Motion, useInView } from 'motion/react'

/** Count up from 0 to end when inView becomes true. Returns current numeric value. */
function useCountUp(end, inView, { duration = 1600, decimals = 0 } = {}) {
  const [value, setValue] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    const startTime = performance.now()
    const tick = (now) => {
      const elapsed = now - startTime
      const t = Math.min(elapsed / duration, 1)
      const eased = 1 - (1 - t) ** 3 // easeOutCubic
      setValue(eased * end)
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, end, duration, decimals])
  return value
}
import AOS from 'aos'
import 'aos/dist/aos.css'
import logo from '../assets/Amalgated_holdings.png'
import aboutUsImage from '../assets/about-us-section.jpg'
import companyAci from '../assets/amalgated-capital-inc.png'
import companyApmc from '../assets/amalgated-properties-management.png'
import companyAldc from '../assets/amalgated-land-development.png'
import brandMConpinco from '../assets/brand-m-conpinco.png'
import brandAwic from '../assets/brand-awic.png'
import retailHeroImage from '../assets/retail-hero.jpg'
import assetManagementImage from '../assets/asset-management-section.jpg'
import ctaBusinessImage from '../assets/cta-business-environment.png'

// Client logos: fetch from assets/ by filename. Only clients with logoFile are shown.
const clientLogoGlob = import.meta.glob('../assets/*.{png,jpg,jpeg,svg}', { as: 'url', eager: true })
const getAssetLogoUrl = (logoFile) => {
  if (!logoFile) return null
  const key = Object.keys(clientLogoGlob).find((k) => k.endsWith(logoFile) || k.endsWith(logoFile.replace(/ /g, '%20')))
  return key ? clientLogoGlob[key] : null
}

const MAJOR_CLIENTS = [
  { name: 'Pryce Corporation', logoFile: 'pryce.png' },
  { name: 'EastWest Bank', logoFile: 'EastWest_Bank_2011.svg.png' },
  { name: 'Department of Transportation', logoFile: 'Department_of_Transportation_(Philippines).svg.png' },
  { name: 'MinDA', logoFile: 'Minda.png' },
  { name: '7-Eleven', logoFile: '7-Eleven-Logo.png' },
  { name: 'KFC', logoFile: 'KFC_logo-image.svg.png' },
  { name: 'Converge ICT', logoFile: 'converge.png' },
  { name: 'Allianz', logoFile: 'allianza.png' },
  { name: 'PNB', logoFile: 'PNB-logo-scaled.png' },
  { name: 'DITO Telecommunity', logoFile: 'Dito-logo.svg.png' },
  { name: 'UPC Renewables', logoFile: 'UPC.png' },
  { name: 'Oriental Consultants Global', logoFile: 'OC-Grobal.png' },
  { name: 'Rasay Group of Companies', logoFile: null },
  { name: 'ULRIC Solar', logoFile: 'Ulric-Solar-min.png' },
]

function ClientLogo({ client, index, isInView }) {
  const logoUrl = getAssetLogoUrl(client.logoFile)
  if (!logoUrl) return null
  return (
    <Motion.div
      className="flex items-center justify-center grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.15 + index * 0.03 }}
    >
      <img
        src={logoUrl}
        alt={client.name}
        className="max-h-10 sm:max-h-12 w-auto object-contain"
        loading="lazy"
      />
    </Motion.div>
  )
}

const MILESTONES = [
  {
    year: '2024',
    title: 'M. Conpinco Cyclehouse (MCCI) & Amalgated Global Computek (AGC)',
    description: 'IT Technologies & Business Solutions.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    imageAlt: 'Modern corporate office – IT and business solutions',
  },
  {
    year: '2023',
    title: 'Amalgated Land & Development Corporation (ALDC)',
    description: 'Amalgated Industries & Construction Corporation (AICC).',
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800',
    imageAlt: 'Land development and construction',
  },
  {
    year: '2018',
    title: 'Amalgated World Import Corporation (AWIC)',
    description: 'Import & Export Services.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    imageAlt: 'Import and export services',
  },
  {
    year: '2016',
    title: 'Amalgated Properties & Management Corporation (APMC)',
    description: 'Officially operational.',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800',
    imageAlt: 'Properties and management operations',
  },
  {
    year: '2015',
    title: 'Launched',
    description: 'Amalgated Lending Inc. (ALI) • M. Conpinco Home Improvement Supercenter • LPG & other gas retail operations.',
    badge: 'New entities',
    badgeDetail: 'ALI, M. Conpinco, LPG retail',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    imageAlt: 'Lending, retail and LPG operations',
  },
  {
    year: '2010',
    title: 'Incorporated as Amalgated Capital Inc. (ACI)',
    description: 'Focused on office, commercial & residential leasing.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
    imageAlt: 'Office, commercial and residential leasing',
  },
]

function HeroSection() {
  const heroRef = useRef(null)
  const isInView = useInView(heroRef, { amount: 0.2, once: false })

  return (
    <header ref={heroRef} className="relative min-h-screen overflow-hidden -mt-20">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/assets/AH.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-slate-950/95" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 pt-20 sm:px-6 md:pt-24">
        <Motion.div
          className="max-w-3xl pt-16 sm:pt-24"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
            hidden: {},
          }}
        >
          <Motion.h1
            className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            The Amalgated Group
          </Motion.h1>
          <Motion.p
            className="mt-4 text-xl font-medium leading-relaxed text-white sm:text-2xl"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Premier Retailer &amp; Service Provider of Lending, LPG &amp; Leasing in the Philippines.
          </Motion.p>
          <Motion.p
            className="mt-5 text-base leading-relaxed text-[#C9CED4] sm:text-lg"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Delivering excellence in Real Estate, Retail &amp; Distribution, and Financial Services — built on heritage, driven by growth.
          </Motion.p>

          <Motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2F6FA3] px-6 py-3 text-sm font-semibold text-white hover:bg-[#286191] transition"
            >
              Explore Our Businesses
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C9CED4]/20 px-6 py-3 text-sm font-semibold text-white ring-1 ring-[#C9CED4]/50 hover:bg-[#C9CED4]/30 transition"
            >
              Partner With Us
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </Motion.div>
        </Motion.div>
      </div>
    </header>
  )
}

function JourneyTimeline() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { amount: 0.15, once: false })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#F4F6F8] py-12 pl-4 pr-6 sm:py-16 sm:pl-6 sm:pr-8 lg:py-24 lg:pr-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#2F6FA3]/12 blur-3xl" />
        <div className="absolute -bottom-28 -left-28 h-96 w-96 rounded-full bg-[#2F6FA3]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 pr-6 sm:px-6 sm:pr-8 lg:max-w-5xl lg:px-8 lg:pr-12">
        <Motion.div
          className="flex flex-col"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
            hidden: {},
          }}
        >
          <Motion.p
            className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2F6FA3] sm:text-sm"
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Our Journey
          </Motion.p>
          <Motion.h2
            className="mt-1.5 text-xl font-semibold text-[#3A3F45] sm:mt-2 sm:text-3xl lg:text-4xl"
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Historic Milestones
          </Motion.h2>
        </Motion.div>

        {/* Timeline track + items: mobile = left-aligned track; desktop = center */}
        <div className="relative mt-8 pl-7 sm:mt-14 sm:pl-10 md:pl-0 lg:mt-20">
          {/* Track background */}
          <div className="absolute left-[10px] top-0 bottom-0 w-0.5 rounded-full bg-[#C9CED4]/50 sm:left-4 md:left-1/2 md:-translate-x-px" aria-hidden />
          {/* Animated track fill */}
          <div className="absolute left-[10px] top-0 bottom-0 w-0.5 rounded-full sm:left-4 md:left-1/2 md:-translate-x-px">
            <Motion.div
              className="h-full w-full origin-top rounded-full bg-linear-to-b from-[#2F6FA3] via-[#2F6FA3] to-[#2F6FA3]/70"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            />
          </div>

          <ul className="relative space-y-6 sm:space-y-12 md:space-y-16 lg:space-y-20">
            {MILESTONES.map((m, index) => (
              <TimelineItem key={m.year} milestone={m} index={index} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function TimelineItem({ milestone: m, index }) {
  const itemRef = useRef(null)
  const isInView = useInView(itemRef, { amount: 0.25, once: false })
  const isLeft = index % 2 === 0
  const staggerDelay = 0.12 + index * 0.06

  return (
    <li ref={itemRef} className="relative flex flex-col md:flex-row md:items-center md:gap-6 lg:gap-8">
      {/* Node: outer ring + inner dot */}
      <div className="absolute -left-8 top-6 flex h-5 w-5 items-center justify-center sm:-left-10 sm:h-6 sm:w-6 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
        <Motion.div
          className="absolute inset-0 rounded-full bg-[#2F6FA3]/20"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, delay: staggerDelay }}
        />
        <Motion.div
          className="absolute inset-0 rounded-full border-2 border-[#2F6FA3] bg-white shadow-md sm:border-[3px]"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22, delay: staggerDelay + 0.06 }}
        />
        <Motion.div
          className="h-1.5 w-1.5 rounded-full bg-[#2F6FA3] sm:h-2 sm:w-2"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20, delay: staggerDelay + 0.12 }}
        />
      </div>

      {/* Year pill: same horizontal start as card on mobile; centered in gutter on desktop */}
      <div
        className={[
          'relative z-20 flex shrink-0 md:absolute md:top-1/2 md:mb-0 md:-translate-y-1/2',
          'mb-3 ml-4 sm:ml-0',
          'md:left-1/2 md:-translate-x-1/2',
          isLeft ? 'md:left-[calc(50%+0.75rem)] lg:left-[calc(50%+1.25rem)]' : 'md:left-[calc(50%-0.75rem)] lg:left-[calc(50%-1.25rem)]',
        ].join(' ')}
      >
        <Motion.span
          className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[#2F6FA3] px-3 py-1.5 text-xs font-bold leading-none text-white shadow-md ring-2 ring-white sm:px-4 sm:py-2 sm:text-sm"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: staggerDelay + 0.08 }}
        >
          {m.year}
        </Motion.span>
      </div>

      {/* Card */}
      <Motion.div
        className={[
          'relative z-10 w-full overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-[#C9CED4]/30 transition-shadow duration-300 sm:rounded-2xl',
          'ml-4 sm:ml-0 md:w-[calc(50%-2rem)] md:ml-0 lg:w-[calc(50%-2.5rem)]',
          isLeft ? 'md:mr-auto' : 'md:ml-auto',
        ].join(' ')}
        initial={{ opacity: 0, y: 16, x: isLeft ? -24 : 24 }}
        animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 16, x: isLeft ? -24 : 24 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: staggerDelay + 0.1 }}
        whileHover={{ y: -6, boxShadow: '0 20px 40px -12px rgba(47, 111, 163, 0.15)', transition: { duration: 0.25 } }}
      >
        <div className="grid grid-cols-1 gap-0 sm:grid-cols-12 sm:items-stretch">
          <div className="flex flex-col justify-center p-5 sm:col-span-7 sm:min-h-[200px] sm:p-6 md:p-6 lg:p-8">
            <Motion.h3
              className="text-base font-semibold leading-snug tracking-tight text-[#3A3F45] sm:text-lg"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: staggerDelay + 0.2, duration: 0.4 }}
            >
              {m.title}
            </Motion.h3>
            <Motion.p
              className="mt-2.5 text-sm leading-relaxed text-[#3A3F45]/90 sm:mt-3"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: staggerDelay + 0.25, duration: 0.4 }}
            >
              {m.description}
            </Motion.p>
            {m.badge && (
              <Motion.div
                className="mt-5 flex flex-col gap-2 sm:mt-6"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: staggerDelay + 0.3, duration: 0.4 }}
              >
                <span className="inline-flex w-fit rounded-full bg-[#2F6FA3]/10 px-4 py-2 text-sm font-semibold text-[#2F6FA3]">
                  {m.badge}
                </span>
                {m.badgeDetail && (
                  <span className="text-sm leading-relaxed text-[#3A3F45]/80">{m.badgeDetail}</span>
                )}
              </Motion.div>
            )}
          </div>
          <Motion.div
            className="relative h-44 min-h-[180px] overflow-hidden sm:col-span-5 sm:h-auto sm:min-h-[200px]"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: staggerDelay + 0.22, duration: 0.45 }}
          >
            {m.image ? (
              <img
                src={m.image}
                alt={m.imageAlt}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#2F6FA3]/10">
                {m.icon === 'map' && (
                  <svg className="h-14 w-14 text-[#2F6FA3]/50 sm:h-16 sm:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                )}
                {m.icon === 'account_balance' && (
                  <svg className="h-14 w-14 text-[#2F6FA3]/50 sm:h-16 sm:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                )}
              </div>
            )}
          </Motion.div>
        </div>
      </Motion.div>
    </li>
  )
}

const FEATURED_SERVICES = [
  { label: 'Software Development', icon: 'code' },
  { label: 'Infrastructure Management', icon: 'server' },
  { label: 'Network Infrastructure Services', icon: 'network' },
  { label: 'CCTV Surveillance System', icon: 'cctv' },
  { label: 'POS', icon: 'pos' },
  { label: 'Network Firewall System', icon: 'firewall' },
]

const AGC_SERVICES = [
  'IT Services',
  'VOIP System',
  'Software Development',
  'Internet Services',
  'Network Firewall System',
  'Website Design & Development',
  'Outsourcing Microsites for BPOs',
  'Biometric System & CCTV Services',
  'High-speed internet, Wi-Fi, Data centers, and hardware solutions',
]

function IconFor({ icon }) {
  const c = 'h-5 w-5 shrink-0 text-[#2F6FA3]'
  const stroke = 1.6
  if (icon === 'code') return <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={stroke}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 4l-4 4 4 4" /></svg>
  if (icon === 'server') return <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={stroke}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
  if (icon === 'network') return <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={stroke}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1 1 0 001 1h12c1 1 0 001-1m9-9a9 9 0 00-9-9m9 9a9 9 0 010 18z" /></svg>
  if (icon === 'cctv') return <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={stroke}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
  if (icon === 'pos') return <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={stroke}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  if (icon === 'firewall') return <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={stroke}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
  return null
}

function CoreITOfferingsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { amount: 0.08, once: true })

  return (
    <section ref={sectionRef} className="bg-[#F4F6F8] py-16 px-4 sm:py-20 sm:px-6" id="core-it-offerings">
      <div className="mx-auto max-w-7xl">
        <Motion.div
          className="max-w-2xl"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } }, hidden: {} }}
        >
          <Motion.h2
            className="text-2xl font-semibold tracking-tight text-[#3A3F45] sm:text-3xl"
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Core IT Offerings
          </Motion.h2>
          <Motion.p
            className="mt-3 text-[15px] leading-relaxed text-[#3A3F45]/85"
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.04 }}
          >
            Beyond our featured services, we provide specialized solutions to drive your digital transformation.
          </Motion.p>
        </Motion.div>

        {/* Featured Services – editorial list with left accent */}
        <div className="mt-16 lg:mt-20">
          <div className="grid gap-0 lg:grid-cols-12 lg:gap-10">
            <Motion.div
              className="lg:col-span-3"
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <span className="text-xs font-medium uppercase tracking-widest text-[#2F6FA3]">Featured Services</span>
            </Motion.div>
            <ul className="mt-4 lg:col-span-9 lg:mt-0">
              {FEATURED_SERVICES.map((item, index) => (
                <Motion.li
                  key={item.label}
                  className="group relative flex items-center gap-4 border-b border-[#C9CED4]/25 py-4 pl-0 transition-[padding] duration-200 hover:pl-3 hover:border-l-2 hover:border-l-[#2F6FA3] first:pt-0 last:border-b-0"
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: 0.18 + index * 0.055,
                  }}
                >
                  <IconFor icon={item.icon} />
                  <span className="text-[15px] font-medium text-[#3A3F45]">{item.label}</span>
                </Motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* AGC New IT Division – report-style card, no gradient */}
        <Motion.div
          className="mt-20 lg:mt-24"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } }, hidden: {} }}
        >
            <div className="relative overflow-hidden rounded-lg bg-white shadow-[0_1px_3px_rgba(58,63,69,0.08)] ring-1 ring-[#C9CED4]/20">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] overflow-hidden rounded-l-lg" aria-hidden>
              <Motion.div
                className="h-full w-full bg-[#2F6FA3]"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
                style={{ transformOrigin: 'top' }}
              />
            </div>
            <div className="pl-8 pr-6 py-8 sm:pl-10 sm:pr-8 sm:py-10 lg:pl-12 lg:pr-10 lg:py-12">
              <Motion.p
                className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2F6FA3]"
                variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                AGC New IT Division
              </Motion.p>
              <Motion.h3
                className="mt-2 text-xl font-semibold leading-snug text-[#3A3F45] sm:text-2xl lg:text-3xl"
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.03 }}
              >
                Expanding Our Services to Include Comprehensive IT Business Solutions
              </Motion.h3>
              <Motion.p
                className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#3A3F45]/90"
                variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.06 }}
              >
                AGC&apos;s IT division now offers customizable systems with 24/7 support and cross-platform compatibility, including:
              </Motion.p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-2">
                {AGC_SERVICES.map((service, index) => (
                  <Motion.li
                    key={service}
                    className="flex items-start gap-2.5 text-[14px] text-[#3A3F45]/90"
                    variants={{ hidden: { opacity: 0, x: -6 }, visible: { opacity: 1, x: 0 } }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.08 + index * 0.025 }}
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#2F6FA3]/80" aria-hidden />
                    <span>{service}</span>
                  </Motion.li>
                ))}
              </ul>
              <Motion.div
                className="mt-8"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                transition={{ duration: 0.35, delay: 0.35 }}
              >
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2F6FA3] hover:text-[#286191]"
                >
                  Discover More
                  <Motion.span className="inline-block" initial={false} whileHover={{ x: 3 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Motion.span>
                </a>
              </Motion.div>
            </div>
          </div>
        </Motion.div>

      </div>
    </section>
  )
}

const ABOUT_SECTORS = [
  'Real Estate & Asset Management',
  'Retail & Distribution',
  'Lending & Financial Services',
  'LPG Retail Operations',
  'IT & Technology Services',
]

function AboutUsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { amount: 0.12, once: true })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-16 px-4 sm:py-24 sm:px-6 lg:py-28" id="about-us">
      {/* Subtle background accent */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#2F6FA3]/6 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#2F6FA3]/5 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 lg:items-center">
          {/* Content column */}
          <div className="order-2 lg:order-1">
            <div className="relative pl-6 sm:pl-8">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-[#2F6FA3]/20" aria-hidden />
              <div className="absolute left-0 top-0 w-[3px] overflow-hidden rounded-full" style={{ height: 'min(280px, 60%)' }}>
                <Motion.div
                  className="h-full w-full rounded-full bg-[#2F6FA3]"
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                  style={{ transformOrigin: 'top' }}
                />
              </div>
              <Motion.p
                className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2F6FA3]"
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                About Us
              </Motion.p>
              <Motion.h2
                className="mt-3 text-2xl font-semibold tracking-tight text-[#3A3F45] sm:text-3xl lg:text-4xl xl:text-[2.5rem]"
                initial={{ opacity: 0, y: 14 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
              >
                The Amalgated Group
              </Motion.h2>
              <Motion.p
                className="mt-5 text-base leading-relaxed text-[#3A3F45]"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                A diversified holding company engaged in:
              </Motion.p>
              <ul className="mt-6 space-y-4" role="list">
                {ABOUT_SECTORS.map((item, index) => (
                  <Motion.li
                    key={item}
                    className="flex items-center gap-4 text-[15px] text-[#3A3F45]"
                    initial={{ opacity: 0, x: -12 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.15 + index * 0.05 }}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#2F6FA3]/10 text-[#2F6FA3] ring-1 ring-[#2F6FA3]/10">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="font-medium text-[#3A3F45]">{item}</span>
                  </Motion.li>
                ))}
              </ul>
              <Motion.p
                className="mt-8 text-[15px] leading-relaxed text-[#3A3F45]/90"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              >
                From a humble beginning in Davao City, the Group has grown into a nationwide organization managing commercial properties, residential developments, lending centers, retail outlets, and LPG dealerships.
              </Motion.p>
            </div>
          </div>

          {/* Image column */}
          <div className="order-1 lg:order-2">
            <Motion.div
              className="relative"
              initial={{ opacity: 0, x: 24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-[#F4F6F8] shadow-[0_24px_48px_-12px_rgba(58,63,69,0.15)] ring-1 ring-[#C9CED4]/25">
                <div className="aspect-4/3 overflow-hidden">
                  <img
                    src={aboutUsImage}
                    alt="The Amalgated Group — diversified holding company"
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.03]"
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-[#1a1d21]/70 via-transparent to-transparent pointer-events-none" aria-hidden />
              </div>
              <Motion.div
                className="absolute bottom-6 left-6 right-6 sm:right-auto sm:w-72 rounded-xl bg-[#2F6FA3] px-5 py-4 shadow-[0_12px_32px_-8px_rgba(47,111,163,0.4)] ring-1 ring-white/10"
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
              >
                <p className="text-sm font-semibold text-white">Nationwide presence</p>
                <p className="text-xs text-white/90 mt-1">From Davao to the Philippines</p>
              </Motion.div>
            </Motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

const REAL_ESTATE_SERVICES = [
  { label: 'Property Acquisition', icon: 'acquisition' },
  { label: 'Property Management', icon: 'management' },
  { label: 'Office Space Leasing', icon: 'office' },
  { label: 'Residential & Commercial Leasing', icon: 'leasing' },
  { label: 'Joint Venture & Partnership Programs', icon: 'partnership' },
]

function RealEstateServiceIcon({ icon, className = 'h-5 w-5 text-[#2F6FA3]' }) {
  const props = { className, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  if (icon === 'acquisition') {
    return (
      <svg {...props}><path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
    )
  }
  if (icon === 'management') {
    return (
      <svg {...props}><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
    )
  }
  if (icon === 'office') {
    return (
      <svg {...props}><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
    )
  }
  if (icon === 'leasing') {
    return (
      <svg {...props}><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-7 1a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-7-1h6" /></svg>
    )
  }
  if (icon === 'partnership') {
    return (
      <svg {...props}><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
    )
  }
  return null
}

const REAL_ESTATE_COMPANIES = [
  { name: 'Amalgated Capital Inc.', image: companyAci },
  { name: 'Amalgated Properties & Management Corp.', image: companyApmc },
  { name: 'Amalgated Land & Development Corp.', image: companyAldc },
]

const REAL_ESTATE_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800', alt: 'Commercial real estate building' },
  { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600', alt: 'Office space leasing' },
  { url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600', alt: 'Residential and commercial property' },
]

const RETAIL_SERVICES = [
  { label: 'Pryce Gas Products – Retail & Distribution', icon: 'gas' },
  { label: 'FAMES – Furniture, Appliances, Equipment', icon: 'furniture' },
  { label: 'Corporate Accounts & Government Supply', icon: 'corporate' },
  { label: 'Imported Goods – Retail', icon: 'import' },
]

const RETAIL_BRANDS = [
  { name: 'M. Conpinco', image: brandMConpinco },
  { name: 'AWIC', image: brandAwic },
]

const RETAIL_HERO_IMAGE = { src: retailHeroImage, alt: 'Retail and distribution' }

const SERVICES_CATEGORIES = [
  {
    title: 'Lending (Amalgated Lending)',
    icon: 'lending',
    items: [
      'REM (Real Estate Mortgage) Loans',
      'SSS / GSIS / Pension Loans',
      'Travel Assistance Loans',
    ],
  },
  {
    title: 'IT & Technology (AGC)',
    icon: 'it',
    items: [
      'IT Devices Retail Sales',
      'Software & Web Development',
      'Import & Export Services',
      'E-Commerce Solutions',
    ],
  },
  {
    title: 'Construction Services',
    icon: 'construction',
    items: [
      'Equipment Sales & Rentals',
      'Construction & Infrastructure Services',
    ],
  },
]

function RetailServiceIcon({ icon, className = 'h-5 w-5 text-[#2F6FA3]' }) {
  const props = { className, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  if (icon === 'gas') {
    return (<svg {...props}><path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 012 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2h-2m-4-1v8m-13 1a2 2 0 002 2h10a2 2 0 002-2V7m-10 1a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>)
  }
  if (icon === 'furniture') {
    return (<svg {...props}><path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2H4V6zM4 16h16v-2H4v2zm16-6v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6a2 2 0 012-2h2a2 2 0 012 2z" /></svg>)
  }
  if (icon === 'corporate') {
    return (<svg {...props}><path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>)
  }
  if (icon === 'import') {
    return (<svg {...props}><path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>)
  }
  return null
}

const MISSION_STAKEHOLDERS = [
  'Partners',
  'Employees',
  'Tenants & Suppliers',
  'Banks & Cooperatives',
  'Government Institutions',
  'Property & Landowners',
  'Agents',
]

const CORE_VALUES = [
  'Compassion',
  'Leadership',
  'Integrity',
  'Excellence',
  'Nurtureship',
  'Teamwork',
  'Sense of Urgency',
]

const CORE_VALUES_CARDS = [
  {
    icon: 'heart',
    title: 'Compassionate',
    description: 'We care about the well-being and the success of every person we serve. We make a difference in every community we serve.',
  },
  {
    icon: 'flag',
    title: 'Leadership',
    description: 'We respect, we listen to our people and get things done.',
  },
  {
    icon: 'shield',
    title: 'Integrity',
    description: 'We will hold to our convictions regardless of the consequences and never compromise our values even if it affects our bottom line.',
  },
  {
    icon: 'star',
    title: 'Excellence',
    description: 'High standards are a way of life. We pursue excellence in everything we do.',
  },
  {
    icon: 'heart',
    title: 'Nurtureship',
    description: 'We help everyone to learn, to maximize their performance by unlocking their potential. We give everyone the path to find answers, not the answer.',
  },
  {
    icon: 'team',
    title: 'Teamwork',
    description: 'We work as a team toward a common vision. By getting everyone in the organization rowing in the same direction we will dominate any competition, at any time.',
  },
  {
    icon: 'clock',
    title: 'Sense of Urgency',
    description: 'We believe in getting goals done now in a short period of time to avoid losses.',
  },
]

const PHILOSOPHY_CARDS = [
  { icon: 'heart', title: 'Compassion' },
  { icon: 'star', title: 'Excellence' },
  { icon: 'team', title: 'Teamwork' },
  { icon: 'handshake', title: 'Service' },
]

function PhilosophyCardIcon({ icon, className = 'h-6 w-6' }) {
  const c = `${className} text-[#2F6FA3]`
  if (icon === 'heart') {
    return <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
  }
  if (icon === 'star') {
    return <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
  }
  if (icon === 'team') {
    return <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><path d="M9 11a3 3 0 100-6 3 3 0 000 6z" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>
  }
  if (icon === 'handshake') {
    return <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" /></svg>
  }
  if (icon === 'shield') {
    return <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
  }
  if (icon === 'flag') {
    return <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2z" /><path d="M9 6.5V9" /></svg>
  }
  if (icon === 'clock') {
    return <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 3" /><circle cx="12" cy="12" r="10" /></svg>
  }
  return null
}

function VisionMissionSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { amount: 0.08, once: true })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#FAFAFA] py-16 px-4 sm:py-24 sm:px-6 lg:py-28" id="vision-mission">
      <div className="relative mx-auto max-w-6xl">
        {/* OUR PHILOSOPHY – small uppercase label (warm accent like reference) */}
        <Motion.p
          className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-[#2F6FA3]"
          initial={{ opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          Our Philosophy
        </Motion.p>

        {/* Main heading */}
        <Motion.h2
          className="text-center mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1f2937] tracking-tight max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Vision & Mission: Our Philosophy
        </Motion.h2>

        {/* Introductory paragraph – centered */}
        <Motion.p
          className="text-center mt-5 max-w-2xl mx-auto text-[15px] sm:text-[16px] text-[#4b5563] leading-relaxed"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Our leadership brand is defined by our unwavering commitment to our core philosophy. We care for the lives of our Partners, Employees, Tenants & Suppliers, and all stakeholders—by providing services and facilities that exceed expectations. We are caring Amalgated Leaders.
        </Motion.p>

        {/* Four value cards – single row, equal width */}
        <div className="mt-14 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {PHILOSOPHY_CARDS.map((card, index) => (
            <Motion.div
              key={card.title}
              className="rounded-xl bg-white p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.06)] ring-1 ring-[#e5e7eb]/80"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.12 + index * 0.06 }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#E0EFF9] text-[#2F6FA3]">
                <PhilosophyCardIcon icon={card.icon} />
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#1f2937] tracking-tight">
                {card.title}
              </h3>
            </Motion.div>
          ))}
        </div>

        {/* Core Values – The Amalgated Way */}
        <Motion.div
          className="mt-14 sm:mt-16"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#2F6FA3] mb-2">
            The Amalgated Way
          </p>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#2F6FA3] mb-8">
            Core Values
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {CORE_VALUES_CARDS.map((card, index) => (
              <Motion.div
                key={card.title}
                className="rounded-xl bg-white p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.06)] ring-1 ring-[#e5e7eb]/80 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.28 + index * 0.05 }}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#E0EFF9] text-[#2F6FA3]">
                  <PhilosophyCardIcon icon={card.icon} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#1f2937] tracking-tight">
                  {card.title}
                </h3>
                <p className="mt-3 text-[14px] sm:text-[15px] text-[#6b7280] leading-relaxed grow">
                  {card.description}
                </p>
              </Motion.div>
            ))}
          </div>
        </Motion.div>
      </div>
    </section>
  )
}

function BusinessModelsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { amount: 0.1, once: true })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#F4F6F8] py-16 px-4 sm:py-24 sm:px-6 lg:py-28" id="business-models">
      <div className="pointer-events-none absolute -right-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[#2F6FA3]/8 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-7xl">
        {/* Section header */}
        <Motion.div
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }, hidden: {} }}
        >
          <Motion.p
            className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2F6FA3]"
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Our Business Models
          </Motion.p>
          <Motion.h2
            className="mt-3 text-2xl font-semibold tracking-tight text-[#3A3F45] sm:text-3xl lg:text-4xl"
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          >
            How We Operate
          </Motion.h2>
        </Motion.div>

        {/* Real Estate block */}
        <Motion.div
          className="rounded-2xl bg-white shadow-[0_4px_24px_-4px_rgba(58,63,69,0.12)] ring-1 ring-[#C9CED4]/20 overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-0">
            {/* Content */}
            <div className="lg:col-span-6 flex flex-col justify-center p-8 sm:p-10 lg:p-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2F6FA3] text-base font-bold text-white shadow-lg shadow-[#2F6FA3]/25">
                  1
                </span>
                <Motion.h3
                  className="text-xl font-semibold tracking-tight text-[#3A3F45] sm:text-2xl"
                  initial={{ opacity: 0, x: -8 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.25 }}
                >
                  Real Estate
                </Motion.h3>
              </div>
              <ul className="space-y-3" role="list">
                {REAL_ESTATE_SERVICES.map((item, index) => (
                  <Motion.li
                    key={item.label}
                    className="flex items-center gap-3 text-[15px] text-[#3A3F45]"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.35, delay: 0.3 + index * 0.04 }}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2F6FA3]/10 ring-1 ring-[#2F6FA3]/10">
                      <RealEstateServiceIcon icon={item.icon} />
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </Motion.li>
                ))}
              </ul>
              <Motion.div
                className="mt-8 pt-6 border-t border-[#C9CED4]/30"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.55 }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-[#2F6FA3] mb-3">Companies</p>
                <ul className="space-y-3" role="list">
                  {REAL_ESTATE_COMPANIES.map((company, index) => (
                    <Motion.li
                      key={company.name}
                      className="text-sm font-medium text-[#3A3F45] flex items-center gap-3"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white ring-1 ring-[#C9CED4]/30">
                        <img
                          src={company.image}
                          alt=""
                          className="h-8 w-8 object-contain"
                        />
                      </span>
                      {company.name}
                    </Motion.li>
                  ))}
                </ul>
              </Motion.div>
            </div>

            {/* Images */}
            <div className="lg:col-span-6 relative min-h-[280px] sm:min-h-[340px] lg:min-h-[420px]">
              <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-12 gap-0">
                <Motion.div
                  className="relative sm:col-span-8 h-52 sm:h-full"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <img
                    src={REAL_ESTATE_IMAGES[0].url}
                    alt={REAL_ESTATE_IMAGES[0].alt}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" aria-hidden />
                </Motion.div>
                <div className="hidden sm:grid sm:col-span-4 grid-rows-2 gap-0">
                  <Motion.div
                    className="relative"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.35 }}
                  >
                    <img
                      src={REAL_ESTATE_IMAGES[1].url}
                      alt={REAL_ESTATE_IMAGES[1].alt}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </Motion.div>
                  <Motion.div
                    className="relative"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <img
                      src={REAL_ESTATE_IMAGES[2].url}
                      alt={REAL_ESTATE_IMAGES[2].alt}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </Motion.div>
                </div>
              </div>
              {/* Fallback: single image on small screens when grid is hidden */}
              <div className="sm:hidden relative h-52">
                <img
                  src={REAL_ESTATE_IMAGES[0].url}
                  alt={REAL_ESTATE_IMAGES[0].alt}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent pointer-events-none" aria-hidden />
              </div>
            </div>
          </div>

          {/* Mobile: show 2nd and 3rd images as a small row below main image */}
          <div className="sm:hidden grid grid-cols-2 gap-0">
            <div className="relative h-36">
              <img src={REAL_ESTATE_IMAGES[1].url} alt={REAL_ESTATE_IMAGES[1].alt} className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="relative h-36">
              <img src={REAL_ESTATE_IMAGES[2].url} alt={REAL_ESTATE_IMAGES[2].alt} className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>
        </Motion.div>

        {/* Retail & Distribution block – unique layout: single image left, content right */}
        <Motion.div
          className="mt-12 sm:mt-16 rounded-2xl bg-white shadow-[0_4px_24px_-4px_rgba(58,63,69,0.12)] ring-1 ring-[#C9CED4]/20 overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-0">
            {/* Single hero image – LEFT on desktop (opposite of Real Estate) */}
            <div className="relative order-2 lg:order-1 lg:col-span-5 min-h-[260px] sm:min-h-[320px] lg:min-h-[480px]">
              <Motion.div
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.28 }}
              >
                <img
                  src={RETAIL_HERO_IMAGE.src}
                  alt={RETAIL_HERO_IMAGE.alt}
                  className="h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/30 via-transparent to-transparent lg:from-black/20 pointer-events-none" aria-hidden />
              </Motion.div>
            </div>

            {/* Content – RIGHT on desktop */}
            <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col justify-center p-8 sm:p-10 lg:p-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2F6FA3] text-base font-bold text-white shadow-lg shadow-[#2F6FA3]/25">
                  2
                </span>
                <Motion.h3
                  className="text-xl font-semibold tracking-tight text-[#3A3F45] sm:text-2xl"
                  initial={{ opacity: 0, x: 8 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  Retail & Distribution
                </Motion.h3>
              </div>
              <ul className="space-y-3" role="list">
                {RETAIL_SERVICES.map((item, index) => (
                  <Motion.li
                    key={item.label}
                    className="flex items-center gap-3 text-[15px] text-[#3A3F45]"
                    initial={{ opacity: 0, x: 10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.35, delay: 0.35 + index * 0.04 }}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2F6FA3]/10 ring-1 ring-[#2F6FA3]/10">
                      <RetailServiceIcon icon={item.icon} />
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </Motion.li>
                ))}
              </ul>
              <Motion.div
                className="mt-8 pt-6 border-t border-[#C9CED4]/30"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-[#2F6FA3] mb-3">Brands</p>
                <ul className="space-y-3" role="list">
                  {RETAIL_BRANDS.map((brand, index) => (
                    <Motion.li
                      key={brand.name}
                      className="text-sm font-medium text-[#3A3F45] flex items-center gap-3"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.65 + index * 0.05 }}
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white ring-1 ring-[#C9CED4]/30">
                        <img src={brand.image} alt="" className="h-8 w-8 object-contain" />
                      </span>
                      {brand.name}
                    </Motion.li>
                  ))}
                </ul>
              </Motion.div>
            </div>
          </div>
        </Motion.div>
      </div>
    </section>
  )
}

function ServicesCategoryIcon({ icon, className = 'h-6 w-6 text-[#2F6FA3]' }) {
  const props = { className, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  if (icon === 'lending') {
    return (
      <svg {...props}><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    )
  }
  if (icon === 'it') {
    return (
      <svg {...props}><path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /><path d="M10 14h4" /></svg>
    )
  }
  if (icon === 'construction') {
    return (
      <svg {...props}><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
    )
  }
  return null
}

function ServicesSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { amount: 0.08, once: true })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-16 px-4 sm:py-24 sm:px-6 lg:py-28" id="services">
      <div className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-[#2F6FA3]/6 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-7xl">
        <Motion.div
          className="text-center max-w-2xl mx-auto mb-14 sm:mb-16"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.06 } }, hidden: {} }}
        >
          <Motion.p
            className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2F6FA3]"
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Services
          </Motion.p>
          <Motion.h2
            className="mt-3 text-2xl font-semibold tracking-tight text-[#3A3F45] sm:text-3xl lg:text-4xl"
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
          >
            What We Offer
          </Motion.h2>
        </Motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {SERVICES_CATEGORIES.map((category, index) => (
            <Motion.div
              key={category.title}
              className="relative rounded-2xl bg-[#F4F6F8] p-8 sm:p-9 ring-1 ring-[#C9CED4]/20 hover:ring-[#2F6FA3]/30 transition-shadow duration-300 hover:shadow-[0_12px_40px_-12px_rgba(47,111,163,0.2)]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 + index * 0.08 }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-[#2F6FA3]/20" aria-hidden />
              <Motion.div
                className="absolute left-0 top-0 w-1 rounded-l-2xl bg-[#2F6FA3]"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: 'top', height: 'min(120px, 40%)' }}
              />
              <div className="flex items-start gap-4 mb-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2F6FA3]/10 ring-1 ring-[#2F6FA3]/15">
                  <ServicesCategoryIcon icon={category.icon} />
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-[#3A3F45] pt-1.5">
                  {category.title}
                </h3>
              </div>
              <ul className="space-y-2.5" role="list">
                {category.items.map((item, i) => (
                  <Motion.li
                    key={item}
                    className="flex items-center gap-2.5 text-[15px] text-[#3A3F45]/90"
                    initial={{ opacity: 0, x: -6 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.35, delay: 0.25 + index * 0.08 + i * 0.03 }}
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2F6FA3]/70" aria-hidden />
                    {item}
                  </Motion.li>
                ))}
              </ul>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const PROJECT_101_CARDS = [
  {
    category: 'Target Growth',
    icon: 'chart',
    countEnd: 10,
    valueSuffix: 'Billion',
    valueSuffixAccent: true,
    unit: 'USD 200 Million',
    description: 'Combined fixed and financing assets',
  },
  {
    category: 'Development',
    icon: 'building',
    countEnd: 101,
    unit: 'Buildings, Facilities & Branches',
    description: 'Nationwide presence',
  },
  {
    category: 'Network',
    icon: 'agents',
    countEnd: 1001,
    unit: 'Agents',
    description: 'LPG retail outlets nationwide',
  },
]

function Project101Icon({ icon, className = 'h-6 w-6' }) {
  const c = `${className} text-[#2F6FA3]`
  const p = { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  if (icon === 'chart') {
    return <svg className={c} {...p}><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg>
  }
  if (icon === 'building') {
    return <svg className={c} {...p}><path d="M3 21h18" /><path d="M5 21V7l7-4 7 4v14" /><path d="M9 21v-6h6v6" /><path d="M9 11h6" /></svg>
  }
  if (icon === 'agents') {
    return <svg className={c} {...p}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><path d="M9 11a3 3 0 100-6 3 3 0 000 6z" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>
  }
  return null
}

function Project101CardValue({ card, isInView }) {
  const value = useCountUp(card.countEnd, isInView, { duration: 1600 })
  const display = card.countEnd >= 1000 ? Math.round(value).toLocaleString() : Math.round(value)
  return (
    <>
      {display}
      {card.valueSuffix && (
        <span className={card.valueSuffixAccent ? 'text-[#2F6FA3]' : ''}> {card.valueSuffix}</span>
      )}
    </>
  )
}

function Project101Section() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { amount: 0.08, once: true })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#F4F6F8] py-16 px-4 sm:py-24 sm:px-6 lg:py-28" id="project-101">
      <div className="relative mx-auto max-w-7xl">
        {/* Header: label, title, description, and button */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-10">
          <div>
            <Motion.p
              className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2F6FA3]"
              initial={{ opacity: 0, y: 6 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
            >
              Strategic Roadmap
            </Motion.p>
            <Motion.h2
              className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1f2937] tracking-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              Project 101 – Our Growth Target
            </Motion.h2>
            <Motion.p
              className="mt-3 max-w-xl text-[15px] sm:text-[16px] text-[#4b5563] leading-relaxed"
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Our bold strategic vision for the next decade. We are committed to scaling our impact through tangible milestones.
            </Motion.p>
          </div>
          <Motion.a
            href="#"
            className="order-first lg:order-0 shrink-0 inline-flex items-center gap-2 rounded-xl border border-[#C9CED4]/60 bg-transparent px-5 py-2.5 text-[14px] font-medium text-[#3A3F45] hover:border-[#2F6FA3]/50 hover:text-[#2F6FA3] transition-colors"
            initial={{ opacity: 0, y: 6 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.12 }}
          >
            View Strategic Report
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </Motion.a>
        </div>

        <Motion.div
          className="mt-8 border-t border-[#C9CED4]/40 pt-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        />

        {/* Three cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-10">
          {PROJECT_101_CARDS.map((card, index) => (
            <Motion.div
              key={card.category}
              className="rounded-2xl bg-white p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06)] ring-1 ring-[#e5e7eb]/80"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 + index * 0.08 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E0EFF9] text-[#2F6FA3]">
                  <Project101Icon icon={card.icon} />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7280]">
                  {card.category}
                </span>
              </div>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1f2937] tracking-tight">
                <Project101CardValue card={card} isInView={isInView} />
              </p>
              <p className="mt-1 text-[15px] sm:text-[16px] font-medium text-[#3A3F45]">
                {card.unit}
              </p>
              <p className="mt-4 text-[14px] sm:text-[15px] text-[#6b7280] leading-relaxed">
                {card.description}
              </p>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const ASSET_ITEMS = [
  { end: 90, suffix: '+', label: 'Commercial Real Estate Properties Nationwide' },
  { end: 12, label: 'Residential Real Estate Properties' },
  { end: 37, suffix: '+', label: 'Retail & Sales Centers' },
  { end: 10, label: 'Retail Centers (FAMES)' },
  { end: 6, label: 'Lending Centers' },
  { end: 15, label: 'LPG Centers' },
  { end: 4.4, prefix: 'Close to PHP ', suffix: ' Billion', decimals: 1, label: 'Lease Receivables' },
]

function AssetStatRow({ item, isInView, index }) {
  const raw = useCountUp(item.end, isInView, { duration: 1800, decimals: item.decimals ?? 0 })
  const display =
    (item.prefix ?? '') +
    (item.decimals != null ? raw.toFixed(item.decimals) : Math.round(raw).toLocaleString()) +
    (item.suffix ?? '')
  return (
    <Motion.li
      className="flex flex-col"
      initial={{ opacity: 0, y: 8 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.04 }}
    >
      <span className="text-xl sm:text-2xl font-bold text-[#1A202C]">{display}</span>
      <span className="mt-0.5 text-[14px] sm:text-[15px] text-[#6b7280]">{item.label}</span>
    </Motion.li>
  )
}

function AssetManagementSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { amount: 0.08, once: true })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#F8FAFC] py-16 px-4 sm:py-24 sm:px-6 lg:py-28" id="asset-management">
      <div className="relative mx-auto max-w-7xl rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-0 lg:min-h-[420px]">
          {/* Left panel – content */}
          <div className="flex flex-col justify-center bg-[#F8FAFC] p-6 sm:p-8 lg:p-12">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="inline-flex items-center rounded-lg bg-[#2F6FA3] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                Nationwide
              </span>
              <span className="text-sm font-medium uppercase tracking-wider text-[#6b7280]">
                Asset Management
              </span>
            </div>
            <Motion.h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A202C] tracking-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              Unrivaled Reach Across the Philippines
            </Motion.h2>
            <ul className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 sm:gap-y-5" role="list">
              {ASSET_ITEMS.map((item, i) => (
                <AssetStatRow key={item.label} item={item} isInView={isInView} index={i} />
              ))}
            </ul>
            <Motion.a
              href="#"
              className="mt-8 inline-flex items-center gap-2 rounded-xl border border-[#C9CED4]/80 bg-white/80 px-5 py-2.5 text-[14px] font-medium text-[#3A3F45] hover:border-[#2F6FA3]/50 hover:text-[#2F6FA3] transition-colors w-fit"
              initial={{ opacity: 0, y: 6 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
              View Property Map
            </Motion.a>
          </div>

          {/* Right panel – asset image + latest acquisition */}
          <Motion.div
            className="relative flex flex-col bg-[#F1F5F9] p-4 sm:p-6 lg:p-6 rounded-r-2xl lg:rounded-l-none rounded-t-2xl lg:rounded-t-none"
            initial={{ opacity: 0, x: 12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="relative w-full h-[260px] sm:h-[300px] lg:h-[340px] rounded-xl overflow-hidden ring-1 ring-[#e2e8f0] bg-white">
              <img
                src={assetManagementImage}
                alt="Commercial real estate and nationwide asset portfolio – Amalgated Holdings"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="w-full max-w-sm rounded-xl border border-[#e2e8f0] bg-white p-5 shadow-sm mt-4 sm:mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6b7280]">Latest Acquisition</p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                <p className="text-lg font-semibold text-[#1A202C]">Taguig Corporate Center</p>
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">Active</span>
              </div>
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  )
}

const CLIENT_CATEGORIES = [
  {
    title: 'Office Spaces',
    description: 'Premium office leasing and workspace solutions for enterprises and growing businesses.',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
  },
  {
    title: 'Commercial Lots',
    description: 'Strategic commercial land and retail locations for development and investment.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
  },
  {
    title: 'Residential Units',
    description: 'Quality residential properties and housing options for families and investors.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
  },
]

function OurClientsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { amount: 0.08, once: true })
  const clientsWithLogos = MAJOR_CLIENTS.filter((c) => c.logoFile)
  const duplicated = [...clientsWithLogos, ...clientsWithLogos]

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-16 px-4 sm:py-24 sm:px-6 lg:py-28" id="our-clients">
      <div className="relative mx-auto max-w-7xl">
        {/* Our Clients – title and intro */}
        <Motion.p
          className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-[#2F6FA3] mb-3"
          initial={{ opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          Our Clients
        </Motion.p>
        <Motion.h2
          className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A202C] tracking-tight mb-4"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Who We Serve
        </Motion.h2>
        <Motion.p
          className="text-center max-w-2xl mx-auto text-[15px] sm:text-[16px] text-[#6b7280] leading-relaxed mb-12"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          We serve both public and private sectors across office spaces, commercial lots, and residential units.
        </Motion.p>

        {/* Category cards – Office Spaces, Commercial Lots, Residential Units */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3 lg:gap-8 mb-12 sm:mb-16 lg:mb-20">
          {CLIENT_CATEGORIES.map((category, index) => (
            <Motion.div
              key={category.title}
              className="group relative rounded-2xl overflow-hidden bg-[#F4F6F8] ring-1 ring-[#e5e7eb]/80 shadow-sm hover:shadow-[0_8px_30px_rgba(47,111,163,0.12)] hover:ring-[#2F6FA3]/20 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 + index * 0.08 }}
            >
              <div className="aspect-4/3 relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#1A202C]/80 via-[#1A202C]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-sm">
                    {category.title}
                  </h3>
                  <p className="mt-1.5 text-[14px] sm:text-[15px] text-white/90 leading-snug line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </div>
            </Motion.div>
          ))}
        </div>

        {/* Trusted by brands – scrolling logos */}
        <Motion.p
          className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7280] mb-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          Trusted by Industry Leaders & Global Brands
        </Motion.p>
        <div className="relative w-full overflow-hidden">
          <div
            className="flex items-center justify-start gap-x-12 sm:gap-x-16 w-max animate-client-logo-scroll"
            style={{ willChange: 'transform' }}
          >
            {duplicated.map((client, index) => (
              <ClientLogo key={`${client.name}-${index}`} client={client} index={index} isInView={true} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const PERF_METRICS = [
  { value: 1000, suffix: '+', label: 'Accounts' },
  { value: 88, suffix: '%', label: 'Collection Efficiency' },
  { value: 15, valueEnd: 20, suffix: '%', label: 'Annual Sales Growth' },
]

const PORTFOLIO_RATIO = [
  { pct: 75, label: 'Secured Loans (REM)' },
  { pct: 15, label: 'SSS / GSIS / Pension' },
  { pct: 10, label: 'Travel Assistance' },
]

function PerformanceMetricsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { amount: 0.08, once: true })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-16 px-4 sm:py-24 sm:px-6 lg:py-28" id="performance-metrics">
      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Left card – dark theme (Performance Metrics) */}
          <Motion.div
            className="relative min-w-0 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-5 sm:p-6 lg:p-8 transition-shadow duration-300 hover:shadow-[0_24px_48px_-12px_rgba(15,23,42,0.4)]"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Decorative gradient orb */}
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#2F6FA3]/20 blur-3xl" aria-hidden />
            <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden />

            <Motion.div
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" />
              </svg>
            </Motion.div>
            <Motion.h2
              className="relative mt-4 text-2xl sm:text-3xl font-bold text-white tracking-tight"
              initial={{ opacity: 0, x: -8 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              Performance Metrics
            </Motion.h2>
            <ul className="relative mt-6 space-y-5">
              {[
                { end: 1000, suffix: '+', label: 'Accounts' },
                { end: 88, suffix: '%', label: 'Collection Efficiency' },
                { range: true, endLow: 15, endHigh: 20, suffix: '%', label: 'Annual Sales Growth' },
              ].map((item, index) => (
                <Motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 + index * 0.12 }}
                  className="rounded-xl bg-white/[0.06] p-4 backdrop-blur-sm border border-white/[0.08]"
                >
                  <p className="text-3xl sm:text-4xl font-bold text-white tabular-nums">
                    {item.range ? (
                      <>
                        <PerfCountUp end={item.endLow} inView={isInView} />–<PerfCountUp end={item.endHigh} inView={isInView} />
                        {item.suffix}
                      </>
                    ) : (
                      <>
                        <PerfCountUp end={item.end} inView={isInView} />
                        {item.suffix}
                      </>
                    )}
                  </p>
                  <p className="mt-0.5 text-sm text-white/70">{item.label}</p>
                </Motion.li>
              ))}
            </ul>
          </Motion.div>

          {/* Right card – light theme (Next-Gen Projects) */}
          <Motion.div
            className="relative min-w-0 rounded-2xl bg-white p-5 sm:p-6 lg:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] ring-1 ring-[#e5e7eb]/80 transition-all duration-300 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] hover:ring-[#2F6FA3]/20"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1A202C] tracking-tight">
                  Next-Gen Projects
                </h3>
                <p className="mt-1 text-sm text-[#6b7280]">
                  Maintaining Portfolio Ratio
                </p>
              </div>
              <Motion.span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E0EFF9] text-[#2F6FA3]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.35, delay: 0.3 }}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7h-10v10" /></svg>
              </Motion.span>
            </div>

            {/* Animated ratio bar */}
            <Motion.div
              className="mt-6 h-2 rounded-full overflow-hidden bg-[#e5e7eb]"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="flex h-full w-full">
                {PORTFOLIO_RATIO.map((item, i) => (
                  <Motion.div
                    key={item.label}
                    className={`h-full bg-[#2F6FA3] ${i === 0 ? 'rounded-l-full' : ''} ${i === PORTFOLIO_RATIO.length - 1 ? 'rounded-r-full' : ''}`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${item.pct}%` } : {}}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.35 + i * 0.1 }}
                  />
                ))}
              </div>
            </Motion.div>

            <div className="mt-6 space-y-3">
              {PORTFOLIO_RATIO.map((item, index) => (
                <Motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.25 + index * 0.1 }}
                  className="flex items-center gap-4 rounded-xl bg-[#F8FAFC] p-4 ring-1 ring-[#e5e7eb]/60 transition-colors duration-200 hover:ring-[#2F6FA3]/30"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2F6FA3]/10 text-[#2F6FA3] tabular-nums">
                    <span className="text-sm font-bold">
                      <PerfCountUp end={item.pct} inView={isInView} />%
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-[#1A202C]">{item.label}</p>
                  </div>
                </Motion.div>
              ))}
            </div>
            <Motion.div
              className="mt-6 pt-6 border-t border-[#e5e7eb]"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <p className="text-[15px] font-semibold text-[#1A202C]">
                Target: <span className="text-[#2F6FA3] tabular-nums"><PerfCountUp end={500} inView={isInView} />M by 2025</span>
              </p>
              <p className="mt-2 text-[14px] sm:text-[15px] text-[#6b7280] leading-relaxed">
                Launching Bridge Financing as part of ALI’s niche portfolio.
              </p>
            </Motion.div>
          </Motion.div>
        </div>
      </div>
    </section>
  )
}

function PerfCountUp({ end, inView }) {
  const value = useCountUp(end, inView, { duration: 1400 })
  return <>{Math.round(value)}</>
}

function CallToActionSection() {
  return (
    <section
      className="relative overflow-hidden bg-[#F4F6F8] px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
      id="contact"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="relative flex flex-col overflow-hidden rounded-2xl bg-[#2F6FA3] shadow-xl lg:flex-row">
          {/* Business image */}
          <div className="relative h-48 w-full shrink-0 bg-[#1e4d7a] sm:h-56 lg:h-auto lg:min-h-[320px] lg:w-[45%]">
            <img
              src={ctaBusinessImage}
              alt="Modern business environment"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[#2F6FA3]/20" aria-hidden />
          </div>

          {/* Content on brand background */}
          <div className="flex flex-1 flex-col justify-center px-5 py-8 sm:px-8 sm:py-10 lg:px-14 lg:py-14">
            <h2 id="cta-heading" className="text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl lg:text-4xl">
              Partner With The Amalgated Group
            </h2>
            <p className="mt-4 text-base text-white/90 sm:text-lg">
              Be part of a growing nationwide enterprise focused on Real Estate, Retail & Distribution, Financial Services, LPG Operations, and IT & Technology.
            </p>
            <div className="mt-6 sm:mt-8">
              <a
                href="#contact"
                className="inline-flex w-full min-h-[44px] items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-[#2F6FA3] transition hover:bg-white/95 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#2F6FA3] sm:w-auto"
              >
                Contact us today
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const FOOTER_NAV = [
  {
    title: 'Company',
    links: [
      { label: 'Home', href: '#' },
      { label: 'Our Story', href: '#' },
      { label: 'Vision & Mission', href: '#' },
      { label: 'Leadership', href: '#' },
      { label: 'Project 101', href: '#' },
      { label: 'Performance Metrics', href: '#' },
      { label: 'Careers', href: '#' },
    ],
  },
  {
    title: 'Operations',
    links: [
      { label: 'Real Estate', href: '#' },
      { label: 'Retail & Distribution', href: '#' },
      { label: 'Lending Services', href: '#' },
      { label: 'Assets & Facilities', href: '#' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Office Locations', href: '#' },
      { label: 'Inquiry Form', href: '#' },
      { label: 'Partnership Requests', href: '#' },
    ],
  },
]

function Footer() {
  const currentYear = new Date().getFullYear()
  const linkClass = 'text-sm text-white/70 transition-colors hover:text-white'

  return (
    <footer className="bg-[#0f172a] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:py-14">
        {/* Top: logo + CTA (single distinct button) */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <a href="#" className="flex items-center gap-3 min-w-0">
            <img src={logo} alt="Amalgated Holdings Logo" className="h-8 w-auto shrink-0 sm:h-9" />
            <span className="text-sm font-semibold tracking-wide text-white truncate sm:text-base">Amalgated Holdings</span>
          </a>
          <a
            href="#contact"
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 self-center rounded-lg bg-[#2F6FA3] px-5 py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(47,111,163,0.35)] transition-all hover:bg-[#286191] hover:shadow-[0_4px_12px_rgba(47,111,163,0.4)] focus:outline-none focus:ring-2 focus:ring-[#2F6FA3] focus:ring-offset-2 focus:ring-offset-[#0f172a] sm:w-auto sm:py-2.5"
          >
            Contact us
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Footer navigation */}
        <nav className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4" aria-label="Footer navigation">
          {FOOTER_NAV.map((group) => (
            <div key={group.title}>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/90 mb-4">
                {group.title}
              </p>
              <ul className="space-y-2.5">
                {group.links.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className={linkClass}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <p className="mt-10 pt-8 text-center text-sm text-white/50 border-t border-white/10">
          © {currentYear} Amalgated Holdings. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(() => new Set())

  const toggleMobileExpanded = (key) => {
    setMobileExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false)
    }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])


  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    })
  }, [])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const aboutItems = ['Our Story / History', 'Vision & Mission', 'Leadership & Core Values', 'Project 101']
  const businessesItems = ['Real Estate', 'Retail & Distribution', 'Lending Services', 'LPG Operations', 'IT & Technology', 'Construction Services']
  const assetsItems = ['Commercial Properties', 'Residential Properties', 'Retail Centers', 'Lending Centers', 'LPG Centers']
  const clientsItems = ['Corporate Clients', 'Government Clients', 'Case Studies']
  const portfolioItems = ['Growth Milestones', 'Performance Metrics', 'Expansion Plans']
  const careersItems = ['Why Join Us', 'Open Positions']
  const contactItems = ['Office Locations', 'Inquiry Form', 'Partnership Requests']
  const navLinkClass = [
    'transition',
    isScrolled ? 'text-[#3A3F45] hover:text-[#2F6FA3]' : 'text-white/90 hover:text-[#C9CED4]',
  ].join(' ')
  const navButtonClass = [
    'flex items-center gap-1 transition',
    isScrolled ? 'text-[#3A3F45] hover:text-[#2F6FA3]' : 'text-white/90 hover:text-[#C9CED4]',
  ].join(' ')

  return (
    <div className="min-h-screen bg-[#F4F6F8] text-[#3A3F45]">
      <nav
        className={[
          'sticky top-0 z-20 w-full transition-colors',
          isScrolled
            ? 'bg-[#F4F6F8]/85 backdrop-blur-md border-b border-[#C9CED4]/60'
            : 'bg-transparent',
        ].join(' ')}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:px-6 sm:py-4 md:py-5">
          <a href="#" className="flex min-w-0 items-center gap-2 sm:gap-3" onClick={() => setMobileMenuOpen(false)}>
            <img
              src={logo}
              alt="Amalgated Holdings Logo"
              className="h-8 w-auto shrink-0 align-middle sm:h-10"
            />
            <span
              className={[
                'truncate text-base font-semibold leading-none tracking-wide sm:text-lg',
                isScrolled ? 'text-[#3A3F45]' : 'text-white',
              ].join(' ')}
            >
              Amalgated Holdings
            </span>
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            className={`flex h-11 min-w-[44px] shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-[#2F6FA3] focus:ring-offset-2 md:hidden ${isScrolled ? 'text-[#3A3F45]' : 'text-white'}`}
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          <div className="hidden items-center gap-7 text-sm font-medium md:flex">
            <a className={navLinkClass} href="#">Home</a>

            {/* Company Dropdown (submenu -> submenu) */}
            <div className="group relative">
              <button className={navButtonClass}>
                Company
                <svg
                  className="h-4 w-4 transition-transform group-hover:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* hover bridge so menu doesn't "drop" on travel */}
              <div className="pointer-events-none absolute left-0 top-full h-4 w-full group-hover:pointer-events-auto" />

              <div className="pointer-events-none invisible absolute left-0 top-full mt-4 w-[240px] rounded-lg bg-white opacity-0 shadow-lg ring-1 ring-[#C9CED4]/50 transition group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 z-50">
                <div className="py-2">
                  {[
                    { label: 'About', items: aboutItems },
                    { label: 'Portfolio', items: portfolioItems },
                    { label: 'Clients', items: clientsItems },
                    { label: 'Careers', items: careersItems },
                  ].map((group) => (
                    <div key={group.label} className="group/item relative">
                      <div className="flex items-center justify-between px-4 py-2 text-sm font-semibold text-[#3A3F45] transition-colors group-hover/item:bg-[#F4F6F8] group-hover/item:text-[#2F6FA3]">
                        <span>{group.label}</span>
                        <svg className="h-4 w-4 text-[#3A3F45]/60 group-hover/item:text-[#2F6FA3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>

                      <div className="pointer-events-none invisible absolute left-full top-0 ml-0 w-[260px] rounded-lg bg-white opacity-0 shadow-lg ring-1 ring-[#C9CED4]/50 transition group-hover/item:pointer-events-auto group-hover/item:visible group-hover/item:opacity-100">
                        <div className="py-2">
                          {group.items.map((item) => (
                            <a
                              key={item}
                              href="#"
                              className="block px-4 py-2 text-sm text-[#3A3F45] transition-colors hover:bg-[#F4F6F8] hover:text-[#2F6FA3]"
                            >
                              {item}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Operations Dropdown (submenu -> submenu) */}
            <div className="group relative">
              <button className={navButtonClass}>
                Operations
                <svg
                  className="h-4 w-4 transition-transform group-hover:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* hover bridge so menu doesn't "drop" on travel */}
              <div className="pointer-events-none absolute left-0 top-full h-4 w-full group-hover:pointer-events-auto" />

              <div className="pointer-events-none invisible absolute left-0 top-full mt-4 w-[240px] rounded-lg bg-white opacity-0 shadow-lg ring-1 ring-[#C9CED4]/50 transition group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 z-50">
                <div className="py-2">
                  {[
                    { label: 'Businesses', items: businessesItems },
                    { label: 'Assets & Facilities', items: assetsItems },
                  ].map((group) => (
                    <div key={group.label} className="group/item relative">
                      <div className="flex items-center justify-between px-4 py-2 text-sm font-semibold text-[#3A3F45] transition-colors group-hover/item:bg-[#F4F6F8] group-hover/item:text-[#2F6FA3]">
                        <span>{group.label}</span>
                        <svg className="h-4 w-4 text-[#3A3F45]/60 group-hover/item:text-[#2F6FA3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>

                      <div className="pointer-events-none invisible absolute left-full top-0 ml-0 w-[260px] rounded-lg bg-white opacity-0 shadow-lg ring-1 ring-[#C9CED4]/50 transition group-hover/item:pointer-events-auto group-hover/item:visible group-hover/item:opacity-100">
                        <div className="py-2">
                          {group.items.map((item) => (
                            <a
                              key={item}
                              href="#"
                              className="block px-4 py-2 text-sm text-[#3A3F45] transition-colors hover:bg-[#F4F6F8] hover:text-[#2F6FA3]"
                            >
                              {item}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <a className={navLinkClass} href="#">News</a>

            {/* Contact Dropdown */}
            <div className="group relative">
              <button className={navButtonClass}>
                Contact
                <svg
                  className="h-4 w-4 transition-transform group-hover:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* hover bridge so menu doesn't "drop" on travel */}
              <div className="pointer-events-none absolute left-0 top-full h-4 w-full group-hover:pointer-events-auto" />

              <div className="pointer-events-none invisible absolute left-0 top-full mt-4 w-[220px] rounded-lg bg-white opacity-0 shadow-lg ring-1 ring-[#C9CED4]/50 transition group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 z-50">
                <div className="py-2">
                  {contactItems.map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="block px-4 py-2 text-sm text-[#3A3F45] transition-colors hover:bg-[#F4F6F8] hover:text-[#2F6FA3]"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <a
              href="#"
              className={[
                'ml-2 inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition',
                isScrolled
                  ? 'bg-[#2F6FA3] text-white hover:bg-[#286191]'
                  : 'bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/15',
              ].join(' ')}
            >
              Get in touch
            </a>
          </div>
        </div>

        {/* Mobile menu: nested submenus, in-flow */}
        <div
          id="mobile-nav"
          className={`overflow-hidden transition-[max-height] duration-300 ease-out md:hidden ${mobileMenuOpen ? 'max-h-[85vh]' : 'max-h-0'}`}
          aria-hidden={!mobileMenuOpen}
        >
          <div className="max-h-[85vh] overflow-y-auto border-t border-[#e5e7eb] bg-white shadow-sm">
            <nav className="mx-auto max-w-7xl px-3 py-4 sm:px-4" aria-label="Mobile navigation">
              <div className="space-y-0.5">
                <a href="#" className="flex items-center rounded-lg px-3 py-3 text-[15px] font-medium text-[#1A202C] transition-colors hover:bg-[#F4F6F8] hover:text-[#2F6FA3]" onClick={() => setMobileMenuOpen(false)}>Home</a>
                <a href="#" className="flex items-center rounded-lg px-3 py-3 text-[15px] font-medium text-[#1A202C] transition-colors hover:bg-[#F4F6F8] hover:text-[#2F6FA3]" onClick={() => setMobileMenuOpen(false)}>News</a>
              </div>

              {/* Company (nested) */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => toggleMobileExpanded('company')}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-[13px] font-semibold uppercase tracking-wider text-[#6b7280] transition-colors hover:bg-[#F4F6F8] hover:text-[#2F6FA3]"
                  aria-expanded={mobileExpanded.has('company')}
                >
                  Company
                  <svg className={`h-4 w-4 text-[#9ca3af] transition-transform duration-200 ${mobileExpanded.has('company') ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {mobileExpanded.has('company') && (
                  <div className="ml-2 mt-0.5 space-y-0.5 border-l-2 border-[#e5e7eb] pl-3">
                    {[
                      { key: 'company-about', label: 'About', items: aboutItems },
                      { key: 'company-portfolio', label: 'Portfolio', items: portfolioItems },
                      { key: 'company-clients', label: 'Clients', items: clientsItems },
                      { key: 'company-careers', label: 'Careers', items: careersItems },
                    ].map(({ key, label, items }) => (
                      <div key={key}>
                        <button
                          type="button"
                          onClick={() => toggleMobileExpanded(key)}
                          className="flex w-full items-center justify-between rounded-lg px-2 py-2.5 text-left text-[14px] font-medium text-[#3A3F45] transition-colors hover:bg-[#F4F6F8] hover:text-[#2F6FA3]"
                          aria-expanded={mobileExpanded.has(key)}
                        >
                          {label}
                          <svg className={`h-4 w-4 shrink-0 text-[#9ca3af] transition-transform duration-200 ${mobileExpanded.has(key) ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        {mobileExpanded.has(key) && (
                          <div className="ml-2 space-y-0.5 border-l-2 border-[#E0EFF9] pl-3">
                            {items.map((item) => (
                              <a key={item} href="#" className="block rounded-lg px-2 py-2 text-[13px] text-[#6b7280] transition-colors hover:bg-[#F4F6F8] hover:text-[#2F6FA3]" onClick={() => setMobileMenuOpen(false)}>{item}</a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Operations (nested) */}
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => toggleMobileExpanded('operations')}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-[13px] font-semibold uppercase tracking-wider text-[#6b7280] transition-colors hover:bg-[#F4F6F8] hover:text-[#2F6FA3]"
                  aria-expanded={mobileExpanded.has('operations')}
                >
                  Operations
                  <svg className={`h-4 w-4 text-[#9ca3af] transition-transform duration-200 ${mobileExpanded.has('operations') ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {mobileExpanded.has('operations') && (
                  <div className="ml-2 mt-0.5 space-y-0.5 border-l-2 border-[#e5e7eb] pl-3">
                    {[
                      { key: 'operations-businesses', label: 'Businesses', items: businessesItems },
                      { key: 'operations-assets', label: 'Assets & Facilities', items: assetsItems },
                    ].map(({ key, label, items }) => (
                      <div key={key}>
                        <button
                          type="button"
                          onClick={() => toggleMobileExpanded(key)}
                          className="flex w-full items-center justify-between rounded-lg px-2 py-2.5 text-left text-[14px] font-medium text-[#3A3F45] transition-colors hover:bg-[#F4F6F8] hover:text-[#2F6FA3]"
                          aria-expanded={mobileExpanded.has(key)}
                        >
                          {label}
                          <svg className={`h-4 w-4 shrink-0 text-[#9ca3af] transition-transform duration-200 ${mobileExpanded.has(key) ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        {mobileExpanded.has(key) && (
                          <div className="ml-2 space-y-0.5 border-l-2 border-[#E0EFF9] pl-3">
                            {items.map((item) => (
                              <a key={item} href="#" className="block rounded-lg px-2 py-2 text-[13px] text-[#6b7280] transition-colors hover:bg-[#F4F6F8] hover:text-[#2F6FA3]" onClick={() => setMobileMenuOpen(false)}>{item}</a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact (single level) */}
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => toggleMobileExpanded('contact')}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-[13px] font-semibold uppercase tracking-wider text-[#6b7280] transition-colors hover:bg-[#F4F6F8] hover:text-[#2F6FA3]"
                  aria-expanded={mobileExpanded.has('contact')}
                >
                  Contact
                  <svg className={`h-4 w-4 text-[#9ca3af] transition-transform duration-200 ${mobileExpanded.has('contact') ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {mobileExpanded.has('contact') && (
                  <div className="ml-2 mt-0.5 space-y-0.5 border-l-2 border-[#E0EFF9] pl-3">
                    {contactItems.map((item) => (
                      <a key={item} href="#" className="block rounded-lg px-2 py-2 text-[13px] text-[#6b7280] transition-colors hover:bg-[#F4F6F8] hover:text-[#2F6FA3]" onClick={() => setMobileMenuOpen(false)}>{item}</a>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-5 pt-4 border-t border-[#e5e7eb]">
                <a href="#" className="flex items-center justify-center gap-2 rounded-xl bg-[#2F6FA3] px-4 py-3.5 text-[15px] font-semibold text-white shadow-sm transition hover:bg-[#286191] active:bg-[#1e4d7a]" onClick={() => setMobileMenuOpen(false)}>
                  Get in touch
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M14 5l7 7-7 7" /></svg>
                </a>
              </div>
            </nav>
          </div>
        </div>
      </nav>

      <HeroSection />

      {/* Our Journey – Historic Milestones (Timeline + Motion) */}
      <JourneyTimeline />

      {/* About Us */}
      <AboutUsSection />

      {/* Vision, Mission & Leadership */}
      <VisionMissionSection />

      {/* Our Business Models */}
      <BusinessModelsSection />

      {/* Services */}
      <ServicesSection />

      {/* Project 101 – Strategic Roadmap */}
      <Project101Section />

      {/* Asset Management */}
      <AssetManagementSection />

      {/* Our Clients */}
      <OurClientsSection />

      {/* Performance Metrics */}
      <PerformanceMetricsSection />

      {/* Call to Action */}
      <CallToActionSection />

      {/* Footer – primary nav links + logo + copyright */}
      <Footer />
    </div>
  )
}

export default App
  