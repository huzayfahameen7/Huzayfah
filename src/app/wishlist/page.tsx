'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWishlist } from '@/contexts/WishlistContext';
import Link from 'next/link';
import { Heart, X } from 'lucide-react';

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist();
  const [isRemoving, setIsRemoving] = useState<string | null>(null);

  const handleRemove = (id: string) => {
    setIsRemoving(id);
    setTimeout(() => {
      removeItem(id);
      setIsRemoving(null);
    }, 500);
  };

  const handleClearAll = () => {
    clearWishlist();
  };

  return (
    <div className="min-h-screen bg-[#FFDFB9] py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl font-bold text-crimson mb-4">
            My Wishlist
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your saved luxury pieces and dream designs
          </p>
        </motion.div>

        {/* Wishlist Items */}
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="font-display text-xl text-gray-800 mb-2">
                Your Wishlist is Empty
              </h3>
              <p className="text-gray-600 mb-6">
                Start adding pieces to your wishlist to keep track of your favorite designs.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-crimson text-white px-6 py-3 rounded-lg font-semibold hover:bg-crimson-dark transition-colors"
              >
                Browse Collection
                <Heart className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:border-crimson hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10"
                    disabled={isRemoving === item.id}
                  >
                    {isRemoving === item.id ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin"></div>
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                  </button>

                  {/* Product Image */}
                  <div className="aspect-[3/4] bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="font-display text-lg font-bold text-gray-800 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-crimson">
                        PKR {item.price.toLocaleString()}
                      </span>
                      <Link
                        href={`/products/${item.id}`}
                        className="text-crimson hover:text-crimson-dark font-medium text-sm transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Clear All Button */}
        {items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mt-8"
          >
            <button
              onClick={handleClearAll}
              className="bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
            >
              Clear All Wishlist
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
