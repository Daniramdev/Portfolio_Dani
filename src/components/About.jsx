import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Slide-Up Animation
export const slideUp = {
  initial: { y: "100%", opacity: 0 },
  open: (i) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.6, delay: 0.02 * i, ease: [0.4, 0, 0.2, 1] },
  }),
  closed: { y: "100%", opacity: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

// Opacity Animation
export const opacity = {
  initial: { opacity: 0, y: 20 },
  open: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
  closed: { opacity: 0, y: 20, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
};

const AboutMe = () => {
  const introduction =
    "Full-Stack Developer berpengalaman 2+ tahun dengan spesialisasi dalam pengembangan aplikasi web yang aman, responsif, dan skalabel. Menguasai teknologi modern termasuk Python dan PHP, dengan fokus pada solusi berbasis data dan performa tinggi. Terbukti mampu meningkatkan efisiensi sistem hingga 90% melalui pengembangan yang terukur dan implementasi keamanan yang ketat.";

  const skills = [
    "Frontend: HTML5, CSS3, JavaScript, Tailwind CSS",
    "Backend: Python (Flask, Django), PHP (Laravel, CodeIgniter)",
    "Sistem API: RESTful API, JWT Authentication, LDAP Integration",
    "Database: MySQL, PostgreSQL",
    "Deploy: Git, vercel",
    "Soft Skills: Problem Solving, Team Collaboration"

  ];


  const descriptionRef = useRef(null);
  const isInView = useInView(descriptionRef, { threshold: 0.2, once: false });

  return (
    <section id="about" className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex items-center justify-center py-16 px-4 md:px-8">
      <div
       
        ref={descriptionRef}
        className="container mx-auto max-w-5xl flex flex-col gap-12"
      >
        {/* Introduction */}
        <div className="relative">
         
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 font-medium">
            {introduction.split(" ").map((word, index) => (
              <span key={index} className="inline-flex relative overflow-hidden mr-1">
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
            className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 tracking-tight"
          >
            Technical Skills
          </motion.h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 text-base md:text-lg">
            {skills.map((skill, index) => (
              <li key={index} className="relative overflow-hidden">
                <motion.div
                  variants={slideUp}
                  custom={index}
                  initial="initial"
                  animate={isInView ? "open" : "closed"}
                  className="flex items-start"
                >
                  <span className="text-blue-600 mr-2">●</span>
                  <span>
                    {skill.split(": ").map((part, i) => (
                      <span
                        key={i}
                        className={i === 0 ? "font-semibold text-gray-800" : "font-normal"}
                      >
                        {part}
                        {i === 0 && ": "}
                      </span>
                    ))}
                  </span>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>

        
      </div>
    </section>
  );
};

export default AboutMe;