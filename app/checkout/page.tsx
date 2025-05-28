"use client"

import type React from "react"

import { useState } from "react"
import { Check, CreditCard, ShoppingBag, Info } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/components/ui/use-toast"

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const { toast } = useToast()
  const [step, setStep] = useState<"shipping" | "payment" | "confirmation">("shipping")

  const shipping = subtotal >= 100 ? 0 : 10
  const tax = subtotal * 0.07
  const total = subtotal + shipping + tax

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("payment")
    window.scrollTo(0, 0)
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("confirmation")
    clearCart()
    window.scrollTo(0, 0)
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase. Your order has been confirmed.",
    })
  }

  if (items.length === 0 && step !== "confirmation") {
    return (
      <div className="container px-4 py-12 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="rounded-full bg-gradient-to-r from-gray-100 to-gray-200 p-6">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Your cart is empty</h2>
            <p className="text-muted-foreground">You need to add items to your cart before proceeding to checkout.</p>
          </div>
          <Link href="/store">
            <Button className="mt-4 bg-black text-white hover:bg-gray-800">Browse Products</Button>
          </Link>
        </div>
      </div>
    )
  }
  return (
    <div className="container w-full px-4 py-8 md:px-6 md:py-12">
      <div className="w-full mx-auto">
        {/* Checkout Steps */}
        <div className="mb-8 backdrop-blur-sm bg-white/80 p-6 rounded-xl border border-gray-200/50 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  step === "shipping" || step === "payment" || step === "confirmation"
                    ? "bg-black text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step === "payment" || step === "confirmation" ? <Check className="h-5 w-5" /> : 1}
              </div>
              <span className="mt-2 text-sm font-medium">Shipping</span>
            </div>
            <div className="flex-1 border-t-2"></div>
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  step === "payment" || step === "confirmation"
                    ? "bg-black text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step === "confirmation" ? <Check className="h-5 w-5" /> : 2}
              </div>
              <span className="mt-2 text-sm font-medium">Payment</span>
            </div>
            <div className="flex-1 border-t-2"></div>
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  step === "confirmation" ? "bg-black text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                3
              </div>
              <span className="mt-2 text-sm font-medium">Confirmation</span>
            </div>
          </div>
        </div>

        {/* Shipping Step */}
        {step === "shipping" && (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card className="backdrop-blur-sm bg-white/80 border border-gray-200/50 shadow-sm">
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                  <CardDescription>Enter your shipping details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleShippingSubmit} className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" className="backdrop-blur-sm bg-white/50" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" className="backdrop-blur-sm bg-white/50" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" className="backdrop-blur-sm bg-white/50" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" className="backdrop-blur-sm bg-white/50" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" className="backdrop-blur-sm bg-white/50" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="landmark">Landmark</Label>
                      <Input id="landmark" className="backdrop-blur-sm bg-white/50" placeholder="Nearby landmark for easy delivery" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" className="backdrop-blur-sm bg-white/50" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select defaultValue="ca">
                          <SelectTrigger id="state" className="backdrop-blur-sm bg-white/50">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent className="backdrop-blur-md bg-white/90 border border-gray-200/50">
                            <SelectItem value="ca">California</SelectItem>
                            <SelectItem value="ny">New York</SelectItem>
                            <SelectItem value="tx">Texas</SelectItem>
                            <SelectItem value="fl">Florida</SelectItem>
                            <SelectItem value="il">Illinois</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" className="backdrop-blur-sm bg-white/50" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select defaultValue="us">
                          <SelectTrigger id="country" className="backdrop-blur-sm bg-white/50">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent className="backdrop-blur-md bg-white/90 border border-gray-200/50">
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                            <SelectItem value="in">India</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address-type">Address Type</Label>
                      <RadioGroup defaultValue="home" className="grid gap-4 sm:grid-cols-3">
                        <div className="flex items-center space-x-2 rounded-md border backdrop-blur-sm bg-white/50 p-4">
                          <RadioGroupItem value="home" id="home" />
                          <Label htmlFor="home" className="font-medium">Home</Label>
                        </div>
                        <div className="flex items-center space-x-2 rounded-md border backdrop-blur-sm bg-white/50 p-4">
                          <RadioGroupItem value="work" id="work" />
                          <Label htmlFor="work" className="font-medium">Work</Label>
                        </div>
                        <div className="flex items-center space-x-2 rounded-md border backdrop-blur-sm bg-white/50 p-4">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other" className="font-medium">Other</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shipping-method">Shipping Method</Label>
                      <RadioGroup defaultValue="standard" className="grid gap-4 sm:grid-cols-2">
                        <div className="flex items-center space-x-2 rounded-md border backdrop-blur-sm bg-white/50 p-4">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="flex flex-col">
                            <span className="font-medium">Standard Shipping</span>
                            <span className="text-sm text-muted-foreground">3-5 business days</span>
                          </Label>
                          <span className="ml-auto font-medium">{subtotal >= 100 ? "Free" : "$10.00"}</span>
                        </div>
                        <div className="flex items-center space-x-2 rounded-md border backdrop-blur-sm bg-white/50 p-4">
                          <RadioGroupItem value="express" id="express" />
                          <Label htmlFor="express" className="flex flex-col">
                            <span className="font-medium">Express Shipping</span>
                            <span className="text-sm text-muted-foreground">1-2 business days</span>
                          </Label>
                          <span className="ml-auto font-medium">$25.00</span>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="save-address" />
                      <label htmlFor="save-address" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Save this address for future purchases
                      </label>
                    </div>
                    <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
                      Continue to Payment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            <div>
              <OrderSummary items={items} subtotal={subtotal} shipping={shipping} tax={tax} total={total} />
            </div>
          </div>
        )}

        {/* Payment Step */}
        {step === "payment" && (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card className="backdrop-blur-sm bg-white/80 border border-gray-200/50 shadow-sm">
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                  <CardDescription>Enter your payment details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="payment-method">Payment Method</Label>
                      <RadioGroup defaultValue="credit-card" className="grid gap-4">
                        <div className="flex items-center space-x-2 rounded-md border backdrop-blur-sm bg-white/50 p-4">
                          <RadioGroupItem value="credit-card" id="credit-card" />
                          <Label htmlFor="credit-card" className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            <span className="font-medium">Credit / Debit Card</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 rounded-md border backdrop-blur-sm bg-white/50 p-4">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal" className="flex items-center gap-2">
                            <span className="font-medium">PayPal</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 rounded-md border backdrop-blur-sm bg-white/50 p-4">
                          <RadioGroupItem value="upi" id="upi" />
                          <Label htmlFor="upi" className="flex items-center gap-2">
                            <span className="font-medium">UPI Payment</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 rounded-md border backdrop-blur-sm bg-white/50 p-4">
                          <RadioGroupItem value="cod" id="cod" />
                          <Label htmlFor="cod" className="flex items-center gap-2">
                            <span className="font-medium">Cash on Delivery</span>
                            <Badge className="ml-2 bg-orange-100 text-orange-800 hover:bg-orange-100">Additional fee: $2.00</Badge>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        className="backdrop-blur-sm bg-white/50"
                        required
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="expiration">Expiration Date</Label>
                        <Input id="expiration" placeholder="MM/YY" className="backdrop-blur-sm bg-white/50" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" className="backdrop-blur-sm bg-white/50" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name-on-card">Name on Card</Label>
                      <Input id="name-on-card" className="backdrop-blur-sm bg-white/50" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="billing-address">Billing Address</Label>
                      <RadioGroup defaultValue="same" className="grid gap-4">
                        <div className="flex items-center space-x-2 rounded-md border backdrop-blur-sm bg-white/50 p-4">
                          <RadioGroupItem value="same" id="same" />
                          <Label htmlFor="same" className="font-medium">
                            Same as shipping address
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 rounded-md border backdrop-blur-sm bg-white/50 p-4">
                          <RadioGroupItem value="different" id="different" />
                          <Label htmlFor="different" className="font-medium">
                            Use a different billing address
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="save-card" />
                      <label htmlFor="save-card" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Save this card for future purchases
                      </label>
                    </div>
                    <div className="rounded-md bg-blue-50 p-4 text-sm text-blue-800">
                      <div className="flex items-center">
                        <Info className="h-4 w-4 mr-2" />
                        <p>Your payment information is encrypted and secure. We never store your full card details.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button type="button" variant="outline" onClick={() => setStep("shipping")} className="w-full">
                        Back
                      </Button>
                      <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
                        Place Order
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
            <div>
              <OrderSummary items={items} subtotal={subtotal} shipping={shipping} tax={tax} total={total} />
            </div>
          </div>
        )}

        {/* Confirmation Step */}
        {step === "confirmation" && (
          <Card className="mx-auto max-w-2xl backdrop-blur-sm bg-white/80 border border-gray-200/50 shadow-sm">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-green-500">
                <Check className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
              <CardDescription>Thank you for your purchase. Your order has been confirmed.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 p-4 backdrop-blur-sm">
                <div className="text-sm">
                  <p>
                    <span className="font-medium">Order Number:</span> #ORD-{Math.floor(Math.random() * 10000)}
                  </p>
                  <p className="mt-1">
                    <span className="font-medium">Order Date:</span> {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Shipping Information</h3>
                <div className="rounded-lg border backdrop-blur-sm bg-white/50 p-4 text-sm">
                  <p className="font-medium">John Doe</p>
                  <p className="mt-1 text-muted-foreground">
                    123 Main St
                    <br />
                    San Francisco, CA 94103
                    <br />
                    United States
                  </p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  A confirmation email has been sent to your email address.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full flex-col gap-2">
                <Link href="/store">
                  <Button className="w-full bg-black text-white hover:bg-gray-800">Continue Shopping</Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    Return to Home
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}

function OrderSummary({
  items,
  subtotal,
  shipping,
  tax,
  total,
}: {
  items: any[]
  subtotal: number
  shipping: number
  tax: number
  total: number
}) {
  return (
    <Card className="backdrop-blur-sm bg-white/80 border border-gray-200/50 shadow-sm">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="max-h-[300px] space-y-4 overflow-auto">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center">
                <div className="flex justify-between">
                  <p className="font-medium">{item.name}</p>
                  <p className="font-medium">${item.price.toFixed(2)}</p>
                </div>
                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        <Separator />
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
