"use client"

import { useState, useEffect, useRef } from "react"
import Header from "../components/header/page"
import Footer from "../components/footer/page"
import ScrollFeatures from "../components/scroll_feature/ScrollFeatures"

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

/* -----------------------------------------------------------------------------
   Left hero visual: Auto-rotating 2x2 color cards
----------------------------------------------------------------------------- */
function ColorCardsGrid() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const cards = [
    { title: "Dreams to Reality", note: "turning aspirations into tangible achievements.", g1: "#fef3c7", g2: "#fcd34d", icon: "🎯" },
    { title: "Personal Transformation", note: "students walk away more self-assured, adaptable, and future-ready.", g1: "#fbcfe8", g2: "#ec4899", icon: "🧑‍🏫" },
    { title: "Opportunities Unlocked", note: "access to jobs, internships, and roles they never imagined possible.", g1: "#ddd6fe", g2: "#6366f1", icon: "🌐" },
    { title: "Impact Beyond Classrooms", note: "learning that resonates in real-world challenges and success stories.", g1: "#a7f3d0", g2: "#14b8a6", icon: "🚀" },
  ]

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive((a) => (a + 1) % cards.length), 2400)
    return () => clearInterval(id)
  }, [paused, cards.length])

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    const rx = ((y / r.height) - 0.5) * -10
    const ry = ((x / r.width) - 0.5) * 10
    e.currentTarget.style.setProperty("--rx", `${rx}deg`)
    e.currentTarget.style.setProperty("--ry", `${ry}deg`)
    e.currentTarget.style.setProperty("--mx", `${x}px`)
    e.currentTarget.style.setProperty("--my", `${y}px`)
  }
  const onLeave = (e) => {
    e.currentTarget.style.setProperty("--rx", `0deg`)
    e.currentTarget.style.setProperty("--ry", `0deg`)
  }

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onMouseMove={onMove}
      onMouseOut={onLeave}
      className="group relative rounded-3xl overflow-hidden shadow-xl bg-white tilt-3d p-4"
      style={{ transform: "rotateX(var(--rx, 0)) rotateY(var(--ry, 0))" }}
    >
      <span className="shine pointer-events-none" aria-hidden />
      <span
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "radial-gradient(220px 160px at var(--mx) var(--my), rgba(255,255,255,0.35), transparent 60%)" }}
        aria-hidden
      />
      <span className="magic-sparkles" aria-hidden />

      <div className="grid grid-cols-2 gap-4">
        {cards.map((c, i) => {
          const isActive = i === active
          return (
            <div
              key={c.title}
              className={`relative rounded-2xl p-4 h-40 lg:h-48 text-gray-900 select-none cursor-default transition-all duration-500 ease-out overflow-hidden ${isActive ? "scale-[1.03] shadow-2xl z-10" : "opacity-90 shadow-lg"}`}
              style={{ background: `linear-gradient(135deg, ${c.g1}, ${c.g2})` }}
            >
              <div
                className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}
                style={{
                  padding: 2,
                  background: "linear-gradient(120deg, rgba(255,255,255,.4), rgba(255,255,255,.15), rgba(255,255,255,0))",
                  mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />
              <div className="text-3xl drop-shadow-sm">{c.icon}</div>
              <div className="mt-2 font-extrabold text-lg leading-tight drop-shadow-sm">{c.title}</div>
              <div className="text-sm opacity-90">{c.note}</div>

              <div className="absolute left-4 right-4 bottom-4 h-1.5 rounded-full overflow-hidden bg-white/40">
                <div
                  className={`h-full rounded-full transition-all duration-[900ms] ease-out ${isActive ? "translate-x-0" : "-translate-x-full"}`}
                  style={{ background: "linear-gradient(90deg, rgba(255,255,255,.9), rgba(17,24,39,.25))" }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {cards.map((_, i) => (
          <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${active === i ? "w-6 bg-gray-900/70" : "w-2.5 bg-gray-400/60"}`} />
        ))}
      </div>

      <div className="absolute top-3 right-3 text-[11px] font-semibold px-2 py-1 rounded-full bg-white/80 text-gray-700 shadow">
        {paused ? "Paused" : "Auto"}
      </div>
    </div>
  )
}

/* -----------------------------------------------------------------------------
   HERO: Career Academy section
----------------------------------------------------------------------------- */
function ShowcaseCTASection({ onOpenForm }) {
  const cardRef = useRef(null)
  const scrollToHowItWorks = () =>
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })

  return (
    <section id="career-academy" className="relative bg-[#fcf6f1]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal className="order-1 lg:order-none">
            <ColorCardsGrid />
          </Reveal>

          <Reveal delay={0.05}>
            <div ref={cardRef}>
              <h1 className="text-4xl lg:text-5xl font-black leading-[1.1] text-gray-900">
                Equip your students with skills for the careers of tomorrow
              </h1>
              <p className="mt-6 text-lg text-gray-700">
                Prepare students for the future with training built with industry giants.
              </p>

              <ul className="mt-6 space-y-4">
                {[
                  "Secure a certificate that turns skills into opportunities.",
                  "Develop the essential skills today's employers seek.",
                  "Demonstrate your expertise through a professional portfolio.",
                  "Unlock opportunities in top roles across diverse sectors.",
                ].map((line, i) => (
                  <li key={line} className="flex items-start gap-3 rise-in" style={{ animationDelay: `${150 + i * 90}ms` }}>
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-sm">✓</span>
                    <span className="text-gray-800">{line}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row gap-7">
                <button
                  onClick={onOpenForm}
                  className="btn-gradient text-white px-7 py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  Get Started Now
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* -----------------------------------------------------------------------------
   University Partnership Benefits
----------------------------------------------------------------------------- */
function UniversityBenefitsSection() {
  const features = [
    {
      icon: "🎓",
      title: "Career Bootcamps",
      desc: "Intensive, job-focused bootcamps designed to equip students with practical, industry-relevant skills and prepare them for placement success.",
      border: "#A78BFA",
      bubbleFrom: "#FFF7ED",
      bubbleTo: "#EEF2FF",
    },
    {
      icon: "🤝",
      title: "Industry Mentors",
      desc: "Connect students with real professionals and alumni for career insights and practical advice.",
      border: "#C084FC",
      bubbleFrom: "#FFF1F2",
      bubbleTo: "#F5F3FF",
    },
    {
      icon: "🌐",
      title: "Faculty Empowerment",
      desc: "We provide experienced faculty and trainers who guide students not only in academics but also in career preparation and interview readiness.",
      border: "#93C5FD",
      bubbleFrom: "#ECFEFF",
      bubbleTo: "#ECFDF5",
    },
    {
      icon: "📈",
      title: "End-to-End Career Support",
      desc: "From skill-building to certifications, mentorship, and job connections, we provide complete support to improve student employability outcomes.",
      border: "#A5B4FC",
      bubbleFrom: "#EEF2FF",
      bubbleTo: "#DBEAFE",
    },
  ]

  return (
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
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <div
                className="rounded-[28px] bg-white p-8 text-center shadow-[0_18px_55px_rgba(2,8,23,0.08)] h-full"
                style={{ border: `3px solid ${f.border}` }}
              >
                <div
                  className="mx-auto mb-6 w-16 h-16 flex items-center justify-center text-3xl rounded-full shadow-inner"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${f.bubbleFrom}, ${f.bubbleTo})` }}
                >
                  {f.icon}
                </div>
                <h4 className="font-semibold text-lg text-gray-900 mb-2">{f.title}</h4>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ===================== Programs we run with Universities ===================== */
/* Adds selectable circle on each card, and an "Apply with selected tracks" button that opens the form with selections pre-checked */
function PartnershipTracks({ selectedSubjects, onToggleSubject, onApplySelected }) {
  const subjects = [
    {
      key: "DSA",
      name: "DSA",
      icon: "🧮",
      color: "bg-blue-100 text-blue-700",
      description: "Data Structures & Algorithms",
      highlights: [
        "Crack coding interviews",
        "Master problem-solving",
        "Build strong CS fundamentals"
      ]
    },
    {
      key: "System Design",
      name: "System Design",
      icon: "🏗️",
      color: "bg-purple-100 text-purple-700",
      description: "Scalable Architecture",
      highlights: [
        "Design real-world systems",
        "Learn patterns & scalability",
        "Prepare for tech interviews"
      ]
    },
    {
      key: "Data Analytics",
      name: "Data Analytics",
      icon: "📊",
      color: "bg-green-100 text-green-700",
      description: "Data Science & Analytics",
      highlights: [
        "Analyze real datasets",
        "Build predictive models",
        "Create data-driven insights"
      ]
    },
    {
      key: "Backend/Frontend",
      name: "Backend/Frontend",
      icon: "💻",
      color: "bg-orange-100 text-orange-700",
      description: "Full Stack Development",
      highlights: [
        "Build complete applications",
        "Work with APIs & databases",
        "Deploy production projects"
      ]
    },
    {
      key: "Real World Projects",
      name: "Real World Projects",
      icon: "🚀",
      color: "bg-red-100 text-red-700",
      description: "Industry-Level Projects",
      highlights: [
        "Hands-on capstone projects",
        "Solve industry challenges",
        "Showcase portfolio work"
      ]
    },
    {
      key: "MERN & MEAN",
      name: "MERN & MEAN",
      icon: "⚛️",
      color: "bg-teal-100 text-teal-700",
      description: "Modern Tech Stacks",
      highlights: [
        "Learn React, Angular & Node",
        "Master MongoDB & Express",
        "Build scalable web apps"
      ]
    }
  ]

  return (
    <section className="py-18 lg:py-20 bg-[#fcf6f1]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
              Expert Mentorship Across Key Technologies
            </h2>
            <p className="mt-3 text-gray-700 max-w-3xl mx-auto">
              Select the tracks you’re interested in, then apply. Your selections will be pre-filled in the application form.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((subject, i) => {
            const isSelected = selectedSubjects.has(subject.key)
            return (
              <Reveal key={subject.key} delay={i * 0.06}>
                <div className="relative rounded-3xl p-[2px] bg-gradient-to-br from-yellow-200 via-orange-200 to-red-200">
                  <div className={`${subject.color} rounded-3xl p-1`}>
                    <div
                      className={`relative rounded-[22px] bg-white p-8 h-full shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                        isSelected ? "ring-2 ring-yellow-400" : ""
                      }`}
                      onClick={() => onToggleSubject(subject.key)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onToggleSubject(subject.key)}
                    >
                      {/* Select circle (top-right) */}
                      <button
                        type="button"
                        aria-pressed={isSelected}
                        aria-label={isSelected ? `Unselect ${subject.name}` : `Select ${subject.name}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          onToggleSubject(subject.key)
                        }}
                        className={`absolute top-3 right-3 w-7 h-7 rounded-full border-2 ${
                          isSelected ? "border-yellow-500 bg-yellow-500 text-white" : "border-gray-300 bg-white"
                        } grid place-items-center shadow-sm hover:scale-105 transition-transform`}
                      >
                        {isSelected ? "✓" : ""}
                      </button>

                      <div className="text-center">
                        <div className="text-4xl mb-4">{subject.icon}</div>
                        <h3 className="font-bold text-xl text-gray-900 mb-1">{subject.name}</h3>
                        <p className="text-gray-600 text-sm mb-6">{subject.description}</p>
                        <div className="space-y-2 text-left text-gray-700 text-sm max-w-xs mx-auto">
                          {subject.highlights.map((line, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <span className="text-yellow-500">•</span>
                              <span>{line}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="flex flex-col items-center gap-3 mt-12">
            <button
              onClick={onApplySelected}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Apply with selected tracks
            </button>
            <p className="text-xs text-gray-600">
              Your marked tracks will be auto-selected in the application form.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// Testimonials (short)
function TestimonialsStrip() {
  const quotes = [
    {
      q: "BridgeLabs made it easy to embed employability into our curriculum without adding faculty load.",
      a: "Dean, School of Engineering",
    },
    {
      q: "Our students now talk to industry mentors weekly—placements improved in one term.",
      a: "Head, Career Services",
    },
  ]
  return (
    <section className="py-16 bg-[#fcf6f1]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-3xl bg-white p-8 md:p-10 shadow-lg">
          <div className="grid md:grid-cols-2 gap-8">
            {quotes.map((c, i) => (
              <Reveal key={i}>
                <blockquote className="text-gray-800">
                  <p className="text-lg">"{c.q}"</p>
                  <footer className="mt-3 text-sm text-gray-500">— {c.a}</footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ===================== Professional Certificates Section ===================== */
function ProfessionalCertificatesSection({ onGetReport }) {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <Reveal>
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
                Provide Your Students with Career-Enhancing Certificates
              </h2>

              <div className="prose prose-lg text-gray-700 space-y-4">
                <p>
                  We offer industry-recognized certificates designed to equip your students with the skills employers seek most.
                  Integrate these certifications to strengthen employability and prepare graduates for immediate success.
                </p>
                <p>
                  These credentials validate expertise and give students a competitive edge in today’s job market.
                </p>
                <p className="font-semibold text-yellow-600">
                  Create a seamless link between classroom achievement and career opportunity through certification.
                </p>
              </div>

              <button
                className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 relative overflow-hidden"
                onClick={onGetReport}
              >
                <span className="relative z-10">Get detailed report</span>
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </Reveal>

          {/* Right Visual */}
          <Reveal delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80"
                alt="Students with professional certificates studying"
                className="w-full h-80 lg:h-96 object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ===================== APPLICATION FORM (Modal Card) ===================== */
function ApplicationFormModal({ open, onClose, preselectedCourses = [] }) {
  const [submitted, setSubmitted] = useState(false)
  const firstFieldRef = useRef(null)
  const bodyRef = useRef(null)

  // Helper to get initial form state
  const getInitialForm = () => ({
    university: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    city: "",
    cohortSize: "100-250",
    needs: {
      mentors: false,
      trainers: false,
      teachers: false,
      faculty: false,
      preparationMaterials: false
    },
    courses: {
      DSA: false,
      systemDesign: false,
      dataAnalytics: false,
      frontendDev: false,
      backendDev: false,
      fullStackDev: false,
      mernStack: false,
      meanStack: false,
      realWorldProjects: false,
      careerGuidance: false
    },
    start: "",
    message: "",
    consent: false
  })

  const [form, setForm] = useState(getInitialForm())

  // Apply preselected courses whenever modal opens with a new list
  useEffect(() => {
    if (!open) return
    setForm((prev) => {
      const updated = { ...prev, courses: { ...prev.courses } }
      // reset all to false first
      Object.keys(updated.courses).forEach((k) => (updated.courses[k] = false))
      // set provided keys to true
      preselectedCourses.forEach((k) => {
        if (k in updated.courses) updated.courses[k] = true
      })
      return updated
    })
  }, [open, preselectedCourses])

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    requestAnimationFrame(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = 0
      firstFieldRef.current?.focus()
    })
    return () => { document.body.style.overflow = prevOverflow }
  }, [open])

  useEffect(() => {
    const onKey = (e) => {
      if (!open) return
      if (e.key === "Escape") onClose()
      if (!bodyRef.current) return
      if (e.key === "Home") bodyRef.current.scrollTo({ top: 0, behavior: "smooth" })
      if (e.key === "End") bodyRef.current.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" })
      if (e.key === "PageDown") bodyRef.current.scrollBy({ top: bodyRef.current.clientHeight * 0.9, behavior: "smooth" })
      if (e.key === "PageUp") bodyRef.current.scrollBy({ top: -bodyRef.current.clientHeight * 0.9, behavior: "smooth" })
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (name.startsWith("needs.")) {
      const key = name.split(".")[1]
      setForm((f) => ({ ...f, needs: { ...f.needs, [key]: checked } }))
    } else if (name.startsWith("courses.")) {
      const key = name.split(".")[1]
      setForm((f) => ({ ...f, courses: { ...f.courses, [key]: checked } }))
    } else if (type === "checkbox") {
      setForm((f) => ({ ...f, [name]: checked }))
    } else {
      setForm((f) => ({ ...f, [name]: value }))
    }
  }

  const scrollToField = (fieldName) => {
    const el = document.querySelector(`[name="${fieldName}"]`)
    if (el && bodyRef.current) {
      const container = bodyRef.current
      const elRect = el.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      const offset = elRect.top - containerRect.top + container.scrollTop - 24
      container.scrollTo({ top: offset, behavior: "smooth" })
      el.focus()
    }
  }

  // Phone validation helper
  function isValidPhone(phone) {
    // Basic validation: starts with +, 10-15 digits
    return /^\+\d{1,3}\s?\(?\d{1,4}\)?[\d\s-]{7,}$/.test(phone);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const requiredOrder = ["university", "name", "email", "consent"];
    const firstMissing = requiredOrder.find((key) =>
      key === "consent" ? !form.consent : !String(form[key]).trim()
    );
    if (firstMissing) {
      scrollToField(firstMissing);
      return;
    }
    if (!isValidPhone(form.phone)) {
      scrollToField("phone");
      alert("Please enter a valid phone number (e.g., +1 (555) 123-4567)");
      return;
    }
    setSubmitted(true);
    // setTimeout(() => {
    //   onClose();
    //   setSubmitted(false);
    //   setForm(getInitialForm());
    // }, 1400);
  }

  const scrollTop = () => bodyRef.current?.scrollTo({ top: 0, behavior: "smooth" })
  const scrollBottom = () => bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" })

  const CheckboxPill = ({ name, label, checked, icon = "" }) => (
    <label
      className={[
        "flex items-center gap-3 rounded-xl border px-4 py-3 select-none cursor-pointer transition-all duration-200 hover:shadow-md",
        checked ? "border-yellow-400 bg-yellow-50 shadow-sm ring-2 ring-yellow-200" : "border-gray-200 bg-white hover:border-yellow-300"
      ].join(" ")}
    >
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={handleChange}
        className="accent-yellow-500 h-4 w-4 rounded"
      />
      {icon && <span className="text-lg">{icon}</span>}
      <span className={`text-sm font-medium ${checked ? "text-yellow-800" : "text-gray-700"}`}>{label}</span>
    </label>
  )

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        className={`relative w-full max-w-4xl max-h-[90vh] transition-all duration-300 ${
          open ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="relative rounded-3xl bg-white shadow-2xl overflow-hidden">
          {/* Gradient border effect */}
          <div className="absolute -inset-1 rounded-[26px] bg-gradient-to-r from-yellow-200 via-pink-200 to-teal-200 blur opacity-60" />

          <div className="relative rounded-3xl flex flex-col bg-white max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between p-6 sm:p-8 border-b bg-white">
              <div>
                <h3 className="text-2xl font-extrabold text-gray-900">Partner with BridgeLabs</h3>
                <p className="text-sm text-gray-600 mt-1">Transform your students' career prospects</p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-full w-9 h-9 bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div ref={bodyRef} className="flex-1 p-4 sm:p-6 overflow-y-auto">
              <div className="rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-yellow-50 via-pink-50 to-cyan-50 shadow-[0_12px_35px_rgba(2,8,23,0.08)]">
                {submitted ? (
                  <div className="py-16 text-center">
                    <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-2xl animate-bounce">✓</div>
                    <p className="text-lg font-semibold text-gray-900">Application submitted successfully!</p>
                    <p className="text-gray-600 mt-2">Our partnerships team will reach out within 1–2 working days to discuss your requirements.</p>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-8">
                    {/* University & Contact Information */}
                    <div className="bg-white/70 rounded-xl p-6 border border-gray-100">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="text-blue-600">🏛️</span>
                        University & Contact Information
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">University / Institution Name *</label>
                          <input
                            ref={firstFieldRef}
                            name="university"
                            value={form.university}
                            onChange={handleChange}
                            required
                            placeholder="e.g., Stanford University"
                            className="w-full rounded-lg border border-gray-300 bg-white p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person Name *</label>
                          <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            placeholder="Full name"
                            className="w-full rounded-lg border border-gray-300 bg-white p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Your Role/Position</label>
                          <input
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            placeholder="e.g., Dean, Program Director"
                            className="w-full rounded-lg border border-gray-300 bg-white p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="contact@university.edu"
                            className="w-full rounded-lg border border-gray-300 bg-white p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                          <input
                          type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            placeholder="+1 (555) 123-4567"
                            className="w-full rounded-lg border border-gray-300 bg-white p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* What University Needs */}
                    <div className="bg-white/70 rounded-xl p-6 border border-gray-100">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="text-green-600">🤝</span>
                        What do you need from BridgeLabs?
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        <CheckboxPill name="needs.mentors" label="Industry Mentors" checked={form.needs.mentors} icon="👨‍💼" />
                        <CheckboxPill name="needs.trainers" label="Professional Trainers" checked={form.needs.trainers} icon="🎯" />
                        <CheckboxPill name="needs.teachers" label="Subject Matter Experts" checked={form.needs.teachers} icon="👩‍🏫" />
                        <CheckboxPill name="needs.faculty" label="Guest Faculty" checked={form.needs.faculty} icon="🎓" />
                        <CheckboxPill name="needs.preparationMaterials" label="Study Materials & Resources" checked={form.needs.preparationMaterials} icon="📚" />
                      </div>
                    </div>

                    {/* Course Selection */}
                    <div className="bg-white/70 rounded-xl p-6 border border-gray-100" id="course-selection">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="text-purple-600">💻</span>
                        Courses / Programs (auto-selected from your choices)
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        <CheckboxPill name="courses.DSA" label="Data Structures & Algorithms" checked={form.courses.DSA} icon="🧮" />
                        <CheckboxPill name="courses.systemDesign" label="System Design" checked={form.courses.systemDesign} icon="🏗️" />
                        <CheckboxPill name="courses.dataAnalytics" label="Data Analytics" checked={form.courses.dataAnalytics} icon="📊" />
                        <CheckboxPill name="courses.frontendDev" label="Frontend Development" checked={form.courses.frontendDev} icon="🎨" />
                        <CheckboxPill name="courses.backendDev" label="Backend Development" checked={form.courses.backendDev} icon="⚙️" />
                        <CheckboxPill name="courses.fullStackDev" label="Full Stack Development" checked={form.courses.fullStackDev} icon="🔄" />
                        <CheckboxPill name="courses.mernStack" label="MERN Stack" checked={form.courses.mernStack} icon="⚛️" />
                        <CheckboxPill name="courses.meanStack" label="MEAN Stack" checked={form.courses.meanStack} icon="🅰️" />
                        <CheckboxPill name="courses.realWorldProjects" label="Real World Projects" checked={form.courses.realWorldProjects} icon="🚀" />
                        <CheckboxPill name="courses.careerGuidance" label="Career Guidance & Placement" checked={form.courses.careerGuidance} icon="🎯" />
                      </div>
                    </div>

                    {/* Program Details */}
                    <div className="bg-white/70 rounded-xl p-6 border border-gray-100">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Start Date</label>
                          <input
                            type="month"
                            name="start"
                            value={form.start}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Additional Requirements & Message</label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Tell us about your specific requirements, program goals, student profiles, timeline constraints, or any other details..."
                          className="w-full rounded-lg border border-gray-300 bg-white p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all placeholder:text-gray-400 resize-vertical"
                        />
                      </div>
                    </div>

                    {/* Consent & Submit */}
                    <div className="bg-white/70 rounded-xl p-6 border border-gray-100">
                      <label className="inline-flex items-start gap-3 text-sm text-gray-700 mb-6 cursor-pointer">
                        <input
                          type="checkbox"
                          name="consent"
                          checked={form.consent}
                          onChange={handleChange}
                          className="accent-yellow-500 h-4 w-4 mt-0.5 rounded"
                        />
                        <span>
                          I agree to be contacted by BridgeLabs regarding this partnership inquiry and understand that my information will be used to provide relevant program details and partnership opportunities. *
                        </span>
                      </label>

                      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setForm(getInitialForm());
                            setSubmitted(false);
                            onClose();
                          }}
                          className="px-6 py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-medium transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-8 py-3 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 hover:from-yellow-600 hover:via-orange-600 hover:to-pink-600 transform hover:scale-105"
                        >
                          Submit Partnership Application
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Scroll buttons */}
            <div className="absolute right-3 bottom-3 flex flex-col gap-2 z-20">
              <button
                onClick={scrollTop}
                title="Scroll to top"
                className="w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg border border-gray-200 flex items-center justify-center transition-all hover:bg-yellow-50"
              >
                ↑
              </button>
              <button
                onClick={scrollBottom}
                title="Scroll to bottom"
                className="w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg border border-gray-200 flex items-center justify-center transition-all hover:bg-yellow-50"
              >
                ↓
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ===================== Certification Report Modal (compact) ===================== */
function CertificationReportModal({ open, onClose }) {
  const panelRef = useRef(null)
  const bodyRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[11000]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div className="absolute left-1/2 top-1/2 w-[92%] max-w-xl -translate-x-1/2 -translate-y-1/2">
        <div
          ref={panelRef}
          className="relative bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Career-Enhancing Certifications"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b bg-white/90 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-gray-900">
                Career-Enhancing Certifications
              </h3>
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 grid place-items-center"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Body (scrollable) */}
          <div ref={bodyRef} className="px-5 pt-4 pb-5 max-h-[70vh] overflow-y-auto">
            <p className="text-gray-700">
              Our industry-recognized certifications go beyond just a credential — they are designed to prepare students
              for real-world success and unlock job opportunities. By earning these certificates, students demonstrate to
              employers that they have practical, industry-relevant skills and are job-ready from day one.
            </p>

            <div className="mt-5">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-yellow-700 uppercase">
                <span className="text-base">🔑</span> Advantages of Our Certifications
              </div>
              <ul className="mt-3 space-y-3 text-gray-800">
                <li className="flex gap-2">
                  <span className="text-yellow-500 mt-0.5">•</span>
                  <span>
                    <span className="font-semibold">Industry Validation</span> – Certificates recognized by top companies, giving students a competitive edge.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-yellow-500 mt-0.5">•</span>
                  <span>
                    <span className="font-semibold">Career Readiness</span> – Students gain hands-on skills that directly match employer requirements.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-yellow-500 mt-0.5">•</span>
                  <span>
                    <span className="font-semibold">Stronger Portfolios</span> – Certifications strengthen resumes and showcase credibility to hiring managers.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-yellow-500 mt-0.5">•</span>
                  <span>
                    <span className="font-semibold">Global Opportunities</span> – Recognized credentials open doors to diverse career paths worldwide.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 uppercase">
                <span className="text-base">🚀</span> Additional Career Support We Provide
              </div>
              <ul className="mt-3 space-y-3 text-gray-800">
                <li className="flex gap-2">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  <span>
                    <span className="font-semibold">Bootcamps with Mentors</span> – Intensive, job-focused bootcamps conducted by our expert mentors to build practical skills.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  <span>
                    <span className="font-semibold">Interview Preparation</span> – Personalized training sessions, mock interviews, and guidance to help students perform confidently in job interviews.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  <span>
                    <span className="font-semibold">Learning Materials</span> – Comprehensive study resources and practice material to reinforce learning and support career goals.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  <span>
                    <span className="font-semibold">Ongoing Mentorship</span> – One-on-one and group mentorship to guide students through career decisions, job applications, and skill growth.
                  </span>
                </li>
              </ul>
            </div>

            <p className="mt-6 text-gray-700">
              With this blend of certifications + mentorship + career support, students are empowered not just to earn a
              certificate, but to transform it into a career breakthrough.
            </p>
          </div>

          {/* Footer */}
          <div className="px-5 py-4 bg-gray-50 border-t flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 text-gray-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------------- Global Styles ---------------------- */
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

      .btn-gradient { background: linear-gradient(90deg, #f59e0b, #f97316, #ec4899); background-size: 200% 100%; animation: gradientShift 8s ease infinite; }

      /* 3D helpers */
      .perspective-1000 { perspective: 1000px; }
      .rotate-y-6 { transform: rotateY(6deg); }
      .rotate-y-12 { transform: rotateY(12deg); }

      /* 3D tilt + sheen (hero) */
      .tilt-3d { transform-style: preserve-3d; will-change: transform; transition: transform 300ms cubic-bezier(.25,.8,.25,1); }
      .tilt-3d:hover { transition-duration: 120ms; }
      .shine::after {
        content: "";
        position: absolute;
        top: -40%;
        left: -20%;
        width: 30%;
        height: 180%;
        background: linear-gradient(to right, transparent, rgba(255,255,255,.65), transparent);
        transform: translateX(-150%) rotate(18deg);
        transition: transform 900ms cubic-bezier(.2,.8,.2,1);
      }
      .group:hover .shine::after { transform: translateX(200%) rotate(18deg); }
      .rise-in { opacity: 0; transform: translateY(8px); animation: rise .6s ease forwards; }
      @keyframes rise { to { opacity: 1; transform: translateY(0); } }

      /* Subtle sparkle */
      .magic-sparkles {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          radial-gradient(6px 6px at 20% 30%, rgba(255,255,255,0.7), transparent 60%),
          radial-gradient(5px 5px at 70% 20%, rgba(255,255,255,0.6), transparent 60%),
          radial-gradient(4px 4px at 80% 70%, rgba(255,255,255,0.65), transparent 60%),
          radial-gradient(3px 3px at 35% 75%, rgba(255,255,255,0.5), transparent 60%);
        opacity: 0;
        transition: opacity 300ms ease;
      }
    `}</style>
  )
}

export default function ForUniversitiesPage() {
  const [openForm, setOpenForm] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)

  // Track selections from PartnershipTracks
  const [selectedSubjects, setSelectedSubjects] = useState(new Set())
  const [preselectedCourses, setPreselectedCourses] = useState([])

  const toggleSubject = (key) => {
    setSelectedSubjects((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  // Map selected subject names to course keys in the ApplicationFormModal
  const buildPreselectedCourses = (subjectSet) => {
    const out = new Set()
    subjectSet.forEach((s) => {
      if (s === "DSA") out.add("DSA")
      if (s === "System Design") out.add("systemDesign")
      if (s === "Data Analytics") out.add("dataAnalytics")
      if (s === "Backend/Frontend") {
        out.add("frontendDev")
        out.add("backendDev")
        out.add("fullStackDev")
      }
      if (s === "Real World Projects") out.add("realWorldProjects")
      if (s === "MERN & MEAN") {
        out.add("mernStack")
        out.add("meanStack")
      }
    })
    return Array.from(out)
  }

  const onApplySelected = () => {
    const pre = buildPreselectedCourses(selectedSubjects)
    setPreselectedCourses(pre)
    setOpenForm(true)
    // Scroll to ensure modal is visible
    setTimeout(() => {
      document.querySelector('[role="dialog"]')?.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 50)
  }

  return (
    <div className="min-h-screen bg-[#fcf6f1] text-gray-900 relative">
      <GlobalStyles />
      <Header />

      {/* HERO */}
      <ShowcaseCTASection onOpenForm={() => setOpenForm(true)} />

      {/* University Partnership Benefits */}
      <UniversityBenefitsSection />

      {/* Anchor target for "How it works" buttons */}
      <section id="how-it-works" className="py-2" aria-hidden />

      {/* Selectable tracks */}
      <PartnershipTracks
        selectedSubjects={selectedSubjects}
        onToggleSubject={toggleSubject}
        onApplySelected={onApplySelected}
      />

      <TestimonialsStrip />

      {/* Professional Certificates Section */}
      <ProfessionalCertificatesSection onGetReport={() => setShowReportModal(true)} />

      {/* PARTNER LOGOS (placeholder) */}
      <section className="py-16 bg-[#fcf6f1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Trusted By Leading Universities</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">Join a network of institutions advancing student success.</p>
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

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 bg-[#fcf6f1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="cta-kinetic relative rounded-3xl p-12 lg:p-16 text-center shadow-xl
              bg-gradient-to-br from-white/80 to-white/40
              hover:bg-gradient-to-br hover:from-yellow-100 hover:to-pink-200
              transition-all duration-300
              hover:shadow-2xl hover:-translate-y-2 hover:scale-100
              group overflow-hidden">
              <span className="cta-sheen" aria-hidden />
              <h3 className="kt-heading text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                <span className="kt-word" style={{ "--d": "0ms" }}>Ready</span>
                <span className="kt-word" style={{ "--d": "120ms" }}>to</span>
                <span className="kt-word" style={{ "--d": "240ms" }}>Elevate</span>
                <span className="kt-word" style={{ "--d": "360ms" }}>Your</span>
                <span className="kt-word" style={{ "--d": "480ms" }}>University?</span>
              </h3>

              <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
                <span className="block kinetic-in" style={{ animationDelay: "120ms" }}>
                  Start the conversation with BridgeLabs.
                </span>
                <span className="block kinetic-in" style={{ animationDelay: "280ms" }}>
                  Let's build future-ready graduates together.
                </span>
              </p>

              <button
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                className="px-10 py-4 btn-gradient text-white rounded-lg font-bold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl relative overflow-hidden"
              >
                See How It Works
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
      <ScrollFeatures/>
      {openForm && (
        <ApplicationFormModal
          open={openForm}
          onClose={() => setOpenForm(false)}
          preselectedCourses={preselectedCourses}
        />
      )}
      {showReportModal && <CertificationReportModal open={showReportModal} onClose={() => setShowReportModal(false)} />}
    </div>
  )
}