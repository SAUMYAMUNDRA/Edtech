export default function Footer(){
    return(
<footer className="w-full flex justify-between items-center px-10 py-5 border-b bg-white font-bold">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-900 flex justify-center items-center rounded">
          <span className="text-yellow-400 font-bold">-</span>
        </div>
        <span className="font-bold text-xl">BridgeLabs</span>
      </div>

      {/* Nav Links */}
     <nav className="flex gap-10 text-gray-700">
  <a
    href="#"
    className="relative hover:text-black after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
  >
    About
  </a>
  <a
    href="#"
    className="relative hover:text-black after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
  >
    How It Works
  </a>
  <a
    href="#"
    className="relative hover:text-black after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
  >
    Benefits
  </a>
  <a
    href="#"
    className="relative hover:text-black after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
  >
    Partners
  </a>
</nav>


      {/* Right Side Buttons */}
      <div className="flex items-center gap-6">
        <a href="#" className="text-gray-700 relative hover:text-black after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full">
          Contact
        </a>
        <a
          href="#"
          className="bg-yellow-400 text-black px-5 py-2.5 rounded-md font-medium"
        >
          Get Started
        </a>
      </div>
    </footer>
    )
}