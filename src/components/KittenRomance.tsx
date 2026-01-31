import React from 'react';
import { motion } from 'framer-motion';

const KittenSVG = ({ color = '#ffffff', ribbonColor = '#ff4d6d', isMale = false }: { color?: string, ribbonColor?: string, isMale?: boolean }) => (
    <svg viewBox="0 0 100 120" className="w-full h-full">
        {/* Tail */}
        <motion.path
            d="M80 85 Q95 80 95 70 Q95 60 85 65"
            stroke="#2d2d2d"
            strokeWidth="3"
            fill={color}
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ transformOrigin: '80px 85px' }}
        />

        {/* Body & Clothing */}
        {isMale ? (
            <g>
                {/* Dear Daniel Blue Overalls */}
                <rect x="30" y="70" width="40" height="40" rx="10" fill="#14c3ff" stroke="#2d2d2d" strokeWidth="3" />
                <rect x="35" y="100" width="12" height="15" rx="5" fill="#ffffff" stroke="#2d2d2d" strokeWidth="3" />
                <rect x="53" y="100" width="12" height="15" rx="5" fill="#ffffff" stroke="#2d2d2d" strokeWidth="3" />
                <circle cx="38" cy="80" r="3" fill="white" />
                <circle cx="62" cy="80" r="3" fill="white" />
            </g>
        ) : (
            <g>
                {/* Hello Kitty Blue Jumper */}
                <rect x="30" y="70" width="40" height="40" rx="10" fill="#0066cc" stroke="#2d2d2d" strokeWidth="3" />
                {/* Red Shirt Sleeves */}
                <rect x="20" y="80" width="15" height="15" rx="5" fill="#ff4d6d" stroke="#2d2d2d" strokeWidth="3" />
                <rect x="65" y="80" width="15" height="15" rx="5" fill="#ff4d6d" stroke="#2d2d2d" strokeWidth="3" />
                {/* Legs */}
                <rect x="35" y="105" width="12" height="10" rx="4" fill="#ffffff" stroke="#2d2d2d" strokeWidth="3" />
                <rect x="53" y="105" width="12" height="10" rx="4" fill="#ffffff" stroke="#2d2d2d" strokeWidth="3" />
            </g>
        )}

        {/* Arms/Paws */}
        <circle cx="28" cy="88" r="7" fill={color} stroke="#2d2d2d" strokeWidth="3" />
        <circle cx="72" cy="88" r="7" fill={color} stroke="#2d2d2d" strokeWidth="3" />

        {/* Ears */}
        <path d="M25 35 Q15 15 45 25" fill={color} stroke="#2d2d2d" strokeWidth="4" />
        <path d="M75 35 Q85 15 55 25" fill={color} stroke="#2d2d2d" strokeWidth="4" />

        {/* Hair for Dear Daniel */}
        {isMale && (
            <g>
                <path d="M40 20 L42 5 L48 18" fill="none" stroke="#2d2d2d" strokeWidth="2" strokeLinecap="round" />
                <path d="M50 18 L50 3 L55 18" fill="none" stroke="#2d2d2d" strokeWidth="2" strokeLinecap="round" />
                <path d="M58 20 L62 8 L65 22" fill="none" stroke="#2d2d2d" strokeWidth="2" strokeLinecap="round" />
            </g>
        )}

        {/* Face */}
        <ellipse cx="50" cy="50" rx="45" ry="38" fill={color} stroke="#2d2d2d" strokeWidth="4" />

        {/* Eyes */}
        <circle cx="32" cy="50" r="5" fill="#2d2d2d" />
        <circle cx="68" cy="50" r="5" fill="#2d2d2d" />

        {/* Nose */}
        <ellipse cx="50" cy="58" rx="6" ry="4" fill="#ffd000" stroke="#2d2d2d" strokeWidth="1" />

        {/* Whiskers */}
        <line x1="8" y1="50" x2="25" y2="52" stroke="#2d2d2d" strokeWidth="3" strokeLinecap="round" />
        <line x1="8" y1="60" x2="25" y2="58" stroke="#2d2d2d" strokeWidth="3" strokeLinecap="round" />
        <line x1="8" y1="70" x2="25" y2="64" stroke="#2d2d2d" strokeWidth="3" strokeLinecap="round" />

        <line x1="92" y1="50" x2="75" y2="52" stroke="#2d2d2d" strokeWidth="3" strokeLinecap="round" />
        <line x1="92" y1="60" x2="75" y2="58" stroke="#2d2d2d" strokeWidth="3" strokeLinecap="round" />
        <line x1="92" y1="70" x2="75" y2="64" stroke="#2d2d2d" strokeWidth="3" strokeLinecap="round" />

        {/* Ribbon for Hello Kitty */}
        {!isMale && (
            <g transform="translate(65, 10)">
                <path d="M10 15 L0 5 L20 5 L10 15 Z" fill={ribbonColor} stroke="#2d2d2d" strokeWidth="3" />
                <path d="M10 15 L0 25 L20 25 L10 15 Z" fill={ribbonColor} stroke="#2d2d2d" strokeWidth="3" />
                <circle cx="10" cy="15" r="5" fill={ribbonColor} stroke="#2d2d2d" strokeWidth="3" />
            </g>
        )}
    </svg>
);

const LoveSymbol = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
    <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className={`relative inline-block ${className}`}
    >
        <svg viewBox="0 0 100 100" width={size} height={size} className="fill-kawaii-500 text-kawaii-500">
            <path d="M50 85 C50 85 10 60 10 35 C10 15 35 5 50 25 C65 5 90 15 90 35 C90 60 50 85 50 85 Z" />
        </svg>
    </motion.div>
);

export const KittenRomance: React.FC<{
    isHome?: boolean;
    currentStep?: number;
    totalSteps?: number;
    scrollProgress?: number;
    isRevealed?: boolean;
}> = ({
    isHome = false,
    currentStep = 0,
    totalSteps = 14,
    scrollProgress = 0,
    isRevealed = false
}) => {
        // If revealed, we use scrollProgress primarily
        // If not revealed, we use currentStep progress
        const progress = isRevealed
            ? Math.min(scrollProgress * 1.5, 1) // Scale it so they meet before the very bottom
            : (isHome ? 0.3 : Math.min(currentStep / totalSteps, 1));

        const isDay14 = isRevealed ? (progress > 0.95) : (currentStep === totalSteps);

        // Position kittens: from edges to center meeting point
        // Male moves from left, Female moves from right
        // Target center meeting point with slight offset for aesthetics
        const maleX = isHome ? '40vw' : `${progress * 42}vw`;
        const femaleX = isHome ? '-40vw' : `${progress * -42}vw`;

        return (
            <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${isHome ? 'bg-gradient-to-br from-kawaii-50/50 to-kawaii-100/50' : ''}`}>
                {/* Male Kitten */}
                <motion.div
                    className={`absolute w-48 h-60 md:w-56 md:h-72 ${isHome ? 'bottom-1/4 left-[-100px]' : 'bottom-6 md:bottom-10 left-[-100px]'}`}
                    animate={{
                        x: maleX,
                        y: [0, -10, 0],
                        rotate: isDay14 ? [0, 10, 0] : [0, 5, -5, 0]
                    }}
                    transition={{
                        duration: isDay14 ? 1 : 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <KittenSVG isMale={true} color="#f0f0f0" />
                </motion.div>

                {/* Female Kitten */}
                <motion.div
                    className={`absolute w-48 h-60 md:w-56 md:h-72 ${isHome ? 'bottom-1/4 right-[-100px]' : 'bottom-6 md:bottom-10 right-[-100px]'}`}
                    animate={{
                        x: femaleX,
                        y: [0, -10, 0],
                        rotate: isDay14 ? [0, -10, 0] : [0, -5, 5, 0]
                    }}
                    transition={{
                        duration: isDay14 ? 1 : 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                    }}
                >
                    <KittenSVG isMale={false} color="#ffffff" />
                </motion.div>

                {/* Day 14 Special: Non-stop Love Explosion */}
                {isDay14 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    scale: [0, 1.5, 0],
                                    opacity: [0, 1, 0],
                                    x: [0, (i - 2.5) * 100, (i - 2.5) * 200],
                                    y: [0, -150, -300],
                                    rotate: [0, 45, 90]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.3,
                                    ease: "easeOut"
                                }}
                                className="absolute"
                            >
                                <LoveSymbol size={40 + i * 10} />
                            </motion.div>
                        ))}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="text-6xl md:text-8xl"
                        >
                            💖
                        </motion.div>
                    </div>
                )}

                {/* Occasional Heart Burst when they get close */}
                {!isDay14 && (
                    <motion.div
                        className="absolute left-1/2 -translate-x-1/2 bottom-32"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: progress > 0.6 ? [0, 1.5, 0] : 0,
                            opacity: progress > 0.6 ? [0, 1, 0] : 0,
                            y: [0, -50, -100]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatDelay: 5
                        }}
                    >
                        <LoveSymbol size={80} />
                    </motion.div>
                )}

                {/* "Loving" Text for Home */}
                {isHome && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2 }}
                        className="absolute bottom-20 left-1/2 -translate-x-1/2 text-kawaii-300 font-black text-2xl tracking-[0.5em] whitespace-nowrap"
                    >
                        TRUE LOVE ✨
                    </motion.div>
                )}
            </div>
        );
    };

export default KittenRomance;
