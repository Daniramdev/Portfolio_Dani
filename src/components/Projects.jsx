import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const ProjectList = () => {
  const [activeTab, setActiveTab] = useState("official");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [currentReview, setCurrentReview] = useState(0);
  const containerRef = useRef(null);
  const modalRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Enhanced parallax effects
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  const projects = {
    official: [
      {
        id: 1,
        name: "Toko Alat Kopi",
        year: 2024,
        image: "/images/cofee.png",
        description: "Membangun landing page toko online alat kopi premium dengan desain modern dan responsif. Fitur mencakup produk grid, testimoni pelanggan, keranjang belanja sederhana, form login/register, dan checkout modal. Semua dibangun dengan HTML, CSS murni, dan JavaScript.",
        actionUrl: "https://daniramdev.github.io/tokoalatkopi/",
        tags: ["E-commerce", "Responsive Design", "Frontend"],
        tech: ["HTML5", "CSS3", "JavaScript"],
        screenshots: [
          "/images/coffee-screenshot1.jpg",
          "/images/coffee-screenshot2.jpg"
        ],
        reviews: [
          {
            author: "Coffee Shop Owner",
            rating: 5,
            text: "The website has significantly increased our online sales. The interface is intuitive and the checkout process is seamless."
          },
          {
            author: "Marketing Manager",
            rating: 4,
            text: "Great design and functionality. We've seen a 30% increase in customer engagement since launch."
          }
        ]
      },
      {
        id: 2,
        name: "PT.INTI",
        year: 2020,
        image: "/images/ptinti1.jpg",
        description: "Sebagai Fullstak web developer membuat system website monitoring kontrak properti dengan tampilan responsive dengan sytem RBAC (role-basend access) memakai LDAP, Membuat crude di table dan vitur filtering data, membuat pemberitahuan mengirim/ menerima pesan berupa notif ke email semisal jika kontrak belum bayar,sudah bayar,jatuh tempo, Menu utama dashbord, properti management, kontrack management, usermanagemnt, tools yang saya gunakan framework CI, style tailwind css, java scripts dan database mysql",
        tags: ["Fullstack", "RBAC System", "LDAP Integration"],
        tech: ["CodeIgniter", "Tailwind CSS", "MySQL"],
        screenshots: [
          "/images/inti-screenshot1.jpg",
          "/images/inti-screenshot2.jpg"
        ],
        reviews: [
          {
            author: "IT Director",
            rating: 5,
            text: "The system has streamlined our property management workflow. The RBAC implementation is particularly effective."
          }
        ]
      },
      {
        id: 3,
        name: "PT.PLN(iconnect)",
        year: 2023,
        image: "/images/pln.jpg",
        description: "Sebagai fullstak web developer membuat system management data tampilan serponsive modern meyesuaikan mode dekstop dan moble, dengan sytem RBAC (role-basend access) password pakai hassing. saya Membuat 26 diagram dengan total rata2 menu utama asset, retail, presale dan management data meyedianakan fitur export/import file folmat excel.csv, filtering data,seach berdasarkan nama,tanggal dll, dan membuat system crude, didalam management data untuk pengelolaan data, tools yg saya gunakan framework flask, style tailwindcss, java script buat diagram dll, database mysql,dengan demikian dapat memudahkan pengelolaan data/monitoring data dengan efesien dan akurat.",
        tags: ["Data Management", "Dashboard", "Flask"],
        tech: ["Python", "Flask", "Tailwind CSS", "MySQL"],
        screenshots: [
          "/images/pln-screenshot1.jpg",
          "/images/pln-screenshot2.jpg"
        ],
        reviews: [
          {
            author: "Data Analyst",
            rating: 4,
            text: "The data visualization features are excellent. It's helped our team identify trends much faster."
          },
          {
            author: "System Administrator",
            rating: 5,
            text: "Robust and reliable system. The export/import functionality saves us hours of work each week."
          }
        ]
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
        tags: ["AI", "NLP", "Chatbot"],
        tech: ["Python", "Flask", "Transformers", "NLP"],
        screenshots: [
          "/images/chatbot-screenshot1.jpg",
          "/images/chatbot-screenshot2.jpg"
        ],
        reviews: [
          {
            author: "Product Manager",
            rating: 5,
            text: "The chatbot's accuracy in understanding user queries is impressive. It's reduced our customer support workload by 40%."
          }
        ]
      }
    ]
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
    hover: {
      scale: 1.03,
      y: -5,
      boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.3)",
      transition: { duration: 0.3 }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Check mobile device
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedProject(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderProjectCard = (project) => {
    return (
      <motion.div
        key={project.id}
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-900/50 border border-gray-800/50 p-6 mb-8 backdrop-blur-sm"
        variants={itemVariants}
        whileHover={!isMobile ? "hover" : undefined}
        onClick={() => {
          setSelectedProject(project);
          setCurrentReview(0);
        }}
        initial="hidden"
        animate="visible"
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      >
        {/* Hover effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
          <div className="absolute inset-0 [background-image:linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>

        {/* Glow effect */}
        <div className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-xl blur-sm"></div>
        </div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex-1">
              <motion.h3 
                className="text-2xl md:text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
                variants={titleVariants}
              >
                {project.name}
              </motion.h3>
              
              <motion.p 
                className="text-gray-400 mb-4 text-sm md:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {project.description.substring(0, isMobile ? 100 : 150)}...
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-2 mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {project.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 text-xs rounded-full bg-gray-800/80 text-cyan-400 border border-cyan-400/20"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* Tech stack chips */}
              <motion.div 
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {project.tech && project.tech.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-2.5 py-1 text-xs rounded-full bg-gray-800/50 text-gray-300 border border-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>

              {/* Review preview */}
              {project.reviews && project.reviews.length > 0 && (
                <motion.div 
                  className="mt-3 flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center mr-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < project.reviews[0].rating ? 'text-yellow-400' : 'text-gray-500'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">
                    {project.reviews.length} review{project.reviews.length !== 1 ? 's' : ''}
                  </span>
                </motion.div>
              )}
            </div>
            
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-xl text-blue-400 font-mono">{project.year}</span>
              
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderImageZoomModal = () => {
    if (!zoomedImage) return null;

    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setZoomedImage(null)}
      >
        <motion.div
          className="relative max-w-6xl w-full max-h-[90vh]"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={zoomedImage}
            alt="Zoomed view"
            className="w-full h-full object-contain"
          />
          <button
            className="absolute top-4 right-4 text-white bg-gray-800/80 hover:bg-gray-700 rounded-full p-2"
            onClick={() => setZoomedImage(null)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    );
  };

  const renderModal = () => {
    if (!selectedProject) return null;

    return (
      <motion.div
        className="fixed inset-0 z-50 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Modal backdrop with blur */}
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
        />
        
        {/* Scrollable modal content */}
        <div className="flex items-center justify-center min-h-screen p-4">
          <motion.div
            ref={modalRef}
            className="relative w-full max-w-6xl max-h-[90vh] bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-800 overflow-hidden shadow-2xl flex flex-col"
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header (sticky) */}
            <div className="sticky top-0 z-10 p-6 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800 backdrop-blur-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    {selectedProject.name}
                  </h3>
                  <p className="text-blue-400 font-mono">{selectedProject.year}</p>
                </div>
                <button
                  className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-800"
                  onClick={() => setSelectedProject(null)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1">
              <div className="p-6 bg-gradient-to-b from-gray-900 to-gray-900/90">
                {selectedProject.image && (
                  <motion.div 
                    className="mb-6 rounded-lg overflow-hidden border border-gray-800/50 cursor-zoom-in"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => setZoomedImage(selectedProject.image)}
                  >
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.name}
                      className="w-full h-auto max-h-[400px] object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </motion.div>
                )}

                <motion.p 
                  className="text-gray-300 mb-6 leading-relaxed text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {selectedProject.description}
                </motion.p>

                <motion.div 
                  className="flex flex-wrap gap-3 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-gray-800/80 text-cyan-400 text-sm border border-cyan-400/20">
                      {tag}
                    </span>
                  ))}
                </motion.div>

                {/* Tech stack in modal */}
                {selectedProject.tech && (
                  <motion.div 
                    className="flex flex-wrap gap-3 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                  >
                    <span className="text-gray-400 text-sm">Tech Stack:</span>
                    {selectedProject.tech.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 rounded-full bg-gray-800/50 text-gray-300 text-sm border border-gray-700">
                        {tech}
                      </span>
                    ))}
                  </motion.div>
                )}

                {/* Screenshots gallery */}
                {selectedProject.screenshots && (
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h4 className="text-lg font-medium text-gray-400 mb-3">Screenshots</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedProject.screenshots.map((screenshot, index) => (
                        <div 
                          key={index} 
                          className="rounded-lg overflow-hidden border border-gray-800/50 cursor-zoom-in"
                          onClick={() => setZoomedImage(screenshot)}
                        >
                          <img
                            src={screenshot}
                            alt={`${selectedProject.name} screenshot ${index + 1}`}
                            className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Reviews section */}
                {selectedProject.reviews && selectedProject.reviews.length > 0 && (
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45 }}
                  >
                    <h4 className="text-lg font-medium text-gray-400 mb-3">Client Reviews</h4>
                    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                      <div className="flex items-center mb-4">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${i < selectedProject.reviews[currentReview].rating ? 'text-yellow-400' : 'text-gray-500'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-400">
                          {selectedProject.reviews[currentReview].rating}/5
                        </span>
                      </div>
                      <p className="text-gray-300 mb-4">
                        "{selectedProject.reviews[currentReview].text}"
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-400">
                          - {selectedProject.reviews[currentReview].author}
                        </p>
                        {selectedProject.reviews.length > 1 && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setCurrentReview(prev => 
                                prev === 0 ? selectedProject.reviews.length - 1 : prev - 1
                              )}
                              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                            </button>
                            <button
                              onClick={() => setCurrentReview(prev => 
                                prev === selectedProject.reviews.length - 1 ? 0 : prev + 1
                              )}
                              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Action buttons (sticky at bottom if content is long) */}
                <motion.div 
                  className="sticky bottom-0 bg-gray-900/90 backdrop-blur-sm py-4 -mx-6 px-6 border-t border-gray-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex gap-4">
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white flex items-center gap-2 transition-colors border border-gray-700 hover:border-gray-600"
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
                        className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-lg text-white flex items-center gap-2 transition-all shadow-lg hover:shadow-cyan-500/20"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <div 
      id="projects" 
      className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: yBg, opacity: opacityBg }}
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]">
          <div className="absolute inset-0 [background-image:linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:40px_40px]"></div>
        </div>
        
        {/* Animated gradients */}
        <div className="absolute -top-1/4 -left-1/4 w-[200%] h-[200%] opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-400/10 via-transparent to-transparent animate-[spin_30s_linear_infinite]"></div>
        </div>
        
        <div className="absolute -bottom-1/4 -right-1/4 w-[200%] h-[200%] opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent animate-[spin_30s_linear_infinite_reverse]"></div>
        </div>
        
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-400/20"
            style={{
              width: Math.random() * 5 + 2 + 'px',
              height: Math.random() * 5 + 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.1,
              filter: 'blur(1px)'
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 50],
              x: [0, (Math.random() - 0.5) * 50],
              transition: {
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'linear'
              }
            }}
          />
        ))}

        {/* Floating shapes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute rounded-lg bg-blue-500/10 border border-blue-400/20"
            style={{
              width: Math.random() * 100 + 50 + 'px',
              height: Math.random() * 100 + 50 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.3 + 0.1,
              rotate: Math.random() * 360,
              borderRadius: `${Math.random() * 50}% ${Math.random() * 50}% ${Math.random() * 50}% ${Math.random() * 50}%`
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 100],
              rotate: [0, Math.random() * 360],
              transition: {
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'linear'
              }
            }}
          />
        ))}
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4"
            style={{ y: yText }}
          >
            My Projects
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            A collection of my professional work and creative experiments
          </motion.p>
        </motion.div>

        {/* Tabs - Enhanced with subtle animation */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-flex bg-gray-900/80 rounded-xl p-1 border border-gray-800 shadow-lg backdrop-blur-sm">
            <motion.button
              className={`px-6 py-3 rounded-lg transition-all font-medium relative overflow-hidden ${activeTab === "official" 
                ? 'text-white' 
                : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab("official")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeTab === "official" && (
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-lg border border-cyan-400/20"
                  layoutId="tabIndicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">Professional Work</span>
            </motion.button>
            
            <motion.button
              className={`px-6 py-3 rounded-lg transition-all font-medium relative overflow-hidden ${activeTab === "experimental" 
                ? 'text-white' 
                : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab("experimental")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeTab === "experimental" && (
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-lg border border-cyan-400/20"
                  layoutId="tabIndicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">Experiments</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          className="grid grid-cols-1 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects[activeTab].map((project) => renderProjectCard(project))}
        </motion.div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {renderModal()}
        {renderImageZoomModal()}
      </AnimatePresence>
    </div>
  );
};

export default ProjectList;