import React from "react";
import { Button } from "./button";
import { Check, Sparkles } from "lucide-react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

function CreativePricing({
    tag = "Investment",
    title = "Premium Features For",
    description = "Create unforgettable digital experiences for your guests.",
    tiers,
}) {
    return (
        <section className="py-24 bg-gradient-to-br from-[#FFF8F2] via-[#F8D7E8]/15 to-[#D9C2F0]/10 relative overflow-hidden border-t border-[#D4AF37]/20" id="pricing">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D4AF37]/8 rounded-full mix-blend-screen filter blur-[120px] opacity-20 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full mix-blend-screen filter blur-[100px] opacity-15 -translate-x-1/3 translate-y-1/3 pointer-events-none" />

            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center space-y-6 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[#D4AF37] uppercase tracking-[0.2em] font-medium text-sm"
                    >
                        {tag}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="relative inline-block"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#4A2E2A] leading-tight">
                            {title} <span className="text-[#D4AF37] italic">Your Celebration</span>
                        </h2>

                        <div className="absolute -right-8 -top-6 text-[#D4AF37]/50 animate-pulse">
                            <Sparkles className="w-8 h-8" />
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="font-sans text-lg md:text-xl text-gray-700 max-w-2xl mx-auto"
                    >
                        {description}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    {tiers.map((tier, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            key={tier.name}
                            className={cn(
                                "relative group flex flex-col h-full",
                                tier.popular ? "md:-mt-8 md:mb-8 z-10" : "z-0"
                            )}
                        >
                            {/* Glass Card Container */}
                            <div
                                className={cn(
                                    "flex-1 relative flex flex-col p-8 md:p-10 rounded-3xl transition-all duration-500",
                                    "bg-white/40 backdrop-blur-xl border border-[#D4AF37]/30",
                                    "group-hover:bg-white/50 group-hover:-translate-y-2",
                                    tier.popular ? "border-[#D4AF37]/50 shadow-lg group-hover:border-[#D4AF37]/70" : "shadow-md"
                                )}
                            >
                                {/* Glowing ambient background on hover */}
                                <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

                                {tier.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-zinc-950 font-bold uppercase tracking-widest px-4 py-1.5 rounded-full text-xs shadow-lg">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-8 relative z-10 flex-1">
                                    <div
                                        className={cn(
                                            "w-12 h-12 rounded-full mb-6 flex items-center justify-center border",
                                            tier.popular
                                                ? "bg-[#D4AF37]/15 border-[#D4AF37]/50 text-[#D4AF37]"
                                                : "bg-[#F8D7E8]/30 border-[#D4AF37]/40 text-[#D4AF37] group-hover:text-[#B68A2E]"
                                        )}
                                    >
                                        {tier.icon}
                                    </div>
                                    <h3 className="font-serif text-3xl text-[#4A2E2A] mb-2">
                                        {tier.name}
                                    </h3>
                                    <p className="font-sans text-gray-700 text-sm leading-relaxed mb-6">
                                        {tier.description}
                                    </p>

                                    {/* Price */}
                                    <div className="font-sans flex items-baseline gap-2 mb-8 pb-8 border-b border-[#D4AF37]/30">
                                        <span className="text-5xl font-bold text-[#D4AF37] tracking-tight">
                                            ₹{tier.price}
                                        </span>
                                    </div>

                                    {/* Features */}
                                    <div className="space-y-4 font-sans">
                                        {tier.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-4">
                                                <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                                                    <Check className="w-3 h-3 text-[#D4AF37]" strokeWidth={3} />
                                                </div>
                                                <span className="text-[#4A2E2A]/80 text-sm">
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-auto relative z-10 pt-4">
                                    <button
                                        className={cn(
                                            "w-full h-14 rounded-full font-sans font-semibold tracking-wide transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]",
                                            tier.popular
                                                ? "bg-[#D4AF37] text-[#4A2E2A] hover:bg-[#B68A2E] hover:text-[#4A2E2A]"
                                                : "bg-white/20 text-[#4A2E2A] hover:bg-[#D4AF37] hover:text-white border border-[#D4AF37]/40"
                                        )}
                                    >
                                        Choose {tier.name}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export { CreativePricing };
