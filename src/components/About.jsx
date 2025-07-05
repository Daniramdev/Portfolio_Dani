import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Tilt from "react-parallax-tilt";

// Animation Variants
export const slideUp = {
  initial: { y: "100%", opacity: 0 },
  open: (i) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.05 * i,
      ease: [0.4, 0, 0.2, 1],
      type: "spring",
      stiffness: 100,
    },
  }),
  closed: {
    y: "100%",
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const opacity = {
  initial: { opacity: 0, y: 20 },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.4, 0, 0.2, 1],
      type: "spring",
      stiffness: 80,
    },
  },
  closed: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const progressBar = {
  initial: { width: 0 },
  open: (i) => ({
    width: `${i}%`,
    transition: {
      duration: 1,
      delay: 0.1 * i,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

const AboutMe = () => {
  const introduction =
    "Full-Stack Developer with 2+ years of experience specializing in developing secure, responsive, and scalable web applications. Proficient in modern technologies including Python and PHP, with a focus on data-driven and high-performance solutions. Proven to improve system efficiency by up to 90% through scalable development and stringent security practices.";

  const skills = [
    { name: "Frontend: HTML5, CSS3, JavaScript, Tailwind CSS, React", level: 90 },
    { name: "Backend: Python (Flask, Django), PHP (Laravel, CodeIgniter)", level: 85 },
    { name: "API Systems: RESTful API, JWT Authentication, LDAP Integration", level: 80 },
    { name: "Database: MySQL, PostgreSQL, MongoDB", level: 75 },
    { name: "DevOps: Git, Docker, Vercel, CI/CD Pipelines", level: 70 },
    { name: "Soft Skills: Problem Solving, Team Collaboration, Agile Methodologies", level: 95 },
  ];

  const descriptionRef = useRef(null);
  const isInView = useInView(descriptionRef, { threshold: 0.2, once: false });

  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      id="about"
      className="min-h-screen bg-red-50 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 dark:from-gray-100 dark:via-white dark:to-gray-100 relative overflow-hidden"
      style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}
    >
      {/* Parallax Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-10">
        <motion.div
          style={{ y: y1 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 mix-blend-overlay filter blur-[100px]"
        />
        <motion.div
          style={{ y: y2 }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 right-12 w-96 h-96 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 mix-blend-overlay filter blur-[100px]"
        />
      </div>

      <div
        ref={descriptionRef}
        className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10"
      >
        {/* Image */}
<motion.div
  className="w-full h-full flex justify-center items-center lg:order-last"
  variants={opacity}
  initial="initial"
  animate={isInView ? "open" : "closed"}
>

<video
  src="vidio_c.mp4"
  autoPlay
  loop
  muted
  playsInline
  className="w-full h-auto object-contain rounded-xl "
/>


</motion.div>

        {/* Text Section */}
        <div className="flex flex-col gap-16">
          <motion.div
            variants={opacity}
            initial="initial"
            animate={isInView ? "open" : "closed"}
            className="flex items-center gap-4"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-100 dark:text-gray-900 tracking-tight">
              About Me
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-400 to-transparent ml-4" />
          </motion.div>

          {/* Introduction Text */}
          <div className="relative">
            <p className="text-xl sm:text-2xl lg:text-3xl leading-relaxed text-gray-300 dark:text-gray-800 font-medium max-w-5xl tracking-wide">
              {introduction.split(" ").map((word, index) => (
                <span key={index} className="inline-flex relative overflow-hidden mr-2">
                  <motion.span
                    variants={slideUp}
                    custom={index}
                    initial="initial"
                    animate={isInView ? "open" : "closed"}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </p>
          </div>

          {/* Skills */}
          <div className="relative">
            <motion.h3
              variants={opacity}
              initial="initial"
              animate={isInView ? "open" : "closed"}
              className="text-3xl sm:text-4xl font-semibold text-gray-100 dark:text-gray-900 mb-10 tracking-tight flex items-center gap-4"
            >
              <span className="w-10 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600"></span>
              Technical Skills
            </motion.h3>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <motion.li
                  key={index}
                  className="relative overflow-hidden"
                  variants={slideUp}
                  custom={index}
                  initial="initial"
                  animate={isInView ? "open" : "closed"}
                >
                  <Tilt
                    tiltMaxAngleX={10}
                    tiltMaxAngleY={10}
                    perspective={1000}
                    scale={1.05}
                    transitionSpeed={2000}
                    className="flex items-start group"
                  >
                    <span className="text-blue-400 dark:text-blue-600 mr-3 mt-2 text-lg">▹</span>
                    <div className="bg-gray-800/30 dark:bg-gray-200/30 backdrop-blur-md p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex-1 border border-gray-700/50 dark:border-gray-300/50 hover:border-blue-400/50 dark:hover:border-blue-600/50">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-100 dark:text-gray-900 text-lg">
                          {skill.name.split(": ")[0]}:
                        </span>
                        <span className="font-normal text-gray-300 dark:text-gray-700 text-lg">
                          {skill.name.split(": ")[1]}
                        </span>
                        <div className="w-full bg-gray-700/50 dark:bg-gray-300/50 h-2 rounded-full mt-3">
                          <motion.div
                            variants={progressBar}
                            custom={skill.level}
                            initial="initial"
                            animate={isInView ? "open" : "initial"}
                            className="h-full bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </Tilt>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
