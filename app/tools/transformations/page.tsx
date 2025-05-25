import Link from 'next/link'
import { ArrowRight, Code, Database, FileCode, Palette } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function TransformationsPage() {
  const transformations = [
    {
      id: 'html-jsx',
      name: 'HTML ⇄ JSX',
      description: 'Convert between HTML and JSX syntax',
      icon: <Code className="h-6 w-6" />,
      href: '/tools/transformations/html-jsx',
    },
    {
      id: 'json-schema',
      name: 'JSON Schema Converter',
      description: 'Convert JSON Schema to OpenAPI, TypeScript, or Zod schemas',
      icon: <Database className="h-6 w-6" />,
      href: '/tools/transformations/json-schema',
    },
    {
      id: 'css-converter',
      name: 'CSS Converter',
      description: 'Convert CSS to JavaScript objects or Tailwind CSS classes',
      icon: <Palette className="h-6 w-6" />,
      href: '/tools/transformations/css-converter',
    },
    {
      id: 'javascript-converter',
      name: 'JavaScript Converter',
      description: 'Convert JavaScript to TypeScript or JSON',
      icon: <FileCode className="h-6 w-6" />,
      href: '/tools/transformations/javascript-converter',
    },
  ]

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">Code Transformations</h1>
        <p className="text-muted-foreground max-w-3xl text-lg">
          Transform code between different formats and languages. Convert HTML to JSX, JSON Schema
          to TypeScript, CSS to JavaScript objects, and more.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {transformations.map((transformation) => (
          <Card key={transformation.id} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                {transformation.icon}
                <span className="ml-2">{transformation.name}</span>
              </CardTitle>
              <CardDescription>{transformation.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href={transformation.href}>
                  Open Transformer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
