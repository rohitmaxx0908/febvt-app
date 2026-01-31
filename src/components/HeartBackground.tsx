import React, { useEffect, useState } from 'react';
import { Heart, Sparkles, Star } from 'lucide-react';

const HeartBackground: React.FC = () => {
    const [elements, setElements] = useState<{ id: number; left: string; size: number; duration: number; delay: number; type: 'heart' | 'sparkle' | 'star' | 'bokeh' | 'petal'; rotation: number; opacity: number }[]>([]);

    useEffect(() => {
        const newElements = Array.from({ length: 120 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 110 - 5}%`,
            size: Math.random() * 45 + 10,
            duration: Math.random() * 25 + 15,
            delay: Math.random() * 40,
            type: i < 30 ? 'petal' : (i < 50 ? 'bokeh' : (Math.random() > 0.8 ? 'sparkle' : (Math.random() > 0.6 ? 'star' : 'heart'))),
            rotation: Math.random() * 360,
            opacity: Math.random() * 0.5 + 0.2
        })) as { id: number; left: string; size: number; duration: number; delay: number; type: 'heart' | 'sparkle' | 'star' | 'bokeh' | 'petal'; rotation: number; opacity: number }[];
        setElements(newElements);
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none bg-gradient-to-b from-[#fff0f3] via-[#ffccd5] to-[#ffe5ec] opacity-90">
            {/* Film Grain Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[10] animate-grain bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

            {/* Candlelight Glows */}
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-400/20 blur-[100px] rounded-full animate-candlelight" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange-400/20 blur-[100px] rounded-full animate-candlelight" style={{ animationDelay: '1s' }} />

            {/* Soft Bokeh Backdrop */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#fff5f7_0%,transparent_50%),radial-gradient(circle_at_80%_70%,#fff5f7_0%,transparent_50%)] opacity-40" />

            {elements.map((el) => (
                <div
                    key={el.id}
                    className="absolute animate-float-up"
                    style={{
                        left: el.left,
                        bottom: '-10%',
                        animationDuration: `${el.duration}s`,
                        animationDelay: `-${el.delay}s`,
                    }}
                >
                    <div className="animate-drift" style={{ animationDuration: `${el.duration * 0.5}s` }}>
                        {el.type === 'heart' && (
                            <Heart
                                className="fill-kawaii-400 text-kawaii-300 drop-shadow-[0_0_8px_rgba(255,152,172,0.5)]"
                                style={{
                                    width: el.size,
                                    height: el.size,
                                    opacity: el.opacity,
                                    transform: `rotate(${el.rotation}deg)`,
                                }}
                            />
                        )}
                        {el.type === 'petal' && (
                            <svg
                                viewBox="0 0 24 24"
                                style={{
                                    width: el.size * 1.2,
                                    height: el.size * 1.2,
                                    opacity: el.opacity * 0.8,
                                    transform: `rotate(${el.rotation}deg)`,
                                    fill: '#ff85a1',
                                }}
                            >
                                <path d="M12,2C12,2 4,10 4,16C4,19.31 6.69,22 10,22C11.1,22 12.11,21.7 12.97,21.19C13,21.23 13.06,21.26 13.11,21.31C13.68,21.88 14.52,22.24 15.45,22.24C17.38,22.24 18.94,20.68 18.94,18.75C18.94,17.82 18.58,16.98 18.01,16.41C18.01,16.41 12,2 12,2Z" />
                            </svg>
                        )}
                        {el.type === 'bokeh' && (
                            <div
                                className="rounded-full bg-white/40 blur-xl"
                                style={{
                                    width: el.size * 3,
                                    height: el.size * 3,
                                    opacity: el.opacity * 0.5,
                                }}
                            />
                        )}
                        {el.type === 'sparkle' && (
                            <Sparkles
                                className="text-white fill-white animate-pulse"
                                style={{
                                    width: el.size * 0.8,
                                    height: el.size * 0.8,
                                    opacity: el.opacity * 1.5,
                                }}
                            />
                        )}
                        {el.type === 'star' && (
                            <Star
                                className="text-kitty-yellow fill-kitty-yellow opacity-30"
                                style={{
                                    width: el.size * 0.7,
                                    height: el.size * 0.7,
                                    opacity: el.opacity,
                                    transform: `rotate(${el.rotation}deg)`,
                                }}
                            />
                        )}
                    </div>
                </div>
            ))}

            {/* Premium Vignette & Soft Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,240,243,0.3)_100%)] shadow-[inset_0_0_150px_rgba(255,182,193,0.3)]" />
        </div>
    );
};

export default HeartBackground;
