import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const Comparison = () => {
    return (
        <section className="bg-white py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="comparison" style={{
            background: 'linear-gradient(135deg, rgba(217, 194, 240, 0.15) 0%, rgba(253, 230, 220, 0.15) 100%)'
        }}>
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-5 pointer-events-none" style={{
                background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)'
            }} />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-5 pointer-events-none" style={{
                background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)'
            }} />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block"
                    >
                        <span className="text-[#D4AF37] text-sm font-medium tracking-widest">WHY DIGITAL?</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#4A2E2A] tracking-wide leading-tight"
                    >
                        Paper <span className="text-[#D4AF37]">vs</span> Digital Invitations
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                        className="text-gray-700 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto"
                    >
                        Traditional paper invitations carry charm and tradition. But digital invitations combine elegance, sustainability, and modern functionality—all at a fraction of the cost.
                    </motion.p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-20">
                    {/* Paper Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="premium-card premium-card-blush"
                    >
                        <div className="mb-8 pb-8 border-b border-gray-300/30">
                            <h3 className="text-2xl font-serif text-[#4A2E2A] mb-2">Paper Invitations</h3>
                            <p className="text-gray-600 font-light text-sm">Estimated cost for 500 guests</p>
                        </div>

                        <div className="space-y-5 mb-12 flex-1 font-light text-gray-700">
                            <div className="flex justify-between items-center">
                                <span>Design & Setup</span>
                                <span className="font-semibold text-[#4A2E2A]">₹3,000</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Printing (500 cards)</span>
                                <span className="font-semibold text-[#4A2E2A]">₹15,000</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Envelopes & Sealing</span>
                                <span className="font-semibold text-[#4A2E2A]">₹2,500</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Courier/Postal Shipping</span>
                                <span className="font-semibold text-[#4A2E2A]">₹4,500</span>
                            </div>
                        </div>

                        <div className="mt-auto pt-6 border-t border-gray-300/30">
                            <div className="flex justify-between items-end">
                                <span className="text-gray-600 text-xs tracking-widest font-medium">TOTAL</span>
                                <span className="text-4xl font-serif text-[#4A2E2A]">~₹25,000</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Digital Card - Featured */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="relative premium-card"
                        style={{
                            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(230, 183, 169, 0.1) 100%)',
                            border: '2px solid #D4AF37'
                        }}
                    >
                        {/* Badge */}
                        <div className="absolute -top-4 right-8 bg-gradient-to-r from-[#D4AF37] to-[#B68A2E] text-white px-6 py-1.5 rounded-full text-xs font-bold tracking-widest transform">
                            BEST CHOICE
                        </div>

                        <div className="mb-8 pb-8 border-b border-[#D4AF37]/20 relative z-10">
                            <h3 className="text-2xl font-serif text-[#4A2E2A] mb-2 tracking-wide">Digital Invitations</h3>
                            <p className="text-[#D4AF37] font-medium text-sm tracking-wide">Premium, Elegant & Instant</p>
                        </div>

                        <div className="space-y-4 mb-12 flex-1 text-gray-700 relative z-10">
                            <div className="flex items-start gap-3">
                                <div className="mt-1.5 w-2 h-2 rounded-full bg-[#D4AF37]" />
                                <span className="font-semibold text-[#4A2E2A]">Save up to ₹24,000</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1.5 w-2 h-2 rounded-full bg-[#D4AF37]" />
                                <span>Instant delivery to all guests</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1.5 w-2 h-2 rounded-full bg-[#D4AF37]" />
                                <span>Real-time RSVP tracking</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1.5 w-2 h-2 rounded-full bg-[#D4AF37]" />
                                <span>Beautiful animations & interactivity</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1.5 w-2 h-2 rounded-full bg-[#D4AF37]" />
                                <span>Eco-friendly & sustainable</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1.5 w-2 h-2 rounded-full bg-[#D4AF37]" />
                                <span>Ready in 24 hours</span>
                            </div>
                        </div>

                        <div className="mt-auto pt-6 border-t border-[#D4AF37]/20 relative z-10">
                            <div className="flex justify-between items-end">
                                <span className="text-[#D4AF37] text-xs tracking-widest font-medium">FROM JUST</span>
                                <div className="text-right">
                                    <span className="block text-gray-600 text-xs tracking-wider mb-1">Starting at</span>
                                    <span className="block text-4xl font-serif text-[#D4AF37]">₹1,000</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Feature Comparison Table */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="premium-card" style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(253, 230, 220, 0.1) 100%)' }}>
                        <div className="grid grid-cols-3 gap-8 text-center">
                            <div>
                                <h4 className="text-sm font-medium text-[#D4AF37] tracking-widest mb-6">FEATURES</h4>
                                <div className="space-y-4 text-left">
                                    <div className="text-sm font-light text-gray-700">Design & Customization</div>
                                    <div className="text-sm font-light text-gray-700">Delivery Speed</div>
                                    <div className="text-sm font-light text-gray-700">Guest Interaction</div>
                                    <div className="text-sm font-light text-gray-700">Environmental Impact</div>
                                    <div className="text-sm font-light text-gray-700">Cost Effective</div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-[#4A2E2A] tracking-widest mb-6">PAPER</h4>
                                <div className="space-y-4">
                                    <Check size={20} className="text-gray-400 mx-auto" />
                                    <Check size={20} className="text-gray-400 mx-auto" />
                                    <X size={20} className="text-gray-400 mx-auto" />
                                    <X size={20} className="text-gray-400 mx-auto" />
                                    <X size={20} className="text-gray-400 mx-auto" />
                                </div>
                            </div>
                            <div className="bg-gradient-to-b from-[#F8D7E8]/20 to-[#FDE6DC]/20 rounded-lg p-6 -m-6">
                                <h4 className="text-sm font-medium text-[#D4AF37] tracking-widest mb-6">DIGITAL</h4>
                                <div className="space-y-4">
                                    <Check size={20} className="text-[#D4AF37] mx-auto" />
                                    <Check size={20} className="text-[#D4AF37] mx-auto" />
                                    <Check size={20} className="text-[#D4AF37] mx-auto" />
                                    <Check size={20} className="text-[#D4AF37] mx-auto" />
                                    <Check size={20} className="text-[#D4AF37] mx-auto" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Comparison;
