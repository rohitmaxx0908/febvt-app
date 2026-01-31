import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, RefreshCw, ChevronRight, ChevronLeft, Star, Info, X, MessageCircleHeart, Share2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import confetti from 'canvas-confetti';
import HeartBackground from './components/HeartBackground';
import KittenRomance from './components/KittenRomance';
import MemoryLane from './components/MemoryLane';
import { supabase } from './lib/supabase';

// Types
interface WishData {
  from: string;
  to: string;
  firstMeet: string;
  firstImpression: string;
  favQuality: string;
  ourSong: string;
  cuteHabit: string;
  memory: string;
  reason: string;
  proposalStory: string;
  future: string;
  promise: string;
  images: string[];
  imageCaptions: string[];
  message: string;
  songLink?: string;
}

const LOVE_QUOTES = [
  "Every moment with you is a sweet memory I cherish. 🎀",
  "You're the whiskers to my kitten, the sparkle in my eye! ✨",
  "My heart does a little dance whenever I think of you. 💖",
  "Being with you is like a warm hug on a cold day. ☕",
  "You make every day feel like a magical surprise! 🪄",
  "I love you more than all the kittens in the world! 🐾",
  "You're my favorite human and my soul's best friend. 🌸",
  "Thank you for being the most wonderful part of my story. 📖"
];

const MAX_IMAGES = 14;

const BowIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 30C50 30 30 10 15 10C5 10 0 18 0 25C0 35 15 45 40 33" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
    <path d="M50 30C50 30 70 10 85 10C95 10 100 18 100 25C100 35 85 45 60 33" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
    <circle cx="50" cy="30" r="8" fill="currentColor" />
  </svg>
);

const LoveSymbol = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <motion.div
    animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
    transition={{ repeat: Infinity, duration: 2 }}
    className={`relative inline-block ${className}`}
  >
    <Heart size={size} className="fill-kawaii-500 text-kawaii-500" />
    <motion.div
      animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      className="absolute -top-1 -right-1 text-yellow-400"
    >
      <Sparkles size={size / 2} />
    </motion.div>
  </motion.div>
);

const SquishyButton = ({ children, onClick, className, disabled, variant = 'primary' }: any) => {
  const [isPressed, setIsPressed] = useState(false);

  const baseStyles = "relative px-8 py-4 rounded-[2rem] font-black text-xl transition-all duration-300 transform active:scale-90 flex items-center justify-center gap-3 overflow-hidden border-[8px]";
  const variants: any = {
    primary: "bg-kawaii-600 text-white border-white shadow-[0_8px_0_0_#ff0fb3] hover:translate-y-[2px] active:translate-y-[10px] active:shadow-none",
    secondary: "bg-white text-kawaii-700 border-kawaii-200 shadow-[0_8px_0_0_#ffb3c1] hover:translate-y-[2px] active:translate-y-[10px] active:shadow-none",
    accent: "bg-kitty-yellow text-kawaii-900 border-white shadow-[0_8px_0_0_#ffd000] hover:translate-y-[2px] active:translate-y-[10px] active:shadow-none",
    blue: "bg-kitty-blue text-white border-white shadow-[0_8px_0_0_#14c3ff] hover:translate-y-[2px] active:translate-y-[10px] active:shadow-none",
    outline: "bg-transparent text-kawaii-600 border-kawaii-600 hover:bg-kawaii-50"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className} ${disabled ? 'opacity-50 grayscale cursor-not-allowed shadow-none translate-y-0' : ''}`}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      <motion.div
        animate={isPressed ? { scale: [1, 1.3, 0.85] } : { scale: 1 }}
        className={`flex items-center gap-3 ${variant === 'secondary' || variant === 'accent' ? 'text-inherit' : 'text-white'} drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]`}
      >
        {children}
      </motion.div>
      <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity pointer-events-none" />
    </button>
  );
};

const ValentinesCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const target = new Date('2026-02-14T00:00:00');
    const timer = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/40 backdrop-blur-xl border-4 border-white/60 rounded-[2rem] p-6 shadow-2xl flex gap-4 md:gap-8 items-center justify-center glass-premium"
    >
      {[
        { label: 'Days', val: timeLeft.days },
        { label: 'Hrs', val: timeLeft.hours },
        { label: 'Min', val: timeLeft.minutes },
        { label: 'Sec', val: timeLeft.seconds }
      ].map((item, i) => (
        <div key={i} className="text-center">
          <div className="text-2xl md:text-4xl font-black text-kawaii-700 font-outfit drop-shadow-[0_2px_0_white]">{item.val}</div>
          <div className="text-[10px] md:text-xs font-black text-kawaii-400 uppercase tracking-widest">{item.label}</div>
        </div>
      ))}
    </motion.div>
  );
};

const RealisticEnvelope = ({ onOpen, to }: { onOpen: () => void, to: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(onOpen, 1500);
  };

  return (
    <div className="perspective-1000 w-full max-w-md aspect-[4/3] relative">
      <motion.div
        animate={isOpen ? { rotateX: -180 } : { rotateX: 0 }}
        transition={{ duration: 0.8, ease: "easeIn" }}
        className="absolute inset-0 bg-[#fff5f7] border-4 border-white shadow-2xl rounded-xl cursor-pointer z-20 origin-top flex items-center justify-center group"
        onClick={!isOpen ? handleOpen : undefined}
      >
        <div className="text-center">
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
            <Heart size={80} className="fill-kawaii-500 text-kawaii-400 mx-auto drop-shadow-xl" />
          </motion.div>
          <p className="mt-4 font-script text-3xl text-kawaii-700">For {to} 🎀</p>
          <p className="mt-2 font-black text-kawaii-400 uppercase tracking-widest text-xs">Click to open your surprise</p>
        </div>
      </motion.div>
      <div className="absolute inset-0 bg-white border-4 border-kawaii-100 shadow-inner rounded-xl z-10" />
      <motion.div
        animate={isOpen ? { y: -50, scale: 0.9, opacity: 0 } : { y: 0 }}
        className="absolute inset-0 bg-[#ffdce5] border-4 border-white/50 rounded-xl z-0"
      />
    </div>
  );
};

const FloatingElement = ({ children, className, delay = 0 }: any) => (
  <motion.div
    animate={{
      y: [0, -15, 0],
      rotate: [0, 5, -5, 0],
      scale: [1, 1.05, 1]
    }}
    transition={{
      duration: 3 + Math.random() * 2,
      repeat: Infinity,
      delay
    }}
    className={className}
  >
    {children}
  </motion.div>
);

function App() {
  const [view, setView] = useState<'home' | 'create' | 'surprise'>('home');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<WishData>({
    from: '',
    to: '',
    firstMeet: '',
    firstImpression: '',
    favQuality: '',
    ourSong: '',
    cuteHabit: '',
    memory: '',
    reason: '',
    proposalStory: '',
    future: '',
    promise: '',
    images: [],
    imageCaptions: [],
    message: '',
    songLink: ''
  });
  const [generatedLink, setGeneratedLink] = useState('');
  const [showCopied, setShowCopied] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showQuotes, setShowQuotes] = useState(false);
  const [decodeError, setDecodeError] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [clickHearts, setClickHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v: number) => setScrollProgress(v));
    return () => unsub();
  }, [scrollYProgress]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle interactive click effect
  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const y = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const id = Date.now();
    setClickHearts(prev => [...prev, { id, x, y }].slice(-15));
    setTimeout(() => {
      setClickHearts(prev => prev.filter(h => h.id !== id));
    }, 1000);
  };

  useEffect(() => {
    const loadWish = async () => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
      let data = params.get('data');

      // Hash-based data (Legacy/Fallback)
      if (window.location.hash.startsWith('#data=')) {
        data = window.location.hash.substring(6);
      }

      if (id) {
        // Fetch from Supabase
        try {
          const { data: wish, error } = await supabase
            .from('wishes')
            .select('data')
            .eq('id', id)
            .single();

          if (error) throw error;
          if (wish && wish.data) {
            setFormData(wish.data);
            setView('surprise');
          }
        } catch (err) {
          console.error('Failed to fetch wish from Supabase', err);
          setDecodeError("Oops! We couldn't find your magical story. It might have been lost in the kitten clouds. 😿");
        }
      } else if (data) {
        // Legacy decoding
        try {
          const decoded = JSON.parse(decodeURIComponent(escape(atob(data))));
          if (!decoded.to || !decoded.from) throw new Error("Incomplete data");
          setFormData({
            to: decoded.to || '',
            from: decoded.from || '',
            firstMeet: decoded.firstMeet || '',
            firstImpression: decoded.firstImpression || '',
            favQuality: decoded.favQuality || '',
            ourSong: decoded.ourSong || '',
            cuteHabit: decoded.cuteHabit || '',
            memory: decoded.memory || '',
            reason: decoded.reason || '',
            proposalStory: decoded.proposalStory || '',
            future: decoded.future || '',
            promise: decoded.promise || '',
            message: decoded.message || '',
            images: decoded.images || [],
            imageCaptions: decoded.imageCaptions || []
          });
          setView('surprise');
        } catch (e) {
          console.error('Failed to decode wish data', e);
          setDecodeError("Oh no! This link seems broken or too chunky for the browser. 😿 Please ask your kitten to send it again!");
        }
      }
    };

    loadWish();
  }, []);

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 250;
          const MAX_HEIGHT = 250;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.3));
        };
      };
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsCompressing(true);
    try {
      const slotsLeft = MAX_IMAGES - formData.images.length;
      const compressedImages = await Promise.all(
        files.slice(0, slotsLeft).map(file => compressImage(file))
      );
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...compressedImages].slice(0, MAX_IMAGES),
        imageCaptions: [...prev.imageCaptions, ...compressedImages.map((_, i) => `Memory #${prev.images.length + i + 1}`)].slice(0, MAX_IMAGES)
      }));
    } finally {
      setIsCompressing(false);
      if (e.target) e.target.value = '';
    }
  };

  const isStepValid = (s: number) => {
    switch (s) {
      case 1: return formData.to.trim().length > 0;
      case 2: return formData.from.trim().length > 0;
      case 3: return formData.firstMeet.trim().length > 0;
      case 4: return formData.firstImpression.trim().length > 0;
      case 5: return formData.favQuality.trim().length > 0;
      case 6: return formData.ourSong.trim().length > 0;
      case 7: return formData.cuteHabit.trim().length > 0;
      case 8: return formData.memory.trim().length > 0;
      case 9: return formData.reason.trim().length > 0;
      case 10: return formData.proposalStory.trim().length > 0;
      case 11: return formData.future.trim().length > 0;
      case 12: return formData.promise.trim().length > 0;
      case 13: return true; // Photos
      case 14: return formData.message.trim().length > 0;
      default: return false;
    }
  };

  const handleGenerate = async () => {
    console.log('🎯 Starting to save wish to database...');
    setIsSaving(true);
    try {
      console.log('📝 Preparing data:', {
        from: formData.from,
        to: formData.to,
        imageCount: formData.images.length
      });

      const { data: result, error } = await supabase
        .from('wishes')
        .insert([{
          from_name: formData.from,
          to_name: formData.to,
          data: formData
        }])
        .select()
        .single();

      if (error) {
        console.error('❌ Supabase error:', error);
        throw error;
      }

      console.log('✅ Successfully saved to database!');
      console.log('   ID:', result.id);

      const url = `${window.location.origin}${window.location.pathname}?id=${result.id}`;
      setGeneratedLink(url);
      console.log('🔗 Generated link:', url);

      const colors = ['#ff4d6d', '#ff1a4d', '#ff34d0ff', '#ffd000', '#14c3ff'];
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors });
      setTimeout(() => confetti({ particleCount: 100, spread: 120, origin: { x: 0.3, y: 0.7 }, colors }), 200);
      setTimeout(() => confetti({ particleCount: 100, spread: 120, origin: { x: 0.7, y: 0.7 }, colors }), 400);
    } catch (err) {
      console.error('❌ Failed to save wish to database:', err);
      console.log('🔄 Falling back to hash-based link...');
      // Fallback to legacy hash-based link if Supabase fails
      const encodedData = btoa(unescape(encodeURIComponent(JSON.stringify(formData))));
      const url = `${window.location.origin}${window.location.pathname}#data=${encodedData}`;
      setGeneratedLink(url);
      console.log('🔗 Fallback link generated:', url);
    } finally {
      setIsSaving(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const handleShare = async () => {
    if (typeof navigator.share !== 'undefined') {
      try {
        await navigator.share({
          title: 'A Kitten Love Surprise! 🎀',
          text: `${formData.from} sent you a magical story! ✨`,
          url: generatedLink
        });
      } catch (err) {
        console.error('Share failed', err);
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const reset = () => {
    window.history.replaceState({}, '', window.location.pathname);
    setView('home');
    setStep(1);
    setFormData({ from: '', to: '', firstMeet: '', firstImpression: '', favQuality: '', ourSong: '', cuteHabit: '', memory: '', reason: '', proposalStory: '', future: '', promise: '', message: '', images: [], imageCaptions: [], songLink: '' });
    setGeneratedLink('');
    setIsRevealed(false);
    setDecodeError(null);
    setScrollProgress(0);
  };

  const applyQuote = (quote: string) => {
    setFormData({ ...formData, message: quote });
    setShowQuotes(false);
  };

  return (
    <div
      onClick={handleInteraction}
      className="min-h-screen flex flex-col items-center justify-center p-4 relative font-outfit text-kawaii-900 bg-gradient-to-b from-[#ffedf1] via-[#ffdce5] to-[#ffc4d4] selection:bg-kawaii-200 overflow-x-hidden transition-colors duration-700"
    >
      <HeartBackground />

      {/* Interactive Click Hearts */}
      <AnimatePresence>
        {clickHearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ scale: 0, opacity: 1, rotate: 0 }}
            animate={{ scale: 1.5, opacity: 0, y: -100, rotate: Math.random() * 40 - 20 }}
            exit={{ opacity: 0 }}
            className="fixed pointer-events-none z-[100] text-kawaii-500"
            style={{ left: heart.x, top: heart.y }}
          >
            <Heart fill="currentColor" size={24} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Kitten Romance - Managed for best visibility */}
      {view === 'surprise' && isRevealed && (
        <KittenRomance
          isHome={false}
          isRevealed={true}
          scrollProgress={scrollProgress}
          currentStep={0}
          totalSteps={14}
        />
      )}

      {/* Error Modal */}
      <AnimatePresence>
        {decodeError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-kawaii-900/60 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              className="bg-white rounded-[4rem] border-[12px] border-kawaii-500 shadow-2xl p-12 max-w-lg w-full text-center space-y-8"
            >
              <div className="w-32 h-32 bg-kawaii-100 rounded-full flex items-center justify-center mx-auto text-kawaii-500">
                <AlertCircle size={80} />
              </div>
              <h3 className="text-4xl font-black text-kawaii-800 leading-tight">Link too big! 😿</h3>
              <p className="text-xl font-bold text-kawaii-600 leading-relaxed">
                {decodeError}
              </p>
              <SquishyButton onClick={reset} variant="primary" className="w-full">
                Create My Own ✨
              </SquishyButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-kawaii-900/40 backdrop-blur-md"
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-white rounded-[4rem] border-[12px] border-white shadow-2xl p-12 max-w-lg w-full space-y-8 relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-kawaii-100 rounded-bl-full opacity-50" />
              <button
                onClick={() => setShowHelp(false)}
                className="absolute top-8 right-8 w-12 h-12 bg-kawaii-50 rounded-full flex items-center justify-center text-kawaii-400 hover:bg-kawaii-100 transition-colors"
              >
                <X size={24} strokeWidth={3} />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-kawaii-600">
                  <Info size={40} fill="white" />
                  <h3 className="text-4xl font-black">How it works! 🎀</h3>
                </div>
                <div className="space-y-6 text-xl font-bold text-kawaii-800 leading-relaxed">
                  <p className="flex gap-4"><span>1.</span> <span>Pick your favorite human (or kitten!) 🐾</span></p>
                  <p className="flex gap-4"><span>2.</span> <span>Share a sweet memory and photos! 📸</span></p>
                  <p className="flex gap-4"><span>3.</span> <span>We "bake" a magic link for you. 🧁</span></p>
                  <p className="flex gap-4"><span>4.</span> <span>Share the link for a big surprise! ✨</span></p>
                </div>
              </div>

              <SquishyButton onClick={() => setShowHelp(false)} variant="primary" className="w-full">
                Got it! 💖
              </SquishyButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Corner Flowers/Bows */}
      <div className="fixed top-8 left-8 text-kawaii-300 opacity-40 animate-bounce-slow">
        <BowIcon className="w-16 h-16" />
      </div>
      <div className="fixed bottom-8 right-8 text-kawaii-300 opacity-40 animate-bounce-slow" style={{ animationDelay: '1s' }}>
        <BowIcon className="w-16 h-16 rotate-180" />
      </div>

      <main className="w-full max-w-lg md:max-w-2xl z-20 px-4">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="text-center space-y-6 md:space-y-10 p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] bg-white/20 backdrop-blur-2xl border-[6px] md:border-[10px] border-white/60 shadow-[0_24px_50px_-12px_rgba(194,0,84,0.3)] relative overflow-hidden group hover:shadow-[0_40px_80px_-12px_rgba(194,0,84,0.5)] transition-all duration-500 mx-auto"
            >
              {/* Spinning Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-kawaii-500/10 via-transparent to-kawaii-400/10 animate-pulse-glow pointer-events-none" />

              <ValentinesCountdown />

              <motion.div className="relative inline-block">
                <FloatingElement className="relative z-10">
                  <div className="bg-white p-4 md:p-6 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border-[4px] md:border-[6px] border-kawaii-200">
                    <LoveSymbol size={60} className="md:w-[90px] md:h-[90px]" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -top-3 -right-3 md:-top-4 md:-right-4 text-kawaii-400"
                  >
                    <Sparkles size={24} className="md:w-10 md:h-10" />
                  </motion.div>
                </FloatingElement>
              </motion.div>

              <div className="space-y-3 md:space-y-4">
                <h1 className="text-4xl md:text-7xl font-serif font-black tracking-tight text-kawaii-600 drop-shadow-[0_4px_0_white] leading-tight text-center italic">
                  Kitten Love! 🎀
                </h1>
                <p className="text-lg md:text-2xl text-kawaii-800 font-bold max-w-xs md:max-w-sm mx-auto leading-relaxed text-center font-outfit">
                  Share your cutest <br className="hidden md:block" /> memories! ✨
                </p>
              </div>

              <div className="pt-4 md:pt-6 flex flex-col gap-4 items-center w-full">
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto justify-center">
                  <SquishyButton onClick={() => setView('create')} className="w-full md:w-auto text-lg md:text-xl">
                    Create My Story <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                  </SquishyButton>
                  <SquishyButton variant="secondary" onClick={() => setShowHelp(true)} className="px-6 w-full md:w-auto">
                    <Info size={24} className="md:w-8 md:h-8" />
                  </SquishyButton>
                </div>
                <div className="text-kawaii-400 font-black text-xs md:text-sm uppercase tracking-widest text-center">
                  Pick photos from your device! 📸
                </div>
              </div>
            </motion.div>
          )}

          {view === 'create' && (
            <motion.div
              key="create"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              className="p-5 md:p-8 rounded-[2rem] md:rounded-[3rem] bg-white/20 backdrop-blur-3xl border-[6px] md:border-[10px] border-white/60 shadow-[0_24px_50px_-12px_rgba(194,0,84,0.3)] space-y-5 md:space-y-8 ring-6 ring-kawaii-400/20 w-full max-w-lg md:max-w-2xl mx-auto"
            >
              {/* Kawaii Progress Slider */}
              <div className="relative pt-4 md:pt-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-4">
                  <div className="bg-kawaii-700 text-white px-5 py-1.5 rounded-full font-black text-sm md:text-base uppercase tracking-widest shadow-xl border-2 border-white/30">
                    Day {step} / 14
                  </div>
                  <div className="text-kawaii-800 font-black flex items-center gap-2 text-sm md:text-lg text-center md:text-right">
                    <Sparkles size={16} className="text-kitty-yellow" /> {Math.round((step / 14) * 100)}% Complete
                  </div>
                </div>
                <div className="h-8 md:h-10 bg-kawaii-100 rounded-full p-1.5 md:p-2 border-2 md:border-4 border-kawaii-200 flex items-center overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(step / 14) * 100}%` }}
                    className="h-full bg-gradient-to-r from-kawaii-400 to-kawaii-700 rounded-full flex items-center justify-end px-2 relative transition-all"
                  >
                    <div className="w-3.5 h-3.5 md:w-5 md:h-5 bg-white rounded-full animate-pulse shadow-md" />
                  </motion.div>
                </div>
              </div>

              <div className="min-h-[420px] flex flex-col justify-center relative overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 100, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -100, scale: 1.1 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                    className="space-y-8 py-4"
                  >
                    {step === 1 && (
                      <div className="flex flex-col items-center gap-4">
                        <motion.label
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-white/40 backdrop-blur-md px-5 md:px-6 py-1.5 md:py-2 rounded-full border-2 md:border-[3px] border-white inline-block text-lg md:text-2xl font-black text-kawaii-900 drop-shadow-sm mb-3 md:mb-4 text-center"
                        >
                          Who's getting the love? ✨
                        </motion.label>
                        <div className="relative w-full">
                          <input
                            type="text"
                            placeholder="Recipient's name..."
                            className="w-full bg-white border-[4px] md:border-[6px] border-kawaii-100 rounded-[1.5rem] md:rounded-[2rem] py-3 md:py-4 px-5 md:px-8 text-lg md:text-xl font-black text-kawaii-900 focus:border-kawaii-400 focus:bg-kawaii-50 outline-none transition-all shadow-inner placeholder:text-kawaii-200 text-center"
                            value={formData.to}
                            onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                            autoFocus
                          />
                          <div className="absolute right-5 md:right-6 top-1/2 -translate-y-1/2 scale-75 md:scale-90">
                            <LoveSymbol size={28} />
                          </div>
                        </div>
                      </div>
                    )}
                    {step === 2 && (
                      <div className="flex flex-col items-center gap-4">
                        <motion.label
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-white/40 backdrop-blur-md px-5 md:px-6 py-1.5 md:py-2 rounded-full border-2 md:border-[3px] border-white inline-block text-lg md:text-2xl font-black text-kawaii-900 drop-shadow-sm mb-3 md:mb-4 text-center"
                        >
                          And who are you? 🎀
                        </motion.label>
                        <input
                          type="text"
                          placeholder="Your cute name..."
                          className="w-full bg-white border-[4px] md:border-[6px] border-kawaii-100 rounded-[1.5rem] md:rounded-[2rem] py-3 md:py-4 px-5 md:px-8 text-lg md:text-xl font-black text-kawaii-900 focus:border-kawaii-400 focus:bg-kawaii-50 outline-none transition-all shadow-inner placeholder:text-kawaii-200 text-center"
                          value={formData.from}
                          onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                          autoFocus
                        />
                      </div>
                    )}
                    {step === 3 && (
                      <div className="flex flex-col items-center gap-4">
                        <motion.label
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-white/40 backdrop-blur-md px-5 md:px-6 py-1.5 md:py-2 rounded-full border-2 md:border-[3px] border-white inline-block text-lg md:text-2xl font-black text-kawaii-900 drop-shadow-sm mb-3 md:mb-4 text-center"
                        >
                          The first time I saw you? 👀
                        </motion.label>
                        <textarea
                          placeholder="It was at... and you looked so..."
                          rows={4}
                          className="w-full bg-white border-[4px] md:border-[6px] border-kawaii-100 rounded-[1.5rem] md:rounded-[2rem] py-3 md:py-4 px-5 md:px-8 text-base md:text-lg font-black text-kawaii-900 focus:border-kawaii-400 focus:bg-kawaii-50 outline-none transition-all shadow-inner placeholder:text-kawaii-200 resize-none text-center"
                          value={formData.firstMeet}
                          onChange={(e) => setFormData({ ...formData, firstMeet: e.target.value })}
                          autoFocus
                        />
                      </div>
                    )}
                    {step === 4 && (
                      <div className="flex flex-col items-center gap-4">
                        <motion.label
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-white/40 backdrop-blur-md px-5 md:px-6 py-1.5 md:py-2 rounded-full border-2 md:border-[3px] border-white inline-block text-lg md:text-2xl font-black text-kawaii-900 drop-shadow-sm mb-3 md:mb-4 text-center"
                        >
                          What was your first impression? 🌸
                        </motion.label>
                        <textarea
                          placeholder="I thought you were..."
                          rows={4}
                          className="w-full bg-white border-[4px] md:border-[6px] border-kawaii-100 rounded-[1.5rem] md:rounded-[2rem] py-3 md:py-4 px-5 md:px-8 text-base md:text-lg font-black text-kawaii-900 focus:border-kawaii-400 focus:bg-kawaii-50 outline-none transition-all shadow-inner placeholder:text-kawaii-200 resize-none text-center"
                          value={formData.firstImpression}
                          onChange={(e) => setFormData({ ...formData, firstImpression: e.target.value })}
                          autoFocus
                        />
                      </div>
                    )}
                    {step === 5 && (
                      <div className="flex flex-col items-center gap-4">
                        <motion.label
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-white/40 backdrop-blur-md px-5 md:px-6 py-1.5 md:py-2 rounded-full border-2 md:border-[3px] border-white inline-block text-lg md:text-2xl font-black text-kawaii-900 drop-shadow-sm mb-3 md:mb-4 text-center"
                        >
                          Your favorite quality of mine? ✨
                        </motion.label>
                        <input
                          type="text"
                          placeholder="I love how you..."
                          className="w-full bg-white border-[4px] md:border-[6px] border-kawaii-100 rounded-[1.5rem] md:rounded-[2rem] py-3 md:py-4 px-5 md:px-8 text-lg md:text-xl font-black text-kawaii-900 focus:border-kawaii-400 focus:bg-kawaii-50 outline-none transition-all shadow-inner placeholder:text-kawaii-200 text-center"
                          value={formData.favQuality}
                          onChange={(e) => setFormData({ ...formData, favQuality: e.target.value })}
                          autoFocus
                        />
                      </div>
                    )}
                    {step === 6 && (
                      <div className="flex flex-col items-center gap-4">
                        <motion.label
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-white/40 backdrop-blur-md px-5 md:px-6 py-1.5 md:py-2 rounded-full border-2 md:border-[3px] border-white inline-block text-lg md:text-2xl font-black text-kawaii-900 drop-shadow-sm mb-3 md:mb-4 text-center"
                        >
                          Our special song? 🎵
                        </motion.label>
                        <div className="w-full space-y-4">
                          <input
                            type="text"
                            placeholder="Song Title / Artist..."
                            className="w-full bg-white border-[4px] md:border-[6px] border-kawaii-100 rounded-[1.5rem] md:rounded-[2rem] py-3 md:py-4 px-5 md:px-8 text-lg md:text-xl font-black text-kawaii-900 focus:border-kawaii-400 focus:bg-kawaii-50 outline-none transition-all shadow-inner placeholder:text-kawaii-200 text-center"
                            value={formData.ourSong}
                            onChange={(e) => setFormData({ ...formData, ourSong: e.target.value })}
                            autoFocus
                          />
                          <input
                            type="text"
                            placeholder="Paste YouTube/Spotify link (optional) 🔗"
                            className="w-full bg-white/60 border-[2px] md:border-[4px] border-kawaii-50 rounded-[1rem] md:rounded-[1.5rem] py-2 md:py-3 px-4 md:px-6 text-sm md:text-base font-bold text-kawaii-700 focus:border-kawaii-300 outline-none transition-all placeholder:text-kawaii-200 text-center"
                            value={formData.songLink || ''}
                            onChange={(e) => setFormData({ ...formData, songLink: e.target.value })}
                          />
                        </div>
                      </div>
                    )}
                    {step === 7 && (
                      <div className="flex flex-col items-center gap-4">
                        <motion.label
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-white/40 backdrop-blur-md px-5 md:px-6 py-1.5 md:py-2 rounded-full border-2 md:border-[3px] border-white inline-block text-lg md:text-2xl font-black text-kawaii-900 drop-shadow-sm mb-3 md:mb-4 text-center"
                        >
                          A cute habit of mine? 😂
                        </motion.label>
                        <input
                          type="text"
                          placeholder="You always..."
                          className="w-full bg-white border-[4px] md:border-[6px] border-kawaii-100 rounded-[1.5rem] md:rounded-[2rem] py-3 md:py-4 px-5 md:px-8 text-lg md:text-xl font-black text-kawaii-900 focus:border-kawaii-400 focus:bg-kawaii-50 outline-none transition-all shadow-inner placeholder:text-kawaii-200 text-center"
                          value={formData.cuteHabit}
                          onChange={(e) => setFormData({ ...formData, cuteHabit: e.target.value })}
                          autoFocus
                        />
                      </div>
                    )}
                    {step === 8 && (
                      <div className="flex flex-col items-center gap-4">
                        <motion.label
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-white/40 backdrop-blur-md px-5 md:px-6 py-1.5 md:py-2 rounded-full border-2 md:border-[3px] border-white inline-block text-lg md:text-2xl font-black text-kawaii-900 drop-shadow-sm mb-3 md:mb-4 text-center"
                        >
                          Our sweetest memory? 💖
                        </motion.label>
                        <textarea
                          placeholder="Remember when..."
                          rows={4}
                          className="w-full bg-white border-[4px] md:border-[6px] border-kawaii-100 rounded-[1.5rem] md:rounded-[2rem] py-3 md:py-4 px-5 md:px-8 text-base md:text-lg font-black text-kawaii-900 focus:border-kawaii-400 focus:bg-kawaii-50 outline-none transition-all shadow-inner placeholder:text-kawaii-200 resize-none text-center"
                          value={formData.memory}
                          onChange={(e) => setFormData({ ...formData, memory: e.target.value })}
                          autoFocus
                        />
                      </div>
                    )}
                    {step === 9 && (
                      <div className="flex flex-col items-center gap-4">
                        <motion.label
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-white/40 backdrop-blur-md px-5 md:px-6 py-1.5 md:py-2 rounded-full border-2 md:border-[3px] border-white inline-block text-lg md:text-2xl font-black text-kawaii-900 drop-shadow-sm mb-3 md:mb-4 text-center"
                        >
                          The reason you love me? ✨
                        </motion.label>
                        <textarea
                          placeholder="I love you because..."
                          rows={4}
                          className="w-full bg-white border-[4px] md:border-[6px] border-kawaii-100 rounded-[1.5rem] md:rounded-[2rem] py-3 md:py-4 px-5 md:px-8 text-base md:text-lg font-black text-kawaii-900 focus:border-kawaii-400 focus:bg-kawaii-50 outline-none transition-all shadow-inner placeholder:text-kawaii-200 resize-none text-center"
                          value={formData.reason}
                          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                          autoFocus
                        />
                      </div>
                    )}
                    {step === 10 && (
                      <div className="flex flex-col items-center gap-4">
                        <motion.label
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-white/40 backdrop-blur-md px-5 md:px-6 py-1.5 md:py-2 rounded-full border-2 md:border-[3px] border-white inline-block text-lg md:text-2xl font-black text-kawaii-900 drop-shadow-sm mb-3 md:mb-4 text-center"
                        >
                          How was the proposal? 💍
                        </motion.label>
                        <textarea
                          placeholder="Tell the magical story..."
                          rows={4}
                          className="w-full bg-white border-[4px] md:border-[6px] border-kawaii-100 rounded-[1.5rem] md:rounded-[2rem] py-3 md:py-4 px-5 md:px-8 text-base md:text-lg font-black text-kawaii-900 focus:border-kawaii-400 focus:bg-kawaii-50 outline-none transition-all shadow-inner placeholder:text-kawaii-200 resize-none text-center"
                          value={formData.proposalStory}
                          onChange={(e) => setFormData({ ...formData, proposalStory: e.target.value })}
                          autoFocus
                        />
                      </div>
                    )}
                    {step === 11 && (
                      <div className="flex flex-col items-center gap-4">
                        <motion.label
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-white/40 backdrop-blur-md px-5 md:px-6 py-1.5 md:py-2 rounded-full border-2 md:border-[3px] border-white inline-block text-lg md:text-2xl font-black text-kawaii-900 drop-shadow-sm mb-3 md:mb-4 text-center"
                        >
                          A future dream we share? ☁️
                        </motion.label>
                        <input
                          type="text"
                          placeholder="One day we will..."
                          className="w-full bg-white border-[4px] md:border-[6px] border-kawaii-100 rounded-[1.5rem] md:rounded-[2rem] py-3 md:py-4 px-5 md:px-8 text-lg md:text-xl font-black text-kawaii-900 focus:border-kawaii-400 focus:bg-kawaii-50 outline-none transition-all shadow-inner placeholder:text-kawaii-200 text-center"
                          value={formData.future}
                          onChange={(e) => setFormData({ ...formData, future: e.target.value })}
                          autoFocus
                        />
                      </div>
                    )}
                    {step === 12 && (
                      <div className="flex flex-col items-center gap-4">
                        <motion.label
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-white/40 backdrop-blur-md px-5 md:px-6 py-1.5 md:py-2 rounded-full border-2 md:border-[3px] border-white inline-block text-lg md:text-2xl font-black text-kawaii-900 drop-shadow-sm mb-3 md:mb-4 text-center"
                        >
                          A sweet promise? 💌
                        </motion.label>
                        <input
                          type="text"
                          placeholder="I promise to always..."
                          className="w-full bg-white border-[4px] md:border-[6px] border-kawaii-100 rounded-[1.5rem] md:rounded-[2rem] py-3 md:py-4 px-5 md:px-8 text-lg md:text-xl font-black text-kawaii-900 focus:border-kawaii-400 focus:bg-kawaii-50 outline-none transition-all shadow-inner placeholder:text-kawaii-200 text-center"
                          value={formData.promise}
                          onChange={(e) => setFormData({ ...formData, promise: e.target.value })}
                          autoFocus
                        />
                      </div>
                    )}
                    {step === 13 && (
                      <div className="flex flex-col items-center gap-4">
                        <motion.label
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-white/40 backdrop-blur-md px-5 md:px-6 py-1.5 md:py-2 rounded-full border-2 md:border-[3px] border-white inline-block text-lg md:text-2xl font-black text-kawaii-900 drop-shadow-sm mb-2 md:mb-3 text-center"
                        >
                          Pick Photos! 📸
                        </motion.label>
                        <p className="text-kawaii-800 font-bold italic text-xs md:text-base text-center">Upload up to {MAX_IMAGES} cute photos.</p>

                        <div className="max-h-[300px] overflow-y-auto px-2 py-3 custom-scrollbar bg-kawaii-50/30 rounded-[1.5rem] md:rounded-[2rem] border-2 md:border-4 border-white/40">
                          <div className="grid grid-cols-3 gap-3">
                            {formData.images.map((img, i) => (
                              <motion.div
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="relative flex flex-col gap-2"
                              >
                                <div className="relative aspect-square rounded-xl overflow-hidden border-2 md:border-4 border-white shadow-md">
                                  <img src={img} className="w-full h-full object-cover" />
                                  <button
                                    onClick={() => setFormData(prev => ({
                                      ...prev,
                                      images: prev.images.filter((_, idx) => idx !== i),
                                      imageCaptions: prev.imageCaptions.filter((_, idx) => idx !== i)
                                    }))}
                                    className="absolute top-1 right-1 w-6 h-6 md:w-8 md:h-8 bg-kawaii-500 text-white rounded-full flex items-center justify-center font-black text-xs shadow-md z-1"
                                  >
                                    <X size={12} />
                                  </button>
                                </div>
                                <input
                                  type="text"
                                  placeholder={`...`}
                                  className="w-full bg-white/50 border-2 border-kawaii-100 rounded-lg py-1 px-2 text-[10px] font-black text-kawaii-800 focus:border-kawaii-300 outline-none"
                                  value={formData.imageCaptions[i] || ''}
                                  onChange={(e) => {
                                    const newCaptions = [...formData.imageCaptions];
                                    newCaptions[i] = e.target.value;
                                    setFormData({ ...formData, imageCaptions: newCaptions });
                                  }}
                                />
                              </motion.div>
                            ))}
                            {formData.images.length < MAX_IMAGES && (
                              <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isCompressing}
                                className="aspect-square rounded-xl border-[3px] border-dashed border-kawaii-200 flex flex-col items-center justify-center gap-1 hover:bg-kawaii-50 transition-all text-kawaii-300 font-black cursor-pointer disabled:opacity-50"
                              >
                                {isCompressing ? (
                                  <RefreshCw className="animate-spin" size={24} />
                                ) : (
                                  <Sparkles size={24} />
                                )}
                                <span className="text-[10px]">{isCompressing ? '...' : 'Add'}</span>
                              </button>
                            )}
                          </div>
                        </div>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                        />
                      </div>
                    )}
                    {step === 14 && (
                      <div className="flex flex-col items-center gap-4 relative">
                        <div className="flex flex-col items-center gap-4 mb-4">
                          <motion.label
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white/40 backdrop-blur-md px-5 md:px-6 py-1.5 md:py-2 rounded-full border-2 md:border-[3px] border-white inline-block text-lg md:text-2xl font-black text-kawaii-900 drop-shadow-sm text-center"
                          >
                            Write a wish... 💌
                          </motion.label>
                          <button
                            onClick={() => setShowQuotes(!showQuotes)}
                            className="bg-kitty-yellow text-kawaii-900 px-4 py-2 rounded-full font-black text-sm flex items-center gap-2 shadow-sm hover:scale-105 transition-transform"
                          >
                            <MessageCircleHeart size={20} /> Quotes
                          </button>
                        </div>

                        {/* Quotes Popover */}
                        <AnimatePresence>
                          {showQuotes && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className="absolute bottom-full left-0 right-0 mb-4 bg-white rounded-[2.5rem] border-8 border-kawaii-100 shadow-2xl p-6 z-50 max-h-[250px] overflow-y-auto custom-scrollbar"
                            >
                              <div className="grid gap-3">
                                {LOVE_QUOTES.map((q, i) => (
                                  <button
                                    key={i}
                                    onClick={() => applyQuote(q)}
                                    className="text-left p-4 rounded-2xl hover:bg-kawaii-50 transition-colors text-kawaii-700 font-bold border-2 border-transparent hover:border-kawaii-100"
                                  >
                                    "{q}"
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <textarea
                          placeholder="Your sweet message..."
                          rows={4}
                          className="w-full bg-white border-8 border-kawaii-100 rounded-[2.5rem] py-6 px-10 text-xl font-black text-kawaii-900 focus:border-kawaii-400 focus:bg-kawaii-50 outline-none transition-all shadow-inner placeholder:text-kawaii-200 resize-none"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          autoFocus
                        />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex justify-between items-center pt-8 border-t-8 border-kawaii-50">
                {step > 1 ? (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="font-black text-kawaii-600 hover:text-kawaii-800 transition-colors flex items-center gap-2 group text-xl"
                  >
                    <ChevronLeft className="group-hover:-translate-x-1 transition-transform" /> Back
                  </button>
                ) : <div />}

                {step < 14 ? (
                  <SquishyButton
                    variant="primary"
                    disabled={!isStepValid(step)}
                    onClick={() => setStep(step + 1)}
                    className="w-full"
                  >
                    {step === 13 ? 'Check Photos' : 'Next'} <ChevronRight />
                  </SquishyButton>
                ) : (
                  !generatedLink ? (
                    <SquishyButton
                      onClick={handleGenerate}
                      disabled={!isStepValid(14) || isSaving}
                      className="w-full"
                    >
                      {isSaving ? (
                        <>Baking... <RefreshCw className="animate-spin" size={24} /></>
                      ) : (
                        <>Bake It! <LoveSymbol size={40} /></>
                      )}
                    </SquishyButton>
                  ) : (
                    <div className="w-full space-y-8">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-8 bg-kawaii-100/50 rounded-[3rem] border-8 border-dashed border-white break-all text-sm font-black text-kawaii-700 text-center shadow-inner overflow-hidden"
                      >
                        {generatedLink.substring(0, 40)}...
                        <div className="mt-2 text-[10px] text-kawaii-400">
                          Hash-Fragment Link (Client Side Only) ✨
                        </div>
                      </motion.div>
                      <div className="flex gap-4">
                        <SquishyButton variant="blue" className="flex-1" onClick={handleShare}>
                          {showCopied ? 'Copied! ✨' : (typeof navigator.share !== 'undefined' ? 'Share Now!' : 'Copy Link')} {typeof navigator.share !== 'undefined' && !showCopied ? <Share2 size={24} /> : <div />}
                        </SquishyButton>
                        <SquishyButton
                          variant="secondary"
                          onClick={reset}
                          className="px-8"
                        >
                          <RefreshCw size={32} />
                        </SquishyButton>
                      </div>
                    </div>
                  )
                )}
              </div>
            </motion.div>
          )}

          {view === 'surprise' && (
            <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center">
              {!isRevealed ? (
                <div className="py-20 flex flex-col items-center gap-12">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-4"
                  >
                    <p className="text-kawaii-500 font-script text-4xl">Dearest {formData.to},</p>
                    <p className="text-kawaii-400 font-black uppercase tracking-widest text-sm">A magical story is waiting for you...</p>
                  </motion.div>

                  <RealisticEnvelope
                    to={formData.to}
                    onOpen={() => {
                      setIsRevealed(true);
                      const colors = ['#ff4d6d', '#ff0fb3', '#ffffff', '#ffd000', '#14c3ff'];
                      confetti({ particleCount: 300, spread: 150, scalar: 2.5, shapes: ['circle'], colors });
                      setTimeout(() => confetti({ particleCount: 150, origin: { x: 0.2, y: 0.6 }, colors }), 400);
                      setTimeout(() => confetti({ particleCount: 150, origin: { x: 0.8, y: 0.6 }, colors }), 800);
                    }}
                  />
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', damping: 12, stiffness: 100 }}
                  className="bg-white/10 backdrop-blur-3xl p-8 md:p-12 rounded-[4rem] border-[12px] border-white/30 shadow-2xl space-y-20 relative overflow-visible text-center max-w-5xl mx-auto w-full glass-premium"
                >
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-kawaii-100 rounded-bl-full opacity-20 blur-3xl -z-10" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-kawaii-300 rounded-tr-full opacity-20 blur-3xl -z-10" />

                  <div className="space-y-6">
                    <motion.p
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6, type: 'spring' }}
                      className="text-4xl font-black text-kawaii-600 tracking-[0.3em] uppercase drop-shadow-sm"
                    >
                      Dearest {formData.to} 🎀
                    </motion.p>
                    <div className="flex justify-center gap-4 mb-2">
                      <span className="text-[10px] font-black text-kawaii-400 uppercase tracking-widest bg-kawaii-50/50 px-3 py-1 rounded-full">#PURELOVE 💖</span>
                      <span className="text-[10px] font-black text-kawaii-400 uppercase tracking-widest bg-kawaii-50/50 px-3 py-1 rounded-full">#FOREVER ✨</span>
                    </div>
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="text-5xl md:text-8xl font-serif font-black text-kawaii-800 drop-shadow-[0_4px_0_white] italic"
                    >
                      <BowIcon className="w-20 h-12 text-kawaii-400 mx-auto mb-6" />
                      Our Story... ✨
                    </motion.h2>
                  </div>

                  <div className="relative z-10 py-6 md:py-10">
                    <div className="text-kawaii-600 font-black text-base md:text-xl uppercase tracking-[0.2em] md:tracking-[0.4em] mb-6 md:mb-10 px-4">
                      Start of Our 14 Day Journey 🎀
                    </div>

                    {!formData.images.length && (
                      <div className="bg-white/40 backdrop-blur-md w-64 h-64 mx-auto rounded-[4rem] flex items-center justify-center border-[12px] border-white shadow-2xl overflow-hidden ring-8 ring-kawaii-400/20">
                        <span className="text-[12rem] font-black text-kawaii-500 drop-shadow-2xl">{formData.to?.[0] || '💌'}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-12 md:space-y-24 pb-20 flex flex-col items-center max-w-4xl mx-auto w-full overflow-visible">
                    {/* Category 1: The First Time */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="bg-white/30 backdrop-blur-xl p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border-[6px] md:border-[10px] border-white/60 shadow-xl relative ring-6 md:ring-8 ring-kawaii-400/10 text-center flex flex-col items-center glass-premium"
                    >
                      <LoveSymbol size={45} className="absolute -top-6 md:-top-8 left-6 md:left-8 -rotate-12 scale-75 md:scale-90" />
                      <p className="text-sm md:text-base font-serif font-black text-kawaii-500 uppercase tracking-[0.2em] mb-3 md:mb-4 italic">Day 1: The Moment I Saw You 👀</p>
                      <p className="text-xl md:text-4xl font-script text-kawaii-800 leading-tight">
                        " {formData.firstMeet} "
                      </p>
                    </motion.div>

                    {/* Category 2: First Impression */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="bg-white/40 backdrop-blur-xl p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border-[6px] md:border-[10px] border-white/60 shadow-xl relative ring-6 md:ring-8 ring-kawaii-400/10 text-center flex flex-col items-center glass-premium"
                    >
                      <Sparkles size={45} className="absolute -top-6 md:-top-8 right-6 md:right-8 text-kitty-yellow scale-75 md:scale-90" />
                      <p className="text-sm md:text-base font-serif font-black text-kawaii-500 uppercase tracking-[0.2em] mb-3 md:mb-4 italic">Day 2: My First Impression 🌸</p>
                      <p className="text-xl md:text-4xl font-black text-kawaii-800 leading-tight font-outfit">
                        {formData.firstImpression}
                      </p>
                    </motion.div>

                    {/* Category 3: Favorite Quality */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="bg-gradient-to-br from-white/50 to-kawaii-50/50 backdrop-blur-xl p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border-[6px] md:border-[10px] border-white/60 shadow-xl relative ring-6 md:ring-8 ring-kawaii-400/10 text-center flex flex-col items-center glass-premium"
                    >
                      <div className="absolute -top-6 md:-top-8 left-1/2 -translate-x-1/2 scale-75 md:scale-90"><LoveSymbol size={60} className="md:w-[80px] md:h-[80px]" /></div>
                      <p className="text-sm md:text-base font-serif font-black text-kawaii-500 uppercase tracking-[0.2em] mb-3 md:mb-4 mt-5 md:mt-6 italic">Day 3: My Favorite Thing About You ✨</p>
                      <p className="text-xl md:text-4xl font-black text-kawaii-800 leading-tight font-script italic">
                        I love how you {formData.favQuality}
                      </p>
                    </motion.div>

                    {/* Category 4: Our Song */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="bg-white/30 backdrop-blur-xl p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border-[6px] md:border-[10px] border-white/60 shadow-xl relative ring-6 md:ring-8 ring-kawaii-400/10 text-center flex flex-col items-center w-full glass-premium"
                    >
                      <div className="absolute -bottom-6 md:-bottom-8 right-6 md:right-8 text-kitty-blue animate-bounce text-3xl md:text-5xl">🎵</div>
                      <p className="text-sm md:text-base font-serif font-black text-kawaii-500 uppercase tracking-[0.2em] mb-3 md:mb-4 italic">Day 4: Our Special Melody 🎼</p>
                      <p className="text-2xl md:text-5xl font-black text-kawaii-900 tracking-tighter mb-6 font-outfit">
                        {formData.ourSong}
                      </p>

                      {formData.songLink && (
                        <motion.a
                          href={formData.songLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-kawaii-600 text-white px-8 py-3 rounded-full font-black flex items-center gap-3 shadow-lg hover:bg-kawaii-700 transition-colors"
                        >
                          <Star className="fill-white" size={20} />
                          Play Our Song ✨
                        </motion.a>
                      )}

                      <div className="mt-6 flex gap-3">
                        <span className="bg-kawaii-50/50 px-3 py-1 rounded-full text-[10px] font-black text-kawaii-400 uppercase tracking-widest">#OurTune</span>
                        <span className="bg-kawaii-50/50 px-3 py-1 rounded-full text-[10px] font-black text-kawaii-400 uppercase tracking-widest">#Soulmates</span>
                      </div>

                      {!formData.songLink && formData.ourSong && (
                        <motion.a
                          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(formData.ourSong)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          className="mt-4 text-sm font-black text-kawaii-400 underline decoration-kawaii-200"
                        >
                          Find on YouTube 🎵
                        </motion.a>
                      )}
                    </motion.div>

                    {/* Category 5: Cute Habit */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      className="bg-white/40 backdrop-blur-xl p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border-[6px] md:border-[10px] border-white/60 shadow-xl relative ring-6 md:ring-8 ring-kawaii-400/10 text-center flex flex-col items-center w-full max-w-2xl"
                    >
                      <p className="text-sm md:text-base font-serif font-black text-kawaii-500 uppercase tracking-[0.2em] mb-3 md:mb-4 italic">Day 5: The Habit That Wins Me 😂</p>
                      <p className="text-xl md:text-4xl font-black text-kawaii-800 font-script italic">
                        " You always {formData.cuteHabit} "
                      </p>
                    </motion.div>

                    {/* Category 6: Sweetest Memory */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      className="bg-gradient-to-br from-white/60 to-kawaii-100/40 backdrop-blur-xl p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border-[6px] md:border-[10px] border-white/60 shadow-xl relative ring-6 md:ring-8 ring-kawaii-400/10 text-center flex flex-col items-center glass-premium"
                    >
                      <Star size={45} fill="#ffd000" className="absolute -top-6 md:-top-8 right-6 md:right-8 rotate-12 opacity-50 scale-75 md:scale-90" />
                      <p className="text-sm md:text-base font-serif font-black text-kawaii-600 uppercase tracking-[0.2em] mb-3 md:mb-4 italic">Day 6: Our Sweetest Memory 💖</p>
                      <p className="text-xl md:text-4xl font-black text-kawaii-800 leading-tight font-outfit">
                        " {formData.memory} "
                      </p>
                    </motion.div>

                    {/* Category 7: Why I Love You */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 }}
                      className="bg-white/30 backdrop-blur-xl p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border-[6px] md:border-[10px] border-white/60 shadow-xl relative ring-6 md:ring-8 ring-kawaii-400/10 text-center flex flex-col items-center w-full glass-premium"
                    >
                      <LoveSymbol size={45} className="absolute -bottom-5 md:-bottom-10 left-1/2 -translate-x-1/2" />
                      <p className="text-sm md:text-base font-serif font-black text-kawaii-600 uppercase tracking-[0.2em] mb-3 md:mb-4 italic">Day 7: Every Single Reason ✨</p>
                      <p className="text-xl md:text-5xl font-black text-kawaii-800 leading-tight font-outfit">
                        {formData.reason}
                      </p>
                    </motion.div>

                    {/* Category 8: The Proposal */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 }}
                      className="bg-white/40 backdrop-blur-xl p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border-[6px] md:border-[10px] border-white/60 shadow-xl relative ring-6 md:ring-8 ring-kawaii-400/10 text-center flex flex-col items-center w-full glass-premium"
                    >
                      <p className="text-sm md:text-base font-serif font-black text-kawaii-600 uppercase tracking-[0.2em] mb-3 md:mb-4 italic">Day 8: The Magical Proposal 💍</p>
                      <p className="text-xl md:text-4xl font-black text-kawaii-800 leading-tight font-script italic">
                        " {formData.proposalStory} "
                      </p>
                    </motion.div>

                    {/* Category 9: Future Dream */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 }}
                      className="bg-gradient-to-br from-white/50 to-kawaii-50/50 backdrop-blur-xl p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border-[6px] md:border-[10px] border-white/60 shadow-xl relative ring-6 md:ring-8 ring-kawaii-400/10 text-center flex flex-col items-center w-full glass-premium"
                    >
                      <p className="text-sm md:text-base font-serif font-black text-kawaii-600 uppercase tracking-[0.2em] mb-3 md:mb-4 italic">Day 9: Our Shared Dream ☁️</p>
                      <p className="text-xl md:text-5xl font-black text-kawaii-800 font-outfit">
                        {formData.future}
                      </p>
                    </motion.div>

                    {/* Category 10: The Promise */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9 }}
                      className="bg-white/30 backdrop-blur-xl p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border-[6px] md:border-[10px] border-white/60 shadow-xl relative ring-6 md:ring-8 ring-kawaii-400/10 text-center glass-premium"
                    >
                      <p className="text-sm md:text-base font-serif font-black text-kawaii-600 uppercase tracking-[0.2em] mb-3 md:mb-4 italic">Day 10: My Sacred Promise 🤝</p>
                      <p className="text-2xl md:text-5xl font-black text-kawaii-950 font-outfit underline decoration-kawaii-400">
                        {formData.promise}
                      </p>
                    </motion.div>

                    {/* Category 11: The Journey (Memory Lane - Images) */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="bg-white/40 backdrop-blur-xl p-4 md:p-8 rounded-[2.5rem] md:rounded-[4rem] border-[6px] md:border-[10px] border-white/60 shadow-xl relative ring-6 md:ring-8 ring-kawaii-400/10 text-center"
                    >
                      <p className="text-base md:text-lg font-black text-kawaii-600 uppercase tracking-[0.2em] md:tracking-[0.4em] mb-6 md:mb-10">Day 11: Our Visual Journey 📸</p>
                      <MemoryLane images={formData.images} imageCaptions={formData.imageCaptions} />
                    </motion.div>

                    {/* Category 12: Final Devoted Wish */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', delay: 1.0 }}
                      className="p-6 md:p-12 bg-kawaii-600 rounded-[2.5rem] md:rounded-[4rem] border-[6px] md:border-[12px] border-white shadow-2xl relative ring-[6px] md:ring-[10px] ring-kawaii-400/50 text-center text-white"
                    >
                      <div className="absolute -top-6 md:-top-10 -left-6 md:-left-10 rotate-[-15deg] scale-50 md:scale-90">
                        <LoveSymbol size={100} className="text-white drop-shadow-2xl" />
                      </div>
                      <p className="text-sm md:text-base font-serif font-black uppercase tracking-[0.2em] md:tracking-[0.4em] mb-5 md:mb-6 opacity-80 italic">Day 12: My Final Devoted Wish 💌</p>
                      <p className="text-2xl md:text-5xl font-black leading-tight drop-shadow-lg font-script">
                        {formData.message}
                      </p>
                    </motion.div>

                    {/* Category 14: Final Celebration */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="bg-gradient-to-br from-kawaii-600 to-kawaii-800 p-8 md:p-16 rounded-[4rem] border-[12px] border-white shadow-[0_40px_100px_-20px_rgba(194,0,84,0.6)] relative overflow-visible text-center flex flex-col items-center w-full max-w-3xl"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute -top-20 -z-10"
                      >
                        <Heart size={200} className="fill-white/10 text-white/5" />
                      </motion.div>

                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />

                      <BowIcon className="w-24 h-16 text-white mb-6" />

                      <h2 className="text-4xl md:text-7xl font-serif font-black text-white leading-tight drop-shadow-2xl">
                        Happy <br /> Valentine's Day!
                      </h2>

                      <p className="mt-8 text-xl md:text-3xl font-script text-kawaii-100 drop-shadow-lg">
                        You are my today and all of my tomorrows... 💍
                      </p>

                      <div className="mt-10 flex gap-4">
                        <Sparkles className="text-kitty-yellow animate-pulse" size={40} />
                        <Sparkles className="text-kitty-yellow animate-pulse" size={40} style={{ animationDelay: '0.5s' }} />
                        <Sparkles className="text-kitty-yellow animate-pulse" size={40} style={{ animationDelay: '1s' }} />
                      </div>

                      <div className="mt-8 text-kawaii-200 font-black uppercase tracking-[0.4em] text-sm">DAY 14: THE ULTIMATE LOVE ❤️</div>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="pt-10 md:pt-16 flex flex-col items-center gap-6 md:gap-10"
                  >
                    <div className="space-y-3 md:space-y-4">
                      <p className="text-xl md:text-2xl font-black text-kawaii-800 italic drop-shadow-sm text-center">Forever and Always,</p>
                      <div className="px-8 md:px-12 py-4 md:py-6 bg-kawaii-900 rounded-[2rem] md:rounded-[3rem] border-[6px] md:border-[10px] border-white shadow-xl ring-6 md:ring-8 ring-kawaii-500/30 group hover:scale-105 transition-transform">
                        <p className="text-3xl md:text-6xl font-black text-white drop-shadow-2xl group-hover:text-kawaii-100 transition-colors text-center">{formData.from} ✨</p>
                      </div>
                    </div>

                    <SquishyButton
                      onClick={reset}
                      variant="primary"
                      className="px-8 md:px-12 py-4 md:py-6 text-lg md:text-2xl mt-4 md:mt-6"
                    >
                      <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" /> Create Another Journey!
                    </SquishyButton>
                  </motion.div>

                  {/* Decorative Border Hearts */}
                  <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex gap-8 z-50">
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-kawaii-500 text-3xl">❤️</motion.div>
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="text-white drop-shadow-md text-3xl">💖</motion.div>
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="text-kawaii-500 text-3xl">❤️</motion.div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </AnimatePresence>

        {/* Floating Love Tags */}
        <AnimatePresence>
          {isRevealed && (
            <div className="fixed inset-0 pointer-events-none z-[1]">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: '110vh', x: `${10 + i * 12}%` }}
                  animate={{
                    opacity: [0, 0.6, 0],
                    y: '-10vh',
                    rotate: [0, 15, -15, 0]
                  }}
                  transition={{
                    duration: 15 + Math.random() * 10,
                    repeat: Infinity,
                    delay: i * 3,
                    ease: 'linear'
                  }}
                  className="absolute font-black text-kawaii-500/30 text-xs md:text-sm uppercase tracking-[0.3em] whitespace-nowrap"
                >
                  {["#PURELOVE 💖", "#SOULMATES 💍", "#FOREVER ♾️", "#MYWORLD 🌎", "#ONELOVE ❤️", "#ALWAYS ♾️", "#TRUEBOND ✨", "#CUTIE 🎀"][i % 8]}
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </main>

      <footer className="z-20 mt-12 text-kawaii-600 text-lg md:text-xl font-serif font-black tracking-[0.2em] md:tracking-[0.3em] bg-white/60 backdrop-blur-md px-8 md:px-12 py-4 md:py-6 rounded-[2rem] md:rounded-[3rem] border-[4px] md:border-8 border-white shadow-2xl animate-bounce-slow italic">
        🎀 MADE WITH LOVE 💖
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #ff98acff;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f8879bff;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ff2551ff;
        }
      `}</style>
    </div>
  );
}

export default App;
