import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AnimeNavBar } from './ui/anime-navbar';
import { Home, Info, Grid, Star, Briefcase, Mail, CreditCard } from 'lucide-react';

const navItems = [
    { name: "Home", url: "/#home", icon: Home, section: "home" },
    { name: "About", url: "/#about", icon: Info, section: "about" },
    { name: "Portfolio", url: "/portfolio", icon: Grid, section: "" },
    { name: "Testimonials", url: "/testimonials", icon: Star, section: "" },
    { name: "Pricing", url: "/#pricing", icon: CreditCard, section: "pricing" },
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
