"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Star, Eye, ShoppingCart, Heart } from "lucide-react"
import { supabase } from '@/lib/supabase'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { SearchDialog } from "@/components/search-dialog"

import { useCart } from "@/components/cart-provider"
import { useWishlist } from "@/components/wishlist-provider"
import { useToast } from "@/components/ui/use-toast"
import { CartToast } from "@/components/cart-toast"

// Define product type
export interface Product {
  id: string
  name: string
  price: number
  salePrice?: number | null
  rating: number
  reviewCount: number
  image: string
  category: string
  sale?: boolean
  new?: boolean
  switchType?: string
  layout?: string
  connectivity?: string
  description?: string
  additionalImages?: string[]
  stock?: "in-stock" | "low-stock" | "out-of-stock" | "pre-order"
  isNewArrival?: boolean
}

// Available categories
export const categories = [
  { slug: "mechanical", name: "Mechanical" },
  { slug: "gaming", name: "Gaming" },
  { slug: "wireless", name: "Wireless" },
  { slug: "ergonomic", name: "Ergonomic" },
  { slug: "compact", name: "Compact" },
];

// Product data will be fetched from Supabase
const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    try {
      const { data: productsData, error: supabaseError } = await supabase
        .from('products')
        .select('*')

      if (supabaseError) {
        setError('Failed to load products')
        console.error('Error fetching products:', supabaseError)
        return
      }

      if (!productsData || productsData.length === 0) {
        setError('No products found')
        return
      }

      // Transform the data to match Product interface
      const transformedProducts = productsData.map(p => ({
        id: p.id,
        name: p.name,
        price: Number(p.price),
        salePrice: p.sale_price ? Number(p.sale_price) : null,
        rating: Number(p.rating),
        reviewCount: p.review_count,
        image: '/placeholder.svg',  // Always use placeholder for now
        category: p.category,
        sale: p.sale,
        new: p.new,
        switchType: p.switch_type,
        layout: p.layout,
        connectivity: p.connectivity,
        description: p.description,
        additionalImages: ['/placeholder.svg', '/placeholder.svg'],  // Always use placeholders
        stock: p.stock,
        isNewArrival: p.is_new_arrival
      }))

      setProducts(transformedProducts)
      setError(null)
    } catch (error) {
      setError('An unexpected error occurred')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return { products, loading, error, refetch: fetchProducts }
}

// Fetch products from Supabase
export const getProducts = async () => {
  const { data: productsData, error } = await supabase
    .from('products')
    .select('*')

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  // Transform the data to match Product interface
  return productsData?.map(p => ({
    id: p.id,
    name: p.name,
    price: Number(p.price),
    salePrice: p.sale_price ? Number(p.sale_price) : null,
    rating: Number(p.rating),
    reviewCount: p.review_count,
    image: p.image,
    category: p.category,
    sale: p.sale,
    new: p.new,
    switchType: p.switch_type,
    layout: p.layout,
    connectivity: p.connectivity,
    description: p.description,
    additionalImages: p.additional_images,
    stock: p.stock,
    isNewArrival: p.is_new_arrival
  })) || []
}

// Initial product data
export const productData: Product[] = [
  {
    id: "1",
    name: "Phantom 65%",
    price: 149.99,
    salePrice: null,
    rating: 4.5,
    reviewCount: 12,
    image: "/images/keyboards/phantom-65.jpg",
    category: "mechanical",
    sale: false,
    new: true,
    switchType: "Cherry MX Brown",
    layout: "65%",
    connectivity: "USB-C",
    description: "The Phantom 65% is our flagship mechanical keyboard with premium PBT keycaps, aluminum frame, and customizable RGB lighting. The 65% layout offers a compact design without sacrificing essential keys like arrows and navigation.",
    additionalImages: [
      "/placeholder.svg?height=300&width=300&text=Side+View",
      "/placeholder.svg?height=300&width=300&text=RGB+Lighting",
      "/placeholder.svg?height=300&width=300&text=Keys+Detail"
    ],
    stock: "in-stock",
    isNewArrival: true
  },
  {
    id: "2",
    name: "Stealth TKL",
    price: 129.99,
    salePrice: 99.99,
    rating: 4,
    reviewCount: 84,
    image: "/placeholder.svg?height=300&width=300",
    category: "Gaming",
    sale: true,
    new: false,
    switchType: "Cherry MX Red",
    layout: "Tenkeyless",
    connectivity: "USB-C/Bluetooth",
    description: "Designed specifically for gamers, the Stealth TKL features Cherry MX Red linear switches for rapid actuation, programmable macro keys, and anti-ghosting technology. The tenkeyless design gives you more desk space for mouse movement.",
    additionalImages: [
      "/placeholder.svg?height=300&width=300&text=RGB+Mode",
      "/placeholder.svg?height=300&width=300&text=Back+Panel",
      "/placeholder.svg?height=300&width=300&text=Profile+View"
    ],
    stock: "low-stock",
    isNewArrival: false
  },
  {
    id: "3",
    name: "Apex Pro",
    price: 199.99,
    salePrice: null,
    rating: 5,
    reviewCount: 212,
    image: "/placeholder.svg?height=300&width=300",
    category: "Mechanical",
    sale: false,
    new: false,
    switchType: "OmniPoint Adjustable",
    layout: "Full-size",
    connectivity: "USB-C",
    description: "The Apex Pro is our most advanced keyboard featuring adjustable mechanical switches that allow you to customize the actuation point for each key. With an OLED smart display, premium magnetic wrist rest, and aircraft-grade aluminum frame, this is the ultimate typing experience.",
    additionalImages: [
      "/placeholder.svg?height=300&width=300&text=OLED+Display",
      "/placeholder.svg?height=300&width=300&text=Wrist+Rest",
      "/placeholder.svg?height=300&width=300&text=Media+Controls",
      "/placeholder.svg?height=300&width=300&text=Key+Detail"
    ],
    stock: "in-stock",
    isNewArrival: false
  },
  {
    id: "4",
    name: "Wireless Freedom",
    price: 159.99,
    salePrice: null,
    rating: 4,
    reviewCount: 56,
    image: "/placeholder.svg?height=300&width=300",
    category: "Wireless",
    sale: false,
    new: true,
  },
  {
    id: "5",
    name: "Compact 60%",
    price: 89.99,
    salePrice: 79.99,
    rating: 4,
    reviewCount: 42,
    image: "/placeholder.svg?height=300&width=300",
    category: "Compact",
    sale: true,
    new: false,
  },
  {
    id: "6",
    name: "Ergo Split",
    price: 219.99,
    salePrice: null,
    rating: 5,
    reviewCount: 31,
    image: "/placeholder.svg?height=300&width=300",
    category: "Ergonomic",
    sale: false,
    new: true,
  },
  {
    id: "7",
    name: "Tactile Pro",
    price: 169.99,
    salePrice: null,
    rating: 4,
    reviewCount: 78,
    image: "/placeholder.svg?height=300&width=300",
    category: "Mechanical",
    sale: false,
    new: false,
  },
  {
    id: "8",
    name: "Silent Type",
    price: 139.99,
    salePrice: 119.99,
    rating: 4,
    reviewCount: 63,
    image: "/placeholder.svg?height=300&width=300",
    category: "Mechanical",
    sale: true,
    new: false,
  },
  {
    id: "9",
    name: "RGB Master",
    price: 179.99,
    salePrice: null,
    rating: 4,
    reviewCount: 92,
    image: "/placeholder.svg?height=300&width=300",
    category: "Gaming",
    sale: false,
    new: false,
  },
] as Product[];



export default function StorePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const { products, loading, error, refetch } = useProducts()
  const { addItem: addToCart } = useCart()
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist()
  const { toast } = useToast()

  if (error) {
    return (
      <div className="container mx-auto py-10 px-4 md:px-6">
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Products</h2>
          <p className="text-gray-600">{error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }


  
  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.image,
      switchType: product.switchType,
      layout: product.layout,
      category: product.category,
      quantity: 1
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
  
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Products</h1>
              <p className="max-w-[900px] mx-auto text-gray-300 md:text-xl/relaxed">
                Discover our premium selection of mechanical keyboards
              </p>
            </div>
            <div className="w-full max-w-2xl space-y-2 mx-auto">
              <Button 
                onClick={() => setIsSearchOpen(true)}
                className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 text-white border-gray-700 h-10 px-4 py-2"
              >
                <div className="flex items-center">
                  <Search className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-gray-400">Search keyboards...</span>
                </div>
                <span className="text-xs text-gray-400">⌘K</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Store */}
      <section className="w-full py-4 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col gap-2">
            {/* Categories Carousel */}
            <div className="relative mb-8 overflow-hidden">
              <div className="flex overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex space-x-3 ">
                  <Link href="/store">
                    <Button 
                      variant="outline" 
                      className="whitespace-nowrap rounded-md bg-red-100"
                    > 
                      All Products
                    </Button>
                  </Link>
                  {categories.map((category) => (
                    <Link key={category.slug} href={`/category/${category.slug}`}>
                      <Button 
                        variant="outline" 
                        className="whitespace-nowrap rounded-md hover:bg-gray-100"
                      >
                        {category.name}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
              <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
                .scrollbar-hide {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `}</style>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Showing {products.length} products</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="featured">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="rating">Top Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Products */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                  <Link key={product.id} href={`/product/${product.id}`} prefetch={false} className="group overflow-hidden rounded-lg border">
                    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-200 h-full flex flex-col">
                      <div className="relative aspect-square overflow-hidden rounded-t-md bg-gray-100">
                        {product.stock === "out-of-stock" && (
                          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60">
                            <p className="font-medium text-white px-3 py-1 rounded-md backdrop-blur-sm">Out of Stock</p>
                          </div>
                        )}
                        {product.stock === "pre-order" && (
                          <div className="absolute inset-0 z-10 flex items-center justify-center bg-indigo-500/60">
                            <p className="font-medium text-white px-3 py-1 rounded-md backdrop-blur-sm">Pre-Order</p>
                          </div>
                        )}
                        {product.salePrice && (
                          <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                            SALE
                          </div>
                        )}
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          loading="lazy"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                       
                      </div>
                      <CardContent className="container mx-auto px-4 md:px-6 p-4 flex-grow flex flex-col justify-between">
                        <div className="space-y-2">
                          <h3 className="font-medium line-clamp-2 h-12">{product.name}</h3>
                          <div className="flex items-center gap-2 max-w-3xl mx-auto">
                            <div className="relative flex-1">
                              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                              <Input
                                type="search"
                                placeholder="Search keyboards..."
                                className="pl-8 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                onClick={() => setIsSearchOpen(true)}
                              />
                            </div>
                            <Button
                              variant="outline"
                              className="hidden sm:flex border-white/20 text-white hover:bg-white/10"
                              onClick={() => setIsSearchOpen(true)}
                            >
                              <span className="sr-only">Search</span>
                              <kbd className="pointer-events-none ml-2 select-none rounded border bg-white/10 px-1.5 font-mono text-[10px] font-medium text-gray-400">
                                ⌘K
                              </kbd>
                            </Button>
                          </div>
                          <div className="flex items-center justify-between pt-2">
                            <div>
                              {product.salePrice ? (
                                <div className="flex items-center gap-1">
                                  <span className="font-bold text-red-600">${product.salePrice}</span>
                                  <span className="text-sm text-gray-500 line-through">${product.price}</span>
                                </div>
                              ) : (
                                <span className="font-bold">${product.price}</span>
                              )}
                            </div>
                            <Link href={`/category/${product.category.toLowerCase()}`}>
                              <Badge className="text-xs hover:bg-gray-100 cursor-pointer transition-colors">
                                {product.category}
                              </Badge>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 border-t border-gray-100 mt-auto">
                        <Button className="w-full hover:bg-black hover:text-white transition-colors">
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Dialog */}
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </div>
  )
}
