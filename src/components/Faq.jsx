import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
    {
        q: "What is a digital invitation website?",
        a: "A digital invitation is a premium, interactive webpage designed specifically for your event. It replaces paper cards with an immersive experience featuring elegant animations, background music, interactive location maps, event count-downs, and real-time RSVP collection."
    },
    {
        q: "How do guests submit their RSVP?",
        a: "Your guests simply click the RSVP button on your invitation page, enter their details (name, attendance count, phone, message), and submit. The responses are stored in the database and are instantly viewable in your dashboard."
    },
    {
        q: "Can I customize the photos, timelines, and music?",
        a: "Absolutely. All invitation packages allow full personalization. You can select your background score, upload your pictures, outline your event schedule, and specify font/color themes to match your celebration."
    },
    {
        q: "How fast will my digital invitation be ready?",
        a: "Our standard invitations are ready within 24 to 48 hours once details are provided. Customized Royal packages, which feature custom 3D animations and unique typography, are delivered in 3 to 5 business days."
    },
    {
        q: "How do I share my invitation with guests?",
        a: "We provide a clean, personalized link (e.g., uthsavinvites.in/slug) that you can easily share over WhatsApp, email, or social media. Guests can access it instantly from any mobile, tablet, or desktop browser."
    }
];

const FAQItem = ({ faq, isOpen, toggleOpen, index }) => {
    return (
        <div className="border border-[#D4AF37]/20 rounded-2xl bg-white/30 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:bg-white/40">
            <button
                onClick={toggleOpen}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
            >
                <div className="flex items-center gap-3 pr-4">
                    <HelpCircle className="w-5 h-5 text-[#D4AF37] shrink-0" aria-hidden="true" />
                    <span className="font-serif text-lg font-semibold text-[#4A2E2A]">{faq.q}</span>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown className="w-5 h-5 text-[#D4AF37]" aria-hidden="true" />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        id={`faq-answer-${index}`}
                        role="region"
                        aria-labelledby={`faq-question-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-6 pb-6 pt-2 border-t border-[#D4AF37]/10 text-gray-700 text-sm leading-relaxed font-light">
                            {faq.a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleOpen = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 relative overflow-hidden font-sans" id="faq" style={{
            background: 'linear-gradient(135deg, rgba(255, 248, 242, 0.6) 0%, rgba(217, 194, 240, 0.15) 50%, rgba(253, 230, 220, 0.25) 100%)'
        }}>
            {/* Background decorative glows */}
            <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full opacity-5 pointer-events-none -translate-x-1/2" style={{
                background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)'
            }} />
            
            <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-4xl">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-block">
                        <span className="text-[#D4AF37] text-sm font-medium tracking-[0.2em] px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5">COMMON QUESTIONS</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif text-[#4A2E2A]">
                        Frequently Asked <span className="text-[#D4AF37] italic">Questions</span>
                    </h2>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            index={index}
                            faq={faq}
                            isOpen={openIndex === index}
                            toggleOpen={() => toggleOpen(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faq;
