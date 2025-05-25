'use client'

import { useState } from 'react'
import { Check, Copy, Database } from 'lucide-react'

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

export function JsonSchemaConverter() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const [jsonSchemaInput, setJsonSchemaInput] = useState('')
  const [output, setOutput] = useState('')
  const [outputType, setOutputType] = useState<'openapi' | 'typescript' | 'zod'>('typescript')

  const convertToTypeScript = (schema: any, interfaceName = 'Schema'): string => {
    const convertType = (prop: any): string => {
      if (prop.type === 'string') {
        if (prop.enum) {
          return prop.enum.map((e: string) => `"${e}"`).join(' | ')
        }
        return 'string'
      }
      if (prop.type === 'number' || prop.type === 'integer') return 'number'
      if (prop.type === 'boolean') return 'boolean'
      if (prop.type === 'array') {
        if (prop.items) {
          return `${convertType(prop.items)}[]`
        }
        return 'any[]'
      }
      if (prop.type === 'object') {
        if (prop.properties) {
          const props = Object.entries(prop.properties)
            .map(([key, value]: [string, any]) => {
              const optional = !prop.required?.includes(key) ? '?' : ''
              return `  ${key}${optional}: ${convertType(value)}`
            })
            .join('\n')
          return `{\n${props}\n}`
        }
        return 'Record<string, any>'
      }
      return 'any'
    }

    if (schema.type === 'object' && schema.properties) {
      const props = Object.entries(schema.properties)
        .map(([key, value]: [string, any]) => {
          const optional = !schema.required?.includes(key) ? '?' : ''
          return `  ${key}${optional}: ${convertType(value)}`
        })
        .join('\n')

      return `interface ${interfaceName} {\n${props}\n}`
    }

    return `type ${interfaceName} = ${convertType(schema)}`
  }

  const convertToZod = (schema: any): string => {
    const convertType = (prop: any): string => {
      if (prop.type === 'string') {
        if (prop.enum) {
          return `z.enum([${prop.enum.map((e: string) => `"${e}"`).join(', ')}])`
        }
        let zodString = 'z.string()'
        if (prop.minLength) zodString += `.min(${prop.minLength})`
        if (prop.maxLength) zodString += `.max(${prop.maxLength})`
        if (prop.pattern) zodString += `.regex(/${prop.pattern}/)`
        return zodString
      }
      if (prop.type === 'number') {
        let zodNumber = 'z.number()'
        if (prop.minimum) zodNumber += `.min(${prop.minimum})`
        if (prop.maximum) zodNumber += `.max(${prop.maximum})`
        return zodNumber
      }
      if (prop.type === 'integer') return 'z.number().int()'
      if (prop.type === 'boolean') return 'z.boolean()'
      if (prop.type === 'array') {
        if (prop.items) {
          return `z.array(${convertType(prop.items)})`
        }
        return 'z.array(z.any())'
      }
      if (prop.type === 'object') {
        if (prop.properties) {
          const props = Object.entries(prop.properties)
            .map(([key, value]: [string, any]) => {
              const zodType = convertType(value)
              const optional = !prop.required?.includes(key) ? '.optional()' : ''
              return `  ${key}: ${zodType}${optional}`
            })
            .join(',\n')
          return `z.object({\n${props}\n})`
        }
        return 'z.record(z.any())'
      }
      return 'z.any()'
    }

    const zodSchema = convertType(schema)
    return `import { z } from "zod"\n\nconst schema = ${zodSchema}\n\ntype Schema = z.infer<typeof schema>`
  }

  const convertToOpenAPI = (schema: any): string => {
    const openApiSchema = {
      openapi: '3.0.0',
      info: {
        title: 'Generated API',
        version: '1.0.0',
      },
      components: {
        schemas: {
          Schema: schema,
        },
      },
    }

    return JSON.stringify(openApiSchema, null, 2)
  }

  const handleConvert = () => {
    try {
      const parsedSchema = JSON.parse(jsonSchemaInput)

      let result = ''
      switch (outputType) {
        case 'typescript':
          result = convertToTypeScript(parsedSchema)
          break
        case 'zod':
          result = convertToZod(parsedSchema)
          break
        case 'openapi':
          result = convertToOpenAPI(parsedSchema)
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

  const exampleSchema = `{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1
    },
    "age": {
      "type": "integer",
      "minimum": 0,
      "maximum": 120
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "status": {
      "type": "string",
      "enum": ["active", "inactive", "pending"]
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  },
  "required": ["name", "email"]
}`

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="mr-2 h-5 w-5" />
          JSON Schema Converter
        </CardTitle>
        <CardDescription>
          Convert JSON Schema to OpenAPI Schema, TypeScript interfaces, or Zod schemas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Select
            value={outputType}
            onValueChange={(value) => setOutputType(value as 'openapi' | 'typescript' | 'zod')}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select output format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="typescript">TypeScript Interface</SelectItem>
              <SelectItem value="zod">Zod Schema</SelectItem>
              <SelectItem value="openapi">OpenAPI Schema</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" onClick={() => setJsonSchemaInput(exampleSchema)}>
            Load Example
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">JSON Schema Input</label>
            <Textarea
              placeholder="Enter JSON Schema..."
              value={jsonSchemaInput}
              onChange={(e) => setJsonSchemaInput(e.target.value)}
              className="h-80 font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              {outputType === 'typescript' && 'TypeScript Interface'}
              {outputType === 'zod' && 'Zod Schema'}
              {outputType === 'openapi' && 'OpenAPI Schema'}
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

        <Button onClick={handleConvert} disabled={!jsonSchemaInput} className="w-full">
          Convert to{' '}
          {outputType === 'typescript' ? 'TypeScript' : outputType === 'zod' ? 'Zod' : 'OpenAPI'}
        </Button>

        <div className="text-muted-foreground space-y-1 text-xs">
          <p>
            <strong>Supported conversions:</strong>
          </p>
          <ul className="ml-4 list-inside list-disc space-y-1">
            <li>
              <strong>TypeScript:</strong> Generates interfaces with proper types and optional
              properties
            </li>
            <li>
              <strong>Zod:</strong> Creates Zod schemas with validation rules
            </li>
            <li>
              <strong>OpenAPI:</strong> Wraps schema in OpenAPI 3.0 specification format
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
