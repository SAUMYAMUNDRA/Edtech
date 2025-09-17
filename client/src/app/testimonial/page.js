"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Header from "../components/header/page"
// Reveal wrapper
function Reveal({ children, delay = 0, y = 24, className = "" }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const node = ref.current
    const prefersReduced =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
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
      { threshold: 0.18 },
    )
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
        willChange: "opacity,transform",
      }}
    >
      {children}
    </div>
  )
}

// Minimal Tilt - Very subtle effect for hero video
function MinimalTilt({ children, className = "" }) {
  const ref = useRef(null)
  const [transform, setTransform] = useState("")
  const prefersReduced =
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  
  const handleMove = (e) => {
    if (prefersReduced) return
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const px = (e.clientX - (rect.left + rect.width / 2)) / 50
    const py = (e.clientY - (rect.top + rect.height / 2)) / 50
    // Very subtle tilt - only 1 degree max
    const rx = py * 1
    const ry = -px * 1
    setTransform(`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.005)`)
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
        transition: transform ? "transform 200ms linear" : "transform 800ms cubic-bezier(.16,.84,.24,1)",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  )
}

// Simple Hover - Just scale effect for video testimonials
function SimpleHover({ children, className = "" }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      style={{
        transform: isHovered ? "scale(1.02)" : "scale(1)",
        transition: "transform 300ms cubic-bezier(.16,.84,.24,1)",
      }}
    >
      {children}
    </div>
  )
}

// FIXED: Gentle Tilt for testimonial cards - Much more controlled
function GentleTilt({ children, className = "" }) {
  const ref = useRef(null)
  const [transform, setTransform] = useState("")
  const prefersReduced =
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    
  const handleMove = (e) => {
    if (prefersReduced) return
    const node = ref.current
    if (!node) return
    
    const rect = node.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    // Calculate mouse position relative to center (-1 to 1)
    const mouseX = (e.clientX - centerX) / (rect.width / 2)
    const mouseY = (e.clientY - centerY) / (rect.height / 2)
    
    // Limit the tilt to a maximum of 3 degrees
    const maxTilt = 3
    const rotateY = mouseX * maxTilt
    const rotateX = -mouseY * maxTilt
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`)
  }
  
  const handleLeave = () => {
    setTransform("")
  }
  
  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        transform,
        transition: transform 
          ? "transform 150ms cubic-bezier(.16,.84,.24,1)" 
          : "transform 400ms cubic-bezier(.16,.84,.24,1)",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  )
}

// Shiny button
function ShinyButton({ children, className = "", onClick }) {
  const btnRef = useRef(null)
  const prefersReduced =
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  const handleMove = (e) => {
    if (prefersReduced) return
    const node = btnRef.current
    if (!node) return
    const r = node.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) / 20
    const dy = (e.clientY - (r.top + r.height / 2)) / 20
    node.style.transform = `translate(${dx}px,${dy}px)`
  }
  const handleLeave = () => {
    if (btnRef.current) btnRef.current.style.transform = "translate(0,0)"
  }
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

export default function TestimonialsPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [scrollY, setScrollY] = useState(0)

  // Create ref for testimonials section
  const testimonialsRef = useRef(null)

  // Function to scroll to testimonials
  const scrollToTestimonials = () => {
    testimonialsRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "start" 
    })
  }

  useEffect(() => {
    let rafId = null
    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY || 0)
        rafId = null
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  const getInitials = (name) => {
    const parts = name.trim().split(" ")
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || ""
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  const avatarColor = (name) => {
    const palette = [
      "bg-indigo-600",
      "bg-rose-500",
      "bg-emerald-600",
      "bg-yellow-500",
      "bg-purple-600",
      "bg-pink-500",
      "bg-teal-600",
      "bg-red-500",
    ]
    return palette[name.length % palette.length]
  }

  const allTestimonials = [
    {
      id: 1,
      name: "Neha Singh",
      category: ["mentorship", "career"],
      tag: "Mentorship",
      quote: "The one‑on‑one cadence helped me refine goals and eliminate distractions blocking momentum.",
      rating: 5,
    },
    {
      id: 2,
      name: "Iqbal Hussain",
      category: ["workshops", "soft-skills"],
      tag: "Workshops",
      quote: "Live workshops demystified technical roles and taught concise impact articulation.",
      rating: 5,
    },
    {
      id: 3,
      name: "Simran Kaur",
      category: ["career", "mentorship"],
      tag: "Career",
      quote: "Structured mock interview loops turned anxiety into a repeatable preparation system.",
      rating: 5,
    },
    {
      id: 4,
      name: "Arjun Patel",
      category: ["soft-skills", "mentorship"],
      tag: "Soft Skills",
      quote: "Learning to articulate trade‑offs improved collaboration in projects and hackathons.",
      rating: 5,
    },
    {
      id: 5,
      name: "Divya Rao",
      category: ["workshops", "career"],
      tag: "Workshops",
      quote: "Portfolio narrative shifts finally unlocked recruiter responses.",
      rating: 5,
    },
    {
      id: 6,
      name: "Krish Malhotra",
      category: ["career", "mentorship"],
      tag: "Career",
      quote: "Goal tracking and micro‑wins stacked into an offer result.",
      rating: 5,
    },
  ]

  const filteredTestimonials =
    activeFilter === "all" ? allTestimonials : allTestimonials.filter((t) => t.category.includes(activeFilter))

  const y1 = Math.min(40, scrollY * 0.08)
  const y2 = Math.min(60, scrollY * 0.12)

  // Calculate scroll-based animations for section transitions
  const heroOpacity = Math.max(0, 1 - scrollY / 400)
  const heroScale = Math.max(0.95, 1 - scrollY / 2000)
  const nextSectionTransform = Math.max(0, 100 - (scrollY / 6))

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-[#fcf6f1] text-gray-900">
      <style jsx global>{`
        @keyframes shine {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(250%); }
        }
        .animate-shine { animation: shine 1.2s ease-out forwards; }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <div className="fixed top-6 left-6 z-50">
       
      </div>

      {/* HERO SECTION with scroll animations */}
      <section 
        className="bg-[#fcf6f1] relative overflow-hidden min-h-screen flex items-center"
        style={{
          opacity: heroOpacity,
          transform: `scale(${heroScale})`,
        }}
      >
        {/* Subtle background elements */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 -left-10 w-60 h-60 rounded-full blur-3xl opacity-20"
          style={{
            background: "radial-gradient(ellipse at center, rgba(250,204,21,0.15), rgba(236,72,153,0.1))",
            transform: `translateY(${y1}px)`,
            transition: "transform 60ms linear",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -right-10 w-80 h-80 rounded-full blur-3xl opacity-15"
          style={{
            background: "radial-gradient(ellipse at center, rgba(99,102,241,0.1), rgba(20,184,166,0.1))",
            transform: `translateY(${y2}px)`,
            transition: "transform 60ms linear",
          }}
        />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16 relative">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left Side - Content with single button */}
            <Reveal>
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                    <span className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                      Student Stories
                    </span>
                  </div>

                  <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                    <span className="text-gray-900">Real Stories,</span>
                    <br />
                    <span className="text-yellow-600">Real Outcomes</span>
                  </h1>

                  <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                    See how students transformed their careers through mentorship and
                    structured guidance.
                  </p>
                </div>

                {/* Improved button to scroll to testimonials */}
                <div className="flex justify-start">
                  <ShinyButton
                    onClick={scrollToTestimonials}
                    className="group relative px-6 py-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 
                               text-white rounded-xl font-semibold 
                               transition-transform duration-300 inline-flex items-center gap-2 
                               hover:scale-105"
                  >
                    <span className="flex items-center gap-2">
                      View All Testimonials
                      <svg
                        className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-y-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </span>
                  </ShinyButton>
                </div>
              </div>
            </Reveal>

            {/* Right Side - Featured Video with Minimal Effect */}
            <Reveal delay={0.3}>
              <div className="relative">
                <MinimalTilt className="relative z-10">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-200">
                    <div className="aspect-video bg-gray-900 relative group cursor-pointer">
                      <div className="absolute inset-0 bg-gray-900/40 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                            <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                          <p className="text-white text-lg font-semibold">Featured Story</p>
                          <p className="text-white/80 text-sm">Sarah's Journey</p>
                        </div>
                      </div>

                      <div className="absolute top-4 right-4">
                        <div className="bg-yellow-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold">
                          FEATURED
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                          SK
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">Sarah Kumar</h3>
                          <p className="text-sm text-gray-500">Software Engineering</p>
                        </div>
                        <div className="ml-auto flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <blockquote className="text-gray-600 leading-relaxed">
                        "The mentorship helped me identify my strengths and build a clear roadmap to my first tech role."
                      </blockquote>
                    </div>
                  </div>
                </MinimalTilt>

                {/* Minimal floating elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400/10 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-purple-400/10 rounded-full animate-bounce"></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Video Testimonials Showcase Section with scroll animation */}
      <section 
        className="py-20 bg-gray-50 relative z-10 bg-[#fcf6f1]"
        style={{
          transform: `translateY(${nextSectionTransform}px)`,
          boxShadow: '0 -20px 40px rgba(0,0,0,0.1)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Hear It <span className="text-yellow-500">Directly</span> From Students
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Watch authentic video stories from students who transformed their career trajectory through our
                mentorship programs.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Video Testimonial 1 - Simple Hover */}
            <Reveal delay={0.1}>
              <SimpleHover className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="aspect-video bg-gray-900 relative group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                      <p className="text-white text-sm font-medium">From Confused to Confident</p>
                      <p className="text-white/80 text-xs">Sarah's Journey - 3:24</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      SK
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Sarah Kumar</h3>
                      <p className="text-xs text-gray-500">Software Engineering Track</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    "The mentorship helped me identify my strengths and build a clear roadmap to my first tech role."
                  </p>
                </div>
              </SimpleHover>
            </Reveal>

            {/* Video Testimonial 2 - Simple Hover */}
            <Reveal delay={0.2}>
              <SimpleHover className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="aspect-video bg-gray-900 relative group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                      <p className="text-white text-sm font-medium">Breaking Into Product</p>
                      <p className="text-white/80 text-xs">Alex's Story - 4:12</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      AC
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Alex Chen</h3>
                      <p className="text-xs text-gray-500">Product Management Track</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    "The workshops taught me how to think like a PM and communicate with engineering teams effectively."
                  </p>
                </div>
              </SimpleHover>
            </Reveal>

            {/* Video Testimonial 3 - Simple Hover */}
            <Reveal delay={0.3}>
              <SimpleHover className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="aspect-video bg-gray-900 relative group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                      <p className="text-white text-sm font-medium">Design Career Pivot</p>
                      <p className="text-white/80 text-xs">Maya's Transformation - 2:58</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      MR
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Maya Rodriguez</h3>
                      <p className="text-xs text-gray-500">UX Design Track</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    "I went from zero design experience to landing my dream UX role in just 6 months."
                  </p>
                </div>
              </SimpleHover>
            </Reveal>
          </div>

          <Reveal delay={0.4}>
            <div className="text-center mt-12">
              <ShinyButton className="px-8 py-4 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-200 shadow-lg hover:shadow-xl">
                Watch More Success Stories
              </ShinyButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS - Added ref for scrolling */}
      <section ref={testimonialsRef} className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">All Testimonials</h2>
              <div className="mx-auto h-1.5 w-24 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full" />
              <p className="text-xl text-gray-700 max-w-3xl mx-auto mt-6">
                Filter by focus area to explore different kinds of transformation.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {["all", "mentorship", "workshops", "career", "soft-skills"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wide transition-all duration-300 ${
                    activeFilter === filter
                      ? "bg-yellow-500 text-white shadow-lg"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-yellow-500 hover:text-white hover:border-yellow-500"
                  }`}
                >
                  {filter.replace("-", " ")}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.map((t, i) => (
              <Reveal key={t.id} delay={(i % 6) * 0.07}>
                <GentleTilt className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold ${avatarColor(t.name)}`}
                    >
                      {getInitials(t.name)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t.name}</h3>
                      <span className="text-xs uppercase tracking-wider font-semibold text-gray-500">{t.tag}</span>
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
                    <span
                      aria-hidden
                      className="text-4xl text-yellow-500/30 absolute -top-2 -left-1 font-serif select-none"
                    >
                      "
                    </span>
                    {t.quote}
                    <span
                      aria-hidden
                      className="text-4xl text-yellow-500/20 absolute -bottom-4 -right-1 font-serif select-none"
                    >
                      "
                    </span>
                  </blockquote>
                </GentleTilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MEDIA STORY - No Tilt Effect */}
      <section className="py-20 bg-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  A Journey From Uncertain to Unstoppable
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Watch how one learner leveraged personalized mentorship, peer pods, and targeted workshops to
                  accelerate from exploratory phase to a clear technical track with tangible outcomes.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  Every transformation begins with a candid conversation. The structure we provide simply keeps the
                  momentum consistent.
                </p>
                <div className="flex gap-4">
                  <ShinyButton className="px-10 py-4 bg-yellow-500 text-white rounded-lg font-bold text-lg hover:bg-yellow-400 transition-all duration-200 shadow-xl hover:shadow-2xl">
                    Start Your Journey
                  </ShinyButton>
                  <ShinyButton className="px-10 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-bold text-lg hover:bg-gray-50 transition-all duration-200">
                    Learn More
                  </ShinyButton>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl bg-gray-900 hover:shadow-2xl transition-shadow duration-300">
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
      <section className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="bg-gradient-to-br from-gray-50/80 to-gray-100/40 rounded-3xl p-12 lg:p-16 text-center shadow-xl">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Ready to Elevate Your Learning?</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
                Join a community where guidance is actionable, feedback is constructive, and growth is measurable. Your
                next meaningful step starts here.
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
    </div>
  </>
  )
  
}