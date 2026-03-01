'use client';

import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Heading, Button } from '@/components';
import { getProductById, products as allProducts } from '@/lib/products';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import ProductCard from '@/components/ProductCard';

const RelatedProducts = ({ currentProduct }: { currentProduct: Product }) => {
  const related = useMemo(() => {
    return allProducts
      .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
      .slice(0, 4);
  }, [currentProduct]);

  if (related.length === 0) return null;

  return (
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
        {related.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const SizeGuideModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-serif text-charcoal">Size Guide</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-8">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-charcoal uppercase bg-gray-50 font-bold">
                    <tr>
                      <th className="px-6 py-4">Size</th>
                      <th className="px-6 py-4">Chest</th>
                      <th className="px-6 py-4">Waist</th>
                      <th className="px-6 py-4">Hips</th>
                      <th className="px-6 py-4">Length</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="px-6 py-4 font-bold text-charcoal">Small</td>
                      <td className="px-6 py-4">36"</td>
                      <td className="px-6 py-4">30"</td>
                      <td className="px-6 py-4">38"</td>
                      <td className="px-6 py-4">42"</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-charcoal">Medium</td>
                      <td className="px-6 py-4">38"</td>
                      <td className="px-6 py-4">32"</td>
                      <td className="px-6 py-4">40"</td>
                      <td className="px-6 py-4">44"</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-charcoal">Large</td>
                      <td className="px-6 py-4">40"</td>
                      <td className="px-6 py-4">34"</td>
                      <td className="px-6 py-4">42"</td>
                      <td className="px-6 py-4">45"</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-charcoal">X-Large</td>
                      <td className="px-6 py-4">42"</td>
                      <td className="px-6 py-4">36"</td>
                      <td className="px-6 py-4">44"</td>
                      <td className="px-6 py-4">46"</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-ivory-50 p-6 rounded-2xl border border-gold/20">
                <h3 className="font-bold text-charcoal mb-3">Measuring Tips</h3>
                <ul className="text-sm space-y-2 text-gray-600 list-disc pl-4">
                  <li>Measure around the fullest part of your chest.</li>
                  <li>Measure around the narrowest part of your waistline.</li>
                  <li>Measure around the fullest part of your hips.</li>
                  <li>For unstitched items, the fabric length provided is 2.5 meters.</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem, openCart } = useCart();
  const { addToast } = useToast();
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
    addToast(`${product.name} added to cart!`, 'success');
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
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.id === '1' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                    {product.id === '1' ? 'Limited Stock' : 'In Stock'}
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
                  <dd className="text-charcoal-900 font-medium">{product.fabric}</dd>
                </div>
                <div className="space-y-2">
                  <dt className="text-xs uppercase tracking-wider text-gray-500 font-medium">Type</dt>
                  <dd className="text-charcoal-900 font-medium">{product.blockPrintType}</dd>
                </div>
                <div className="space-y-2">
                  <dt className="text-xs uppercase tracking-wider text-gray-500 font-medium">Care</dt>
                  <dd className="text-charcoal-900 font-medium">Dry Clean Only</dd>
                </div>
              </div>
            </div>

            {/* Size Guide Trigger */}
            <div className="pt-4">
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-crimson font-bold text-sm hover:underline flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                View Size Guide
              </button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-6">
              <motion.div whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </motion.div>

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
                  <dt className="text-gray-600">SKU</dt>
                  <dd className="text-charcoal-900">{product.sku}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Product ID</dt>
                  <dd className="text-charcoal-900 font-mono text-xs">{product.id}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Dynamic Related Products */}
        <RelatedProducts currentProduct={product} />

      </Container>

      {/* Luxury Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && product?.images && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
              onClick={closeLightbox}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-8"
                onClick={(e) => e.stopPropagation()}
              >
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

                <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
                  <Image
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    fill
                    className="object-contain"
                    sizes="80vw"
                    priority
                  />
                </div>

                {product.images.length > 1 && (
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/80 text-sm font-medium bg-black/50 px-4 py-2 rounded-full">
                    {currentImageIndex + 1} / {product.images.length}
                  </div>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />

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
