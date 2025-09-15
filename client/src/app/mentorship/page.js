"use client";
import React, { useEffect, useRef, useState } from "react";
import Header from "../components/header/page";
import Footer from "../components/footer/page";
import ScrollFeatures from "../components/scroll_feature/ScrollFeatures";
import LinkedInButton from "../components/buttons/LinkedInButton";

export default function MentorshipPage() {
  const mentors = [
    {
      name: "Amit Kumar",
      role: "SWE, Google",
      tags: ["DSA", "System Design"],
      photo: "",
      linkedin: "",
      description: "Amit specializes in data structures, algorithms, and large-scale system architecture. His mentoring focuses on problem solving & interview mastery.",
      expertise: [
        "Advanced DSA & System Design",
        "Scalable architectures",
        "Competitive coding guidance"
      ],
      whatYouGet: [
        "1:1 Interview prep",
        "Project-based feedback",
        "Doubt solving and live sessions"
      ]
    },
    {
      name: "Sneha Verma",
      role: "Backend, Amazon",
      tags: ["Java", "Databases"],
      photo: "",
      linkedin: "",
      description: "Sneha's expertise lies in scalable backend services and database engineering. She helps mentees master backend technologies and effective coding.",
      expertise: [
        "Java and backend architecture",
        "Database design & optimization",
        "Microservices and REST APIs"
      ],
      whatYouGet: [
        "Career mentorship",
        "Weekly backend walkthroughs",
        "Resume & code reviews"
      ]
    },
    {
      name: "Ravi Singh",
      role: "Full‑Stack, Microsoft",
      tags: ["React", "Node"],
      photo: "",
      linkedin: "",
      description: "Ravi guides learners through building robust web applications, with hands-on focus on full-stack project delivery and interview prep.",
      expertise: [
        "Web app architecture",
        "Frontend (React) and backend (Node)",
        "Agile project development"
      ],
      whatYouGet: [
        "Portfolio-ready projects",
        "1:1 weekly sessions",
        "Feedback and problem-solving"
      ]
    },
    {
      name: "Priya Sharma",
      role: "Data Scientist, Meta",
      tags: ["Python", "ML"],
      photo: "",
      linkedin: "",
      description: "Priya mentors on applied machine learning and analytics, from fundamentals to real-world deployment and data-driven decision making.",
      expertise: [
        "Machine Learning & Analytics",
        "Python data stack",
        "Stats & business applications"
      ],
      whatYouGet: [
        "End-to-end ML project help",
        "Weekly analytics labs",
        "Interview and career guidance"
      ]
    },
  ];
  const [paused, setPaused] = useState(false);
  const sliderRef = useRef(null);
  const trackRef = useRef(null);
  const speedRef = useRef(1.0);
  const [activeMentor, setActiveMentor] = useState(null);
  const [modalReady, setModalReady] = useState(false);

  const closeModal = () => {
    setActiveMentor(null);
    setPaused(false);
  };

  const openMentor = (m) => {
    setActiveMentor(m);
    setPaused(true);
  };

  useEffect(() => {
    if (activeMentor) {
      const id = requestAnimationFrame(() => setModalReady(true));
      const onKey = (e) => {
        if (e.key === "Escape") closeModal();
      };
      window.addEventListener("keydown", onKey);
      return () => {
        cancelAnimationFrame(id);
        window.removeEventListener("keydown", onKey);
      };
    } else {
      setModalReady(false);
    }
  }, [activeMentor]);

  useEffect(() => {
    let rafId;
    const el = sliderRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    const step = () => {
      if (!paused) {
        el.scrollLeft += speedRef.current;
        const single = track.scrollWidth / 2; // width of one full set
        if (single > 0) {
          if (el.scrollLeft >= single) {
            el.scrollLeft -= single; // wrap forward
          } else if (el.scrollLeft < 0) {
            el.scrollLeft += single; // wrap backward (for drag)
          }
        }
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [paused]);

  // Drag-to-scroll (mouse)
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;
    isDragging.current = true;
    setPaused(true);
    startX.current = e.clientX;
    startScrollLeft.current = sliderRef.current.scrollLeft;
    sliderRef.current.classList.add('cursor-grabbing');
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !sliderRef.current) return;
    e.preventDefault();
    const dx = e.clientX - startX.current;
    sliderRef.current.scrollLeft = startScrollLeft.current - dx;
  };

  const handleMouseUp = () => {
    if (!sliderRef.current) return;
    isDragging.current = false;
    sliderRef.current.classList.remove('cursor-grabbing');
  };

  // Normalize on resize to keep infinite loop stable
  useEffect(() => {
    const normalize = () => {
      const el = sliderRef.current;
      const track = trackRef.current;
      if (!el || !track) return;
      const single = track.scrollWidth / 2;
      if (single > 0) {
        el.scrollLeft = el.scrollLeft % single;
      }
    };
    window.addEventListener('resize', normalize);
    return () => window.removeEventListener('resize', normalize);
  }, []);

  
  return (
    <div className="min-h-screen bg-[#fcf6f1] text-gray-900">
      <Header /> 
<ScrollFeatures/>
      <main className="bg-[#fcf6f1]">
        {/* HERO */}
        <section className="max-w-7xl mx-auto px-8 pt-16 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
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
                <a href="/mentorship/apply" className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-2xl relative overflow-hidden group">
                  <span className="relative z-10">Schedule Mentorship session</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
                <a href="#become-mentor" className="border border-gray-300 px-6 py-3 rounded-md font-medium text-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden group">
                  <span className="relative z-10">Become a Mentor</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-orange-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              </div>

              {/* Trust badges */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                <div className="bg-white rounded-lg shadow p-4 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-lg">
                  <div className="text-2xl font-bold">150+</div>
                  <div className="text-gray-600 text-sm">Industry Mentors</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-lg">
                  <div className="text-2xl font-bold">7.5 yrs</div>
                  <div className="text-gray-600 text-sm">Avg Mentor Experience</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-lg">
                  <div className="text-2xl font-bold">40+</div>
                  <div className="text-gray-600 text-sm">Partner Universities</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-lg">
                  <div className="text-2xl font-bold">3k+</div>
                  <div className="text-gray-600 text-sm">Student Placements</div>
                </div>
              </div>
            </div>

            <div className="md:pl-6">
              <div className="relative bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-400/30 flex items-center justify-center">
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
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1 w-2.5 h-2.5 bg-yellow-400 rounded-full" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 p-4 bg-[#fcf6f1] border border-yellow-400/40 rounded-lg">
                  <p className="text-sm text-gray-700">
                    "This program helped me convert multiple interviews. The feedback loop was
                    incredible." — <span className="font-medium">Sneha V.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

         {/* MENTOR SPOTLIGHT */}
        <section className="max-w-7xl mx-auto px-8 py-14">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Mentor Spotlight</h2>
            <p className="text-gray-600 mt-2">Top engineers guiding you at every step.</p>
          </div>
        
          <div className="relative">
            {/* Left arrow button */}
            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => {
                if (sliderRef.current) sliderRef.current.scrollBy({ left: -320, behavior: "smooth" });
              }}
              // className="absolute top-1/2 -translate-y-1/2 left-0 z-20 bg-white shadow-lg rounded-full h-11 w-11 flex items-center justify-center border border-gray-200 hover:bg-yellow-100 transition active:scale-95"
              // style={{ transform: 'translateY(-50%) translateX(-30%)', opacity: 0.95 }}
            >
              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-800">
                <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg> */}
            </button>
            {/* Right arrow button */}
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => {
                if (sliderRef.current) sliderRef.current.scrollBy({ left: 320, behavior: "smooth" });
              }}
              // className="absolute top-1/2 -translate-y-1/2 right-0 z-20 bg-white shadow-lg rounded-full h-11 w-11 flex items-center justify-center border border-gray-200 hover:bg-yellow-100 transition active:scale-95"
              // style={{ transform: 'translateY(-50%) translateX(30%)', opacity: 0.95 }}
            >
              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-800">
                <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
              </svg> */}
            </button>
            <div
              ref={sliderRef}
              className="overflow-hidden cursor-grab select-none"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => { handleMouseUp(); setPaused(false); }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              style={{ maxWidth: '1200px', margin: '0 auto' }}
            >
              <div ref={trackRef} className="flex items-stretch gap-6 w-max transition-transform duration-700 ease-in-out" style={{ willChange: 'transform' }}>
                {[...mentors, ...mentors].map((m, idx) => (
                  <div
                    key={m.name + '-' + idx}
                    onClick={() => openMentor(m)}
                    className="select-none bg-white p-7 rounded-2xl shadow-xl border border-gray-200 flex flex-col w-[290px] md:w-[300px] shrink-0 cursor-pointer group hover:scale-105 transition-transform duration-300"
                    style={{ minHeight: '340px' }}
                  >
                    <div className="w-full h-50 bg-gray-200 rounded-xl mb-5 overflow-hidden flex items-center justify-center relative">
                      {m.photo ? (
                        <img src={m.photo} alt={`${m.name} photo`} className="w-full h-full object-cover" />
                      ) : null}
                      <a
                        href={m.linkedin || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn profile"
                        onClick={(e) => e.stopPropagation()}
                        className="absolute bottom-2 right-2 h-9 w-9 rounded-full bg-[#0A66C2] text-white flex items-center justify-center shadow-md hover:shadow-lg hover:bg-[#0957a3] transition transform hover:scale-110 active:scale-95 ring-0 hover:ring-4 ring-[#0A66C2]/20 focus:outline-none focus:ring-4 focus:ring-[#0A66C2]/30"
                      >
                        <svg
                        
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.771 24h20.451C23.2 24 24 23.225 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003zM6.9 20.452H3.771V9H6.9v11.452zM5.337 7.433c-1.144 0-2.069-.927-2.069-2.07 0-1.144.925-2.069 2.069-2.069 1.144 0 2.07.925 2.07 2.069 0 1.143-.926 2.07-2.07 2.07zM20.447 20.452h-3.554V14.8c0-1.345-.027-3.078-1.879-3.078-1.88 0-2.168 1.464-2.168 2.976v5.754H9.293V9h3.414v1.561h.049c.476-.9 1.637-1.848 3.37-1.848 3.604 0 4.268 2.371 4.268 5.455v6.284z" />
                        </svg>
                      </a>
                    </div>
                    <div className="flex items-start justify-between mb-5">
                      <div>
                        <div className="font-semibold text-lg">{m.name}</div>
                        <div className="text-md text-gray-600">{m.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {activeMentor && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-300 ${modalReady ? "opacity-100" : "opacity-0"}`}
            onClick={closeModal}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="mentor-modal-title"
              onClick={(e) => e.stopPropagation()}
              className={`relative z-10 w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 sm:p-8 transform transition-all duration-300 ${modalReady ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-95"}`}
            >
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 shadow"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                </svg>
              </button>

              <div className="flex gap-4 items-start justify-between">
                <div className="w-20 h-20 rounded-lg bg-gray-200 overflow-hidden flex items-center justify-center">
                  {activeMentor.photo ? (
                    <img src={activeMentor.photo} alt={`${activeMentor.name} photo`} className="w-full h-full object-cover" />
                  ) : null}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 id="mentor-modal-title" className="text-xl font-semibold">{activeMentor.name}</h3>
                    <LinkedInButton href={activeMentor?.linkedin || "#"} ariaLabel={`View ${activeMentor?.name}'s LinkedIn`} className="mt-6" />
                  </div>
                  <p className="text-gray-600">{activeMentor.role}</p>
                  <div className="mt-2 text-gray-700 text-sm">
                    {activeMentor.description}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {activeMentor.tags?.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 text-xs bg-yellow-400/30 text-gray-900 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#fcf6f1] rounded-lg border border-yellow-400/30">
                  <div className="font-medium">Expertise</div>
                  <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
                    {activeMentor.expertise && activeMentor.expertise.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-[#fcf6f1] rounded-lg border border-yellow-400/30">
                  <div className="font-medium">What you get</div>
                  <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
                    {activeMentor.whatYouGet && activeMentor.whatYouGet.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal actions removed as requested */}
            </div>
          </div>
        )}

        {/* BENEFITS */}
        <section className="max-w-7xl mx-auto px-8 py-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Mentor Benefits</h2>
            <p className="text-gray-600 mt-2">What you get with BridgeLabs mentorship.</p>
          </div>

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
  title: "Communication skills enhancement",
  desc: "Improve how you express ideas and build confidence in speaking.",
  points: ["Feedback on speaking", "Mock interviews", "Clear communication"],
},
{
  title: "Career choice guidance",
  desc: "Get clarity and direction for your next career move.",
  points: ["Find strengths", "Industry insights", "Upskilling advice"],
},
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg border border-gray-100"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-xl">{card.title}</h3>
                  {/* <span className="px-2 py-1 text-xs rounded bg-yellow-400 text-black font-medium">Included</span> */}
                </div>
                <p className="text-gray-600 mb-4">{card.desc}</p>
                <ul className="space-y-2 text-gray-700">
                  {card.points.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1 w-2 h-2 bg-yellow-400 rounded-full" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

      

        {/* FAQ */}
        <section className="max-w-7xl mx-auto px-8 pb-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Frequently asked questions</h2>
            <p className="text-gray-600 mt-2">Everything you need to know about the program.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "How are mentors selected?",
                a: "Every mentor is vetted for domain depth, teaching ability, and outcomes from previous cohorts.",
              },
              {
               q: "What happens during a session?",
a: "Mentors provide personalized guidance, answer questions, review your work, and help you with communication skills, problem-solving, or career planning.",
              },
              {
                q: "Who can book a session?",
a: "Students, professionals, or anyone looking to improve skills, career choices, or personal development",
              },
              {
                q: "Do you help with placements?",
                a: "Yes. We run interview prep, mock interviews, referrals, and hiring challenges with partners.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow p-5 border border-gray-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="font-semibold mb-1">{f.q}</div>
                <div className="text-gray-700">{f.a}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
// helllo