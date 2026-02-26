'use client';

import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Heading, Button } from '@/components';
import { getProductById } from '@/lib/products';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem, openCart } = useCart();
  const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923120026897';

  useEffect(() => {
    if (params.id) {
      const foundProduct = getProductById(params.id as string);
      if (foundProduct) {
        setProduct(foundProduct);
      }
      setIsLoading(false);
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ivory-50 flex items-center justify-center">
        <p className="text-charcoal-600">Loading...</p>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem(product);
    openCart();
  };

  const openLightbox = (index: number = 0) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!product?.images) return;
    const newIndex = direction === 'prev' 
      ? (currentImageIndex - 1 + product.images.length) % product.images.length
      : (currentImageIndex + 1) % product.images.length;
    setCurrentImageIndex(newIndex);
  };

  const whatsappMessage = encodeURIComponent(
    `Salam Elegance By Mahnoor, I am interested in ${product.name} (SKU: ${product.sku}). Please share price and delivery details.`
  );

  return (
    <div className="min-h-screen bg-ivory-50">
      <Container className="py-12">
        <div className="mb-6">
          <Link
            href="/products"
            className="inline-flex items-center text-charcoal-600 hover:text-gold-600 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Collection
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Product Image */}
          <div className="aspect-square relative overflow-hidden bg-gray-50 rounded-lg">
            {product.images?.[0] ? (
              <div 
                className="relative w-full h-full cursor-zoom-in"
                onClick={() => openLightbox(0)}
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/20">
                  <div className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                    Click to Zoom
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <Heading level={1} className="text-3xl md:text-4xl lg:text-5xl mb-2">
                    {product.name}
                  </Heading>
                  <p className="text-charcoal-600 text-lg font-light">
                    {product.category}
                  </p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span 
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                    style={{ backgroundColor: '#D4AF37', color: '#1A1A1A' }}
                  >
                    Handcrafted in Pakistan
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800`}>
                    In Stock
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-gray-700 text-lg leading-relaxed font-light">
                {product.description}
              </p>

              <div className="flex items-center space-x-6">
                <span className="text-3xl font-bold text-charcoal-900">
                  PKR {product.price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Product Specifications */}
            <div className="border-t pt-8" style={{ borderColor: 'rgba(212,175,55,0.2)' }}>
              <h3 className="text-lg font-semibold text-charcoal-900 mb-6 font-serif">
                Product Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <dt className="text-xs uppercase tracking-wider text-gray-500 font-medium">Fabric</dt>
                  <dd className="text-charcoal-900 font-medium">Luxury Lawn</dd>
                </div>
                <div className="space-y-2">
                  <dt className="text-xs uppercase tracking-wider text-gray-500 font-medium">Length</dt>
                  <dd className="text-charcoal-900 font-medium">2.5m Unstitched</dd>
                </div>
                <div className="space-y-2">
                  <dt className="text-xs uppercase tracking-wider text-gray-500 font-medium">Care</dt>
                  <dd className="text-charcoal-900 font-medium">Dry Clean Only</dd>
                </div>
              </div>
            </div>

            {/* The Maker's Story */}
            <div className="border-t pt-8" style={{ borderColor: 'rgba(212,175,55,0.2)' }}>
              <h3 className="text-lg font-semibold text-charcoal-900 mb-6 font-serif">
                The Maker's Story
              </h3>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed font-light italic">
                  In the quiet courtyards of Lahore, where time moves to the rhythm of carved wooden blocks, 
                  our artisans breathe life into fabric. Each impression is a conversation between hand and cloth, 
                  a meditation passed down through generations. The block, worn smooth by countless touches, 
                  carries the memory of every pattern it has ever pressed into fabric.
                </p>
                <p className="text-gray-700 leading-relaxed font-light italic mt-4">
                  Natural pigments derived from earth, flower, and stone create hues that deepen with time, 
                  becoming more beautiful with every wear. This is not merely clothing; it is a piece of living history, 
                  a testament to the slow, deliberate art of hand-block printing that has adorned royalty for centuries.
                </p>
              </div>
            </div>

            {/* Luxury Testimonials */}
            <div className="border-t pt-8" style={{ borderColor: 'rgba(212,175,55,0.2)' }}>
              <h3 className="text-lg font-semibold text-charcoal-900 mb-6 font-serif">
                What Our Clients Say
              </h3>
              <div className="space-y-6">
                <div className="p-6 rounded-2xl border" style={{ borderColor: 'rgba(212,175,55,0.3)', backgroundColor: '#FFFFF0' }}>
                  <blockquote className="font-serif text-lg text-gray-700 italic leading-relaxed mb-4">
                    "The block print detail is even more beautiful in person. A true heirloom piece that I'll treasure for years."
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                      <span className="text-gold font-semibold text-sm">AK</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-charcoal-900">Ayesha Khan</p>
                      <p className="text-xs text-gray-500">Karachi</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 rounded-2xl border" style={{ borderColor: 'rgba(212,175,55,0.3)', backgroundColor: '#FFFFF0' }}>
                  <blockquote className="font-serif text-lg text-gray-700 italic leading-relaxed mb-4">
                    "Exquisite craftsmanship and attention to detail. This piece tells a story with every pattern."
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                      <span className="text-gold font-semibold text-sm">FM</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-charcoal-900">Fatima Mahmood</p>
                      <p className="text-xs text-gray-500">Lahore</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 rounded-2xl border" style={{ borderColor: 'rgba(212,175,55,0.3)', backgroundColor: '#FFFFF0' }}>
                  <blockquote className="font-serif text-lg text-gray-700 italic leading-relaxed mb-4">
                    "The quality of fabric and precision of block printing exceeded all my expectations. Absolutely worth every penny."
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                      <span className="text-gold font-semibold text-sm">SA</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-charcoal-900">Sara Ahmed</p>
                      <p className="text-xs text-gray-500">Islamabad</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-6">
              <Button
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full border border-gold px-4 py-3 text-xs md:text-sm uppercase tracking-[0.18em] font-semibold text-charcoal-900 hover:bg-gold hover:text-charcoal-900 transition-colors"
              >
                WhatsApp Inquiry
              </a>
            </div>

            {/* Additional Details */}
            <div className="border-t pt-8" style={{ borderColor: 'rgba(212,175,55,0.2)' }}>
              <h3 className="text-lg font-semibold text-charcoal-900 mb-6 font-serif">
                Additional Details
              </h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Category</dt>
                  <dd className="text-charcoal-900">{product.category}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Fabric</dt>
                  <dd className="text-charcoal-900">{product.fabric}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Block Print Type</dt>
                  <dd className="text-charcoal-900">{product.blockPrintType}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Product ID</dt>
                  <dd className="text-charcoal-900 font-mono">{product.id}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* You May Also Like - Related Products */}
        <div className="mt-20 pt-16 border-t" style={{ borderColor: 'rgba(212,175,55,0.2)' }}>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-serif text-charcoal-900 mb-4">
              You May Also Like
            </h2>
            <p className="text-gray-600 text-lg font-light">
              Complete your collection with these handcrafted pieces
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Related Product 1 */}
            <div className="group relative bg-ivory rounded-2xl shadow-sm border border-transparent overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="aspect-[3/4] relative overflow-hidden bg-charcoal-900/5">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                  Lawn
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                    View Details
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-serif text-base text-charcoal-900 mb-2 group-hover:text-gold transition-colors">
                  Royal Garden Ensemble
                </h3>
                <p className="text-sm text-gray-600 mb-3">Traditional Mughal motifs</p>
                <div className="flex items-center justify-between">
                  <span className="text-charcoal-900 font-semibold">PKR 8,500</span>
                  <button className="text-gold hover:text-charcoal-900 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Related Product 2 */}
            <div className="group relative bg-ivory rounded-2xl shadow-sm border border-transparent overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="aspect-[3/4] relative overflow-hidden bg-charcoal-900/5">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                  Organza
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                    View Details
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-serif text-base text-charcoal-900 mb-2 group-hover:text-gold transition-colors">
                  Summer Bloom Collection
                </h3>
                <p className="text-sm text-gray-600 mb-3">Delicate floral patterns</p>
                <div className="flex items-center justify-between">
                  <span className="text-charcoal-900 font-semibold">PKR 12,000</span>
                  <button className="text-gold hover:text-charcoal-900 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Related Product 3 */}
            <div className="group relative bg-ivory rounded-2xl shadow-sm border border-transparent overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="aspect-[3/4] relative overflow-hidden bg-charcoal-900/5">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                  Karandi
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                    View Details
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-serif text-base text-charcoal-900 mb-2 group-hover:text-gold transition-colors">
                  Autumn Heritage
                </h3>
                <p className="text-sm text-gray-600 mb-3">Rich earth tone designs</p>
                <div className="flex items-center justify-between">
                  <span className="text-charcoal-900 font-semibold">PKR 9,800</span>
                  <button className="text-gold hover:text-charcoal-900 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Related Product 4 */}
            <div className="group relative bg-ivory rounded-2xl shadow-sm border border-transparent overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="aspect-[3/4] relative overflow-hidden bg-charcoal-900/5">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                  Silk
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                    View Details
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-serif text-base text-charcoal-900 mb-2 group-hover:text-gold transition-colors">
                  Midnight Luxury
                </h3>
                <p className="text-sm text-gray-600 mb-3">Premium silk collection</p>
                <div className="flex items-center justify-between">
                  <span className="text-charcoal-900 font-semibold">PKR 15,500</span>
                  <button className="text-gold hover:text-charcoal-900 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Luxury Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && product?.images && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10"
                aria-label="Close lightbox"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Navigation Buttons */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImage('prev');
                    }}
                    className="absolute left-6 text-white/80 hover:text-white transition-colors z-10"
                    aria-label="Previous image"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImage('next');
                    }}
                    className="absolute right-6 text-white/80 hover:text-white transition-colors z-10"
                    aria-label="Next image"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Main Image */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
                  <Image
                    src={product.images[currentImageIndex]}
                    alt={`${product.name} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 80vw"
                    priority
                  />
                </div>
              </motion.div>

              {/* Image Counter */}
              {product.images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/80 text-sm font-medium bg-black/50 px-4 py-2 rounded-full">
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              )}

              {/* Product Name */}
              <div className="absolute top-6 left-6 text-white/90 font-serif text-xl">
                {product.name}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Sticky Add to Cart */}
      <div className="fixed bottom-0 left-0 right-0 bg-ivory border-t shadow-lg z-40 md:hidden" style={{ borderColor: 'rgba(212,175,55,0.3)' }}>
        <div className="flex items-center justify-between p-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-charcoal-900 line-clamp-1">{product.name}</p>
            <p className="text-lg font-bold text-charcoal-900">PKR {product.price.toLocaleString()}</p>
          </div>
          <Button
            size="sm"
            className="flex-1 ml-4"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}