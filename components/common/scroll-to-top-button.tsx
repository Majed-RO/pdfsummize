'use client';

import { ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { MotionBtn } from './motion-wrapper';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const pricingRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Find the pricing section
    pricingRef.current = document.getElementById('pricing');

    if (!pricingRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Button visible if section is in view
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 } // Adjust sensitivity
    );

    observer.observe(pricingRef.current);

    return () => {
      if (pricingRef.current) observer.unobserve(pricingRef.current);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <MotionBtn
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 right-6 p-3 rounded-full bg-rose-500/70 text-white shadow-lg hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500/70 z-50"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-4 h-4 font-bold" strokeWidth={2} />
    </MotionBtn>
  );
}
