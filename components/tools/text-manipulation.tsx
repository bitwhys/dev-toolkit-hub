'use client'

import { useState } from 'react'
import { Check, Copy, Type } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'

export function TextManipulation() {
  const [copied, setCopied] = useState(false)

  // Case Converter
  const [caseInput, setCaseInput] = useState('')
  const [caseOutput, setCaseOutput] = useState('')

  // Text Cleaner
  const [cleanerInput, setCleanerInput] = useState('')
  const [cleanerOutput, setCleanerOutput] = useState('')

  // Text Counter
  const [counterInput, setCounterInput] = useState('')
  const [counterStats, setCounterStats] = useState<{
    chars: number
    words: number
    lines: number
    charNoSpaces: number
  }>({ chars: 0, words: 0, lines: 0, charNoSpaces: 0 })

  // Regex Tester
  const [regexInput, setRegexInput] = useState('')
  const [regexPattern, setRegexPattern] = useState('')
  const [regexFlags, setRegexFlags] = useState('g')
  const [regexMatches, setRegexMatches] = useState<string[]>([])

  const convertCase = (type: string) => {
    if (!caseInput) return

    let result = ''
    switch (type) {
      case 'lower':
        result = caseInput.toLowerCase()
        break
      case 'upper':
        result = caseInput.toUpperCase()
        break
      case 'title':
        result = caseInput
          .toLowerCase()
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
        break
      case 'camel':
        result = caseInput.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        break
      case 'pascal':
        result = caseInput
          .toLowerCase()
          .replace(/(^|[^a-zA-Z0-9]+)(.)/g, (_, __, chr) => chr.toUpperCase())
        break
      case 'snake':
        result = caseInput
          .toLowerCase()
          .replace(/\s+/g, '_')
          .replace(/[^a-zA-Z0-9_]/g, '')
        break
      case 'kebab':
        result = caseInput
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-zA-Z0-9-]/g, '')
        break
      case 'constant':
        result = caseInput
          .toUpperCase()
          .replace(/\s+/g, '_')
          .replace(/[^a-zA-Z0-9_]/g, '')
        break
    }

    setCaseOutput(result)
  }

  const cleanText = (type: string) => {
    if (!cleanerInput) return

    let result = cleanerInput
    switch (type) {
      case 'trim':
        result = cleanerInput.trim()
        break
      case 'spaces':
        result = cleanerInput.replace(/\s+/g, ' ').trim()
        break
      case 'lines':
        result = cleanerInput.replace(/\n+/g, '\n').trim()
        break
      case 'duplicates':
        // Remove duplicate lines
        const lines = cleanerInput.split('\n')
        const uniqueLines = [...new Set(lines)]
        result = uniqueLines.join('\n')
        break
      case 'empty':
        // Remove empty lines
        result = cleanerInput
          .split('\n')
          .filter((line) => line.trim() !== '')
          .join('\n')
        break
    }

    setCleanerOutput(result)
  }

  const countText = () => {
    if (!counterInput) {
      setCounterStats({ chars: 0, words: 0, lines: 0, charNoSpaces: 0 })
      return
    }

    const chars = counterInput.length
    const words = counterInput.trim().split(/\s+/).filter(Boolean).length
    const lines = counterInput.split('\n').length
    const charNoSpaces = counterInput.replace(/\s+/g, '').length

    setCounterStats({ chars, words, lines, charNoSpaces })
  }

  const testRegex = () => {
    if (!regexInput || !regexPattern) {
      setRegexMatches([])
      return
    }

    try {
      const regex = new RegExp(regexPattern, regexFlags)
      const matches = regexInput.match(regex) || []
      setRegexMatches(matches)
    } catch (error) {
      toast({
        title: 'Invalid Regex',
        description: (error as Error).message,
        variant: 'destructive',
      })
      setRegexMatches([])
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Type className="mr-2 h-5 w-5" />
          Text Manipulation
        </CardTitle>
        <CardDescription>Transform, clean, and analyze text</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="case" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="case">Case Converter</TabsTrigger>
            <TabsTrigger value="cleaner">Text Cleaner</TabsTrigger>
            <TabsTrigger value="counter">Text Counter</TabsTrigger>
            <TabsTrigger value="regex">Regex Tester</TabsTrigger>
          </TabsList>

          {/* Case Converter Tab */}
          <TabsContent value="case" className="space-y-4">
            <div>
              <Textarea
                placeholder="Enter text to convert..."
                value={caseInput}
                onChange={(e) => setCaseInput(e.target.value)}
                className="h-32"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              <Button onClick={() => convertCase('lower')} disabled={!caseInput} size="sm">
                lowercase
              </Button>
              <Button onClick={() => convertCase('upper')} disabled={!caseInput} size="sm">
                UPPERCASE
              </Button>
              <Button onClick={() => convertCase('title')} disabled={!caseInput} size="sm">
                Title Case
              </Button>
              <Button onClick={() => convertCase('camel')} disabled={!caseInput} size="sm">
                camelCase
              </Button>
              <Button onClick={() => convertCase('pascal')} disabled={!caseInput} size="sm">
                PascalCase
              </Button>
              <Button onClick={() => convertCase('snake')} disabled={!caseInput} size="sm">
                snake_case
              </Button>
              <Button onClick={() => convertCase('kebab')} disabled={!caseInput} size="sm">
                kebab-case
              </Button>
              <Button onClick={() => convertCase('constant')} disabled={!caseInput} size="sm">
                CONSTANT_CASE
              </Button>
            </div>

            {caseOutput && (
              <div className="relative">
                <div className="relative">
                  <Textarea value={caseOutput} readOnly className="h-32 pr-10" />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(caseOutput)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Text Cleaner Tab */}
          <TabsContent value="cleaner" className="space-y-4">
            <div>
              <Textarea
                placeholder="Enter text to clean..."
                value={cleanerInput}
                onChange={(e) => setCleanerInput(e.target.value)}
                className="h-32"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
              <Button onClick={() => cleanText('trim')} disabled={!cleanerInput} size="sm">
                Trim Whitespace
              </Button>
              <Button onClick={() => cleanText('spaces')} disabled={!cleanerInput} size="sm">
                Remove Extra Spaces
              </Button>
              <Button onClick={() => cleanText('lines')} disabled={!cleanerInput} size="sm">
                Remove Extra Lines
              </Button>
              <Button onClick={() => cleanText('duplicates')} disabled={!cleanerInput} size="sm">
                Remove Duplicates
              </Button>
              <Button onClick={() => cleanText('empty')} disabled={!cleanerInput} size="sm">
                Remove Empty Lines
              </Button>
            </div>

            {cleanerOutput && (
              <div className="relative">
                <div className="relative">
                  <Textarea value={cleanerOutput} readOnly className="h-32 pr-10" />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(cleanerOutput)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Text Counter Tab */}
          <TabsContent value="counter" className="space-y-4">
            <div>
              <Textarea
                placeholder="Enter text to count..."
                value={counterInput}
                onChange={(e) => {
                  setCounterInput(e.target.value)
                  // Auto-count as user types
                  const text = e.target.value
                  const chars = text.length
                  const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0
                  const lines = text ? text.split('\n').length : 0
                  const charNoSpaces = text.replace(/\s+/g, '').length
                  setCounterStats({ chars, words, lines, charNoSpaces })
                }}
                className="h-40"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="bg-muted rounded-md p-4 text-center">
                <div className="text-2xl font-bold">{counterStats.chars}</div>
                <div className="text-muted-foreground text-sm">Characters</div>
              </div>
              <div className="bg-muted rounded-md p-4 text-center">
                <div className="text-2xl font-bold">{counterStats.charNoSpaces}</div>
                <div className="text-muted-foreground text-sm">Chars (no spaces)</div>
              </div>
              <div className="bg-muted rounded-md p-4 text-center">
                <div className="text-2xl font-bold">{counterStats.words}</div>
                <div className="text-muted-foreground text-sm">Words</div>
              </div>
              <div className="bg-muted rounded-md p-4 text-center">
                <div className="text-2xl font-bold">{counterStats.lines}</div>
                <div className="text-muted-foreground text-sm">Lines</div>
              </div>
            </div>
          </TabsContent>

          {/* Regex Tester Tab */}
          <TabsContent value="regex" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="md:col-span-2">
                <Label htmlFor="regex-pattern">Regex Pattern</Label>
                <Input
                  id="regex-pattern"
                  placeholder="Enter regex pattern..."
                  value={regexPattern}
                  onChange={(e) => setRegexPattern(e.target.value)}
                  className="font-mono"
                />
              </div>
              <div>
                <Label htmlFor="regex-flags">Flags</Label>
                <Input
                  id="regex-flags"
                  placeholder="g, i, m..."
                  value={regexFlags}
                  onChange={(e) => setRegexFlags(e.target.value)}
                  className="font-mono"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="regex-input">Test String</Label>
              <Textarea
                id="regex-input"
                placeholder="Enter text to test against the regex..."
                value={regexInput}
                onChange={(e) => setRegexInput(e.target.value)}
                className="h-32"
              />
            </div>

            <Button onClick={testRegex} disabled={!regexInput || !regexPattern}>
              Test Regex
            </Button>

            <div>
              <Label>Matches ({regexMatches.length})</Label>
              <div className="bg-muted mt-2 max-h-40 overflow-y-auto rounded-md p-4">
                {regexMatches.length > 0 ? (
                  <ul className="list-disc space-y-1 pl-5">
                    {regexMatches.map((match, index) => (
                      <li key={index} className="font-mono text-sm">
                        {match}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No matches found</p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
