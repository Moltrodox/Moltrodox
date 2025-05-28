"use client"

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
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

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart()
  const { toast } = useToast()
  
  // Debug: Log cart items
  useEffect(() => {
    console.log("Current cart items:", items);
  }, [items]);

  const handleQuantityChange = (cartItemId: string, quantity: number) => {
    updateQuantity(cartItemId, quantity)
  }
  
  const handleRemoveItem = (itemId: string) => {
    console.log("Removing item with ID:", itemId);
    removeItem(itemId);
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="w-full max-w-[2000px] mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Your Cart</h1>
              <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed">
                Review your items and proceed to checkout
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="w-full max-w-[2000px] mx-auto px-4 md:px-8">
          {items.length > 0 ? (
            <div className="grid gap-10 lg:grid-cols-12">
              {/* Cart Items */}
              <div className="lg:col-span-8">
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Product</TableHead>
                        <TableHead className="hidden md:table-cell">Description</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((item) => (
                        <TableRow key={item.cartItemId || item.id}>
                          <TableCell>
                            <div className="w-[80px] h-[80px] relative rounded-md overflow-hidden">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="space-y-1">
                              <h3 className="font-medium">{item.name}</h3>
                              <div className="text-sm text-gray-500">
                                {item.switchType && <p>Switch: {item.switchType}</p>}
                                {item.layout && <p>Layout: {item.layout}</p>}
                                {item.category && <p>Category: {item.category}</p>}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center border border-gray-200 rounded-md w-min">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none"
                                onClick={() => handleQuantityChange(item.cartItemId || item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                                <span className="sr-only">Decrease quantity</span>
                              </Button>
                              <span className="w-8 text-center text-sm">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none"
                                onClick={() => handleQuantityChange(item.cartItemId || item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                                <span className="sr-only">Increase quantity</span>
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => handleRemoveItem(item.cartItemId || item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove item</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Coupon code"
                      className="max-w-[200px]"
                    />
                    <Button variant="outline">Apply</Button>
                  </div>
                  <Button variant="outline" asChild>
                    <Link href="/store">Continue Shopping</Link>
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-4">
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold">Order Summary</h3>
                    <Separator className="my-4" />
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Shipping</span>
                        <span>{subtotal >= 100 ? "Free" : "$9.99"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Tax</span>
                        <span>${(subtotal * 0.07).toFixed(2)}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${(subtotal + (subtotal >= 100 ? 0 : 9.99) + subtotal * 0.07).toFixed(2)}</span>
                      </div>
                    </div>
                    <Button className="mt-6 w-full bg-black text-white hover:bg-gray-800" asChild>
                      <Link href="/checkout">
                        Proceed to Checkout
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <div className="mt-4 text-center text-xs text-gray-500">
                      <p>Secure checkout powered by Stripe</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5 text-gray-400" />
                      <span className="font-medium">Shipping</span>
                    </div>
                    <span className="text-sm text-gray-500">Free over $100</span>
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2 text-sm text-gray-500">
                    <p>Estimated delivery: 3-5 business days</p>
                    <p>Free returns within 30 days</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-gray-100 p-6">
                <ShoppingBag className="h-10 w-10 text-gray-400" />
              </div>
              <h2 className="mt-4 text-2xl font-semibold">Your cart is empty</h2>
              <p className="mt-2 text-gray-500">Looks like you haven't added any items to your cart yet.</p>
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
