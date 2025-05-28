"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  BarChart, 
  Grid, 
  Keyboard, 
  Layers, 
  LayoutGrid, 
  List, 
  LogOut, 
  Package, 
  Settings, 
  ShoppingBag, 
  Users 
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/components/auth-provider"
import { useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <BarChart className="mr-2 h-4 w-4" />,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: <Keyboard className="mr-2 h-4 w-4" />,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: <Layers className="mr-2 h-4 w-4" />,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: <ShoppingBag className="mr-2 h-4 w-4" />,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: <Users className="mr-2 h-4 w-4" />,
  },
  {
    title: "Inventory",
    href: "/admin/inventory",
    icon: <Package className="mr-2 h-4 w-4" />,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: <Settings className="mr-2 h-4 w-4" />,
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (!isLoading && (!user || !user.isAdmin)) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin area.",
        variant: "destructive",
      })
      router.push("/")
    }
  }, [user, isLoading, router, toast])

  // Don't render anything until we've checked authentication
  if (isLoading || !user || !user.isAdmin) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  return (
    <div className="flex min-h-screen w-full bg-gray-100/40">
      {/* Sidebar */}
      <div className="hidden border-r bg-white lg:block lg:w-64">
        <div className="flex h-full flex-col">
          <div className="border-b px-6 py-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black">
                <Keyboard className="h-4 w-4 text-white" />
              </div>
              <span>KeyboardAdmin</span>
            </Link>
          </div>
          <ScrollArea className="flex-1 px-3 py-2">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium",
                    pathname === item.href
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
            </nav>
          </ScrollArea>
          <div className="border-t p-3">
            <Button variant="outline" className="w-full justify-start text-gray-500" asChild>
              <Link href="/">
                <LogOut className="mr-2 h-4 w-4" />
                Back to Site
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile sidebar */}
      <div className="fixed bottom-0 left-0 z-50 flex h-16 w-full border-t bg-white lg:hidden">
        <nav className="grid w-full grid-cols-5 place-items-center">
          <Link
            href="/admin/dashboard"
            className={cn(
              "flex h-full w-full flex-col items-center justify-center",
              pathname === "/admin/dashboard" ? "text-indigo-600" : "text-gray-500"
            )}
          >
            <BarChart className="h-5 w-5" />
            <span className="text-xs">Dashboard</span>
          </Link>
          <Link
            href="/admin/products"
            className={cn(
              "flex h-full w-full flex-col items-center justify-center",
              pathname === "/admin/products" ? "text-indigo-600" : "text-gray-500"
            )}
          >
            <Keyboard className="h-5 w-5" />
            <span className="text-xs">Products</span>
          </Link>
          <Link
            href="/admin/categories"
            className={cn(
              "flex h-full w-full flex-col items-center justify-center",
              pathname === "/admin/categories" ? "text-indigo-600" : "text-gray-500"
            )}
          >
            <Layers className="h-5 w-5" />
            <span className="text-xs">Categories</span>
          </Link>
          <Link
            href="/admin/orders"
            className={cn(
              "flex h-full w-full flex-col items-center justify-center",
              pathname === "/admin/orders" ? "text-indigo-600" : "text-gray-500"
            )}
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="text-xs">Orders</span>
          </Link>
          <Link
            href="/admin/settings"
            className={cn(
              "flex h-full w-full flex-col items-center justify-center",
              pathname === "/admin/settings" ? "text-indigo-600" : "text-gray-500"
            )}
          >
            <Settings className="h-5 w-5" />
            <span className="text-xs">Settings</span>
          </Link>
        </nav>
      </div>
      
      {/* Content */}
      <div className="flex w-full flex-col lg:pl-0">
        <main className="flex-1 pb-16 lg:pb-0">
          {children}
        </main>
      </div>
    </div>
  )
} 