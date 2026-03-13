import React, { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "../../lib/utils"

export function ImageCarouselHero({
  title,
  subtitle,
  description,
  ctaText,
  onCtaClick,
  images,
  features = [],
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [rotatingCards, setRotatingCards] = useState([])

  // Continuous rotation animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingCards((prev) => prev.map((_, i) => (prev[i] + 0.5) % 360))
    }, 50)

    return () => clearInterval(interval)
  }, [])

  // Initialize rotating cards
  useEffect(() => {
    setRotatingCards(images.map((_, i) => i * (360 / images.length)))
  }, [images.length])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  return (
    <div className="relative w-full min-h-screen bg-zinc-950 overflow-hidden" id="about">
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">
          {/* Left Side: Carousel Container */}
          <div
            className="relative w-full h-[400px] sm:h-[450px] lg:h-[600px] order-2 lg:order-1 flex items-center justify-center"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Rotating Image Cards */}
            <div className="absolute inset-0 flex items-center justify-center p-4" style={{ perspective: "1000px" }}>
              {images.map((image, index) => {
                const angle = (rotatingCards[index] || 0) * (Math.PI / 180)
                const radius = typeof window !== 'undefined' && window.innerWidth < 1024 ? 120 : 170
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius

                // 3D perspective effect based on mouse position
                const perspectiveX = (mousePosition.x - 0.5) * 20
                const perspectiveY = (mousePosition.y - 0.5) * 20

                return (
                  <div
                    key={image.id}
                    className="absolute w-28 h-36 sm:w-36 sm:h-44 lg:w-40 lg:h-48 transition-all duration-300"
                    style={{
                      transform: `
                        translate(${x}px, ${y}px)
                        rotateX(${perspectiveY}deg)
                        rotateY(${perspectiveX}deg)
                        rotateZ(${image.rotation}deg)
                      `,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div
                      className={cn(
                        "relative w-full h-full rounded-2xl overflow-hidden shadow-2xl",
                        "transition-transform duration-300 hover:scale-110",
                        "cursor-pointer group",
                        "border border-white/10"
                      )}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <img
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        className="absolute inset-0 object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Side: Content & Features */}
          <div className="relative z-20 flex flex-col justify-center order-1 lg:order-2">
            {/* Content Section */}
            <div className="text-center lg:text-left mb-10">
              <h2 className="text-[#D4AF37] font-semibold tracking-widest uppercase text-sm mb-4 inline-flex items-center gap-2 justify-center lg:justify-start">
                <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
                {subtitle}
              </h2>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                {title}
              </h1>

              <p className="text-lg text-zinc-400 mb-8 max-w-xl mx-auto lg:mx-0">
                {description}
              </p>

              {/* CTA Button */}
              <button
                onClick={onCtaClick}
                className={cn(
                  "inline-flex items-center gap-2 px-8 py-3 rounded-full",
                  "bg-[#D4AF37] text-zinc-950 font-medium",
                  "hover:shadow-lg hover:shadow-[#D4AF37]/20 hover:scale-105 transition-all duration-300",
                  "active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-zinc-950",
                  "group"
                )}
              >
                {ctaText}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Features Section */}
            {features.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon || null;
                  return (
                    <div
                      key={index}
                      className={cn(
                        "p-6 rounded-xl text-left",
                        "bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg",
                        "hover:bg-white/10 hover:border-white/20 transition-all duration-300",
                        "group",
                        index === 2 ? "sm:col-span-2 lg:col-span-1" : "" // Handle layout gracefully if 3 items
                      )}
                    >
                      {Icon && (
                        <div className="w-10 h-10 mb-4 bg-white/5 border border-white/20 text-[#D4AF37] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-[#D4AF37] group-hover:text-zinc-900 group-hover:border-transparent">
                          <Icon size={20} />
                        </div>
                      )}
                      <h3 className="text-base font-sans font-semibold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-zinc-400">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
