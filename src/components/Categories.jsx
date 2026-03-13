import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const TiltCard = ({ category, index, inView }) => {
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateXValue = ((y - centerY) / centerY) * -15;
        const rotateYValue = ((x - centerX) / centerX) * 15;

        setRotateX(rotateXValue);
        setRotateY(rotateYValue);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            style={{ perspective: 1000 }}
            className="relative h-96 w-full group"
        >
            <Link to={`/collections/${category.slug}`} className="block w-full h-full">
                <motion.div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    animate={{ rotateX, rotateY }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-full h-full rounded-2xl overflow-hidden shadow-2xl transition-shadow duration-300 transform-style-3d bg-zinc-900 border border-white/10 group-hover:border-[#D4AF37]/30 cursor-pointer group-hover:-translate-y-2 relative"
                >
                    {/* Image background */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100"
                        style={{
                            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(9, 9, 11, 0.95)), url('${category.image}')`
                        }}
                    />

                    {/* Subtle Brand Badge */}
                    <div className="absolute top-4 right-4 z-20">
                        <img src="/logo.png" alt="Uthsav" className="h-6 w-auto object-contain opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                    </div>

                    {/* Card Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end translate-z-12">
                        <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-sans mb-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">Bespoke Collection</span>
                        <h3 className="text-2xl font-serif text-white mb-2 translate-z-20 transform">{category.title}</h3>
                        <div className="w-0 h-[2px] bg-[#D4AF37] transition-all duration-300 group-hover:w-16 mb-4 translate-z-20 shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                        <p className="text-zinc-300 font-sans text-sm translate-z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 tracking-wide">
                            Explore Designs →
                        </p>
                    </div>

                    {/* Shine effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
                </motion.div>
            </Link>
        </motion.div>
    );
};

const Categories = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const categories = [
        { title: "Wedding Invitations", slug: "wedding-invitations", image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&auto=format&fit=crop&q=80" },
        { title: "Housewarming Invitations", slug: "housewarming-invitations", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80" },
        { title: "Birthday Invitations", slug: "birthday-invitations", image: "https://images.unsplash.com/photo-1464349172961-60fb65f28450?w=800&auto=format&fit=crop&q=80" },
        { title: "Baby Shower Invitations", slug: "baby-shower-invitations", image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop&q=80" },
        { title: "Engagement Invitations", slug: "engagement-invitations", image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&auto=format&fit=crop&q=80" },
        { title: "Naming Ceremony", slug: "naming-ceremony", image: "https://images.unsplash.com/photo-1544126592-807daf21565b?w=800&auto=format&fit=crop&q=80" }
    ];

    return (
        <section className="py-24 bg-zinc-950 relative border-t border-white/5" id="categories" ref={ref}>
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 font-sans">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-serif text-white mb-4"
                    >
                        Invitation <span className="text-[#D4AF37] italic">Collections</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-zinc-400 text-lg"
                    >
                        Discover our carefully curated collections designed for every significant milestone in your life.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((cat, index) => (
                        <TiltCard key={index} category={cat} index={index} inView={isInView} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
