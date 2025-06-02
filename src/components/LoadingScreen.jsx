import { useEffect, useRef } from "react";

export default function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    // Trigger slideIn
    container.classList.add("animate-slideIn");

    // Setelah slideIn selesai, trigger slideUp
    const timer = setTimeout(() => {
      container.classList.remove("animate-slideIn");
      container.classList.add("animate-slideUp"); // <-- Tambahkan ini

      // Panggil callback setelah slideUp selesai
      setTimeout(() => {
        onComplete();
      }, 800); // sesuaikan dengan durasi animasi slideUp
    }, 2000); // delay sebelum mulai slideUp

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
    >
      <div className="smooth-transform flex flex-col items-center">
        {/* Loader */}
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-white font-medium opacity-fade show">Loading...</p>
      </div>
    </div>
  );
}