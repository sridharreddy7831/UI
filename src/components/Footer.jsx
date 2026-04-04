"use client";
import React from "react";
import {
    Mail,
    Phone,
    MapPin,
    Facebook,
    Instagram,
    Twitter,
    Globe,
} from "lucide-react";
import { FooterBackgroundGradient, TextHoverEffect } from "./ui/hover-footer";

function HoverFooter() {
    // Footer link data
    const footerLinks = [
        {
            title: "Explore",
            links: [
                { label: "Home", href: "/#home" },
                { label: "About Us", href: "/#about" },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Testimonials", href: "/testimonials" },
                { label: "Contact Us", href: "/#contact" },
            ],
        },
        {
            title: "Collections",
            links: [
                { label: "Wedding", href: "/collections/wedding-invitations" },
                { label: "Engagement", href: "/collections/engagement-invitations" },
                { label: "Housewarming", href: "/collections/housewarming-invitations" },
                { label: "Baby Shower", href: "/collections/baby-shower-invitations" },
                { label: "Birthday", href: "/collections/birthday-invitations" },
            ],
        },
    ];

    // Contact info data
    const contactInfo = [
        {
            icon: <Mail size={18} className="text-[#D4AF37]" />,
            text: "uthsavinvites@gmail.com",
            href: "mailto:uthsavinvites@gmail.com",
        },
        {
            icon: <Phone size={18} className="text-[#D4AF37]" />,
            text: "+91 7386376302",
            href: "tel:+917386376302",
        },
        {
            icon: <MapPin size={18} className="text-[#D4AF37]" />,
            text: "Andhra Pradesh, India",
        },
    ];

    // Social media icons
    const socialLinks = [
        { icon: <Facebook size={20} />, label: "Facebook", href: "#" },
        { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
        { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
        { icon: <Globe size={20} />, label: "Website", href: "https://uthsavinvites.in" },
    ];

    return (
        <footer className="bg-[#0F0F11]/10 relative h-fit rounded-3xl overflow-hidden m-8">
            <div className="max-w-7xl mx-auto p-14 z-40 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
                    {/* Brand section */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-[#D4AF37] text-3xl font-extrabold">
                                &hearts;
                            </span>
                            <span className="text-white text-3xl font-bold">Uthsav</span>
                        </div>
                        <p className="text-sm leading-relaxed">
                            Celebrate Life's Sacred Moments. Crafting premium digital experiences for life's most precious occasions with grace and elegance.
                        </p>
                    </div>

                    {/* Footer link sections */}
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-white text-lg font-semibold mb-6">
                                {section.title}
                            </h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label} className="relative">
                                        <a
                                            href={link.href}
                                            className="hover:text-[#D4AF37] transition-colors"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact section */}
                    <div>
                        <h4 className="text-white text-lg font-semibold mb-6">
                            Contact Us
                        </h4>
                        <ul className="space-y-4">
                            {contactInfo.map((item, i) => (
                                <li key={i} className="flex items-center space-x-3">
                                    {item.icon}
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            className="hover:text-[#D4AF37] transition-colors"
                                        >
                                            {item.text}
                                        </a>
                                    ) : (
                                        <span className="hover:text-[#D4AF37] transition-colors">
                                            {item.text}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>

            {/* Line + social icons + copyright — middle */}
            <div className="max-w-8xl mx-auto px-14 z-40 relative -mt-15">
                <hr className="border-t border-gray-700 mb-8" />

                <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
                    {/* Social icons */}
                    <div className="flex space-x-6 text-gray-400">
                        {socialLinks.map(({ icon, label, href }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                className="hover:text-[#D4AF37] transition-colors"
                            >
                                {icon}
                            </a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <p className="text-center md:text-left">
                        &copy; {new Date().getFullYear()} Uthsav Invitations. All rights reserved.
                    </p>
                </div>
            </div>

            {/* "Uthsav" animated text — bottom */}
            <div className="flex h-[12rem] sm:h-[16rem] md:h-[22rem] lg:h-[30rem] mt-2 -mb-6 sm:-mb-10 md:-mb-20 lg:-mb-36">
                <TextHoverEffect text="Uthsav" className="z-50" />
            </div>

            <FooterBackgroundGradient />
        </footer>
    );
}

export default HoverFooter;
