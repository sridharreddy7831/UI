import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AnimeNavBar } from './ui/anime-navbar';
import { Home, Info, Grid, Scale, Briefcase, Mail, CreditCard } from 'lucide-react';

const navItems = [
    { name: "Home", url: "/#home", icon: Home, section: "home" },
    { name: "About", url: "/#about", icon: Info, section: "about" },
    { name: "Collections", url: "/#categories", icon: Grid, section: "categories" },
    { name: "Compare", url: "/#comparison", icon: Scale, section: "comparison" },
    { name: "Pricing", url: "/#pricing", icon: CreditCard, section: "pricing" },
    { name: "Process", url: "/#how-it-works", icon: Briefcase, section: "how-it-works" },
    { name: "Contact", url: "/#contact", icon: Mail, section: "contact" },
];

const Navbar = () => {
    const [activeSection, setActiveSection] = useState("Home");

    useEffect(() => {
        // Intersection Observer for scroll spy
        const sectionIds = navItems.map(i => i.section);

        const observer = new IntersectionObserver(
            (entries) => {
                // Find the entry with the highest intersection ratio that is intersecting
                const visible = entries
                    .filter(e => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (visible.length > 0) {
                    const id = visible[0].target.id;
                    const matched = navItems.find(i => i.section === id);
                    if (matched) setActiveSection(matched.name);
                }
            },
            {
                threshold: [0.2, 0.4, 0.6],
                rootMargin: "-80px 0px -30% 0px",
            }
        );

        sectionIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        // Clean up hash on mount for a tidy URL
        if (window.location.hash) {
            setTimeout(() => {
                window.history.replaceState("", document.title, window.location.pathname);
            }, 1500); // Wait for potential scroll animations
        }

        return () => observer.disconnect();
    }, []);

    return (
        <>
            {/* Brand floating logo & Name – top left */}
            <div className="fixed top-4 left-4 lg:left-6 z-[10000] block pointer-events-none">
                <a href="/#home" className="group flex items-center gap-2 pointer-events-auto">
                    <img
                        src="/logo.png"
                        alt="Uthsav Invitations"
                        className="h-14 lg:h-20 w-auto object-contain drop-shadow-[0_0_10px_rgba(212,175,55,0.3)] group-hover:drop-shadow-[0_0_16px_rgba(212,175,55,0.6)] transition-all duration-300"
                    />
                    <div className="flex flex-col">
                        <div className="flex overflow-hidden">
                            {"UTHSAV".split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ y: "100%" }}
                                    animate={activeSection.toLowerCase() === "home" ? { y: 0 } : { y: "100%" }}
                                    transition={{
                                        duration: 0.5,
                                        delay: i * 0.05,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                    className="text-xl lg:text-3xl font-serif font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37] bg-[length:200%_auto] animate-[shine_5s_linear_infinite]"
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </div>
                        <span className="hidden md:block text-[8px] uppercase tracking-[0.3em] font-sans text-white/40 group-hover:text-[#D4AF37]/70 transition-colors duration-300">
                            Invitations
                        </span>
                    </div>
                </a>
            </div>

            {/* AnimeNavBar – now passed activeSection from scroll spy */}
            <AnimeNavBar
                items={navItems}
                defaultActive="Home"
                externalActive={activeSection}
            />
        </>
    );
};

export default Navbar;
