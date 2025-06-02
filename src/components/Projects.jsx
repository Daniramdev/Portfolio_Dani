import React from 'react';

function ProjectSection() {
  // Daftar URL gambar (ganti dengan URL gambar Anda)
  const images = [
    "/images/pln.jpg",
    "/images/ptinti1.jpg",
    "/images/pln.jpg",
    "/images/ptinti1.jpg",
    "/images/pln.jpg",
   
  ];

  return (
    <div className="flex flex-col justify-center items-center min-h-screen mt-48 mb-48 overflow-hidden">
      {/* Baris pertama: Gambar bergerak dari kiri ke kanan */}
      <div className="moving-images-left flex whitespace-nowrap mb-8">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Project ${index + 1}`}
            className="h-60 w-full object-cover mx-4"
          />
        ))}
        {images.map((img, index) => (
          <img
            key={index + images.length}
            src={img}
            alt={`Project ${index + 1}`}
            className="h-60 w-full object-cover mx-4"
          />
        ))}
      </div>

      {/* Baris kedua: Gambar bergerak dari kanan ke kiri */}
      <div className="moving-images-right flex whitespace-nowrap">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Project ${index + 1}`}
            className="h-60 w-full object-cover mx-4"
          />
        ))}
        {images.map((img, index) => (
          <img
            key={index + images.length}
            src={img}
            alt={`Project ${index + 1}`}
            className="h-60 w-full object-cover mx-4"
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectSection;
