"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, useMemo } from "react"

export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  switchType?: string
  layout?: string
  category?: string
  cartItemId?: string // Unique identifier for cart items
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number, cartItemId?: string }) => void
  removeItem: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, quantity: number) => void
  clearCart: () => void
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Load cart from localStorage on client side
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        const parsedItems = JSON.parse(storedCart);
        // Ensure all items have cartItemId
        const itemsWithIds = parsedItems.map((item: CartItem) => {
          if (!item.cartItemId) {
            return { ...item, cartItemId: `${item.id}-${Date.now()}` };
          }
          return item;
        });
        setItems(itemsWithIds);
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
        localStorage.removeItem("cart")
      }
    }
    setIsInitialized(true)
  }, [])

  // Save cart to localStorage whenever it changes, but debounced
  useEffect(() => {
    if (!isInitialized) return;
    
    const timeoutId = setTimeout(() => {
      if (items.length > 0) {
        localStorage.setItem("cart", JSON.stringify(items))
      } else {
        localStorage.removeItem("cart")
      }
    }, 300) // 300ms debounce
    
    return () => clearTimeout(timeoutId)
  }, [items, isInitialized])

  const addItem = (newItem: Omit<CartItem, "quantity"> & { quantity?: number, cartItemId?: string }) => {
    setItems((prevItems) => {
      // Create a unique ID for this cart item using a timestamp if not provided
      const cartItemId = newItem.cartItemId || `${newItem.id}-${Date.now()}`
      const quantity = newItem.quantity || 1
      
      // Check if identical item already exists (same product ID and switch type)
      const existingItemIndex = prevItems.findIndex((item) => 
        item.id === newItem.id && 
        item.switchType === newItem.switchType && 
        item.layout === newItem.layout
      )
      
      if (existingItemIndex !== -1) {
        // If identical item exists, just increment its quantity
        return prevItems.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        )
      }
      
      // Otherwise add new item with unique cart item ID
      return [...prevItems, { ...newItem, quantity, cartItemId }]
    })
  }

  const removeItem = (itemIdToRemove: string) => {
    setItems((prevItems) => {
      // First try to find by cartItemId
      let found = prevItems.some(item => item.cartItemId === itemIdToRemove);
      
      if (found) {
        // If found by cartItemId, remove that item
        return prevItems.filter((item) => item.cartItemId !== itemIdToRemove);
      } else {
        // If not found by cartItemId, try to remove by id (for backward compatibility)
        return prevItems.filter((item) => item.id !== itemIdToRemove);
      }
    });
  }

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(cartItemId)
      return
    }
    setItems((prevItems) => prevItems.map((item) => 
      (item.cartItemId === cartItemId || item.id === cartItemId) ? { ...item, quantity } : item
    ))
  }

  const clearCart = () => {
    setItems([])
  }

  // Memoize subtotal calculation to prevent unnecessary recalculations
  const subtotal = useMemo(() => 
    items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  )

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
