"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export type WishlistItem = {
  id: string
  name: string
  price: number
  image: string
  switchType?: string
  layout?: string
  category?: string
}

type WishlistContextType = {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => Promise<void>
  removeItem: (id: string) => Promise<void>
  isInWishlist: (id: string) => boolean
  clearWishlist: () => Promise<void>
  loading: boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Load wishlist from Supabase
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session) {
          setLoading(false)
          return
        }

        const { data: wishlistItems, error } = await supabase
          .from('wishlist')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error

        setItems(wishlistItems.map(item => ({
          id: item.product_id,
          name: item.product_name,
          price: parseFloat(item.product_price),
          image: item.product_image,
        })))
      } catch (error) {
        console.error('Error loading wishlist:', error)
      } finally {
        setLoading(false)
      }
    }

    loadWishlist()

    // Subscribe to wishlist changes
    const channel = supabase
      .channel('wishlist_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'wishlist' },
        () => loadWishlist()
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [])

  const addItem = async (newItem: WishlistItem) => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/login')
        return
      }

      const { error } = await supabase.from('wishlist').insert({
        user_id: session.user.id,
        product_id: newItem.id,
        product_name: newItem.name,
        product_image: newItem.image,
        product_price: newItem.price
      })

      if (error) throw error
    } catch (error) {
      console.error('Error adding item to wishlist:', error)
    }
  }

  const removeItem = async (id: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/login')
        return
      }

      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('product_id', id)
        .eq('user_id', session.user.id)

      if (error) throw error
    } catch (error) {
      console.error('Error removing item from wishlist:', error)
    }
  }

  const isInWishlist = (id: string) => {
    return items.some((item) => item.id === id)
  }

  const clearWishlist = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/login')
        return
      }

      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', session.user.id)

      if (error) throw error
    } catch (error) {
      console.error('Error clearing wishlist:', error)
    }
  }

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist, clearWishlist, loading }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
