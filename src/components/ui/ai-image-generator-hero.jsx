import React, { useState, useEffect, useRef } from "react"
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
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const [isHovering, setIsHovering] = useState(false)
  const carouselRef = useRef(null)

  // Use requestAnimationFrame for 60fps butter-smooth rotation (No React state re-rendering!)
  useEffect(() => {
    let animationFrameId;
    let currentAngle = 0;
    const total = images.length;
    
    // Auto-update radius on resize
    const getRadius = () => typeof window !== 'undefined' && window.innerWidth < 1024 ? 120 : 170;

    const animate = () => {
      currentAngle += 0.2; // Speed of rotation
      if (currentAngle >= 360) currentAngle = 0;
      
      if (carouselRef.current) {
        const radius = getRadius();
        const cards = carouselRef.current.children;
        
        for (let i = 0; i < Math.min(cards.length, total); i++) {
          const card = cards[i];
          const offsetAngle = i * (360 / total);
          const finalAngle = (currentAngle + offsetAngle) * (Math.PI / 180);
          
          const x = Math.cos(finalAngle) * radius;
          const y = Math.sin(finalAngle) * radius;
          
          const baseRotation = card.getAttribute('data-rotation') || "0";
          card.style.transform = `translate(${x}px, ${y}px) rotateZ(${baseRotation}deg)`;
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [images.length])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden" id="about" style={{
      background: 'linear-gradient(135deg, rgba(253, 230, 220, 0.6) 0%, rgba(255, 248, 242, 0.8) 50%, rgba(217, 194, 240, 0.4) 100%)'
    }}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse" />
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
            <div 
              className="absolute inset-0 flex items-center justify-center p-4 transition-transform duration-200 ease-out" 
              style={{ 
                perspective: "1000px",
                transform: `rotateX(${(mousePosition.y - 0.5) * -15}deg) rotateY(${(mousePosition.x - 0.5) * 15}deg)`,
                transformStyle: "preserve-3d"
              }}
            >
              <div ref={carouselRef} className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
                {images.map((image) => (
                  <div
                    key={image.id}
                    data-rotation={image.rotation}
                    className="absolute w-28 h-36 sm:w-36 sm:h-44 lg:w-40 lg:h-48"
                    style={{ transformStyle: "preserve-3d", willChange: "transform" }}
                  >
                    <div
                      className={cn(
                        "relative w-full h-full rounded-2xl overflow-hidden shadow-2xl",
                        "transition-transform duration-300 hover:scale-110",
                        "cursor-pointer group",
                        "border border-[#D4AF37]/20"
                      )}
                      style={{ transformStyle: "preserve-3d" }}
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
                ))}
              </div>
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
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#4A2E2A] mb-6 leading-tight">
                {title}
              </h1>

              <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto lg:mx-0">
                {description}
              </p>

              {/* CTA Button */}
              <button
                onClick={onCtaClick}
                className={cn(
                  "inline-flex items-center gap-2 px-8 py-3 rounded-full",
                  "bg-[#D4AF37] text-white font-medium",
                  "hover:shadow-lg hover:shadow-[#D4AF37]/30 hover:scale-105 transition-all duration-300",
                  "active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-white",
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
                        "bg-white/50 backdrop-blur-sm border border-[#D4AF37]/20 shadow-lg",
                        "hover:bg-white/70 hover:border-[#D4AF37]/40 transition-all duration-300",
                        "group",
                        index === 2 ? "sm:col-span-2 lg:col-span-1" : "" // Handle layout gracefully if 3 items
                      )}
                    >
                      {Icon && (
                        <div className="w-10 h-10 mb-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-[#D4AF37] group-hover:text-white group-hover:border-transparent">
                          <Icon size={20} />
                        </div>
                      )}
                      <h3 className="text-base font-sans font-semibold text-[#4A2E2A] mb-2 group-hover:text-[#D4AF37] transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-700">{feature.description}</p>
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
