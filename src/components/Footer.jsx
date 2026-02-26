"use client"
import { Phone, Linkedin, Github } from 'lucide-react'

export default function Footer() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <footer className="bg-black text-white">
      {/* Top Footer Row: avatar / centered nav / social icons */}
      <div className="py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-center justify-between">
          {/* Left: avatar + name */}
          <div className="flex items-center space-x-3 order-1 md:order-1">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-700">
              <img src="/portfolio.png" alt="avatar" className="w-full h-full object-cover" />
            </div>
        <span className="text-lg font-light italic" style={{ fontFamily: 'Kaushan Script, cursive' }}>Romanch Roshan Singh</span>
          </div>

          {/* Center: nav */}
          <nav className="mt-4 md:mt-0 order-3 md:order-2 w-full md:w-auto">
            <ul className="flex flex-wrap justify-center gap-8 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('projects');
                  }}
                  className="text-gray-300 hover:text-white"
                >
                  Projects
                </a>
              </li>
              <li><a href="#about" className="text-gray-300 hover:text-white">About me</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white">Contact me</a></li>
            </ul>
          </nav>

          {/* Right: social icons */}
          <div className="flex items-center gap-4 order-2 md:order-3">
            <a href="tel:+919155808901" aria-label="Call" className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/romanch11/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://github.com/codedpool" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800" />

      {/* Bottom Footer Bar */}
      <div className="py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4">
          <div className="text-gray-400 text-sm">Copyright 2026 ©romanchroshansingh</div>

          <div className="text-sm italic text-gray-300">small town kid with big ambitions</div>
        </div>
      </div>
    </footer>
  )
}
