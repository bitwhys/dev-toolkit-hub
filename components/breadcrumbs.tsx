'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home } from 'lucide-react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const pathNameMap: Record<string, string> = {
  tools: 'Tools',
  'jwt-decoder': 'JWT Decoder',
  'crypto-utilities': 'Cryptographic Utilities',
  'data-converters': 'Data Format Converters',
  'json-tools': 'JSON Tools',
  'text-manipulation': 'Text Manipulation',
  'encoders-decoders': 'Encoders & Decoders',
  'uuid-generators': 'UUID & Random Generators',
  'network-utilities': 'IP & Network Utilities',
  'datetime-tools': 'Date & Time Tools',
  'misc-tools': 'Miscellaneous Tools',
  transformations: 'Code Transformations',
  'html-jsx': 'HTML ⇄ JSX Converter',
  'json-schema': 'JSON Schema Converter',
  'css-converter': 'CSS Converter',
  'javascript-converter': 'JavaScript Converter',
  snippets: 'Code Snippets',
}

export function Breadcrumbs() {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(Boolean)

  // Don't show breadcrumbs on home page
  if (pathname === '/') {
    return null
  }

  const breadcrumbItems = []

  // Add home
  breadcrumbItems.push({
    href: '/',
    label: 'Home',
    isLast: false,
  })

  // Build breadcrumb items from path segments
  let currentPath = ''
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLast = index === pathSegments.length - 1
    const label = pathNameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)

    breadcrumbItems.push({
      href: currentPath,
      label,
      isLast,
    })
  })

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <div key={item.href} className="flex items-center">
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage className="flex items-center">
                  {index === 0 && <Home className="mr-1 h-4 w-4" />}
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.href} className="hover:text-foreground flex items-center">
                    {index === 0 && <Home className="mr-1 h-4 w-4" />}
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!item.isLast && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
