  "use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"


// Hero carousel images
const heroSlides = [
  {
    id: 1,
    title: "Keychron K8 Pro",
    image: "/sitelogo.jpg",
    badge: "Best Seller",
    cta: "/products/keychron-k8-pro",
  },
  {
    id: 2,
    title: "RGB Mechanical Keyboards",
    image: "/sitelogo.jpg",
    badge: "New Collection",
    cta: "/collections/rgb-keyboards",
  },
  {
    id: 3,
    title: "Custom Keycap Sets",
    image: "/sitelogo.jpg",
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
      <section className="py-16 md:py-24 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Premium Quality",
                description: "We source only the finest keyboards and components from reputable manufacturers",
                icon: (
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-200">
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
                      className="h-5 w-5"
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
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-200">
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
                      className="h-5 w-5"
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
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-200">
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
                      className="h-5 w-5"
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
              <div key={i} className="p-6 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-4 mb-3">
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


    </main>
  )
}
