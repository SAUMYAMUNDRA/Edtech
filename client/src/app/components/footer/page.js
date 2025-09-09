export default function Footer() {
  return (
    <footer className="bg-[#0a1a2f] text-gray-300 pt-12 pb-8 px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + About */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gray-100 flex justify-center items-center rounded">
              <span className="text-[#0a1a2f] font-bold text-lg">B</span>
            </div>
            <span className="font-bold text-2xl text-white">BridgeLabs</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Empowering learners with cutting-edge EdTech solutions.  
            From interactive courses to AI-powered career guidance,  
            we bridge the gap between knowledge and opportunity.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-400 transition">About Us</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">How It Works</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Courses</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Partners</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Careers</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-400 transition">Blog</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Case Studies</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Community</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Help Center</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Support</a></li>
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
            <button className="bg-yellow-400 text-black px-5 py-2 rounded-md font-medium hover:bg-yellow-300 transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} BridgeLabs. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex gap-5 text-gray-400">
          <a href="#" className="hover:text-yellow-400 transition">LinkedIn</a>
          <a href="#" className="hover:text-yellow-400 transition">Twitter</a>
          <a href="#" className="hover:text-yellow-400 transition">YouTube</a>
        </div>
      </div>
    </footer>
  );

