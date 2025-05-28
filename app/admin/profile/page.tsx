"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { 
  User, 
  KeyRound, 
  ShieldCheck, 
  Bell, 
  AlertTriangle,
  LogIn,
  BadgeAlert
} from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function AdminProfilePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  
  // Form states
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [formLoading, setFormLoading] = useState(false)
  
  // Admin settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [adminApiAccess, setAdminApiAccess] = useState(true)

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        toast({
          title: "Access Denied",
          description: "Please login to access your profile.",
          variant: "destructive",
        })
        router.push("/auth")
      } else if (!user.isAdmin) {
        toast({
          title: "Access Denied",
          description: "Only administrators can access this page.",
          variant: "destructive",
        })
        router.push("/profile")
      } else {
        // Populate form fields for admin
        setEmail(user.email)
        setName(user.email.split('@')[0]) // Use part of email as name placeholder
      }
    }
  }, [user, isLoading, router, toast])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Profile Updated",
        description: "Your admin profile information has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setFormLoading(false)
    }
  }
  
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match.",
        variant: "destructive",
      })
      setFormLoading(false)
      return
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Password Changed",
        description: "Your password has been changed successfully.",
      })
      
      // Reset form
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setFormLoading(false)
    }
  }
  
  const handleAdminSettingsSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Admin Settings Updated",
        description: "Your admin settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update admin settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setFormLoading(false)
    }
  }

  if (isLoading || !user || !user.isAdmin) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Profile</h1>
        <p className="text-gray-500">Manage your administrator account settings and preferences.</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <ShieldCheck className="h-5 w-5 text-blue-600" />
          <div className="text-sm text-blue-700">
            You're logged in with administrator privileges. <a href="/profile" className="font-medium underline">Switch to Standard Profile</a>
          </div>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-1">
              <User className="h-4 w-4" />
              Profile Info
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-1">
              <KeyRound className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-1">
              <BadgeAlert className="h-4 w-4" />
              Admin Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal details and contact information.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleProfileUpdate}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-name">Name</Label>
                    <Input 
                      id="admin-name" 
                      placeholder="Your name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Email</Label>
                    <Input 
                      id="admin-email" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={formLoading}>
                    {formLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password to keep your account secure.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handlePasswordChange}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-current-password">Current Password</Label>
                    <Input 
                      id="admin-current-password" 
                      type="password" 
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-new-password">New Password</Label>
                    <Input 
                      id="admin-new-password" 
                      type="password" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-confirm-password">Confirm New Password</Label>
                    <Input 
                      id="admin-confirm-password" 
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={formLoading}>
                    {formLoading ? "Updating..." : "Change Password"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle>Administrator Settings</CardTitle>
                <CardDescription>
                  Configure your administrator-specific settings and permissions.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleAdminSettingsSave}>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email notifications for important system events.
                        </p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your admin account.
                        </p>
                      </div>
                      <Switch
                        id="two-factor"
                        checked={twoFactorAuth}
                        onCheckedChange={setTwoFactorAuth}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="api-access">Admin API Access</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable access to administrator API endpoints.
                        </p>
                      </div>
                      <Switch
                        id="api-access"
                        checked={adminApiAccess}
                        onCheckedChange={setAdminApiAccess}
                      />
                    </div>
                  </div>
                  
                  {twoFactorAuth && (
                    <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                      <h4 className="font-medium mb-2 flex items-center gap-1.5">
                        <LogIn className="h-4 w-4" />
                        Two-Factor Authentication Setup
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        For demo purposes, 2FA is simulated. In a real application, you would see a QR code and setup instructions here.
                      </p>
                      <Button variant="outline" size="sm">Set Up Two-Factor</Button>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={formLoading}>
                    {formLoading ? "Saving..." : "Save Admin Settings"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 