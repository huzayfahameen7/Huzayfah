'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import FilterSidebar from '@/components/FilterSidebar';
import { Product } from '@/types';

// Sample product data - in real app, this would come from API
const sampleProducts: Product[] = [
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
    sku: 'CF001',
    name: 'Chiffon Sari',
    shortDescription: 'Delicate chiffon for special occasions',
    price: 4500,
    description: 'Delicate chiffon fabric with traditional hand-block printed designs',
    fabric: 'White Chiffon',
    images: ['/product-images/product-4.jpg'],
    category: 'Premium',
    blockPrintType: 'Modern',
    customizable: true,
    isNew: true,
    isHot: false,
    discount: 5
  },
  {
    id: '5',
    sku: 'KT001',
    name: 'Luxury Kaftan',
    shortDescription: 'Comfortable kaftan for casual wear',
    price: 3500,
    description: 'Comfortable kaftan with traditional hand-block printed designs',
    fabric: 'Cotton',
    images: ['/product-images/product-5.jpg'],
    category: 'Casual',
    blockPrintType: 'Traditional',
    customizable: true,
    isNew: false,
    isHot: true,
    discount: 15
  },
  {
    id: '6',
    sku: 'LS001',
    name: 'Lawn Suit 2-Piece',
    shortDescription: 'Summer lawn with modern prints',
    price: 3000,
    description: 'Summer lawn fabric with modern hand-block printed designs',
    fabric: 'Summer Lawn',
    images: ['/product-images/product-6.jpg'],
    category: 'Unstitched',
    blockPrintType: 'Modern',
    customizable: true,
    isNew: true,
    isHot: false,
    discount: 0
  },
  {
    id: '7',
    sku: 'PS001',
    name: 'Premium Pishwas',
    shortDescription: 'Elegant pishwas for festive wear',
    price: 6000,
    description: 'Elegant pishwas with traditional hand-block printed designs',
    fabric: 'Silk Blend',
    images: ['/product-images/product-7.jpg'],
    category: 'Festive',
    blockPrintType: 'Traditional',
    customizable: true,
    isNew: false,
    isHot: true,
    discount: 20
  },
  {
    id: '8',
    sku: 'SK001',
    name: 'Silk Kaftan',
    shortDescription: 'Luxurious silk kaftan',
    price: 5000,
    description: 'Luxurious silk kaftan with hand-block printed designs',
    fabric: 'Pure Silk',
    images: ['/product-images/product-8.jpg'],
    category: 'Luxury',
    blockPrintType: 'Modern',
    customizable: true,
    isNew: true,
    isHot: false,
    discount: 0
  },
  {
    id: '9',
    sku: 'CR001',
    name: 'Cotton Lawn Suit',
    shortDescription: 'Comfortable cotton for daily wear',
    price: 2500,
    description: 'Comfortable cotton lawn with hand-block printed designs',
    fabric: 'Cotton Lawn',
    images: ['/product-images/product-9.jpg'],
    category: 'Casual',
    blockPrintType: 'Traditional',
    customizable: true,
    isNew: false,
    isHot: false,
    discount: 10
  },
  {
    id: '10',
    sku: 'CH001',
    name: 'Chiffon Dress',
    shortDescription: 'Lightweight chiffon dress',
    price: 4000,
    description: 'Lightweight chiffon dress with hand-block printed designs',
    fabric: 'Chiffon',
    images: ['/product-images/product-10.jpg'],
    category: 'Party Wear',
    blockPrintType: 'Contemporary',
    customizable: true,
    isNew: true,
    isHot: true,
    discount: 5
  },
  {
    id: '11',
    sku: 'OR002',
    name: 'Organza Suit',
    shortDescription: 'Premium organza for special events',
    price: 5500,
    description: 'Premium organza suit with hand-block printed designs',
    fabric: 'Organza',
    images: ['/product-images/product-11.jpg'],
    category: 'Festive',
    blockPrintType: 'Traditional',
    customizable: true,
    isNew: false,
    isHot: false,
    discount: 0
  },
  {
    id: '12',
    sku: 'LM001',
    name: 'Lawn Mix Suit',
    shortDescription: 'Mixed lawn fabric collection',
    price: 3200,
    description: 'Mixed lawn fabric with hand-block printed designs',
    fabric: 'Lawn Mix',
    images: ['/product-images/product-12.jpg'],
    category: 'Unstitched',
    blockPrintType: 'Modern',
    customizable: true,
    isNew: true,
    isHot: false,
    discount: 8
  },
  {
    id: '13',
    sku: 'FS001',
    name: 'Festive Collection',
    shortDescription: 'Premium festive wear collection',
    price: 6500,
    description: 'Premium festive wear with hand-block printed designs',
    fabric: 'Silk',
    images: ['/product-images/product-13.jpg'],
    category: 'Festive',
    blockPrintType: 'Traditional',
    customizable: true,
    isNew: false,
    isHot: true,
    discount: 12
  }
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [activeTab, setActiveTab] = useState('Trending');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);

  useEffect(() => {
    let filtered = sampleProducts;
    
    // Apply search filter
    if (searchQuery.trim()) {
      filtered = sampleProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.fabric.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply tab filtering
    switch (activeTab) {
      case 'Trending':
        filtered = filtered.slice(0, 8);
        break;
      case 'Popular':
        filtered = filtered.filter(p => p.isHot);
        break;
      case 'Recent':
        filtered = filtered.filter(p => p.isNew);
        break;
      default:
        filtered = filtered;
    }
    
    setFilteredProducts(filtered);
  }, [searchQuery, activeTab]);

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex gap-6">
        {/* Sidebar Filters */}
        <FilterSidebar
          products={sampleProducts}
          onFilterChange={setFilteredProducts}
        />

        {/* Main Content */}
        <div className="flex-1">
          {/* Product Tabs */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex gap-6 border-b border-gray-200">
              {['Trending', 'Popular', 'Recent'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 px-4 font-semibold transition-all ${
                    activeTab === tab
                      ? 'text-crimson border-b-2 border-crimson'
                      : 'text-gray-600 hover:text-crimson border-b-2 border-transparent'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="bg-crimson text-white px-8 py-3 rounded-lg font-semibold uppercase tracking-widest hover:bg-crimson-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin"></div>
                  Loading...
                </div>
              ) : (
                'Load More Products'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#FFDFB9]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="font-display text-2xl text-charcoal">Shop Collection</h1>
        </div>
      </div>

      <Suspense fallback={<div className="flex justify-center py-12">Loading collection...</div>}>
        <ProductsContent />
      </Suspense>
    </div>
  );
}
