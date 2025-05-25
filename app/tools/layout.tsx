import type React from 'react'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { ModeToggle } from '@/components/mode-toggle'

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mb-6 flex justify-end">
        <ModeToggle />
      </div>
      <Breadcrumbs />
      {children}
    </>
  )
}
