"use client";
import React from "react";

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center px-8 py-2 shadow bg-white font-bold text-xl">
      {/* Logo */}
      <div className="flex items-center gap-1">
        {/* Replace '/logo.png' with your image placed in the public folder, e.g., /my-logo.jpg */}
        <a href="/" className="flex items-center gap-1">
          <img
            src="/finallogo.png"
            alt="Site logo"
            className="h-30 w-80 object-contain rounded"
          />  

        </a>
      </div>

      {/* Nav Links */}
      <nav className="flex gap-6 text-gray-700">
        {["Home", "Mentorship", "For Universities","About"].map((item, idx) => (
          <a
            key={idx}
             href={item === "Mentorship" ? "/mentorship" : item==="Home" ? "/": item==="About" ? "/about": item=="For Universities"?"/university":"#"}
            className="hover:shadow-xl relative px-3 py-1 rounded-md hover:text-black hover:bg-yellow-400 transition-colors duration-200
              after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Right Side Buttons */}
      <div className="flex items-center gap-6">
        <a
          href="/contact"
          className="hover:shadow-xl relative px-3 py-1 rounded-md text-gray-700 hover:text-black hover:bg-yellow-400 transition-colors duration-200
            after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
        >
          Contact
        </a>
        <a
          href="/login"
          className="bg-yellow-400 text-black px-5 py-2.5 rounded-md font-medium shadow-xl"
        >
          Login
        </a>
      </div>
    </header>
  );
}
