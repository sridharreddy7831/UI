import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const TravelCard = React.forwardRef(
  (
    {
      className,
      imageUrl,
      siteUrl,
      imageAlt,
      logo,
      title,
      location,
      overview,
      price,
      pricePeriod,
      onBookNow,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative w-full h-[500px] overflow-hidden rounded-[2.5rem] border border-[#D4AF37]/20 bg-ivory shadow-[0_10px_40px_rgba(212,175,55,0.08)]",
          "transition-all duration-700 ease-in-out hover:shadow-[0_20px_60px_rgba(212,175,55,0.2)] hover:-translate-y-2 hover:border-[#D4AF37]/50",
          className
        )}
        {...props}
      >
        {siteUrl && siteUrl !== '#' && siteUrl !== '' ? (
          <div className="absolute inset-0 h-full w-full overflow-hidden">
             {/* The iframe serves the live website */}
             <iframe
                src={siteUrl}
                title={title}
                className="w-full h-full border-none"
             />
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
          />
        )}

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#2d1b19] via-[#2d1b19]/70 to-transparent transition-opacity duration-500 opacity-80 group-hover:opacity-95"></div>

        <div className="relative flex h-full flex-col justify-between p-8 text-white pointer-events-none">
          <div className="flex h-40 items-start">
             {logo && (
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-[#2d1b19]/60 backdrop-blur-md shadow-sm pointer-events-none">
                   {logo}
                </div>
             )}
          </div>
          
          <div className="space-y-3 transition-transform duration-700 ease-in-out group-hover:-translate-y-20">
            <div>
              <h3 className="text-3xl font-serif text-white group-hover:text-[#D4AF37] transition-colors">{title}</h3>
              <p className="text-sm font-sans text-white/70 mt-1">{location}</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#D4AF37] text-xs tracking-[0.2em] uppercase mt-2">OVERVIEW</h4>
              <p className="text-sm text-white/80 leading-relaxed line-clamp-2 mt-1 font-sans">
                {overview}
              </p>
            </div>
          </div>

          <div className="absolute -bottom-24 left-0 w-full px-8 pb-8 opacity-0 transition-all duration-700 ease-in-out group-hover:bottom-0 group-hover:opacity-100 pointer-events-none">
            <div className="flex items-end justify-between border-t border-[#D4AF37]/30 pt-4 mt-2">
              <div className="pointer-events-none">
                <span className="text-3xl font-serif font-bold text-white">{price}</span>
                <span className="text-[#D4AF37] font-bold text-sm tracking-widest uppercase"> {pricePeriod}</span>
              </div>
              <Button onClick={(e) => { e.preventDefault(); onBookNow(); }} size="lg" className="pointer-events-auto bg-[#D4AF37] text-[#2d1b19] font-bold hover:bg-[#B68A2E] hover:text-white shadow-[0_8px_25px_rgba(212,175,55,0.3)] rounded-xl group/btn min-w-[140px] border-none transition-all">
                View Full <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
TravelCard.displayName = "TravelCard";

export { TravelCard };
