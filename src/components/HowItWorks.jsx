import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
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
            className="overflow-hidden relative"
            id="how-it-works"
            ref={containerRef}
            style={{
                background: 'linear-gradient(135deg, rgba(253, 230, 220, 0.3) 0%, rgba(255, 248, 242, 0.5) 100%)'
            }}
        >
            <div className="py-24 md:py-32 lg:h-screen lg:flex lg:flex-col lg:justify-center relative z-10">

                <div className="container mx-auto px-6 md:px-12 mb-16 lg:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block mb-6"
                    >
                        <span className="text-[#D4AF37] text-sm font-medium tracking-widest">SIMPLE PROCESS</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-serif text-[#4A2E2A] mb-4">
                        How It <span className="text-[#D4AF37]">Works</span>
                    </h2>
                    <p className="text-gray-700 text-lg font-light max-w-2xl">
                        Our seamless process ensures your premium invitations are crafted beautifully and delivered on time.
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
                                    className="lg:w-[400px] lg:flex-shrink-0 lg:pr-12 relative"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="premium-card premium-card-blush h-full group"
                                    >
                                        {/* Step Number Background */}
                                        <span className="absolute -top-2 -right-2 text-7xl font-serif font-bold text-[#D4AF37]/5 group-hover:text-[#D4AF37]/10 transition-colors duration-500 pointer-events-none">
                                            {index + 1}
                                        </span>

                                        <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B68A2E] text-white rounded-2xl flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                            <Icon size={28} />
                                        </div>

                                        <h3 className="text-2xl font-serif text-[#4A2E2A] mb-4 relative z-10 tracking-wide">{step.title}</h3>
                                        <p className="text-gray-700 font-light relative z-10 leading-relaxed">{step.desc}</p>

                                        {/* Connecting Line (Desktop only) */}
                                        {index !== steps.length - 1 && (
                                            <div className="hidden lg:block absolute top-[5rem] -right-8 w-8 h-[2px] bg-gradient-to-r from-[#D4AF37] to-transparent" />
                                        )}
                                    </motion.div>
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
