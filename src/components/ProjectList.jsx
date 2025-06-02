import React, { useState, useEffect } from "react";

const ProjectList = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("official");
  const [isHovering, setIsHovering] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 300, height: 200 });

  // Official Projects
  const officialProjects = [
   
    {
      id: 1,
      name: "PT.INTI",
      year: 2020,
      image: "/images/ptinti1.jpg",
      description:"Sebagai Fullstak web developer membuat system website monitoring kontrak properti dengan tampilan responsive dengan sytem RBAC (role-basend access) memakai LDAP, Membuat crude di table dan vitur filtering data, membuat pemberitahuan mengirim/ menerima pesan berupa notif ke email semisal jika kontrak belum bayar,sudah bayar,jatuh tempo, Menu utama dashbord, properti management, kontrack management, usermanagemnt, tools yang saya gunakan framework CI, style tailwind css, java scripts dan database mysql ",
      githubUrl: "https://github.com/Daniramdev/PT_INTI.git",
    },
    {
      id: 2,
      name: "PT.PLN(iconnect)",
      year: 2023,
      image: "/images/pln.jpg",
      description:"Sebagai fullstak web developer membuat system management data tampilan serponsive modern meyesuaikan mode dekstop dan moble, dengan sytem RBAC (role-basend access) password pakai hassing. saya Membuat 26 diagram dengan total rata2 menu utama asset, retail, presale dan management data meyedianakan fitur export/import file folmat excel.csv, filtering data,seach berdasarkan nama,tanggal dll, dan membuat system crude, didalam management data untuk pengelolaan data, tools yg saya gunakan framework flask, style tailwindcss, java script buat diagram dll, database mysql,dengan demikian dapat memudahkan pengelolaan data/monitoring data dengan efesien dan akurat.",
      githubUrl: "https://github.com/Daniramdev/PT_PLN.git",
    },
   
    
  ];

  // Experimental Projects
  const experimentalProjects = [
    {
      id: 6,
      name: "Chatbot AI LM-B3 DG-3",
      year: 2024,
      image: "/images/chatbot-ai.jpg",
      description:
        "A smart chatbot leveraging DistilBERT to classify user intents and deliver contextual responses. It integrates a JSON-based question dataset with Retrieval-Augmented Generation (RAG) using TF-IDF to fetch relevant portfolio information. Key features include dynamic time-based greetings, conversation context tracking, and seamless frontend integration via REST APIs. Built with Python, Flask, and Transformers, it supports over 50 intents for a wide range of user queries.",
      githubUrl: "https://github.com/Daniramdev/Chatbot-AI-LM-B3.git",
    },
  ];

  const allProjects = [...officialProjects, ...experimentalProjects];

  // Smooth follow effect with spring physics
  useEffect(() => {
    if (!isHovering) return;

    const followSpeed = 0.16; // Lower is slower/smoother
    const stiffness = 0.1; // Spring stiffness
    const damping = 0.7; // Spring damping

    let animationFrameId;
    let velocity = { x: 0, y: 0 };

    const animate = () => {
      const dx = cursorPosition.x - imagePosition.x;
      const dy = cursorPosition.y - imagePosition.y;

      // Spring physics calculation
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
  }, [cursorPosition, isHovering, imagePosition]); // Added imagePosition to resolve ESLint warning

  const handleMouseEnter = (e, project) => {
    if (!project.image) return;

    setCursorPosition({ x: e.clientX, y: e.clientY });
    setImagePosition({ x: e.clientX, y: e.clientY });
    setHoveredImage(project.image);
    setIsHovering(true);

    // Adjust size based on project type
    setImageSize({
      width: activeTab === "official" ? 280 : 320,
      height: activeTab === "official" ? 180 : 220,
    });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTimeout(() => {
      if (!isHovering) setHoveredImage(null);
    }, 300);
  };

  const renderOfficialProjects = () => (
    <div id="project" className="grid grid-cols-1 gap-9 ">
      {officialProjects.map((project) => (
        <div
          key={project.id}
          className="relative group"
          onMouseMove={(e) => setCursorPosition({ x: e.clientX, y: e.clientY })}
          onMouseEnter={(e) => handleMouseEnter(e, project)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center justify-between mb-4 z-10 relative px-3 md:px-0">
            <h2
              className="text-2xl md:text-6xl font-bold cursor-pointer transition-all duration-300 hover:text-gray-400 p-2 rounded-lg transform hover:scale-105"
              onClick={() => {
                setSelectedProject(project);
                if (project.image) setActiveProject(project.id);
              }}
              aria-label={`View details for ${project.name}`}
            >
              {project.name}
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-xl md:text-2xl text-gray-400">{project.year}</span>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors rounded-full p-1 hover:bg-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    window.open(project.githubUrl, "_blank");
                  }}
                  aria-label={`Visit GitHub repository for ${project.name}`}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>
          <div className="border-gray-700 border-b-4 pb-2 mt-4 z-0 relative"></div>
        </div>
      ))}
    </div>
  );

  const renderExperimentalProjects = () => (
    <div className="grid grid-cols-1 gap-9 ">
      {experimentalProjects.map((project) => (
        <div
          key={project.id}
          className="relative group bg-gradient-to-r from-blue-600 to-purple-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          onMouseMove={(e) => setCursorPosition({ x: e.clientX, y: e.clientY })}
          onMouseEnter={(e) => handleMouseEnter(e, project)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center justify-between mb-4 z-10 relative">
            <h2
              className="text-2xl md:text-6xl font-bold cursor-pointer transition-all duration-300 hover:text-white p-2 rounded-lg transform hover:scale-105"
              onClick={() => {
                setSelectedProject(project);
                if (project.image) setActiveProject(project.id);
              }}
              aria-label={`View details for ${project.name}`}
            >
              {project.name}
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-xl md:text-2xl text-white opacity-80">{project.year}</span>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-200 transition-colors rounded-full p-2 hover:bg-blue-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    window.open(project.githubUrl, "_blank");
                  }}
                  aria-label={`Visit GitHub repository for ${project.name}`}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>
          <p className="text-white text-base md:text-lg mb-4 opacity-90">{project.description}</p>
          <div className="border-white border-b-4 border-opacity-20 pb-2 mt-4 z-0 relative"></div>
        </div>
      ))}
    </div>
  );

  const renderDescriptionModal = () => {
    if (!selectedProject) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4 backdrop-blur-sm"
        onClick={() => setSelectedProject(null)}
      >
        <div
          className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4 sm:mx-auto shadow-2xl transform transition-all duration-300 scale-100 border border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{selectedProject.name}</h3>
            <span className="text-gray-400 text-lg">{selectedProject.year}</span>
          </div>

          {selectedProject.image && (
            <div className="mb-6 rounded-lg overflow-hidden">
              <img
                src={selectedProject.image}
                alt={selectedProject.name}
                className="w-full h-48 sm:h-64 object-cover hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                onClick={() => setActiveProject(selectedProject.id)}
              />
            </div>
          )}

          <p className="text-gray-300   mb-6 leading-relaxed text-xs">{selectedProject.description}</p>

          <div className="flex flex-wrap gap-3 mb-6">
            {selectedProject.tags?.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-700 text-sm rounded-full text-gray-300">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex justify-end space-x-3">
            {selectedProject.githubUrl && (
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View Code
              </a>
            )}

            {selectedProject.demoUrl && (
              <a
                href={selectedProject.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Live Demo
              </a>
            )}

            <button
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              onClick={() => setSelectedProject(null)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="projects" className="bg-gray-900 text-white py-16 md:py-6 shadow-md relative md:px-40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Tabs - Left Aligned */}
        <nav className="flex mb-12 bg-gray-800 p-1 rounded-xl justify-start w-[300px]">
          <button
            className={`px-6 py-3 rounded-lg font-semibold transition-all text-center ${
              activeTab === "official" ? "bg-blue-600 text-white shadow-lg" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("official")}
          >
            Project Official 
          </button>
          <button
            className={`px-6 py-3 rounded-lg font-semibold transition-all text-center ${
              activeTab === "experimental" ? "bg-purple-600 text-white shadow-lg" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("experimental")}
          >
            Experimental
          </button>
        </nav>

        {/* Render Active Tab Content */}
        <div className="mb-8">
          {activeTab === "official" && renderOfficialProjects()}
          {activeTab === "experimental" && renderExperimentalProjects()}
        </div>

        {/* Zoomed Image Modal */}
        {activeProject !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 backdrop-blur-sm p-4"
            onClick={() => setActiveProject(null)}
          >
            <div className="relative max-w-6xl w-full h-full flex items-center justify-center">
              <button
                className="absolute top-4 right-4 text-white bg-gray-900 bg-opacity-50 rounded-full p-2 hover:bg-opacity-100 transition-all z-50"
                onClick={() => setActiveProject(null)}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {(() => {
                const activeProjectData = allProjects.find((p) => p.id === activeProject);
                return activeProjectData?.image ? (
                  <img
                    src={activeProjectData.image}
                    alt={`Zoomed view of ${activeProjectData.name} project`}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transform scale-100 transition-transform duration-300"
                  />
                ) : null;
              })()}
            </div>
          </div>
        )}

        {/* Description Modal */}
        {renderDescriptionModal()}

        {/* Enhanced Hovered Image with Spring Physics */}
        {hoveredImage && (
          <div className="hidden md:block fixed top-0 left-0 pointer-events-none z-[100]">
            <div
              className="absolute transition-transform duration-75 ease-out will-change-transform"
              style={{
                transform: `translate(calc(${imagePosition.x}px - 50%), calc(${imagePosition.y}px - 50%))`,
                width: `${imageSize.width}px`,
                height: `${imageSize.height}px`,
                filter: isHovering ? "drop-shadow(0 10px 20px rgba(0,0,0,0.3))" : "none",
                transition: "filter 0.3s ease",
              }}
            >
              <div className="relative w-full h-full">
                <img
                  src={hoveredImage}
                  alt="Project preview"
                  className={`absolute inset-0 w-full h-full object-cover rounded-lg transition-all duration-300 ${
                    isHovering ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                  style={{
                    transformOrigin: "center center",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
                <div
                  className={`absolute inset-0 bg-white rounded-lg transition-opacity duration-500 ${
                    isHovering ? "opacity-10" : "opacity-0"
                  }`}
                  style={{
                    filter: "blur(15px)",
                    transform: "scale(0.95)",
                    transformOrigin: "center center",
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="text-center text-gray-400 text-xs">
        <p className="text-danger-500">*Catatan*</p>
      <h1>"jika inggin melihat project lebih lengkap klick text project.</h1>
      </div>
    </div>
  );
};

export default ProjectList;



