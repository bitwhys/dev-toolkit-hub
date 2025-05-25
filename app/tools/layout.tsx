import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { Breadcrumbs } from "@/components/breadcrumbs"

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10">
        <div className="flex justify-end mb-6">
          <ModeToggle />
        </div>
        <Breadcrumbs />
        {children}
      </main>
    </div>
  )
}
