"use client"

import { useState, useMemo, memo, lazy, Suspense } from "react"
import Link from "next/link"
import { Heart, LogOut, Menu, Search, ShoppingCart, User, X } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCart } from "@/components/cart-provider"
import { useWishlist } from "@/components/wishlist-provider"
import { useAuth } from "@/components/auth-provider"

// Dynamically import SearchDialog for better performance
const SearchDialog = lazy(() => import('@/components/search-dialog').then(mod => ({ default: mod.SearchDialog })))

// Memoized navigation link component
const NavLink = memo(({ href, label, pathname }: { href: string; label: string; pathname: string }) => (
  <Link href={href} prefetch={false} className={`font-medium hover:text-gray-500/90 ${pathname === href ? 'text-gray-900' : ''}`}>
    {label}
  </Link>
));
NavLink.displayName = 'NavLink';

// Memoized mobile navigation link component
const MobileNavLink = memo(({ href, label }: { href: string; label: string }) => (
  <Link href={href} prefetch={false} className="hover:text-gray-500/90">
    {label}
  </Link>
));
MobileNavLink.displayName = 'MobileNavLink';

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  const { items: cartItems } = useCart()
  const { items: wishlistItems } = useWishlist()
  const { user, logout } = useAuth()
  const router = useRouter()

  const cartItemsCount = useMemo(() => cartItems?.length || 0, [cartItems])
  const wishlistItemsCount = useMemo(() => wishlistItems?.length || 0, [wishlistItems])

  const handleLogout = async () => {
    try {
      await logout()
      // Close any open menus/sheets
      const sheet = document.querySelector('[data-state="open"]')
      if (sheet) {
        const closeButton = sheet.querySelector('button[aria-label="Close"]')
        closeButton?.click()
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const routes = useMemo(() => [
    { href: "/", label: "Home" },
    { href: "/store", label: "Store" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ], []);



  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <nav className="flex flex-col gap-6 text-lg font-medium">
                <Link href="/" prefetch={false} className="flex items-center gap-2 text-lg font-semibold">
                  KeyboardHaven
                </Link>
                {routes.map((route) => (
                  <MobileNavLink key={route.href} href={route.href} label={route.label} />
                ))}
                {user?.isAdmin && (
                  <MobileNavLink href="/admin/dashboard" label="Admin Dashboard" />
                )}
                {user && (
                  <Link href="/wishlist" prefetch={false}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative"
                      aria-label="Wishlist"
                    >
                      <Heart className="h-6 w-6" />
                      {wishlistItemsCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-600 text-[10px] font-medium text-white flex items-center justify-center">
                          {wishlistItemsCount}
                        </span>
                      )}
                    </Button>
                  </Link>
                )}
                {user && (
                  <div className="flex items-center gap-2 mt-auto">
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={() => void handleLogout()}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" prefetch={false} className="mr-6 flex items-center gap-2 text-lg font-semibold">
            KeyboardsHaven
          </Link>
          <nav className="hidden md:flex flex-1 items-center gap-6 text-sm">
            {routes.map((route) => (
              <NavLink key={route.href} href={route.href} label={route.label} pathname={pathname} />
            ))}
            {user?.isAdmin && (
              <NavLink href="/admin/dashboard" label="Admin Dashboard" pathname={pathname} />
            )}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label="Search" 
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="User account">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={user.isAdmin ? "/admin/profile" : "/profile"}>Profile</Link>
                  </DropdownMenuItem>
                  {user.isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin/dashboard">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => void handleLogout()} className="text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" aria-label="User account" asChild>
                <Link href="/auth/">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            )}
            
            {user && (
              <Button variant="ghost" size="icon" aria-label="Wishlist" asChild>
                <Link href="/wishlist" className="relative">
                  <Heart className="h-5 w-5" />
                  {wishlistItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-medium text-white">
                      {wishlistItemsCount}
                    </span>
                  )}
                </Link>
              </Button>
            )}
            
            {user && (
              <Button variant="ghost" size="icon" aria-label="Shopping cart" asChild>
                <Link href="/cart" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-medium text-white">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Use Suspense for the SearchDialog */}
      {isSearchOpen && (
        <Suspense fallback={null}>
          <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
        </Suspense>
      )}
    </>
  )
}
