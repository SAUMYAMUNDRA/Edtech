"use client";
import React, { useEffect, useRef, useState } from "react";
import LinkedInButton from "../components/buttons/LinkedInButton";

export const mentors = [
    {
      name: "Arish Rehman Khan",
      role: "Software Engineer Systems, Ciena",
      tags: ["Embedded Systems", "Project Management","Computer Networking"],
      photo: "https://res.cloudinary.com/dsfssl5zk/image/upload/v1758082537/eoya4vvog1ilshljsyan.jpg",
      linkedin: "https://www.linkedin.com/in/arishrehmankhan/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      description: "",
      expertise: [
        "Representational State Transfer(REST)",
        "Android Development",
        "Competitive coding guidance"
      ],
      whatYouGet: [
        "1:1 Interview prep",
        "Project-based feedback",
        "Doubt solving and live sessions"
      ]
    },
    {
      name: "Dheeraj Yadav",
      role: "Software Engineer, Cohesity",
      tags: ["Golang", "Django","MongoDB"],
      photo: "https://res.cloudinary.com/dsfssl5zk/image/upload/v1764686794/suumuwdczjyel2aaylxk.jpg",
      linkedin: "https://www.linkedin.com/in/dheeraj-yadav-8b6917276/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      description: "",
      expertise: [
        "Swagger API",
        "Ginkgo",
        "Competitive Programming"
      ],
      whatYouGet: [
        "Career mentorship",
        "backend walkthroughs",
        "Resume & code reviews"
      ]
    },
    {
      name: "Ruchira Naskar",
      role: "SWE, Microsoft",
      tags: ["Unit Testing", "Generative AI","Protocol Buffers"],
      photo: "https://media.licdn.com/dms/image/v2/D5603AQHvgU3u33Li5g/profile-displayphoto-scale_400_400/B56Zkwqrw9I8Ag-/0/1757458121313?e=1764201600&v=beta&t=FBkjG5BW9osaCaSZkGSS9oQYeOEiuDpXq2KkL1tWV4k",
      linkedin: "https://www.linkedin.com/in/ruchira-naskar-18b86522a/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      description: "",
      expertise: [
        "Dependency Injection",
        "Remote Procedure Call(RPC)",
        "Competitive Programming"
      ],
      whatYouGet: [
        "Portfolio-ready projects",
        "1:1 sessions",
        "Feedback and problem-solving"
      ]
    },
    {
      name: "Sachin Gupta",
      role: "Software Engineer, Uber",
      tags: ["Software Development", "Go","OOP"],
      photo: "https://media.licdn.com/dms/image/v2/D5603AQHNdG66BHt4GA/profile-displayphoto-scale_400_400/B56Zh2GhmcHMAk-/0/1754328082991?e=1764201600&v=beta&t=o05EfakYRMs1g8bzqZz4WFU4LNQSlbHEfgh2SShHZ00",
      linkedin: "https://www.linkedin.com/in/sachin-k-gupta/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      description: "",
      expertise: [
        "Competitive Programming",
        "TypeScript",
        "Grafana"
      ],
      whatYouGet: [
        "End-to-end project help",
        "Analytics labs",
        "Interview and career guidance"
      ]
    },
    {
      name: "Ekta Dhusia",
      role: "Software Architect, Amdocs",
      tags: ["Data Architecture", "Data Engineering","AWS"],
      photo: "https://media.licdn.com/dms/image/v2/C4E03AQE-LEU3g5F9tg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1609785350202?e=1764201600&v=beta&t=6YbyF4ynVoKzuOj-nGthUQn2YUQ9lYY2em13j3RbIOY",
      linkedin: "https://www.linkedin.com/in/ekta-dhusia/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      description: "",
      expertise: [
        "PySpark",
        "Apache Pig",
        "Hadoop"
      ],
      whatYouGet: [
        "End-to-end project help",
        "Analytics labs",
        "Interview and career guidance"
      ]
    },
    {
      name: "Manmeet Chauhan",
      role: "AVP Software Development, SitusAMC",
      tags: ["Data Mapping", "Solution Architecture","Model-View-Controller(MVC)"],
      photo: "https://media.licdn.com/dms/image/v2/C4D03AQGBTSRZb_1BAA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1516626173865?e=1764201600&v=beta&t=8TID-dXmGbsEBdDMYxAYId4fC3-IKfCx6SdmwVH5Gt4",
      linkedin: "https://www.linkedin.com/in/manmeetchauhan/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      description: "",
      expertise: [
        "Agile and Waterfall Methodologies",
        "XSLT",
        "AngularJS"
      ],
      whatYouGet: [
        "End-to-end project help",
        "Analytics labs",
        "Interview and career guidance"
      ]
    },
    {
      name: "Kartar R.",
      role: "Database Services Manager, Rackspace Technology",
      tags: ["Microsoft SQL Server", "Database Administration","SQL"],
      photo: "https://media.licdn.com/dms/image/v2/C5603AQEj6CmSlJ754Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1517431664746?e=1764201600&v=beta&t=sT6JjnfcK_th-4necmQS-7xe1b2loDJBdCOEmpCd5Uw",
      linkedin: "https://www.linkedin.com/in/kartar-r-89b50546/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      description: "",
      expertise: [
        "Microsoft Technologies",
        "SQL Server Management Studio",
        "Oracle Enterprise Manager"
      ],
      whatYouGet: [
        "End-to-end project help",
        "Analytics labs",
        "Interview and career guidance"
      ]
    },
    {
      name: "Lov Vashist",
      role: "Senior Sales Engineer, ColorTokens",
      tags: ["Sales Engineer", "Keynote Delivery","Network Security"],
      photo: "https://media.licdn.com/dms/image/v2/D5603AQHNaJtJ420FNA/profile-displayphoto-scale_400_400/B56ZnhiO4FJQAg-/0/1760425472525?e=1764201600&v=beta&t=CX_mdBo3zT4NJhgvt4Hk2L_EAstTjveGChbUmDvEs5I",
      linkedin: "https://www.linkedin.com/in/lov-vashist-8901811b/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      description: "",
      expertise: [
        "Technical Writing",
        "Public Speaking",
        "Cyber Resilience"
      ],
      whatYouGet: [
        "End-to-end project help",
        "Analytics labs",
        "Interview and career guidance"
      ]
    },
     {
      name: "Harmanjot Singh",
      role: "Software Engineer,Uber",
      tags: ["SpringBoot", "Java","JUnit"],
      photo: "https://media.licdn.com/dms/image/v2/D5603AQFHBbV5hzydLg/profile-displayphoto-scale_400_400/B56ZjCcE_5HcAk-/0/1755608804267?e=1764201600&v=beta&t=ec4C_Q23bbcbu0elxaAi-MTB4-tzRygmozoRQMtqnyw",
      linkedin: "https://www.linkedin.com/in/harmanjot-singh-53aa38229/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      description: "",
      expertise: [
        "Software Engineering",
        "Competetive Programming"
      ],
      whatYouGet: [
        "End-to-end project help",
        "Analytics labs",
        "Interview and career guidance"
      ]
    },
     {
      name: "Mohammad Inamul Haq",
      role: "Senior Data Analyst, GrowthJockey",
      tags: ["Business Intelligence", "Analytical Solutions","Web Analytics"],
      photo: "https://media.licdn.com/dms/image/v2/D5603AQHBSAtxyEi3yw/profile-displayphoto-shrink_400_400/B56ZgnBkweG4As-/0/1753001382636?e=1764201600&v=beta&t=54aLznp6pXFHQf49Qg3_LYnRcl1ClB-aqrMtWd8ISv4",
      linkedin: "https://www.linkedin.com/in/mohammad-inamul-haq-741901192/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      description: "",
      expertise: [
        "Decision Making",
        "Soft Skills",
        "Business Analysis"
      ],
      whatYouGet: [
        "End-to-end project help",
        "Analytics labs",
        "Interview and career guidance"
      ]
    },
    {
      name: "Jayant Pranjal",
      role: "Program Associate, Wells Fargo",
      tags: ["Mern Stack", "Django","Python"],
      photo: "https://media.licdn.com/dms/image/v2/D5603AQHyAhAn170UVQ/profile-displayphoto-shrink_400_400/B56ZZEM5wIGQAg-/0/1744900957381?e=1764201600&v=beta&t=Xu00QbQi1iN8n-SPa1fxI_6JMLoz8w9Q2ai9_nNSbZM",
      linkedin: "https://www.linkedin.com/in/jayant-pranjal/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      description: "",
      expertise: [
        "Algorithms",
        "Django REST Framework",
        "Competitive Programming"
      ],
      whatYouGet: [
        "Career mentorship",
        "backend walkthroughs",
        "Resume & code reviews"
      ]
    },
  ];

export function MentorSpotlight() {
  const [paused, setPaused] = useState(false);
  const sliderRef = useRef(null);
  const trackRef = useRef(null);
  const speedRef = useRef(0.8);

  const [activeMentor, setActiveMentor] = useState(null);
  const [modalReady, setModalReady] = useState(false);

  // in-view animation for the section & cards
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => setInView(e.isIntersecting));
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const openMentor = (m) => {
    setActiveMentor(m);
    setPaused(true);
  };
  const closeModal = () => {
    setActiveMentor(null);
    setPaused(false);
  };

  // modal ready & escape close
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

  // auto-slide loop
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

  // drag-to-scroll
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;
    isDragging.current = true;
    setPaused(true);
    startX.current = e.clientX;
    startScrollLeft.current = sliderRef.current.scrollLeft;
    sliderRef.current.classList.add("cursor-grabbing");
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
    sliderRef.current.classList.remove("cursor-grabbing");
  };

  // normalize on resize
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
    window.addEventListener("resize", normalize);
    return () => window.removeEventListener("resize", normalize);
  }, []);

  return (
    <section ref={sectionRef} className={`max-w-7xl mx-auto px-8 py-14 transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Mentor Spotlight</h2>
        <p className="text-gray-600 mt-2">Top engineers guiding you at every step.</p>
      </div>

      <div className="relative" style={{ minHeight: 380 }}>
        
        <div
          ref={sliderRef}
          className="overflow-x-auto scrollbar-hide cursor-grab select-none"
          style={{ maxWidth: '1200px', margin: '0 auto', scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => { handleMouseUp(); setPaused(false); }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div
            ref={trackRef}
            className="flex items-stretch gap-6 w-max transition-transform duration-700 ease-in-out"
            style={{ willChange: 'transform' }}
          >
            {[...mentors, ...mentors].map((m, idx) => (
              <div
                key={m.name + '-' + idx}
                onClick={() => openMentor(m)}
                className={`select-none bg-white p-7 rounded-2xl shadow-xl border border-gray-200 flex flex-col w-[290px] md:w-[300px] shrink-0 cursor-pointer group hover:scale-105 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ minHeight: '340px', transitionDelay: `${idx * 150 + 600}ms` }}
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                      <path d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.771 24h20.451C23.2 24 24 23.225 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003zM6.9 20.452H3.771V9H6.9v11.452zM5.337 7.433c-1.144 0-2.069-.927-2.069-2.07 0-1.144.925-2.069 2.069-2.069 1.144 0 2.07.925 2.07 2.069 0 1.143-.926 2.07-2.07 2.07zM20.447 20.452h-3.554V14.8c0-1.345-.027-3.078-1.879-3.078-1.88 0-2.168 1.464-2.168 2.976v5.754H9.293V9h3.414v1.561h.049c.476-.9 1.637-1.848 3.37-1.848 3.604 0 4.268 2.371 4.268 5.455v6.284z" />
                    </svg>
                  </a>
                </div>
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <div className="font-semibold text-lg">{m.name}</div>
                    <div className="text-md text-gray-600">{m.name === "Ruchira Naskar" ? (
                      <>
                        SWE, Microsoft
                        <div className="text-xs text-gray-500">ex-Google Intern</div>
                      </>
                    ) : m.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active mentor modal */}
      {activeMentor && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-300 ${modalReady ? "opacity-100" : "opacity-0"}`}
          onClick={closeModal}
        >
          <div className="absolute inset-0 backdrop-blur-lg"></div>
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
          </div>
        </div>
      )}
    </section>
  );
}
