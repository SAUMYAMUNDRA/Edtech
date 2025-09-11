"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/header/page";
import Footer from "../components/footer/page";
// Custom hook for intersection observer
const useInView = (threshold = 0.1) => {
  const [ref, setRef] = useState(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return [setRef, inView];
};

// Animation wrapper component
const AnimateOnScroll = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView(0.1);
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ 
        transitionDelay: `${delay}ms`,
        transform: inView ? 'translateY(0)' : 'translateY(32px)'
      }}
    >
      {children}
    </div>
  );
};

// Staggered animation wrapper
const StaggeredAnimation = ({ children, staggerDelay = 150 }) => {
  const [ref, inView] = useInView(0.1);
  
  return (
    <div ref={ref}>
      {React.Children.map(children, (child, index) => (
        <div
          className={`transition-all duration-700 ease-out ${
            inView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{ 
            transitionDelay: `${index * staggerDelay}ms`,
            transform: inView ? 'translateY(0)' : 'translateY(32px)'
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

// Header component (placeholder)

export default function MentorshipPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#fcf6f1] text-gray-900">
      <Header />

      <main className="bg-[#fcf6f1]">
        {/* HERO */}
        <section className="max-w-7xl mx-auto px-8 pt-16 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            <AnimateOnScroll>
              <div>
                <p className="text-sm text-gray-600 mb-3">Industry Mentors • 1:1 Guidance • Outcome-Focused</p>
                <h1 className="text-5xl font-bold leading-tight mb-5">
                  Mentorship that accelerates<br /> learning and careers
                </h1>
                <p className="text-lg text-gray-700 mb-8 max-w-xl">
                  Work with handpicked industry experts through structured tracks in DSA,
                  Competitive Programming and Full‑Stack Development. Build real projects,
                  get interview‑ready, and land opportunities faster.
                </p>

                <div className="flex flex-wrap gap-4">
                  <a href="#apply" className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium shadow-md hover:opacity-95 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    Apply for Mentorship
                  </a>
                  <a href="#become-mentor" className="border border-gray-300 px-6 py-3 rounded-md font-medium text-gray-700 hover:bg-gray-200 transform transition-all duration-300 hover:scale-105 hover:shadow-md">
                    Become a Mentor
                  </a>
                </div>

                {/* Trust badges */}
                <StaggeredAnimation staggerDelay={100}>
                  <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                    <div className="bg-white rounded-lg shadow p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                      <div className="text-2xl font-bold">150+</div>
                      <div className="text-gray-600 text-sm">Industry Mentors</div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                      <div className="text-2xl font-bold">7.5 yrs</div>
                      <div className="text-gray-600 text-sm">Avg Mentor Experience</div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                      <div className="text-2xl font-bold">40+</div>
                      <div className="text-gray-600 text-sm">Partner Universities</div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                      <div className="text-2xl font-bold">3k+</div>
                      <div className="text-gray-600 text-sm">Student Placements</div>
                    </div>
                  </div>
                </StaggeredAnimation>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={300}>
              <div className="md:pl-6">
                <div className="relative bg-white rounded-2xl shadow-xl p-6 border border-gray-200 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-yellow-400/30 flex items-center justify-center transform transition-all duration-300 hover:bg-yellow-400/50">
                      <span className="text-gray-900 font-bold">B</span>
                    </div>
                    <div>
                      <div className="font-semibold">BridgeLabs Mentorship</div>
                      <div className="text-sm text-gray-600">Personalized Learning Plan</div>
                    </div>
                  </div>

                  <ul className="space-y-3 text-gray-700">
                    {[
                      "Weekly live mentor sessions",
                      "Curated problem sets and reviews",
                      "Project-based learning with feedback",
                      "Interview prep and mock interviews",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 transform transition-all duration-300 hover:translate-x-2">
                        <span className="mt-1 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 p-4 bg-[#fcf6f1] border border-yellow-400/40 rounded-lg transform transition-all duration-300 hover:border-yellow-400/60 hover:bg-yellow-50/50">
                    <p className="text-sm text-gray-700">
                      "This program helped me convert multiple interviews. The feedback loop was
                      incredible." — <span className="font-medium">Sneha V.</span>
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="max-w-7xl mx-auto px-8 py-14">
          <AnimateOnScroll>
            <div className="mb-10">
              <h2 className="text-3xl font-bold">How it works</h2>
              <p className="text-gray-600 mt-2">A simple, effective path from learning to hiring.</p>
            </div>
          </AnimateOnScroll>

          <StaggeredAnimation staggerDelay={150}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  title: "Apply",
                  desc: "Tell us your goals and current level.",
                },
                {
                  title: "Match",
                  desc: "We match you with a mentor in your domain.",
                },
                {
                  title: "Build",
                  desc: "Follow a structured plan with weekly 1:1s.",
                },
                {
                  title: "Get Hired",
                  desc: "Portfolio, referrals, and interview prep.",
                },
              ].map((step, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow p-6 border border-gray-100 transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-yellow-400/30 group cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-md bg-yellow-400/30 flex items-center justify-center font-semibold text-gray-900 transform transition-all duration-300 group-hover:bg-yellow-400 group-hover:scale-110">
                      {idx + 1}
                    </div>
                    <div className="text-sm text-gray-500 transform transition-all duration-300 group-hover:text-yellow-600">Step {idx + 1}</div>
                  </div>
                  <div className="font-semibold text-lg mb-1 transform transition-all duration-300 group-hover:text-gray-900">{step.title}</div>
                  <div className="text-gray-600 transform transition-all duration-300 group-hover:text-gray-700">{step.desc}</div>
                </div>
              ))}
            </div>
          </StaggeredAnimation>
        </section>

        {/* BENEFITS */}
        <section className="max-w-7xl mx-auto px-8 py-6">
          <AnimateOnScroll>
            <div className="mb-8">
              <h2 className="text-3xl font-bold">Mentor Benefits</h2>
              <p className="text-gray-600 mt-2">What you get with BridgeLabs mentorship.</p>
            </div>
          </AnimateOnScroll>

          <StaggeredAnimation staggerDelay={100}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "1:1 Mentorship",
                  desc: "Weekly personalized sessions tailored to your goals.",
                  points: ["Custom learning plan", "Progress tracking", "Accountability check-ins"],
                },
                {
                  title: "Mock Interviews",
                  desc: "Simulated interviews with actionable feedback.",
                  points: ["DSA & system design", "HR & behavioral rounds", "Scorecards and tips"],
                },
                {
                  title: "Code Reviews",
                  desc: "Deep reviews on assignments and projects.",
                  points: ["Clean code practices", "Optimization guidance", "Best-practice patterns"],
                },
                {
                  title: "Career Roadmap",
                  desc: "Plan your path from learner to hire-ready.",
                  points: ["Skill gap analysis", "Project portfolio plan", "Referral readiness"],
                },
                {
                  title: "Resume & LinkedIn",
                  desc: "Position yourself for better callbacks.",
                  points: ["ATS-friendly resume", "LinkedIn profile polish", "Project storytelling"],
                },
                {
                  title: "Live Doubt Solving",
                  desc: "Get unstuck faster with mentor office hours.",
                  points: ["Live Q&A", "Debugging support", "Contest upsolving guidance"],
                },
              ].map((card, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-all duration-300 border border-gray-100 transform hover:scale-105 hover:border-yellow-400/30 group cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-xl transform transition-all duration-300 group-hover:text-gray-900">{card.title}</h3>
                    <span className="px-2 py-1 text-xs rounded bg-yellow-400 text-black font-medium transform transition-all duration-300 group-hover:bg-yellow-500 group-hover:scale-105">Included</span>
                  </div>
                  <p className="text-gray-600 mb-4 transform transition-all duration-300 group-hover:text-gray-700">{card.desc}</p>
                  <ul className="space-y-2 text-gray-700">
                    {card.points.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-2 transform transition-all duration-300 hover:translate-x-1">
                        <span className="mt-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </StaggeredAnimation>
        </section>

        {/* MENTOR SPOTLIGHT */}
        <section className="max-w-7xl mx-auto px-8 py-14">
          <AnimateOnScroll>
            <div className="mb-8">
              <h2 className="text-3xl font-bold">Mentor Spotlight</h2>
              <p className="text-gray-600 mt-2">Top engineers guiding you at every step.</p>
            </div>
          </AnimateOnScroll>

          <StaggeredAnimation staggerDelay={200}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Amit Kumar", role: "SWE, Google", tags: ["DSA", "System Design"] },
                { name: "Sneha Verma", role: "Backend, Amazon", tags: ["Java", "Databases"] },
                { name: "Ravi Singh", role: "Full‑Stack, Microsoft", tags: ["React", "Node"] },
              ].map((m, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow border border-gray-100 transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-yellow-400/30 group cursor-pointer">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold transform transition-all duration-300 group-hover:bg-yellow-500 group-hover:text-black group-hover:scale-110">
                      {m.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-semibold transform transition-all duration-300 group-hover:text-gray-900">{m.name}</div>
                      <div className="text-sm text-gray-600 transform transition-all duration-300 group-hover:text-gray-700">{m.role}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {m.tags.map((t, idx) => (
                      <span key={idx} className="px-2 py-1 text-xs bg-yellow-400/30 text-gray-900 rounded transform transition-all duration-300 hover:bg-yellow-400 hover:scale-105 cursor-pointer">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </StaggeredAnimation>
        </section>

        {/* UNIVERSITY COLLAB */}
        <section className="max-w-7xl mx-auto px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <AnimateOnScroll>
              <div>
                <h2 className="text-3xl font-bold mb-3">For Universities & Departments</h2>
                <p className="text-gray-700 mb-6">
                  Bring industry‑grade curriculum, capstone projects, and mentors to your classrooms.
                  We integrate with academic schedules while keeping hiring outcomes front‑and‑center.
                </p>
                <ul className="space-y-2 text-gray-700">
                  {[
                    "Curriculum mapping to credits",
                    "Capstone projects with live reviews",
                    "Faculty development & TA support",
                    "Placement prep bootcamps",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 transform transition-all duration-300 hover:translate-x-2">
                      <span className="mt-1 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={300}>
              <div className="bg-white rounded-xl shadow p-6 border border-gray-100 transform transition-all duration-500 hover:scale-105 hover:shadow-lg">
                <div className="border-l-4 border-yellow-400 pl-4 transform transition-all duration-300 hover:border-l-8">
                  <h3 className="font-semibold text-xl mb-2">Program Outcomes</h3>
                  <p className="text-gray-700">
                    Measurable improvement in problem‑solving, project quality, and placement readiness, tracked via weekly reports and assessments.
                  </p>
                </div>
                <StaggeredAnimation staggerDelay={100}>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    {[
                      { k: "+45%", v: "DSA proficiency" },
                      { k: "3x", v: "Contest ratings" },
                      { k: "2 capstones", v: "per student" },
                      { k: "8 weeks", v: "to interview‑ready" },
                    ].map((s, i) => (
                      <div key={i} className="bg-[#fcf6f1] rounded-lg p-4 text-center border border-yellow-400/40 transform transition-all duration-300 hover:scale-105 hover:border-yellow-400/60 hover:bg-yellow-50/50 cursor-pointer">
                        <div className="text-2xl font-bold">{s.k}</div>
                        <div className="text-sm text-gray-600">{s.v}</div>
                      </div>
                    ))}
                  </div>
                </StaggeredAnimation>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* APPLY / BECOME MENTOR */}
        <section id="apply" className="max-w-7xl mx-auto px-8 py-14">
          <AnimateOnScroll>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 transform transition-all duration-500 hover:shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold mb-2">Start your mentorship journey</h3>
                  <p className="text-gray-700">
                    Tell us about your background and goals. We'll recommend a track and match you with the right mentor.
                  </p>
                </div>
                <div className="flex gap-4 md:justify-end">
                  <a href="#" className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium shadow-md hover:opacity-95 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    Apply Now
                  </a>
                  <a id="become-mentor" href="#" className="bg-yellow-400 text-black px-6 py-3 rounded-md font-medium shadow-md hover:bg-yellow-300 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    Become a Mentor
                  </a>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </section>

        {/* FAQ */}
        <section className="max-w-7xl mx-auto px-8 pb-20">
          <AnimateOnScroll>
            <div className="mb-8">
              <h2 className="text-3xl font-bold">Frequently asked questions</h2>
              <p className="text-gray-600 mt-2">Everything you need to know about the program.</p>
            </div>
          </AnimateOnScroll>

          <StaggeredAnimation staggerDelay={150}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  q: "How are mentors selected?",
                  a: "Every mentor is vetted for domain depth, teaching ability, and outcomes from previous cohorts.",
                },
                {
                  q: "What is the time commitment?",
                  a: "Typically 4–6 hours per week including live sessions, assignments, and reviews.",
                },
                {
                  q: "Is there a certificate?",
                  a: "Yes. You receive a verified certificate along with a portfolio of projects and reviews.",
                },
                {
                  q: "Do you help with placements?",
                  a: "Yes. We run interview prep, mock interviews, referrals, and hiring challenges with partners.",
                },
              ].map((f, i) => (
                <div key={i} className="bg-white rounded-xl shadow p-5 border border-gray-100 transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-yellow-400/30 group cursor-pointer">
                  <div className="font-semibold mb-1 transform transition-all duration-300 group-hover:text-gray-900">{f.q}</div>
                  <div className="text-gray-700 transform transition-all duration-300 group-hover:text-gray-800">{f.a}</div>
                </div>
              ))}
            </div>
          </StaggeredAnimation>
        </section>
      </main>

      <Footer />
    </div>
  );
}