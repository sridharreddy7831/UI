import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { ContainerScroll } from './ui/container-scroll-animation';

const Portfolio = () => {
    const [filter, setFilter] = useState('All');
    const [lightbox, setLightbox] = useState(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const categories = ['All', 'Wedding', 'Birthday', 'Housewarming', 'Engagement'];

    const items = [
        { id: 1, category: 'Wedding', img: 'https://images.unsplash.com/photo-1550005809-91ad75fb315f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', h: 'h-96' },
        { id: 2, category: 'Housewarming', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', h: 'h-64' },
        { id: 3, category: 'Birthday', img: 'https://images.unsplash.com/photo-1530103862676-de8892ebe829?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', h: 'h-80' },
        { id: 4, category: 'Wedding', img: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', h: 'h-64' },
        { id: 5, category: 'Engagement', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', h: 'h-96' },
        { id: 6, category: 'Birthday', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', h: 'h-80' },
    ];

    const filteredItems = filter === 'All' ? items : items.filter(item => item.category === filter);

    return (
        <section className="relative border-t border-[#D4AF37]/10 overflow-hidden" id="portfolio" ref={ref}
            style={{
                background: 'linear-gradient(135deg, rgba(255, 248, 242, 0.8) 0%, rgba(248, 215, 232, 0.5) 50%, rgba(217, 194, 240, 0.4) 100%)'
            }}
        >
            <div className="container mx-auto relative z-10 hidden lg:block">

                {/* 
                  DESKTOP ONLY 
                  Applying the ContainerScroll to the entire layout for desktop
                */}
                <ContainerScroll
                    titleComponent={
                        <div className="text-center mb-8 font-sans">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6 }}
                                className="text-4xl md:text-5xl lg:text-7xl font-serif text-[#4A2E2A] mb-4"
                            >
                                Design <span className="text-[#D4AF37] italic">Gallery</span>
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-gray-700 text-lg max-w-2xl mx-auto"
                            >
                                Explore our curated selection of premium invitation designs.
                            </motion.p>
                        </div>
                    }
                >
                    {/* Filters Inside the 3D Container Scroll Frame */}
                    <div className="w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar bg-transparent p-6 relative">
                        <div className="sticky top-0 z-20 bg-white/50 backdrop-blur-md pt-2 pb-6 border-b border-[#D4AF37]/20 mb-8 flex flex-wrap justify-center gap-4">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 font-sans ${filter === cat
                                        ? 'bg-[#D4AF37]/20 backdrop-blur-md text-[#D4AF37] shadow-lg border border-[#D4AF37]/50'
                                        : 'bg-transparent text-gray-700 border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 hover:text-[#D4AF37] hover:bg-white/30'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Masonry Grid */}
                        <motion.div layout className="columns-1 md:columns-2 gap-6 space-y-6">
                            <AnimatePresence>
                                {filteredItems.map((item, index) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4 }}
                                        key={item.id}
                                        className={`relative group rounded-2xl overflow-hidden cursor-pointer shadow-black/50 hover:shadow-2xl hover:shadow-[#D4AF37]/20 transition-all duration-300 ${item.h} w-full break-inside-avoid border border-white/10`}
                                        onClick={() => setLightbox(item.img)}
                                    >
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                                            style={{ backgroundImage: `url(${item.img})` }}
                                        />

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#4A2E2A]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white backdrop-blur-sm backdrop-saturate-150">
                                            <ZoomIn size={48} className="mb-4 text-[#D4AF37] transform scale-50 group-hover:scale-100 transition-transform duration-500" />
                                            <span className="font-serif text-xl tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.category}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </ContainerScroll>
            </div>

            {/* 
              MOBILE & TABLET FALLBACK
              Displays standard portfolio layout for smaller screens to avoid massive scrolling bugs
            */}
            <div className="container mx-auto px-6 md:px-12 py-24 relative z-10 lg:hidden text-center">
                <div className="text-center mb-16 font-sans">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-serif text-[#4A2E2A] mb-4"
                    >
                        Design <span className="text-[#D4AF37] italic">Gallery</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-700 text-lg max-w-2xl mx-auto"
                    >
                        Explore our curated selection of premium invitation designs.
                    </motion.p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 font-sans ${filter === cat
                                ? 'bg-[#D4AF37]/20 backdrop-blur-md text-[#D4AF37] shadow-lg border border-[#D4AF37]/50'
                                : 'bg-transparent text-gray-700 border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 hover:text-[#D4AF37] hover:bg-white/30'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Mobile Masonry Grid */}
                <motion.div layout className="columns-1 md:columns-2 gap-6 space-y-6">
                    <AnimatePresence>
                        {filteredItems.map((item, index) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                key={item.id}
                                className={`relative group rounded-2xl overflow-hidden cursor-pointer shadow-black/50 hover:shadow-2xl hover:shadow-[#D4AF37]/20 hover:-translate-y-2 transition-all duration-300 ${item.h} w-full break-inside-avoid border border-white/10`}
                                onClick={() => setLightbox(item.img)}
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                                    style={{ backgroundImage: `url(${item.img})` }}
                                />

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#4A2E2A]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white backdrop-blur-sm backdrop-saturate-150">
                                    <ZoomIn size={48} className="mb-4 text-[#D4AF37] transform scale-50 group-hover:scale-100 transition-transform duration-500" />
                                    <span className="font-serif text-xl tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.category}</span>
                                    <div className="w-12 h-[1px] bg-[#D4AF37] mt-4 transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>


            {/* Lightbox Modal (Shared) */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] bg-[rgba(74,46,42,0.95)] backdrop-blur-xl flex items-center justify-center p-4"
                        onClick={() => setLightbox(null)}
                    >
                        <button
                            className="absolute top-8 right-8 text-white/50 hover:text-white hover:rotate-90 transition-all duration-300"
                            onClick={() => setLightbox(null)}
                        >
                            <X size={32} />
                        </button>
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            src={lightbox}
                            alt="Preview"
                            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl border flex border-white/10 ring-1 ring-[#D4AF37]/20"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                /* Hide scrollbar for the internal container but allow scrolling */
                .custom-scrollbar::-webkit-scrollbar {
                  display: none;
                }
                .custom-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};

export default Portfolio;
