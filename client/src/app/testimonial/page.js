"use client"
import { useState, useEffect, useRef } from 'react'
import Header from "../components/header/page"
import Footer from "../components/footer/page"

/* =======================
   Inline Scroll Utilities
   ======================= */

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    let rafId = null
    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight
        const y = window.scrollY
        setProgress(total > 0 ? Math.min(1, y / total) : 0)
        rafId = null
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
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

// Reveal wrapper
function Reveal({ children, delay = 0, y = 24, className = "" }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const node = ref.current
    const prefersReduced = typeof window !== "undefined" && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) { setVisible(true); return }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(node)
        }
      })
    }, { threshold: 0.18 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
        transition: "opacity 700ms cubic-bezier(.19,1,.22,1), transform 700ms cubic-bezier(.19,1,.22,1)",
        transitionDelay: `${delay}s`,
        willChange: "opacity,transform"
      }}
    >
      {children}
    </div>
  )
}

// Tilt
function Tilt({ children, className = "", maxTilt = 12, scale = 1.02 }) {
  const ref = useRef(null)
  const [transform, setTransform] = useState("")
  const prefersReduced = typeof window !== "undefined" && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const handleMove = (e) => {
    if (prefersReduced) return
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rx = (py - 0.5) * 2 * maxTilt
    const ry = (0.5 - px) * 2 * maxTilt
    setTransform(`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`)
  }
  const handleLeave = () => setTransform("")
  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        transform,
        transition: transform ? "transform 70ms linear" : "transform 420ms cubic-bezier(.16,.84,.24,1)",
        transformStyle: "preserve-3d",
        willChange: "transform"
      }}
    >
      {children}
    </div>
  )
}

// Shiny button
function ShinyButton({ children, className = "", onClick }) {
  const btnRef = useRef(null)
  const prefersReduced = typeof window !== "undefined" && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const handleMove = (e) => {
    if (prefersReduced) return
    const node = btnRef.current
    if (!node) return
    const r = node.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) / 14
    const dy = (e.clientY - (r.top + r.height / 2)) / 14
    node.style.transform = `translate(${dx}px,${dy}px)`
  }
  const handleLeave = () => { if (btnRef.current) btnRef.current.style.transform = "translate(0,0)" }
  return (
    <button
      ref={btnRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className={`relative overflow-hidden group ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="absolute -inset-y-8 -left-1/2 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shine" />
      </span>
    </button>
  )
}

// Scroll to top
function ScrollToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <button
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-50 rounded-full shadow-xl bg-yellow-500 text-white w-12 h-12 flex items-center justify-center transition-all duration-300 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      } hover:bg-yellow-400`}
    >
      ↑
    </button>
  )
}

export default function TestimonialsPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [countersAnimated, setCountersAnimated] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [activeEvidenceTab, setActiveEvidenceTab] = useState('placements')
  const [activeTrackKey, setActiveTrackKey] = useState('aiml')

  useEffect(() => {
    let rafId = null
    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY || 0)
        rafId = null
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const getInitials = (name) => {
    const parts = name.trim().split(' ')
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || ""
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  const avatarColor = (name) => {
    const palette = ["bg-indigo-600","bg-rose-500","bg-emerald-600","bg-yellow-500","bg-purple-600","bg-pink-500","bg-teal-600","bg-red-500"]
    return palette[name.length % palette.length]
  }

  /* PLACEMENTS */
  const placements = [
    {
      id: 1,
      name: "Aarav Sharma",
      role: "Data Science Intern → PPO Track",
      company: { name: "Swiggy", logo: "/companies/swiggy.png" },
      ctc: "₹18 LPA (Projected)",
      timeToOfferWeeks: 9,
      skills: ["Python","Feature Engineering","Data Storytelling"],
      track: "AI / ML",
      miniQuote: "Structured experiment logs turned guesswork into targeted iteration."
    },
    {
      id: 2,
      name: "Priya Kapoor",
      role: "Product Designer",
      company: { name: "Razorpay", logo: "/companies/razorpay.png" },
      ctc: "₹16 LPA",
      timeToOfferWeeks: 11,
      skills: ["UX Systems","Narrative Craft","Interaction"],
      track: "Design",
      miniQuote: "Structured case narratives made my portfolio persuasive."
    },
    {
      id: 3,
      name: "Rahul Mehta",
      role: "Full Stack Engineer",
      company: { name: "Freshworks", logo: "/companies/freshworks.png" },
      ctc: "₹20 LPA",
      timeToOfferWeeks: 10,
      skills: ["Architecture","Caching","Authentication"],
      track: "Full‑Stack",
      miniQuote: "Architecture‑first diagrams prevented downstream tech debt."
    }
  ]

  /* TRACK OUTCOMES (only required tracks) */
  const trackOutcomes = {
    aiml: {
      label: "AI / ML",
      topStudent: {
        name: "Aarav Sharma",
        role: "Data Science Intern",
        college: "IIT Delhi • B.Tech CS '25",
        avatarColor: "bg-indigo-600",
        bullets: [
          "Completed 3 production‑grade ML case studies",
          "Increased mock pass rate by 38%",
          "Strengthened business problem framing"
        ]
      },
      medianTime: "10 wks → Offer",
      microQuotes: [],
      keyProject: {
        title: "Churn Prediction Simulator",
        description: "End‑to‑end churn pipeline with iterative modeling and a scenario dashboard enabling retention decisions.",
        stack: ["Python","FastAPI","PostgreSQL","scikit‑learn","Narrative Framework"]
      }
    },
    fullstack: {
      label: "Full‑Stack",
      topStudent: {
        name: "Rahul Mehta",
        role: "Full Stack Developer",
        college: "DTU • IT '26",
        avatarColor: "bg-emerald-600",
        bullets: [
          "Shipped functional MVP used in live sprints",
          "Completed 7 targeted refactors",
          "Produced architecture diagrams"
        ]
      },
      medianTime: "9 wks → Offer",
      microQuotes: [],
      keyProject: {
        title: "Sprint Planner",
        description: "Role‑based sprint planning app with optimized caching layers and robust auth patterns.",
        stack: ["Next.js","Redis","PostgreSQL","Auth Patterns","System Design"]
      }
    },
    dsa: {
      label: "Data Structures",
      topStudent: {
        name: "Karan Verma",
        role: "SDE Intern",
        college: "IIIT Hyderabad • CSE '26",
        avatarColor: "bg-purple-600",
        bullets: [
          "500+ curated problems completed",
          "Reduced avg solve time by 42%",
          "Pattern recall under timed pressure"
        ]
      },
      medianTime: "8 wks → Assessment Clear",
      microQuotes: [],
      keyProject: {
        title: "Pattern Ladder Tracker",
        description: "Progression system mapping solved problems to pattern mastery and time‑to‑solve improvements.",
        stack: ["DS Patterns","Complexity Logs","Review Cycles","Benchmarking"]
      }
    },
    cp: {
      label: "Competitive Programming",
      topStudent: {
        name: "Ritika Singh",
        role: "Competitive Programming Fellow",
        college: "IIT Kanpur • EE '25",
        avatarColor: "bg-teal-600",
        bullets: [
          "3 rating brackets climbed",
          "Optimized contest time allocation",
          "Reusable heuristic library"
        ]
      },
      medianTime: "14 wks → Rating Jump",
      microQuotes: [],
      keyProject: {
        title: "Contest Heuristic Library",
        description: "Indexed archive of solved problems with complexity notes and decision heuristics for faster pattern recognition.",
        stack: ["Heuristics","Time Analysis","Pattern Index","Post‑Contest Review"]
      }
    }
  }

  const universityPartners = [
    {
      id: 1,
      name: "IIT Delhi",
      logo: "/colleges/iit-delhi.png",
      programsRun: ["Data Sprint","AI Mentorship"],
      studentsImpacted: 56,
      since: "2023",
      quote: "Structured mentor feedback deepened experimental rigor."
    },
    {
      id: 2,
      name: "NIFT Mumbai",
      logo: "/colleges/nift.png",
      programsRun: ["UX Case Lab"],
      studentsImpacted: 34,
      since: "2024",
      quote: "Case storytelling quality measurably improved."
    },
    {
      id: 3,
      name: "DTU",
      logo: "/colleges/dtu.png",
      programsRun: ["Full Stack Sprint","System Design Clinics"],
      studentsImpacted: 78,
      since: "2023",
      quote: "Architecture articulation improved across cohorts."
    }
  ]

  const allTestimonials = [
    { id: 1, name: "Neha Singh", category: ["mentorship","career"], tag: "Mentorship", quote: "The one‑on‑one cadence helped me refine goals and eliminate distractions blocking momentum.", rating: 5 },
    { id: 2, name: "Iqbal Hussain", category: ["workshops","soft-skills"], tag: "Workshops", quote: "Live workshops demystified technical roles and taught concise impact articulation.", rating: 5 },
    { id: 3, name: "Simran Kaur", category: ["career","mentorship"], tag: "Career", quote: "Structured mock interview loops turned anxiety into a repeatable preparation system.", rating: 5 },
    { id: 4, name: "Arjun Patel", category: ["soft-skills","mentorship"], tag: "Soft Skills", quote: "Learning to articulate trade‑offs improved collaboration in projects and hackathons.", rating: 5 },
    { id: 5, name: "Divya Rao", category: ["workshops","career"], tag: "Workshops", quote: "Portfolio narrative shifts finally unlocked recruiter responses.", rating: 5 },
    { id: 6, name: "Krish Malhotra", category: ["career","mentorship"], tag: "Career", quote: "Goal tracking and micro‑wins stacked into an offer result.", rating: 5 }
  ]

  const stats = [
    { value: 94, suffix: "%", label: "Felt More Career Ready" },
    { value: 87, suffix: "%", label: "Improved Confidence" },
    { value: 1200, suffix: "+", label: "Mentor Sessions" },
    { value: 350, suffix: "+", label: "Portfolio Projects" }
  ]

  const filteredTestimonials = activeFilter === 'all'
    ? allTestimonials
    : allTestimonials.filter(t => t.category.includes(activeFilter))

  const Counter = ({ value, suffix }) => {
    const [count, setCount] = useState(0)
    useEffect(() => {
      if (countersAnimated) {
        const duration = 1600
        const steps = 60
        const inc = value / steps
        let current = 0
        const timer = setInterval(() => {
          current += inc
          if (current >= value) {
            setCount(value)
            clearInterval(timer)
          } else {
            setCount(Math.floor(current))
          }
        }, duration / steps)
        return () => clearInterval(timer)
      }
    }, [countersAnimated, value])
    return <span>{count.toLocaleString()}{suffix}</span>
  }

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !countersAnimated) setCountersAnimated(true)
      })
    }, { threshold: 0.4 })
    const node = document.querySelector('.stats-section')
    if (node) obs.observe(node)
    return () => { if (node) obs.unobserve(node) }
  }, [countersAnimated])

  const y1 = Math.min(80, scrollY * 0.12)
  const y2 = Math.min(120, scrollY * 0.18)

  const medianTimePlacement = (arr) => {
    const times = arr.map(p => p.timeToOfferWeeks).filter(n => Number.isFinite(n)).sort((a,b)=>a-b)
    if (!times.length) return "—"
    const mid = Math.floor(times.length / 2)
    return times.length % 2 ? `${times[mid]} wks` : `${((times[mid-1] + times[mid]) / 2).toFixed(1)} wks`
  }

  const evidenceTabs = [
    { key: 'placements', label: 'Placements', show: placements.length > 0 },
    { key: 'tracks', label: 'Track Outcomes', show: Object.keys(trackOutcomes).length > 0 },
    { key: 'universities', label: 'University Collabs', show: universityPartners.length > 0 }
  ].filter(t => t.show)

  useEffect(() => {
    if (!evidenceTabs.find(t => t.key === activeEvidenceTab) && evidenceTabs.length) {
      setActiveEvidenceTab(evidenceTabs[0].key)
    }
  }, [evidenceTabs, activeEvidenceTab])

  const trackKeys = Object.keys(trackOutcomes)
  useEffect(() => {
    if (!trackKeys.includes(activeTrackKey) && trackKeys.length) {
      setActiveTrackKey(trackKeys[0])
    }
  }, [trackKeys, activeTrackKey])

  const currentTrack = trackOutcomes[activeTrackKey]

  /* Company badge */
  const CompanyBadge = ({ company }) => {
    if (!company || (!company.logo && !company.name)) return null
    return (
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/85 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
        {company.logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={company.logo}
            alt={company.name}
            className="w-6 h-6 object-contain"
            onError={(e)=>{e.currentTarget.style.display='none'}}
          />
        )}
        <span className="text-xs font-semibold text-gray-700 tracking-wide">
          {company.name}
        </span>
      </div>
    )
  }

  /* Icons */
  const IconWrapper = ({ children, className = "" }) => (
    <span className={`inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500/90 text-white shadow-sm ring-2 ring-yellow-300/40 ${className}`}>
      {children}
    </span>
  )
  const IconStar = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 17.3l-5.4 3.3 1.5-6.1L3 9.9l6.2-.5L12 3.6l2.8 5.8 6.2.5-5.1 4.6 1.5 6.1z" />
    </svg>
  )
  const IconRocket = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 2c3.7 0 6.8 3 6.8 6.8 0 4.9-3.8 9.2-6.1 11.3-.4.4-1 .4-1.4 0-2.3-2.1-6.1-6.4-6.1-11.3C5.2 5 8.3 2 12 2zm0 5.2a2 2 0 100 4 2 2 0 000-4zM7.4 20.2c1.2.3 2.6.5 4.6.5s3.4-.2 4.6-.5c.5-.1.9.3.8.8-.2 1.4-2.7 2-5.4 2s-5.2-.6-5.4-2c-.1-.5.3-.9.8-.8z"/>
    </svg>
  )
  const IconMentor = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 12.75a4.75 4.75 0 10-4.75-4.75A4.76 4.76 0 0012 12.75zm0 1.5c-3.17 0-9.5 1.59-9.5 4.75v1a.75.75 0 00.75.75h17.5a.75.75 0 00.75-.75v-1c0-3.16-6.33-4.75-9.5-4.75z"/>
    </svg>
  )

  const TrackCard = ({ title, icon, children, variant = "default" }) => {
    const isDark = variant === "dark"
    return (
      <div
        className={`relative group rounded-2xl p-6 md:p-7 flex flex-col gap-5
          border transition-all duration-300
          ${isDark
            ? "bg-gray-900 border-gray-800 text-gray-200 shadow-md hover:shadow-lg"
            : "bg-white/90 backdrop-blur-sm border-gray-200 shadow-sm hover:shadow-md"}
          hover:-translate-y-1`}
      >
        <div className="flex items-center gap-3">
          <IconWrapper className={isDark ? "from-yellow-500 to-yellow-600 ring-yellow-400/40" : ""}>
            {icon}
          </IconWrapper>
          <h4 className={`text-xs font-semibold tracking-[0.12em] uppercase ${isDark ? "text-gray-200" : "text-gray-700"}`}>
            {title}
          </h4>
        </div>
        {children}
      </div>
    )
  }

/* ================== UPDATED MENTORSHIP IMPACT COMPONENT ================== */

const mentorshipStages = [
  "DSA (Basics)",
  "DSA (Advanced)",
  "Problem Solving",
  "Project Build",
  "CV & Mock",
  "Final Placement"
]

function MentorshipImpactCard() {
  const [active, setActive] = useState(0)
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  // Horizontal spacing & positions:
  const H = 128
  const DOWN = 70
  // Stage positions (center points for path lines):
  const stagePositions = [
    { x: 0,    y: 0 },
    { x: H,    y: 0 },
    { x: 2*H,  y: 0 },
    { x: 2*H,  y: DOWN },
    { x: 3*H,  y: DOWN },
    { x: 4*H,  y: DOWN }
  ]

  // Compute overall svg dimensions with padding
  const PAD_X = 32
  const PAD_Y = 26
  const svgWidth  = stagePositions[stagePositions.length - 1].x + PAD_X * 2
  const svgHeight = DOWN + PAD_Y * 2

  // Build path string (move to first, then line through each)
  const pathD = stagePositions
    .map((p, i) =>
      `${i === 0 ? 'M' : 'L'} ${p.x + PAD_X} ${p.y + PAD_Y}`
    ).join(' ')

  // Fixed TypeScript issue - removed type annotation
  const pathRef = useRef(null)
  const [pathLength, setPathLength] = useState(0)

  useEffect(() => {
    if (prefersReduced) return
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength()
      setPathLength(len)
    }
  }, [prefersReduced, svgWidth, svgHeight])

  useEffect(() => {
    if (prefersReduced) return
    const id = setInterval(() => {
      setActive(a => (a + 1) % mentorshipStages.length)
    }, 1400)
    return () => clearInterval(id)
  }, [prefersReduced])

  return (
    <TrackCard title="Mentorship Impact" icon={<IconMentor />}>
      {/* Two concise bullets */}
      <ul className="text-[13px] text-gray-700 space-y-2 mb-3">
        <li className="flex gap-2">
          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-yellow-500" />
          Guided mastery: fundamentals → applied engineering
        </li>
        <li className="flex gap-2">
          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-yellow-500" />
          Career conversion: project proof → CV & interviews → offers
        </li>
      </ul>

      <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 mb-2">
        Structured Journey
      </p>

      {/* Diagram wrapper */}
      <div className="relative">
        <div
          className="relative mx-auto"
          style={{
            width: svgWidth,
            height: svgHeight
          }}
        >
          {/* Static base path */}
          <svg
            width={svgWidth}
            height={svgHeight}
            className="overflow-visible"
          >
            <path
              d={pathD}
              stroke="rgba(234,179,8,0.25)"
              strokeWidth={10}
              strokeLinecap="round"
              fill="none"
            />
            {!prefersReduced && pathLength > 0 && (
              <path
                ref={pathRef}
                d={pathD}
                stroke="url(#mentorship-flow-gradient)"
                strokeWidth={10}
                strokeLinecap="round"
                fill="none"
                style={{
                  strokeDasharray: pathLength,
                  strokeDashoffset:
                    pathLength - pathLength * ((active + 1) / mentorshipStages.length),
                  transition: "stroke-dashoffset 900ms cubic-bezier(.6,.2,.2,1)"
                }}
              />
            )}
            <defs>
              <linearGradient id="mentorship-flow-gradient" x1="0" y1="0" x2={svgWidth} y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FACC15" />
                <stop offset="55%" stopColor="#D4A017" />
                <stop offset="100%" stopColor="#FACC15" />
              </linearGradient>
            </defs>
          </svg>

          {/* Nodes (absolute pills) */}
          {stagePositions.map((pos, idx) => {
            const isActive = idx === active
            const passed = active > idx
            return (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  top: pos.y + PAD_Y - 18,
                  left: pos.x + PAD_X - 50, // center offset for pill width (~100px)
                  width: 100,
                  textAlign: 'center'
                }}
                aria-current={isActive ? "step" : undefined}
              >
                <div
                  className={`px-2.5 py-1.5 rounded-md text-[10px] font-semibold tracking-wide
                    transition-all duration-500
                    ${isActive
                      ? 'bg-yellow-500 text-white shadow-lg scale-[1.06] ring-2 ring-yellow-400/60'
                      : passed
                        ? 'bg-yellow-100 text-yellow-800 ring-1 ring-yellow-300'
                        : 'bg-gray-100 text-gray-600 ring-1 ring-gray-200'}
                  `}
                  style={{
                    boxShadow: isActive
                      ? '0 4px 14px -2px rgba(234,179,8,0.55)'
                      : undefined
                  }}
                >
                  {mentorshipStages[idx]}
                </div>
              </div>
            )
          })}
        </div>

        {/* Mobile fallback: simple wrapped list (no complex path) */}
        <div className="md:hidden mt-4 flex flex-wrap gap-2">
          {mentorshipStages.map((s, idx) => {
            const isActive = idx === active
            const passed = active > idx
            return (
              <span
                key={s}
                className={`px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-wide transition
                  ${isActive
                    ? 'bg-yellow-500 text-white'
                    : passed
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-600'}`}
              >
                {s}
              </span>
            )
          })}
        </div>
      </div>

      <p className="text-[10px] mt-3 text-gray-500 font-medium">
        Current Focus: <span className="text-gray-800 font-semibold">{mentorshipStages[active]}</span>
      </p>
      <p className="text-[10px] uppercase tracking-wide font-semibold text-gray-500">
        Skills → Proof → Confidence → Offers
      </p>
    </TrackCard>
  )
}

  return (
    <div className="min-h-screen bg-[#fcf6f1] text-gray-900">
      <style jsx global>{`
        @keyframes shine {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(250%); }
        }
        .animate-shine { animation: shine 1.2s ease-out forwards; }
        .fade-panel { animation: fadePanel 420ms ease; }
        @keyframes fadePanel {
          from { opacity:0; transform: translateY(8px); }
          to { opacity:1; transform: translateY(0); }
        }
        .card-outline { position:relative; }
        .card-outline:before {
          content:"";
          position:absolute;
          inset:0;
          padding:1px;
          border-radius:inherit;
          background:linear-gradient(140deg,rgba(253,224,71,0.58),rgba(255,255,255,0) 45%,rgba(253,224,71,0.3));
          -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
          -webkit-mask-composite:xor;
                  mask-composite:exclude;
          opacity:0;
          transition:opacity .45s ease;
          pointer-events:none;
        }
        .card-outline:hover:before { opacity:1; }
      `}</style>

      <ScrollProgressBar />
      <ScrollToTop />
      <Header />

      {/* HERO */}
      <section className="bg-[#fcf6f1] relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-20 -left-10 w-80 h-80 rounded-full blur-3xl"
          style={{ background:"radial-gradient(ellipse at center, rgba(250,204,21,0.35), rgba(236,72,153,0.25))", transform:`translateY(${y1}px)`, transition:"transform 60ms linear"}} />
        <div aria-hidden className="pointer-events-none absolute -bottom-10 -right-10 w-96 h-96 rounded-full blur-3xl"
          style={{ background:"radial-gradient(ellipse at center, rgba(99,102,241,0.25), rgba(20,184,166,0.25))", transform:`translateY(${y2}px)`, transition:"transform 60ms linear"}} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16 relative">
          <Reveal>
            <div className="text-center bg-gradient-to-br from-white/60 via-transparent to-white/35 rounded-3xl py-16 px-8 backdrop-blur-sm">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                Real <span className="text-yellow-500">Stories</span>, Real Outcomes
              </h1>
              <p className="text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                Discover how mentorship, workshops, and open dialogue help students gain clarity, confidence, and career momentum.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* OUTCOME EVIDENCE HUB */}
      {evidenceTabs.length > 0 && (
        <section className="py-16 bg-[#fcf6f1]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Reveal>
              <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-center mb-3">Outcome Evidence</h2>
                <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
                  Offers earned, accelerated skill gains, and university‑backed credibility—unified in one view.
                </p>

                <div role="tablist" aria-label="Evidence Modes" className="flex flex-wrap justify-center gap-3 mb-12">
                  {evidenceTabs.map(tab => {
                    const active = tab.key === activeEvidenceTab
                    return (
                      <button
                        key={tab.key}
                        role="tab"
                        aria-selected={active}
                        aria-controls={`evidence-panel-${tab.key}`}
                        id={`evidence-tab-${tab.key}`}
                        onClick={() => setActiveEvidenceTab(tab.key)}
                        className={`px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 ${
                          active ? 'bg-yellow-500 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-yellow-100'
                        }`}
                      >
                        {tab.label}
                      </button>
                    )
                  })}
                </div>

                {evidenceTabs.map(tab => (
                  <div
                    key={tab.key}
                    id={`evidence-panel-${tab.key}`}
                    role="tabpanel"
                    aria-labelledby={`evidence-tab-${tab.key}`}
                    hidden={activeEvidenceTab !== tab.key}
                    className="fade-panel"
                  >
                    {/* PLACEMENTS */}
                    {tab.key === 'placements' && (
                      <div>
                        <div className="flex flex-col items-center text-center mb-10">
                          <h3 className="text-2xl font-bold text-gray-900">
                            Recent Offer Highlights
                          </h3>
                          <p className="text-sm text-gray-600 mt-2">
                            Sample median time‑to‑offer:{" "}
                            <span className="font-semibold text-yellow-600">
                              {medianTimePlacement(placements)}
                            </span>
                          </p>
                        </div>

                        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                          {placements.map((p, i) => (
                            <Reveal key={p.id} delay={i * 0.06}>
                              <Tilt maxTilt={9} scale={1.012}>
                                <div className="relative card-outline bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col h-full focus-within:ring-2 focus-within:ring-yellow-400">
                                  <CompanyBadge company={p.company} />
                                  <div className="flex items-start gap-4 mb-5">
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-lg ${avatarColor(p.name)}`}>
                                      {getInitials(p.name)}
                                    </div>
                                    <div className="pr-10">
                                      <h4 className="font-semibold text-gray-900 leading-tight">{p.name}</h4>
                                      <p className="text-xs text-gray-500 leading-snug">{p.role}</p>
                                      {p.track && (
                                        <span className="inline-block mt-1 text-[10px] uppercase font-semibold bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full tracking-wide">
                                          {p.track}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <blockquote className="relative italic text-sm text-gray-700 leading-relaxed mb-5">
                                    <span className="text-yellow-400 text-xl mr-1" aria-hidden>"</span>
                                    {p.miniQuote}
                                    <span className="text-yellow-300 text-lg ml-1" aria-hidden>"</span>
                                  </blockquote>
                                  <div className="flex flex-wrap gap-2 mb-6">
                                    {p.skills.map(skill => (
                                      <span
                                        key={skill}
                                        className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-[10px] font-semibold uppercase tracking-wide"
                                      >
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                  <div className="mt-auto pt-4 border-t border-gray-100 grid grid-cols-2 gap-4 text-xs">
                                    <div>
                                      <div className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold">CTC</div>
                                      <div className="text-gray-800 font-medium mt-0.5">{p.ctc}</div>
                                    </div>
                                    <div>
                                      <div className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold">Time‑to‑Offer</div>
                                      <div className="text-yellow-600 font-semibold mt-0.5">{p.timeToOfferWeeks} wks</div>
                                    </div>
                                  </div>
                                </div>
                              </Tilt>
                            </Reveal>
                          ))}
                        </div>

                        <div className="mt-10 text-center">
                          <button className="text-sm font-semibold text-yellow-600 hover:text-yellow-500 transition">
                            View Full Offer Journeys →
                          </button>
                        </div>
                      </div>
                    )}

                    {/* TRACK OUTCOMES */}
                    {tab.key === 'tracks' && currentTrack && (
                      <div>
                        <div className="flex flex-wrap gap-3 mb-12 justify-center">
                          {trackKeys.map(k => {
                            const active = k === activeTrackKey
                            return (
                              <button
                                key={k}
                                onClick={() => setActiveTrackKey(k)}
                                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition ${
                                  active ? 'bg-yellow-500 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-yellow-100'
                                }`}
                              >
                                {trackOutcomes[k].label}
                              </button>
                            )
                          })}
                        </div>

                        <div className="grid gap-8 md:gap-10 sm:grid-cols-2 xl:grid-cols-3">
                          {/* TOP STAR STUDENT */}
                          <TrackCard title="Top Star Student" icon={<IconStar />}>
                            <div className="flex items-start gap-4">
                              <div className={`w-20 h-20 rounded-2xl text-white font-bold text-2xl flex items-center justify-center ${currentTrack.topStudent.avatarColor}`}>
                                {getInitials(currentTrack.topStudent.name)}
                              </div>
                              <div className="flex-1 space-y-1">
                                <p className="font-semibold text-gray-900 text-sm md:text-base">{currentTrack.topStudent.name}</p>
                                <p className="text-xs text-gray-500 font-medium">{currentTrack.topStudent.role}</p>
                                <p className="text-[11px] text-gray-500">{currentTrack.topStudent.college}</p>
                              </div>
                            </div>
                            <ul className="mt-4 space-y-2 text-sm text-gray-700">
                              {currentTrack.topStudent.bullets.map((b,i)=>(
                                <li key={i} className="flex gap-2">
                                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="pt-3">
                              <span className="inline-flex items-center gap-1 bg-yellow-500/10 text-yellow-700 text-[11px] font-semibold px-3 py-1 rounded-full tracking-wide">
                                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                                Median: {currentTrack.medianTime}
                              </span>
                            </div>
                          </TrackCard>

                          {/* NEW: Mentorship Impact */}
                          <MentorshipImpactCard />

                          {/* KEY PROJECT */}
                          <TrackCard title="Key Project" icon={<IconRocket />} variant="dark">
                            <h5 className="text-lg font-semibold leading-snug text-white">
                              {currentTrack.keyProject.title}
                            </h5>
                            <p className="text-sm text-gray-300 leading-relaxed flex-1">
                              {currentTrack.keyProject.description}
                            </p>
                            <div className="flex flex-wrap gap-2 pt-2">
                              {currentTrack.keyProject.stack.map(tag => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 rounded-full bg-yellow-500/15 text-yellow-300 text-[11px] font-semibold uppercase tracking-wide"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </TrackCard>
                        </div>
                      </div>
                    )}

                    {/* UNIVERSITIES */}
                    {tab.key === 'universities' && (
                      <div>
                        <div className="mb-8">
                          <h3 className="text-xl font-bold text-gray-900">University Collaborations</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Embedded, outcomes‑driven programs aligning academic cohorts with industry readiness.
                          </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                          {universityPartners.map(p => (
                            <div
                              key={p.id}
                              className="group relative bg-gradient-to-b from-white to-yellow-50/40 border border-yellow-100 hover:border-yellow-300 rounded-2xl p-6 shadow transition-all hover:shadow-lg flex flex-col"
                            >
                              <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-xl bg-white ring-2 ring-yellow-100 flex items-center justify-center overflow-hidden">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={p.logo}
                                    alt={p.name}
                                    className="w-full h-full object-contain p-1"
                                    onError={(e)=>{e.currentTarget.style.display='none'}}
                                  />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900">{p.name}</h4>
                                  <p className="text-xs text-gray-500 font-medium">
                                    Since {p.since}
                                  </p>
                                </div>
                              </div>
                              <blockquote className="text-sm text-gray-700 leading-relaxed mb-4 grow relative">
                                <span className="absolute -left-2 -top-2 text-yellow-400 text-3xl">"</span>
                                {p.quote}
                                <span className="text-yellow-300 text-2xl absolute -right-1 -bottom-3">"</span>
                              </blockquote>
                              <div className="space-y-2 text-xs">
                                <div className="flex justify-between">
                                  <span className="font-semibold text-gray-600">Programs Run:</span>
                                  <span className="text-gray-700">{p.programsRun.length}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-semibold text-gray-600">Students Impacted:</span>
                                  <span className="text-yellow-600 font-semibold">{p.studentsImpacted}</span>
                                </div>
                              </div>
                              <div className="mt-4 flex flex-wrap gap-2">
                                {p.programsRun.map(tag => (
                                  <span key={tag} className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-[10px] font-semibold uppercase tracking-wide">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* STATS */}
      <section className="py-16 bg-[#fcf6f1] stats-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Reveal key={index} delay={index * 0.08}>
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center group hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <div className="text-4xl lg:text-5xl font-bold text-yellow-500 mb-2">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-gray-600 font-semibold text-sm uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-[#fcf6f1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                All Testimonials
              </h2>
              <div className="mx-auto h-1.5 w-24 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full" />
              <p className="text-xl text-gray-700 max-w-3xl mx-auto mt-6">
                Filter by focus area to explore different kinds of transformation.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {['all','mentorship','workshops','career','soft-skills'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wide transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-yellow-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-yellow-500 hover:text-white hover:border-yellow-500'
                  }`}
                >
                  {filter.replace('-', ' ')}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.map((t, i) => (
              <Reveal key={t.id} delay={(i % 6) * 0.07}>
                <Tilt className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold ${avatarColor(t.name)}`}>
                      {getInitials(t.name)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t.name}</h3>
                      <span className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                        {t.tag}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <div key={j} className="w-4 h-4 text-yellow-500">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    ))}
                  </div>
                  <blockquote className="text-gray-700 text-sm leading-relaxed relative px-6">
                    <span aria-hidden className="text-4xl text-yellow-500/30 absolute -top-2 -left-1 font-serif select-none">"</span>
                    {t.quote}
                    <span aria-hidden className="text-4xl text-yellow-500/20 absolute -bottom-4 -right-1 font-serif select-none">"</span>
                  </blockquote>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MEDIA STORY */}
      <section className="py-20 bg-[#fcf6f1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  A Journey From Uncertain to Unstoppable
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Watch how one learner leveraged personalized mentorship, peer pods, and targeted workshops to accelerate from exploratory phase to a clear technical track with tangible outcomes.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  Every transformation begins with a candid conversation. The structure we provide simply keeps the momentum consistent.
                </p>
                <div className="flex gap-4">
                  <ShinyButton className="px-8 py-4 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Start Your Journey
                  </ShinyButton>
                  <ShinyButton className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200">
                    Learn More
                  </ShinyButton>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl bg-gray-900">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Student mentorship experience story video"
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#fcf6f1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="bg-gradient-to-br from-white/80 to-white/40 rounded-3xl p-12 lg:p-16 text-center shadow-xl">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Ready to Elevate Your Learning?
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
                Join a community where guidance is actionable, feedback is constructive, and growth is measurable.
                Your next meaningful step starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <ShinyButton className="px-10 py-4 bg-yellow-500 text-white rounded-lg font-bold text-lg hover:bg-yellow-400 transition-all duration-200 shadow-xl hover:shadow-2xl">
                  Apply Now
                </ShinyButton>
                <ShinyButton className="px-10 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-bold text-lg hover:bg-gray-50 transition-all duration-200">
                  Meet Mentors
                </ShinyButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}