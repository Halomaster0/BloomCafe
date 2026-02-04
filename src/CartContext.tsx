import React, { createContext, useContext, useState } from 'react';
import type { MenuItem } from './constants/menuData';
import { supabase } from './lib/supabase';

interface CartItem extends MenuItem {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: MenuItem) => void;
    removeFromCart: (itemName: string) => void;
    clearCart: () => void;
    placeOrder: (tableId: string) => Promise<void>;
    subtotal: number;
    isMenuOpen: boolean;
    setIsMenuOpen: (isOpen: boolean) => void;
    isCartModalOpen: boolean;
    setIsCartModalOpen: (isOpen: boolean) => void;
    updateQuantity: (itemName: string, delta: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: MenuItem) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.name === item.name);
            if (existing) {
                return prev.map((i) =>
                    i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (itemName: string) => {
        setCart((prev) => prev.filter((i) => i.name !== itemName));
    };

    const clearCart = () => setCart([]);

    const placeOrder = async (tableId: string) => {
        if (cart.length === 0) return;

        const orderData = {
            table_id: tableId,
            items: cart,
            total: subtotal,
            status: 'pending'
        };

        const { error } = await supabase
            .from('orders')
            .insert([orderData]);

        if (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
            return;
        }

        clearCart();
    };

    const updateQuantity = (itemName: string, delta: number) => {
        setCart((prev) =>
            prev.map((item) => {
                if (item.name === itemName) {
                    const newQty = Math.max(0, item.quantity + delta);
                    return { ...item, quantity: newQty };
                }
                return item;
            }).filter(item => item.quantity > 0)
        );
    };

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            clearCart,
            placeOrder,
            subtotal,
            isMenuOpen,
            setIsMenuOpen,
            isCartModalOpen,
            setIsCartModalOpen,
            updateQuantity
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
