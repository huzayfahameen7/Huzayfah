'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Heart, ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useRouter } from 'next/navigation';
import MobileMenu from './MobileMenu';

interface NavItem {
  name: string;
  href: string;
  subItems?: { name: string; href: string; count?: number }[];
}

const Header: React.FC = () => {
  const router = useRouter();
  const { getTotalItems, openCart } = useCart();
  const { getItemCount } = useWishlist();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const cartCount = getTotalItems();
  const wishlistCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navItems: NavItem[] = [
    {
      name: 'Collections',
      href: '/products',
      subItems: [
        { name: '3-Piece', href: '/products?category=3-piece', count: 24 },
        { name: 'Pishwas', href: '/products?category=pishwas', count: 18 },
        { name: 'Sari', href: '/products?category=sari', count: 15 },
        { name: 'Kaftan', href: '/products?category=kaftan', count: 12 },
        { name: 'Co-ords', href: '/products?category=co-ords', count: 8 }
      ]
    },
    { name: 'New Arrivals', href: '/products?filter=new' },
    { name: 'Best Sellers', href: '/products?filter=best' },
    { name: 'Custom Lab', href: '/custom-lab' },
    { name: 'About', href: '/our-story' }
  ];

  return (
    <>
      {/* Announcement Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="bg-crimson text-white text-center py-2 text-xs font-bold tracking-widest uppercase"
      >
        Free Shipping on Orders Above PKR 5,000 | Use Code: ELEGANCE20
      </motion.div>

      {/* Main Navigation */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-xl border-b border-gray-200' 
          : 'bg-[#FFDFB9] border-b border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            
            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 -ml-2 text-charcoal"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Open Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center font-display text-2xl md:text-3xl font-black text-charcoal tracking-tight">
              ELEGANCE BY MAHNOOR
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.subItems ? (
                    <div onMouseEnter={() => setIsMegaMenuOpen(true)} onMouseLeave={() => setIsMegaMenuOpen(false)}>
                      <button className="flex items-center space-x-1 text-charcoal hover:text-crimson transition-all font-bold py-2 text-lg">
                        <span>{item.name}</span>
                        <ChevronDown className="w-5 h-5" />
                      </button>
                      <AnimatePresence>
                        {isMegaMenuOpen && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 w-96 bg-white rounded-2xl shadow-2xl border p-8 mt-2"
                          >
                            <div className="grid grid-cols-2 gap-4">
                              {item.subItems.map((subItem) => (
                                <Link key={subItem.name} href={subItem.href} className="block p-4 rounded-xl hover:bg-[#FFDFB9]/50 transition-all">
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-charcoal group-hover:text-crimson">{subItem.name}</span>
                                    {subItem.count && <span className="text-xs bg-crimson text-white px-2 py-1 rounded-full">{subItem.count}</span>}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link href={item.href} className="text-charcoal hover:text-crimson transition-all font-bold py-2 text-lg">
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4 md:space-x-6">
              
              {/* Search */}
              <div className="relative">
                <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-3 rounded-full hover:bg-gray-100">
                  <Search className="w-6 h-6 text-charcoal" />
                </button>
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute right-0 top-full mt-4 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border p-6">
                      <form onSubmit={handleSearch} className="space-y-4">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search for luxury fabrics..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson focus:border-crimson font-medium"
                          autoFocus
                        />
                        <button
                          type="submit"
                          className="w-full bg-crimson text-white py-3 rounded-xl font-bold hover:bg-crimson-dark transition-all duration-300"
                        >
                          Search
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Wishlist */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="relative"
              >
                <Link href="/wishlist" className="p-3 rounded-full hover:bg-gray-100 transition-all duration-300">
                  <Heart className="w-6 h-6 text-charcoal" />
                  {wishlistCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="absolute -top-1 -right-1 bg-crimson text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </Link>
              </motion.div>

              {/* Cart */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative"
              >
                <button onClick={openCart} className="p-3 rounded-full hover:bg-gray-100 transition-all duration-300">
                  <ShoppingCart className="w-6 h-6 text-charcoal" />
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="absolute -top-1 -right-1 bg-crimson text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};

export default Header;
