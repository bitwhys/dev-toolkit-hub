'use client'

import { useState } from 'react'
import { Check, Copy, Palette } from 'lucide-react'

import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export function CssConverter() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const [cssInput, setCssInput] = useState('')
  const [output, setOutput] = useState('')
  const [outputType, setOutputType] = useState<'js-object' | 'tailwind'>('js-object')

  const convertToJsObject = (css: string): string => {
    try {
      // Remove comments
      css = css.replace(/\/\*[\s\S]*?\*\//g, '')

      // Split by rules (basic parsing)
      const rules = css.split('}').filter((rule) => rule.trim())

      const jsObjects: string[] = []

      rules.forEach((rule) => {
        const [selector, declarations] = rule.split('{')
        if (!selector || !declarations) return

        const cleanSelector = selector.trim().replace(/[^a-zA-Z0-9]/g, '')
        const className = cleanSelector || 'styles'

        const properties = declarations
          .split(';')
          .filter((prop) => prop.trim())
          .map((prop) => {
            const [property, value] = prop.split(':').map((s) => s.trim())
            if (!property || !value) return ''

            // Convert kebab-case to camelCase
            const camelProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase())

            // Handle numeric values
            const processedValue = value.replace(/(\d+)px/g, '$1')

            return `  ${camelProperty}: '${processedValue}'`
          })
          .filter(Boolean)
          .join(',\n')

        if (properties) {
          jsObjects.push(`const ${className} = {\n${properties}\n}`)
        }
      })

      return jsObjects.join('\n\n')
    } catch (error) {
      throw new Error('Invalid CSS format')
    }
  }

  const convertToTailwind = (css: string): string => {
    try {
      // This is a simplified conversion - in a real app you'd use a more sophisticated parser
      const cssToTailwindMap: Record<string, string> = {
        'display: flex': 'flex',
        'display: block': 'block',
        'display: inline': 'inline',
        'display: inline-block': 'inline-block',
        'display: none': 'hidden',
        'flex-direction: column': 'flex-col',
        'flex-direction: row': 'flex-row',
        'justify-content: center': 'justify-center',
        'justify-content: space-between': 'justify-between',
        'justify-content: flex-start': 'justify-start',
        'justify-content: flex-end': 'justify-end',
        'align-items: center': 'items-center',
        'align-items: flex-start': 'items-start',
        'align-items: flex-end': 'items-end',
        'text-align: center': 'text-center',
        'text-align: left': 'text-left',
        'text-align: right': 'text-right',
        'font-weight: bold': 'font-bold',
        'font-weight: normal': 'font-normal',
        'font-weight: 600': 'font-semibold',
        'color: white': 'text-white',
        'color: black': 'text-black',
        'background-color: white': 'bg-white',
        'background-color: black': 'bg-black',
        'margin: 0': 'm-0',
        'padding: 0': 'p-0',
        'border-radius: 4px': 'rounded',
        'border-radius: 8px': 'rounded-lg',
        'border-radius: 50%': 'rounded-full',
        'width: 100%': 'w-full',
        'height: 100%': 'h-full',
        'position: relative': 'relative',
        'position: absolute': 'absolute',
        'position: fixed': 'fixed',
        'overflow: hidden': 'overflow-hidden',
        'overflow: auto': 'overflow-auto',
      }

      // Remove comments and normalize
      css = css
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\s+/g, ' ')
        .trim()

      // Extract declarations
      const declarations = css.split(';').filter((decl) => decl.trim())

      const tailwindClasses: string[] = []
      const unmappedDeclarations: string[] = []

      declarations.forEach((declaration) => {
        const normalizedDecl = declaration.trim()

        // Check for exact matches
        if (cssToTailwindMap[normalizedDecl]) {
          tailwindClasses.push(cssToTailwindMap[normalizedDecl])
          return
        }

        // Handle spacing (margin, padding)
        const spacingMatch = normalizedDecl.match(/(margin|padding):\s*(\d+)px/)
        if (spacingMatch) {
          const [, property, value] = spacingMatch
          const prefix = property === 'margin' ? 'm' : 'p'
          const spacing = Math.round(Number.parseInt(value) / 4) // Convert px to Tailwind spacing scale
          tailwindClasses.push(`${prefix}-${spacing}`)
          return
        }

        // Handle font-size
        const fontSizeMatch = normalizedDecl.match(/font-size:\s*(\d+)px/)
        if (fontSizeMatch) {
          const size = Number.parseInt(fontSizeMatch[1])
          if (size <= 12) tailwindClasses.push('text-xs')
          else if (size <= 14) tailwindClasses.push('text-sm')
          else if (size <= 16) tailwindClasses.push('text-base')
          else if (size <= 18) tailwindClasses.push('text-lg')
          else if (size <= 20) tailwindClasses.push('text-xl')
          else if (size <= 24) tailwindClasses.push('text-2xl')
          else tailwindClasses.push('text-3xl')
          return
        }

        // Handle colors (basic hex colors)
        const colorMatch = normalizedDecl.match(/(color|background-color):\s*(#[0-9a-fA-F]{6})/)
        if (colorMatch) {
          const [, property, color] = colorMatch
          const prefix = property === 'color' ? 'text' : 'bg'
          unmappedDeclarations.push(`${prefix}-[${color}]`)
          return
        }

        unmappedDeclarations.push(`/* ${normalizedDecl} */`)
      })

      const result = tailwindClasses.join(' ')
      const unmapped =
        unmappedDeclarations.length > 0
          ? '\n\n// Unmapped declarations:\n' + unmappedDeclarations.join('\n')
          : ''

      return `className="${result}"${unmapped}`
    } catch (error) {
      throw new Error('Invalid CSS format')
    }
  }

  const handleConvert = () => {
    try {
      let result = ''
      switch (outputType) {
        case 'js-object':
          result = convertToJsObject(cssInput)
          break
        case 'tailwind':
          result = convertToTailwind(cssInput)
          break
      }

      setOutput(result)
    } catch (error) {
      toast({
        title: 'Conversion Error',
        description: (error as Error).message,
        variant: 'destructive',
      })
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast({
      title: 'Copied to clipboard',
      description: 'The content has been copied to your clipboard.',
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const exampleCss = `.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  margin: 8px;
  background-color: #f3f4f6;
  border-radius: 8px;
  font-size: 16px;
  color: #374151;
}`

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Palette className="mr-2 h-5 w-5" />
          CSS Converter
        </CardTitle>
        <CardDescription>Convert CSS to JavaScript objects or Tailwind CSS classes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Select
            value={outputType}
            onValueChange={(value) => setOutputType(value as 'js-object' | 'tailwind')}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select output format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="js-object">JavaScript Object</SelectItem>
              <SelectItem value="tailwind">Tailwind CSS</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" onClick={() => setCssInput(exampleCss)}>
            Load Example
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">CSS Input</label>
            <Textarea
              placeholder="Enter CSS code..."
              value={cssInput}
              onChange={(e) => setCssInput(e.target.value)}
              className="h-80 font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              {outputType === 'js-object' ? 'JavaScript Object' : 'Tailwind CSS'}
            </label>
            <div className="relative">
              <Textarea
                value={output}
                readOnly
                className="h-80 pr-10 font-mono"
                placeholder="Converted code will appear here..."
              />
              {output && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(output)}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </div>
        </div>

        <Button onClick={handleConvert} disabled={!cssInput} className="w-full">
          Convert to {outputType === 'js-object' ? 'JavaScript Object' : 'Tailwind CSS'}
        </Button>

        <div className="text-muted-foreground space-y-1 text-xs">
          <p>
            <strong>Conversion notes:</strong>
          </p>
          <ul className="ml-4 list-inside list-disc space-y-1">
            <li>
              <strong>JavaScript Object:</strong> Converts CSS properties to camelCase and removes
              units where appropriate
            </li>
            <li>
              <strong>Tailwind CSS:</strong> Maps common CSS properties to Tailwind utility classes
              (simplified conversion)
            </li>
            <li>Complex selectors and advanced CSS features may not be fully supported</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
