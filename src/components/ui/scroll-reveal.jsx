import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

// Variants library
const variants = {
    fadeUp: {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    },
    fadeDown: {
        hidden: { opacity: 0, y: -40 },
        visible: { opacity: 1, y: 0 },
    },
    fadeLeft: {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
    },
    fadeRight: {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
    },
    zoomIn: {
        hidden: { opacity: 0, scale: 0.85 },
        visible: { opacity: 1, scale: 1 },
    },
    flipUp: {
        hidden: { opacity: 0, rotateX: 20, y: 30 },
        visible: { opacity: 1, rotateX: 0, y: 0 },
    },
};

export const ScrollReveal = ({
    children,
    variant = 'fadeUp',
    delay = 0,
    duration = 0.7,
    once = true,
    className = '',
    threshold = 0.15,
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-60px', amount: threshold });

    return (
        <motion.div
            ref={ref}
            className={className}
            variants={variants[variant]}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{
                duration,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {children}
        </motion.div>
    );
};

// Staggered children reveal
export const StaggerReveal = ({
    children,
    staggerDelay = 0.12,
    containerDelay = 0,
    once = true,
    className = '',
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-60px' });

    const containerVariant = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: containerDelay,
                staggerChildren: staggerDelay,
            },
        },
    };

    const itemVariant = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
    };

    // Inject item variant into each child
    const wrappedChildren = React.Children.map(children, (child) =>
        child ? (
            <motion.div variants={itemVariant}>{child}</motion.div>
        ) : null
    );

    return (
        <motion.div
            ref={ref}
            className={className}
            variants={containerVariant}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
        >
            {wrappedChildren}
        </motion.div>
    );
};

export default ScrollReveal;
