
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Hero() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 relative z-10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
            <Image
              src="/portfolio.png"
              alt="Romanch Roshan Singh"
              width={32}
              height={32}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="text-lg md:text-2xl font-light italic" style={{ fontFamily: 'Kaushan Script, cursive' }}>Romanch Roshan Singh</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8 text-sm">
          <button 
            onClick={() => scrollToSection('projects')} 
            className="hover:text-gray-300 transition-colors cursor-pointer"
          >
            Projects
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="hover:text-gray-300 transition-colors cursor-pointer"
          >
            About me
          </button>
          <button 
            onClick={() => scrollToSection('experience')} 
            className="hover:text-gray-300 transition-colors cursor-pointer"
          >
            Experience
          </button>
          <Link href="https://dev.to/codedpool" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
            Blog
          </Link>
          {/* <Link href="#faq" className="hover:text-gray-300 transition-colors">
            FAQ
          </Link> */}
          <Button 
            variant="secondary"
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md"
            onClick={() => scrollToSection('contact')}
          >
            Contact me
          </Button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <p className="text-2xl md:text-4xl font-light italic mb-4" style={{ fontFamily: 'Kaushan Script, cursive' }}>Romanch Roshan Singh</p>
              <h1 className="text-4xl md:text-6xl font-light leading-tight mb-6">
                Your All-Rounder<br />
                Problem Solver
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
               Full-Stack Developer focused on backend systems, real-time infrastructure, and AI integration.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <Button 
                variant="secondary" 
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md"
                onClick={() => scrollToSection('contact')}
              >
                Contact me
              </Button>
              <Button 
                variant="ghost" 
                className="text-white border border-gray-600 hover:bg-gray-800 px-6 py-3 rounded-md"
                asChild
              >
                <a href={process.env.NEXT_PUBLIC_RESUME_URL} target="_blank" rel="noopener noreferrer">View Resume</a>
              </Button>
            </div>
          </div>

          {/* Right Content - Portrait */}
          <div className="relative">
            {/* Portrait Image */}
            <div className="relative z-10 flex justify-center">
              <Image
                src="/portfolio.png"
                alt="Romanch Roshan Singh - Full Stack Developer"
                width={600}
                height={800}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Additional geometric elements for visual interest */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white opacity-30 rounded-full"></div>
      <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-white opacity-50 rounded-full"></div>
    </section>
  )
}
