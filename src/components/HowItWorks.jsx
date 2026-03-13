import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointerClick, FileText, PenTool, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    { icon: MousePointerClick, title: 'Choose Style', desc: 'Browse our collection and select a design that matches your aesthetic.' },
    { icon: FileText, title: 'Send Details', desc: 'Provide your event information, specific wording, and personal photos.' },
    { icon: PenTool, title: 'We Design', desc: 'Our team crafts your custom invitation with premium layouts and animations.' },
    { icon: Send, title: 'Receive', desc: 'Get your final digital invitation link, ready to share with your guests.' },
];

const HowItWorks = () => {
    const containerRef = useRef(null);
    const scrollWrapperRef = useRef(null);
    const elementsRef = useRef([]);

    useEffect(() => {
        // Horizontal scroll effect using GSAP
        if (!scrollWrapperRef.current || !containerRef.current) return;

        const sections = elementsRef.current;

        // We only want horizontal scroll on desktop
        const matchMedia = gsap.matchMedia();

        matchMedia.add("(min-width: 1024px)", () => {
            gsap.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1,
                    end: () => "+=" + scrollWrapperRef.current.offsetWidth,
                }
            });
        });

        return () => {
            matchMedia.revert();
        };
    }, []);

    return (
        <section
            className="bg-zinc-950 overflow-hidden relative border-t border-white/5"
            id="how-it-works"
            ref={containerRef}
        >
            <div className="py-24 md:py-32 lg:h-screen lg:flex lg:flex-col lg:justify-center relative z-10">

                <div className="container mx-auto px-6 md:px-12 mb-16 lg:mb-24">
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-4 text-center lg:text-left">
                        How It <span className="text-[#D4AF37] italic">Works</span>
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl text-center lg:text-left font-sans">
                        Our seamless process ensures your invitations are designed perfectly and delivered on time.
                    </p>
                </div>

                {/* Horizontal Scroll Wrapper */}
                <div className="container mx-auto px-6 md:px-12">
                    <div
                        className="flex flex-col lg:flex-row gap-12 lg:gap-0"
                        ref={scrollWrapperRef}
                    >
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <div
                                    key={index}
                                    ref={el => elementsRef.current[index] = el}
                                    className="lg:w-[400px] lg:flex-shrink-0 lg:pr-16 relative"
                                >
                                    <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-lg hover:shadow-[#D4AF37]/10 transition-all duration-300 relative group h-full overflow-hidden hover:bg-white/10">

                                        {/* Step Number Background */}
                                        <span className="absolute -top-6 -right-4 text-8xl font-serif font-black text-white/5 group-hover:text-[#D4AF37]/10 transition-colors duration-500 pointer-events-none">
                                            {index + 1}
                                        </span>

                                        <div className="w-16 h-16 bg-zinc-900 border border-white/10 text-[#D4AF37] rounded-full flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-zinc-900 group-hover:border-transparent transition-all duration-300 shadow-sm">
                                            <Icon size={32} />
                                        </div>

                                        <h3 className="text-2xl font-serif text-white mb-4 relative z-10 tracking-wide">{step.title}</h3>
                                        <p className="text-zinc-400 leading-relaxed font-sans relative z-10">{step.desc}</p>

                                        {/* Connecting Line (Desktop only) */}
                                        {index !== steps.length - 1 && (
                                            <div className="hidden lg:block absolute top-[5rem] -right-8 w-16 h-[2px] bg-gradient-to-r from-[#D4AF37]/50 to-transparent opacity-50" />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Decorative Blur Backgrounds */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-900/20 rounded-full blur-[100px] pointer-events-none" />
        </section>
    );
};

export default HowItWorks;
