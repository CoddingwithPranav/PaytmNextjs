// import { SendCard } from "../../../components/Sendcard";

// export default function() {
//     return <div className="w-full">
//         <SendCard />
//     </div>
// }





"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight, Plus, Search, User } from "lucide-react"
import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs"
import { Textarea } from "@repo/ui/components/ui/textarea"

interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  avatar: string
  recent?: boolean
  favorite?: boolean
}

const contacts: Contact[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    recent: true,
    favorite: true,
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.c@example.com",
    phone: "+1 (555) 234-5678",
    avatar: "/placeholder.svg?height=40&width=40&text=MC",
    recent: true,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@example.com",
    phone: "+1 (555) 345-6789",
    avatar: "/placeholder.svg?height=40&width=40&text=ER",
    recent: true,
    favorite: true,
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.k@example.com",
    phone: "+1 (555) 456-7890",
    avatar: "/placeholder.svg?height=40&width=40&text=DK",
    favorite: true,
  },
  {
    id: "5",
    name: "Jessica Taylor",
    email: "jessica.t@example.com",
    phone: "+1 (555) 567-8901",
    avatar: "/placeholder.svg?height=40&width=40&text=JT",
  },
  {
    id: "6",
    name: "Alex Wong",
    email: "alex.w@example.com",
    phone: "+1 (555) 678-9012",
    avatar: "/placeholder.svg?height=40&width=40&text=AW",
  },
  {
    id: "7",
    name: "Olivia Martinez",
    email: "olivia.m@example.com",
    phone: "+1 (555) 789-0123",
    avatar: "/placeholder.svg?height=40&width=40&text=OM",
  },
  {
    id: "8",
    name: "James Wilson",
    email: "james.w@example.com",
    phone: "+1 (555) 890-1234",
    avatar: "/placeholder.svg?height=40&width=40&text=JW",
  },
]

export default function P2PTransferPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedContact, setSelectedContact] = useState<string | null>(null)
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")

  // Filter contacts based on search query
  const filteredContacts = contacts.filter((contact) => {
    return (
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contact.phone && contact.phone.includes(searchQuery))
    )
  })

  // Get selected contact details
  const selectedContactDetails = contacts.find((contact) => contact.id === selectedContact)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">P2P Transfer</h1>
        <p className="text-muted-foreground">Send money to friends and family instantly</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Select Recipient</CardTitle>
            <CardDescription>Choose who you want to send money to</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="recent">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
                <TabsTrigger value="all">All Contacts</TabsTrigger>
              </TabsList>

              <div className="mt-4 mb-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search contacts..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <TabsContent value="recent" className="mt-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                  {filteredContacts
                    .filter((c) => c.recent)
                    .map((contact) => (
                      <button
                        key={contact.id}
                        className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                          selectedContact === contact.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                        }`}
                        onClick={() => setSelectedContact(contact.id)}
                      >
                        <Image
                          src={contact.avatar || "/placeholder.svg"}
                          alt={contact.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                        <span className="text-sm font-medium mt-2 truncate w-full text-center">{contact.name}</span>
                      </button>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="favorites" className="mt-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                  {filteredContacts
                    .filter((c) => c.favorite)
                    .map((contact) => (
                      <button
                        key={contact.id}
                        className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                          selectedContact === contact.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                        }`}
                        onClick={() => setSelectedContact(contact.id)}
                      >
                        <Image
                          src={contact.avatar || "/placeholder.svg"}
                          alt={contact.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                        <span className="text-sm font-medium mt-2 truncate w-full text-center">{contact.name}</span>
                      </button>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="all" className="mt-0">
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                  {filteredContacts.map((contact) => (
                    <button
                      key={contact.id}
                      className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors text-left ${
                        selectedContact === contact.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      }`}
                      onClick={() => setSelectedContact(contact.id)}
                    >
                      <Image
                        src={contact.avatar || "/placeholder.svg"}
                        alt={contact.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {selectedContact === contact.id ? (
                            <span className="text-primary-foreground opacity-80">{contact.email}</span>
                          ) : (
                            contact.email
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-4 flex justify-center">
              <Button variant="outline" className="gap-1 rounded-full hover-scale">
                <Plus className="h-4 w-4" />
                <span>Add New Contact</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transfer Details</CardTitle>
            <CardDescription>Enter the amount and details for your transfer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedContactDetails ? (
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Image
                  src={selectedContactDetails.avatar || "/placeholder.svg"}
                  alt={selectedContactDetails.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <div className="font-medium">{selectedContactDetails.name}</div>
                  <div className="text-sm text-muted-foreground">{selectedContactDetails.email}</div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 p-6 border-2 border-dashed rounded-lg text-muted-foreground">
                <User className="h-5 w-5" />
                <span>Select a recipient from the list</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-muted-foreground">$</span>
                </div>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  className="pl-8"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">Note (Optional)</Label>
              <Textarea
                id="note"
                placeholder="What's this payment for?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Transfer Method</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-highlight/20 mx-auto mb-2">
                    <svg className="h-5 w-5 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">Instant</div>
                    <div className="text-xs text-muted-foreground">1.5% fee</div>
                  </div>
                </div>
                <div className="border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/20 mx-auto mb-2">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">Standard</div>
                    <div className="text-xs text-muted-foreground">1-2 days, free</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full rounded-full hover-scale group relative overflow-hidden"
              disabled={!selectedContact || !amount || amount === "0"}
            >
              <span className="relative z-10">Send Money</span>
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1 relative z-10" />
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-highlight opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your recent P2P transfers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: "1",
                recipient: "Sarah Johnson",
                avatar: "/placeholder.svg?height=40&width=40&text=SJ",
                amount: 50,
                date: "June 15, 2023",
                status: "Completed",
              },
              {
                id: "2",
                recipient: "Michael Chen",
                avatar: "/placeholder.svg?height=40&width=40&text=MC",
                amount: 25,
                date: "June 10, 2023",
                status: "Completed",
              },
              {
                id: "3",
                recipient: "Emily Rodriguez",
                avatar: "/placeholder.svg?height=40&width=40&text=ER",
                amount: 75,
                date: "June 5, 2023",
                status: "Completed",
              },
              {
                id: "4",
                recipient: "David Kim",
                avatar: "/placeholder.svg?height=40&width=40&text=DK",
                amount: 30,
                date: "May 28, 2023",
                status: "Completed",
              },
            ].map((transfer) => (
              <div key={transfer.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Image
                    src={transfer.avatar || "/placeholder.svg"}
                    alt={transfer.recipient}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{transfer.recipient}</p>
                    <p className="text-xs text-muted-foreground">{transfer.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-destructive">-${transfer.amount.toFixed(2)}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-highlight/20 text-highlight">
                    {transfer.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

