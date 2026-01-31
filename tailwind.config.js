/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                kawaii: {
                    50: '#fff0f3',
                    100: '#ffb3c6', // Darker and more saturated
                    200: '#f9809c',
                    300: '#f54d7b',
                    400: '#e60067', // More intense pink
                    500: '#c20054', // Deep Crimson/Pink
                    600: '#9b0043',
                    700: '#7a0035',
                    800: '#5e0029',
                    900: '#42001c',
                    950: '#260010',
                },
                kitty: {
                    white: '#ffffff',
                    cream: '#fffdf9',
                    yellow: '#ffd000',
                    black: '#2d2d2d',
                    blue: '#14c3ff',
                    gold: '#ffd700',
                }
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
                outfit: ['Outfit', 'sans-serif'],
                bubble: ['"Gloria Hallelujah"', 'cursive'],
            },
            animation: {
                'float-up': 'floatUp linear infinite',
                'wiggle': 'wiggle 2s ease-in-out infinite',
                'bounce-slow': 'bounce 3s infinite',
                'sparkle': 'sparkle 2s ease-in-out infinite',
                'float-slow': 'floatSlow 6s ease-in-out infinite',
                'squish': 'squish 0.5s ease-in-out',
                'drift': 'drift linear infinite',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
            },
            keyframes: {
                floatUp: {
                    '0%': { transform: 'translateY(110vh) rotate(0deg)', opacity: '0' },
                    '10%': { opacity: '0.8' },
                    '90%': { opacity: '0.8' },
                    '100%': { transform: 'translateY(-20vh) rotate(360deg)', opacity: '0' },
                },
                drift: {
                    '0%': { transform: 'translateX(-20px) rotate(0deg)' },
                    '50%': { transform: 'translateX(20px) rotate(180deg)' },
                    '100%': { transform: 'translateX(-20px) rotate(360deg)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 10px #c20054, 0 0 20px #c20054' },
                    '50%': { boxShadow: '0 0 25px #e60067, 0 0 50px #e60067' },
                },
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-5deg)' },
                    '50%': { transform: 'rotate(5deg)' },
                },
                sparkle: {
                    '0%, 100%': { opacity: '1', scale: '1' },
                    '50%': { opacity: '0.4', scale: '1.3' },
                },
                floatSlow: {
                    '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
                    '50%': { transform: 'translateY(-30px) rotate(15deg)' },
                },
                squish: {
                    '0%, 100%': { transform: 'scale(1, 1)' },
                    '30%': { transform: 'scale(1.2, 0.8)' },
                    '60%': { transform: 'scale(0.8, 1.2)' },
                }
            },
        },
    },
    plugins: [],
}
