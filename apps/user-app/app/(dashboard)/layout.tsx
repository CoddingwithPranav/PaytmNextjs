import type React from "react"
import { Sidebar } from "../../components/sidebar"
import Header from "../../components/DashboardHeader"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title="Dashboard" />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

