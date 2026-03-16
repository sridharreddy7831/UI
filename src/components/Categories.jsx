import React, { useRef, useState, useEffect } from 'react';
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
                    className="w-full h-full rounded-2xl overflow-hidden premium-card transition-all duration-300 transform-style-3d group-hover:-translate-y-2 relative"
                    style={{
                        background: 'linear-gradient(135deg, rgba(248, 215, 232, 0.3) 0%, rgba(253, 230, 220, 0.2) 100%)'
                    }}
                >
                    {/* Image background */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{
                            backgroundImage: `linear-gradient(135deg, rgba(74, 46, 42, 0.3), rgba(180, 138, 46, 0.2)), url('${category.image}')`
                        }}
                    />

                    {/* Content overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(74,46,42,0.8)] from-0% via-transparent via-50% to-transparent" />

                    {/* Card Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                        <motion.span 
                            className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-light mb-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                        >
                            ✨ COLLECTION
                        </motion.span>
                        <h3 className="text-2xl md:text-3xl font-serif text-white mb-4 leading-tight">{category.title}</h3>
                        <div className="w-12 h-px bg-gradient-to-r from-[#D4AF37] to-transparent mb-4 transition-all duration-300 group-hover:w-20" />
                        <p className="text-amber-50/90 font-light text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                            Explore premium designs →
                        </p>
                    </div>

                    {/* Shine effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
            </Link>
        </motion.div>
    );
};

const Categories = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // We're importing getCategories from data hook, but since Categories 
                // is not in a route that might be statically checked, let's load it dynamically
                const { getCategories } = await import('../lib/data');
                const data = await getCategories();
                if (data.length > 0) {
                    setCategories(data.filter(c => c.visible !== false));
                } else {
                    setCategories([
                        { title: "Wedding Invitations", slug: "wedding-invitations", image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&auto=format&fit=crop&q=80" },
                        { title: "Housewarming Invitations", slug: "housewarming-invitations", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80" },
                        { title: "Birthday Invitations", slug: "birthday-invitations", image: "https://images.unsplash.com/photo-1464349172961-60fb65f28450?w=800&auto=format&fit=crop&q=80" },
                        { title: "Baby Shower Invitations", slug: "baby-shower-invitations", image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop&q=80" },
                        { title: "Engagement Invitations", slug: "engagement-invitations", image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&auto=format&fit=crop&q=80" },
                        { title: "Naming Ceremony", slug: "naming-ceremony", image: "https://images.unsplash.com/photo-1544126592-807daf21565b?w=800&auto=format&fit=crop&q=80" }
                    ]);
                }
            } catch (error) {
                console.error("Failed to fetch categories:", error);
                setCategories([
                    { title: "Wedding Invitations", slug: "wedding-invitations", image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&auto=format&fit=crop&q=80" },
                    { title: "Housewarming Invitations", slug: "housewarming-invitations", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80" },
                    { title: "Birthday Invitations", slug: "birthday-invitations", image: "https://images.unsplash.com/photo-1464349172961-60fb65f28450?w=800&auto=format&fit=crop&q=80" },
                    { title: "Baby Shower Invitations", slug: "baby-shower-invitations", image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop&q=80" },
                    { title: "Engagement Invitations", slug: "engagement-invitations", image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&auto=format&fit=crop&q=80" },
                    { title: "Naming Ceremony", slug: "naming-ceremony", image: "https://images.unsplash.com/photo-1544126592-807daf21565b?w=800&auto=format&fit=crop&q=80" }
                ]);
            }
        };

        fetchCategories();
    }, []);

    return (
        <section className="py-28 relative overflow-hidden" id="categories" ref={ref} style={{
            background: 'linear-gradient(135deg, rgba(253, 230, 220, 0.3) 0%, rgba(217, 194, 240, 0.2) 50%, rgba(255, 248, 242, 0.5) 100%)'
        }}>
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 pointer-events-none" style={{
                background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)'
            }} />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block mb-6"
                    >
                        <span className="text-[#D4AF37] text-sm font-medium tracking-widest">OUR COLLECTIONS</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-serif text-[#4A2E2A] mb-6"
                    >
                        Invitation <span className="text-[#D4AF37]">Collections</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-700 text-lg font-light"
                    >
                        Discover our carefully curated gallery of elegant invitation designs for every celebration. Each collection is crafted with luxury and grace in mind.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.length === 0 ? (
                        <div className="col-span-full py-20 text-center text-gray-600 font-serif italic">Loading categories...</div>
                    ) : (
                        categories.map((cat, index) => (
                            <TiltCard key={cat._id || index} category={cat} index={index} inView={isInView} />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default Categories;
