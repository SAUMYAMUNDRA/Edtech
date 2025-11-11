"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // lightweight icon set

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Mentorship", href: "/mentorship" },
    { label: "For Universities", href: "/university" },
    { label: "About", href: "/about" },
  ];

  return (
    <header className="w-full bg-white/90 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6  flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img
                      src="/finallogo.png"
            alt="Site logo"
            className=" w-52 h-25 object-contain rounded"
          />


        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 font-semibold text-gray-700 text-base lg:text-lg">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative px-3 py-1 rounded-md hover:text-black hover:bg-yellow-400 transition-colors duration-200
              after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-5 font-semibold text-base lg:text-lg">
          <a
            href="/contact"
            className="relative px-3 py-1 rounded-md text-gray-700 hover:text-black hover:bg-yellow-400 transition-colors duration-200
            after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
          >
            Contact
          </a>
          <a
            href="/login"
            className="bg-yellow-400 text-black px-6 py-2.5 rounded-md font-medium shadow-md hover:bg-yellow-300 transition-all duration-200 text-base lg:text-lg"
          >
            Login
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-800 hover:text-black transition p-2 rounded-md"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md animate-slideDown">
          <div className="flex flex-col px-5 py-4 space-y-3 font-medium text-gray-800 text-base">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="px-3 py-2 rounded-md hover:bg-yellow-100 hover:text-black transition-colors"
              >
                {item.label}
              </a>
            ))}
            <hr className="border-gray-200" />
            <a
              href="/contact"
              onClick={closeMenu}
              className="px-3 py-2 rounded-md hover:bg-yellow-100 hover:text-black transition-colors"
            >
              Contact
            </a>
            <a
              href="/login"
              onClick={closeMenu}
              className="text-center bg-yellow-400 text-black px-4 py-2 rounded-md font-medium shadow-md hover:bg-yellow-300 transition-all duration-200"
            >
              Login
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
