import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function ProjectSection() {
  const projects = [
    {
      image: "/images/pln.jpg",
      title: "PLN iConnect",
      description: "Data management system with interactive dashboards"
    },
    {
      image: "/images/ptinti1.jpg",
      title: "PT. INTI System", 
      description: "Property contract monitoring system"
    },
    {
      image: "/images/cofee.png",
      title: "Toko Alat Kopi",
      description: "E-commerce landing page"
    }
  ];

  // Double the array to create seamless loop
  const doubledProjects = [...projects, ...projects];
  
  const [ref, inView] = useInView({ threshold: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        x: ['0%', '-100%'],
        transition: {
          duration: 40,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }
      });
    } else {
      controls.stop();
    }
  }, [inView, controls]);

  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative py-20 overflow-hidden font-sans">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-gray-300 mb-12 text-center px-4"
      >
        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Galery</span>
      </motion.h2>

      <div ref={ref} className="w-full overflow-hidden">
        <motion.div
          className="flex w-[200%]"
          animate={controls}
        >
          {doubledProjects.map((project, index) => (
            <motion.div
              key={index}
              className="px-2 w-full sm:w-1/2 md:w-1/3 flex-shrink-0"
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            >
              <div className="relative h-80 rounded-lg overflow-hidden shadow-lg group mx-2">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-white">
                    <h3 className="font-bold">{project.title}</h3>
                    <p className="text-sm">{project.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-12 px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg transition-all block mx-auto"
      >
        View All Projects
      </motion.button>
    </div>
  );
}

export default ProjectSection;