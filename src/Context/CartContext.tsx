'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from '@/types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem, maxStock: number) => boolean;
  updateQuantity: (id: number, size: string, type: 'inc' | 'dec', maxStock: number) => void;
  removeFromCart: (id: number, size: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  // Validasi real-time saat klik tombol tambah
  const addToCart = (newItem: CartItem, maxStock: number): boolean => {
    const existingItemIndex = cart.findIndex((item) => item.id === newItem.id && item.size === newItem.size);

    if (existingItemIndex > -1) {
      const currentQty = cart[existingItemIndex].quantity;
      if (currentQty + newItem.quantity > maxStock) {
        alert(`Gagal menambah kuantitas! Jumlah di keranjang (${currentQty}) + yang ingin ditambahkan (${newItem.quantity}) melebihi stok tersedia (${maxStock} pcs).`);
        return false;
      }
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += newItem.quantity;
      saveCart(newCart);
    } else {
      if (newItem.quantity > maxStock) {
        alert(`Gagal! Jumlah pembelian melebihi stok yang tersedia (${maxStock} pcs).`);
        return false;
      }
      saveCart([...cart, newItem]);
    }
    return true;
  };

  // Validasi real-time saat mengubah kuantitas di halaman cart
  const updateQuantity = (id: number, size: string, type: 'inc' | 'dec', maxStock: number) => {
    const newCart = cart.map((item) => {
      if (item.id === id && item.size === size) {
        if (type === 'inc') {
          if (item.quantity >= maxStock) {
            alert(`Batas maksimum pembelian tercapai. Stok hanya tersedia ${maxStock} pcs.`);
            return item;
          }
          return { ...item, quantity: item.quantity + 1 };
        }
        if (type === 'dec' && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    });
    saveCart(newCart);
  };

  const removeFromCart = (id: number, size: string) => {
    const newCart = cart.filter((item) => !(item.id === id && item.size === size));
    saveCart(newCart);
  };

  const clearCart = () => saveCart([]);

  return <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) throw new Error('useCart harus digunakan di dalam CartProvider');
  return context;
}
