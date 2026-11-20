import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function ImageGallery({ images, title }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Menutup lightbox saat tombol Esc ditekan
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  // Mencegah scroll body saat lightbox terbuka
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedIndex]);

  if (!images || images.length === 0) return null;

  const nextImage = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Tampilan Grid di Kartu Proyek */}
      <div
        className={`grid gap-3 mb-6 ${
          images.length > 1 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
        }`}
      >
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setSelectedIndex(i)}
            className="relative group/gallery block overflow-hidden rounded-2xl border border-blue-100 bg-slate-50 cursor-zoom-in focus:outline-none"
          >
            <img
              src={src}
              alt={`${title} - screenshot ${i + 1}`}
              loading="lazy"
              className="w-full h-48 sm:h-56 object-cover object-top hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover/gallery:bg-black/10 transition-colors duration-300" />
          </button>
        ))}
      </div>

      {/* Lightbox Modal (Pop-up Besar) */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-4 sm:p-10"
          >
            {/* Tombol Close */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 sm:p-3 rounded-full transition-all z-50"
            >
              <X size={24} />
            </button>

            {/* Tombol Prev */}
            {images.length > 1 && (
              <button
                onClick={prevImage}
                className="absolute left-4 sm:left-10 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 sm:p-4 rounded-full transition-all z-50"
              >
                <ChevronLeft size={28} />
              </button>
            )}

            {/* Gambar Utama di Lightbox */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-7xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            >
              <img
                src={images[selectedIndex]}
                alt={`${title} - screenshot ${selectedIndex + 1}`}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
              
              {/* Indikator Angka (misal: 2 / 5) */}
              {images.length > 1 && (
                <div className="mt-4 text-white/80 font-medium bg-black/40 px-4 py-1.5 rounded-full text-sm backdrop-blur-sm">
                  {selectedIndex + 1} / {images.length}
                </div>
              )}
            </motion.div>

            {/* Tombol Next */}
            {images.length > 1 && (
              <button
                onClick={nextImage}
                className="absolute right-4 sm:right-10 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 sm:p-4 rounded-full transition-all z-50"
              >
                <ChevronRight size={28} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}