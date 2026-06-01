import React from "react"
import { ImageCarouselHero } from "./ui/ai-image-generator-hero"
import { Sparkles, Palette, Clock } from "lucide-react"

export default function About() {
  const demoImages = [
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=70&w=500&fm=webp",
      alt: "Wedding couple in a picturesque setting",
      rotation: -15,
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=70&w=500&fm=webp",
      alt: "Wedding rings on a pillow",
      rotation: -8,
    },
    {
      id: "4",
      src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=70&w=500&fm=webp",
      alt: "Couple holding hands looking elegant",
      rotation: 12,
    },
    {
      id: "5",
      src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=70&w=500&fm=webp",
      alt: "Groomsmen looking sharp outdoors",
      rotation: -12,
    },
    {
      id: "6",
      src: "https://images.unsplash.com/photo-1550005809-91ad75fb315f?auto=format&fit=crop&q=70&w=500&fm=webp",
      alt: "Bridal bouquet with pale pink flowers",
      rotation: 8,
    },
    {
      id: "8",
      src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=70&w=500&fm=webp",
      alt: "Groom placing ring on bride's finger",
      rotation: -18,
    },
  ]

  const demoFeatures = [
    {
      icon: Palette,
      title: "Custom Designs",
      description: "Tailored specifically to your theme, colors, and personal aesthetic.",
    },
    {
      icon: Sparkles,
      title: "Premium Quality",
      description: "Beautiful typography, fluid animations, and luxurious finishing touches.",
    },
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Quick turnaround without ever compromising on quality or detail.",
    },
  ]

  return (
    <ImageCarouselHero
      title="About Our Elegant Invitations"
      subtitle="Our Story"
      description="We create elegant digital invitations designed to make your celebrations memorable. From weddings and engagements to birthdays and housewarming ceremonies, our designs combine creativity, advanced 3D web technology, and modern aesthetics to set the perfect tone for your special day."
      ctaText="View Our Portfolio"
      onCtaClick={() => {
        const element = document.getElementById('portfolio') || document.getElementById('categories');
        if (element) {
            const yOffset = -80;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }}
      images={demoImages}
      features={demoFeatures}
    />
  )
}
