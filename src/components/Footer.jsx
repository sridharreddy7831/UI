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
            text: "Hyderabad, India",
        },
    ];

    // Social media icons
    const socialLinks = [
        { icon: <Facebook size={20} />, label: "Facebook", href: "#" },
        { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
        { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
        { icon: <Globe size={20} />, label: "Globe", href: "#" },
    ];

    return (
        <footer className="relative overflow-hidden" style={{
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(201, 160, 220, 0.08) 50%, rgba(230, 183, 169, 0.08) 100%)'
        }}>
            {/* Decorative top border */}
            <div className="h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

            <div className="max-w-7xl mx-auto p-8 md:p-16 z-40 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 lg:gap-16 pb-8 lg:pb-12 text-center md:text-left">
                    {/* Brand section */}
                    <div className="flex flex-col items-center md:items-start space-y-4">
                        <p className="text-2xl font-serif font-bold tracking-widest text-[#D4AF37]">UTHSAV</p>
                        <p className="text-sm leading-relaxed text-gray-700 font-light">
                            Celebrate Life's Sacred Moments. Crafting premium digital experiences for life's most precious occasions with grace and elegance.
                        </p>
                    </div>

                    {/* Footer link sections */}
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-[#4A2E2A] text-lg font-serif font-semibold mb-6">
                                {section.title}
                            </h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label} className="relative">
                                        <a
                                            href={link.href}
                                            className="text-gray-700 hover:text-[#D4AF37] transition-all duration-300 font-light block hover:translate-x-1 transform"
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
                        <h4 className="text-[#4A2E2A] text-lg font-serif font-semibold mb-6">
                            Contact
                        </h4>
                        <ul className="space-y-4 text-gray-700 font-light">
                            {contactInfo.map((item, i) => (
                                <li key={i} className="flex items-center justify-center md:justify-start space-x-3">
                                    <span className="text-[#D4AF37]">{item.icon}</span>
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

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent my-8" />

                {/* Footer bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0 text-gray-600 font-light">
                    <p className="text-center md:text-left tracking-wide">
                        &copy; {new Date().getFullYear()} Uthsav Invitations. All rights reserved.
                    </p>

                    <div className="flex space-x-6 text-gray-700">
                        <a href="#" className="hover:text-[#D4AF37] transition-colors font-light">Privacy Policy</a>
                        <a href="#" className="hover:text-[#D4AF37] transition-colors font-light">Terms of Service</a>
                    </div>

                    {/* Social icons */}
                    <div className="flex space-x-6 text-gray-700">
                        {socialLinks.map(({ icon, label, href }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                className="hover:text-[#D4AF37] hover:scale-110 transition-all duration-300"
                            >
                                {icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Interactive Text hover effect */}
            <div className="w-full flex justify-center items-center h-[12rem] md:h-[18rem] lg:h-[24rem] -mt-10 md:-mt-20 lg:-mt-40 -mb-10 md:-mb-16 lg:-mb-20 overflow-hidden relative z-10 pointer-events-auto">
                <TextHoverEffect text="UTHSAV" className="w-full h-full min-w-[300px]" />
            </div>

            <FooterBackgroundGradient />
        </footer>
    );
}

export default HoverFooter;
