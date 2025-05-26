'use client'

import { useState } from 'react'
import { Check, Copy, FileCode } from 'lucide-react'
import { toast } from 'sonner'

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

export function JavaScriptConverter() {
  const [copied, setCopied] = useState(false)
  const [jsInput, setJsInput] = useState('')
  const [output, setOutput] = useState('')
  const [outputType, setOutputType] = useState<'typescript' | 'json'>('typescript')

  const convertToTypeScript = (js: string): string => {
    try {
      let ts = js

      // Add basic type annotations for function parameters
      ts = ts.replace(/function\s+(\w+)\s*$$([^)]*)$$/g, (match, funcName, params) => {
        if (!params.trim()) return `function ${funcName}(): void`

        const typedParams = params
          .split(',')
          .map((param: string) => {
            const trimmed = param.trim()
            if (trimmed.includes('=')) {
              // Default parameter
              const [name, defaultValue] = trimmed.split('=').map((s) => s.trim())
              if (defaultValue.match(/^\d+$/)) return `${name}: number = ${defaultValue}`
              if (defaultValue.match(/^["'].*["']$/)) return `${name}: string = ${defaultValue}`
              if (defaultValue === 'true' || defaultValue === 'false')
                return `${name}: boolean = ${defaultValue}`
              return `${name}: any = ${defaultValue}`
            }
            return `${trimmed}: any`
          })
          .join(', ')

        return `function ${funcName}(${typedParams}): void`
      })

      // Add type annotations for arrow functions
      ts = ts.replace(/const\s+(\w+)\s*=\s*$$([^)]*)$$\s*=>/g, (match, funcName, params) => {
        if (!params.trim()) return `const ${funcName} = (): void =>`

        const typedParams = params
          .split(',')
          .map((param: string) => {
            const trimmed = param.trim()
            return `${trimmed}: any`
          })
          .join(', ')

        return `const ${funcName} = (${typedParams}): void =>`
      })

      // Add type annotations for variables
      ts = ts.replace(/let\s+(\w+)\s*=\s*([^;]+)/g, (match, varName, value) => {
        const trimmedValue = value.trim()
        if (trimmedValue.match(/^\d+$/)) return `let ${varName}: number = ${value}`
        if (trimmedValue.match(/^["'].*["']$/)) return `let ${varName}: string = ${value}`
        if (trimmedValue === 'true' || trimmedValue === 'false')
          return `let ${varName}: boolean = ${value}`
        if (trimmedValue.startsWith('[')) return `let ${varName}: any[] = ${value}`
        if (trimmedValue.startsWith('{')) return `let ${varName}: object = ${value}`
        return `let ${varName}: any = ${value}`
      })

      ts = ts.replace(/const\s+(\w+)\s*=\s*([^;]+)/g, (match, varName, value) => {
        const trimmedValue = value.trim()
        if (trimmedValue.match(/^\d+$/)) return `const ${varName}: number = ${value}`
        if (trimmedValue.match(/^["'].*["']$/)) return `const ${varName}: string = ${value}`
        if (trimmedValue === 'true' || trimmedValue === 'false')
          return `const ${varName}: boolean = ${value}`
        if (trimmedValue.startsWith('[')) return `const ${varName}: any[] = ${value}`
        if (trimmedValue.startsWith('{')) return `const ${varName}: object = ${value}`
        return `const ${varName}: any = ${value}`
      })

      // Add interface for object literals
      const objectMatches = ts.match(/const\s+(\w+):\s*object\s*=\s*\{[^}]+\}/g)
      if (objectMatches) {
        const interfaces: string[] = []
        objectMatches.forEach((match) => {
          const nameMatch = match.match(/const\s+(\w+):/)
          if (nameMatch) {
            const varName = nameMatch[1]
            const interfaceName = varName.charAt(0).toUpperCase() + varName.slice(1)
            interfaces.push(
              `interface ${interfaceName} {\n  // Define properties here\n  [key: string]: any\n}`,
            )
            ts = ts.replace(`const ${varName}: object`, `const ${varName}: ${interfaceName}`)
          }
        })

        if (interfaces.length > 0) {
          ts = interfaces.join('\n\n') + '\n\n' + ts
        }
      }

      return ts
    } catch (error) {
      throw new Error('Invalid JavaScript format')
    }
  }

  const convertToJson = (js: string): string => {
    try {
      // Try to extract object literals and arrays
      const objectMatches = js.match(/\{[^{}]*\}/g) || []
      const arrayMatches = js.match(/\[[^[\]]*\]/g) || []

      const extractedData: any = {}

      // Extract variable assignments
      const varMatches = js.match(/(const|let|var)\s+(\w+)\s*=\s*([^;]+)/g) || []

      varMatches.forEach((match) => {
        const parts = match.match(/(const|let|var)\s+(\w+)\s*=\s*([^;]+)/)
        if (parts) {
          const [, , varName, value] = parts
          try {
            // Try to evaluate simple values
            const trimmedValue = value.trim()
            if (trimmedValue.match(/^\d+$/)) {
              extractedData[varName] = Number.parseInt(trimmedValue)
            } else if (trimmedValue.match(/^\d*\.\d+$/)) {
              extractedData[varName] = Number.parseFloat(trimmedValue)
            } else if (trimmedValue === 'true') {
              extractedData[varName] = true
            } else if (trimmedValue === 'false') {
              extractedData[varName] = false
            } else if (trimmedValue.match(/^["'].*["']$/)) {
              extractedData[varName] = trimmedValue.slice(1, -1)
            } else if (trimmedValue.startsWith('[') && trimmedValue.endsWith(']')) {
              try {
                extractedData[varName] = JSON.parse(trimmedValue)
              } catch {
                extractedData[varName] = trimmedValue
              }
            } else if (trimmedValue.startsWith('{') && trimmedValue.endsWith('}')) {
              try {
                // Simple object parsing
                const objStr = trimmedValue.replace(/(\w+):/g, '"$1":').replace(/'/g, '"')
                extractedData[varName] = JSON.parse(objStr)
              } catch {
                extractedData[varName] = trimmedValue
              }
            } else {
              extractedData[varName] = trimmedValue
            }
          } catch {
            extractedData[varName] = value.trim()
          }
        }
      })

      // Extract function names
      const functionMatches = js.match(/function\s+(\w+)/g) || []
      const functions = functionMatches.map((match) => {
        const name = match.replace('function ', '')
        return name
      })

      if (functions.length > 0) {
        extractedData._functions = functions
      }

      return JSON.stringify(extractedData, null, 2)
    } catch (error) {
      throw new Error('Could not extract JSON data from JavaScript')
    }
  }

  const handleConvert = () => {
    try {
      let result = ''
      switch (outputType) {
        case 'typescript':
          result = convertToTypeScript(jsInput)
          break
        case 'json':
          result = convertToJson(jsInput)
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

  const exampleJs = `const userName = "John Doe"
const userAge = 30
const isActive = true
const hobbies = ["reading", "coding", "gaming"]

const userProfile = {
  name: userName,
  age: userAge,
  active: isActive,
  interests: hobbies
}

function greetUser(name, age = 25) {
  return "Hello " + name + ", you are " + age + " years old"
}

const calculateAge = (birthYear) => {
  return new Date().getFullYear() - birthYear
}`

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileCode className="mr-2 h-5 w-5" />
          JavaScript Converter
        </CardTitle>
        <CardDescription>
          Convert JavaScript to TypeScript with type annotations or extract data as JSON
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Select
            value={outputType}
            onValueChange={(value) => setOutputType(value as 'typescript' | 'json')}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select output format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="typescript">TypeScript</SelectItem>
              <SelectItem value="json">JSON Data</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" onClick={() => setJsInput(exampleJs)}>
            Load Example
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">JavaScript Input</label>
            <Textarea
              placeholder="Enter JavaScript code..."
              value={jsInput}
              onChange={(e) => setJsInput(e.target.value)}
              className="h-80 font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              {outputType === 'typescript' ? 'TypeScript Output' : 'JSON Data'}
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

        <Button onClick={handleConvert} disabled={!jsInput} className="w-full">
          Convert to {outputType === 'typescript' ? 'TypeScript' : 'JSON'}
        </Button>

        <div className="text-muted-foreground space-y-1 text-xs">
          <p>
            <strong>Conversion notes:</strong>
          </p>
          <ul className="ml-4 list-inside list-disc space-y-1">
            <li>
              <strong>TypeScript:</strong> Adds basic type annotations based on inferred types
            </li>
            <li>
              <strong>JSON:</strong> Extracts variable values and function names as structured data
            </li>
            <li>Complex JavaScript features may require manual type refinement</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
