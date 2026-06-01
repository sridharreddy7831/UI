import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

const Counter = ({ value, duration = 1.5 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [count, setCount] = useState('0');

    useEffect(() => {
        if (!isInView) return;

        const num = parseInt(value.replace(/\D/g, ''), 10);
        if (isNaN(num)) {
            setCount(value);
            return;
        }

        let startTime = null;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / (duration * 1000), 1);
            
            // Cubic out ease for smooth deceleration
            const easeOutCubic = 1 - Math.pow(1 - percentage, 3);
            const currentCount = Math.floor(easeOutCubic * num);
            
            const suffix = value.includes('+') ? '+' : value.includes('%') ? '%' : '';
            setCount(`${currentCount}${suffix}`);

            if (percentage < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(value);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, value, duration]);

    return <span ref={ref} className="will-change-contents">{count}</span>;
};

export default Counter;
