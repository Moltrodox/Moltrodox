"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ChevronLeft, ShoppingCart, Star, Check, XCircle, Package, Truck, CalendarClock, Shield, Minus, Plus, ThumbsUp, MessageCircle, ChevronRight } from "lucide-react"
import { supabase } from '@/lib/supabase'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/components/cart-provider"


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard, type Product } from "@/components/product-card"
import { CartToast } from "@/components/cart-toast"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

export default function ProductPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const { toast } = useToast()
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.id) return

      try {
        setLoading(true)
        setError(null)

        const { data: product, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', params.id)
          .single()

        if (error) {
          console.error('Error fetching product:', error)
          setError('Product not found')
          toast({
            title: "Product not found",
            description: "The requested product could not be found.",
            variant: "destructive"
          })
          router.push('/store')
          return
        }

        if (!product) {
          setError('Product not found')
          toast({
            title: "Product not found",
            description: "The requested product could not be found.",
            variant: "destructive"
          })
          router.push('/store')
          return
        }

        setProduct(product)
        setSelectedImage(product.image)

        // Fetch related products from the same category
        const { data: related } = await supabase
          .from('products')
          .select('*')
          .eq('category', product.category)
          .neq('id', product.id)
          .limit(4)

        setRelatedProducts(related || [])
      } catch (error) {
        console.error('Error:', error)
        setError('An error occurred while fetching the product')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id, router, toast])

  const handleAddToCart = () => {
    if (!product) return
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.image,
      category: product.category,
      quantity: quantity,
      cartItemId: `${product.id}-${Date.now()}`
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
  


  const incrementQuantity = () => {
    setQuantity((prev: number) => prev + 1)
  }
  
  const decrementQuantity = () => {
    setQuantity((prev: number) => (prev > 1 ? prev - 1 : 1))
  }
  
  if (loading || !product) {
    return (
      <div className="container mx-auto py-10 min-h-screen flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">{error || 'Loading product...'}</h2>
          <p className="text-muted-foreground">Please wait while we fetch the product details.</p>
        </div>
      </div>
    )
  }

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      author: "Alex Johnson",
      rating: 5,
      date: "2 months ago",
      title: "Excellent keyboard for daily use",
      content: "I've been using this keyboard for two months now and it has exceeded my expectations. The keys have a satisfying click and the build quality is exceptional.",
      helpful: 24,
      verified: true
    },
    {
      id: 2,
      author: "Sam Taylor",
      rating: 4,
      date: "3 weeks ago",
      title: "Great value for money",
      content: "The keyboard feels premium and types well. Only giving 4 stars because the RGB lighting could be brighter.",
      helpful: 12,
      verified: true
    },
    {
      id: 3,
      author: "Jamie Lee",
      rating: 5,
      date: "1 month ago",
      title: "Perfect for gaming and typing",
      content: "The switches are responsive and the keyboard has a solid weight to it. No flex in the chassis at all. Highly recommend for both gaming and office work.",
      helpful: 18,
      verified: true
    }
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-10 min-h-screen">
      <div className="mb-6 flex flex-col space-y-3 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/store">Store</BreadcrumbLink>
            </BreadcrumbItem>
            {product.category && (
              <>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/category/${product.category.toLowerCase()}`}>{product.category}</BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <span className="text-gray-500 cursor-default truncate max-w-[200px] inline-block align-bottom">{product.name}</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <Button variant="ghost" onClick={() => router.back()} className="self-start">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden border bg-white">
            <Image
              src={selectedImage || product.image}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          
          <div className="flex gap-2 overflow-auto pb-2">
            <button
              onClick={() => setSelectedImage(product.image)}
              className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                selectedImage === product.image ? "border-black" : "border-transparent"
              }`}
                  >
                    <Image
                      src={product.image}
                alt={product.name}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </button>
            
            {product.additionalImages?.map((img: string, i: number) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                  selectedImage === img ? "border-black" : "border-transparent"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} view ${i+1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
          <div>
            {product.category && (
              <Link href={`/category/${product.category.toLowerCase()}`} className="text-sm text-blue-600 hover:underline">
                {product.category}
              </Link>
            )}
            <h1 className="text-3xl font-bold mt-1">{product.name}</h1>
            
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                    className={`h-4 w-4 ${i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                  </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount || 0} reviews)
              </span>
            </div>
                </div>
          
          <div className="flex items-baseline gap-2">
                  {product.salePrice ? (
                    <>
                <span className="text-3xl font-bold">${product.salePrice.toFixed(2)}</span>
                <span className="text-xl text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                <Badge className="ml-2 bg-red-500">SALE</Badge>
                <span className="text-sm text-red-600 font-medium">
                  Save ${(product.price - product.salePrice).toFixed(2)} ({Math.round(((product.price - product.salePrice) / product.price) * 100)}%)
                </span>
                    </>
                  ) : (
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                  )}
            
            {product.new && <Badge className="ml-2 bg-blue-500">NEW</Badge>}
              </div>

              <Separator />

              <div className="space-y-4">
            {/* Stock Status */}
                  <div className="flex items-center gap-2">
              {product.stock === "in-stock" || !product.stock ? (
                <>
              <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
                  </div>
              <span>In stock and ready to ship</span>
                </>
              ) : product.stock === "low-stock" ? (
                <>
                  <div className="w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span>Low stock - order soon</span>
                </>
              ) : product.stock === "out-of-stock" ? (
                <>
                  <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                    <XCircle className="h-3 w-3 text-white" />
                  </div>
                  <span>Out of stock</span>
                </>
              ) : (
                <>
                  <div className="w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span>Available for pre-order</span>
                </>
              )}
                </div>

            {/* Shipping & Returns */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center p-3 border rounded-lg">
                <Package className="h-5 w-5 mb-1" />
                <span className="text-xs text-center">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 border rounded-lg">
                <Truck className="h-5 w-5 mb-1" />
                <span className="text-xs text-center">2-3 Day Delivery</span>
                  </div>
              <div className="flex flex-col items-center justify-center p-3 border rounded-lg">
                <CalendarClock className="h-5 w-5 mb-1" />
                <span className="text-xs text-center">30-Day Returns</span>
                  </div>
                </div>

            {/* Color Options */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium">Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color, i) => (
                    <button
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-black transition-colors"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-2">
              <h3 className="font-medium">Quantity</h3>
              <div className="flex items-center w-32">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 rounded-r-none"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <div className="h-8 w-12 flex items-center justify-center border-y">
                  {quantity}
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 rounded-l-none"
                  onClick={incrementQuantity}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-3 mt-6">
              <Button 
                onClick={handleAddToCart} 
                className="flex-1"
                disabled={product.stock === "out-of-stock"}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {product.stock === "pre-order" ? "Pre-Order Now" : "Add to Cart"}
              </Button>
            </div>

            {/* Warranty Info */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-4">
              <Shield className="h-4 w-4" />
              <span>1-Year Manufacturer Warranty</span>
            </div>
          </div>
                </div>
              </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-4">Product Description</h2>
              <p className="text-gray-700">
              {product.description || `The ${product.name} is a high-quality keyboard designed for optimal typing experience. 
              Featuring premium switches and a durable construction, this keyboard is perfect for both casual users and professionals.
              Enhance your desk setup with this stylish and functional keyboard.`}
            </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-2">Key Features</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Premium build quality with {product.layout || "standard"} layout</li>
                <li>{product.switchType || "Mechanical"} switches for responsive typing</li>
                <li>Customizable RGB lighting effects</li>
                <li>Multi-device connectivity options</li>
                <li>Ergonomic design for comfortable typing</li>
              </ul>
                      </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Technical Specifications</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          {product.switchType && (
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Switch Type</span>
                    <span>{product.switchType}</span>
            </div>
          )}
          
          {product.layout && (
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Layout</span>
                    <span>{product.layout}</span>
                      </div>
                    )}
          
          {product.connectivity && (
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Connectivity</span>
                    <span>{product.connectivity}</span>
                  </div>
                )}
                
                {product.size && (
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Size</span>
                    <span>{product.size}</span>
                  </div>
                )}
                
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Backlight</span>
                  <span>RGB (16.8 million colors)</span>
                </div>
                
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Material</span>
                  <span>Aluminum / PBT</span>
                </div>
                
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Battery Life</span>
                  <span>Up to 72 hours</span>
                </div>
                
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Dimensions</span>
                  <span>360 × 140 × 40 mm</span>
                </div>
                
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Weight</span>
                  <span>900g</span>
                </div>
                
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Warranty</span>
                  <span>1 Year</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Customer Reviews</h2>
                <Button>Write a Review</Button>
              </div>
              
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                <div className="text-center">
                  <div className="text-4xl font-bold">{product.rating}.0</div>
                  <div className="flex mt-1 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Based on {product.reviewCount || reviews.length} reviews
                  </div>
                </div>
                
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2">
                      <div className="text-sm w-2">{star}</div>
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full" 
                          style={{ 
                            width: `${star === product.rating ? "70%" : star === product.rating - 1 ? "20%" : "10%"}` 
                          }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {star === product.rating ? "70%" : star === product.rating - 1 ? "20%" : "10%"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              {/* Individual Reviews */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex justify-between">
            <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{review.author}</span>
                          {review.verified && (
                            <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    <h4 className="font-medium mt-2">{review.title}</h4>
                    <p className="text-gray-600 mt-1">{review.content}</p>
                    
                    <div className="flex items-center gap-4 mt-3">
                      <Button variant="ghost" size="sm" className="h-8 text-xs">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        Helpful ({review.helpful})
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 text-xs">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Comment
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="shipping" className="mt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Shipping Information</h3>
                <p className="mt-2 text-gray-600">
                  We offer free standard shipping on all orders over $100. Orders typically ship within 1-2 business days.
                  Delivery times vary by location, but most domestic orders arrive within 2-5 business days after shipping.
                </p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Standard Shipping</span>
                    <span>2-5 business days</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Express Shipping</span>
                    <span>1-2 business days</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">International Shipping</span>
                    <span>7-14 business days</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">Return Policy</h3>
                <p className="mt-2 text-gray-600">
                  We offer a 30-day return policy on all products. If you're not completely satisfied with your purchase,
                  you can return it within 30 days of delivery for a full refund or exchange.
                </p>
                
                <ul className="list-disc pl-5 mt-4 space-y-1 text-gray-600">
                  <li>Items must be in original condition with all packaging and accessories</li>
                  <li>Return shipping costs are the responsibility of the customer unless the item is defective</li>
                  <li>Refunds are processed within 5-7 business days after we receive the returned item</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Related Products</h2>
            <Button variant="outline" asChild>
              <Link href={`/store?category=${product.category}`}>
                View More
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
