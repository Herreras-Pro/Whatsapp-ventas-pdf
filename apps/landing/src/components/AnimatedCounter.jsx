import React, { useState, useEffect, useRef } from 'react';

export default function AnimatedCounter({ end, duration = 2000, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const observerRef = useRef(null);
  const startTimeRef = useRef(null);
  const animationRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  // Helper to ease out the animation for a smoother stop
  const easeOutQuad = t => t * (2 - t);

  const animate = (timestamp) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const progress = timestamp - startTimeRef.current;
    
    let percentage = Math.min(progress / duration, 1);
    percentage = easeOutQuad(percentage);
    
    const currentCount = Math.floor(end * percentage);
    setCount(currentCount);

    if (progress < duration) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setCount(end); // Ensure exact final value
    }
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasAnimatedRef.current) {
        hasAnimatedRef.current = true;
        animationRef.current = requestAnimationFrame(animate);
      }
    }, { threshold: 0.1 }); // Start when 10% visible

    if (elementRef.current) {
      observerRef.current.observe(elementRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [end, duration]);

  // Format with commas if number is large (e.g. 1200 -> 1,200)
  const displayValue = count.toLocaleString('en-US');

  return (
    <span ref={elementRef}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}
