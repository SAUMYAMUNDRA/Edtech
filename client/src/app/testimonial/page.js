"use client"
import { useState, useEffect, useRef } from 'react'
import Header from "../components/header/page"
import Footer from "../components/footer/page"

/* =======================
   Inline Scroll Utilities
   ======================= */

// Top progress bar that fills as you scroll
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

// Reveal-on-scroll wrapper (fade + slight upward motion)
function Reveal({ children, delay = 0, y = 24, className = "" }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!ref.current) return
    const node = ref.current

    const prefersReduced = typeof window !== "undefined" && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
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
        transition: "opacity 700ms ease-out, transform 700ms ease-out",
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

// 3D Tilt wrapper for hover interaction
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
    setTransform(`perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`)
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
        transition: transform ? "transform 60ms linear" : "transform 300ms ease",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  )
}

// Shiny CTA button with subtle “sheen” and magnetic feel
function ShinyButton({ children, className = "", onClick }) {
  const btnRef = useRef(null)
  const prefersReduced = typeof window !== "undefined" && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  const handleMove = (e) => {
    if (prefersReduced) return
    const node = btnRef.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const midX = rect.left + rect.width / 2
    const midY = rect.top + rect.height / 2
    const dx = (e.clientX - midX) / 12
    const dy = (e.clientY - midY) / 12
    node.style.transform = `translate(${dx}px, ${dy}px)`
  }

  const handleLeave = () => {
    const node = btnRef.current
    if (!node) return
    node.style.transform = `translate(0px, 0px)`
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
        <span className="absolute -inset-y-6 -left-1/2 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shine" />
      </span>
    </button>
  )
}

// Floating Scroll-to-Top button
function ScrollToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
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
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeFilter, setActiveFilter] = useState('all')
  const [countersAnimated, setCountersAnimated] = useState(false)
  const carouselRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)

  // RAF scrollY for parallax
  useEffect(() => {
    let rafId = null
    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY || 0)
        rafId = null
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Function to get initials from full name
  const getInitials = (name) => {
    const names = name.split(' ')
    if (names.length >= 2) {
      return names[0][0] + names[names.length - 1][0]
    }
    return names[0][0] + (names[0][1] || '')
  }

  // Function to generate consistent colors based on name
  const getAvatarColor = (name) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500', 
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-red-500',
      'bg-yellow-500',
      'bg-teal-500'
    ]
    const index = name.length % colors.length
    return colors[index]
  }

  // Testimonials data
  const featuredTestimonials = [
    {
      id: 1,
      name: "Aarav Sharma",
      role: "Data Science Intern",
      image: "/testimonials/student1.jpg",
      quote: "The structured mentorship transformed how I learn—weekly feedback loops and real project reviews gave me confidence for internship interviews.",
      rating: 5
    },
    {
      id: 2,
      name: "Priya Kapoor",
      role: "Product Design Fellow",
      image: "/testimonials/student2.jpg",
      quote: "I went from vague ideas to a polished case study. The critique culture is empowering—not intimidating.",
      rating: 5
    },
    {
      id: 3,
      name: "Rahul Mehta",
      role: "Full‑Stack Learner",
      image: "/testimonials/student3.jpg",
      quote: "The roadmap personalization saved months—now I build intentionally instead of following random tutorials.",
      rating: 5
    }
  ]

  const allTestimonials = [
    {
      id: 1,
      name: "Neha Singh",
      category: ["mentorship", "career"],
      tag: "Mentorship",
      avatar: "/testimonials/avatar1.jpg",
      quote: "The one‑on‑one cadence helped me refine my goals and eliminate distractions that slowed my progress.",
      rating: 5
    },
    {
      id: 2,
      name: "Iqbal Hussain",
      category: ["workshops", "soft-skills"],
      tag: "Workshops",
      avatar: "/testimonials/avatar2.jpg",
      quote: "Live workshops demystified technical roles and taught me how to communicate impact succinctly.",
      rating: 5
    },
    {
      id: 3,
      name: "Simran Kaur",
      category: ["career", "mentorship"],
      tag: "Career",
      avatar: "/testimonials/avatar3.jpg",
      quote: "Mock interviews plus iterative feedback turned anxiety into a systematic preparation plan.",
      rating: 5
    },
    {
      id: 4,
      name: "Arjun Patel",
      category: ["soft-skills", "mentorship"],
      tag: "Soft Skills",
      avatar: "/testimonials/avatar4.jpg",
      quote: "Learning to articulate trade‑offs improved my collaboration in group projects and hackathons.",
      rating: 5
    },
    {
      id: 5,
      name: "Divya Rao",
      category: ["workshops", "career"],
      tag: "Workshops",
      avatar: "/testimonials/avatar5.jpg",
      quote: "The portfolio refinement session helped me show narrative, not just code—recruiters finally responded.",
      rating: 5
    },
    {
      id: 6,
      name: "Krish Malhotra",
      category: ["career", "mentorship"],
      tag: "Career",
      avatar: "/testimonials/avatar6.jpg",
      quote: "Structured goal tracking kept me accountable—weekly micro‑wins added up to a solid offer letter.",
      rating: 5
    }
  ]

  const stats = [
    { value: 94, suffix: "%", label: "Felt More Career Ready" },
    { value: 87, suffix: "%", label: "Improved Confidence" },
    { value: 1200, suffix: "+", label: "Mentor Sessions" },
    { value: 350, suffix: "+", label: "Portfolio Projects" }
  ]

  // Carousel functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredTestimonials.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [featuredTestimonials.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredTestimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredTestimonials.length) % featuredTestimonials.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  // Filter functionality
  const filteredTestimonials = activeFilter === 'all' 
    ? allTestimonials 
    : allTestimonials.filter(testimonial => 
        testimonial.category.includes(activeFilter)
      )

  // Counter animation
  const Counter = ({ value, suffix }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (countersAnimated) {
        const duration = 1600
        const steps = 60
        const increment = value / steps
        let current = 0
        
        const timer = setInterval(() => {
          current += increment
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

  // Intersection Observer for counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersAnimated) {
            setCountersAnimated(true)
          }
        })
      },
      { threshold: 0.4 }
    )

    const statsSection = document.querySelector('.stats-section')
    if (statsSection) {
      observer.observe(statsSection)
    }

    return () => {
      if (statsSection) {
        observer.unobserve(statsSection)
      }
    }
  }, [countersAnimated])

  // Parallax offsets
  const y1 = Math.min(80, scrollY * 0.12)
  const y2 = Math.min(120, scrollY * 0.18)

  return (
    <div className="min-h-screen bg-[#fcf6f1] text-gray-900">
      {/* Global styles for shine animation */}
      <style jsx global>{`
        @keyframes shine {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(250%); }
        }
        .animate-shine {
          animation: shine 1.2s ease-out forwards;
        }
      `}</style>

      {/* Scroll progress */}
      <ScrollProgressBar />
      <ScrollToTop />

      <Header />

      {/* HERO SECTION */}
      <section className="bg-[#fcf6f1] relative overflow-hidden">
        {/* Parallax gradient blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 -left-10 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(ellipse at center, rgba(250,204,21,0.35), rgba(236,72,153,0.25))",
            transform: `translateY(${y1}px)`,
            transition: "transform 60ms linear",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -right-10 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(ellipse at center, rgba(99,102,241,0.25), rgba(20,184,166,0.25))",
            transform: `translateY(${y2}px)`,
            transition: "transform 60ms linear",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16 relative">
          <Reveal>
            <div className="text-center bg-gradient-to-br from-white/60 via-transparent to-white/35 rounded-3xl py-16 px-8 backdrop-blur-[1px]">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Real <span className="text-yellow-500 relative inline-block group transform-gpu transition-transform duration-300 hover:scale-[1.02]">
                  Stories
                  <span className="absolute inset-x-0 bottom-1 h-3"></span>
                </span>, Real Outcomes
              </h1>
              <p className="text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                Discover how mentorship, workshops, and open dialogue help students gain clarity, confidence, and career momentum.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURED TESTIMONIALS CAROUSEL */}
      <section className="py-16 bg-[#fcf6f1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-12">
                Featured Voices
              </h2>
              
              <div className="relative overflow-hidden" ref={carouselRef}>
                <div 
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {featuredTestimonials.map((testimonial) => (
                    <div key={testimonial.id} className="w-full flex-shrink-0">
                      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <Reveal className="relative w-64 h-64 mx-auto" delay={0.05}>
                          <div className={`w-full h-full rounded-full shadow-xl flex items-center justify-center text-white text-6xl font-bold ${getAvatarColor(testimonial.name)} hover:scale-105 transition-transform duration-700`}>
                            {getInitials(testimonial.name)}
                          </div>
                        </Reveal>
                        
                        <Reveal delay={0.12}>
                          <div className="text-center lg:text-left">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                              {testimonial.name}
                            </h3>
                            <p className="text-sm uppercase tracking-wider font-semibold text-gray-600 mb-4">
                              {testimonial.role}
                            </p>
                            
                            {/* UPDATED: Add opening and closing quotes with padding */}
                            <blockquote className="text-lg text-gray-700 leading-relaxed relative px-6">
                              <span aria-hidden className="text-6xl text-yellow-500/40 absolute -top-4 -left-2 font-serif select-none">“</span>
                              {testimonial.quote}
                              <span aria-hidden className="text-6xl text-yellow-500/30 absolute -bottom-6 -right-2 font-serif select-none">”</span>
                            </blockquote>
                          </div>
                        </Reveal>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Controls */}
              <div className="flex justify-center items-center gap-6 mt-8">
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-lg hover:bg-yellow-500 hover:text-white hover:border-yellow-500 transition-all duration-300 flex items-center justify-center"
                >
                  ←
                </button>
                
                <div className="flex gap-2">
                  {featuredTestimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide ? 'bg-yellow-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextSlide}
                  className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-lg hover:bg-yellow-500 hover:text-white hover:border-yellow-500 transition-all duration-300 flex items-center justify-center"
                >
                  →
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATISTICS SECTION */}
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

      {/* TESTIMONIALS GRID SECTION */}
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

          {/* Filter Buttons */}
          <Reveal>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {['all', 'mentorship', 'workshops', 'career', 'soft-skills'].map((filter) => (
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

          {/* Testimonials Grid - with 3D Tilt */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.map((testimonial, i) => (
              <Reveal key={testimonial.id} delay={(i % 6) * 0.06}>
                <Tilt className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold ${getAvatarColor(testimonial.name)}`}>
                      {getInitials(testimonial.name)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                      <span className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                        {testimonial.tag}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <div key={i} className="w-4 h-4 text-yellow-500">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    ))}
                  </div>

                  {/* UPDATED: Add opening and closing quotes with padding */}
                  <blockquote className="text-gray-700 text-sm leading-relaxed relative px-6">
                    <span aria-hidden className="text-4xl text-yellow-500/30 absolute -top-2 -left-1 font-serif select-none">“</span>
                    {testimonial.quote}
                    <span aria-hidden className="text-4xl text-yellow-500/20 absolute -bottom-4 -right-1 font-serif select-none">”</span>
                  </blockquote>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MEDIA STORY SECTION */}
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

      {/* CALL TO ACTION */}
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