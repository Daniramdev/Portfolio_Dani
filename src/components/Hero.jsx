import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useTransform, useScroll } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial } from "@react-three/drei";
import MagneticButton from "./MagneticButton";
import RoundedButton from "./RoundedButton";

const Blob = ({ color = "", emissive = "", position = [0, 0, 0], scale = 1 }) => {
  return (
    <mesh position={position} scale={[scale, scale, scale]}>
      <sphereGeometry args={[1, 128, 128]} /> {/* Meningkatkan detail geometri */}
      <MeshDistortMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={1.2} // Lebih terang
        roughness={0.1} // Sedikit lebih kasar untuk efek metalik
        metalness={1.0} // Metalik maksimal
        distort={0.6} // Distorsi lebih kuat
        speed={3.0} // Animasi lebih cepat
        clearcoat={1}
        clearcoatRoughness={0.1}
        envMapIntensity={2.0} // Refleksi lingkungan lebih kuat
        transparent
        opacity={0.95}
        wireframe={false} // Pastikan wireframe mati
        // Tambahan parameter untuk efek lebih ekstrim
        refractionRatio={0.8}
        ior={1.5}
        specularColor="#ffffff"
        specularIntensity={1}
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
  const [isMobile, setIsMobile] = useState(false);
  const [hoverStates, setHoverStates] = useState({
    title: false,
    subtitle: false,
    button: false,
    scrollIndicator: false
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
      <section className="relative z-20 h-screen w-full flex justify-center items-center bg-neutral-950 overflow-hidden">
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

        {/* Responsive 3D Canvas */}
        <motion.div 
          className="absolute inset-0 z-10"
          whileHover={{ opacity: isMobile ? 1 : 0.9 }} // Disable hover effect on mobile
          transition={{ duration: 0.3 }}
        >
         <Canvas 
  camera={{ 
    position: [0, 0, isMobile ? 6 : 4], // Kamera lebih dekat
    fov: isMobile ? 70 : 50 // Field of view lebih lebar
  }}
  performance={{ min: 0.8 }} // Prioritas performa
  gl={{
    antialias: true,
    powerPreference: "high-performance"
  }}
>
  <ambientLight intensity={1.0} /> {/* Cahaya lebih terang */}
  <pointLight position={[10, 10, 10]} intensity={3} color="#22d3ee" />
  <pointLight position={[-10, -10, -10]} intensity={3} color="#3b82f6" />
  <directionalLight position={[5, 5, 5]} intensity={2.5} />
  
  <Blob 
    position={[0, 0, 0]} 
    scale={isMobile ? 1.5 : 2.0} // Lebih besar
    color="#3b82f6"
    emissive="#22d3ee"
  />
  
  <OrbitControls 
    enableZoom={false}
    enablePan={false}
    enableRotate={!isMobile}
    autoRotate={!isMobile} // Rotasi otomatis
    autoRotateSpeed={5} // Rotasi lebih cepat
    rotateSpeed={1.5} // Respons rotasi lebih cepat
  />
</Canvas>
        </motion.div>

        {/* Content */}
        <motion.div
          ref={ref}
          className="relative z-20 w-full p-0 max-w-full px-4 md:px-8 flex flex-col items-center"
          style={{ y: yPos }}
        >
          <motion.div 
            className="relative overflow-hidden" 
            initial="initial" 
            animate={isInView ? "animate" : "initial"}
            onHoverStart={() => !isMobile && setHoverStates({...hoverStates, title: true})}
            onHoverEnd={() => !isMobile && setHoverStates({...hoverStates, title: false})}
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4 text-white tracking-tighter px-4 text-center"
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
              className="h-px bg-gradient-to-r from-cyan-400/20 via-cyan-400 to-transparent mx-auto"
              whileInView={{ scaleX: [0, 1] }}
              whileHover={{ scaleX: isMobile ? [1,1] : [1, 1.2, 1], opacity: isMobile ? [1,1] : [1, 0.8, 1] }}
              transition={{ duration: 1 }}
            />
          </motion.div>

          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-white/90 text-center max-w-2xl py-2 px-4"
            style={{ 
              fontWeight: 400,
              letterSpacing: '0.02em'
            }}
            variants={slideUp}
            custom={1}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            whileHover={{
              textShadow: isMobile ? "none" : "0 0 10px rgba(255, 255, 255, 0.7)",
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
            whileHover={{ scale: isMobile ? 1 : 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <MagneticButton>
              <RoundedButton 
                onClick={scrollToContact}
                whileHover={{
                  boxShadow: isMobile ? "none" : "0 0 20px rgba(34, 211, 238, 0.8)",
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

        {/* Enhanced Scroll Indicator */}
        {!showButton && (
          <motion.div
            className="absolute bottom-10 text-white flex flex-col items-center py-2 cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            whileHover={{ 
              scale: isMobile ? 1 : 1.1,
              color: "#22d3ee",
              transition: { duration: 0.3 }
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            onClick={() => window.scrollBy({ top: window.innerHeight - 100, behavior: 'smooth' })}
          >
            <motion.span 
              className="text-sm mb-2"
              whileHover={{ textShadow: isMobile ? "none" : "0 0 8px rgba(34, 211, 238, 0.8)" }}
            >
              Scroll down
            </motion.span>
            <motion.svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none"
              whileHover={{ scale: isMobile ? 1 : 1.2 }}
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

        {/* Back to Top Button */}
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-40"
            whileHover={{ scale: isMobile ? 1 : 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <MagneticButton>
              <motion.button
                onClick={scrollToTop}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white p-3 rounded-full"
                whileHover={{
                  boxShadow: isMobile ? "none" : "0 0 20px rgba(34, 211, 238, 0.8)",
                  scale: isMobile ? 1 : 1.1,
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