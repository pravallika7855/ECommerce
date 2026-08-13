import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Cart Context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cart state from LocalStorage if available
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('nova_cart_items');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage:', e);
      return [];
    }
  });

  // State for temporary toast notification message
  const [toastMessage, setToastMessage] = useState(null);

  // Sync cart state with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('nova_cart_items', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cartItems]);

  /**
   * Helper function to show temporary notification
   */
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  /**
   * Add product to cart or increment quantity
   * @param {Object} product - Product object
   * @param {number} qty - Quantity to add (default 1)
   */
  const addToCart = (product, qty = 1) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);

      if (existingItemIndex > -1) {
        // Product already in cart: update quantity
        const updated = [...prevItems];
        const currentQty = updated[existingItemIndex].quantity;
        const maxStock = product.stock || 99;
        const newQty = Math.min(currentQty + qty, maxStock);

        updated[existingItemIndex] = {
          ...updated[existingItemIndex],
          quantity: newQty
        };
        showToast(`Updated quantity for "${product.title}" in your cart!`);
        return updated;
      } else {
        // New item: add to cart
        showToast(`Added "${product.title}" to your cart!`);
        return [
          ...prevItems,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            discountPercentage: product.discountPercentage || 0,
            thumbnail: product.thumbnail || product.images?.[0] || '',
            brand: product.brand || 'Generic',
            category: product.category || 'general',
            stock: product.stock || 99,
            quantity: Math.min(qty, product.stock || 99)
          }
        ];
      }
    });
  };

  /**
   * Remove product from cart
   * @param {number|string} productId 
   */
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === productId);
      if (itemToRemove) {
        showToast(`Removed "${itemToRemove.title}" from cart.`);
      }
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  /**
   * Increase quantity by 1
   * @param {number|string} productId 
   */
  const increaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === productId) {
          const newQty = item.quantity + 1;
          if (newQty <= (item.stock || 99)) {
            return { ...item, quantity: newQty };
          }
        }
        return item;
      })
    );
  };

  /**
   * Decrease quantity by 1 (minimum 1)
   * @param {number|string} productId 
   */
  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === productId) {
          const newQty = item.quantity - 1;
          if (newQty >= 1) {
            return { ...item, quantity: newQty };
          }
        }
        return item;
      })
    );
  };

  /**
   * Clear all items from cart
   */
  const clearCart = () => {
    setCartItems([]);
    showToast('Shopping cart cleared.');
  };

  // Calculate total items count
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalQuantity,
        totalPrice,
        toastMessage
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to use Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
