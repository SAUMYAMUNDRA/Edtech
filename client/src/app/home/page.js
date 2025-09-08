"use client";
import Image from "next/image";
import React from "react";
import Footer from "../components/footer/page";
import Header from "../components/header/page";
export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fcf6f1] text-gray-900">
      {/* HEADER */}
   <Header/>

      {/* HERO SECTION */}
       <section className="bg-[#fcf6f1] text-gray-900">
      <div className="max-w-7xl mx-auto px-8 py-20 space-y-20">
        {/* HERO */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* Left Content */}
          <div>
            <div className="text-sm text-gray-500 mb-3">
              Industry • Universities • Curriculum
            </div>
            <h1 className="text-5xl font-bold leading-snug mb-6">
              Bridging Industry & <br /> Academia
            </h1>
            <p className="text-gray-700 mb-8 text-lg">
              Connect top industrial mentors with universities to deliver
              practical, rigorous courses in DSA, Competitive Programming and
              Computer Science fundamentals — built for real-world hiring outcomes.
            </p>

            <div className="flex gap-4">
              <a
                href="#"
                className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium"
              >
                Get Started
              </a>
              <a
                href="#"
                className="border px-6 py-3 rounded-md font-medium text-gray-700 hover:bg-gray-200"
              >
                Request a Mentor
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <Image
              src="/home.jpg"
              alt="Books with apple"
              width={500}
              height={350}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* COURSES */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Popular Courses</h2>
          <p className="text-gray-600 mb-12">
            Choose from industry-approved learning paths.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <h3 className="font-semibold text-xl mb-3">DSA Mastery</h3>
              <p className="text-gray-600 mb-4">
                Learn Data Structures and Algorithms from basics to advanced.
              </p>
              <a href="#" className="text-yellow-600 font-medium hover:underline">
                Explore →
              </a>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <h3 className="font-semibold text-xl mb-3">Competitive Programming</h3>
              <p className="text-gray-600 mb-4">
                Master problem-solving techniques for contests and interviews.
              </p>
              <a href="#" className="text-yellow-600 font-medium hover:underline">
                Explore →
              </a>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <h3 className="font-semibold text-xl mb-3">Full Stack Dev</h3>
              <p className="text-gray-600 mb-4">
                Learn MERN stack development with industry-standard projects.
              </p>
              <a href="#" className="text-yellow-600 font-medium hover:underline">
                Explore →
              </a>
            </div>
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">What Our Students Say</h2>
          <p className="text-gray-600 mb-12">
            Hear from learners who transformed their careers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 rounded-xl bg-white shadow">
              <p className="text-gray-600 mb-4">
                "The mentorship program was a game-changer. I cracked my dream
                job interview thanks to BridgeLabs."
              </p>
              <h4 className="font-semibold">Amit Kumar</h4>
              <span className="text-sm text-gray-500">
                Software Engineer, Google
              </span>
            </div>
            <div className="p-6 rounded-xl bg-white shadow">
              <p className="text-gray-600 mb-4">
                "Hands-on projects gave me real confidence in coding. The mentors
                are very supportive!"
              </p>
              <h4 className="font-semibold">Sneha Verma</h4>
              <span className="text-sm text-gray-500">
                Backend Developer, Amazon
              </span>
            </div>
            <div className="p-6 rounded-xl bg-white shadow">
              <p className="text-gray-600 mb-4">
                "BridgeLabs bridges the gap between theory and practice. Truly a
                career accelerator!"
              </p>
              <h4 className="font-semibold">Ravi Singh</h4>
              <span className="text-sm text-gray-500">
                Full Stack Dev, Microsoft
              </span>
            </div>
          </div>
        </div>

        {/* CALL TO ACTION */}
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-gray-700 mb-8">
            Join thousands of learners advancing their tech careers with BridgeLabs.
          </p>
          <a
            href="#"
            className="bg-yellow-500 text-black px-8 py-3 rounded-md font-medium hover:bg-yellow-400 transition"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </section>
      <Footer/>
    </div>
  );
}
