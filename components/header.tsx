"use client"

import { useState, useMemo, memo, lazy, Suspense } from "react"
import Link from "next/link"
import { Heart, LogOut, Menu, Search, ShoppingCart, User, X } from "lucide-react"
import { usePathname } from "next/navigation"

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

  const routes = useMemo(() => [
    { href: "/", label: "Home" },
    { href: "/store", label: "Store" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ], []);

  const cartItemsCount = useMemo(() => cartItems.length, [cartItems]);
  const wishlistItemsCount = useMemo(() => wishlistItems.length, [wishlistItems]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="flex h-16 items-center px-4 md:px-6 w-full">
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
                  <div className="flex items-center gap-2 mt-auto">
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={logout}
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
            KeyboardHaven
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
                  <DropdownMenuItem onClick={logout} className="text-red-500">
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
            
            <Button variant="ghost" size="icon" aria-label="Wishlist" asChild>
              <Link href="/wishlist" className="relative">
                <Heart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-medium text-white">
                  {wishlistItemsCount}
                </span>
              </Link>
            </Button>
            
            <Button variant="ghost" size="icon" aria-label="Shopping cart" asChild>
              <Link href="/cart" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-medium text-white">
                  {cartItemsCount}
                </span>
              </Link>
            </Button>
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
