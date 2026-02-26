'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addItem, items, openCart } = useCart();
  const [selectedSize, setSelectedSize] = React.useState('M');
  const [quantity, setQuantity] = React.useState(1);

  const getDynamicPrice = () => {
    if (product.fabric?.toLowerCase().includes('black') || product.name?.toLowerCase().includes('black')) {
      return 5500;
    }
    return 4000;
  };

  const handleAddToCart = () => {
    const itemToAdd = {
      ...product,
      quantity,
      size: selectedSize,
      price: getDynamicPrice()
    };
    addItem(itemToAdd);
    openCart();
    onClose();
  };

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Asalam-o-Alaikum, I want to order ${product.name} (SKU: ${product.sku}). Size: ${selectedSize}, Quantity: ${quantity}. Is it available?`
    );
    window.open(`https://wa.me/923120026897?text=${message}`, '_blank');
  };

  const isInCart = items.some(item => item.id === product.id && item.size === selectedSize);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="font-display text-2xl font-bold text-charcoal">
                  Quick View
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-charcoal" />
                </button>
              </div>

              <div className="flex flex-col lg:flex-row">
                {/* Product Image - Left */}
                <div className="lg:w-1/2 p-6">
                  <div className="relative aspect-[3/4] bg-gray-50 rounded-xl overflow-hidden">
                    <Image
                      src={product.images[0] || 'https://placehold.co/600x800?text=Premium+Collection'}
                      alt={product.name}
                      fill
                      className="object-cover"
                      unoptimized
                      onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/600x800?text=Elegance+By+Mahnoor';
                      }}
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isNew && (
                        <span className="px-3 py-1 bg-crimson text-white text-xs font-bold rounded-full uppercase tracking-widest">
                          New
                        </span>
                      )}
                      {product.isHot && (
                        <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full uppercase tracking-widest">
                          Hot
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Product Details - Right */}
                <div className="lg:w-1/2 p-6">
                  <div className="space-y-6">
                    {/* Product Title */}
                    <div>
                      <h3 className="font-display text-2xl font-bold text-charcoal mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        SKU: {product.sku}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-3">
                      <span className="font-display text-3xl font-bold text-crimson">
                        PKR {getDynamicPrice().toLocaleString()}
                      </span>
                      {product.discount && product.discount > 0 && (
                        <span className="text-lg text-gray-500 line-through">
                          PKR {Math.round(getDynamicPrice() / (1 - product.discount / 100)).toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <h4 className="font-semibold text-charcoal mb-2">Description</h4>
                      <p className="text-gray-600 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Fabric Details */}
                    <div>
                      <h4 className="font-semibold text-charcoal mb-2">Fabric Details</h4>
                      <div className="space-y-1">
                        <p className="text-gray-600">
                          <span className="font-medium">Fabric:</span> {product.fabric}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Category:</span> {product.category}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Print Type:</span> {product.blockPrintType}
                        </p>
                        {product.customizable && (
                          <p className="text-crimson font-medium">
                            ✓ Customizable Design Available
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Size Selection */}
                    <div>
                      <h4 className="font-semibold text-charcoal mb-3">Select Size</h4>
                      <div className="flex gap-2">
                        {['S', 'M', 'L', 'XL'].map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                              selectedSize === size
                                ? 'border-crimson bg-crimson text-white'
                                : 'border-gray-300 hover:border-crimson text-charcoal'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quantity Selection */}
                    <div>
                      <h4 className="font-semibold text-charcoal mb-3">Quantity</h4>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:border-crimson transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-16 text-center font-semibold">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:border-crimson transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={handleAddToCart}
                        disabled={isInCart}
                        className={`w-full py-3 rounded-lg font-semibold uppercase tracking-widest transition-all ${
                          isInCart
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-crimson text-white hover:bg-crimson-dark'
                        }`}
                      >
                        {isInCart ? 'Already in Cart' : 'Add to Cart'}
                      </button>
                      
                      <button
                        onClick={handleWhatsAppOrder}
                        className="w-full py-3 bg-green-500 text-white rounded-lg font-semibold uppercase tracking-widest hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                      >
                        Order via WhatsApp
                      </button>
                    </div>

                    {/* Additional Info */}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>In Stock - Ready to Ship</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-crimson rounded-full"></div>
                        <span>Free Shipping on Orders Above PKR 5,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
