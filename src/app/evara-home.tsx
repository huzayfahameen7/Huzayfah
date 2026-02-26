'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import EvaraProductCard from '@/components/EvaraProductCard';
import { Product } from '@/types';

// Sample featured products
const featuredProducts: Product[] = [
  {
    id: '1',
    sku: 'LL001',
    name: 'Luxury Lawn 3-Piece',
    shortDescription: 'Premium lawn with hand-block prints',
    price: 4000,
    description: 'Elegant luxury lawn fabric with traditional hand-block printed designs',
    fabric: 'White Lawn',
    images: ['/product-images/product-1.jpg'],
    category: 'Unstitched',
    blockPrintType: 'Traditional',
    customizable: true,
    isNew: true,
    isHot: false,
    discount: 0
  },
  {
    id: '2',
    sku: 'SL001',
    name: 'Pure Silk Pishwas',
    shortDescription: 'Luxurious silk with intricate patterns',
    price: 5500,
    description: 'Premium pure silk fabric with traditional hand-block printed designs',
    fabric: 'Black Silk',
    images: ['/product-images/product-2.jpg'],
    category: 'Premium',
    blockPrintType: 'Modern',
    customizable: true,
    isNew: false,
    isHot: true,
    discount: 10
  },
  {
    id: '3',
    sku: 'OR001',
    name: 'Organza Kaftan',
    shortDescription: 'Lightweight organza for summer',
    price: 4000,
    description: 'Lightweight organza fabric with traditional hand-block printed designs',
    fabric: 'White Organza',
    images: ['/product-images/product-3.jpg'],
    category: 'Premium',
    blockPrintType: 'Contemporary',
    customizable: true,
    isNew: false,
    isHot: false,
    discount: 0
  },
  {
    id: '4',
    sku: 'CH001',
    name: 'Chiffon Sari',
    shortDescription: 'Delicate chiffon with modern prints',
    price: 4000,
    description: 'Delicate chiffon fabric with traditional hand-block printed designs',
    fabric: 'White Chiffon',
    images: ['/product-images/product-4.jpg'],
    category: 'Premium',
    blockPrintType: 'Modern',
    customizable: true,
    isNew: true,
    isHot: false,
    discount: 0
  }
];

// Hero Slider Data
const heroSlides = [
  {
    id: 1,
    title: "Luxury Redefined",
    subtitle: "Discover our exclusive hand-block printed collection",
    image: "/product-images/hero-1.jpg",
    cta: "Shop Now",
    ctaLink: "/products"
  },
  {
    id: 2,
    title: "Timeless Elegance",
    subtitle: "Traditional craftsmanship meets modern design",
    image: "/product-images/hero-2.jpg",
    cta: "Explore Collection",
    ctaLink: "/products?filter=best"
  },
  {
    id: 3,
    title: "Custom Creations",
    subtitle: "Design your dream outfit with our bespoke service",
    image: "/product-images/hero-3.jpg",
    cta: "Start Designing",
    ctaLink: "/custom-print-lab"
  }
];

// Category Circle Data
const categories = [
  { name: '3-Piece', image: '/categories/3-piece.jpg', href: '/products?category=3-piece' },
  { name: 'Pishwas', image: '/categories/pishwas.jpg', href: '/products?category=pishwas' },
  { name: 'Sari', image: '/categories/sari.jpg', href: '/products?category=sari' },
  { name: 'Kaftan', image: '/categories/kaftan.jpg', href: '/products?category=kaftan' },
  { name: 'Co-ords', image: '/categories/co-ords.jpg', href: '/products?category=co-ords' },
  { name: 'Accessories', image: '/categories/accessories.jpg', href: '/products?category=accessories' }
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState('new-arrivals');
  const [isLoading, setIsLoading] = useState(false);

  // Auto-play hero slider
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const getTabProducts = () => {
    switch (activeTab) {
      case 'new-arrivals':
        return featuredProducts.filter(p => p.isNew);
      case 'best-sellers':
        return featuredProducts.filter(p => p.isHot);
      case 'featured':
        return featuredProducts.slice(0, 4);
      default:
        return featuredProducts;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFDFB9]">
      
      {/* Hero Slider */}
      <section className="relative h-[600px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl"
            >
              <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-xl text-white/90 mb-8">
                {heroSlides[currentSlide].subtitle}
              </p>
              <Link
                href={heroSlides[currentSlide].ctaLink}
                className="inline-flex items-center gap-3 bg-crimson text-white px-8 py-4 rounded-lg font-semibold uppercase tracking-widest hover:bg-crimson-dark transition-colors"
              >
                {heroSlides[currentSlide].cta}
                <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
          {/* Slide Indicators */}
          <div className="flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button
            onClick={nextSlide}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Category Circle Slider */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold text-charcoal mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our curated collection of luxury fabrics and designs
            </p>
          </motion.div>

          <div className="relative">
            {/* Gradient Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#FFDFB9] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#FFDFB9] to-transparent z-10 pointer-events-none" />

            {/* Category Slider */}
            <div className="flex gap-6 overflow-x-auto scrollbar-hide py-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex-shrink-0"
                >
                  <Link href={category.href}>
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg hover:border-crimson transition-colors">
                      <div className="relative w-full h-full bg-gray-200">
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    <p className="text-center mt-3 font-display text-lg font-semibold text-charcoal">
                      {category.name}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Tabs Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold text-charcoal mb-4">
              Discover Our Collections
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked favorites from our exclusive collections
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 rounded-lg p-1">
              {[
                { id: 'new-arrivals', label: 'New Arrivals' },
                { id: 'best-sellers', label: 'Best Sellers' },
                { id: 'featured', label: 'Featured' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-crimson text-white'
                      : 'text-gray-600 hover:text-crimson'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {getTabProducts().map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <EvaraProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 bg-crimson text-white px-8 py-4 rounded-lg font-semibold uppercase tracking-widest hover:bg-crimson-dark transition-colors"
            >
              View All Products
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Premium Quality',
                description: 'Handcrafted with attention to detail',
                icon: '✨'
              },
              {
                title: 'Fast Delivery',
                description: 'Express shipping worldwide',
                icon: '🚚'
              },
              {
                title: '24/7 Support',
                description: 'Dedicated customer service',
                icon: '💬'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-crimson/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  {feature.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-charcoal mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
