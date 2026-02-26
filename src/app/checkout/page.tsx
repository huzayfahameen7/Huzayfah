"use client";

import React, { useState } from 'react';
import Container from '@/components/Container';
import Button from '@/components/Button';
import { useCart } from '@/contexts/CartContext';

// Configuration - WhatsApp business number
const WHATSAPP_NUMBER = '923120026897';
const SECONDARY_CONTACT = '0345-3452593';

interface CheckoutFormData {
  fullName: string;
  phoneNumber: string;
  shippingAddress: string;
  city: string;
}

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    phoneNumber: '',
    shippingAddress: '',
    city: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Helper function to clean message (remove non-ASCII characters)
  const cleanMessage = (msg: string): string => {
    return msg.replace(/[^\x00-\x7F]/g, "").trim();
  };

  // Note: redirect now happens immediately on submit using window.location.replace()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateWhatsAppMessage = () => {
    let message = `*ELEGANCE BY MAHNOOR*\n`;
    message += `*Order Confirmation*\n\n`;
    
    message += `*Customer Details:*\n`;
    message += `Name: ${formData.fullName}\n`;
    message += `Phone: ${formData.phoneNumber}\n`;
    message += `Address: ${formData.shippingAddress}\n`;
    message += `City: ${formData.city}\n\n`;

    message += `*Order Items:*\n`;
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} x ${item.quantity}\n`;
      message += `   PKR ${(item.price * item.quantity).toLocaleString()}\n`;
      const c = item.selectedCustomization;
      if (c?.fabric) message += `   Fabric: ${c.fabric}\n`;
      if (c?.baseColor) message += `   Color: ${c.baseColor}\n`;
      if (c?.pattern) message += `   Pattern: ${c.pattern}\n`;
      if (c?.goldFoil) message += `   Finish: Gold Foil\n`;
      if (item.customizable && c?.print && !c?.pattern) {
        const printName = c.print.split('/').pop()?.replace('.svg', '').replace(/-/g, ' ') || 'Custom Print';
        message += `   Print: ${printName}\n`;
      }
    });

    const totalPrice = getTotalPrice();
    message += `\n*Total Amount: PKR ${totalPrice.toLocaleString()}*\n\n`;
    
    message += `*Order Instructions:*\n`;
    message += `Please verify the details and confirm to proceed with payment arrangements.\n`;
    message += `Shipping charges will be discussed and confirmed.\n\n`;
    
    message += `Thank you for shopping at Elegance by Mahnoor!\n`;
    message += `For any queries, contact us at: ${SECONDARY_CONTACT}\n`;
    message += `We appreciate your business!`;

    return message;
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName.trim() || !formData.phoneNumber.trim() || !formData.shippingAddress.trim() || !formData.city.trim()) {
      alert('Please fill in all fields');
      return;
    }

    if (items.length === 0) {
      alert('Your cart is empty. Please add items before checking out.');
      return;
    }

    setIsSubmitting(true);
    setShowSuccess(true);

    // Generate message, clean non-ASCII characters, then encode for URL
    const message = generateWhatsAppMessage();
    const cleanedMessage = cleanMessage(message);
    const encodedMessage = encodeURIComponent(cleanedMessage);

    // Create WhatsApp app URL with strict format for direct app redirection
    const whatsappAppUrl = `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;
    const webWhatsappUrl = `https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;

    // Try to open WhatsApp app first (replace so this page isn't left in history)
    window.location.replace(whatsappAppUrl);

    // Fallback to web WhatsApp after short delay if app doesn't open
    setTimeout(() => {
      window.location.replace(webWhatsappUrl);
      // Clear cart after fallback attempt
      clearCart();
      setIsSubmitting(false);
    }, 500);
  };

  const totalPrice = getTotalPrice();

  return (
    <div className="min-h-screen bg-ivory">
      {/* Success Message Banner */}
      {showSuccess && (
        <div className="fixed top-0 left-0 right-0 py-4 px-6 z-50 shadow-lg" style={{ backgroundColor: '#D4AF37', color: '#1A1A1A' }}>
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-semibold">Redirecting to WhatsApp...</p>
                <p className="text-sm opacity-90">Please send the pre-filled message to complete your order.</p>
              </div>
            </div>
            <button onClick={() => setShowSuccess(false)} className="rounded-lg p-2 transition-opacity hover:opacity-80" style={{ color: '#1A1A1A' }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <section className={`py-24 md:py-32 ${showSuccess ? 'mt-24' : ''}`}>
        <Container>
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Checkout</h1>
            <p className="text-lg text-gray-600">Complete your order and confirm via WhatsApp</p>
          </div>

          {items.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center py-16">
              <p className="text-lg text-gray-600 mb-6">Your cart is empty. Add items before checking out.</p>
              <Button href="/products" className="text-charcoal-900" style={{ backgroundColor: '#D4AF37' }}>
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {/* Checkout Form */}
              <div className="lg:col-span-2">
                <div className="rounded-xl p-8 border shadow-sm" style={{ backgroundColor: '#FFFFF0', borderColor: 'rgba(212,175,55,0.4)' }}>
                  <h2 className="text-2xl font-bold text-charcoal-900 mb-8 font-serif">Shipping Information</h2>

                  <form onSubmit={handleConfirmOrder} className="space-y-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-semibold text-charcoal-900 mb-2">Full Name *</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] border"
                        style={{ backgroundColor: '#FFFFF0', borderColor: 'rgba(26,26,26,0.2)' }}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-semibold text-charcoal-900 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="+92 300 1234567"
                        className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] border"
                        style={{ backgroundColor: '#FFFFF0', borderColor: 'rgba(26,26,26,0.2)' }}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="shippingAddress" className="block text-sm font-semibold text-charcoal-900 mb-2">Shipping Address *</label>
                      <input
                        type="text"
                        id="shippingAddress"
                        name="shippingAddress"
                        value={formData.shippingAddress}
                        onChange={handleInputChange}
                        placeholder="House #, Street, Area"
                        className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] border"
                        style={{ backgroundColor: '#FFFFF0', borderColor: 'rgba(26,26,26,0.2)' }}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-semibold text-charcoal-900 mb-2">City *</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Your city"
                        className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] border"
                        style={{ backgroundColor: '#FFFFF0', borderColor: 'rgba(26,26,26,0.2)' }}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl text-lg font-semibold uppercase tracking-wider transition-opacity disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-[#FFFFF0]"
                      style={{ backgroundColor: '#D4AF37', color: '#1A1A1A' }}
                    >
                      {isSubmitting ? 'Opening WhatsApp...' : 'Place Order'}
                    </button>
                  </form>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="rounded-xl p-8 border shadow-sm sticky top-24 relative overflow-hidden" style={{ backgroundColor: '#FFFFF0', borderColor: 'rgba(212,175,55,0.4)' }}>
                  {/* Bespoke Order watermark */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06]" style={{ color: '#D4AF37' }}>
                    <span className="font-serif text-6xl md:text-7xl font-bold tracking-widest uppercase transform -rotate-[-12deg]">Bespoke Order</span>
                  </div>
                  <div className="relative">
                    <h2 className="text-2xl font-bold text-charcoal-900 mb-6 font-serif">Order Summary</h2>

                    <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                      {items.map((item) => {
                        const c = item.selectedCustomization;
                        const hasBespoke = c?.fabric ?? c?.baseColor ?? c?.pattern ?? c?.goldFoil ?? c?.print;
                        return (
                          <div key={item.cartItemId} className="pb-4 border-b" style={{ borderColor: 'rgba(212,175,55,0.25)' }}>
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1">
                                <p className="font-semibold text-charcoal-900 font-serif">{item.name}</p>
                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                              </div>
                              <p className="font-semibold text-charcoal-900">PKR {(item.price * item.quantity).toLocaleString()}</p>
                            </div>
                            {hasBespoke && (
                              <div className="text-[11px] uppercase tracking-wider space-y-0.5 mt-2" style={{ color: '#4A4A4A' }}>
                                {c?.fabric && <p>Fabric: {c.fabric}</p>}
                                {c?.baseColor && <p>Color: {c.baseColor}</p>}
                                {c?.pattern && <p>Pattern: {c.pattern}</p>}
                                {c?.goldFoil === true && <p className="text-[#D4AF37] font-medium">✨ Luxury Finish</p>}
                                {c?.print && !c?.pattern && <p>Print: {c.print.split('/').pop()?.replace('.svg', '').replace(/-/g, ' ') ?? 'Custom'}</p>}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="border-t-2 pt-4" style={{ borderColor: 'rgba(212,175,55,0.4)' }}>
                      <div className="flex justify-between items-center mb-2 text-charcoal-900">
                        <span>Subtotal</span>
                        <span>PKR {totalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-lg font-bold text-charcoal-900">
                        <span>Total</span>
                        <span style={{ color: '#D4AF37' }}>PKR {totalPrice.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-4">Shipping charges will be confirmed via WhatsApp after order review.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
