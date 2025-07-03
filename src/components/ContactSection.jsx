import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import { FaGithub, FaFacebook, FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';

export default function ContactSection() {
  const [time, setTime] = useState("");
  const [isHovered, setIsHovered] = useState(false);

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
    window.open('mailto:danird1240@gmail.com', '_blank');
  };

  const handlePhoneClick = () => {
    window.open('tel:+62881012804615', '_blank');
  };

  const socialLinks = [
    { icon: <FaGithub size={24} />, url: "", color: "hover:text-gray-300" },
    { icon: <FaFacebook size={24} />, url: "https://facebook.com/dani.ramadhan.90475", color: "hover:text-blue-500" },
    { icon: <FaInstagram size={24} />, url: "https://instagram.com/danird_7", color: "hover:text-pink-500" },
    { icon: <FaLinkedin size={24} />, url: "https://linkedin.com/in/dani-ramdani-4a5415285", color: "hover:text-blue-600" }
  ];

  return (
    <section id="contact" className="relative bg-gray-950 text-gray-300 py-16 px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-900/10 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-purple-900/10 rounded-full filter blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div 
          className="pt-8 pb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center lg:flex-row lg:justify-between gap-12">
            {/* Image Card with 3D effect */}
            <motion.div 
              className="relative w-64 h-80 rounded-2xl overflow-hidden bg-gray-900  shadow-2xl border border-gray-800"
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <img 
                src="/bg.png" 
                alt="Collaborative workspace" 
                className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white text-sm font-medium">Let's create something amazing</span>
              </div>
            </motion.div>

            {/* Text Section */}
            <div className="text-center lg:text-left max-w-2xl">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                Let's Build Something Extraordinary
              </motion.h2>
              
              <motion.p 
                className="text-lg text-gray-400 mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                I'm passionate about turning innovative ideas into successful digital experiences. 
                Whether you have a project in mind or just want to connect, I'd love to hear from you.
              </motion.p>

              {/* Location and Time */}
              <motion.div 
                className="flex items-center gap-4 justify-center lg:justify-start mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
              >
                <IoLocationSharp className="text-blue-400 text-xl" />
                <div className="text-sm">
                  <p>Majalaya, Bandung, Indonesia</p>
                  <p className="text-gray-500">{time} GMT+7</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Contact Buttons */}
          <motion.div 
            className="flex flex-col md:flex-row justify-center gap-6 mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: true }}
          >
            <MagneticButton>
              <motion.div 
                className="flex items-center  justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white px-8 py-4 rounded-full cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={handleEmailClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEnvelope className="text-xl" />
                <span className="text-sm md:text-base text-center">danird1240@gmail.com</span>
              </motion.div>
            </MagneticButton>

            <MagneticButton>
              <motion.div 
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white px-8 py-4 rounded-full cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={handlePhoneClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPhone className="text-xl" />
                <span className="text-sm md:text-base text-center">+62 881-012-804-615</span>
              </motion.div>
            </MagneticButton>
          </motion.div>

          {/* Social Media Icons */}
          <motion.div 
            className="flex justify-center gap-8 mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-500 hover:text-white transition-colors duration-300 ${social.color} p-3 rounded-full bg-gray-900/50 hover:bg-gray-800/50`}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.icon.type.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Footer Section */}
        <motion.footer 
          className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          viewport={{ once: true }}
        >
          <p>&copy; {new Date().getFullYear()} Dani Ramdani • All rights reserved</p>
          <p className="mt-2 text-xs text-gray-600">Crafted with passion and attention to detail</p>
        </motion.footer>
      </div>
    </section>
  );
}