import React, { useRef } from "react";

const MagneticButton = ({ children }) => {
  const buttonRef = useRef(null);

  const handleMove = (clientX, clientY) => {
    const rect = buttonRef.current.getBoundingClientRect();
    const x = clientX - rect.left - rect.width / 2;
    const y = clientY - rect.top - rect.height / 2;

    // Tingkatkan sensitivitas dengan menaikkan angka multiplier
    buttonRef.current.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px) scale(1.05)`;
    buttonRef.current.style.transition = "transform 0.1s ease-out";
  };

  const resetTransform = () => {
    buttonRef.current.style.transform = `translate(0px, 0px) scale(1)`;
    buttonRef.current.style.transition = "transform 0.2s ease-in-out";
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    resetTransform();
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    if (touch) {
      handleMove(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = () => {
    resetTransform();
  };

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="p-3 md:text-black text-3xl md:text-lg font-semibold duration-300 cursor-pointer will-change-transform"
    >
      {children}
    </div>
  );
};

export default MagneticButton;