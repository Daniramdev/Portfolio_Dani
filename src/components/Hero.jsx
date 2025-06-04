import React, { useRef, useState, useEffect } from "react";
import { motion,useInView } from "framer-motion";
import MagneticButton from "./MagneticButton";
import RoundedButton from "./RoundedButton";
import LogoAnimation from "./LogoAnimation";

const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const [showButton, setShowButton] = useState(false);

  // Toggle tombol back-to-top
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll ke atas
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Scroll ke contact
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      alert("Section 'contact' not found!");
    }
  };

  // Variants untuk animasi slide-up
  const slideUp = {
    initial: { y: "100%", opacity: 0 },
    animate: (i) => ({
      y: "0%",
      opacity: 1,
      transition: { duration: 0.4, delay: 0.2 * i },
    }),
    closed: { y: "50%", opacity: 0, transition: { duration: 0.4 } },
  };

  return (
    <section
      className="hero relative bg-center -mt-[86px] z-20 h-screen w-full flex  justify-center items-center text-center"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize:"30rem"
      }}
    >
      {/* Konten Utama */}
      <div ref={ref} className="relative z-10 ml-50">
        {/* Panah Animasi - Tampil hanya saat belum scroll */}
        {!showButton && (
          <motion.div
            className="h-10 w-10 flex items-center justify-center mb-4 ml-20 "
            variants={slideUp}
            custom={0}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mt-60 md:mt-[16rem] text-black drop-shadow-md rotate-[-42deg]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        )}

        {/* Nama */}
        <motion.h1
          className="text-xl font-bold md:mt-[8rem] mt-32 text-black text-opacity-80 ml-3 "
          variants={slideUp}
          custom={1}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          I'm Dani Ramdani
        </motion.h1>

        {/* Tombol Hire Me */}
        <MagneticButton>
          <motion.div
            className="w-full h-10 text-xl flex items-center font-bold justify-center ml-3 "
            variants={slideUp}
            custom={2}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
          >
            <RoundedButton onClick={scrollToContact}>
              Hire Me Now
            </RoundedButton>
          </motion.div>
        </MagneticButton>
      </div>

      {/* Logo Animation di pojok kanan bawah */}
      <div className="absolute bottom-10 right-10 md:right-20 md:bottom-20">
        <LogoAnimation />
      </div>

      {/* Back to Top Button */}
      {showButton && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <MagneticButton>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </MagneticButton>
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection;