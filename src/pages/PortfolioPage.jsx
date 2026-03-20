import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import { getCategories } from '../lib/data';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PortfolioPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Portfolio | Uthsav Invitations';

        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (err) {
                console.error("Failed to load categories:", err);
                setCategories([]);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="bg-zinc-950 text-white min-h-screen font-sans">
            <Navbar />

            {/* Hero */}
            <section className="relative pt-40 pb-20 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl" />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 max-w-3xl mx-auto"
                >
                    <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-sm font-medium mb-4">Our Portfolio</p>
                    <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
                        All <span className="text-[#D4AF37] italic">Collections</span>
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-xl mx-auto">
                        Explore our carefully curated collections designed for every significant milestone in your life.
                    </p>
                </motion.div>
            </section>

            {/* Grid */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 size={40} className="animate-spin text-[#D4AF37]" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.filter(c => c.visible !== false).map((cat, i) => (
                            <motion.div
                                key={cat._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                            >
                                <Link
                                    to={`/collections/${cat.slug}`}
                                    className="group relative block h-96 rounded-3xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-500"
                                >
                                    {/* Background image */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{
                                            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(9,9,11,0.95)), url('${cat.image}')`
                                        }}
                                    />

                                    {/* Content */}
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                        <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-sans mb-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                            Bespoke Collection
                                        </p>
                                        <h3 className="text-2xl font-serif text-white mb-2">{cat.title}</h3>
                                        <div className="w-0 h-[2px] bg-[#D4AF37] transition-all duration-300 group-hover:w-16 mb-3 shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                                        <p className="text-zinc-400 text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                            {cat.subtitle || cat.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-[#D4AF37] text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                            View Collection <ArrowRight size={16} />
                                        </div>
                                    </div>

                                    {/* Shine overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
};

export default PortfolioPage;
