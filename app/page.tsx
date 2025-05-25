import { Sidebar } from "@/components/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import {
  Key,
  FileJson,
  Type,
  Code2,
  Code,
  FingerprintIcon as FingerPrint,
  Wifi,
  Calendar,
  Wrench,
  RefreshCw,
  ArrowRight,
  BookOpen,
} from "lucide-react"

export default function Home() {
  const tools = [
    {
      id: "jwt-decoder",
      name: "JWT Decoder",
      description: "Decode and verify JSON Web Tokens",
      icon: <Key className="h-6 w-6" />,
      href: "/tools/jwt-decoder",
    },
    {
      id: "crypto-utilities",
      name: "Cryptographic Utilities",
      description: "Generate keys, hashes, and encrypt/decrypt data",
      icon: <FingerPrint className="h-6 w-6" />,
      href: "/tools/crypto-utilities",
    },
    {
      id: "data-converters",
      name: "Data Format Converters",
      description: "Convert between different data formats and encodings",
      icon: <RefreshCw className="h-6 w-6" />,
      href: "/tools/data-converters",
    },
    {
      id: "json-tools",
      name: "JSON Tools",
      description: "Format, minify, convert, and compare JSON data",
      icon: <FileJson className="h-6 w-6" />,
      href: "/tools/json-tools",
    },
    {
      id: "text-manipulation",
      name: "Text Manipulation",
      description: "Transform, clean, and analyze text",
      icon: <Type className="h-6 w-6" />,
      href: "/tools/text-manipulation",
    },
    {
      id: "encoders-decoders",
      name: "Encoders & Decoders",
      description: "Encode and decode data in various formats",
      icon: <Code2 className="h-6 w-6" />,
      href: "/tools/encoders-decoders",
    },
    {
      id: "uuid-generators",
      name: "UUID & Random Generators",
      description: "Generate UUIDs, random strings, and secure passwords",
      icon: <FingerPrint className="h-6 w-6" />,
      href: "/tools/uuid-generators",
    },
    {
      id: "network-utilities",
      name: "IP & Network Utilities",
      description: "Validate IP addresses and calculate network information",
      icon: <Wifi className="h-6 w-6" />,
      href: "/tools/network-utilities",
    },
    {
      id: "datetime-tools",
      name: "Date & Time Tools",
      description: "Convert timestamps, work with timezones, and format dates",
      icon: <Calendar className="h-6 w-6" />,
      href: "/tools/datetime-tools",
    },
    {
      id: "misc-tools",
      name: "Miscellaneous Tools",
      description: "QR codes, color picker, and other utilities",
      icon: <Wrench className="h-6 w-6" />,
      href: "/tools/misc-tools",
    },
    {
      id: "transformations",
      name: "Code Transformations",
      description: "Convert between HTML/JSX, JSON Schema/TypeScript, CSS/JS, and more",
      icon: <Code className="h-6 w-6" />,
      href: "/tools/transformations",
    },
    {
      id: "snippets",
      name: "Code Snippets",
      description: "Discover and share useful code snippets and solutions",
      icon: <BookOpen className="h-6 w-6" />,
      href: "/tools/snippets",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10">
        <div className="flex justify-end mb-6">
          <ModeToggle />
        </div>

        <div className="space-y-8">
          {/* Hero Section */}
          <section className="space-y-4">
            <h1 className="text-4xl font-bold">DevToolkit Hub</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Your all-in-one Swiss Army knife for developer tasks — from decoding JWTs to cryptographic key generation,
              base conversions, and more.
            </p>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-md mt-4 max-w-3xl">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Privacy Notice:</strong> All operations are done locally in your browser. No data is stored or
                transmitted.
              </p>
            </div>
          </section>

          {/* Tools Grid */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Available Tools</h2>
              <Button asChild variant="outline">
                <Link href="/tools">
                  View All Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <Card key={tool.id} className="hover:shadow-md transition-shadow">
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

          {/* Features Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Why DevToolkit Hub?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">🔒 Privacy First</h3>
                <p className="text-muted-foreground">
                  All processing happens locally in your browser. Your data never leaves your device.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">⚡ Fast & Efficient</h3>
                <p className="text-muted-foreground">
                  No server round-trips means instant results for all your developer tasks.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">🛠️ Comprehensive</h3>
                <p className="text-muted-foreground">
                  Everything you need in one place - from JWT decoding to network calculations.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
