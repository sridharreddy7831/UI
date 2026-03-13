import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Leaf } from 'lucide-react';

const Comparison = () => {
    return (
        <section className="bg-zinc-950 text-white py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="comparison">
            {/* Glow Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-wide leading-tight"
                    >
                        Paper <span className="text-[#D4AF37] italic">vs</span> Digital
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                        className="text-zinc-400 text-base md:text-lg lg:text-xl font-sans leading-relaxed"
                    >
                        Paper invitations are wonderful — tradition, texture, and emotion in every detail… if the budget allows.
                        <br /><br />
                        The <span className="text-[#D4AF37] font-serif italic text-xl">Digital Yes</span> is a carefully crafted and elegant alternative for those who prefer to save costs and simplify without giving up design or experience.
                    </motion.p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-20 lg:px-12">
                    {/* Paper Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="bg-zinc-900/40 border border-white/10 rounded-[2rem] p-8 md:p-12 backdrop-blur-md transition-transform hover:-translate-y-2 hover:bg-zinc-900/60 duration-500 ease-out flex flex-col"
                    >
                        <div className="mb-8 border-b border-white/5 pb-8">
                            <h3 className="text-3xl font-serif text-zinc-300 mb-2">Paper Invitation</h3>
                            <p className="text-zinc-500 font-sans tracking-wide text-sm">Approx. price for 500 guests</p>
                        </div>

                        <div className="space-y-6 mb-12 flex-1 font-sans text-zinc-400">
                            <div className="flex justify-between items-center group">
                                <span className="group-hover:text-zinc-200 transition-colors">Design</span>
                                <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors">₹3,000</span>
                            </div>
                            <div className="flex justify-between items-center group">
                                <span className="group-hover:text-zinc-200 transition-colors">Printing (250 boxes/cards)</span>
                                <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors">₹15,000</span>
                            </div>
                            <div className="flex justify-between items-center group">
                                <span className="group-hover:text-zinc-200 transition-colors">Envelopes & Sealing</span>
                                <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors">₹2,500</span>
                            </div>
                            <div className="flex justify-between items-center group">
                                <span className="group-hover:text-zinc-200 transition-colors">Courier / Postal Shipping</span>
                                <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors">₹4,500</span>
                            </div>
                        </div>

                        <div className="mt-auto pt-6 border-t border-white/10">
                            <div className="flex justify-between items-end">
                                <span className="text-zinc-500 text-xs tracking-[0.2em] font-medium uppercase">Total Cost</span>
                                <span className="text-3xl md:text-4xl font-serif text-white">~₹25,000</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Digital Card - Highlighted */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="relative bg-gradient-to-br from-zinc-900 to-[#1a1710] border border-[#D4AF37]/30 rounded-[2rem] p-8 md:p-12 backdrop-blur-md transition-all hover:-translate-y-2 hover:shadow-[0_20px_50px_-20px_rgba(212,175,55,0.3)] hover:border-[#D4AF37]/60 duration-500 ease-out flex flex-col"
                    >
                        {/* Glow behind card */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent rounded-[2rem] pointer-events-none" />

                        {/* Badge */}
                        <div className="absolute -top-4 right-8 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-zinc-950 px-6 py-1.5 rounded-full text-xs font-bold tracking-[0.1em] uppercase shadow-[0_0_20px_rgba(212,175,55,0.4)] z-10">
                            Best Choice
                        </div>

                        <div className="mb-8 border-b border-[#D4AF37]/10 pb-8 relative z-10">
                            <h3 className="text-3xl font-serif text-white mb-2 tracking-wide">Digital Invitation</h3>
                            <p className="text-[#D4AF37] font-sans tracking-wide text-sm">Premium & Effortless</p>
                        </div>

                        <div className="space-y-6 mb-12 flex-1 font-sans text-zinc-300 relative z-10">
                            <div className="flex items-start gap-4">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                                <span className="font-semibold text-white tracking-wide">Save up to ₹24,000</span>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                                <span className="text-zinc-400">No printing or shipping costs</span>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                                <span className="text-zinc-400">Guest panel & <span className="text-zinc-300">Real-time confirmations</span></span>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                                <span className="text-zinc-400">Always accessible on every guest's phone</span>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                                <span className="text-zinc-400">Instant delivery to all contacts</span>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                                <span className="text-zinc-400">Ready in 24h</span>
                            </div>
                        </div>

                        <div className="mt-auto pt-6 border-t border-[#D4AF37]/20 relative z-10">
                            <div className="flex justify-between items-end">
                                <span className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase font-semibold">All Included</span>
                                <div className="text-right">
                                    <span className="block text-zinc-500 text-xs tracking-wider mb-1 uppercase">From only</span>
                                    <span className="block text-3xl md:text-4xl font-serif text-[#D4AF37]">₹1,000</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Feature Table */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="max-w-4xl mx-auto lg:px-12"
                >
                    <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-xl shadow-2xl">
                        <div className="grid grid-cols-3 md:grid-cols-[2fr_1fr_1fr] items-center bg-zinc-900/50 border-b border-white/10 p-5 md:p-8">
                            <div className="text-xs md:text-sm uppercase tracking-[0.2em] text-zinc-500 font-sans font-semibold pl-2 md:pl-4">Features</div>
                            <div className="text-center text-lg md:text-xl font-serif text-zinc-400">Paper</div>
                            <div className="text-center text-lg md:text-xl font-serif text-[#D4AF37]">Digital</div>
                        </div>

                        <div className="divide-y divide-white/5">
                            {[
                                { label: 'Data Updates & Corrections', paper: false, digital: true },
                                { label: 'RSVP Tracking', paper: false, digital: true },
                                { label: 'Interactive Google Map', paper: false, digital: true },
                                { label: 'Live Countdown', paper: false, digital: true },
                                { label: 'Photo Gallery', paper: false, digital: true },
                                { label: 'Background Music', paper: false, digital: true },
                            ].map((feature, i) => (
                                <div key={i} className="grid grid-cols-3 md:grid-cols-[2fr_1fr_1fr] items-center p-5 md:p-6 hover:bg-white/5 transition-colors duration-300">
                                    <div className="text-sm md:text-base text-zinc-300 font-sans pl-2 md:pl-4">{feature.label}</div>
                                    <div className="flex justify-center transition-transform hover:scale-110">
                                        {feature.paper ? <Check className="w-5 h-5 md:w-6 md:h-6 text-zinc-500" /> : <X className="w-4 h-4 md:w-5 md:h-5 text-zinc-700" />}
                                    </div>
                                    <div className="flex justify-center transition-transform hover:scale-110">
                                        {feature.digital ? <Check className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" /> : <X className="w-4 h-4 md:w-5 md:h-5 text-zinc-600" />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Eco note */}
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-zinc-500 font-sans text-xs md:text-sm text-center px-4">
                        <Leaf className="w-4 h-4 text-green-500/80 shrink-0" />
                        <p>Each digital invitation avoids paper use and helps reduce the carbon footprint.</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Comparison;
