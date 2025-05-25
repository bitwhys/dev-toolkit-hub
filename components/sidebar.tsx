'use client'

import type React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen,
  Calendar,
  Code,
  Code2,
  FileJson,
  FingerprintIcon as FingerPrint,
  GitCompare,
  Home,
  Key,
  Menu,
  RefreshCw,
  Type,
  Wifi,
  Wrench,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const tools = [
    { id: 'home', name: 'Home', icon: <Home className="h-5 w-5" />, href: '/' },
    {
      id: 'jwt-decoder',
      name: 'JWT Decoder',
      icon: <Key className="h-5 w-5" />,
      href: '/tools/jwt-decoder',
    },
    {
      id: 'crypto-utilities',
      name: 'Cryptographic Utilities',
      icon: <FingerPrint className="h-5 w-5" />,
      href: '/tools/crypto-utilities',
    },
    {
      id: 'data-converters',
      name: 'Data Format Converters',
      icon: <RefreshCw className="h-5 w-5" />,
      href: '/tools/data-converters',
    },
    {
      id: 'json-tools',
      name: 'JSON Tools',
      icon: <FileJson className="h-5 w-5" />,
      href: '/tools/json-tools',
    },
    {
      id: 'text-manipulation',
      name: 'Text Manipulation',
      icon: <Type className="h-5 w-5" />,
      href: '/tools/text-manipulation',
    },
    {
      id: 'text-diff',
      name: 'Text Diff Checker',
      icon: <GitCompare className="h-5 w-5" />,
      href: '/tools/text-diff',
    },
    {
      id: 'encoders-decoders',
      name: 'Encoders & Decoders',
      icon: <Code2 className="h-5 w-5" />,
      href: '/tools/encoders-decoders',
    },
    {
      id: 'uuid-generators',
      name: 'UUID & Random Generators',
      icon: <FingerPrint className="h-5 w-5" />,
      href: '/tools/uuid-generators',
    },
    {
      id: 'network-utilities',
      name: 'IP & Network Utilities',
      icon: <Wifi className="h-5 w-5" />,
      href: '/tools/network-utilities',
    },
    {
      id: 'datetime-tools',
      name: 'Date & Time Tools',
      icon: <Calendar className="h-5 w-5" />,
      href: '/tools/datetime-tools',
    },
    {
      id: 'misc-tools',
      name: 'Miscellaneous',
      icon: <Wrench className="h-5 w-5" />,
      href: '/tools/misc-tools',
    },
    {
      id: 'transformations',
      name: 'Code Transformations',
      icon: <Code className="h-5 w-5" />,
      href: '/tools/transformations',
    },
    {
      id: 'snippets',
      name: 'Code Snippets',
      icon: <BookOpen className="h-5 w-5" />,
      href: '/tools/snippets',
    },
  ]
  const SidebarContent = (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <Link href="/" className="block">
            <h2 className="mb-2 px-2 text-xl font-semibold tracking-tight">DevToolkit Hub</h2>
            <div className="text-muted-foreground px-2 text-sm">Tools That Developers Love</div>
          </Link>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Navigation</h2>
          <ScrollArea className="h-[calc(100vh-180px)]">
            <div className="space-y-1 p-2">
              {tools.map((tool) => (
                <Button
                  key={tool.id}
                  variant={
                    pathname === tool.href || pathname.startsWith(tool.href + '/')
                      ? 'secondary'
                      : 'ghost'
                  }
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={tool.href}>
                    {tool.icon}
                    <span className="ml-2">{tool.name}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r md:block">{SidebarContent}</aside>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="absolute top-4 left-4">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            {SidebarContent}
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
