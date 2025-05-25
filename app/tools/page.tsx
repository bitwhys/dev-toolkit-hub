import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Code,
  Code2,
  FileJson,
  FingerprintIcon as FingerPrint,
  Key,
  RefreshCw,
  Type,
  Wifi,
  Wrench,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ToolsPage() {
  const tools = [
    {
      id: 'jwt-decoder',
      name: 'JWT Decoder',
      description: 'Decode and verify JSON Web Tokens (JWT)',
      icon: <Key className="h-6 w-6" />,
      href: '/tools/jwt-decoder',
      category: 'Security',
    },
    {
      id: 'crypto-utilities',
      name: 'Cryptographic Utilities',
      description: 'Generate cryptographic keys, hashes, and encrypt/decrypt data',
      icon: <FingerPrint className="h-6 w-6" />,
      href: '/tools/crypto-utilities',
      category: 'Security',
    },
    {
      id: 'data-converters',
      name: 'Data Format Converters',
      description: 'Convert between different data formats and encodings',
      icon: <RefreshCw className="h-6 w-6" />,
      href: '/tools/data-converters',
      category: 'Conversion',
    },
    {
      id: 'json-tools',
      name: 'JSON Tools',
      description: 'Format, minify, convert, and compare JSON data',
      icon: <FileJson className="h-6 w-6" />,
      href: '/tools/json-tools',
      category: 'Data',
    },
    {
      id: 'text-manipulation',
      name: 'Text Manipulation',
      description: 'Transform, clean, and analyze text',
      icon: <Type className="h-6 w-6" />,
      href: '/tools/text-manipulation',
      category: 'Text',
    },
    {
      id: 'encoders-decoders',
      name: 'Encoders & Decoders',
      description: 'Encode and decode data in various formats',
      icon: <Code2 className="h-6 w-6" />,
      href: '/tools/encoders-decoders',
      category: 'Conversion',
    },
    {
      id: 'transformations',
      name: 'Code Transformations',
      description: 'Convert between HTML/JSX, JSON Schema/TypeScript, CSS/JS, and more',
      icon: <Code className="h-6 w-6" />,
      href: '/tools/transformations',
      category: 'Conversion',
    },
    {
      id: 'uuid-generators',
      name: 'UUID & Random Generators',
      description: 'Generate UUIDs, random strings, and secure passwords',
      icon: <FingerPrint className="h-6 w-6" />,
      href: '/tools/uuid-generators',
      category: 'Generation',
    },
    {
      id: 'network-utilities',
      name: 'IP & Network Utilities',
      description: 'Validate IP addresses and calculate network information',
      icon: <Wifi className="h-6 w-6" />,
      href: '/tools/network-utilities',
      category: 'Network',
    },
    {
      id: 'datetime-tools',
      name: 'Date & Time Tools',
      description: 'Convert timestamps, work with timezones, and format dates',
      icon: <Calendar className="h-6 w-6" />,
      href: '/tools/datetime-tools',
      category: 'Time',
    },
    {
      id: 'misc-tools',
      name: 'Miscellaneous Tools',
      description: 'QR codes, color picker, and other utilities',
      icon: <Wrench className="h-6 w-6" />,
      href: '/tools/misc-tools',
      category: 'Utilities',
    },
    {
      id: 'snippets',
      name: 'Code Snippets',
      description: 'Discover and share useful code snippets and solutions',
      icon: <BookOpen className="h-6 w-6" />,
      href: '/tools/snippets',
      category: 'Code',
    },
  ]

  const categories = Array.from(new Set(tools.map((tool) => tool.category)))

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">Developer Tools</h1>
        <p className="text-muted-foreground max-w-3xl text-lg">
          Choose from our comprehensive collection of developer tools. Each tool runs locally in
          your browser for maximum privacy and speed.
        </p>
      </section>

      {categories.map((category) => (
        <section key={category} className="space-y-4">
          <h2 className="text-xl font-semibold">{category}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools
              .filter((tool) => tool.category === category)
              .map((tool) => (
                <Card key={tool.id} className="transition-shadow hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      {tool.icon}
                      <span className="ml-2">{tool.name}</span>
                    </CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full">
                      <Link href={tool.href}>
                        Open Tool
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>
      ))}
    </div>
  )
}
