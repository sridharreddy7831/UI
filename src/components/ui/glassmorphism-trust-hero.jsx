import React from "react";
import {
    ArrowRight,
    Play,
    Target,
    Crown,
    Star,
} from "lucide-react";

// --- CEREMONY TYPES ---
const CEREMONIES = [
    { name: "Wedding", emoji: "💍" },
    { name: "Engagement", emoji: "💑" },
    { name: "Housewarming", emoji: "🏡" },
    { name: "Birthday", emoji: "🎂" },
    { name: "Baby Shower", emoji: "🍼" },
    { name: "Rice Ceremony", emoji: "🌾" },
    { name: "Naming Ceremony", emoji: "✨" },
    { name: "Anniversary", emoji: "🥂" },
    { name: "Graduation", emoji: "🎓" },
    { name: "Puberty Ceremony", emoji: "🌸" },
];

const StatItem = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1 cursor-default">
        <span className="text-xl font-bold text-white sm:text-2xl">{value}</span>
        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium sm:text-xs">{label}</span>
    </div>
);

export default function GlassmorphismTrustHero() {
    return (
        <div className="relative w-full bg-zinc-950 text-white overflow-hidden font-sans min-h-screen flex items-center">
            {/* 
        SCOPED ANIMATIONS 
      */}
            <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-fade-in {
          animation: fadeSlideIn 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-marquee {
          animation: marquee 40s linear infinite; 
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>

            {/* Background Image with Gradient Mask */}
            <div
                className="absolute inset-0 z-0 bg-[url(https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)] bg-cover bg-center opacity-30 mix-blend-luminosity"
                style={{
                    maskImage: "linear-gradient(180deg, transparent, black 10%, black 70%, transparent)",
                    WebkitMaskImage: "linear-gradient(180deg, transparent, black 10%, black 70%, transparent)",
                }}
            />
            {/* Dark overlay for depth */}
            <div className="absolute inset-0 z-0 bg-zinc-950/60" />

            <div className="relative z-10 w-full mx-auto max-w-7xl px-4 pt-24 pb-8 sm:px-6 md:pt-28 md:pb-12 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">

                    {/* --- LEFT COLUMN --- */}
                    <div className="lg:col-span-7 flex flex-col justify-center space-y-5 lg:space-y-6">

                        {/* Badge */}
                        <div className="animate-fade-in delay-100">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md transition-colors hover:bg-white/10">
                                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                                    Celebrate Life's Sacred Moments
                                    <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                                </span>
                            </div>
                        </div>

                        {/* Heading */}
                        <h1
                            className="animate-fade-in delay-200 text-5xl sm:text-6xl lg:text-7xl xl:text-[5rem] font-serif tracking-tighter leading-[0.9]"
                            style={{
                                maskImage: "linear-gradient(180deg, black 0%, black 80%, transparent 100%)",
                                WebkitMaskImage: "linear-gradient(180deg, black 0%, black 80%, transparent 100%)"
                            }}
                        >
                            Crafting Digital<br />
                            <span className="bg-gradient-to-br from-white via-white to-[#D4AF37] bg-clip-text text-transparent italic">
                                Experiences
                            </span><br />
                            That Matter
                        </h1>

                        {/* Description */}
                        <p className="animate-fade-in delay-300 max-w-xl text-lg text-zinc-400 leading-relaxed font-sans">
                            We design digital invitations that combine beauty with functionality,
                            creating seamless experiences that perfectly set the tone for your special moments.
                        </p>

                        {/* CTA Buttons */}
                        <div className="animate-fade-in delay-400 flex flex-col sm:flex-row gap-4 font-sans">
                            <button className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-zinc-950 transition-all hover:scale-[1.02] hover:bg-zinc-200 active:scale-[0.98]">
                                View Portfolio
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </button>

                            <button className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-white/20 hover:text-[#D4AF37]">
                                <Play className="w-4 h-4 fill-current" />
                                Watch Showreel
                            </button>
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN --- */}
                    <div className="lg:col-span-5 space-y-6">

                        {/* Stats Card */}
                        <div className="animate-fade-in delay-500 relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 lg:p-6 backdrop-blur-xl shadow-2xl">
                            {/* Card Glow Effect */}
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />

                            <div className="relative z-10 font-sans">
                                <div className="flex items-center gap-4 mb-5 lg:mb-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                                        <Target className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold tracking-tight text-white">500+</div>
                                        <div className="text-sm text-zinc-400">Events Celebrated</div>
                                    </div>
                                </div>

                                {/* Progress Bar Section */}
                                <div className="space-y-3 mb-5 lg:mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-400">Client Satisfaction</span>
                                        <span className="text-white font-medium">99%</span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800/50">
                                        <div className="h-full w-[99%] rounded-full bg-gradient-to-r from-white to-[#D4AF37]" />
                                    </div>
                                </div>

                                <div className="h-px w-full bg-white/10 mb-4 lg:mb-5" />

                                {/* Mini Stats Grid */}
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <StatItem value="10+" label="Themes" />
                                    <div className="w-px h-full bg-white/10 mx-auto" />
                                    <StatItem value="24/7" label="Support" />
                                    <div className="w-px h-full bg-white/10 mx-auto" />
                                    <StatItem value="100%" label="Quality" />
                                </div>

                                {/* Tag Pills */}
                                <div className="mt-5 lg:mt-6 flex flex-wrap gap-2">
                                    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-zinc-300">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        ACCEPTING BOOKINGS
                                    </div>
                                    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-[#D4AF37]">
                                        <Crown className="w-3 h-3 text-[#D4AF37]" />
                                        PREMIUM
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ceremony Types Marquee Card */}
                        <div className="animate-fade-in delay-500 relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 py-5 lg:py-6 backdrop-blur-xl">
                            <h3 className="mb-6 px-8 text-sm font-medium text-zinc-400 font-sans uppercase tracking-[0.15em]">
                                We Create Invitations For
                            </h3>

                            <div
                                className="relative flex overflow-hidden"
                                style={{
                                    maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                                    WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
                                }}
                            >
                                <div className="animate-marquee flex gap-8 whitespace-nowrap px-4">
                                    {[...CEREMONIES, ...CEREMONIES, ...CEREMONIES].map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-2.5 opacity-60 transition-all duration-300 hover:opacity-100 hover:scale-105 cursor-default group"
                                        >
                                            <span className="text-xl">{item.emoji}</span>
                                            <span className="text-sm font-semibold text-white tracking-wide font-sans group-hover:text-[#D4AF37] transition-colors">
                                                {item.name}
                                            </span>
                                            <span className="text-white/20 text-xs ml-1">✦</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
