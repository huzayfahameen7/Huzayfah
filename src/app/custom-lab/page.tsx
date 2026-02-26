'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import CustomPrintLab from '@/components/CustomPrintLab';
import { Product } from '@/types';

// Sample product for custom lab
const sampleProduct: Product = {
  id: 'custom-1',
  sku: 'CUSTOM001',
  name: 'Custom Design',
  shortDescription: 'Create your bespoke masterpiece',
  price: 5000,
  description: 'Design your own unique piece with our custom print service',
  fabric: 'Custom Choice',
  images: ['/product image/custom-design.jpg'],
  category: 'Custom',
  blockPrintType: 'Custom',
  customizable: true,
  isNew: false,
  isHot: false,
  discount: 0
};

export default function CustomLabPage() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [savedDesigns, setSavedDesigns] = useState<Array<{id: string, url: string, name: string, createdAt: Date}>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved designs from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('savedDesigns');
    if (saved) {
      try {
        setSavedDesigns(JSON.parse(saved));
      } catch (error) {
        // Failed to load saved designs
      }
    }
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSavePreview = () => {
    setIsSaving(true);
    setSaveMessage(null);
    
    if (previewUrl) {
      // Save to localStorage
      const newDesign = {
        id: Date.now().toString(),
        url: previewUrl,
        name: `Design ${new Date().toLocaleDateString()}`,
        createdAt: new Date()
      };
      
      const updatedDesigns = [...savedDesigns, newDesign];
      setSavedDesigns(updatedDesigns);
      localStorage.setItem('savedDesigns', JSON.stringify(updatedDesigns));
      
      // Simulate save process
      setTimeout(() => {
        setIsSaving(false);
        setSaveMessage('Design saved successfully!');
        setTimeout(() => setSaveMessage(null), 3000);
      }, 1500);
    } else {
      setIsSaving(false);
      setSaveMessage('Please upload a design first');
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFDFB9] py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-5xl font-bold text-crimson mb-4">
              Bespoke Design Studio
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Create your own signature piece with our custom design service. 
              Choose your style, fabric, and patterns to craft a unique masterpiece.
            </p>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-8 items-start">
          {/* Custom Lab Component */}
          <div>
            <CustomPrintLab 
              product={sampleProduct} 
              customDesignUrl={previewUrl}
              onSaveSuccess={() => setSaveMessage('Design saved to cart!')}
            />
          </div>

          {/* Live Preview Section */}
          <div className="lg:sticky lg:top-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-6 border border-crimson"
            >
              <h3 className="font-display text-xl font-bold text-crimson mb-4">
                Live Preview
              </h3>
              <div className="aspect-[3/4] bg-gradient-to-br from-crimson/10 to-peach/50 rounded-lg mb-4 overflow-hidden relative">
                {previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt="Custom design preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-crimson/20 rounded-full flex items-center justify-center mb-3">
                        <span className="text-2xl">🎨</span>
                      </div>
                      <p className="text-gray-500 text-sm">Your design will appear here</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <div className="space-y-3">
                <button 
                  onClick={handleUploadClick}
                  className="w-full bg-crimson text-white py-3 rounded-lg font-semibold uppercase tracking-widest hover:bg-crimson-dark transition-colors"
                >
                  Upload Your Design
                </button>
                <button 
                  onClick={handleSavePreview}
                  disabled={isSaving || !previewUrl}
                  className="w-full border-2 border-crimson text-crimson py-3 rounded-lg font-semibold uppercase tracking-widest hover:bg-crimson hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-crimson border-t-transparent animate-spin"></div>
                      Saving...
                    </div>
                  ) : (
                    'Save Preview'
                  )}
                </button>
              </div>
              
              {/* Success Message */}
              {saveMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 p-3 bg-green-100 text-green-700 rounded-lg text-sm font-medium"
                >
                  {saveMessage}
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* My Saved Designs */}
          {savedDesigns.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:sticky lg:top-8"
            >
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-crimson">
                <h3 className="font-display text-xl font-bold text-crimson mb-4">
                  My Saved Designs
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {savedDesigns.map((design) => (
                    <div key={design.id} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                        <img 
                          src={design.url} 
                          alt={design.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{design.name}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(design.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
