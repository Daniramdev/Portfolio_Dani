import React, { useState, useEffect } from 'react';
import MagneticButton from './MagneticButton';
import { FaGithub, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function ContactSection() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", { hour12: false }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleEmailClick = () => {
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=info@danird1240.com', '_blank');
  };

  return (
    <section id="contact" className="bg-gray-900 text-gray-300 py-3 px-4">
      {/* Contact Content */}
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className=" pt-8 pb-12">
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            {/* Image Card */}
            <div className="relative w-40 md:w-40 h-60 mb-6 md:mb-0 rounded-lg overflow-hidden bg-gray-700 shadow-lg">
              <img src="/bg.png" alt="Collaborative workspace" className="w-40 h-60 object-cover" />
            </div>

            {/* Text Section */}
            <div className="text-center md:text-left max-w-xl">
              <h2 className="text-2xl font-semibold tracking-wider">
                "Together, we can turn your innovative ideas into success."
              </h2>
              <p className="mt-2 text-sm">"Let's work side by side."</p>
            </div>
          </div>

          {/* Location and Time */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4">
            <div className="flex flex-col items-center md:items-start text-sm">
              <span>Majalaya | Bandung</span>
              <span>{time} GMT{new Date().getTimezoneOffset() / -60}</span>
            </div>

            {/* Email & Phone Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
              <MagneticButton>
                <div 
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-4 rounded-full cursor-pointer transition duration-300"
                  onClick={handleEmailClick}
                >
                  <p className="text-sm">danird1240@gmail.com</p>
                </div>
              </MagneticButton>

              <MagneticButton>
                <div className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-4 rounded-full cursor-pointer transition duration-300">
                  <p className="text-sm">+62 881-012-804-615</p>
                </div>
              </MagneticButton>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center md:justify-end mt-4  gap-4 px-3">
            <a href="https://github.com/Daniramdev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300" aria-label="GitHub">
              <FaGithub size={24} />
            </a>
            <a href="https://facebook.com/dani.ramadhan.90475" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors duration-300" aria-label="Facebook">
              <FaFacebook size={24} />
            </a>
            <a href="https://instagram.com/danird_7" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors duration-300" aria-label="Instagram">
              <FaInstagram size={24} />
            </a>
            <a href="https://linkedin.com/in/dani-ramdani-4a5415285" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors duration-300" aria-label="LinkedIn">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        {/* Footer Section */}
        <footer className=" pt-4 border-t border-gray-700 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Dani Ramdani • All rights reserved</p>
         
        </footer>
      </div>
    </section>
  );
}