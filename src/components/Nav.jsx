import { useState, useEffect } from "react";
import MagneticButton from "./MagneticButton";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full text-2xl md:text-sm font-bold px-4 md:px-20 z-50 transition-all duration-300  'bg-white backdrop-blur-md' : 'bg-transparent'
    }`}>
      {/* Desktop Navigation */}
      <div className="flex justify-between items-center  py-2">
       <img src="/images/Logo.svg" alt="Logo" className="h-16 rounded-2xl" />

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-white">
          <MagneticButton>
            <a href="#about" className="hover:text-gray-600 text-white transition-colors duration-300">
              About
            </a>
          </MagneticButton>

          <MagneticButton>
            <a href="#projects" className="hover:text-gray-600 text-white transition-colors duration-300">
              Projects
            </a>
          </MagneticButton>

          <MagneticButton>
            <a href="#contact" className="hover:text-gray-600 text-white transition-colors duration-300">
              Contact
            </a>
          </MagneticButton>
        </ul>
<button
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  className="md:hidden focus:outline-none z-50 p-2 rounded-full transition-all duration-200 hover:bg-white/10 active:bg-white/20"
  aria-label="Open menu"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-white"  
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
</button>
      </div>

      {/* Mobile Sidebar / Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72  backdrop-blur-md shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 text-white hover:text-gray-300 transition-all duration-300 z-50"
          aria-label="Close menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Sidebar Content */}
        <div className="p-6 flex flex-col gap-8 text-white mt-20">
          <MagneticButton>
            <a
              href="#about"
              className="text-3xl hover:text-blue-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href="#projects"
              className="text-3xl hover:text-blue-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href="#contact"
              className="text-3xl hover:text-blue-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
          </MagneticButton>

          {/* Social Media Links */}
          <div className="pt-8 border-t border-white/20 mt-24">
            <p className="text-sm text-white/70 mb-4">Follow Me</p>
            <div className="flex items-center grid grid-cols-4">
              <MagneticButton onClick={() => setIsMenuOpen(false)}>
                <a
                  href="https://github.com/Daniramdev" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center group"
                >
                  <FaGithub className="text-2xl transition-transform group-hover:scale-110" />
                  <span className="mt-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    GitHub
                  </span>
                </a>
              </MagneticButton>

              <MagneticButton onClick={() => setIsMenuOpen(false)}>
                <a
                  href="https://linkedin.com/in/dani-ramdani-4a5415285" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center group"
                >
                  <FaLinkedin className="text-2xl transition-transform group-hover:scale-110" />
                  <span className="mt-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    LinkedIn
                  </span>
                </a>
              </MagneticButton>

              <MagneticButton onClick={() => setIsMenuOpen(false)}>
                <a
                  href="https://instagram.com/danird_7/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center group"
                >
                  <FaInstagram className="text-2xl transition-transform group-hover:scale-110" />
                  <span className="mt-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Instagram
                  </span>
                </a>
              </MagneticButton>

              <MagneticButton onClick={() => setIsMenuOpen(false)}>
                <a
                  href="https://twitter.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center group"
                >
                  <FaTwitter className="text-2xl transition-transform group-hover:scale-110" />
                  <span className="mt-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Twitter
                  </span>
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Nav;