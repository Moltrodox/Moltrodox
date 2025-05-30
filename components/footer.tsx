import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone, CreditCard, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-gray-300 w-full">
      {/* Newsletter Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto px-4 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          <div className="space-y-2 text-left md:text-left mb-4 md:mb-0 max-w-md mx-auto md:mx-0">
            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">Join Our Newsletter</h3>
            <p className="text-white/80 text-sm md:text-base">Get exclusive offers, new product announcements, and keyboard tips</p>
          </div>
          <div className="flex flex-col sm:flex-row w-full max-w-md gap-3 md:gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 pl-10 text-white placeholder:text-gray-300 focus-visible:ring-white/50 focus-visible:border-white/50 h-11 w-full"
              />
            </div>
            <Button className="bg-white text-indigo-600 hover:bg-gray-100 font-medium h-11 w-full sm:w-auto px-6">
              Subscribe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="space-y-6 md:col-span-2">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-black font-bold text-lg">K</span>
              </div>
              <h3 className="text-xl font-bold text-white">KeyboardHaven</h3>
            </div>
            <p className="max-w-xs text-gray-400">
              Premium mechanical keyboards for enthusiasts, gamers, and professionals. 
              Elevate your typing experience with our high-quality products.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">Youtube</span>
              </Link>
            </div>
            
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-indigo-400" />
                <span className="text-sm">123 Keyboard St, Tech City, TC 12345</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-indigo-400" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-indigo-400" />
                <span className="text-sm">support@keyboardhaven.com</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white pb-1 border-b border-gray-800">Shop</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <li>
                <Link href="/store" className="hover:text-white transition-colors flex items-center">
                  <span className="h-1 w-1 bg-indigo-500 rounded-full mr-2"></span>
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/store?category=mechanical" className="hover:text-white transition-colors flex items-center">
                  <span className="h-1 w-1 bg-indigo-500 rounded-full mr-2"></span>
                  Mechanical
                </Link>
              </li>
              <li>
                <Link href="/store?category=wireless" className="hover:text-white transition-colors flex items-center">
                  <span className="h-1 w-1 bg-indigo-500 rounded-full mr-2"></span>
                  Wireless
                </Link>
              </li>
              <li>
                <Link href="/store?category=gaming" className="hover:text-white transition-colors flex items-center">
                  <span className="h-1 w-1 bg-indigo-500 rounded-full mr-2"></span>
                  Gaming
                </Link>
              </li>
              <li>
                <Link href="/store?category=accessories" className="hover:text-white transition-colors flex items-center">
                  <span className="h-1 w-1 bg-indigo-500 rounded-full mr-2"></span>
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white pb-1 border-b border-gray-800">Company</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors flex items-center">
                  <span className="h-1 w-1 bg-indigo-500 rounded-full mr-2"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors flex items-center">
                  <span className="h-1 w-1 bg-indigo-500 rounded-full mr-2"></span>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors flex items-center">
                  <span className="h-1 w-1 bg-indigo-500 rounded-full mr-2"></span>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors flex items-center">
                  <span className="h-1 w-1 bg-indigo-500 rounded-full mr-2"></span>
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white pb-1 border-b border-gray-800">Support</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <li>
                <Link href="/faq" className="hover:text-white transition-colors flex items-center">
                  <span className="h-1 w-1 bg-indigo-500 rounded-full mr-2"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors flex items-center">
                  <span className="h-1 w-1 bg-indigo-500 rounded-full mr-2"></span>
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="hover:text-white transition-colors flex items-center">
                  <span className="h-1 w-1 bg-indigo-500 rounded-full mr-2"></span>
                  Warranty
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors flex items-center">
                  <span className="h-1 w-1 bg-indigo-500 rounded-full mr-2"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors flex items-center">
                  <span className="h-1 w-1 bg-indigo-500 rounded-full mr-2"></span>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/email-test" className="hover:text-white transition-colors flex items-center">
                  <span className="h-1 w-1 bg-indigo-500 rounded-full mr-2"></span>
                  Email Test
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-400">© {currentYear} KeyboardHaven. All rights reserved.</p>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-gray-400" />
              <span className="text-sm">We accept all major payment methods</span>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Using local image with white background */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
