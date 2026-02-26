'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../contexts/CartContext';

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice, isOpen, closeCart } = useCart();

  const handleWhatsAppCheckout = () => {
    const message = encodeURIComponent(
      `Asalam-o-Alaikum, I want to checkout my cart. Total items: ${getTotalItems()}, Total amount: PKR ${getTotalPrice().toLocaleString()}. Please confirm availability.`
    );
    window.open(`https://wa.me/923120026897?text=${message}`, '_blank');
  };

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
            onClick={closeCart}
          />
          
          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="font-display text-2xl font-bold text-charcoal">
                  Shopping Cart ({getTotalItems()})
                </h2>
                <button
                  onClick={closeCart}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-charcoal" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Your cart is empty</p>
                    <Link
                      href="/products"
                      onClick={closeCart}
                      className="inline-block mt-4 px-6 py-3 bg-crimson text-white rounded-lg font-semibold uppercase tracking-widest hover:bg-crimson-dark transition-colors"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <motion.div
                        key={`${item.id}-${item.size || 'default'}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                      >
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.images[0] || 'https://placehold.co/600x800?text=Product'}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-display text-lg font-bold text-charcoal line-clamp-2">
                                {item.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                SKU: {item.sku}
                                {item.size && <span className="ml-2">Size: {item.size}</span>}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id, item.size)}
                              className="p-1 rounded-full hover:bg-red-100 transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                              PKR {item.price.toLocaleString()} × {item.quantity}
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))}
                                className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:border-crimson transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:border-crimson transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-gray-200 p-6 space-y-4">
                  {/* Summary */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-semibold">PKR {getTotalPrice().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="font-semibold text-green-600">FREE</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-crimson">PKR {getTotalPrice().toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Link
                      href="/checkout"
                      onClick={closeCart}
                      className="block w-full py-3 bg-crimson text-white rounded-lg font-semibold uppercase tracking-widest hover:bg-crimson-dark transition-colors text-center"
                    >
                      Proceed to Checkout
                    </Link>
                    
                    <button
                      onClick={handleWhatsAppCheckout}
                      className="w-full py-3 bg-green-500 text-white rounded-lg font-semibold uppercase tracking-widest hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                    >
                      Checkout via WhatsApp
                    </button>
                  </div>

                  {/* Trust Badges */}
                  <div className="flex items-center justify-center gap-4 pt-4">
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Secure Payment</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <div className="w-2 h-2 bg-crimson rounded-full"></div>
                      <span>Fast Delivery</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
