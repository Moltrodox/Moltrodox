"use client"

import { useState, useEffect } from "react"
import { 
  Check, 
  Clock, 
  Laptop, 
  Smartphone, 
  User, 
  MoreHorizontal, 
  EyeOff, 
  Shield,
  LogOut,
  RefreshCw
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

// Mock active users data
const mockActiveUsers = [
  {
    id: "user-1",
    name: "Admin User",
    email: "admin@example.com",
    role: "Admin",
    lastActive: new Date().toISOString(),
    ip: "192.168.1.1",
    device: "Desktop - Chrome",
    deviceType: "desktop",
    location: "New York, USA",
    status: "online",
    duration: "2h 15m"
  },
  {
    id: "user-2",
    name: "John Smith",
    email: "john@example.com",
    role: "Admin",
    lastActive: new Date(Date.now() - 5 * 60000).toISOString(),
    ip: "192.168.1.45",
    device: "iPhone - Safari",
    deviceType: "mobile",
    location: "Los Angeles, USA",
    status: "online",
    duration: "45m"
  },
  {
    id: "user-3",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Editor",
    lastActive: new Date(Date.now() - 15 * 60000).toISOString(),
    ip: "192.168.2.30",
    device: "Desktop - Firefox",
    deviceType: "desktop",
    location: "London, UK",
    status: "idle",
    duration: "1h 30m"
  },
  {
    id: "user-4",
    name: "Mike Chang",
    email: "mike@example.com",
    role: "Support",
    lastActive: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
    ip: "192.168.3.21",
    device: "Android - Chrome",
    deviceType: "mobile",
    location: "Toronto, Canada",
    status: "offline",
    duration: "5m"
  }
]

// Mock sessions history
const mockSessionHistory = [
  {
    id: "session-1",
    userEmail: "admin@example.com",
    loginTime: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
    logoutTime: null,
    ip: "192.168.1.1",
    device: "Desktop - Chrome",
    location: "New York, USA",
  },
  {
    id: "session-2",
    userEmail: "john@example.com",
    loginTime: new Date(Date.now() - 45 * 60000).toISOString(),
    logoutTime: null,
    ip: "192.168.1.45",
    device: "iPhone - Safari",
    location: "Los Angeles, USA",
  },
  {
    id: "session-3",
    userEmail: "admin@example.com",
    loginTime: new Date(Date.now() - 24 * 60 * 60000).toISOString(),
    logoutTime: new Date(Date.now() - 23 * 60 * 60000).toISOString(),
    ip: "192.168.1.1",
    device: "Desktop - Chrome",
    location: "New York, USA",
  },
  {
    id: "session-4",
    userEmail: "sarah@example.com",
    loginTime: new Date(Date.now() - 90 * 60000).toISOString(),
    logoutTime: null,
    ip: "192.168.2.30",
    device: "Desktop - Firefox",
    location: "London, UK",
  }
]

export default function AdminSettingsPage() {
  const [activeUsers, setActiveUsers] = useState(mockActiveUsers)
  const [sessionHistory, setSessionHistory] = useState(mockSessionHistory)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { toast } = useToast()

  const refreshData = () => {
    setIsRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Data refreshed",
        description: "Active users data has been updated."
      })
    }, 1000)
  }

  const terminateSession = (userId: string) => {
    setActiveUsers(prev => prev.filter(user => user.id !== userId))
    toast({
      title: "Session terminated",
      description: "The user session has been ended successfully."
    })
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    let interval = Math.floor(seconds / 31536000)
    if (interval >= 1) return `${interval} year${interval === 1 ? '' : 's'} ago`
    
    interval = Math.floor(seconds / 2592000)
    if (interval >= 1) return `${interval} month${interval === 1 ? '' : 's'} ago`
    
    interval = Math.floor(seconds / 86400)
    if (interval >= 1) return `${interval} day${interval === 1 ? '' : 's'} ago`
    
    interval = Math.floor(seconds / 3600)
    if (interval >= 1) return `${interval} hour${interval === 1 ? '' : 's'} ago`
    
    interval = Math.floor(seconds / 60)
    if (interval >= 1) return `${interval} minute${interval === 1 ? '' : 's'} ago`
    
    return 'Just now'
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Settings</h1>
          <p className="text-gray-500">Manage your admin settings and user sessions</p>
        </div>
        <Button onClick={refreshData} className="gap-1" disabled={isRefreshing}>
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      <Tabs defaultValue="active-users">
        <TabsList className="mb-4">
          <TabsTrigger value="active-users">Active Users</TabsTrigger>
          <TabsTrigger value="session-history">Session History</TabsTrigger>
          <TabsTrigger value="security">Security Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active-users">
          <Card>
            <CardHeader>
              <CardTitle>Active Admin Users</CardTitle>
              <CardDescription>
                These users are currently logged into the admin area. {activeUsers.length} active user(s).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Device & IP</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeUsers.map(user => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{user.name}</span>
                          <span className="text-sm text-gray-500">{user.email}</span>
                          <Badge variant="outline" className="w-fit text-xs mt-1">
                            {user.role}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${
                            user.status === 'online' ? 'bg-green-500' : 
                            user.status === 'idle' ? 'bg-yellow-500' : 'bg-gray-300'
                          }`} />
                          <span className="capitalize">{user.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            {user.deviceType === 'desktop' ? 
                              <Laptop className="h-3 w-3 text-gray-500" /> : 
                              <Smartphone className="h-3 w-3 text-gray-500" />
                            }
                            <span>{user.device}</span>
                          </div>
                          <span className="text-sm text-gray-500">{user.ip}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.location}</TableCell>
                      <TableCell>{user.duration}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-gray-500" />
                          <span>{formatTimeAgo(user.lastActive)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => terminateSession(user.id)}>
                              <LogOut className="h-4 w-4 mr-2 text-red-500" />
                              Terminate Session
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <EyeOff className="h-4 w-4 mr-2" />
                              Block IP
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Shield className="h-4 w-4 mr-2" />
                              View Permissions
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="session-history">
          <Card>
            <CardHeader>
              <CardTitle>Session History</CardTitle>
              <CardDescription>
                Recent login sessions for all admin users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Login Time</TableHead>
                    <TableHead>Logout Time</TableHead>
                    <TableHead>Device & IP</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessionHistory.map(session => (
                    <TableRow key={session.id}>
                      <TableCell>{session.userEmail}</TableCell>
                      <TableCell>{formatTimeAgo(session.loginTime)}</TableCell>
                      <TableCell>
                        {session.logoutTime ? formatTimeAgo(session.logoutTime) : (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Active Session
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{session.device}</span>
                          <span className="text-sm text-gray-500">{session.ip}</span>
                        </div>
                      </TableCell>
                      <TableCell>{session.location}</TableCell>
                      <TableCell>
                        {session.logoutTime ? (
                          <Badge variant="outline" className="bg-gray-50">Completed</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Active
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Session Settings</CardTitle>
                <CardDescription>
                  Configure how user sessions are handled in the admin area
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="timeout">Session Timeout (minutes)</Label>
                  <Input id="timeout" type="number" defaultValue={30} />
                  <p className="text-sm text-gray-500">
                    Admin users will be logged out after this period of inactivity
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxSessions">Maximum Concurrent Sessions</Label>
                  <Input id="maxSessions" type="number" defaultValue={3} />
                  <p className="text-sm text-gray-500">
                    Maximum number of active sessions allowed per user
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Settings</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>IP Restrictions</CardTitle>
                <CardDescription>
                  Control which IP addresses can access the admin area
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="allowedIps">Allowed IP Addresses</Label>
                  <Input id="allowedIps" placeholder="e.g. 192.168.1.1, 10.0.0.1" />
                  <p className="text-sm text-gray-500">
                    Leave blank to allow all IPs, or enter comma-separated IPs to restrict access
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blockedIps">Blocked IP Addresses</Label>
                  <Input id="blockedIps" placeholder="e.g. 192.168.1.2, 10.0.0.2" />
                  <p className="text-sm text-gray-500">
                    IPs that are explicitly blocked from accessing the admin area
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Restrictions</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 