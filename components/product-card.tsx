"use client"

import { Heart, ShoppingCart, Star, Info, Eye, ArrowRight, ExternalLink, BarChart, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/components/cart-provider"
import { useWishlist } from "@/components/wishlist-provider"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CartToast } from "@/components/cart-toast"

export type Product = {
  id: string
  name: string
  price: number
  salePrice?: number | null
  rating: number
  reviewCount?: number
  image: string
  category?: string
  sale?: boolean
  new?: boolean
  switchType?: string
  layout?: string
  stock?: "in-stock" | "low-stock" | "out-of-stock" | "pre-order"
  connectivity?: string
  size?: "full-size" | "tenkeyless" | "75%" | "65%" | "60%" | "40%"
  additionalImages?: string[]
  colors?: {name: string, hex: string}[]
  isNewArrival?: boolean
  similarProducts?: string[]
  description?: string
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist()
  const [currentImage, setCurrentImage] = useState(product.image)

  const handleAddToCart = () => {
    if (product.stock === "out-of-stock") {
      toast({
        title: "Product unavailable",
        description: `${product.name} is currently out of stock.`,
        variant: "destructive"
      })
      return
    }
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.image,
      switchType: product.switchType,
      layout: product.layout,
      category: product.category
    })
    
    toast({
      description: (
        <CartToast 
          productName={product.name} 
          productImage={product.image} 
          productPrice={product.salePrice || product.price} 
        />
      ),
    })
  }

  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        switchType: product.switchType,
        layout: product.layout,
        category: product.category
      })
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
  }

  const getStockLabel = () => {
    switch (product.stock) {
      case "in-stock":
        return { label: "In Stock", color: "bg-green-500" }
      case "low-stock":
        return { label: "Low Stock", color: "bg-yellow-500" }
      case "out-of-stock":
        return { label: "Out of Stock", color: "bg-red-500" }
      case "pre-order":
        return { label: "Pre-Order", color: "bg-purple-500" }
      default:
        return { label: "In Stock", color: "bg-green-500" }
    }
  }

  return (
    <TooltipProvider>
      <Card className="overflow-hidden transition-all hover:shadow-lg backdrop-blur-sm bg-white border border-gray-200 group">
        <div className="relative">
          <Link href={`/product/${product.id}`} prefetch={false}>
            <div className="aspect-square overflow-hidden">
              <Image
                src={currentImage || "/placeholder.svg"}
                alt={product.name}
                width={300}
                height={300}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
              
              {/* Badges Section */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.sale && (
                  <Badge className="bg-red-500 hover:bg-red-600">SALE</Badge>
                )}
                
                {product.stock && (
                  <Badge className={`${getStockLabel().color} hover:${getStockLabel().color}`}>
                    {getStockLabel().label}
                  </Badge>
                )}
                
                {product.isNewArrival && (
                  <Badge className="bg-blue-500 hover:bg-blue-600">NEW ARRIVAL</Badge>
                )}
              </div>
              
              {/* Wishlist indicator when item is in wishlist */}
              {isInWishlist(product.id) && (
                <div className="absolute top-2 right-2 h-8 w-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-sm">
                  <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute top-4 left-4 right-4 text-white">
                  <p className="text-sm font-medium">{product.name}</p>
                  {product.switchType && (
                    <p className="text-xs mt-1">Switch: {product.switchType}</p>
                  )}
                  {product.layout && (
                    <p className="text-xs">Layout: {product.layout}</p>
                  )}
                </div>
              </div>
            </div>
          </Link>
          
          {/* Image Thumbnails */}
          {product.additionalImages && product.additionalImages.length > 0 && (
            <div className="absolute bottom-2 left-2 flex gap-1">
              <button 
                className="w-6 h-6 rounded-md overflow-hidden border-2 border-white bg-white"
                onClick={() => setCurrentImage(product.image)}
              >
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  width={24} 
                  height={24} 
                  className="object-cover w-full h-full"
                />
              </button>
              {product.additionalImages.slice(0, 3).map((img, i) => (
                <button 
                  key={i} 
                  className="w-6 h-6 rounded-md overflow-hidden border-2 border-white bg-white"
                  onClick={() => setCurrentImage(img)}
                >
                  <Image 
                    src={img} 
                    alt={`${product.name} view ${i+1}`} 
                    width={24} 
                    height={24} 
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
              {product.additionalImages.length > 3 && (
                <div className="w-6 h-6 rounded-md bg-black/60 flex items-center justify-center text-white text-xs">
                  +{product.additionalImages.length - 3}
                </div>
              )}
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="absolute right-2 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            {/* Conditionally render wishlist button only on hover if it's already in the wishlist */}
            {!isInWishlist(product.id) && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-gray-100/90 transition-all hover:scale-110 shadow-sm"
                onClick={toggleWishlist}
              >
                <Heart className="h-5 w-5 text-gray-700" />
                <span className="sr-only">Add to wishlist</span>
              </Button>
            )}
            {/* If item is in wishlist, show remove button on hover */}
            {isInWishlist(product.id) && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-red-100/90 transition-all hover:scale-110 shadow-sm"
                onClick={toggleWishlist}
              >
                <X className="h-5 w-5 text-red-500" />
                <span className="sr-only">Remove from wishlist</span>
              </Button>
            )}
            
            {/* Quick View Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-gray-100/90 transition-all hover:scale-110 shadow-sm"
                >
                  <Eye className="h-5 w-5" />
                  <span className="sr-only">Quick view</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[725px]">
                <DialogHeader>
                  <DialogTitle>{product.name}</DialogTitle>
                  <DialogDescription>
                    {product.description || "High-quality mechanical keyboard for enthusiasts"}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative aspect-square rounded-md overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-yellow-500 mb-2">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < product.rating ? "fill-current" : "text-gray-300"}`} />
                          ))}
                        <span className="ml-1 text-xs text-gray-400">
                          {product.reviewCount ? `(${product.reviewCount})` : `(${product.rating}.0)`}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-4">
                        {product.salePrice ? (
                          <>
                            <span className="text-2xl font-bold">${product.salePrice.toFixed(2)}</span>
                            <span className="text-lg text-gray-500 line-through">${product.price.toFixed(2)}</span>
                            <span className="text-sm font-medium bg-red-100 text-red-800 rounded-full px-2 py-0.5">
                              {Math.round(((product.price - (product.salePrice || 0)) / product.price) * 100)}% off
                            </span>
                          </>
                        ) : (
                          <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        {/* Specs */}
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {product.switchType && (
                            <div>
                              <span className="font-medium">Switch Type:</span> {product.switchType}
                            </div>
                          )}
                          {product.layout && (
                            <div>
                              <span className="font-medium">Layout:</span> {product.layout}
                            </div>
                          )}
                          {product.connectivity && (
                            <div>
                              <span className="font-medium">Connectivity:</span> {product.connectivity}
                            </div>
                          )}
                          {product.size && (
                            <div>
                              <span className="font-medium">Size:</span> {product.size}
                            </div>
                          )}
                          {product.category && (
                            <div>
                              <span className="font-medium">Category:</span> {product.category}
                            </div>
                          )}
                        </div>
                        
                        {/* Color Variants */}
                        {product.colors && product.colors.length > 0 && (
                          <div>
                            <span className="font-medium text-sm">Colors:</span>
                            <div className="flex items-center gap-1 mt-1">
                              {product.colors.map((color, i) => (
                                <Tooltip key={i}>
                                  <TooltipTrigger asChild>
                                    <button
                                      className="w-6 h-6 rounded-full border border-gray-300"
                                      style={{ backgroundColor: color.hex }}
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>{color.name}</TooltipContent>
                                </Tooltip>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      {product.stock === "pre-order" ? (
                        <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                          Pre-Order Now
                        </Button>
                      ) : product.stock === "out-of-stock" ? (
                        <Button className="flex-1" disabled>
                          Out of Stock
                        </Button>
                      ) : (
                        <Button className="flex-1 bg-black hover:bg-black/90" onClick={handleAddToCart}>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                      )}
                      
                      <Button variant="outline" asChild>
                        <Link href={`/product/${product.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <CardContent className="p-4">
          <Link href={`/product/${product.id}`} prefetch={false}>
            <h3 className="font-semibold hover:underline">{product.name}</h3>
          </Link>
          
          <div className="mt-1 flex items-center gap-1 text-yellow-500">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < product.rating ? "fill-current" : "text-gray-300"}`} />
              ))}
            <span className="ml-1 text-xs text-gray-400">
              {product.reviewCount ? `(${product.reviewCount})` : `(${product.rating}.0)`}
            </span>
          </div>
          
          {/* Product Specifications */}
          <div className="mt-1 flex flex-wrap gap-1">
            {product.category && (
              <Badge variant="outline" className="text-xs">
                {product.category}
              </Badge>
            )}
            {product.switchType && (
              <Badge variant="outline" className="text-xs bg-gray-50">
                {product.switchType}
              </Badge>
            )}
            {product.layout && (
              <Badge variant="outline" className="text-xs bg-gray-50">
                {product.layout}
              </Badge>
            )}
            {product.size && (
              <Badge variant="outline" className="text-xs bg-gray-50">
                {product.size}
              </Badge>
            )}
            {product.connectivity && (
              <Badge variant="outline" className="text-xs bg-gray-50">
                {product.connectivity}
              </Badge>
            )}
          </div>
          
          {/* Color Options */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-2 flex items-center gap-1">
              <span className="text-xs text-gray-500 mr-1">Colors:</span>
              {product.colors.slice(0, 4).map((color, i) => (
                <Tooltip key={i}>
                  <TooltipTrigger asChild>
                    <div
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.hex }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>{color.name}</TooltipContent>
                </Tooltip>
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
              )}
            </div>
          )}
          
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              {product.salePrice ? (
                <>
                  <span className="text-lg font-bold">${product.salePrice.toFixed(2)}</span>
                  <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
              )}
              
              {product.salePrice && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex items-center justify-center ml-1 text-xs font-medium bg-red-100 text-red-800 rounded-full px-2 py-0.5">
                      {Math.round(((product.price - (product.salePrice || 0)) / product.price) * 100)}% off
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Save ${(product.price - (product.salePrice || 0)).toFixed(2)}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
            
            {/* Add to Cart or Pre-order Button */}
            {product.stock === "pre-order" ? (
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                Pre-Order
              </Button>
            ) : product.stock === "out-of-stock" ? (
              <Button size="sm" variant="outline" disabled>
                Out of Stock
              </Button>
            ) : (
              <Button size="sm" onClick={handleAddToCart} className="bg-black text-white hover:bg-gray-800">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add
              </Button>
            )}
          </div>
          
          {/* Bottom Actions */}
          <div className="mt-3 flex items-center justify-between text-xs">
            {/* View Similar Button */}
            {product.similarProducts && product.similarProducts.length > 0 && (
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" asChild>
                <Link href={`/store?similar=${product.id}`}>
                  <BarChart className="mr-1 h-3 w-3" />
                  Similar
                </Link>
              </Button>
            )}
            
            {/* Quick Info */}
            {(product.connectivity || product.size) && (
              <div className="flex items-center text-xs text-gray-500 ml-auto">
                <Info className="h-3 w-3 mr-1" />
                <span>
                  {product.connectivity && `${product.connectivity}`}
                  {product.connectivity && product.size && ' • '}
                  {product.size && `${product.size}`}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}
