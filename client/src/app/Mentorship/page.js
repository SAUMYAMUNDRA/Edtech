"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Header from "../components/header/page";
import Footer from "../components/footer/page";

// Dev Version (Mentor Spotlight with slider + modal)
export default function MentorshipPage() {
  const mentors = [
    {
      name: "Amit Kumar",
      role: "SWE, Google",
      tags: ["DSA", "System Design"],
      photo: "",
      linkedin: "",
    },
    {
      name: "Sneha Verma",
      role: "Backend, Amazon",
      tags: ["Java", "Databases"],
      photo: "",
      linkedin: "",
    },
    {
      name: "Ravi Singh",
      role: "Full-Stack, Microsoft",
      tags: ["React", "Node"],
      photo: "",
      linkedin: "",
    },
    {
      name: "Priya Sharma",
      role: "Data Scientist, Meta",
      tags: ["Python", "ML"],
      photo: "",
      linkedin: "",
    },
  ];

  const [paused, setPaused] = useState(false);
  const sliderRef = useRef(null);
  const trackRef = useRef(null);

  const [activeMentor, setActiveMentor] = useState(null);
  const [modalReady, setModalReady] = useState(false);

  const closeModal = () => {
    setModalReady(false);
    setTimeout(() => setActiveMentor(null), 300);
    setPaused(false);
  };

  const openMentor = (mentor) => {
    setActiveMentor(mentor);
    setPaused(true);
    setTimeout(() => setModalReady(true), 20);
  };

  // Escape key listener for modal
  useEffect(() => {
    if (activeMentor) {
      const handler = (e) => {
        if (e.key === "Escape") closeModal();
      };
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }
  }, [activeMentor]);

  // Draggable slider
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let isDown = false;
    let startX, scrollLeft;

    const startDrag = (e) => {
      isDown = true;
      slider.classList.add("grabbing");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const stopDrag = () => {
      isDown = false;
      slider.classList.remove("grabbing");
    };

    const moveDrag = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", startDrag);
    slider.addEventListener("mouseleave", stopDrag);
    slider.addEventListener("mouseup", stopDrag);
    slider.addEventListener("mousemove", moveDrag);

    return () => {
      slider.removeEventListener("mousedown", startDrag);
      slider.removeEventListener("mouseleave", stopDrag);
      slider.removeEventListener("mouseup", stopDrag);
      slider.removeEventListener("mousemove", moveDrag);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#fcf6f1] text-gray-900">
      <Header />

      <main className="bg-[#fcf6f1]">
        {/* HERO */}
        <section className="max-w-7xl mx-auto px-8 pt-16 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Learn from <span className="text-blue-600">Top Industry</span>{" "}
                Mentors
              </h1>
              <p className="text-lg text-gray-700">
                Get 1-on-1 mentorship from engineers at Google, Amazon, and
                more. Practice mock interviews, build projects, and land your
                dream job.
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-blue-700 transition">
                Find Your Mentor
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <Image
                src="/images/mentorship-hero.svg"
                alt="Mentorship"
                width={400}
                height={400}
                className="drop-shadow-lg"
              />
            </motion.div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="max-w-7xl mx-auto px-8 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Find Your Mentor",
                desc: "Browse top engineers from FAANG & startups.",
              },
              {
                title: "Book a Session",
                desc: "Schedule 1:1 video calls or mock interviews.",
              },
              {
                title: "Grow Faster",
                desc: "Get guidance, feedback, and real-world tips.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* MENTOR BENEFITS */}
        <section className="bg-white py-16 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose Our Mentors?
            </h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                "Real FAANG Engineers",
                "1:1 Mock Interviews",
                "Project Guidance",
                "Career Roadmap",
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="bg-[#fcf6f1] p-6 rounded-xl shadow hover:shadow-md transition"
                >
                  <p className="font-medium">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* MENTOR SPOTLIGHT */}
        <section className="max-w-7xl mx-auto px-8 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Meet Our Mentors
          </h2>
          <div className="relative">
            <div
              ref={sliderRef}
              className="overflow-x-scroll hide-scrollbar cursor-grab"
            >
              <div
                ref={trackRef}
                className="flex gap-6 w-max pb-6"
              >
                {mentors.map((mentor, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => openMentor(mentor)}
                    className="min-w-[260px] bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
                  >
                    <div className="h-24 w-24 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold mb-4">
                      {mentor.name[0]}
                    </div>
                    <h3 className="text-lg font-semibold text-center">
                      {mentor.name}
                    </h3>
                    <p className="text-sm text-gray-600 text-center">
                      {mentor.role}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center mt-3">
                      {mentor.tags.map((tag, j) => (
                        <span
                          key={j}
                          className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Mentor Modal */}
      {activeMentor && (
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ${
            modalReady ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeModal}
        >
          <div
            className={`bg-white rounded-xl max-w-md w-full p-6 shadow-lg relative transform transition-all duration-300 ${
              modalReady ? "scale-100" : "scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <div className="h-28 w-28 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold mb-4">
              {activeMentor.name[0]}
            </div>
            <h3 className="text-xl font-semibold text-center">
              {activeMentor.name}
            </h3>
            <p className="text-sm text-gray-600 text-center mb-4">
              {activeMentor.role}
            </p>
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {activeMentor.tags.map((tag, j) => (
                <span
                  key={j}
                  className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={activeMentor.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              View LinkedIn
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
