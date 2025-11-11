import React from 'react';
import SocialMediaButtons from '../buttons/SocialMediaButtons.jsx';
import Link from "next/link";
// import { useRouter } from "next/navigation"
export default function Footer() {
  // const router = useRouter();

  return (
    <footer className="bg-[#0a1a2f] text-gray-300 pt-10 pb-6 px-8 text-base">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + About */}
        <div>
          <div className="flex items-center gap-2 mb-4">
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Empowering learners with cutting-edge EdTech solutions.  
            From interactive sessions to AI-powered career guidance,  
            we bridge the gap between knowledge and opportunity.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
         <ul className="space-y-2">
  <li>
    <Link href="/about" className="hover:text-yellow-400 transition">
      About Us
    </Link>
  </li>
  <li>
    <Link href="/mentorship" className="hover:text-yellow-400 transition">
      Mentorship
    </Link>
  </li>
  <li>
    <Link href="/" className="hover:text-yellow-400 transition">
      Home
    </Link>
  </li>
</ul>

        </div>

       

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Stay Updated</h3>
          <p className="text-gray-400 text-sm mb-4">
            Subscribe to get the latest EdTech trends, updates, and offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-200 border border-gray-600 focus:outline-none focus:border-yellow-400"
            />
            <button className="bg-yellow-400 text-black px-4 py-2 rounded-md font-medium hover:bg-yellow-300 transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-8 pt-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()}  All rights reserved.
        </p>

        {/* Social Media Buttons */}
        <div className="flex gap-5">
          {/* Using SocialMediaButtons component */}
          <SocialMediaButtons />
        </div>
      </div>
    </footer>
  );
}
