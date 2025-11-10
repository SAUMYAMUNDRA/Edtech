"use client";
import React from "react";
import { motion } from "framer-motion";
import Header from "../components/header/page";
import Footer from "../components/footer/page";

export default function ContactUs() {
  return (
    <>
      <Header />
      <div className="relative  bg-[#fcf6f1] text-black ">
        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row max-w-6xl mx-auto px-6 py-16 gap-10">
          {/* Left Section */}
          <motion.div
            className="flex-1 space-y-10"
            
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-extrabold uppercase">Contact Us</h1>

            {/* Call Us */}
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="text-yellow-500 text-2xl">📞</span> Call 
              </h2>
              <p className="mt-2">+91 96509 00492</p>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="text-yellow-500 text-2xl">📍</span> Location
              </h2>
              <p className="mt-2">Delhi</p>
            </div>

            {/* Business Hours */}
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="text-yellow-500 text-2xl">⏰</span> Business Hours
              </h2>
              <p className="mt-2">
                Mon – Fri .... 10 am – 8 pm, Sat, Sun .... Closed
              </p>
            </div>
          </motion.div>

          {/* Right Section (Form) */}
          <motion.div
            className="flex-1 bg-transparent space-y-5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold">Email</label>
                <input
                  type="email"
                  placeholder="Enter a valid email address"
                  className="w-full border-b border-gray-400 bg-transparent py-2 focus:outline-none 
                             transition-all duration-300 ease-in-out hover:border-yellow-500 focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="block font-semibold">Name</label>
                <input
                  type="text"
                  placeholder="Enter your Name"
                  className="w-full border-b border-gray-400 bg-transparent py-2 focus:outline-none
                             transition-all duration-300 ease-in-out hover:border-yellow-500 focus:border-yellow-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold">Address</label>
              <input
                type="text"
                placeholder="Enter your address"
                className="w-full border-b border-gray-400 bg-transparent py-2 focus:outline-none
                           transition-all duration-300 ease-in-out hover:border-yellow-500 focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="block font-semibold">Message</label>
              <textarea
                placeholder="Enter your message"
                rows={3}
                className="w-full border-b border-gray-400 bg-transparent py-2 focus:outline-none
                           transition-all duration-300 ease-in-out hover:border-yellow-500 focus:border-yellow-500"
              />
            </div>

            {/* Button with animation */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-400 hover:bg-yellow-600 text-black font-bold px-10 py-3 rounded-full mt-3 
                         shadow-xl transition duration-300"
            >
              SUBMIT
            </motion.button>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
