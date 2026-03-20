import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft, ImageIcon, Loader2 } from 'lucide-react';
import { getShowcasesByCategory, getCategoryBySlug } from '../lib/data';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CollectionPage = () => {
    const { slug } = useParams();
    const [collection, setCollection] = useState(null);
    const [showcases, setShowcases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchAll = async () => {
            setLoading(true);
            try {
                const [catData, itemsData] = await Promise.all([
                    getCategoryBySlug(slug),
                    getShowcasesByCategory(slug)
                ]);
                setCollection(catData);
                setShowcases(itemsData);

                // Dynamic SEO
                if (catData) {
                    document.title = `${catData.title} | Uthsav Invitations`;
                    const meta = document.querySelector('meta[name="description"]');
                    if (meta) meta.setAttribute('content', catData.description || catData.subtitle || '');
                }
            } catch (err) {
                console.error('Failed to fetch collection data:', err);
                setCollection(null);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white">
                <Loader2 size={48} className="animate-spin text-[#D4AF37] mb-4" />
                <p className="font-serif italic text-zinc-500">Loading collection...</p>
            </div>
        );
    }

    if (!collection) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white">
                <h1 className="text-4xl font-serif mb-4">Collection Not Found</h1>
                <Link to="/" className="text-[#D4AF37] hover:underline flex items-center gap-2">
                    <ArrowLeft size={16} /> Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-zinc-950 text-white min-h-screen font-sans selection:bg-[#D4AF37] selection:text-zinc-900">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <motion.div 
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.4 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${collection.heroImage})` }}
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-zinc-950/60 via-zinc-950/40 to-zinc-950" />
                
                <div className="container mx-auto px-6 relative z-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="text-[#D4AF37] text-xs md:text-sm uppercase tracking-[0.4em] font-medium mb-6 block">Our Creations</span>
                        <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-[1.1]">
                            {collection.title.split(' ')[0]} <span className="text-[#D4AF37] italic">{collection.title.split(' ').slice(1).join(' ')}</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed font-serif italic">
                            {collection.subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Created Websites List (Dynamic from DB) */}
            <section className="py-24 bg-transparent">
                <div className="container mx-auto px-6">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 grayscale opacity-50">
                            <Loader2 size={48} className="animate-spin text-[#D4AF37] mb-4" />
                            <p className="font-serif italic text-zinc-500">Curating the portfolio...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                            {showcases.map((site, i) => (
                                <motion.div 
                                    key={site._id || i}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.8 }}
                                    className="group relative"
                                >
                                    <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden relative border border-white/5 bg-zinc-900 shadow-2xl transition-all duration-700 group-hover:border-[#D4AF37]/30 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
                                        <img 
                                            src={site.image} 
                                            alt={site.name} 
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />
                                        
                                        <div className="absolute bottom-10 left-10 right-10">
                                            <h3 className="text-3xl md:text-4xl font-serif text-white mb-3 group-hover:text-[#D4AF37] transition-colors">{site.name}</h3>
                                            <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-6 line-clamp-2 max-w-xl">{site.description}</p>
                                            
                                            {site.link && site.link !== '#' && (
                                                <a 
                                                    href={site.link} 
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-3 text-[#D4AF37] text-sm font-bold uppercase tracking-[0.2em] group/btn transition-all hover:gap-5"
                                                >
                                                    View Live Site <ChevronRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {!loading && showcases.length === 0 && (
                                <div className="col-span-full py-32 text-center flex flex-col items-center">
                                    <div className="w-20 h-20 rounded-full border border-dashed border-white/10 flex items-center justify-center text-zinc-700 mb-6">
                                        <ImageIcon size={32} />
                                    </div>
                                    <p className="font-serif italic text-zinc-500 mb-2">Our latest {collection.title} are being polished.</p>
                                    <Link to="/#contact" className="text-[#D4AF37] text-xs uppercase tracking-widest hover:underline">Contact to start yours</Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default CollectionPage;
