'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import { Product } from '../types';

interface FilterSidebarProps {
  products: Product[];
  onFilterChange: (filteredProducts: Product[]) => void;
}

const categories = [
  { name: '3-Piece', count: 24 },
  { name: '2-Piece', count: 18 },
  { name: 'Pishwas', count: 15 },
  { name: 'Sari', count: 12 },
  { name: 'Kaftan', count: 8 },
  { name: 'Co-ords', count: 6 }
];

const fabrics = [
  'Luxury Lawn',
  'Pure Silk',
  'Organza',
  'Chiffon',
  'Net',
  'Jamawar'
];

const colors = [
  { name: 'Crimson', hex: '#A4193D' },
  { name: 'Peach', hex: '#FFDFB9' },
  { name: 'Gold', hex: '#D4AF37' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Black', hex: '#000000' },
  { name: 'Navy', hex: '#1E3A8A' },
  { name: 'Emerald', hex: '#50C878' },
  { name: 'Rose', hex: '#E11D48' }
];

export default function FilterSidebar({ products, onFilterChange }: FilterSidebarProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([5000, 50000]);
  const [isExpanded, setIsExpanded] = useState(true);

  // Apply filters whenever any filter changes
  useEffect(() => {
    let filtered = products;

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.some(cat => 
          product.name.toLowerCase().includes(cat.toLowerCase()) ||
          product.category.toLowerCase().includes(cat.toLowerCase())
        )
      );
    }

    // Fabric filter
    if (selectedFabrics.length > 0) {
      filtered = filtered.filter(product => 
        selectedFabrics.some(fab => 
          product.fabric.toLowerCase().includes(fab.toLowerCase())
        )
      );
    }

    // Color filter (simplified - would need actual color data in real app)
    if (selectedColors.length > 0) {
      filtered = filtered.filter(product => 
        selectedColors.some(color => 
          product.fabric.toLowerCase().includes(color.toLowerCase()) ||
          product.name.toLowerCase().includes(color.toLowerCase())
        )
      );
    }

    // Price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    onFilterChange(filtered);
  }, [selectedCategories, selectedFabrics, selectedColors, priceRange, products, onFilterChange]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleFabricToggle = (fabric: string) => {
    setSelectedFabrics(prev => 
      prev.includes(fabric) 
        ? prev.filter(f => f !== fabric)
        : [...prev, fabric]
    );
  };

  const handleColorToggle = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedFabrics([]);
    setSelectedColors([]);
    setPriceRange([5000, 50000]);
  };

  const getActiveFilterCount = () => {
    return selectedCategories.length + selectedFabrics.length + selectedColors.length + (priceRange[0] !== 5000 || priceRange[1] !== 50000 ? 1 : 0);
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className={`sticky top-20 h-fit bg-white rounded-2xl shadow-lg border border-gray-200 transition-all duration-300 ${
        isExpanded ? 'w-80' : 'w-16'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="font-display text-lg font-bold text-charcoal"
        >
          {isExpanded ? 'Filters' : ''}
        </motion.h2>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronDown className={`w-4 h-4 text-charcoal transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`} />
        </button>
      </div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: 'easeInOut' }}
          className="p-4 space-y-6"
        >
          {/* Category Filter */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-semibold text-charcoal mb-3 flex items-center justify-between"
            >
              Category
              {selectedCategories.length > 0 && (
                <span className="text-xs bg-crimson text-white px-2 py-1 rounded-full font-bold">
                  {selectedCategories.length}
                </span>
              )}
            </motion.h3>
            <div className="space-y-2">
              {categories.map((category, index) => (
                <motion.label
                  key={category.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
                  className="flex items-center justify-between cursor-pointer hover:text-crimson transition-colors group"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.name)}
                      onChange={() => handleCategoryToggle(category.name)}
                      className="mr-3 w-4 h-4 text-crimson focus:ring-crimson focus:ring-2 rounded"
                    />
                    <span className="text-sm">{category.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">({category.count})</span>
                </motion.label>
              ))}
            </div>
          </div>

          {/* Fabric Filter */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="font-semibold text-charcoal mb-3 flex items-center justify-between"
            >
              Fabric
              {selectedFabrics.length > 0 && (
                <span className="text-xs bg-crimson text-white px-2 py-1 rounded-full font-bold">
                  {selectedFabrics.length}
                </span>
              )}
            </motion.h3>
            <div className="space-y-2">
              {fabrics.map((fabric, index) => (
                <motion.label
                  key={fabric}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05, duration: 0.5 }}
                  className="flex items-center cursor-pointer hover:text-crimson transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedFabrics.includes(fabric)}
                    onChange={() => handleFabricToggle(fabric)}
                    className="mr-3 w-4 h-4 text-crimson focus:ring-crimson focus:ring-2 rounded"
                  />
                  <span className="text-sm">{fabric}</span>
                </motion.label>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="font-semibold text-charcoal mb-3 flex items-center justify-between"
            >
              Color
              {selectedColors.length > 0 && (
                <span className="text-xs bg-crimson text-white px-2 py-1 rounded-full font-bold">
                  {selectedColors.length}
                </span>
              )}
            </motion.h3>
            <div className="grid grid-cols-4 gap-2">
              {colors.map((color, index) => (
                <motion.button
                  key={color.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleColorToggle(color.name)}
                  className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                    selectedColors.includes(color.name)
                      ? 'border-crimson shadow-lg'
                      : 'border-gray-300 hover:border-crimson'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {selectedColors.includes(color.name) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center bg-white/90 rounded-full"
                    >
                      <X className="w-3 h-3 text-crimson" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="font-semibold text-charcoal mb-3"
            >
              Price Range
            </motion.h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>PKR {priceRange[0].toLocaleString()}</span>
                <span>PKR {priceRange[1].toLocaleString()}</span>
              </div>
              
              {/* Custom Range Slider */}
              <div className="relative">
                <div className="h-2 bg-gray-200 rounded-full relative">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ 
                      width: `${((priceRange[0] - 5000) / (50000 - 5000)) * 100}%` 
                    }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-crimson to-crimson-dark rounded-full"
                  />
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ 
                      width: `${((priceRange[1] - 5000) / (50000 - 5000)) * 100}%` 
                    }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-crimson to-crimson-dark rounded-full opacity-50"
                  />
                </div>
              </div>
              
              {/* Range Inputs */}
              <div className="flex gap-2 mt-2">
                <input
                  type="range"
                  min="5000"
                  max="50000"
                  step="1000"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="flex-1 h-2 bg-transparent appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #A4193D 0%, #A4193D ${((priceRange[0] - 5000) / (50000 - 5000)) * 100}%, #E5E7EB ${((priceRange[0] - 5000) / (50000 - 5000)) * 100}%, #E5E7EB 100%)`
                  }}
                />
                <input
                  type="range"
                  min="5000"
                  max="50000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="flex-1 h-2 bg-transparent appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #E5E7EB 0%, #E5E7EB ${((priceRange[1] - 5000) / (50000 - 5000)) * 100}%, #A4193D ${((priceRange[1] - 5000) / (50000 - 5000)) * 100}%, #A4193D 100%)`
                  }}
                />
              </div>
            </div>
          </div>

          {/* Clear Filters Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearAllFilters}
            className="w-full bg-crimson text-white py-3 rounded-lg font-semibold hover:bg-crimson-dark transition-colors"
          >
            Clear All Filters
          </motion.button>
        </motion.div>
      )}

      {/* Filter Count Badge (When Collapsed) */}
      {!isExpanded && getActiveFilterCount() > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="absolute -top-2 -right-2 bg-crimson text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
        >
          {getActiveFilterCount()}
        </motion.div>
      )}
    </motion.aside>
  );
}
