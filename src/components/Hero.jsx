import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useTransform, useScroll } from "framer-motion";
import MagneticButton from "./MagneticButton";
import RoundedButton from "./RoundedButton";

const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const [showButton, setShowButton] = useState(false);
  const { scrollYProgress } = useScroll();
  const yPos = useTransform(scrollYProgress, [0, 1], [0, -200]);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  const slideUp = {
    initial: { y: "100%", opacity: 0 },
    animate: (i) => ({
      y: "0%",
      opacity: 1,
      transition: { duration: 0.5, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  const floatingAnimation = {
    animate: {
      y: ["1%", "-10%", "0%"],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      className="hero bg-red-50 relative -mt-[80px] z-20 h-screen w-full flex justify-center items-center overflow-hidden font-sans"
    >
      {/* ✅ Background GIF */}
<div className="absolute inset-0 w-full h-full z-0 item-center justify-center flex pointer-events-none">
  <img
    src="bg.png"
    alt="Hero Background"
    className=" h-full"
  />
</div>


      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-indigo-500/20 z-10"
          style={{
            width: Math.random() * 10 + 5 + "px",
            height: Math.random() * 10 + 5 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
          }}
          animate={{
            y: [0, (Math.random() - 0.5) * 100],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Content */}
      <motion.div
        ref={ref}
        className="relative z-20 w-full max-w-6xl px-8 flex flex-col items-center"
        style={{ y: yPos }}
      >
        {/* Title */}
        <motion.div
          className="relative overflow-hidden"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-2 text-center"
            variants={{
              initial: { y: "100%" },
              animate: { y: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block">Dani Ramdani</span>
          </motion.h1>
          <motion.div
            className="absolute bottom-0 left-0 w-full h-1 bg-indigo-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-gray-800 text-center max-w-2xl py-2 mb-12"
          variants={slideUp}
          custom={1}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          Fullstack Developer & Designer crafting immersive digital experiences
        </motion.p>

        {/* CTA Button */}
        <motion.div
          variants={slideUp}
          custom={2}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          <MagneticButton>
            <RoundedButton onClick={scrollToContact}>
              <span className="relative z-10">Hire Me Now</span>
              <motion.span
                className="absolute inset-0 bg-indigo-600 py-2 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </RoundedButton>
          </MagneticButton>
        </motion.div>

        {/* Scroll Indicator */}
        {!showButton && (
          <motion.div
            className="absolute bottom-10 flex flex-col items-center py-2"
            variants={floatingAnimation}
            animate="animate"
          >
            <span className="text-sm mb-2 text-gray-500/70">Scroll down</span>
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 10L12 15L17 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Back to Top Button */}
      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-40 "
        >
          <MagneticButton>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="bg-gradient-to-br from-indigo-500 to-purple-600 text-gray-900 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 15L12 9L6 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <motion.span
                className="absolute inset-0 bg-white opacity-10"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0, 0.1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </button>
          </MagneticButton>
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection;
