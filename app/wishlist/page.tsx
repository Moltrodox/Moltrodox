"use client"

import { Heart, ShoppingBag, ShoppingCart, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useWishlist } from "@/components/wishlist-provider"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/components/ui/use-toast"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist()
  const { addItem: addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (item: any) => {
    addToCart({
      ...item,
      quantity: 1,
      cartItemId: `${item.id}-${Date.now()}`
    })
    
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="w-full max-w-[2000px] mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Your Wishlist</h1>
              <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed">
                Items you've saved for later
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wishlist Content */}
      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="w-full max-w-[2000px] mx-auto px-4 md:px-8">
          {items.length > 0 ? (
            <div className="grid gap-10">
              {/* Wishlist Items */}
              <div className="w-full">
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Product</TableHead>
                        <TableHead className="hidden md:table-cell">Description</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                {items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                      <Link href={`/product/${item.id}`}>
                              <div className="w-[80px] h-[80px] relative rounded-md overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                                  fill
                                  className="object-cover"
                          />
                        </div>
                      </Link>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="space-y-1">
                              <Link href={`/product/${item.id}`} className="hover:underline">
                                <h3 className="font-medium">{item.name}</h3>
                              </Link>
                              <div className="text-sm text-gray-500">
                                {item.switchType && <p>Switch: {item.switchType}</p>}
                                {item.layout && <p>Layout: {item.layout}</p>}
                                {item.category && <p>Category: {item.category}</p>}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>${item.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8"
                                onClick={() => handleAddToCart(item)}
                              >
                                <ShoppingCart className="h-4 w-4 mr-1" />
                                Add to Cart
                              </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                                className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => {
                                  removeItem(item.id);
                                  toast({
                                    title: "Removed from wishlist",
                                    description: `${item.name} has been removed from your wishlist.`,
                                  });
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remove item</span>
                      </Button>
                    </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                      </div>
                
                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <Button
                    variant="outline" 
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                    onClick={() => {
                      clearWishlist();
                      toast({
                        title: "Wishlist cleared",
                        description: "All items have been removed from your wishlist.",
                      });
                    }}
                  >
                    Clear Wishlist
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/store">Continue Shopping</Link>
                        </Button>
                      </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-gray-100 p-6">
                <Heart className="h-10 w-10 text-gray-400" />
              </div>
              <h2 className="mt-4 text-2xl font-semibold">Your wishlist is empty</h2>
              <p className="mt-2 text-gray-500">Looks like you haven't added any items to your wishlist yet.</p>
              <Button className="mt-6 bg-black text-white hover:bg-gray-800" asChild>
                <Link href="/store">
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
