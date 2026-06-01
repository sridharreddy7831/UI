import React from 'react';
import { CreativePricing } from "./ui/creative-pricing";
import { Sparkles, Star, Crown } from "lucide-react";

const handleTierSelection = (tierName, price) => {
    const phoneNumber = "917386376302";
    const message = `Hello Uthsav Invitations! I am interested in creating a digital invitation using the ${tierName} Package (₹${price}).`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
};

const sampleTiers = [
    {
        name: "Essential",
        icon: <Star className="w-6 h-6" />,
        price: "999",
        description: "Perfect for beautifully simple, elegant standard celebrations.",
        color: "amber",
        features: [
            "1-Page Digital Invitation",
            "3 Premium Template Options",
            "Basic Interactive Animations",
            "RSVP Link Integration",
            "Delivery within 3 Days",
        ],
        onClick: () => handleTierSelection("Essential", "999")
    },
    {
        name: "Premium",
        icon: <Sparkles className="w-6 h-6" />,
        price: "1,499",
        description: "For beautifully bespoke celebrations that demand a unique touch.",
        color: "amber",
        features: [
            "Up to 3-Page Digital Scroll",
            "Custom 3D Elements & Float FX",
            "Curated Background Music",
            "Guest Analytics Dashboard",
            "2 Rounds of Revisions",
            "Priority 48-Hour Delivery",
        ],
        popular: true,
        onClick: () => handleTierSelection("Premium", "1,499")
    },
    {
        name: "Royal Custom",
        icon: <Crown className="w-6 h-6" />,
        price: "1,999",
        description: "The ultimate luxury cinematic experience crafted purely from scratch.",
        color: "amber",
        features: [
            "Fully Custom Multi-page Experience",
            "Complex 3D Interactive World",
            "Advanced Parallax & Scroll FX",
            "Custom Event Branding & Logos",
            "Unlimited Revisions",
            "Dedicated Support Manager",
        ],
        onClick: () => handleTierSelection("Royal Custom", "1,999")
    },
];

function Pricing() {
    return <CreativePricing tiers={sampleTiers} />;
}

export default Pricing;
