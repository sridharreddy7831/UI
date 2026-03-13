import * as React from "react"
import { cva } from "class-variance-authority"
import {
    motion,
    useMotionTemplate,
    useScroll,
    useTransform,
} from "motion/react"
import { cn } from "../../lib/utils"

const cardVariants = cva("absolute will-change-transform", {
    variants: {
        variant: {
            dark: "flex size-full flex-col items-center justify-center gap-6 rounded-2xl border border-white/10 bg-zinc-900/90 p-6 backdrop-blur-md",
            light: "flex size-full flex-col items-center justify-center gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md",
            gold: "flex size-full flex-col items-center justify-center gap-6 rounded-2xl border border-[#D4AF37]/30 bg-zinc-900/90 p-6 backdrop-blur-md",
        },
    },
    defaultVariants: {
        variant: "dark",
    },
})

const ContainerScrollContext = React.createContext(undefined)

function useContainerScrollContext() {
    const context = React.useContext(ContainerScrollContext)
    if (context === undefined) {
        throw new Error("useContainerScrollContext must be used within a ContainerScroll")
    }
    return context
}

export const ContainerScroll = ({ children, style, className, ...props }) => {
    const scrollRef = React.useRef(null)
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end end"],
    })

    return (
        <ContainerScrollContext.Provider value={{ scrollYProgress }}>
            <div
                ref={scrollRef}
                className={cn("relative min-h-svh w-full", className)}
                style={{ perspective: "1000px", ...style }}
                {...props}
            >
                {children}
            </div>
        </ContainerScrollContext.Provider>
    )
}
ContainerScroll.displayName = "ContainerScroll"

export const CardsContainer = ({ children, className, ...props }) => {
    const containerRef = React.useRef(null)
    return (
        <div
            ref={containerRef}
            className={cn("relative", className)}
            style={{ perspective: "1000px", ...props.style }}
            {...props}
        >
            {children}
        </div>
    )
}
CardsContainer.displayName = "CardsContainer"

export const CardTransformed = React.forwardRef((
    {
        arrayLength,
        index,
        incrementY = 10,
        incrementZ = 10,
        incrementRotation,
        className,
        variant,
        style,
        ...props
    },
    ref
) => {
    const actualRotation = incrementRotation !== undefined ? incrementRotation : ((index - 2) * -3)
    const { scrollYProgress } = useContainerScrollContext()

    // Divide the entire scroll length evenly among all cards
    const s = 1 / arrayLength;
    
    // Calculate the scroll checkpoints for THIS specific card
    // 0: Start of the entire container scroll
    // reachFront: When THIS card should be fully in front (0 offset, full size)
    // startPeel: When THIS card should begin flying off the screen upwards
    // endPeel: When THIS card should be completely off screen
    const reachFront = React.useMemo(() => Math.max(0.0001, index * s), [index, s]);
    const startPeel = React.useMemo(() => reachFront + (0.4 * s), [reachFront, s]);
    const endPeel = React.useMemo(() => Math.min(1, reachFront + (0.9 * s)), [reachFront, s]);

    // As we scroll towards reachFront, slide the card FORWARD in the stack
    const animatedOffset = useTransform(
        scrollYProgress, 
        [0, reachFront], 
        [index * 24, 0] // start 24px lower per depth index, slide to 0px (front)
    )

    const animatedScale = useTransform(
        scrollYProgress,
        [0, reachFront],
        [1 - (index * 0.06), 1] // start smaller in the background, scale to 1 (front)
    )

    // After sitting at the front for a bit, peel it completely upwards
    const yPeel = useTransform(
        scrollYProgress,
        [startPeel, endPeel],
        ["0%", "-150%"]
    )
    
    // Add extra rotation tilt when peeling off to make it look dynamic
    const rotate = useTransform(
        scrollYProgress,
        [startPeel, endPeel],
        [actualRotation, -15]
    )

    // Combine Y transforms to create the full 3D illusion movement
    const transform = useMotionTemplate`translateY(calc(${animatedOffset}px + ${yPeel})) rotate(${rotate}deg) scale(${animatedScale})`

    // Lower indices physically render ON TOP of higher indices
    const zIndex = arrayLength - index

    const cardStyle = {
        top: 0, 
        transform,
        backfaceVisibility: "hidden",
        zIndex,
        transformOrigin: "bottom center",
        ...style,
    }

    return (
        <motion.div
            layout="position"
            ref={ref}
            style={cardStyle}
            className={cn(cardVariants({ variant, className }))}
            {...props}
        />
    )
})
CardTransformed.displayName = "CardTransformed"

export const ReviewStars = React.forwardRef(({ rating, maxRating = 5, className, ...props }, ref) => {
    const filledStars = Math.floor(rating)
    const fractionalPart = rating - filledStars
    const emptyStars = maxRating - filledStars - (fractionalPart > 0 ? 1 : 0)

    return (
        <div className={cn("flex items-center gap-2", className)} ref={ref} {...props}>
            <div className="flex items-center">
                {[...Array(filledStars)].map((_, index) => (
                    <svg key={`filled-${index}`} className="size-4 text-inherit" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                    </svg>
                ))}
                {fractionalPart > 0 && (
                    <svg className="size-4 text-inherit" fill="currentColor" viewBox="0 0 20 20">
                        <defs>
                            <linearGradient id="half">
                                <stop offset={`${fractionalPart * 100}%`} stopColor="currentColor" />
                                <stop offset={`${fractionalPart * 100}%`} stopColor="rgb(63 63 70)" />
                            </linearGradient>
                        </defs>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" fill="url(#half)" />
                    </svg>
                )}
                {[...Array(emptyStars)].map((_, index) => (
                    <svg key={`empty-${index}`} className="size-4 text-zinc-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                    </svg>
                ))}
            </div>
            <p className="sr-only">{rating}</p>
        </div>
    )
})
ReviewStars.displayName = "ReviewStars"
