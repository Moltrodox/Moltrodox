"use client"

import { useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Search, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Product } from "@/app/store/page"

// Product data - same as in store page
const productData = [
  {
    id: "1",
    name: "Phantom 65%",
    price: 149.99,
    salePrice: null,
    rating: 5,
    reviewCount: 127,
    image: "/placeholder.svg?height=300&width=300",
    category: "Mechanical",
    sale: false,
    new: true,
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

// Available categories
const categories = [
  { slug: "mechanical", name: "Mechanical" },
  { slug: "gaming", name: "Gaming" },
  { slug: "wireless", name: "Wireless" },
  { slug: "ergonomic", name: "Ergonomic" },
  { slug: "compact", name: "Compact" },
];

export default function CategoryPage({ params }: { params: { slug: string } }) {
  // Get the category name from slug
  const category = useMemo(() => {
    return categories.find(cat => cat.slug.toLowerCase() === params.slug.toLowerCase()) || { slug: params.slug, name: params.slug };
  }, [params.slug]);
  
  // Filter products by category
  const products = useMemo(() => {
    return productData.filter(product => 
      product.category.toLowerCase() === category.name.toLowerCase()
    );
  }, [category]);
  
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="w-full px-4 md:px-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl capitalize">{category.name} Keyboards</h1>
              <p className="max-w-[900px] mx-auto text-gray-300 md:text-xl/relaxed">
                Browse our selection of {category.name.toLowerCase()} keyboards
              </p>
            </div>
            <div className="w-full max-w-md space-y-2 mx-auto">
              <form className="flex space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    className="w-full bg-white/10 pl-8 text-white placeholder:text-gray-400 border-gray-700"
                    placeholder={`Search ${category.name} keyboards...`}
                    type="search"
                  />
                </div>
                <Button type="submit" className="bg-white text-black hover:bg-gray-200">
                  Search
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Category Content */}
      <section className="w-full py-12 md:py-8 bg-gray-50">
        <div className="w-full px-4 md:px-8">
          <div className="flex flex-col gap-8">
            {/* Back to all products */}
            <div>
              <Link href="/store">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to All Products
                </Button>
              </Link>
            </div>
            
            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <p className="text-sm text-gray-500">
                    {products.length === 0 
                      ? `No products found in ${category.name} category` 
                      : `Showing ${products.length} ${category.name} ${products.length === 1 ? 'product' : 'products'}`}
                  </p>
                </div>
              </div>

              {/* Products */}
              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                  {products.map((product) => (
                    <Link key={product.id} href={`/product/${product.id}`} prefetch={false} className="group overflow-hidden rounded-lg border">
                      <Card className="overflow-hidden transition-all hover:shadow-lg border border-gray-200">
                        <div className="relative aspect-square overflow-hidden w-full">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={300}
                            height={400}
                            className="object-cover transition-transform group-hover:scale-105 w-full h-full"
                          />
                          {product.sale && (
                            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                              SALE
                            </div>
                          )}
                          {product.new && (
                            <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
                              NEW
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <div className="space-y-1">
                            <h3 className="font-medium">{product.name}</h3>
                            <div className="flex items-center gap-1 text-sm text-yellow-500">
                              {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < product.rating ? "fill-current" : "text-gray-300"}`}
                                  />
                                ))}
                              <span className="text-gray-500 text-xs">({product.reviewCount})</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                {product.salePrice ? (
                                  <div className="flex items-center gap-1">
                                    <span className="font-bold">${product.salePrice}</span>
                                    <span className="text-sm text-gray-500 line-through">${product.price}</span>
                                  </div>
                                ) : (
                                  <span className="font-bold">${product.price}</span>
                                )}
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {product.category}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-gray-100 p-4 mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">No products found</h3>
                  <p className="text-gray-500 mb-6">
                    We couldn't find any products in the {category.name} category.
                  </p>
                  <Link href="/store">
                    <Button>Browse All Products</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 