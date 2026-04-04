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
        <div className="min-h-screen" style={{ backgroundColor: '#FFF8F2', color: '#4A2E2A' }}>
            <Navbar />

            {/* Hero */}
            <section className="relative pt-40 pb-20 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(212, 175, 55, 0.08)' }} />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(217, 194, 240, 0.12)' }} />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 max-w-3xl mx-auto"
                >
                    <p className="uppercase tracking-[0.3em] text-sm font-medium mb-4" style={{ color: '#D4AF37', fontFamily: 'var(--font-sans)' }}>Our Portfolio</p>
                    <h1 className="text-5xl md:text-7xl mb-6 leading-tight" style={{ fontFamily: 'var(--font-serif)', color: '#4A2E2A' }}>
                        All <span className="italic" style={{ color: '#D4AF37' }}>Collections</span>
                    </h1>
                    <p className="text-lg max-w-xl mx-auto" style={{ color: '#6B5B5B', fontFamily: 'var(--font-sans)', fontWeight: 300 }}>
                        Explore our carefully curated collections designed for every significant milestone in your life.
                    </p>
                </motion.div>
            </section>

            {/* Grid */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 size={40} className="animate-spin" style={{ color: '#D4AF37' }} />
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
                                    className="group relative block h-96 rounded-3xl overflow-hidden transition-all duration-500"
                                    style={{
                                        border: '1.5px solid rgba(212, 175, 55, 0.2)',
                                        boxShadow: '0 10px 40px rgba(212, 175, 55, 0.08)',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
                                        e.currentTarget.style.boxShadow = '0 20px 60px rgba(212, 175, 55, 0.15)';
                                        e.currentTarget.style.transform = 'translateY(-8px)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.2)';
                                        e.currentTarget.style.boxShadow = '0 10px 40px rgba(212, 175, 55, 0.08)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    {/* Background image */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{
                                            backgroundImage: `linear-gradient(to bottom, rgba(255,248,242,0.05), rgba(74,46,42,0.85)), url('${cat.image}')`
                                        }}
                                    />

                                    {/* Content */}
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                        <p className="text-[10px] uppercase tracking-[0.3em] mb-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0"
                                            style={{ color: '#D4AF37', fontFamily: 'var(--font-sans)' }}>
                                            Bespoke Collection
                                        </p>
                                        <h3 className="text-2xl text-white mb-2" style={{ fontFamily: 'var(--font-serif)' }}>{cat.title}</h3>
                                        <div className="w-0 h-[2px] transition-all duration-300 group-hover:w-16 mb-3" style={{ backgroundColor: '#D4AF37', boxShadow: '0 0 10px rgba(212, 175, 55, 0.8)' }} />
                                        <p className="text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-sans)' }}>
                                            {cat.subtitle || cat.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0" style={{ color: '#D4AF37' }}>
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
