"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { useWishlist } from "@/components/wishlist-provider"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, ShoppingBag, CreditCard, Heart, MessageSquare, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const { items: wishlistItems } = useWishlist()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!isLoading && !user) {
      toast({
        title: "Access Denied",
        description: "Please login to access your dashboard.",
        variant: "destructive",
      })
      router.push("/auth")
    }
  }, [user, isLoading, router, toast])

  if (isLoading || !user) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user.email.split('@')[0]}</h1>
        <p className="text-gray-500">Manage your orders, wishlist, and account settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recent Orders</CardTitle>
            <CardDescription>Track and manage your orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <ShoppingBag className="h-4 w-4 text-indigo-600" />
                </div>
                <span className="font-medium">0 orders</span>
              </div>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Wishlist</CardTitle>
            <CardDescription>Items you've saved for later</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-pink-100 p-2 rounded-full">
                  <Heart className="h-4 w-4 text-pink-600" />
                </div>
                <span className="font-medium">{wishlistItems.length} items</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => router.push('/wishlist')}>View All</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Payment Methods</CardTitle>
            <CardDescription>Manage your payment options</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-green-100 p-2 rounded-full">
                  <CreditCard className="h-4 w-4 text-green-600" />
                </div>
                <span className="font-medium">Add payment</span>
              </div>
              <Button variant="ghost" size="sm">Manage</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Shipping Address</CardTitle>
            <CardDescription>Manage your delivery addresses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-orange-100 p-2 rounded-full">
                  <Package className="h-4 w-4 text-orange-600" />
                </div>
                <span className="font-medium">Add address</span>
              </div>
              <Button variant="ghost" size="sm">Manage</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Order Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Order Status</CardTitle>
            <CardDescription>Track your recent order status</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Sample order status data */}
            <div className="space-y-4">
              <div className="border-b pb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Order #KBD-1024</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Processing</Badge>
                </div>
                <div className="text-sm text-gray-500 flex justify-between">
                  <span>Placed on Oct 15, 2023</span>
                  <span>$249.99</span>
                </div>
                <div className="mt-2 flex items-center">
                  <Clock className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-xs text-gray-500">Estimated delivery: Oct 22, 2023</span>
                </div>
              </div>
              
              <div className="text-center py-3 text-gray-500 text-sm">
                <span>No other orders to display</span>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="mt-4 w-full">View Order History</Button>
          </CardContent>
        </Card>

        {/* Recent Chat */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Recent Chats</CardTitle>
            <CardDescription>Your customer support conversations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Order Support</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Active</Badge>
                </div>
                <div className="text-sm text-gray-500">
                  <p className="line-clamp-2">Last message: Thank you for your inquiry about your keyboard shipment. Our team will...</p>
                </div>
                <div className="mt-2 flex items-center">
                  <MessageSquare className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-xs text-gray-500">Updated 2 hours ago</span>
                </div>
              </div>
              
              <div className="text-center py-3 text-gray-500 text-sm">
                <span>No other conversations to display</span>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="mt-4 w-full">Start New Conversation</Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">You don't have any recent activity.</p>
          <Button className="mt-4" asChild>
            <a href="/store">Start Shopping</a>
          </Button>
        </div>
      </div>
    </div>
  )
} 