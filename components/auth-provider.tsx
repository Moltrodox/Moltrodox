"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from '@supabase/supabase-js'

const getSupabase = () => {
  if (typeof window === 'undefined') {
    throw new Error('Supabase client can only be used in the browser')
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

type User = {
  email: string
  isAdmin: boolean
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check and restore session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await getSupabase().auth.getSession()
        if (error) throw error

        if (session?.user) {
          const { data: profile } = await getSupabase()
            .from('profiles')
            .select('is_admin')
            .eq('id', session.user.id)
            .single()

          setUser({
            email: session.user.email!,
            isAdmin: profile?.is_admin ?? false
          })
        }
      } catch (error) {
        console.error('Session error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()

    // Set up auth state listener
    const { data: { subscription } } = getSupabase().auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const { data: profile } = await getSupabase()
            .from('profiles')
            .select('is_admin')
            .eq('id', session.user.id)
            .single()

          setUser({
            email: session.user.email!,
            isAdmin: profile?.is_admin ?? false
          })
        } else {
          setUser(null)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const register = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)

      const { data: { user }, error } = await getSupabase().auth.signUp({
        email,
        password,
      })

      if (error) {
        console.error('Registration error:', error.message)
        return false
      }

      return true
    } catch (error) {
      console.error('Registration error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)

      const { data: { user }, error } = await getSupabase().auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('Login error:', error.message)
        return false
      }

      if (!user) {
        return false
      }

      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await getSupabase().auth.signOut()
      setUser(null)
      router.push("/")
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
} 