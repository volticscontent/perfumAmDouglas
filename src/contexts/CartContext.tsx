'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface CartItem {
  handle: string;
  variant_id: number;
  product_id: number;
  title: string;
  price: string;
  quantity: number;
  image?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { handle: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.handle === action.payload.handle);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.handle === action.payload.handle
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + parseFloat(action.payload.price),
          isOpen: true
        };
      } else {
        const newItem = { ...action.payload, quantity: 1 };
        return {
          ...state,
          items: [...state.items, newItem],
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + parseFloat(action.payload.price),
          isOpen: true
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find(item => item.handle === action.payload);
      if (!itemToRemove) return state;
      
      return {
        ...state,
        items: state.items.filter(item => item.handle !== action.payload),
        totalItems: state.totalItems - itemToRemove.quantity,
        totalPrice: state.totalPrice - (parseFloat(itemToRemove.price) * itemToRemove.quantity)
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const item = state.items.find(item => item.handle === action.payload.handle);
      if (!item) return state;
      
      const quantityDiff = action.payload.quantity - item.quantity;
      
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.handle !== action.payload.handle),
          totalItems: state.totalItems - item.quantity,
          totalPrice: state.totalPrice - (parseFloat(item.price) * item.quantity)
        };
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.handle === action.payload.handle
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        totalItems: state.totalItems + quantityDiff,
        totalPrice: state.totalPrice + (parseFloat(item.price) * quantityDiff)
      };
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0
      };
    
    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen
      };
    
    case 'OPEN_CART':
      return {
        ...state,
        isOpen: true
      };
    
    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false
      };
    
    case 'LOAD_CART':
      const totalItems = action.payload.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = action.payload.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
      
      return {
        ...state,
        items: action.payload,
        totalItems,
        totalPrice
      };
    
    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (handle: string) => void;
  updateQuantity: (handle: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getShopifyCheckoutUrl: () => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const initialState: CartState = {
  items: [],
  isOpen: false,
  totalItems: 0,
  totalPrice: 0
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Carregar carrinho do localStorage na inicialização
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartItems });
      } catch (error) {
        console.error('Erro ao carregar carrinho do localStorage:', error);
      }
    }
  }, []);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
    
    // Track add to cart event for Meta Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'AddToCart', {
        content_ids: [item.variant_id.toString()],
        content_type: 'product',
        value: parseFloat(item.price),
        currency: 'EUR'
      });
    }
    
    // Track add to cart event for Utmify
    if (typeof window !== 'undefined' && window.pixelId) {
      try {
        fetch(`https://api.utmify.com.br/tracking/v1/events`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pixel_id: window.pixelId,
            event: 'add_to_cart',
            event_data: {
              content_ids: [item.variant_id.toString()],
              content_type: 'product',
              value: parseFloat(item.price),
              currency: 'EUR',
              product_title: item.title
            }
          })
        }).catch(error => console.log('Utmify tracking error:', error));
      } catch (error) {
        console.log('Utmify tracking error:', error);
      }
    }
  };

  const removeItem = (handle: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: handle });
  };

  const updateQuantity = (handle: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { handle, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const openCart = () => {
    dispatch({ type: 'OPEN_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  const getShopifyCheckoutUrl = () => {
    if (state.items.length === 0) return '';
    
    // Track initiate checkout event for Meta Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_ids: state.items.map(item => item.variant_id.toString()),
        content_type: 'product',
        value: state.totalPrice,
        currency: 'EUR',
        num_items: state.totalItems
      });
    }
    
    // Track initiate checkout event for Utmify
    if (typeof window !== 'undefined' && window.pixelId) {
      try {
        fetch(`https://api.utmify.com.br/tracking/v1/events`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pixel_id: window.pixelId,
            event: 'initiate_checkout',
            event_data: {
              content_ids: state.items.map(item => item.variant_id.toString()),
              content_type: 'product',
              value: state.totalPrice,
              currency: 'EUR',
              num_items: state.totalItems
            }
          })
        }).catch(error => console.log('Utmify tracking error:', error));
      } catch (error) {
        console.log('Utmify tracking error:', error);
      }
    }
    
    const baseUrl = 'https://cc1ve6-49.myshopify.com/cart/';
    const cartItems = state.items.map(item => `${item.variant_id}:${item.quantity}`).join(',');
    
    return `${baseUrl}${cartItems}`;
  };

  const value: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    getShopifyCheckoutUrl
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};