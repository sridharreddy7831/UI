import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MousePointerClick, FileText, PenTool, Send } from 'lucide-react';

const steps = [
    { icon: MousePointerClick, title: 'Choose Style', desc: 'Browse our collection and select a design that beautifully matches your aesthetic and celebration theme.' },
    { icon: FileText, title: 'Provide Details', desc: 'Share your event information, custom wording preferences, and upload your personal photos effortlessly.' },
    { icon: PenTool, title: 'We Design', desc: 'Our team crafts your custom invitation, implementing premium layouts, dynamic animations, and elegant typography.' },
    { icon: Send, title: 'Receive & Share', desc: 'Get your final digital invitation link within hours, ready to share globally with your beloved guests.' },
];

const HowItWorks = () => {
    const containerRef = useRef(null);

    // Track vertical scroll progress strictly within this timeline component
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    // We can extract a height percentage for the glowing line based on scroll
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section
            id="how-it-works"
            className="relative py-24 overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, rgba(253, 230, 220, 0.4) 0%, rgba(217, 194, 240, 0.1) 50%, rgba(255, 248, 242, 0.6) 100%)'
            }}
        >
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-block mb-4"
                    >
                        <span className="text-[#D4AF37] text-sm font-medium tracking-[0.2em] px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5">OUR PROCESS</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-serif text-[#4A2E2A] mb-6"
                    >
                        The <span className="text-[#D4AF37] italic">Timeline</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-700 text-lg font-light max-w-2xl mx-auto"
                    >
                        Your journey to a breathtaking premium invitation in exactly four simple steps.
                    </motion.p>
                </div>

                {/* Vertical Timeline Wrapper */}
                <div ref={containerRef} className="relative max-w-5xl mx-auto pb-12">
                    
                    {/* The Unfilled Track Line (Grey/Transparent) */}
                    <div className="absolute left-[38px] md:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-[#4A2E2A]/5 via-[#4A2E2A]/10 to-transparent -translate-x-1/2 rounded-full" />

                    {/* The Filled Active Line (Gold) controlled by scrollYProgress */}
                    <motion.div 
                        className="absolute left-[38px] md:left-1/2 top-4 w-1 bg-gradient-to-b from-[#D4AF37] to-[#f4d160] -translate-x-1/2 rounded-full origin-top shadow-[0_0_15px_rgba(212,175,55,0.6)]"
                        style={{ height: lineHeight }}
                    />

                    <div className="space-y-16 md:space-y-24">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            // Desktop mapping: Evens are left, Odds are right
                            const isLeft = index % 2 === 0;

                            return (
                                <div key={index} className={`relative flex flex-col md:flex-row items-center w-full group cursor-default ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>
                                    
                                    {/* Desktop: Empty space to push content to correct side */}
                                    <div className={`hidden md:block w-1/2 ${isLeft ? 'pr-16 text-right' : 'pl-16 text-left'}`}>
                                        <motion.div
                                            initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
                                            className={`premium-card premium-card-blush rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.3)] shadow-lg relative overflow-hidden`}
                                        >
                                            {/* Step Number Watermark */}
                                            <span className={`absolute -top-6 ${isLeft ? '-left-4' : '-right-4'} text-[120px] font-serif font-black text-[#D4AF37]/5 select-none pointer-events-none transition-all duration-500 group-hover:text-[#D4AF37]/10 group-hover:scale-110`}>
                                                {index + 1}
                                            </span>

                                            <h3 className="text-2xl font-serif text-[#4A2E2A] mb-3 relative z-10">{step.title}</h3>
                                            <p className="text-gray-600 font-light leading-relaxed relative z-10">{step.desc}</p>
                                        </motion.div>
                                    </div>

                                    {/* Center Timeline Node Dot */}
                                    <div className="absolute left-[38px] md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.5, delay: 0.1 }}
                                            className="w-20 h-20 rounded-full bg-white border border-[#D4AF37]/30 shadow-[0_0_20px_rgba(212,175,55,0.2)] flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:border-[#D4AF37] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                                        >
                                            {/* Inner circle */}
                                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#c7a02c] text-white flex items-center justify-center">
                                                <Icon size={24} className="group-hover:animate-bounce" />
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Mobile Content Display */}
                                    <div className="w-full pl-[90px] md:hidden pt-2">
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{ duration: 0.6 }}
                                            className="premium-card premium-card-blush rounded-2xl p-6 shadow-md relative overflow-hidden active:scale-[0.98] transition-all"
                                        >
                                            <span className="absolute -top-4 -right-2 text-[80px] font-serif font-black text-[#D4AF37]/5 select-none pointer-events-none">
                                                {index + 1}
                                            </span>
                                            <h3 className="text-xl font-serif text-[#4A2E2A] mb-2">{step.title}</h3>
                                            <p className="text-gray-600 font-light text-sm leading-relaxed">{step.desc}</p>
                                        </motion.div>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HowItWorks;
