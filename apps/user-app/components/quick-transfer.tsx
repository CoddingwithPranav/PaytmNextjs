"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { ArrowRight, Plus } from "lucide-react"
import { ButtonLoader } from "@repo/ui/components/ui/loader"
import { Skeleton } from "@repo/ui/components/ui/skeleton"
interface Contact {
  id: string
  name: string
  avatar: string
  recent?: boolean
}

const contacts: Contact[] = [
  { id: "1", name: "Sarah Johnson", avatar: "/placeholder.svg?height=40&width=40&text=SJ", recent: true },
  { id: "2", name: "Michael Chen", avatar: "/placeholder.svg?height=40&width=40&text=MC", recent: true },
  { id: "3", name: "Emily Rodriguez", avatar: "/placeholder.svg?height=40&width=40&text=ER", recent: true },
  { id: "4", name: "David Kim", avatar: "/placeholder.svg?height=40&width=40&text=DK" },
]

export function QuickTransfer() {
  const [amount, setAmount] = useState("")
  const [selectedContact, setSelectedContact] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleSendMoney = () => {
    if (!selectedContact || !amount) return

    setSending(true)
    // Simulate API call
    setTimeout(() => {
      setSending(false)
      setAmount("")
      setSelectedContact(null)
      // Show success message or notification here
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Transfer</CardTitle>
        <CardDescription>Send money to friends and family</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="amount">Amount</Label>
          <div className="relative mt-1">
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
              disabled={loading || sending}
            />
          </div>
        </div>

        <div>
          <Label>Recent Contacts</Label>
          {loading ? (
            <div className="grid grid-cols-4 gap-2 mt-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center p-2">
                  <Skeleton className="h-10 w-10 rounded-full mb-1" />
                  <Skeleton className="h-3 w-12" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 mt-2">
              {contacts
                .filter((c) => c.recent)
                .map((contact) => (
                  <button
                    key={contact.id}
                    className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                      selectedContact === contact.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedContact(contact.id)}
                    disabled={sending}
                  >
                    <Image
                      src={contact.avatar || "/placeholder.svg"}
                      alt={contact.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <span className="text-xs mt-1 truncate w-full text-center">{contact.name.split(" ")[0]}</span>
                  </button>
                ))}
              <button className="flex flex-col items-center p-2 rounded-lg hover:bg-muted" disabled={sending}>
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Plus className="h-5 w-5" />
                </div>
                <span className="text-xs mt-1">Add New</span>
              </button>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full rounded-full hover-scale group relative overflow-hidden"
          disabled={!selectedContact || !amount || loading || sending}
          onClick={handleSendMoney}
        >
          {sending ? (
            <>
              <ButtonLoader className="mr-2" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span className="relative z-10">Send Money</span>
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1 relative z-10" />
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-highlight opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
