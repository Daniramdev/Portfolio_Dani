import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const ContactSection = () => {
  const sectionRef = useRef();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

 
  // Floating blob component
  const Blob = () => (
    <Sphere args={[1, 64, 64]} scale={1.5}>
      <MeshDistortMaterial
        color="#3b82f6"
        emissive="#3b82f6"
        emissiveIntensity={0.5}
        distort={0.4}
        speed={2}
        transparent
        opacity={0.8}
      />
    </Sphere>
  );

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen w-full bg-neutral-950 flex items-center justify-center px-4 md:px-8 overflow-hidden"
    >
      {/* 3D Background Element */}


      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto relative z-10 w-full py-20">
        {/* Section header */}
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl text-transparent font-bold bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Get in Touch
          </motion.h2>
                <motion.div
                        className="h-px bg-gradient-to-r from-cyan-400/20 via-cyan-400 to-transparent ml-4"
                        whileInView={{ scaleX: [0, 1] }}
                        whileHover={{ scaleX: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                        transition={{ duration: 1 }}
                      />
                    </motion.div>
     

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left column - Contact form */}
          <motion.div
            className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-medium text-white mb-8">Send me a message</h3>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm text-white/80 mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm text-white/80 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm text-white/80 mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows="5"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                  placeholder="Hello, I'd like to talk about..."
                ></textarea>
              </div>
              
              <motion.button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Right column - Contact info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Contact info card */}
            <motion.div 
              className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-medium text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                {/* Email */}
                <motion.a
                  href="mailto:danird1240@gmail.com"
                  className="flex items-start gap-4 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="bg-blue-500/10 p-3 rounded-lg text-blue-400">
                    <FiMail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Email</p>
                    <p className="text-white group-hover:text-blue-400 transition-colors">danird1240@gmail.com</p>
                  </div>
                </motion.a>

                {/* Phone */}
                <motion.a
                  href="tel:+62881012804615"
                  className="flex items-start gap-4 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="bg-blue-500/10 p-3 rounded-lg text-blue-400">
                    <FiPhone size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Phone</p>
                    <p className="text-white group-hover:text-blue-400 transition-colors">+62 881-0128-04615</p>
                  </div>
                </motion.a>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg text-blue-400">
                    <FiMapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Location</p>
                    <p className="text-white">Majalaya, Bandung, Indonesia</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social media */}
            <motion.div 
              className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-medium text-white mb-6">Connect with me</h3>
              
              <div className="flex gap-4">
                {[
                  { icon: <FaGithub size={20} />, url: "https://github.com" },
                  { icon: <FaLinkedin size={20} />, url: "https://linkedin.com" },
                  { icon: <FaTwitter size={20} />, url: "https://twitter.com" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-lg text-white transition-colors"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div 
          className="mt-24 pt-8 border-t border-white/10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >  
        <div className='items-center grap-3 justify-center flex gap-3'>
        <img src="/images/logo.png" alt="Logo" className="md:h-20 h-10" />
          <p className="text-transparent font-bold bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 md:text-8xl text-5xl">
          Dani Ramdani
          </p>
          </div> 
          <p className="text-white/50 xl">
            © {new Date().getFullYear()} 
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;