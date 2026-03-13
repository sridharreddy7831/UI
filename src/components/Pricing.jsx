import React from 'react';
import { CreativePricing } from "./ui/creative-pricing";
import { Sparkles, Star, Crown } from "lucide-react";

const sampleTiers = [
    {
        name: "Essential",
        icon: <Star className="w-6 h-6" />,
        price: "4,999",
        description: "Perfect for beautifully simple, elegant standard celebrations.",
        color: "amber",
        features: [
            "1-Page Digital Invitation",
            "3 Premium Template Options",
            "Basic Interactive Animations",
            "RSVP Link Integration",
            "Delivery within 3 Days",
        ],
    },
    {
        name: "Premium",
        icon: <Sparkles className="w-6 h-6" />,
        price: "9,999",
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
    },
    {
        name: "Royal Custom",
        icon: <Crown className="w-6 h-6" />,
        price: "24,999",
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
    },
];

function Pricing() {
    return <CreativePricing tiers={sampleTiers} />;
}

export default Pricing;
