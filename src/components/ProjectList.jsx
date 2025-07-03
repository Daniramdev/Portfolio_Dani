import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProjectList = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("official");
  const [isHovering, setIsHovering] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 300, height: 200 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const tabsRef = useRef(null);

  // Projects data
  const projects = {
    official: [
      {
        id: 1,
        name: "Toko Alat Kopi",
        year: 2024,
        image: "/images/cofee.png",
        description: "Membangun landing page toko online alat kopi premium dengan desain modern dan responsif. Fitur mencakup produk grid, testimoni pelanggan, keranjang belanja sederhana, form login/register, dan checkout modal. Semua dibangun dengan HTML, CSS murni, dan JavaScript.",
        actionUrl: "https://daniramdev.github.io/tokoalatkopi/",
        tags: ["E-commerce", "Responsive Design"]
      },
      {
        id: 2,
        name: "PT.INTI",
        year: 2020,
        image: "/images/ptinti1.jpg",
        description: "Sebagai Fullstak web developer membuat system website monitoring kontrak properti dengan tampilan responsive dengan sytem RBAC (role-basend access) memakai LDAP, Membuat crude di table dan vitur filtering data, membuat pemberitahuan mengirim/ menerima pesan berupa notif ke email semisal jika kontrak belum bayar,sudah bayar,jatuh tempo, Menu utama dashbord, properti management, kontrack management, usermanagemnt, tools yang saya gunakan framework CI, style tailwind css, java scripts dan database mysql",
        tags: ["Fullstack", "RBAC System", "LDAP Integration"]
      },
      {
        id: 3,
        name: "PT.PLN(iconnect)",
        year: 2023,
        image: "/images/pln.jpg",
        description: "Sebagai fullstak web developer membuat system management data tampilan serponsive modern meyesuaikan mode dekstop dan moble, dengan sytem RBAC (role-basend access) password pakai hassing. saya Membuat 26 diagram dengan total rata2 menu utama asset, retail, presale dan management data meyedianakan fitur export/import file folmat excel.csv, filtering data,seach berdasarkan nama,tanggal dll, dan membuat system crude, didalam management data untuk pengelolaan data, tools yg saya gunakan framework flask, style tailwindcss, java script buat diagram dll, database mysql,dengan demikian dapat memudahkan pengelolaan data/monitoring data dengan efesien dan akurat.",
        tags: ["Data Management", "Dashboard", "Flask"]
      }
    ],
    experimental: [
      {
        id: 4,
        name: "Chatbot AI LM-B3 DG-3",
        year: 2024,
        image: "/images/chatbot-ai.jpg",
        description: "A smart chatbot leveraging DistilBERT to classify user intents and deliver contextual responses. It integrates a JSON-based question dataset with Retrieval-Augmented Generation (RAG) using TF-IDF to fetch relevant portfolio information. Key features include dynamic time-based greetings, conversation context tracking, and seamless frontend integration via REST APIs. Built with Python, Flask, and Transformers, it supports over 50 intents for a wide range of user queries.",
        githubUrl: "https://github.com/Daniramdev/Chatbot-AI-LM-B3.git",
        tags: ["AI", "NLP", "Chatbot"]
      }
    ]
  };

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Check mobile device on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Smooth follow effect with spring physics (desktop only)
  useEffect(() => {
    if (!isHovering || isMobile) return;

    const followSpeed = 0.16;
    const stiffness = 0.1;
    const damping = 0.7;

    let animationFrameId;
    let velocity = { x: 0, y: 0 };

    const animate = () => {
      const dx = cursorPosition.x - imagePosition.x;
      const dy = cursorPosition.y - imagePosition.y;

      const springForceX = dx * stiffness;
      const springForceY = dy * stiffness;

      velocity.x += springForceX;
      velocity.y += springForceY;

      velocity.x *= damping;
      velocity.y *= damping;

      setImagePosition((prev) => ({
        x: prev.x + velocity.x * followSpeed,
        y: prev.y + velocity.y * followSpeed,
      }));

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [cursorPosition, isHovering, imagePosition, isMobile]);

  const handleProjectClick = (project, e) => {
    e?.stopPropagation();
    setSelectedProject(project);
    if (project.image) setActiveProject(project.id);
  };

  const handleMouseEnter = (e, project) => {
    if (!project.image || isMobile) return;

    setCursorPosition({ x: e.clientX, y: e.clientY });
    setImagePosition({ x: e.clientX, y: e.clientY });
    setHoveredImage(project.image);
    setIsHovering(true);

    setImageSize({
      width: activeTab === "official" ? 280 : 320,
      height: activeTab === "official" ? 180 : 220,
    });
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setIsHovering(false);
    setTimeout(() => {
      if (!isHovering) setHoveredImage(null);
    }, 300);
  };

  const renderProjectCard = (project, index) => {
    const isOfficial = activeTab === "official";
    
    return (
      <motion.div
        key={project.id}
        className={`relative group ${isOfficial ? 'mb-12' : 'mb-8'}`}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        onMouseMove={!isMobile ? (e) => setCursorPosition({ x: e.clientX, y: e.clientY }) : undefined}
        onMouseEnter={!isMobile ? (e) => handleMouseEnter(e, project) : undefined}
        onMouseLeave={!isMobile ? handleMouseLeave : undefined}
      >
        <div 
          className={`flex flex-col ${isOfficial ? 'md:flex-row md:items-center' : ''} justify-between gap-4 z-10 relative`}
        >
          <div 
            className={`${isOfficial ? 'md:w-2/3' : ''} cursor-pointer`}
            onClick={(e) => handleProjectClick(project, e)}
          >
            <motion.h2
              className={`text-3xl md:text-5xl font-bold transition-all duration-300 p-4 md:p-2 rounded-lg ${
                isOfficial 
                  ? 'text-white hover:text-blue-400' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent hover:from-blue-400 hover:to-purple-500'
              }`}
              whileHover={!isMobile ? { scale: 1.02 } : undefined}
              whileTap={isMobile ? { scale: 0.98 } : undefined}
              aria-label={`View details for ${project.name}`}
            >
              {project.name}
            </motion.h2>
            
            <motion.p 
              className={`text-sm md:text-base mt-2 ${
                isOfficial ? 'text-gray-400' : 'text-white opacity-80'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {project.description.substring(0, isMobile ? 100 : 150)}...
            </motion.p>
          </div>
          
          <div className={`flex items-center ${isOfficial ? 'justify-start md:justify-end' : 'justify-end'} gap-6`}>
            <motion.span 
              className={`text-xl md:text-2xl ${
                isOfficial ? 'text-gray-400' : 'text-white opacity-80'
              }`}
              whileHover={!isMobile ? { scale: 1.1 } : undefined}
            >
              {project.year}
            </motion.span>
            
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-full p-2 transition-colors ${
                  isOfficial 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                    : 'text-white hover:text-gray-200 hover:bg-blue-700'
                }`}
                whileHover={!isMobile ? { scale: 1.1 } : undefined}
                onClick={(e) => e.stopPropagation()}
                aria-label={`Visit GitHub repository for ${project.name}`}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.a>
            )}
          </div>
        </div>
        
        <motion.div 
          className={`mt-4 mb-8 h-0.5 ${
            isOfficial 
              ? 'bg-gradient-to-r from-gray-800 via-blue-500 to-gray-800' 
              : 'bg-gradient-to-r from-blue-500 to-purple-600'
          }`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    );
  };

  const renderDescriptionModal = () => {
    if (!selectedProject) return null;

    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-2 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedProject(null)}
      >
        <motion.div
          className="bg-gray-900 rounded-2xl p-2 max-w-4xl w-full mx-4 border border-gray-800 shadow-2xl overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{selectedProject.name}</h3>
              <span className="text-blue-400 text-md">{selectedProject.year}</span>
            </div>
            <button
              className="text-gray-400 hover:text-white transition-colors"
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {selectedProject.image && (
            <motion.div 
              className="mb-2 rounded-xl overflow-hidden relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src={selectedProject.image}
                alt={selectedProject.name}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                onClick={() => setActiveProject(selectedProject.id)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white text-sm">Click to enlarge</span>
              </div>
            </motion.div>
          )}

          <motion.p 
            className="text-gray-300 mb-4 text-xs leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {selectedProject.description}
          </motion.p>

          {selectedProject.tags && selectedProject.tags.length > 0 && (
            <motion.div 
              className="flex flex-wrap gap-3 mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {selectedProject.tags.map((tag) => (
                <span key={tag} className="px-4 py-2 bg-gray-800 text-sm rounded-full text-blue-400">
                  {tag}
                </span>
              ))}
            </motion.div>
          )}

          <motion.div 
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {selectedProject.githubUrl && (
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                View Code
              </a>
            )}

            {selectedProject.actionUrl && (
              <a
                href={selectedProject.actionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Live Demo
              </a>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div 
      id="projects" 
      className="min-h-screen bg-gray-950  text-white py-4 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      ref={containerRef}
    >
      <div className="max-w-6xl mx-auto relative">
        {/* Floating background elements */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-900/10 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-purple-900/10 rounded-full filter blur-3xl opacity-20"></div>
        
        {/* Section header */}
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl py-1 md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
            MY Project
          </h2>
        </motion.div>

        {/* Improved Navigation Tabs */}
        <motion.div 
          className="flex justify-center mb-10  relative z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          ref={tabsRef}
        >
          <div className="inline-flex bg-gray-900 p-1 rounded-xl border border-gray-800 shadow-lg">
            <button
              className={`px-6 py-3 text-sm md:text-base md:px-8 rounded-lg font-semibold transition-all ${
                activeTab === "official" 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => {
                setActiveTab("official");
                setSelectedProject(null);
              }}
              aria-label="Show professional projects"
              style={{
                position: 'relative',
                zIndex: 10,
                minWidth: isMobile ? '120px' : 'auto',
                minHeight: isMobile ? '48px' : 'auto',
                touchAction: 'manipulation' // Improve touch responsiveness
              }}
            >
              {isMobile ? 'Professional' : 'Professional Work'}
            </button>
            <button
              className={`px-6 py-3 text-sm md:text-base md:px-8 rounded-lg font-semibold transition-all ${
                activeTab === "experimental" 
                  ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => {
                setActiveTab("experimental");
                setSelectedProject(null);
              }}
              aria-label="Show experimental projects"
              style={{
                position: 'relative',
                zIndex: 10,
                minWidth: isMobile ? '120px' : 'auto',
                minHeight: isMobile ? '48px' : 'auto',
                touchAction: 'manipulation' // Improve touch responsiveness
              }}
            >
              {isMobile ? 'Experimental' : 'Experiments'}
            </button>
          </div>
        </motion.div>

        {/* Projects List */}
        <motion.div
          className="relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects[activeTab].map((project, index) => renderProjectCard(project, index))}
        </motion.div>

        {/* Hover Preview Image (Desktop only) */}
        {!isMobile && hoveredImage && (
          <motion.div 
            className="fixed top-0 left-0 pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isHovering ? 1 : 0,
              x: imagePosition.x - imageSize.width / 2,
              y: imagePosition.y - imageSize.height / 2,
              transition: { type: 'spring', damping: 20, stiffness: 100 }
            }}
            style={{
              width: imageSize.width,
              height: imageSize.height,
            }}
          >
            <div className="relative w-full h-full">
              <img
                src={hoveredImage}
                alt="Project preview"
                className="absolute inset-0 w-full h-full object-cover rounded-xl border-2 border-white/10 shadow-2xl"
                style={{
                  transform: isHovering ? 'scale(1)' : 'scale(0.95)',
                  transformOrigin: 'center center',
                  transition: 'transform 0.3s ease, opacity 0.3s ease',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-sm font-medium">Click project name for details</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {renderDescriptionModal()}
        
        {activeProject !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              className="relative max-w-6xl w-full h-full flex items-center justify-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <button
                className="absolute top-6 right-6 text-white bg-gray-900/50 rounded-full p-2 hover:bg-gray-800 transition-all z-50"
                onClick={() => setActiveProject(null)}
                aria-label="Close image modal"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {(() => {
                const activeProjectData = [...projects.official, ...projects.experimental].find(p => p.id === activeProject);
                return activeProjectData?.image ? (
                  <motion.img
                    src={activeProjectData.image}
                    alt={`Zoomed view of ${activeProjectData.name} project`}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  />
                ) : null;
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Note */}
      <motion.div 
        className="text-center text-gray-500 text-sm mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p>{isMobile ? 'Tap on any project to view details' : 'Click on any project name to view detailed information'}</p>
      </motion.div>
    </div>
  );
};

export default ProjectList;