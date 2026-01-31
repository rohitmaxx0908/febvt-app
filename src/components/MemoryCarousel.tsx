import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Sparkles } from 'lucide-react';

interface MemoryCarouselProps {
    images: string[];
}

export const MemoryCarousel: React.FC<MemoryCarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (images.length === 0) return null;

    return (
        <div className="relative w-full max-w-md mx-auto">
            <div className="relative aspect-square rounded-[3rem] overflow-hidden border-[12px] border-white shadow-2xl bg-kawaii-50 group">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        initial={{ opacity: 0, scale: 1.1, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: -50 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full h-full object-cover"
                    />
                </AnimatePresence>

                {/* Sticker Decorations */}
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="absolute top-4 right-4 text-kawaii-500 drop-shadow-lg"
                >
                    <Heart size={40} fill="currentColor" />
                </motion.div>

                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-4 left-4 text-yellow-400 drop-shadow-lg"
                >
                    <Sparkles size={40} fill="currentColor" />
                </motion.div>

                {/* Progress Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, i) => (
                        <div
                            key={i}
                            className={`w-3 h-3 rounded-full transition-all ${i === currentIndex ? 'bg-white scale-125' : 'bg-white/40'}`}
                        />
                    ))}
                </div>
            </div>

            {images.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-[-30px] top-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center border-4 border-kawaii-100 shadow-xl text-kawaii-500 hover:scale-110 active:scale-95 transition-all z-10"
                    >
                        <ChevronLeft size={32} strokeWidth={3} />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-[-30px] top-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center border-4 border-kawaii-100 shadow-xl text-kawaii-500 hover:scale-110 active:scale-95 transition-all z-10"
                    >
                        <ChevronRight size={32} strokeWidth={3} />
                    </button>
                </>
            )}

            <div className="mt-4 text-kawaii-400 font-black text-sm tracking-widest uppercase">
                Memory {currentIndex + 1} of {images.length} ✨
            </div>
        </div>
    );
};

export default MemoryCarousel;
