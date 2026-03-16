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
        <footer className="bg-white/5 relative h-fit rounded-[40px] overflow-hidden m-4 md:m-8 border border-white/10 backdrop-blur-xl shadow-2xl font-sans">
            <div className="max-w-7xl mx-auto p-8 md:p-14 z-40 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 lg:gap-16 pb-8 lg:pb-12 text-center md:text-left">
                    {/* Brand section */}
                    <div className="flex flex-col items-center md:items-start space-y-4 pt-4">
                        <p className="text-2xl font-serif font-black tracking-widest text-[#D4AF37]">UTHSAV</p>
                        <p className="text-sm leading-relaxed text-zinc-400">
                            Celebrate Life’s Sacred Moments. Crafting premium digital experiences for life's most precious occasions. Let us help you set the perfect tone for your celebration.
                        </p>
                    </div>

                    {/* Footer link sections */}
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-white text-lg font-serif mb-6">
                                {section.title}
                            </h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label} className="relative">
                                        <a
                                            href={link.href}
                                            className="text-zinc-400 hover:text-white transition-colors block hover:translate-x-1 transform duration-300"
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
                        <h4 className="text-white text-lg font-serif mb-6">
                            Contact Us
                        </h4>
                        <ul className="space-y-4 text-zinc-400">
                            {contactInfo.map((item, i) => (
                                <li key={i} className="flex items-center justify-center md:justify-start space-x-3">
                                    {item.icon}
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            className="hover:text-white transition-colors"
                                        >
                                            {item.text}
                                        </a>
                                    ) : (
                                        <span className="hover:text-white transition-colors">
                                            {item.text}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <hr className="border-t border-white/10 my-8" />

                {/* Footer bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0 text-zinc-500">

                    <p className="text-center md:text-left tracking-wide">
                        &copy; {new Date().getFullYear()} Uthsav Invitations. All rights reserved.
                    </p>

                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</a>
                    </div>

                    {/* Social icons */}
                    <div className="flex space-x-6 text-zinc-400">
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
