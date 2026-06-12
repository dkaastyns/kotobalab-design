import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { PageTransition } from "@/components/shared/page-transition"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh bg-background">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <PageTransition>{children}</PageTransition>
      </div>
    </div>
  )
}
