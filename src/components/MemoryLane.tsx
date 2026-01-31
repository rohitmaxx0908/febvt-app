import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface MemoryLaneProps {
    images: string[];
    imageCaptions: string[];
}

const MemoryLane: React.FC<MemoryLaneProps> = ({ images, imageCaptions }) => {
    if (images.length === 0) return null;

    return (
        <div className="space-y-24 md:space-y-32 py-12 md:py-20 relative">
            {/* Background Overflow Symbols */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 0.1, scale: 1 }}
                        animate={{
                            y: [0, -60, 0],
                            rotate: [0, 360],
                            x: [0, Math.sin(i) * 30, 0]
                        }}
                        transition={{
                            duration: 10 + i,
                            repeat: Infinity,
                            delay: i * 0.5
                        }}
                        className="absolute text-kawaii-200"
                        style={{
                            left: `${(i * 9) % 100}%`,
                            top: `${(i * 17) % 100}%`,
                            fontSize: `${16 + (i % 5) * 12}px`
                        }}
                    >
                        <Heart fill="currentColor" />
                    </motion.div>
                ))}
            </div>

            {images.map((img, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                        type: 'spring',
                        damping: 15,
                        stiffness: 100,
                        delay: 0.1
                    }}
                    className="flex flex-col items-center w-full"
                >
                    <div className="relative group flex flex-col items-center">
                        {/* Intensive Decorative Glow */}
                        <div className="absolute -inset-6 bg-gradient-to-tr from-kawaii-600/30 via-kawaii-400/15 to-kawaii-500/30 blur-2xl rounded-[3rem] group-hover:scale-110 transition-transform duration-700" />

                        {/* Image Container with Double Border Glow */}
                        <div className="relative z-10 p-5 md:p-8 bg-white/30 backdrop-blur-xl rounded-[2.5rem] md:rounded-[3.5rem] border-[8px] md:border-[12px] border-white/80 shadow-[0_30px_60px_-15px_rgba(194,0,84,0.3)] ring-6 ring-kawaii-400/20 transform transition-all group-hover:scale-105 duration-500">
                            <img
                                src={img}
                                alt={`Memory ${index + 1}`}
                                className="w-full max-w-[280px] md:max-w-xs aspect-square object-cover rounded-[2rem] md:rounded-[2.5rem] shadow-inner"
                            />

                            {/* Floating Symbols with pop animation */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ type: 'spring', delay: 0.5 }}
                                className="absolute -right-6 -top-6 text-kawaii-600 drop-shadow-xl z-20"
                            >
                                <Heart size={48} fill="currentColor" stroke="white" strokeWidth={2} />
                            </motion.div>

                            <motion.div
                                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                                transition={{ repeat: Infinity, duration: 3, delay: index * 0.3 }}
                                className="absolute -left-5 -bottom-5 text-kitty-yellow drop-shadow-xl z-20"
                            >
                                <Sparkles size={40} />
                            </motion.div>
                        </div>

                        {/* Enhanced Caption */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-6 text-center"
                        >
                            <span className="text-kawaii-600 font-black text-lg md:text-xl tracking-wide bg-white/70 px-6 md:px-10 py-2.5 md:py-4 rounded-2xl md:rounded-3xl backdrop-blur-md shadow-xl border-2 md:border-4 border-white inline-block">
                                {imageCaptions[index] ? `Topic: ${imageCaptions[index]}` : `Love Moment #${index + 1}`} 💖
                            </span>
                        </motion.div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default MemoryLane;
