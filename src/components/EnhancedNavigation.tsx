'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ShoppingCart, Search, User, Menu, X, Heart, ChevronDown } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, isActive }) => (
  <Link href={href}>
    <span className={`relative px-1 py-2 font-montserrat text-sm tracking-widest transition-colors duration-300 group inline-block cursor-pointer ${
      isActive ? 'text-crimson font-semibold' : 'text-charcoal hover:text-crimson'
    }`}>
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 bg-crimson"
        initial={{ width: isActive ? '100%' : '0%' }}
        transition={{ duration: 0.3 }}
      />
    </span>
  </Link>
);

export default function EnhancedNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { name: 'Luxury Lawn', href: '/products?category=luxury-lawn' },
    { name: 'Organza', href: '/products?category=organza' },
    { name: 'Karandi', href: '/products?category=karandi' },
    { name: 'Silk', href: '/products?category=silk' },
    { name: 'Chiffon', href: '/products?category=chiffon' },
    { name: 'Premium', href: '/products?category=premium' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#FFDFB9] shadow-lg' : 'bg-[#FFDFB9]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link href="/" className="flex items-center gap-2 group">
                <span className="text-2xl text-crimson">✨</span>
                <h1 className="font-display text-xl font-bold text-charcoal group-hover:text-crimson transition-colors">
                  Elegance
                </h1>
              </Link>
            </motion.div>

            {/* Center Menu */}
            <div className="hidden lg:flex items-center gap-8">
              <NavLink href="/new-arrivals">New Arrivals</NavLink>
              <NavLink href="/products">Collection</NavLink>
              <NavLink href="/custom-print-lab">Custom Print Lab</NavLink>
              <NavLink href="/our-story">Our Story</NavLink>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="relative"
              >
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 md:w-64 px-4 py-2 rounded-full border border-crimson/20 bg-white/90 backdrop-blur-sm text-charcoal placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-crimson/50 focus:border-crimson transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </motion.div>

              {/* Wishlist Counter */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="relative"
              >
                <button className="relative p-2 rounded-full hover:bg-crimson/10 transition-colors">
                  <Heart className="w-5 h-5 text-crimson" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>
              </motion.div>

              {/* Cart Counter */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <button className="relative p-2 rounded-full hover:bg-crimson/10 transition-colors">
                  <ShoppingCart className="w-5 h-5 text-crimson" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-crimson text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
              </motion.div>

              {/* User Account */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <button className="p-2 rounded-full hover:bg-crimson/10 transition-colors">
                  <User className="w-5 h-5 text-crimson" />
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Categories Mega Menu */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: isCategoriesOpen ? 1 : 0, 
            y: isCategoriesOpen ? 0 : -20 
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute top-full left-1/2 -translate-x-1/2 bg-white border border-crimson/20 rounded-lg shadow-xl p-6 z-50"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={category.href}
                  className="group block p-4 rounded-lg border border-transparent hover:border-crimson hover:bg-crimson/5 transition-all"
                >
                  <h4 className="font-display text-sm font-semibold text-charcoal group-hover:text-crimson transition-colors">
                    {category.name}
                  </h4>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#FFDFB9] shadow-lg' : 'bg-[#FFDFB9]'
        }`}
      >
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Mobile Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl text-crimson">✨</span>
              <h1 className="font-display text-lg font-bold text-charcoal">
                Elegance
              </h1>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-crimson/10 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-crimson" />
              ) : (
                <Menu className="w-6 h-6 text-crimson" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="mt-4 bg-white rounded-lg shadow-lg p-4"
              >
                <div className="space-y-4">
                  <Link href="/new-arrivals" className="block py-2 text-charcoal hover:text-crimson transition-colors">
                    New Arrivals
                  </Link>
                  <Link href="/products" className="block py-2 text-charcoal hover:text-crimson transition-colors">
                    Collection
                  </Link>
                  <Link href="/custom-print-lab" className="block py-2 text-charcoal hover:text-crimson transition-colors">
                    Custom Print Lab
                  </Link>
                  <Link href="/our-story" className="block py-2 text-charcoal hover:text-crimson transition-colors">
                    Our Story
                  </Link>
                  
                  {/* Mobile Categories */}
                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                      className="flex items-center justify-between w-full py-2 text-charcoal hover:text-crimson transition-colors"
                    >
                      <span className="font-semibold">Browse Categories</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isCategoriesOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="mt-2 space-y-2"
                        >
                          {categories.map((category) => (
                            <Link
                              key={category.name}
                              href={category.href}
                              className="block py-2 pl-4 text-charcoal hover:text-crimson transition-colors"
                            >
                              {category.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
}
