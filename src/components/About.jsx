import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { FaPython, FaReact, FaPhp, FaLaravel, FaArrowUp } from "react-icons/fa";
import { SiFlask, SiCodeigniter, SiTailwindcss, SiMysql, SiPostgresql } from "react-icons/si";

// Add your profile image import (replace with your actual image path)
import ProfileImage from "/bg.png";

const AboutMeModern = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "-100px", once: false });
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [setImageLoaded] = useState(false);
  
  // Scroll progress animation
 
  
  
  // Check scroll position for button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const skills = [
    { 
      name: "Python Specialist", 
      tech: "Flask, Django, FastAPI, Pandas, NumPy", 
      level: 95,
      icon: <FaPython className="text-blue-400" />,
      color: "from-blue-400 to-blue-600"
    },
    { 
      name: "React Expert", 
      tech: "Next.js, Redux, Framer Motion, React Hooks", 
      level: 90,
      icon: <FaReact className="text-cyan-400" />,
      color: "from-cyan-400 to-cyan-600"
    },
    { 
      name: "Backend Development", 
      tech: "RESTful APIs, Microservices, Authentication (RBAC, LDAP)", 
      level: 85,
      icon: <FaLaravel className="text-red-400" />,
      color: "from-red-400 to-red-600"
    },
    { 
      name: "Database Optimization", 
      tech: "MySQL, PostgreSQL, Query Optimization, Indexing", 
      level: 85,
      icon: <SiPostgresql className="text-blue-500" />,
      color: "from-blue-500 to-blue-700"
    },
    { 
      name: "UI/UX Implementation", 
      tech: "Tailwind CSS, Responsive Design, Highcharts", 
      level: 80,
      icon: <SiTailwindcss className="text-cyan-300" />,
      color: "from-cyan-300 to-cyan-500"
    }
  ];

  const experiences = [
    {
      company: "PT. PLN",
      period: "Oct 2023 - Dec 2023",
      location: "Bandung",
      role: "Full-Stack Web Developer",
      highlights: [
        "Built data management app with Flask and Tailwind CSS, improving workflow efficiency by 30%",
        "Implemented RBAC for multi-level user access control",
        "Developed 26+ interactive charts with Highcharts"
      ],
      tech: ["Flask", "Tailwind CSS", "RBAC", "Highcharts"]
    },
    {
      company: "PT. INTI",
      period: "Feb 2024 - Apr 2024",
      location: "Bandung",
      role: "Full-Stack Web Developer",
      highlights: [
        "Built property contract system with CodeIgniter",
        "Integrated LDAP authentication",
        "Developed advanced search filters and CRUD operations"
      ],
      tech: ["CodeIgniter", "LDAP"]
    },
    {
      company: "Toko Alat Kopi Bandung",
      period: "Mar 2020 - May 2020",
      location: "Bandung",
      role: "Full-Stack Web Developer",
      highlights: [
        "Built e-commerce platform with Laravel and PostgreSQL",
        "Developed admin dashboard for product/transaction management",
        "Implemented automated email notification system"
      ],
      tech: ["Laravel", "PostgreSQL"]
    }
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-neutral-950 flex items-center justify-center py-20 px-4 md:px-20"
      id="about"
    >

          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-40 flex justify-center items-center">
        <div className="w-16 h-1 bg-neutral-700 rounded-full"></div>
      </div>

      {/* Modern gradient mesh background with dynamic island effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/70 via-neutral-950 to-neutral-950"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-neutral-800"></path>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"></rect>
          </svg>
        </div>
      </div>

      {/* Floating background elements */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
       
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl"></div>
      </motion.div>
      
      {/* Main container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto max-w-7xl rounded-[40px] overflow-hidden border border-neutral-800/50 bg-neutral-900/20 backdrop-blur-lg shadow-xl shadow-neutral-900/50"
      >
        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Profile Content */}
            <div className="flex flex-col gap-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4"
              >
                <motion.div 
                  className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1.1, 1]
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 3
                  }}
                >
                  <span className="text-xs font-bold text-white">
                     <img src="/images/Logo.svg" alt="Logo" className="h-8" />
                  </span>
                </motion.div>
                <span className="text-sm font-medium text-neutral-400">DEVELOPER PROFILE</span>
              </motion.div>
              
              {/* Profile Photo - Mobile First (shown above content on small screens) */}
              <motion.div
                className="lg:hidden flex justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Tilt
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  scale={1.02}
                  transitionSpeed={1000}
                  className="relative  h-[43vh] rounded-2xl items-center flex justify-center overflow-hidden border-2 border-cyan-400/30 shadow-lg shadow-cyan-400/20"
                >
                  <motion.img
                    src={ProfileImage}
                    alt="Profile"
                    className=" h-[100%] "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    onLoad={() => setImageLoaded(true)}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-900/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  />
                </Tilt>
              </motion.div>
              
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex flex-col gap-4"
              >
                <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                  <motion.span 
                    className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    FULL-STACK
                  </motion.span> 
                  <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {" "}ENGINEER
                  </motion.span>
                  <motion.div
                    className="h-px bg-gradient-to-r from-cyan-400/20 via-cyan-400 to-transparent ml-4"
                    whileInView={{ scaleX: [0, 1] }}
                    whileHover={{ scaleX: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                    transition={{ duration: 1 }}
                  />
                </h2>
                <motion.p 
                  className="text-lg text-neutral-400 font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Web Developer| Database Optimization | Scalable Solutions
                </motion.p>
              </motion.div>
              
              <motion.div 
                className="relative p-6 rounded-2xl bg-neutral-900/50 backdrop-blur-md border border-neutral-800/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ 
                  borderColor: "rgba(34, 211, 238, 0.3)",
                  boxShadow: "0 0 20px rgba(34, 211, 238, 0.1)"
                }}
              >
                <p className="text-neutral-300 leading-relaxed">
                  Fullstack Developer with 2+ years experience building web applications using 
                  <span className="text-cyan-400 font-medium"> Python (Flask)</span> and 
                  <span className="text-purple-400 font-medium"> PHP (CodeIgniter, Laravel)</span>. 
                  Proven ability to develop data management systems, RBAC & LDAP authentication, 
                  automated reporting, and interactive data visualization. Skilled in database 
                  optimization (MySQL & PostgreSQL), RESTful API development, and responsive 
                  interfaces with Tailwind CSS. Focused on scalability, security, and clean 
                  code with an orientation toward efficient, user-friendly solutions.
                </p>
              </motion.div>

              {/* Skills Section */}
              <div className="flex flex-col gap-8">
                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="text-xl font-semibold text-white tracking-tight">
                    TECHNICAL EXPERTISE
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/20 to-transparent"></div>
                </motion.div>

                <div className="grid grid-cols-1 gap-4">
                  {skills.map((skill, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                    >
                      <Tilt
                        tiltMaxAngleX={5}
                        tiltMaxAngleY={5}
                        scale={1.02}
                        transitionSpeed={1000}
                        className="p-5 rounded-xl border border-neutral-800 bg-gradient-to-br from-neutral-900/50 to-neutral-900/20 backdrop-blur-sm hover:border-cyan-400/30 transition-all duration-300 relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-emerald-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                          <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-3">
                              <motion.div 
                                className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center"
                                whileHover={{ rotate: 15 }}
                              >
                                {skill.icon}
                              </motion.div>
                              <h4 className="font-medium text-white">{skill.name}</h4>
                            </div>
                            <span className="text-sm font-mono text-cyan-400">{skill.level}%</span>
                          </div>
                          <p className="text-sm text-neutral-400 mb-4 ml-11">{skill.tech}</p>
                          <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${skill.level}%` } : {}}
                              transition={{ delay: 0.7 + i * 0.1, type: "spring", stiffness: 100 }}
                              className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                            />
                          </div>
                        </div>
                      </Tilt>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Experience Timeline and Photo */}
            <div className="space-y-8">
              {/* Profile Photo - Desktop (shown on right side on larger screens) */}
              <motion.div
                className="hidden lg:flex justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Tilt
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  scale={1.02}
                  transitionSpeed={1000}
                  className="relative w-full items-center justify-center flex  h-[110vh] rounded-2xl overflow-hidden border-2 border-cyan-400/30 shadow-lg shadow-cyan-400/20"
                >
                  <motion.img
                    src={ProfileImage}
                    alt="Profile"
                    className=" h-[150vh] "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    onLoad={() => setImageLoaded(true)}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-900/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h3 className="text-xl font-bold text-white">Dani Ramdani</h3>
                    <p className="text-cyan-400">Full-Stack Developer</p>
                  </motion.div>
                </Tilt>
              </motion.div>

              <motion.div 
                className="p-6 rounded-2xl bg-neutral-900/50 backdrop-blur-md border border-neutral-800/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ 
                  borderColor: "rgba(34, 211, 238, 0.3)",
                  boxShadow: "0 0 20px rgba(34, 211, 238, 0.1)"
                }}
              >
                <motion.h3 
                  className="text-xl font-semibold text-white mb-6"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  PROFESSIONAL JOURNEY
                </motion.h3>
                
                <div className="space-y-6">
                  {experiences.map((exp, i) => (
                    <motion.div 
                      key={i}
                      className="relative pl-8 border-l-2 border-cyan-400/30"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.15 }}
                    >
                      <motion.div 
                        className="absolute w-3 h-3 rounded-full bg-cyan-400 -left-1.5 mt-1"
                        whileHover={{ scale: 1.5 }}
                      ></motion.div>
                      <div className="flex flex-wrap justify-between items-baseline">
                        <h4 className="text-lg font-medium text-white">{exp.company}</h4>
                        <span className="text-xs text-cyan-400">{exp.location}</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <p className="text-sm text-neutral-400 mb-2">{exp.role}</p>
                        <span className="text-xs text-neutral-500">{exp.period}</span>
                      </div>
                      <ul className="text-sm text-neutral-300 space-y-2 list-disc list-inside">
                        {exp.highlights.map((highlight, hi) => (
                          <motion.li 
                            key={hi}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 + i * 0.15 + hi * 0.1 }}
                          >
                            {highlight.split(/(?=<span)/).map((part, pi) => {
                              if (exp.tech.some(tech => part.includes(tech))) {
                                const tech = exp.tech.find(t => part.includes(t));
                                const colors = {
                                  "Flask": "text-neutral-300",
                                  "Tailwind CSS": "text-cyan-300",
                                  "RBAC": "text-purple-400",
                                  "Highcharts": "text-emerald-400",
                                  "CodeIgniter": "text-orange-400",
                                  "LDAP": "text-blue-400",
                                  "Laravel": "text-red-400",
                                  "PostgreSQL": "text-blue-500"
                                };
                                return (
                                  <span key={pi} className={`${colors[tech] || "text-cyan-400"} font-medium`}>
                                    {tech}
                                  </span>
                                );
                              }
                              return part;
                            })}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Skills Icons */}
              <motion.div 
                className="p-6 rounded-2xl bg-neutral-900/50 backdrop-blur-md border border-neutral-800/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ 
                  borderColor: "rgba(34, 211, 238, 0.3)",
                  boxShadow: "0 0 20px rgba(34, 211, 238, 0.1)"
                }}
              >
                <motion.h3 
                  className="text-xl font-semibold text-white mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  CORE TECHNOLOGIES
                </motion.h3>
                <motion.div 
                  className="flex flex-wrap gap-4 justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, staggerChildren: 0.1 }}
                >
                  <SkillIcon icon={FaPython} tooltip="Python" color="text-blue-400" delay={0.7} />
                  <SkillIcon icon={FaReact} tooltip="React" color="text-cyan-400" delay={0.8} />
                  <SkillIcon icon={SiFlask} tooltip="Flask" color="text-neutral-300" delay={0.9} />
                  <SkillIcon icon={FaPhp} tooltip="PHP" color="text-purple-400" delay={1.0} />
                  <SkillIcon icon={SiCodeigniter} tooltip="CodeIgniter" color="text-orange-400" delay={1.1} />
                  <SkillIcon icon={FaLaravel} tooltip="Laravel" color="text-red-400" delay={1.2} />
                  <SkillIcon icon={SiTailwindcss} tooltip="Tailwind CSS" color="text-cyan-300" delay={1.3} />
                  <SkillIcon icon={SiMysql} tooltip="MySQL" color="text-blue-500" delay={1.4} />
                  <SkillIcon icon={SiPostgresql} tooltip="PostgreSQL" color="text-blue-600" delay={1.5} />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 text-white shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 flex items-center justify-center"
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 0 20px rgba(34, 211, 238, 0.5)"
            }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <FaArrowUp className="text-xl" />
            <motion.span 
              className="absolute -bottom-8 text-xs font-medium text-cyan-400 whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
};

const SkillIcon = ({ icon: Icon, tooltip, color, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="relative flex items-center justify-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 300 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ scale: 1.2, y: -5 }}
        className={`p-3 rounded-xl bg-neutral-800/50 backdrop-blur-sm ${color} transition-all duration-300 ${isHovered ? 'shadow-lg shadow-cyan-400/20' : ''}`}
      >
        <Icon className="text-3xl" />
      </motion.div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="absolute -bottom-10 bg-neutral-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap shadow-lg"
          >
            {tooltip}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AboutMeModern;