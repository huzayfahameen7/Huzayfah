'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, Heart, Shuffle, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  onWishlist?: (product: Product) => void;
  onCompare?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView, onWishlist, onCompare }: ProductCardProps) {
  const { addItem, openCart } = useCart();
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const [isCompared, setIsCompared] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [rating] = React.useState(4.5);

  const getDynamicPrice = () => {
    if (product.fabric?.toLowerCase().includes('black') || product.name?.toLowerCase().includes('black')) {
      return 5500;
    }
    return 4000;
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    openCart();
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    if (onWishlist) {
      onWishlist(product);
    }
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCompared(!isCompared);
    if (onCompare) {
      onCompare(product);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-crimson text-crimson" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-crimson/50 text-crimson" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      whileHover={{ y: -5 }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-crimson hover:shadow-2xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="relative w-full h-full"
          >
            <Image
              src={product.images[0] || '/images/patterns/vintage-floral.svg'}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              unoptimized
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/600x800?text=Elegance+By+Mahnoor';
              }}
            />
          </motion.div>

          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="px-3 py-1 bg-crimson text-white text-xs font-bold rounded-full uppercase tracking-widest"
              >
                New
              </motion.span>
            )}
            {product.isHot && (
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full uppercase tracking-widest"
              >
                Hot
              </motion.span>
            )}
            {product.discount && product.discount > 0 && (
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full uppercase tracking-widest"
              >
                -{product.discount}%
              </motion.span>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute inset-0 bg-black/40 flex items-center justify-center"
          >
            <div className="flex gap-3">
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: isHovered ? 1 : 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleQuickView}
                className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-crimson hover:text-white transition-colors"
              >
                <Eye className="w-5 h-5" />
              </motion.button>
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: isHovered ? 1 : 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWishlist}
                className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-crimson hover:text-white transition-colors"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </motion.button>
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: isHovered ? 1 : 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCompare}
                className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-crimson hover:text-white transition-colors"
              >
                <Shuffle className={`w-5 h-5 ${isCompared ? 'fill-current' : ''}`} />
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="p-4 bg-white">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="font-display text-lg font-bold text-charcoal mb-2 line-clamp-2 group-hover:text-crimson transition-colors"
          >
            {product.name}
          </motion.h3>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-1 mb-2"
          >
            {renderStars(rating)}
            <span className="text-xs text-gray-600 ml-1">({rating})</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-sm text-gray-600 mb-3 line-clamp-2"
          >
            {product.shortDescription}
          </motion.p>

          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col"
            >
              <span className="font-display text-xl font-bold text-charcoal">
                PKR {getDynamicPrice().toLocaleString()}
              </span>
              {product.discount && product.discount > 0 && (
                <span className="text-sm text-gray-500 line-through">
                  PKR {Math.round(getDynamicPrice() / (1 - product.discount / 100)).toLocaleString()}
                </span>
              )}
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="w-12 h-12 bg-crimson text-white rounded-full flex items-center justify-center shadow-lg hover:bg-crimson-dark transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
