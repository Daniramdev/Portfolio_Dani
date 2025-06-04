import { useState } from "react";
import MagneticButton from "./MagneticButton";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="text-2xl md:text-sm font-bold px-4 md:px-20 py-4 z-50 relative font-Poppins">
      {/* Desktop Navigation */}
      <div className="flex justify-between items-center">
        <img src="/images/logo.png" alt="Logo" className="h-10" />

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-black">
          <MagneticButton>
            <a href="#about" className="hover:text-gray-600 transition-colors duration-300">
              About
            </a>
          </MagneticButton>

          <MagneticButton>
            <a href="#project" className="hover:text-gray-600 transition-colors duration-300">
              Project
            </a>
          </MagneticButton>

          <MagneticButton>
            <a href="#contact" className="hover:text-gray-600 transition-colors duration-300">
              Contact
            </a>
          </MagneticButton>
        </ul>

      {/* Hamburger Button for Mobile */}
<button
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  className="md:hidden focus:outline-none z-50"
  aria-label="Open menu"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-black"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    {/* Ikon hamburger (☰) permanen */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
</button>
      </div>

      {/* Mobile Sidebar / Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-gray-900/95 backdrop-blur-md shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Tombol Close X - HANYA SATU DAN FIXED */}
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

        {/* Konten Sidebar */}
        <div className="p-6 flex flex-col gap-8 text-white mt-20">
          <MagneticButton>
            <a
              href="#about"
              className="text-2xl hover:text-blue-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href="#project"
              className="text-2xl hover:text-blue-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Project
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href="#contact"
              className="text-2xl hover:text-blue-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
          </MagneticButton>

          {/* Footer with Social Media Icons */}
          <div className="pt-8 border-t border-white/20 mt-20">
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