import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft, ImageIcon, Loader2, Sparkles } from 'lucide-react';
import { getShowcasesByCategory, getCategoryBySlug } from '../lib/data';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { TravelCard } from '@/components/ui/card-7';

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
            <div className="min-h-screen bg-ivory flex flex-col items-center justify-center text-dark">
                <Loader2 size={48} className="animate-spin text-[#D4AF37] mb-4" />
                <p className="font-serif italic text-gray-500">Loading collection...</p>
            </div>
        );
    }

    if (!collection) {
        return (
            <div className="min-h-screen bg-ivory flex flex-col items-center justify-center text-dark">
                <h1 className="text-4xl font-serif mb-4">Collection Not Found</h1>
                <Link to="/" className="text-[#D4AF37] hover:underline flex items-center gap-2">
                    <ArrowLeft size={16} /> Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-ivory text-dark min-h-screen font-sans selection:bg-[#D4AF37] selection:text-ivory">
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
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/60 via-ivory/80 to-ivory" />
                
                <div className="container mx-auto px-6 relative z-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="text-[#D4AF37] text-xs md:text-sm uppercase tracking-[0.4em] font-medium mb-6 block">Our Creations</span>
                        <h1 className="text-5xl md:text-8xl font-serif text-dark mb-8 leading-[1.1]">
                            {collection.title.split(' ')[0]} <span className="text-[#D4AF37] italic">{collection.title.split(' ').slice(1).join(' ')}</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto font-light leading-relaxed font-serif italic">
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
                                    className="flex justify-center"
                                >
                                    <TravelCard
                                      imageUrl={site.image}
                                      siteUrl={site.link}
                                      imageAlt={site.name}
                                      logo={<Sparkles className="h-6 w-6 text-[#D4AF37]" />}
                                      title={site.name}
                                      location={collection?.title || "Digital Invitation"}
                                      overview={site.description}
                                      price="View"
                                      pricePeriod="Details"
                                      onBookNow={() => {
                                        if (site.link && site.link !== '#') {
                                            window.open(site.link, '_blank');
                                        } else {
                                            alert("This project is currently viewed inside the portal.");
                                        }
                                      }}
                                    />
                                </motion.div>
                            ))}
                            {!loading && showcases.length === 0 && (
                                <div className="col-span-full py-32 text-center flex flex-col items-center">
                                    <div className="w-20 h-20 rounded-full border border-dashed border-[#D4AF37]/30 flex items-center justify-center text-gray-400 mb-6 bg-white/50 shadow-sm">
                                        <ImageIcon size={32} />
                                    </div>
                                    <p className="font-serif italic text-gray-500 mb-2">Our latest {collection.title} are being polished.</p>
                                    <Link to="/#contact" className="text-[#D4AF37] text-xs uppercase tracking-widest font-bold hover:underline">Contact to start yours</Link>
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
