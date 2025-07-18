import React from 'react';

function MovingText() {
  const text = "- Dani Ramdani - Fullstack Web Developer - Dani Ramdani - Fullstack Web Developer ";

  return (
    <div className="flex justify-center font-sans items-center h-40 bg-black shadow-lg overflow-hidden">
      {/* Container utama */}
      <div className="moving-text-wrapper">
        <div className="moving-text-track">
          <span className="moving-text-item text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-6xl md:text-8xl font-semibold">
            {text}
          </span>
          <span className="moving-text-item text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-6xl md:text-8xl font-semibold">
            {text}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MovingText;