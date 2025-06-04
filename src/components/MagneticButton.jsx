import React, { useRef } from "react";

const MagneticButton = ({ children }) => {
  const buttonRef = useRef(null);

  const handleMove = (clientX, clientY) => {
    const rect = buttonRef.current.getBoundingClientRect();
    const x = clientX - rect.left - rect.width / 2;
    const y = clientY - rect.top - rect.height / 2;

    buttonRef.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    buttonRef.current.style.transform = `translate(0, 0)`;
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    if (touch) {
      handleMove(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = () => {
    buttonRef.current.style.transform = `translate(0, 0)`;
  };

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchMove} // Mulai deteksi sentuhan
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="p-3 md:text-black text-3xl md:text-lg font-semibold transition-transform duration-300 ease-out cursor-pointer"
    >
      {children}
    </div>
  );
};

export default MagneticButton;