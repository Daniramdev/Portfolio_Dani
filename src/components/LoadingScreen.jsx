import { useEffect, useRef } from "react";

export default function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    // Trigger slideIn
    container.classList.add("animate-slideIn");

    // After slideIn completes, trigger slideUp
    const timer = setTimeout(() => {
      container.classList.remove("animate-slideIn");
      container.classList.add("animate-slideUp");

      // Call callback after slideUp completes
      setTimeout(() => {
        if (typeof onComplete === 'function') {
          onComplete();
        }
      }, 800); // Match this with slideUp animation duration
    }, 2000); // Delay before starting slideUp

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 font-sans flex items-center justify-center bg-black"
    >
      <div className="smooth-transform flex flex-col items-center p-4 max-w-xs w-full">
        {/* Loader */}
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-white font-medium opacity-fade show text-sm sm:text-base">Loading...</p>
      </div>
    </div>
  );
}