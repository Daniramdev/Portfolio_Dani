import React, { useRef } from "react";

const MagneticButton = ({ children }) => {
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    buttonRef.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const handleMouseLeave = () => {
    buttonRef.current.style.transform = `translate(0, 0)`;
  };

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="p-3 md:text-black text-3xl md:text-lg  font-semibold  transition-transform duration-300 ease-out cursor-pointer"
    >
      {children}
    </div>
  );
};

export default MagneticButton;
