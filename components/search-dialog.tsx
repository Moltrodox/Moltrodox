"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Search, X, Loader2, ShoppingBag, FileText } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Import product data and type from store page
import { productData, categories, type Product } from "@/app/store/page"

// Mock data for pages
const mockPages = [
  { id: "page-1", title: "Home", url: "/" },
  { id: "page-2", title: "Store", url: "/store" },
  { id: "page-3", title: "About Us", url: "/about" },
  { id: "page-4", title: "Contact", url: "/contact" },
  { id: "page-5", title: "Blog", url: "/blog" },
  { id: "page-6", title: "FAQ", url: "/faq" },
  { id: "page-7", title: "Shipping & Returns", url: "/shipping-returns" },
];

type SearchDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [productResults, setProductResults] = useState<Product[]>([])
  const [pageResults, setPageResults] = useState<typeof mockPages>([])
  const router = useRouter()
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Improved search function with better debounce
  const performSearch = useCallback((query: string) => {
    // Clear any pending search
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    if (query.trim() === "") {
      setProductResults([])
      setPageResults([])
      setIsLoading(false)
      return
    }
    
    setIsLoading(true)
    
    // Simulate API delay with a longer timeout for better performance
    searchTimeoutRef.current = setTimeout(() => {
      // Search products
      const filteredProducts = productData.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        (product.category && product.category.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 6) // Limit results to improve performance
      
      // Search pages
      const filteredPages = mockPages.filter(page => 
        page.title.toLowerCase().includes(query.toLowerCase())
      )
      
      setProductResults(filteredProducts)
      setPageResults(filteredPages)
      setIsLoading(false)
      searchTimeoutRef.current = null
    }, 500) // Increased debounce time for better performance
  }, [])
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])
  
  // Debounce search
  useEffect(() => {
    performSearch(searchQuery)
  }, [searchQuery, performSearch])
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Close on escape
      if (e.key === "Escape") {
        onOpenChange(false)
      }
      
      // Open on Command+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        onOpenChange(true)
      }
    }
    
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onOpenChange])
  
  // Handle navigation
  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`)
    onOpenChange(false)
  }
  
  const handlePageClick = (url: string) => {
    router.push(url)
    onOpenChange(false)
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0">
        <div className="flex items-center p-4 border-b">
          <Search className="h-5 w-5 mr-2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for products, categories, pages..."
            className="flex-1 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          {searchQuery && !isLoading && (
            <Button variant="ghost" size="icon" onClick={() => setSearchQuery("")}>
              <X className="h-5 w-5" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
          {isLoading && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
        </div>
        
        <div className="max-h-[80vh] overflow-y-auto divide-y">
          {/* Products section */}
          {productResults.length > 0 && (
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-medium">Products ({productResults.length})</h3>
              </div>
              <div className="space-y-4">
                {productResults.map((product) => (
                  <div 
                    key={product.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-200 flex-shrink-0">
                      <Image 
                        src={product.image} 
                        alt={product.name} 
                        width={48} 
                        height={48} 
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{product.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-semibold">
                          ${product.salePrice ? product.salePrice.toFixed(2) : product.price.toFixed(2)}
                        </span>
                        {product.salePrice && (
                          <span className="text-xs text-gray-500 line-through">${product.price.toFixed(2)}</span>
                        )}
                        {product.category && (
                          <Badge variant="outline" className="text-xs">
                            {product.category}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Pages section */}
          {pageResults.length > 0 && (
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-medium">Pages ({pageResults.length})</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {pageResults.map((page) => (
                  <div 
                    key={page.id}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => handlePageClick(page.url)}
                  >
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{page.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* No results */}
          {searchQuery && !isLoading && productResults.length === 0 && pageResults.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
              <p className="text-sm text-gray-500 mt-1">Try different keywords or check for typos</p>
            </div>
          )}
          
          {/* Popular searches */}
          {!searchQuery && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Popular Searches</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button 
                    key={category.slug}
                    variant="outline" 
                    size="sm" 
                    className="rounded-full" 
                    onClick={() => setSearchQuery(category.name)}
                  >
                    {category.name}
                  </Button>
                ))}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full"
                  onClick={() => setSearchQuery("rgb")}
                >
                  RGB Lighting
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full"
                  onClick={() => setSearchQuery("keycaps")}
                >
                  Keycaps
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-2 border-t text-xs text-gray-500 flex justify-between items-center">
          <span>Press ESC to close</span>
          <span>⌘K to open search</span>
        </div>
      </DialogContent>
    </Dialog>
  )
} 