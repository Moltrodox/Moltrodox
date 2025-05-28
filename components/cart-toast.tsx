"use client"

import { ShoppingCart, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface CartToastProps {
  productName: string
  productImage?: string
  productPrice: number
}

export function CartToast({ productName, productImage, productPrice }: CartToastProps) {
  return (
    <div className="flex items-center">
      <div className="flex items-center gap-3 flex-1">
        <div className="bg-green-100 rounded-full p-2">
          <ShoppingCart className="h-5 w-5 text-green-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {productImage && (
              <div className="relative h-10 w-10 overflow-hidden rounded bg-gray-100">
                <Image
                  src={productImage}
                  alt={productName}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p className="font-medium">{productName} added to cart</p>
              <p className="text-sm text-gray-500">${productPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
      <Button size="sm" variant="outline" asChild className="ml-3">
        <Link href="/cart" className="flex items-center gap-1">
          View Cart
          <ArrowRight className="h-3 w-3" />
        </Link>
      </Button>
    </div>
  )
} 