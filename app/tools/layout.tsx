import type React from 'react'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { ModeToggle } from '@/components/mode-toggle'
import { Sidebar } from '@/components/sidebar'

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10">
        <div className="mb-6 flex justify-end">
          <ModeToggle />
        </div>
        <Breadcrumbs />
        {children}
      </main>
    </div>
  )
}
