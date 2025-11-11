"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Footer from "../app/components/footer/page";
import Header from "../../src/app/components/header/page";
import ScrollFeatures from "./components/scroll_feature/ScrollFeatures";
import { MentorSpotlight } from "./mentorship/mentors";
import TagCloud from "TagCloud";

// Scroll Animation Hook
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    const elements = document.querySelectorAll("[data-scroll-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return isVisible;
};

export default function HomePage() {
  const visibleElements = useScrollAnimation();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
useEffect(() => {
  // Import TagCloud dynamically (client-side only)
  import("tagcloud").then((TagCloudModule) => {
    const container = "#tagCloudContainer";

    const texts = [
      "DSA", "React", "Node.js", "MongoDB", "Express", "Next.js",
      "Competitive Programming", "System Design", "AI", "ML", "C++", "Java",
      "Python", "HTML", "CSS", "Git", "SQL", "TypeScript", "DevOps",
    ];

    const options = {
      radius: window.innerWidth < 768 ? 150 : 250,
      maxSpeed: "fast",
      initSpeed: "normal",
      direction: 135,
      keep: true,
    };

    // Clear any existing instance before re-initializing
    const existing = document.querySelector(".tagcloud");
    if (existing) existing.remove();

    TagCloudModule.default(container, texts, options);
  });
}, []);

  const testimonials = [
    {
      id: "Mohd",
      text: "The mentorship program was a game-changer. I cracked my dream job interview thanks to it.",
      name: "Mohd Mujassim",
      role: "Salesforce Developer, Accenture",
      avatar: "👨‍💻",
    },
    {
      id: "Masharib",
      text: "Hands-on projects gave me real confidence in coding. The mentors are very supportive!",
      name: "Masharib Yazdani",
      role: "Associate Software Engineer, Accenture",
      avatar: "👩‍💻",
    },
    {
      id: "ravi",
      text: "BridgeLabs bridges the gap between theory and practice. Truly a career accelerator!",
      name: "Mohd Ehtesham",
      role: "ServiceNow Developer Intern, Bangmetric",
      avatar: "👨‍🎓",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcf6f1] text-gray-900 overflow-x-hidden">
      {/* HEADER */}
      <Header />
      <ScrollFeatures />

      {/* HERO SECTION */}
      <section className="bg-[#fcf6f1] text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 space-y-16 sm:space-y-20">
          {/* HERO */}
          <div
            id="hero"
            data-scroll-animate
            className={`grid grid-cols-1 md:grid-cols-2 items-center gap-10 transition-all duration-1000 ease-out ${
              visibleElements.hero
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Left */}
            <div
              className={`transition-all duration-1000 delay-300 ease-out ${
                visibleElements.hero
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="text-xs sm:text-sm text-gray-500 mb-3 tracking-wide uppercase animate-pulse">
                Industry • Universities • Curriculum
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                Bridging Industry & <br className="hidden sm:block" /> Academia
              </h1>
              <p className="text-gray-700 mb-8 text-base sm:text-lg leading-relaxed hover:text-gray-800">
                Connect top industrial mentors with universities to deliver
                practical mentorship programs in DSA, Competitive Programming,
                and Computer Science fundamentals — built for real-world success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/mentorship"
                  className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 text-center"
                >
                  Get Started
                </a>
                <a
                  href="/mentorship/apply"
                  className="border-2 border-gray-300 px-6 py-3 rounded-md font-medium text-gray-700 hover:bg-gray-200 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 relative overflow-hidden group text-center"
                >
                  <span className="relative z-10">Request a Mentor</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-orange-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div
              className={`flex justify-center transition-all duration-1000 delay-500 ease-out ${
                visibleElements.hero
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
             {/* Right Visual – Rotating 3D Tag Cloud */}
<div
  className={`flex justify-center items-center transition-all duration-1000 delay-500 ease-out ${
    visibleElements.hero ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
  }`}
>
  <div className="relative w-full sm:w-[80%] md:w-[90%] h-[350px] sm:h-[400px] flex items-center justify-center overflow-hidden">
    <div id="tagCloudContainer" className="w-full h-full flex items-center justify-center"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 rounded-3xl opacity-40 blur-3xl"></div>
  </div>
</div>

            </div>
          </div>

          {/* OFFERINGS */}
          <div
            id="offerings"
            data-scroll-animate
            className={`text-center transition-all duration-1000 ease-out ${
              visibleElements.offerings
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Our Offerings
            </h2>
            <p className="text-gray-600 mb-10 sm:mb-12 text-sm sm:text-base">
              Empowering students and campuses through mentorship and career
              guidance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  id: 1,
                  icon: "🎓",
                  title: "Student Mentorship",
                  description:
                    "Personalized guidance to help students excel academically, build projects, and grow confidently.",
                },
                {
                  id: 2,
                  icon: "🏫",
                  title: "Campus Mentorship",
                  description:
                    "Workshops, group mentorship, and collaborative sessions tailored for universities and colleges.",
                },
                {
                  id: 3,
                  icon: "💼",
                  title: "Career & Industry Readiness",
                  description:
                    "Mock interviews, resume reviews, and soft skill training to prepare you for real-world success.",
                },
              ].map((offering, index) => (
                <div
                  key={offering.id}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer group relative overflow-hidden"
                  style={{ transitionDelay: `${index * 200 + 600}ms` }}
                  onMouseEnter={() => setHoveredCard(offering.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-50 transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-center rounded-xl"></div>
                  <div className="relative z-10">
                    <div className="text-4xl mb-4">{offering.icon}</div>
                    <h3 className="font-semibold text-lg sm:text-xl mb-3">
                      {offering.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base mb-4">
                      {offering.description}
                    </p>
                    <a
                      href="#"
                      className={`text-yellow-600 font-medium transition-all duration-300 hover:text-yellow-700 inline-flex items-center ${
                        hoveredCard === offering.id
                          ? "underline underline-offset-4 decoration-2 decoration-yellow-400"
                          : ""
                      }`}
                    >
                      Explore
                      <span className="ml-1">→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MENTOR SPOTLIGHT */}
          <MentorSpotlight />

          {/* TESTIMONIALS */}
          <div
            id="testimonials"
            data-scroll-animate
            className={`text-center transition-all duration-1000 ease-out ${
              visibleElements.testimonials
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              What Our Students Say
            </h2>
            <p className="text-gray-600 mb-10 sm:mb-12 text-sm sm:text-base">
              Hear from learners who transformed their careers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
              {testimonials.map((t, index) => (
                <div
                  key={t.id}
                  className="p-6 rounded-xl bg-white shadow hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group relative overflow-hidden"
                  style={{ transitionDelay: `${index * 200 + 800}ms` }}
                >
                  <div className="text-3xl mb-3">{t.avatar}</div>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base italic">
                    “{t.text}”
                  </p>
                  <h4 className="font-semibold text-base sm:text-lg">
                    {t.name}
                  </h4>
                  <span className="text-sm text-gray-500">{t.role}</span>
                </div>
              ))}
            </div>

            {/* CTA BUTTON */}
            <div className="mt-10 sm:mt-12">
              <a
                href="/testimonial"
                className="bg-yellow-500 text-black px-6 sm:px-8 py-3 rounded-md font-medium hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 inline-flex items-center"
              >
                <span className="mr-2">View All Success Stories</span> →
              </a>
            </div>
          </div>

          {/* CTA */}
          <div
            id="cta"
            data-scroll-animate
            className={`text-center transition-all duration-1000 ease-out ${
              visibleElements.cta
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Ready to Start Learning?
            </h2>
            <p className="text-gray-700 mb-8 text-base sm:text-lg">
              Join thousands of learners advancing their tech careers with
              BridgeLabs.
            </p>
            <a
              href="#"
              className="bg-yellow-500 text-black px-6 sm:px-8 py-3 rounded-md font-medium hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 inline-block"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
