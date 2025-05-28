import { 
  BarChart3, 
  DollarSign,
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Users 
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your store and recent activity
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +12.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">
              +5 added this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234</div>
            <p className="text-xs text-muted-foreground">
              +573 this month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>
              Sales data for the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[240px] w-full">
              <div className="flex h-[240px] items-end gap-2 pr-2">
                {Array.from({ length: 30 }).map((_, i) => {
                  const height = Math.max(20, Math.floor(Math.random() * 100))
                  return (
                    <div
                      key={i}
                      className="relative flex-1 rounded-md bg-primary"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute inset-x-0 bottom-0 rounded-md bg-primary/70 p-0.5"></div>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest transactions and events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  icon: <ShoppingCart className="h-4 w-4" />,
                  title: "New Order #1234",
                  description: "John Smith purchased the Ducky One 3",
                  timestamp: "2 minutes ago",
                },
                {
                  icon: <Package className="h-4 w-4" />,
                  title: "New Product Added",
                  description: "Keychron K2 Pro was added to inventory",
                  timestamp: "1 hour ago",
                },
                {
                  icon: <Users className="h-4 w-4" />,
                  title: "New Customer",
                  description: "Sarah Johnson created an account",
                  timestamp: "3 hours ago",
                },
                {
                  icon: <TrendingUp className="h-4 w-4" />,
                  title: "Promotion Started",
                  description: "Summer sale is now active",
                  timestamp: "5 hours ago",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    {item.icon}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">{item.timestamp}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 