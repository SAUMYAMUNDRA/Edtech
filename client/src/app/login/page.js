"use client";
import React from "react";
import { motion } from "framer-motion";
import Header from "../components/header/page";
import Footer from "../components/footer/page";

export default function Login() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Keep your original background */}
      <main className="flex flex-1 items-center justify-center bg-[#fcf6f1] px-4 py-12 relative">
        {/* Glassmorphism Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="backdrop-blur-xl bg-white/80 shadow-2xl rounded-2xl w-full max-w-md p-8 border border-gray-200 relative overflow-hidden"
        >
          {/* Animated Heading */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-extrabold text-center bg-gradient-to-r from-[#0a1a2f] via-gray-700 to-[#0a1a2f] bg-clip-text text-transparent mb-8 animate-gradient-text"
          >
            Login
          </motion.h2>

          {/* Login Form */}
          <form className="space-y-6">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#0a1a2f] mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0a1a2f] focus:border-transparent transition-all duration-300"
              />
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#0a1a2f] mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0a1a2f] focus:border-transparent transition-all duration-300"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full py-3 rounded-lg relative group overflow-hidden font-semibold text-lg text-white bg-[#0a1a2f]"
            >
              <span className="relative z-10">Login</span>
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-[#0a1a2f] opacity-0 group-hover:opacity-100 transition duration-500"></span>
            </motion.button>
          </form>

          {/* Links */}
          <motion.div
            className="flex justify-between mt-6 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <a href="#" className="text-[#0a1a2f] relative group">
              Forgot Password?
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#0a1a2f] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="text-[#0a1a2f] relative group">
              Register
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#0a1a2f] transition-all duration-300 group-hover:w-full"></span>
            </a>
          </motion.div>
        </motion.div>
      </main>

      <Footer />

      {/* Gradient text animation */}
      <style jsx global>{`
        .animate-gradient-text {
          background-size: 200% auto;
          animation: gradient-text 3s linear infinite;
        }
        @keyframes gradient-text {
          to {
            background-position: 200% center;
          }
        }
      `}</style>
    </div>
  );
}
