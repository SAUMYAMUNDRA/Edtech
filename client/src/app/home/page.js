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
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center px-8 py-16 gap-8">
        {/* Left Content */}
        <div>
          <div className="text-sm text-gray-500 mb-2">
            Industry • Universities • Curriculum
          </div>
          <h1 className="text-4xl font-bold leading-snug text-gray-900 mb-6">
            Bridging Industry & <br /> Academia
          </h1>
          <p className="text-gray-600 mb-8">
            Connect top industrial mentors with universities to deliver
            practical, rigorous courses in DSA, Competitive Programming and
            Computer Science fundamentals — built for real-world hiring outcomes.
          </p>

          <div className="flex gap-4">
            <a
              href="#"
              className="bg-gray-900 text-white px-5 py-3 rounded-md font-medium"
            >
              Get Started
            </a>
            <a
              href="#"
              className="border px-5 py-3 rounded-md font-medium text-gray-700 hover:bg-gray-50"
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
            className="rounded-lg"
          />
        </div>
      </section>
      
    </div>
  );
}
