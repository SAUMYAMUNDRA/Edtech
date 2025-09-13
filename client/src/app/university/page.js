"use client"
import { useState, useEffect, useRef } from "react"
import Header from "../components/header/page"
import Footer from "../components/footer/page"

// Top scroll progress bar
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    let rafId = null
    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight
        setProgress(total > 0 ? Math.min(1, window.scrollY / total) : 0)
        rafId = null
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])
  return (
    <div
      style={{ transform: `scaleX(${progress})` }}
      className="fixed left-0 top-0 h-1 w-full origin-left bg-yellow-500 z-[9999] transition-transform duration-150 ease-out"
      aria-hidden
    />
  )
}

// Reveal-on-scroll animation
function Reveal({ children, delay = 0, y = 32, className = "" }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const node = ref.current
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(node)
          }
        })
      },
      { threshold: 0.2 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={["will-change-transform", className].join(" ")}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
        transition:
          "opacity 700ms cubic-bezier(.5,0,.2,1), transform 700ms cubic-bezier(.5,0,.2,1)",
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

// Floating Scroll-to-Top button
function ScrollToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return (
    <button
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-50 rounded-full shadow-xl bg-yellow-500 text-white w-12 h-12 flex items-center justify-center transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      } hover:bg-yellow-400`}
    >
      ↑
    </button>
  )
}

// --- New Modern CTA Section (professional hero placed ABOVE everything) ---
function ShowcaseCTASection() {
  const gallery = [
    { url: "/images/university1.jpg", alt: "Career launch event", badge: "Career Fair", floatClass: "card-float-slow", rotate: "-rotate-2" },
    { url: "/images/university2.jpg", alt: "Faculty collaboration", badge: "Faculty Summit", floatClass: "card-float-med", rotate: "rotate-1" },
    { url: "/images/university3.jpg", alt: "Mentorship in action", badge: "Mentor Pods", floatClass: "card-float-fast", rotate: "-rotate-1" }
  ]

  return (
    <section className="relative py-24 overflow-hidden bg-[#fcf6f1]">
      {/* Animated soft gradient background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(1400px 500px at 12% 0%, rgba(245,158,11,0.18), transparent 55%), radial-gradient(1200px 440px at 85% 25%, rgba(99,102,241,0.18), transparent 60%), radial-gradient(900px 380px at 60% 100%, rgba(20,184,166,0.16), transparent 58%)",
          filter: "saturate(110%)",
          animation: "gradientShift 12s ease-in-out infinite"
        }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left content */}
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              BridgeLabs for Universities
            </div>

            <h1 className="text-5xl lg:text-[56px] leading-[1.05] font-black text-gray-900 tracking-tight">
              Experience the Future of Campus Collaboration
            </h1>

            <p className="mt-6 text-lg text-gray-700 max-w-2xl">
              Bring immersive mentorship, industry connections, and measurable outcomes to your
              students with a unified platform designed for modern universities.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                "Seamless curriculum integration and program scaffolding",
                "Real professionals and alumni as on-demand mentors",
                "Live dashboards to track growth and outcomes"
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 shadow">
                    ✓
                  </span>
                  <span className="text-gray-800">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button className="btn-gradient text-white px-7 py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-shadow duration-300">
                Request a Demo
              </button>
              <button className="px-7 py-3 rounded-xl font-semibold bg-white text-gray-800 border border-gray-200 hover:border-yellow-400 hover:shadow-lg transition-all duration-300">
                Talk to Partnerships
              </button>
            </div>

            <div className="mt-8 flex items-center gap-6 text-sm text-gray-600">
              <div className="flex -space-x-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span key={i} className="inline-block h-8 w-8 rounded-full bg-yellow-200 border border-white shadow-inner" />
                ))}
              </div>
              <span>Trusted by 40+ universities</span>
            </div>
          </div>

          {/* Right floating gallery/stats */}
          <div className="relative">
            <div className="relative mx-auto max-w-md">
              {/* glow backdrop */}
              <div
                aria-hidden
                className="absolute -inset-12 rounded-[36px] blur-3xl opacity-70"
                style={{
                  background:
                    "conic-gradient(from 180deg at 50% 50%, rgba(250,204,21,0.25), rgba(236,72,153,0.22), rgba(99,102,241,0.25), rgba(20,184,166,0.22), rgba(250,204,21,0.25))",
                  animation: "gradientShift 10s ease infinite"
                }}
              />
              <div className="relative grid grid-cols-3 gap-4">
                {/* Column 1 */}
                <div className="space-y-4 pt-8">
                  <GalleryCard url="/images/university1.jpg" alt="Career launch event" badge="Career Fair" floatClass="card-float-slow" rotate="-rotate-2" />
                  <MiniStat label="Positive Outcomes" value="96%" />
                </div>
                {/* Column 2 */}
                <div className="space-y-4">
                  <MiniStat label="Mentor Sessions" value="900+" />
                  <GalleryCard url="/images/university2.jpg" alt="Faculty collaboration" badge="Faculty Summit" floatClass="card-float-med" rotate="rotate-1" />
                </div>
                {/* Column 3 */}
                <div className="space-y-4 pb-8">
                  <GalleryCard url="/images/university3.jpg" alt="Mentorship in action" badge="Mentor Pods" floatClass="card-float-fast" rotate="-rotate-1" />
                  <MiniStat label="Careers Launched" value="2500+" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function GalleryCard({ url, alt, badge, floatClass, rotate }) {
  return (
    <figure
      className={`relative rounded-2xl overflow-hidden bg-white ${rotate} transition-transform duration-300 hover:scale-[1.02] ${floatClass}`}
      style={{ boxShadow: "0 20px 40px rgba(2,8,23,0.12)" }}
    >
      <img src={url} alt={alt} className="w-full h-40 object-cover" draggable="false" style={{ background: "#f6f6f6" }} />
      <figcaption className="absolute left-3 top-3">
        <span className="text-xs px-3 py-1 rounded-full bg-white/90 text-gray-800 shadow">{badge}</span>
      </figcaption>
      <div className="pointer-events-none absolute inset-0" style={{ boxShadow: "inset 0 0 120px rgba(0,0,0,0.06)" }} />
    </figure>
  )
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/90 backdrop-blur shadow-lg px-4 py-3 border border-white/60 animate-pulse-glow">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-lg font-bold text-gray-900">{value}</div>
    </div>
  )
}

/* ---------- ENHANCED KPI STATS (DATA INSIDE CIRCLE + BIGGER GRAPH + ANIM/HOVER) ---------- */

// CountUp with subtle pop animation
function CountUp({ value, suffix = "", start = false, duration = 1600 }) {
  const [count, setCount] = useState(0)
  const rafRef = useRef(0)
  useEffect(() => {
    if (!start) return
    const startTs = performance.now()
    const step = (ts) => {
      const p = Math.min(1, (ts - startTs) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(value * eased))
      if (p < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [start, value, duration])
  return <span className={`num-pop ${start ? "num-pop-start" : ""}`}>{count.toLocaleString()}{suffix}</span>
}

function KPIStatsSection({ stats }) {
  const sectionRef = useRef(null)
  const [start, setStart] = useState(false)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setStart(true)),
      { threshold: 0.35 }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  const colors = ["#f59e0b", "#ec4899", "#6366f1", "#14b8a6"]
  const progresses = [0.9, 0.82, 0.78, 0.96] // visual

  // Lens hover effect helper
  const handleLensMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    e.currentTarget.style.setProperty("--mx", `${x}px`)
    e.currentTarget.style.setProperty("--my", `${y}px`)
  }

  return (
    <section ref={sectionRef} className="py-18 lg:py-20 bg-[#fcf6f1]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-gray-700 text-xs font-medium shadow">
              Impact at a glance
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
            </div>
            <h2 className="mt-4 text-3xl lg:text-4xl font-extrabold text-gray-900">
              Outcomes that scale with your campus
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((s, i) => {
            const accent = colors[i % colors.length]
            const progress = start ? progresses[i % progresses.length] : 0
            return (
              <Reveal key={s.label} delay={i * 0.06}>
                <div
                  onMouseMove={handleLensMove}
                  className="group relative rounded-3xl bg-white p-6 lg:p-7 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 overflow-hidden"
                >
                  {/* animated gradient rim */}
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      padding: 2,
                      background:
                        "linear-gradient(120deg, rgba(245,158,11,0.25), rgba(236,72,153,0.25), rgba(99,102,241,0.25), rgba(20,184,166,0.25))",
                      mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                      WebkitMask:
                        "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude"
                    }}
                  />
                  {/* lens spotlight on hover */}
                  <span
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "radial-gradient(220px 140px at var(--mx) var(--my), rgba(255,255,255,0.35), transparent 60%)"
                    }}
                  />

                  <div className="relative grid grid-cols-[auto,1fr] items-center gap-5">
                    {/* Bigger circle with the data INSIDE */}
                    <RadialRing color={accent} progress={progress} size={118} thickness={14}>
                      <div className="text-[14px] lg:text-[16px] font-extrabold text-gray-900 num-scale">
                        <CountUp value={s.value} suffix={s.suffix} start={start} />
                      </div>
                    </RadialRing>

                    {/* Label and bigger sparkline */}
                    <div className="flex-1">
                      <div className="text-[11px] uppercase tracking-[0.14em] text-gray-500 font-semibold kinetic-in">
                        {s.label}
                      </div>
                      <Sparkline accent={accent} big />
                    </div>
                  </div>

                  {/* accent underline grow on hover */}
                  <div className="mt-3 h-0.5 bg-gradient-to-r from-transparent via-gray-100 to-transparent group-hover:from-white group-hover:via-gray-200 group-hover:to-white transition-all" />
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Ring supports children (content inside)
function RadialRing({ color = "#f59e0b", progress = 0, size = 110, thickness = 14, children }) {
  const deg = Math.round(progress * 360)
  const inner = size - thickness * 2
  const ringStyle = {
    width: size,
    height: size,
    background: `conic-gradient(${color} ${deg}deg, #eef2f7 0deg)`,
    WebkitMask: `radial-gradient(farthest-side, #0000 ${100 - (thickness / size) * 100}%, #000 calc(${100 - (thickness / size) * 100}% + 1px))`,
    mask: `radial-gradient(farthest-side, #0000 ${100 - (thickness / size) * 100}%, #000 calc(${100 - (thickness / size) * 100}% + 1px))`,
    boxShadow: "inset 0 0 1px rgba(2,8,23,0.12)",
    transition: "background 900ms cubic-bezier(.5,0,.2,1)"
  }
  return (
    <div className="relative">
      <div className="spin-slow ring-core rounded-full" style={ringStyle} aria-hidden />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="rounded-full bg-white shadow-sm flex items-center justify-center circle-bounce"
          style={{ width: inner, height: inner }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

// Bigger sparkline when big prop is true
function Sparkline({ accent = "#f59e0b", big = false }) {
  const w = big ? 140 : 100
  const h = big ? 40 : 28
  const pathD = big
    ? "M0 30 C 20 24, 40 20, 60 26 S 100 38, 120 24 140 12, 140 14"
    : "M0 22 C 10 18, 20 16, 30 20 S 50 26, 60 18 80 8, 100 10"
  const areaD = big
    ? "M0 40 L0 30 C 20 24, 40 20, 60 26 S 100 38, 120 24 140 12, 140 14 L140 40 Z"
    : "M0 28 L0 22 C 10 18, 20 16, 30 20 S 50 26, 60 18 80 8, 100 10 L100 28 Z"
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={`${big ? "w-40 h-10" : "w-28 h-7"} mt-2`}>
      <defs>
        <linearGradient id="g1" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <path d={pathD} fill="none" stroke={accent} strokeWidth="2" className="spark-stroke" strokeLinecap="round" />
      <path d={areaD} fill="url(#g1)" className="opacity-40" />
    </svg>
  )
}

function GlobalStyles() {
  return (
    <style jsx global>{`
      @media (prefers-reduced-motion: reduce) {
        * { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
      }
      @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
      @keyframes floatY { 0% { transform: translateY(0); } 50% { transform: translateY(-8px); } 100% { transform: translateY(0); } }
      @keyframes pulseGlow { 0% { box-shadow: 0 0 0 0 rgba(245,158,11,0.25);} 70% { box-shadow: 0 0 0 10px rgba(245,158,11,0);} 100% { box-shadow: 0 0 0 0 rgba(245,158,11,0);} }
      @keyframes ringSpin { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
      @keyframes pop { 0% { transform: scale(.9); opacity:.6;} 60% { transform: scale(1.02); opacity:1;} 100% { transform: scale(1);} }
      @keyframes hoverBounce { 0% { transform: translateY(0);} 40% { transform: translateY(-3px);} 100% { transform: translateY(0);} }
      @keyframes dashMove { from { stroke-dashoffset: 0;} to { stroke-dashoffset: -60;} }
      @keyframes ktypeUp { 0% { transform: translateY(1.2em) skewY(6deg); opacity: 0; } 60% { transform: translateY(-0.05em) skewY(0deg); opacity: 1; } 100% { transform: translateY(0) skewY(0deg); opacity: 1; } }
      @keyframes shineSweep { 0% { transform: translateX(-120%) rotate(20deg); } 100% { transform: translateX(160%) rotate(20deg); } }
      @keyframes kineticIn { 0% { letter-spacing: .08em; transform: translateY(6px); opacity: .0; } 60% { letter-spacing: .18em; } 100% { letter-spacing: .14em; transform: translateY(0); opacity:1; } }

      .card-float-slow { animation: floatY 7s ease-in-out infinite; }
      .card-float-med { animation: floatY 6s ease-in-out infinite; animation-delay: .4s; }
      .card-float-fast { animation: floatY 5s ease-in-out infinite; animation-delay: .8s; }

      .animate-pulse-glow { animation: pulseGlow 2.6s ease-in-out infinite; }

      .btn-gradient { background: linear-gradient(90deg, #f59e0b, #f97316, #ec4899); background-size: 200% 100%; animation: gradientShift 8s ease infinite; }

      .spin-slow { animation: ringSpin 18s linear infinite; }
      .group:hover .ring-core { animation-duration: 8s; filter: drop-shadow(0 6px 14px rgba(17,24,39,0.12)); }

      .num-pop { display: inline-block; }
      .num-pop-start { animation: pop .6s ease-out both; }

      .num-scale { transition: transform 250ms ease, color 250ms ease; }
      .group:hover .num-scale { transform: scale(1.06); color: #111827; }

      .circle-bounce { will-change: transform; }
      .group:hover .circle-bounce { animation: hoverBounce 700ms cubic-bezier(.2,.8,.2,1); }

      .spark-stroke { stroke-dasharray: 3 6; animation: dashMove 4s linear infinite; }

      /* CTA kinetic + hover */
      .cta-kinetic { position: relative; }
      .cta-kinetic::before {
        content: "";
        position: absolute;
        inset: -2px;
        border-radius: 24px;
        background: linear-gradient(120deg, rgba(245,158,11,.28), rgba(236,72,153,.28), rgba(99,102,241,.28), rgba(20,184,166,.28));
        background-size: 300% 300%;
        filter: blur(18px);
        opacity: 0;
        transition: opacity .35s ease, transform .35s ease;
        z-index: 0;
      }
      .cta-kinetic:hover::before { opacity: 1; transform: scale(1.02); }

      .kt-heading { position: relative; z-index: 1; }
      .kt-heading .kt-word { display: inline-block; will-change: transform, opacity; animation: ktypeUp .7s cubic-bezier(.2,.7,.2,1) forwards; animation-delay: var(--d, 0ms); margin-right: .28ch; }

      .cta-sheen { pointer-events: none; position: absolute; inset: 0; overflow: hidden; border-radius: 24px; }
      .cta-sheen::after { content: ""; position: absolute; top: -40%; left: -20%; width: 40%; height: 180%; background: linear-gradient( to right, transparent, rgba(255,255,255,.5), transparent ); transform: translateX(-120%) rotate(20deg); }
      .cta-kinetic:hover .cta-sheen::after { animation: shineSweep 1200ms ease forwards; }

      /* Shadow & Lift animation for feature cards */
      .feature-wrap { position: relative; }
      .feature-shadow { position: absolute; left: 12%; right: 12%; bottom: -6px; height: 18px; background: radial-gradient(ellipse at center, rgba(2,8,23,.18), rgba(2,8,23,0)); filter: blur(10px); opacity: .35; transform: translateY(0) scale(1); transition: transform 350ms cubic-bezier(.2,.8,.2,1), opacity 350ms ease; }
      .feature-card { transition: transform 350ms cubic-bezier(.2,.8,.2,1), box-shadow 350ms ease, background 350ms ease; box-shadow: 0 10px 22px rgba(2,8,23,.06), 0 1px 0 rgba(2,8,23,.02) inset; transform: translateY(0) translateZ(0); }
      .group:hover .feature-card { transform: translateY(-10px); box-shadow: 0 22px 46px rgba(2,8,23,.12), 0 2px 0 rgba(2,8,23,.03) inset; }
      .group:hover .feature-shadow { transform: translateY(6px) scale(1.25); opacity: .55; }
      .feature-icon { transition: transform 300ms ease; }
      .group:hover .feature-icon { transform: translateY(-3px) scale(1.05); }
    `}</style>
  )
}

export default function ForUniversitiesPage() {
  // Feature cards for universities
  const features = [
    { icon: "🎓", title: "Curriculum Integration", desc: "Blend our mentorship platform with your existing academic offerings for a seamless student experience.", color: "bg-yellow-100 text-yellow-600" },
    { icon: "🤝", title: "Industry Mentors", desc: "Connect students with real professionals and alumni for career insights and practical advice.", color: "bg-pink-100 text-pink-600" },
    { icon: "🌐", title: "Peer Pods", desc: "Enable cross-campus collaboration and peer-led growth circles for deeper learning.", color: "bg-teal-100 text-teal-600" },
    { icon: "📈", title: "Impact Tracking", desc: "Real-time dashboards for universities to measure skill growth, engagement, and placement success.", color: "bg-blue-100 text-blue-600" }
  ]

  // Stats content (data will show INSIDE the circle, graph enlarged)
  const stats = [
    { value: 40, suffix: "++", label: "Partner Universities" },
    { value: 2500, suffix: "++", label: "Student Careers Launched" },
    { value: 900, suffix: "++", label: "Mentor Sessions Hosted" },
    { value: 96, suffix: "%", label: "Positive Outcomes" }
  ]

  return (
    <div className="min-h-screen bg-[#fcf6f1] text-gray-900 relative">
      <GlobalStyles />
      <ScrollProgressBar />
      <ScrollToTop />
      <Header />

      {/* New professional hero at very top */}
      <ShowcaseCTASection />

      {/* Enhanced KPI stats with data inside circle and bigger graph */}
      <KPIStatsSection stats={stats} />

      {/* FEATURES with Shadow & Lift animation */}
      <section className="py-20 bg-[#fcf6f1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                University Partnership Benefits
              </h3>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                BridgeLabs amplifies your curriculum and career support for every student.
              </p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 0.1}>
                <div
                  className="feature-wrap group relative rounded-2xl p-[2px]"
                  style={{
                    background:
                      "linear-gradient(120deg, rgba(245,158,11,0.45), rgba(236,72,153,0.45), rgba(99,102,241,0.45), rgba(20,184,166,0.45))",
                    backgroundSize: "300% 300%",
                    animation: "gradientShift 12s ease infinite"
                  }}
                >
                  {/* Floor shadow for lift illusion */}
                  <span className="feature-shadow" aria-hidden />
                  <div className="feature-card rounded-2xl bg-white p-8 text-center">
                    <div className={`feature-icon mx-auto mb-5 w-14 h-14 flex items-center justify-center text-3xl rounded-full ${feature.color} shadow`}>
                      {feature.icon}
                    </div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER LOGOS (replace with actual images) */}
      <section className="py-16 bg-[#fcf6f1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Trusted By Leading Universities
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join a network of institutions advancing student success.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="bg-white rounded-xl shadow p-4 flex items-center justify-center h-24 transition-transform duration-300 hover:-translate-y-1">
                  <span className="text-2xl font-bold text-yellow-500">Logo {i}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION with Kinetic Typography + Hover effects */}
      <section className="py-20 bg-[#fcf6f1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="cta-kinetic relative rounded-3xl p-12 lg:p-16 text-center shadow-xl bg-gradient-to-br from-white/80 to-white/40 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group overflow-hidden">
              {/* Sheen sweep on hover */}
              <span className="cta-sheen" aria-hidden />
              {/* Kinetic heading */}
              <h3 className="kt-heading text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                <span className="kt-word" style={{ "--d": "0ms" }}>Ready</span>
                <span className="kt-word" style={{ "--d": "120ms" }}>to</span>
                <span className="kt-word" style={{ "--d": "240ms" }}>Elevate</span>
                <span className="kt-word" style={{ "--d": "360ms" }}>Your</span>
                <span className="kt-word" style={{ "--d": "480ms" }}>University?</span>
              </h3>

              {/* Sub text with subtle kinetic-in */}
              <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
                <span className="block kinetic-in" style={{ animationDelay: "120ms" }}>
                  Start the conversation with BridgeLabs.
                </span>
                <span className="block kinetic-in" style={{ animationDelay: "280ms" }}>
                  Let’s build future-ready graduates together.
                </span>
              </p>

              <button className="px-10 py-4 btn-gradient text-white rounded-lg font-bold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl relative overflow-hidden">
                <span className="relative z-10">Contact Us</span>
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}