import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useTransform, useScroll } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial } from "@react-three/drei";
import MagneticButton from "./MagneticButton";
import RoundedButton from "./RoundedButton";

const Blob = ({ color = "", emissive = "", position = [0, 0, 0], scale = [1, 1, 1] }) => {
  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[2, 100, 100]} />
      <MeshDistortMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.6}
        roughness={0.05}
        metalness={0.9}
        distort={0.4}
        speed={2}
        clearcoat={1}
        clearcoatRoughness={0.05}
        envMapIntensity={2}
        transparent
        opacity={0.92}
      />
    </mesh>
  );
};

const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const { scrollYProgress } = useScroll();
  const yPos = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const [showButton, setShowButton] = useState(false);
  const [hoverStates, setHoverStates] = useState({
    title: false,
    subtitle: false,
    button: false,
    scrollIndicator: false
  });

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
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

  return (
    <>
      <section className="relative z-20 h-screen w-full flex justify-center items-center bg-neutral-950">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 overflow-hidden z-0 h-screen">
          <div className="absolute inset-0 h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-950/70 via-neutral-950 to-neutral-950" />
          <div className="absolute inset-0 h-full w-full opacity-20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-neutral-800" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        {/* 3D Canvas with hover effect */}
        <motion.div 
          className="absolute inset-0 z-10"
          whileHover={{ opacity: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <Canvas camera={{ position: [1, 0, 6] }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[0, 0, 5]} intensity={3} />
            <directionalLight position={[5, 5, 5]} intensity={2} />
            <Blob position={[-0.2, 0.1, -1, -5]} scale={[1.5, 1.5, 1.5]} />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </motion.div>

        {/* Content with enhanced hover effects */}
        <motion.div
          ref={ref}
          className="relative z-20 w-full p-0 max-w-full px-8 flex flex-col items-center"
          style={{ y: yPos }}
        >
          <motion.div 
            className="relative overflow-hidden" 
            initial="initial" 
            animate={isInView ? "animate" : "initial"}
            onHoverStart={() => setHoverStates({...hoverStates, title: true})}
            onHoverEnd={() => setHoverStates({...hoverStates, title: false})}
          >
            <motion.h1
              className="text-5xl md:text-8xl font-bold mb-4 text-white tracking-tighter"
              style={{ 
                fontWeight: 700,
                letterSpacing: '-0.05em',
              }}
              variants={{ 
                initial: { y: "100%" }, 
                animate: { y: 0 },
                hover: { 
                  textShadow: "0 0 20px rgba(34, 211, 238, 0.8)",
                  transition: { duration: 0.3 }
                }
              }}
              animate={hoverStates.title ? "hover" : isInView ? "animate" : "initial"}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Dani <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Ramdani</span>
            </motion.h1>
            <motion.div
              className="h-px bg-gradient-to-r from-cyan-400/20 via-cyan-400 to-transparent ml-4"
              whileInView={{ scaleX: [0, 1] }}
              whileHover={{ scaleX: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
              transition={{ duration: 1 }}
            />
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-white/90 text-center max-w-2xl py-2"
            style={{ 
              fontWeight: 400,
              letterSpacing: '0.02em'
            }}
            variants={slideUp}
            custom={1}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            whileHover={{
              textShadow: "0 0 10px rgba(255, 255, 255, 0.7)",
              color: "rgba(255, 255, 255, 1)",
              transition: { duration: 0.3 }
            }}
          >
            Fullstack Web Developer | Python & React Specialist
          </motion.p>

          <motion.div
            variants={slideUp}
            custom={2}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <MagneticButton>
              <RoundedButton 
                onClick={scrollToContact}
                whileHover={{
                  boxShadow: "0 0 20px rgba(34, 211, 238, 0.8)",
                  background: "linear-gradient(to right, #22d3ee, #3b82f6)"
                }}
              >
                <span 
                  className="relative z-10"
                  style={{ 
                    fontWeight: 500 
                  }}
                >
                  Hire Me Now
                </span>
              </RoundedButton>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Enhanced Scroll Indicator with hover */}
        {!showButton && (
          <motion.div
            className="absolute bottom-10 text-white flex flex-col items-center py-2 cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            whileHover={{ 
              scale: 1.1,
              color: "#22d3ee",
              transition: { duration: 0.3 }
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            onClick={() => window.scrollBy({ top: window.innerHeight - 100, behavior: 'smooth' })}
          >
            <motion.span 
              className="text-sm mb-2"
              whileHover={{ textShadow: "0 0 8px rgba(34, 211, 238, 0.8)" }}
            >
              Scroll down
            </motion.span>
            <motion.svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none"
              whileHover={{ scale: 1.2 }}
            >
              <path 
                d="M7 10L12 15L17 10" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </motion.svg>
          </motion.div>
        )}

        {/* Back to Top Button (icon only) */}
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-40"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <MagneticButton>
              <motion.button
                onClick={scrollToTop}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white p-3 rounded-full"
                whileHover={{
                  boxShadow: "0 0 20px rgba(34, 211, 238, 0.8)",
                  scale: 1.1,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            </MagneticButton>
          </motion.div>
        )}
      </section>
    </>
  );
};

export default HeroSection;