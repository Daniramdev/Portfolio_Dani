// LogoAnimation.jsx
import React from "react";

export default function LogoAnimation() {
  return (
    <div className="relative flex items-center justify-center h-20 w-20">
      {/* Lingkaran teks animasi */}
      <div className="absolute w-28 h-28 animate-spin-slow">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <path id="textPath" d="M100,100 m-75,0 a75,75 0 1,1 150,0 a75,75 0 1,1 -150,0" />
          </defs>
          <text fill="black" fontSize="12" fontWeight="bold">
            <textPath href="#textPath" startOffset="0%">
              O R I G I N A L  W E B P O R T F O L I O • D A N I  R A M D A N I • O R I G I N A L  W E B P O R T F O L I O
            </textPath>
          </text>
        </svg>
      </div>

      {/* Logo Center */}
      <div className="relative flex items-center justify-center w-16 h-16 bg-gray-900 rounded-full shadow-lg">
        <p className="text-white font-bold text-xl">Dani</p>
      </div>
    </div>
  );
}