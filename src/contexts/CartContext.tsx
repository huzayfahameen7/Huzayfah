'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addItem: (
    product: Product,
    selectedCustomization?: {
      print?: string | null;
      garmentType?: string;
      fabric?: string;
      baseColor?: string;
      secondaryColor?: string;
      accent1Color?: string;
      accent2Color?: string;
      pattern?: string;
      goldFoil?: boolean;
    }
  ) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        // Failed to load cart from localStorage
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (
    product: Product,
    selectedCustomization?: {
      print?: string | null;
      garmentType?: string;
      fabric?: string;
      baseColor?: string;
      secondaryColor?: string;
      accent1Color?: string;
      accent2Color?: string;
      pattern?: string;
      goldFoil?: boolean;
    }
  ) => {
    setItems(prevItems => {
      const key = selectedCustomization?.print ?? (selectedCustomization
        ? [selectedCustomization.garmentType, selectedCustomization.fabric, selectedCustomization.pattern, selectedCustomization.baseColor, selectedCustomization.secondaryColor, selectedCustomization.accent1Color, selectedCustomization.accent2Color, selectedCustomization.goldFoil].filter(Boolean).join('-') || 'custom'
        : 'default');
      const cartItemId = `${product.id}::${selectedCustomization?.print ?? (product as any).size ?? key}`;

      const existingItem = prevItems.find(item => item.cartItemId === cartItemId);
      if (existingItem) {
        return prevItems.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }

      const newItem: CartItem = {
        ...product,
        quantity: product.quantity || 1,
        cartItemId,
        selectedCustomization: selectedCustomization ? { ...selectedCustomization } : { print: null },
      };

      return [...prevItems, newItem];
    });
  };

  const removeItem = (cartItemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(cartItemId);
    } else {
      setItems(prevItems =>
        prevItems.map(item =>
          item.cartItemId === cartItemId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  const toggleCart = () => {
    setIsOpen(prev => !prev);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}