"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "../../lib/utils"
import { Menu, X } from "lucide-react"

// Central Mascot Component - tailDirection allows 'down' (radial/mobile) or 'left' (desktop vertical)
// Custom scroll handler to prevent hashes in URL
// Custom scroll handler to prevent hashes in URL
const handleNavClick = (e, url, section, onItemClick) => {
    const isHomePage = window.location.pathname === '/' || window.location.pathname === '';
    const isHashLink = url.includes('#');

    if (isHomePage && isHashLink) {
        e.preventDefault();
        const element = document.getElementById(section);
        if (element) {
            const yOffset = -80;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
            
            // Re-update URL without hash
            window.history.pushState("", document.title, window.location.pathname);
        }
    }
    
    if (onItemClick) onItemClick();
};

function Mascot({ isActiveChild, tailDirection = "down" }) {
    return (
        <div className="relative w-8 h-8 z-[20000]">
            <motion.div
                className="absolute w-8 h-8 bg-white rounded-full left-1/2 -translate-x-1/2 shadow-[0_0_12px_rgba(212,175,55,0.5)] border border-[#D4AF37]/30"
                animate={isActiveChild ? { scale: [1, 1.1, 1], rotate: [0, -5, 5, 0], transition: { duration: 0.5 } } : { y: [0, -3, 0], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
            >
                {/* Eyes */}
                <div className="absolute w-1.5 h-1.5 bg-zinc-900 rounded-full" style={{ left: '25%', top: '38%' }} />
                <div className="absolute w-1.5 h-1.5 bg-zinc-900 rounded-full" style={{ right: '25%', top: '38%' }} />

                {/* Gold cheeks */}
                <div className="absolute w-1.5 h-1 bg-[#D4AF37]/70 rounded-full blur-[1px]" style={{ left: '10%', top: '56%' }} />
                <div className="absolute w-1.5 h-1 bg-[#D4AF37]/70 rounded-full blur-[1px]" style={{ right: '10%', top: '56%' }} />

                {/* Mouth */}
                <div className="absolute w-2.5 h-1 border-b-2 border-zinc-900 rounded-full" style={{ left: '30%', top: '60%' }} />

                <AnimatePresence>
                    {isActiveChild && (
                        <>
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                className="absolute -top-1 -right-1 text-[9px] text-[#D4AF37]"
                            >✨</motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ delay: 0.1 }}
                                className="absolute -top-2 left-0 text-[10px] text-[#D4AF37]"
                            >✨</motion.div>
                        </>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Diamond tail */}
            {tailDirection === "down" ? (
                <motion.div
                    className="absolute -bottom-1 left-1/2 w-2 h-2 -translate-x-1/2 bg-white rotate-45 border-r border-b border-[#D4AF37]/30"
                    animate={{ y: [0, 2, 0], transition: { duration: 1, repeat: Infinity, ease: "easeInOut" } }}
                />
            ) : (
                <motion.div
                    className="absolute top-1/2 -left-1 w-2 h-2 -translate-y-1/2 bg-white rotate-45 border-b border-l border-[#D4AF37]/30 z-[-1]"
                    animate={{ x: [0, 4, 0], transition: { duration: 1, repeat: Infinity, ease: "easeInOut" } }}
                />
            )}
        </div>
    );
}

function DesktopNavBar({ items, activeTab, setActiveTab, hoveredTab, setHoveredTab }) {
    return (
        <div className="fixed top-0 left-0 right-0 z-[9999] flex justify-end pr-6 pt-16 pointer-events-none">
            <motion.div
                className="flex items-center gap-1 bg-white/70 border border-[#D4AF37]/20 backdrop-blur-xl py-2 px-2 rounded-full shadow-xl font-sans pointer-events-auto"
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                {items.map((item) => {
                    const Icon = item.icon
                    const isActive = activeTab === item.name
                    const isHovered = hoveredTab === item.name

                    return (
                        <div key={item.name} className="relative">
                            {isActive && (
                                <motion.div
                                    layoutId="anime-mascot-desktop"
                                    className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none"
                                >
                                    <Mascot isActiveChild={true} tailDirection="down" />
                                </motion.div>
                            )}

                            <a
                                href={item.url}
                                onClick={(e) => handleNavClick(e, item.url, item.section, () => setActiveTab(item.name))}
                                onMouseEnter={() => setHoveredTab(item.name)}
                                onMouseLeave={() => setHoveredTab(null)}
                                className={cn(
                                    "relative cursor-pointer text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 flex items-center justify-center gap-2",
                                    "text-gray-700 hover:text-[#D4AF37]",
                                    isActive && "text-[#D4AF37]"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.03, 1] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <div className="absolute inset-0 bg-[#D4AF37]/25 rounded-full blur-md" />
                                        <div className="absolute inset-[-4px] bg-[#D4AF37]/15 rounded-full blur-xl" />
                                        <div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent"
                                            style={{ animation: "shine 3s ease-in-out infinite" }}
                                        />
                                    </motion.div>
                                )}

                                <Icon size={16} strokeWidth={isActive ? 2.5 : 1.8} />

                                <span className="hidden md:inline tracking-wide text-xs whitespace-nowrap">
                                    {item.name}
                                </span>

                                <AnimatePresence>
                                    {isHovered && !isActive && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            className="absolute inset-0 bg-white/8 rounded-full -z-10"
                                        />
                                    )}
                                </AnimatePresence>
                            </a>
                        </div>
                    )
                })}
            </motion.div>
        </div>
    )
}

function MobileRadialNavBar({ items, activeTab, setActiveTab, hoveredTab, setHoveredTab }) {
    const [isOpen, setIsOpen] = useState(false)
    const [angleOffset, setAngleOffset] = useState(0)

    useEffect(() => {
        if (!isOpen) return;

        let animationFrame;
        const animate = () => {
            setAngleOffset(prev => prev + 0.002);
            animationFrame = requestAnimationFrame(animate);
        };
        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [isOpen]);

    const radius = 120;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[10000] flex items-center justify-center pointer-events-none pb-4 lg:hidden">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                        {/* Dashed background circle */}
                        <div
                            className="absolute rounded-full border border-dashed border-[#D4AF37]/30"
                            style={{
                                width: `${radius * 2}px`,
                                height: `${radius * 2}px`,
                                top: `calc(50% - ${radius}px)`,
                                left: `calc(50% - ${radius}px)`,
                            }}
                        />

                        {items.map((item, index) => {
                            const angle = (index / items.length) * 2 * Math.PI + angleOffset;
                            const x = radius * Math.cos(angle);
                            const y = radius * Math.sin(angle);

                            const Icon = item.icon;
                            const isActive = activeTab === item.name;
                            const isHovered = hoveredTab === item.name;

                            return (
                                <motion.a
                                    key={item.name}
                                    href={item.url}
                                    onClick={(e) => handleNavClick(e, item.url, item.section, () => {
                                        setActiveTab(item.name);
                                        setIsOpen(false);
                                    })}
                                    onMouseEnter={() => setHoveredTab(item.name)}
                                    onMouseLeave={() => setHoveredTab(null)}
                                    className={cn(
                                        "absolute flex items-center justify-center w-12 h-12 rounded-full border shadow-[0_0_15px_rgba(0,0,0,0.5)] pointer-events-auto transition-colors duration-300",
                                        isActive ? "bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] border-white/40 text-zinc-950" : "bg-zinc-900 border-[#D4AF37]/30 text-zinc-400 hover:text-[#D4AF37] hover:bg-zinc-800 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                                    )}
                                    style={{
                                        transform: `translate(${x}px, ${y}px)`,
                                    }}
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />

                                    {isActive && (
                                        <motion.div
                                            className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            <div className="absolute inset-0 bg-[#D4AF37]/30 rounded-full blur-md" />
                                        </motion.div>
                                    )}

                                    {isActive && (
                                        <motion.div
                                            layoutId="anime-mascot-mobile"
                                            className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        >
                                            <Mascot isActiveChild={isHovered || isActive} tailDirection="down" />
                                        </motion.div>
                                    )}
                                </motion.a>
                            )
                        })}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "relative z-[20000] flex items-center justify-center w-16 h-16 rounded-full border shadow-[0_0_30px_rgba(212,175,55,0.4)] pointer-events-auto backdrop-blur-md transition-colors duration-500",
                    isOpen ? "bg-white border-white/40 text-zinc-950" : "bg-gradient-to-tr from-zinc-900 to-zinc-800 border-[#D4AF37]/50 text-[#D4AF37]"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {isOpen ? <X size={28} className="text-zinc-950 border-zinc-950" strokeWidth={2.5} /> : <Menu size={28} />}
                </motion.div>

                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            layoutId="anime-mascot-mobile"
                            className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none"
                            initial={false}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <Mascot isActiveChild={false} tailDirection="down" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            className="absolute -inset-1 rounded-full border border-[#D4AF37]/30 pointer-events-none -z-10"
                            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    )
}

export function AnimeNavBar({ items, className, defaultActive = "Home", externalActive }) {
    const [mounted, setMounted] = useState(false)
    const [activeTab, setActiveTab] = useState(defaultActive)
    const [hoveredTab, setHoveredTab] = useState(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (externalActive) setActiveTab(externalActive)
    }, [externalActive])

    if (!mounted) return null

    return (
        <React.Fragment>
            {/* Desktop View */}
            <div className="hidden lg:block z-[9999]">
                <DesktopNavBar
                    items={items}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    hoveredTab={hoveredTab}
                    setHoveredTab={setHoveredTab}
                />
            </div>

            {/* Mobile View */}
            <div className="block lg:hidden z-[9999]">
                <MobileRadialNavBar
                    items={items}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    hoveredTab={hoveredTab}
                    setHoveredTab={setHoveredTab}
                />
            </div>
        </React.Fragment>
    )
}
