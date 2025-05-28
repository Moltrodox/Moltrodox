"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Sample featured products
const featuredProducts = [
  {
    id: "1",
    name: "Keychron K2 Pro",
    description: "Wireless mechanical keyboard with hot-swappable switches",
    price: 89.99,
    image: "/images/keyboards/keychron-k2.jpg",
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Ducky One 3",
    description: "Premium mechanical keyboard with PBT keycaps",
    price: 119.99,
    image: "/images/keyboards/ducky-one-3.jpg",
    badge: "New Arrival",
  },
  {
    id: "3",
    name: "GMMK Pro",
    description: "Customizable mechanical keyboard with aluminum case",
    price: 169.99,
    image: "/images/keyboards/gmmk-pro.jpg",
    badge: "Premium",
  },
]

// Hero carousel images
const heroSlides = [
  {
    id: 1,
    title: "Keychron K8 Pro",
    image: "/images/keyboard-banner.jpg",
    badge: "Best Seller",
    cta: "/products/keychron-k8-pro",
  },
  {
    id: 2,
    title: "RGB Mechanical Keyboards",
    image: "/images/keyboard-banner-2.jpg",
    badge: "New Collection",
    cta: "/collections/rgb-keyboards",
  },
  {
    id: 3,
    title: "Custom Keycap Sets",
    image: "/images/keyboard-banner-3.jpg",
    badge: "Premium",
    cta: "/collections/keycaps",
  },
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))
  }

  return (
    <main className="flex flex-col">
      {/* Hero Section - Full Height with Carousel */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        {/* Background Images Carousel */}
        {heroSlides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
        
        {/* Carousel Controls */}
        <button 
          onClick={goToPrevSlide}
          className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button 
          onClick={goToNextSlide}
          className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 space-x-2">
          {heroSlides.map((slide, index) => (
            <button
              key={`indicator-${slide.id}`}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-8 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/30"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Why Choose KeyboardHaven</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg">
              We provide the highest quality mechanical keyboards and accessories with exceptional service
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Premium Quality",
                description: "We source only the finest keyboards and components from reputable manufacturers",
                icon: (
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                ),
              },
              {
                title: "Expert Support",
                description: "Our team of keyboard enthusiasts is always ready to help with your questions",
                icon: (
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                      <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                    </svg>
                  </div>
                ),
              },
              {
                title: "Fast Shipping",
                description: "We offer quick delivery with careful packaging to ensure your keyboard arrives safely",
                icon: (
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19" />
                      <line x1="23" y1="13" x2="23" y2="11" />
                      <line x1="11" y1="6" x2="7" y2="18" />
                      <line x1="9" y1="6" x2="5" y2="18" />
                      <line x1="13" y1="6" x2="17" y2="18" />
                    </svg>
                  </div>
                ),
              },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                {feature.icon}
                <h3 className="mb-2 text-xl font-medium">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Featured Products</h2>
              <p className="max-w-[500px] text-gray-500 md:text-lg">
                Explore our handpicked selection of premium mechanical keyboards
              </p>
            </div>
            <Button variant="link" size="lg" className="hidden md:flex" asChild>
              <Link href="/store">
                View All Products <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <div key={product.id} className="flex flex-col rounded-lg border bg-white shadow">
                <div className="relative h-64   -full overflow-hidden rounded-t-lg">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                  {product.badge && (
                    <Badge className="absolute right-2 top-2">{product.badge}</Badge>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="mb-2 text-xl font-medium">{product.name}</h3>
                  <p className="mb-4 flex-1 text-gray-500">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                    <Button asChild>
                      <Link href={`/product/${product.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Button variant="link" size="lg" asChild>
              <Link href="/store">
                View All Products <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
