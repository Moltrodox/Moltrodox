"use client"

import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RelatedProductsProps {
  category?: string
  currentProductId?: string
}

export default function RelatedProducts({ category = "all", currentProductId }: RelatedProductsProps) {
  // Filter products by category and exclude current product
  const filteredProducts = mockProducts
    .filter(product => category === "all" || product.category.toLowerCase() === category.toLowerCase())
    .filter(product => product.id !== currentProductId)
    .slice(0, 4) // Show only 4 related products

  if (filteredProducts.length === 0) {
    return null
  }

  return (
    <section className="w-full py-12">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} prefetch={false} className="group">
              <Card className="overflow-hidden transition-all hover:shadow-lg border border-gray-200">
                <div className="relative aspect-square overflow-hidden w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  {product.discount > 0 && (
                    <Badge className="absolute top-2 right-2 bg-red-500">-{product.discount}%</Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-base line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">${product.price.toFixed(2)}</span>
                      {product.discount > 0 && (
                        <span className="text-sm text-gray-500 line-through">
                          ${((product.price * 100) / (100 - product.discount)).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// Mock data for related products
const mockProducts = [
  {
    id: "1",
    name: "Mechanical Keyboard RGB",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Mechanical",
    rating: 4.5,
    reviews: 127,
    discount: 10,
  },
  {
    id: "2",
    name: "Wireless Gaming Keyboard",
    price: 149.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Wireless",
    rating: 4.2,
    reviews: 98,
    discount: 0,
  },
  {
    id: "3",
    name: "Compact 60% Keyboard",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Mechanical",
    rating: 4.8,
    reviews: 156,
    discount: 15,
  },
  {
    id: "4",
    name: "Ergonomic Split Keyboard",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Ergonomic",
    rating: 4.6,
    reviews: 72,
    discount: 0,
  },
  {
    id: "5",
    name: "Low Profile Mechanical Keyboard",
    price: 119.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Mechanical",
    rating: 4.3,
    reviews: 89,
    discount: 5,
  },
]