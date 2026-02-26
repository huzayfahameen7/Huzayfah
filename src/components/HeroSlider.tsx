'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cta?: string;
  ctaLink?: string;
}

const slides: Slide[] = [
  {
    id: '1',
    title: 'Heritage Collection',
    subtitle: 'Discover timeless elegance with our hand-block printed masterpieces',
    image: '/product-images/hero-1.jpg',
    cta: 'Shop Now',
    ctaLink: '/products'
  },
  {
    id: '2',
    title: 'Luxury Lawn',
    subtitle: 'Premium fabrics crafted with traditional artistry',
    image: '/product-images/hero-1.jpg',
    cta: 'Explore',
    ctaLink: '/products?category=luxury-lawn'
  },
  {
    id: '3',
    title: 'Bespoke Designs',
    subtitle: 'Create your unique masterpiece in our Custom Print Lab',
    image: '/hero/hero-3.jpg',
    cta: 'Customize',
    ctaLink: '/custom-print-lab'
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlay(false);
  };

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                fill
                className="object-cover"
                priority
                unoptimized
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/1200x600?text=Elegance+By+Mahnoor';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
            </div>
            
            {/* Content */}
            <div className="relative h-full flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut', delay: 0.2 }}
                className="text-center text-white max-w-4xl mx-auto px-4"
              >
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut', delay: 0.3 }}
                  className="font-display text-4xl md:text-6xl font-bold mb-4"
                >
                  {slides[currentSlide].title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut', delay: 0.4 }}
                  className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
                {slides[currentSlide].cta && (
                  <motion.a
                    href={slides[currentSlide].ctaLink}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut', delay: 0.5 }}
                    className="inline-flex items-center gap-3 bg-[#A4193D] text-white px-8 py-4 rounded-full font-semibold uppercase tracking-widest hover:bg-[#8B1A1A] transition-colors"
                  >
                    {slides[currentSlide].cta}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4-4m4 4H3" />
                    </svg>
                  </motion.a>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeInOut', delay: 0.6 }}
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#A4193D] text-white rounded-full flex items-center justify-center hover:bg-[#8B1A1A] transition-colors z-20"
      >
        <ChevronLeft size={20} />
      </motion.button>
      
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeInOut', delay: 0.6 }}
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#A4193D] text-white rounded-full flex items-center justify-center hover:bg-[#8B1A1A] transition-colors z-20"
      >
        <ChevronRight size={20} />
      </motion.button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeInOut', delay: 0.7 + index * 0.1 }}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div 
        className="absolute bottom-6 right-6 text-white text-xs uppercase tracking-widest"
        onClick={() => setIsAutoPlay(!isAutoPlay)}
      >
        {isAutoPlay ? 'Pause' : 'Play'}
      </div>
    </section>
  );
}
