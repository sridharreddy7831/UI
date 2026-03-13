import React from "react"
import { ImageCarouselHero } from "./ui/ai-image-generator-hero"
import { Sparkles, Palette, Clock } from "lucide-react"

export default function About() {
  const demoImages = [
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=900",
      alt: "Wedding couple in a picturesque setting",
      rotation: -15,
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=900",
      alt: "Wedding rings on a pillow",
      rotation: -8,
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1543881665-cd6bb17f3521?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=900",
      alt: "Beautiful floral arrangement at a reception",
      rotation: 5,
    },
    {
      id: "4",
      src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=900",
      alt: "Couple holding hands looking elegant",
      rotation: 12,
    },
    {
      id: "5",
      src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=900",
      alt: "Groomsmen looking sharp outdoors",
      rotation: -12,
    },
    {
      id: "6",
      src: "https://images.unsplash.com/photo-1550005809-91ad75fb315f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=900",
      alt: "Bridal bouquet with pale pink flowers",
      rotation: 8,
    },
    {
      id: "7",
      src: "https://images.unsplash.com/photo-1536717578496-ecf05244ddf1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=900",
      alt: "Event space with warm lighting",
      rotation: 18,
    },
    {
      id: "8",
      src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=900",
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
      title: "3D Visuals",
      description: "Premium typography, fluid animations, and luxurious finishes.",
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
        document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
      }}
      images={demoImages}
      features={demoFeatures}
    />
  )
}
