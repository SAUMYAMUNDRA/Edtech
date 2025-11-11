"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Footer from "../app/components/footer/page"
import Header from "../../src/app/components/header/page"
import ScrollFeatures from "./components/scroll_feature/ScrollFeatures";
import { MentorSpotlight } from "./mentorship/mentors";

// Scroll Animation Hook
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const elements = document.querySelectorAll('[data-scroll-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return isVisible;
};

export default function HomePage() {
  const visibleElements = useScrollAnimation();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const offerings = [
    {
      id: 'dsa',
      title: "DSA Mastery",
      description: "Learn Data Structures and Algorithms from basics to advanced.",
      icon: "🧠"
    },
    {
      id: 'competitive',
      title: "Competitive Programming", 
      description: "Master problem-solving techniques for contests and interviews.",
      icon: "🏆"
    },
    {
      id: 'fullstack',
      title: "Full Stack Dev",
      description: "Learn MERN stack development with industry-standard projects.",
      icon: "💻"
    }
  ];

  const testimonials = [
    {
      id: 'Mohd',
      text: "The mentorship program was a game-changer. I cracked my dream job interview thanks to.",
      name: "Mohd Mujassim",
      role: "Salesforce Developer, Accenture",
      avatar: "👨‍💻"
    },
    {
      id: 'Masharib', 
      text: "Hands-on projects gave me real confidence in coding. The mentors are very supportive!",
      name: "Masharib Yazdani",
      role: "Associate Software Engineer, Accenture",
      avatar: "👩‍💻"
    },
    {
      id: 'ravi',
      text: "We bridges the gap between theory and practice. Truly a career accelerator!",
      name: "Mohd Ehtesham", 
      role: "ServiceNow Developer Intern, Bangmetric",
      avatar: "👨‍🎓"
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcf6f1] text-gray-900">
      {/* HEADER */}
      <Header/>
      <ScrollFeatures/>
      
      {/* HERO SECTION */}
      <section className="bg-[#fcf6f1] text-gray-900">
        <div className="max-w-7xl mx-auto px-8 py-20 space-y-20">
          {/* HERO */}
          <div 
            id="hero"
            data-scroll-animate
            className={`grid grid-cols-1 md:grid-cols-2 items-center gap-10 transition-all duration-1000 ease-out ${
              visibleElements.hero 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Left Content */}
            <div className={`transition-all duration-1000 delay-300 ease-out ${
              visibleElements.hero 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-8'
            }`}>
              <div className="text-sm text-gray-500 mb-3 tracking-wide uppercase animate-pulse">
                Industry • Universities • Curriculum
              </div>
              <h1 className="text-5xl font-bold leading-snug mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent transition-all duration-500">
                Bridging Industry & <br /> Academia
              </h1>
              <p className="text-gray-700 mb-8 text-lg leading-relaxed hover:text-gray-800 transition-colors duration-300">
                Connect top industrial mentors with universities to deliver practical, rigorous mentorship programs in DSA, Competitive Programming, and Computer Science fundamentals — built for real-world hiring outcomes.
              </p>

              <div className="flex gap-4">
                <a
                  href="/mentorship"
                  className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-gray-900/25 active:scale-95"
                >
                  Get Started
                </a>
                <a
                  href="/mentorship/apply"
                  className="border-2 border-gray-300 px-6 py-3 rounded-md font-medium text-gray-700 hover:bg-gray-200 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 relative overflow-hidden group"
                >
                  <span className="relative z-10">Request a Mentor</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-orange-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className={`flex justify-center transition-all duration-1000 delay-500 ease-out ${
              visibleElements.hero 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-8'
            }`}>
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-lg transform rotate-3 group-hover:rotate-6 transition-all duration-500 group-hover:scale-105 opacity-70"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-blue-400 via-purple-400 to-pink-400 rounded-lg transform -rotate-3 group-hover:-rotate-6 transition-all duration-500 group-hover:scale-105 opacity-50"></div>
                <Image
                  src="/home.jpg"
                  alt="Books with apple"
                  width={500}
                  height={350}
                  className={`relative rounded-lg shadow-2xl transform group-hover:scale-105 transition-all duration-500 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoadingComplete={() => setImageLoaded(true)}
                />
              </div>
            </div>
          </div>

          {/* offerings */}
         <div 
  id="offerings"
  data-scroll-animate
  className={`text-center transition-all duration-1000 ease-out ${
    visibleElements.offerings 
      ? 'opacity-100 translate-y-0' 
      : 'opacity-0 translate-y-8'
  }`}
>
  <h2 className="text-3xl font-bold mb-4 transition-colors duration-300">Our Offerings</h2>
  <p className="text-gray-600 mb-12 hover:text-gray-700 transition-colors duration-300">
    Empowering students and campuses through mentorship and career guidance.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {[
      {
        id: 1,
        icon: "🎓",
        title: "Student Mentorship",
        description: "Personalized guidance to help students excel academically, build projects, and grow confidently.",
      },
      {
        id: 2,
        icon: "🏫",
        title: "Campus Mentorship",
        description: "Workshops, group mentorship, and collaborative sessions tailored for universities and colleges.",
      },
      {
        id: 3,
        icon: "💼",
        title: "Career & Industry Readiness",
        description: "Mock interviews, resume reviews, and soft skill training to prepare you for real-world success.",
      },
    ].map((offering, index) => (
      <div
        key={offering.id}
        className={`bg-white p-6 rounded-xl shadow hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer group relative overflow-hidden ${
          visibleElements.offerings 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: `${index * 200 + 600}ms` }}
        onMouseEnter={() => setHoveredCard(offering.id)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-50 transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-center rounded-xl"></div>
        <div className="relative z-10">
          <div className="text-4xl mb-4 transform transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
            {offering.icon}
          </div>
          <h3 className="font-semibold text-xl mb-3 group-hover:text-yellow-700 transition-colors duration-300">
            {offering.title}
          </h3>
          <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">
            {offering.description}
          </p>
          <a 
            href="#" 
            className={`text-yellow-600 font-medium transition-all duration-300 hover:text-yellow-700 inline-flex items-center group-hover:translate-x-2 ${
              hoveredCard === offering.id 
                ? 'underline underline-offset-4 decoration-2 decoration-yellow-400' 
                : ''
            }`}
          >
            Explore 
            <span className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    ))}
  </div>
</div>


          <MentorSpotlight />

          {/* TESTIMONIALS */}
          <div 
            id="testimonials"
            data-scroll-animate
            className={`text-center transition-all duration-1000 ease-out ${
              visibleElements.testimonials 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl font-bold mb-4  transition-colors duration-300">What Our Students Say</h2>
            <p className="text-gray-600 mb-12 hover:text-gray-700 transition-colors duration-300">
              Hear from learners who transformed their careers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`p-6 rounded-xl bg-white shadow hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group cursor-pointer relative overflow-hidden ${
                    visibleElements.testimonials 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 200 + 800}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-center rounded-xl"></div>
                  <div className="relative z-10">
                    <div className="text-3xl mb-4 transform transition-all duration-300 group-hover:scale-110">
                      {testimonial.avatar}
                    </div>
                    <p className="text-gray-600 mb-4 italic relative group-hover:text-gray-700 transition-colors duration-300">
                      <span className="text-4xl text-yellow-400 absolute -top-2 -left-2 opacity-50">"</span>
                      {testimonial.text}
                      <span className="text-4xl text-yellow-400 absolute -bottom-2 -right-2 opacity-50">"</span>
                    </p>
                    <h4 className="font-semibold group-hover:text-yellow-700 transition-colors duration-300">
                      {testimonial.name}
                    </h4>
                    <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                      {testimonial.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* VIEW ALL TESTIMONIALS BUTTON */}
            <div className="mt-12">
              <a
                href="/testimonial"
                className="bg-yellow-500 text-black px-8 py-3 rounded-md font-medium hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/25 active:scale-95 relative overflow-hidden group inline-flex items-center"
              >
                <span className="relative z-10 mr-2">View All Success Stories</span>
                <span className="relative z-10 transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </a>
            </div>
          </div>

          {/* CALL TO ACTION */}
          <div 
            id="cta"
            data-scroll-animate
            className={`text-center transition-all duration-1000 ease-out ${
              visibleElements.cta 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent  transition-all duration-500">
              Ready to Start Learning?
            </h2>
            <p className="text-gray-700 mb-8 text-lg hover:text-gray-800 transition-colors duration-300">
              Join thousands of learners advancing their tech careers with BridgeLabs.
            </p>
            <a
              href="#"
              className="bg-yellow-500 text-black px-8 py-3 rounded-md font-medium hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/25 active:scale-95 relative overflow-hidden group"
            >
              <span className="relative z-10">Get Started Today</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </a>
          </div>
        </div>
      </section>
   
      <Footer/>
    </div>
  );
}