"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import {
  ArrowRight,
  Bell,
  ChevronLeft,
  CreditCard,
  Edit,
  FileText,
  Key,
  LifeBuoy,
  LogOut,
  Menu,
  MessageSquare,
  Plus,
  Settings,
  Shield,
  Sparkles,
  Upload,
  User,
  X,
} from "lucide-react"
import { Button } from "@repo/ui/components/ui/button"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Switch } from "@repo/ui/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs"
import { SimpleThemeToggle } from "../../components/theme-toggle"
import { Textarea } from "@repo/ui/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { Separator } from "@repo/ui/components/ui/separator"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("account")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const navItems = [
    { id: "account", label: "Account", icon: <User className="h-4 w-4" /> },
    { id: "security", label: "Security", icon: <Shield className="h-4 w-4" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="h-4 w-4" /> },
    { id: "billing", label: "Billing", icon: <CreditCard className="h-4 w-4" /> },
    { id: "integrations", label: "Integrations", icon: <Settings className="h-4 w-4" /> },
    { id: "help", label: "Help & Support", icon: <LifeBuoy className="h-4 w-4" /> },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full navbar-bg shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover-scale">
            <div className="bg-primary rounded-full p-1.5">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">StreamLine</span>
          </Link>

          <div className="flex items-center gap-4">
            <SimpleThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MessageSquare className="h-5 w-5" />
              </Button>
              <div className="relative">
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-highlight rounded-full border-2 border-background"></div>
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-primary/20 hover-scale"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Back button */}
      <div className="container py-4">
        <Button variant="outline" size="sm" className="gap-2 rounded-full hover-scale" asChild>
          <Link href="/dashboard">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-background/95 dark:bg-background/95 backdrop-blur-md p-4">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`profile-nav-item ${activeTab === item.id ? "active" : ""}`}
                onClick={() => {
                  setActiveTab(item.id)
                  setMobileMenuOpen(false)
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
            <Separator className="my-2" />
            <Button variant="destructive" className="mt-4 gap-2">
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </nav>
        </div>
      )}

      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-3/4 mx-auto"
          >
            <div className="profile-section p-6 mb-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-primary/20 to-highlight/20"></div>

              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-end relative pt-12">
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=100&width=100&text=JD"
                    alt="Profile"
                    width={100}
                    height={100}
                    className="rounded-full border-4 border-card"
                  />
                  <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1.5 hover-scale">
                    <Edit className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-2xl font-bold flex items-center gap-2 justify-center sm:justify-start">
                    John Doe
                    <span className="badge-highlight text-xs">Pro Plan</span>
                  </h1>
                  <p className="text-muted-foreground">john.doe@example.com</p>
                  <p className="text-sm mt-1">Product Manager at TechCorp</p>
                </div>

                <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
                  <Button variant="outline" size="sm" className="gap-1 rounded-full hover-scale">
                    <Upload className="h-3.5 w-3.5" />
                    <span>Export Data</span>
                  </Button>
                  <Button size="sm" className="gap-1 rounded-full hover-scale">
                    <Edit className="h-3.5 w-3.5" />
                    <span>Edit Profile</span>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50">
                  <span className="text-2xl font-bold">12</span>
                  <span className="text-sm text-muted-foreground">Projects</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50">
                  <span className="text-2xl font-bold">3.2k</span>
                  <span className="text-sm text-muted-foreground">Tasks Completed</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50">
                  <span className="text-2xl font-bold">98%</span>
                  <span className="text-sm text-muted-foreground">Productivity</span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block mb-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-6 w-full">
                  {navItems.map((item) => (
                    <TabsTrigger key={item.id} value={item.id} className="flex items-center gap-2">
                      {item.icon}
                      <span>{item.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Tab Content */}
            <div className="profile-section p-6">
              {activeTab === "account" && <AccountTab />}
              {activeTab === "security" && <SecurityTab />}
              {activeTab === "notifications" && <NotificationsTab />}
              {activeTab === "billing" && <BillingTab />}
              {activeTab === "integrations" && <IntegrationsTab />}
              {activeTab === "help" && <HelpTab />}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

function AccountTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" defaultValue="John" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" defaultValue="Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="john.doe@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h2 className="text-xl font-semibold mb-4">Professional Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input id="company" defaultValue="TechCorp" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input id="jobTitle" defaultValue="Product Manager" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              rows={4}
              defaultValue="Product manager with 5+ years of experience in SaaS products. Passionate about user experience and data-driven decision making."
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h2 className="text-xl font-semibold mb-4">Preferences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select defaultValue="en">
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select defaultValue="pst">
              <SelectTrigger id="timezone">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                <SelectItem value="cst">Central Time (CST)</SelectItem>
                <SelectItem value="est">Eastern Time (EST)</SelectItem>
                <SelectItem value="utc">Coordinated Universal Time (UTC)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="weeklyDigest">Weekly Digest</Label>
              <p className="text-sm text-muted-foreground">Receive a weekly summary of your activity</p>
            </div>
            <Switch id="weeklyDigest" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="marketingEmails">Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">Receive emails about new features and offers</p>
            </div>
            <Switch id="marketingEmails" />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" className="rounded-full hover-scale">
          Cancel
        </Button>
        <Button className="rounded-full hover-scale group relative overflow-hidden">
          <span className="relative z-10">Save Changes</span>
          <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1 relative z-10" />
          <span className="absolute inset-0 bg-gradient-to-r from-primary to-highlight opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
        </Button>
      </div>
    </div>
  )
}

function SecurityTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" />
          </div>
        </div>
        <Button className="mt-4 rounded-full hover-scale">Update Password</Button>
      </div>

      <Separator />

      <div>
        <h2 className="text-xl font-semibold mb-4">Two-Factor Authentication</h2>
        <div className="bg-muted/30 p-4 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Two-factor authentication is enabled</h3>
              <p className="text-sm text-muted-foreground">Your account is secured with authenticator app</p>
            </div>
            <span className="badge-highlight">Enabled</span>
          </div>
        </div>
        <Button variant="outline" className="rounded-full hover-scale">
          Reconfigure 2FA
        </Button>
      </div>

      <Separator />

      <div>
        <h2 className="text-xl font-semibold mb-4">Active Sessions</h2>
        <div className="space-y-3">
          {[
            { device: "MacBook Pro", location: "San Francisco, CA", current: true, lastActive: "Now" },
            { device: "iPhone 13", location: "San Francisco, CA", current: false, lastActive: "2 hours ago" },
            { device: "Windows PC", location: "New York, NY", current: false, lastActive: "3 days ago" },
          ].map((session, i) => (
            <div key={i} className="bg-muted/30 p-4 rounded-lg flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{session.device}</h3>
                  {session.current && <span className="badge-primary text-xs">Current</span>}
                </div>
                <p className="text-sm text-muted-foreground">
                  {session.location} • {session.lastActive}
                </p>
              </div>
              {!session.current && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h2 className="text-xl font-semibold mb-4 text-destructive">Danger Zone</h2>
        <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg">
          <h3 className="font-medium text-destructive">Delete Account</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button variant="destructive" className="rounded-full hover-scale">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  )
}

function NotificationsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
        <div className="space-y-4">
          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Email Notifications</h3>
            <div className="space-y-3">
              {[
                { id: "email-comments", label: "Comments", desc: "When someone comments on your projects" },
                { id: "email-mentions", label: "Mentions", desc: "When someone mentions you" },
                { id: "email-updates", label: "Project Updates", desc: "When a project you're part of is updated" },
                {
                  id: "email-system",
                  label: "System Notifications",
                  desc: "Important system notifications and updates",
                },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <Label htmlFor={item.id}>{item.label}</Label>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch id={item.id} defaultChecked={item.id !== "email-system"} />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-medium mb-3">In-App Notifications</h3>
            <div className="space-y-3">
              {[
                { id: "app-comments", label: "Comments", desc: "When someone comments on your projects" },
                { id: "app-mentions", label: "Mentions", desc: "When someone mentions you" },
                { id: "app-updates", label: "Project Updates", desc: "When a project you're part of is updated" },
                { id: "app-invites", label: "Team Invites", desc: "When you're invited to a team or project" },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <Label htmlFor={item.id}>{item.label}</Label>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch id={item.id} defaultChecked />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Push Notifications</h3>
            <div className="space-y-3">
              {[
                { id: "push-comments", label: "Comments", desc: "When someone comments on your projects" },
                { id: "push-mentions", label: "Mentions", desc: "When someone mentions you" },
                { id: "push-updates", label: "Project Updates", desc: "When a project you're part of is updated" },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <Label htmlFor={item.id}>{item.label}</Label>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch id={item.id} defaultChecked={item.id === "push-mentions"} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" className="rounded-full hover-scale">
          Reset to Default
        </Button>
        <Button className="rounded-full hover-scale group relative overflow-hidden">
          <span className="relative z-10">Save Preferences</span>
          <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1 relative z-10" />
          <span className="absolute inset-0 bg-gradient-to-r from-primary to-highlight opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
        </Button>
      </div>
    </div>
  )
}

function BillingTab() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Current Plan</h2>
          <span className="badge-highlight">Pro Plan</span>
        </div>

        <div className="bg-muted/30 p-4 rounded-lg mb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-medium">Pro Plan - $29/month</h3>
              <p className="text-sm text-muted-foreground">Billed annually ($348/year)</p>
              <div className="mt-2">
                <div className="text-sm">
                  Next billing date: <span className="font-medium">June 15, 2023</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="rounded-full hover-scale">
                Change Plan
              </Button>
              <Button variant="destructive" className="rounded-full hover-scale">
                Cancel Plan
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Plan Features</h3>
          <ul className="space-y-2">
            {[
              "Up to 20 team members",
              "Advanced analytics",
              "Priority support",
              "25GB storage",
              "Custom integrations",
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-highlight/20 flex items-center justify-center">
                  <svg className="h-3 w-3 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Separator />

      <div>
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
        <div className="bg-muted/30 p-4 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-16 bg-background rounded-md flex items-center justify-center">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M2 10H22" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <div className="font-medium">•••• •••• •••• 4242</div>
                <div className="text-sm text-muted-foreground">Expires 12/2025</div>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Edit
            </Button>
          </div>
        </div>
        <Button variant="outline" className="rounded-full hover-scale">
          Add Payment Method
        </Button>
      </div>

      <Separator />

      <div>
        <h2 className="text-xl font-semibold mb-4">Billing History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Description</th>
                <th className="text-left py-3 px-4">Amount</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-right py-3 px-4">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: "May 15, 2023", desc: "Pro Plan - Annual", amount: "$348.00", status: "Paid" },
                { date: "Apr 15, 2023", desc: "Pro Plan - Annual", amount: "$348.00", status: "Paid" },
                { date: "Mar 15, 2023", desc: "Pro Plan - Annual", amount: "$348.00", status: "Paid" },
              ].map((invoice, i) => (
                <tr key={i} className="border-b">
                  <td className="py-3 px-4">{invoice.date}</td>
                  <td className="py-3 px-4">{invoice.desc}</td>
                  <td className="py-3 px-4">{invoice.amount}</td>
                  <td className="py-3 px-4">
                    <span className="badge-primary">{invoice.status}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <FileText className="h-4 w-4" />
                      <span>PDF</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function IntegrationsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Connected Applications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              name: "GitHub",
              icon: "/placeholder.svg?height=40&width=40&text=GH",
              connected: true,
              desc: "Manage repositories and track issues",
            },
            {
              name: "Slack",
              icon: "/placeholder.svg?height=40&width=40&text=SL",
              connected: true,
              desc: "Get notifications and updates in your channels",
            },
            {
              name: "Google Drive",
              icon: "/placeholder.svg?height=40&width=40&text=GD",
              connected: false,
              desc: "Access and share documents and files",
            },
            {
              name: "Jira",
              icon: "/placeholder.svg?height=40&width=40&text=JR",
              connected: true,
              desc: "Track issues and manage projects",
            },
          ].map((app, i) => (
            <div key={i} className="bg-muted/30 p-4 rounded-lg flex items-start gap-3">
              <Image
                src={app.icon || "/placeholder.svg"}
                alt={app.name}
                width={40}
                height={40}
                className="rounded-md"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{app.name}</h3>
                  {app.connected ? (
                    <span className="badge-highlight">Connected</span>
                  ) : (
                    <Button size="sm" className="rounded-full hover-scale">
                      Connect
                    </Button>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{app.desc}</p>
                {app.connected && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    Disconnect
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h2 className="text-xl font-semibold mb-4">Available Integrations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: "Dropbox",
              icon: "/placeholder.svg?height=40&width=40&text=DB",
              desc: "Cloud storage and file sharing",
            },
            {
              name: "Trello",
              icon: "/placeholder.svg?height=40&width=40&text=TR",
              desc: "Visual project management",
            },
            {
              name: "Figma",
              icon: "/placeholder.svg?height=40&width=40&text=FG",
              desc: "Design and prototyping",
            },
            {
              name: "Notion",
              icon: "/placeholder.svg?height=40&width=40&text=NT",
              desc: "Notes and documents",
            },
            {
              name: "Zapier",
              icon: "/placeholder.svg?height=40&width=40&text=ZP",
              desc: "Workflow automation",
            },
            {
              name: "Zoom",
              icon: "/placeholder.svg?height=40&width=40&text=ZM",
              desc: "Video conferencing",
            },
          ].map((app, i) => (
            <div key={i} className="bg-muted/30 p-4 rounded-lg hover:border-primary border transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <Image
                  src={app.icon || "/placeholder.svg"}
                  alt={app.name}
                  width={40}
                  height={40}
                  className="rounded-md"
                />
                <h3 className="font-medium">{app.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{app.desc}</p>
              <Button size="sm" className="w-full rounded-full hover-scale">
                Connect
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <Button variant="outline" className="rounded-full hover-scale gap-1">
          <Plus className="h-4 w-4" />
          <span>Browse More Integrations</span>
        </Button>
      </div>
    </div>
  )
}

function HelpTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Help & Support</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-muted/30 p-4 rounded-lg hover:border-primary border transition-colors">
            <h3 className="font-medium mb-2">Documentation</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Browse our comprehensive documentation to learn how to use StreamLine effectively.
            </p>
            <Button variant="outline" className="w-full rounded-full hover-scale">
              View Documentation
            </Button>
          </div>
          <div className="bg-muted/30 p-4 rounded-lg hover:border-primary border transition-colors">
            <h3 className="font-medium mb-2">Video Tutorials</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Watch step-by-step video tutorials to master StreamLine features.
            </p>
            <Button variant="outline" className="w-full rounded-full hover-scale">
              Watch Tutorials
            </Button>
          </div>
          <div className="bg-muted/30 p-4 rounded-lg hover:border-primary border transition-colors">
            <h3 className="font-medium mb-2">FAQs</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Find answers to commonly asked questions about StreamLine.
            </p>
            <Button variant="outline" className="w-full rounded-full hover-scale">
              Browse FAQs
            </Button>
          </div>
          <div className="bg-muted/30 p-4 rounded-lg hover:border-primary border transition-colors">
            <h3 className="font-medium mb-2">Community Forum</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Join our community forum to connect with other users and share tips.
            </p>
            <Button variant="outline" className="w-full rounded-full hover-scale">
              Join Community
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
        <div className="bg-muted/30 p-6 rounded-lg">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="What do you need help with?" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" rows={4} placeholder="Please provide as much detail as possible..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select defaultValue="medium">
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="pt-2">
              <Button className="rounded-full hover-scale group relative overflow-hidden">
                <span className="relative z-10">Submit Support Request</span>
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1 relative z-10" />
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-highlight opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-highlight/10 p-4 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-highlight/20 flex items-center justify-center">
            <Key className="h-5 w-5 text-highlight" />
          </div>
          <div>
            <h3 className="font-medium">Premium Support</h3>
            <p className="text-sm text-muted-foreground">Get priority support with our Pro plan</p>
          </div>
        </div>
      </div>
    </div>
  )
}

