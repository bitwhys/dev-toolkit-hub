'use client'

import { useMemo, useState } from 'react'
import { Copy, FileText, GitCompare, RotateCcw } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'

interface DiffLine {
  type: 'added' | 'removed' | 'modified' | 'unchanged'
  content: string
  lineNumber?: number
  originalLineNumber?: number
}

interface DiffOptions {
  ignoreWhitespace: boolean
  ignoreCase: boolean
  wordLevel: boolean
}

export function TextDiff() {
  const [originalText, setOriginalText] = useState('')
  const [modifiedText, setModifiedText] = useState('')
  const [options, setOptions] = useState<DiffOptions>({
    ignoreWhitespace: false,
    ignoreCase: false,
    wordLevel: false,
  })

  // Simple diff algorithm
  const computeDiff = useMemo(() => {
    if (!originalText && !modifiedText) return []

    let original = originalText
    let modified = modifiedText

    // Apply options
    if (options.ignoreCase) {
      original = original.toLowerCase()
      modified = modified.toLowerCase()
    }

    if (options.ignoreWhitespace) {
      original = original.replace(/\s+/g, ' ').trim()
      modified = modified.replace(/\s+/g, ' ').trim()
    }

    const originalLines = original.split('\n')
    const modifiedLines = modified.split('\n')
    const diff: DiffLine[] = []

    const maxLines = Math.max(originalLines.length, modifiedLines.length)

    for (let i = 0; i < maxLines; i++) {
      const originalLine = originalLines[i] || ''
      const modifiedLine = modifiedLines[i] || ''

      if (i >= originalLines.length) {
        // Line added
        diff.push({
          type: 'added',
          content: modifiedLine,
          lineNumber: i + 1,
        })
      } else if (i >= modifiedLines.length) {
        // Line removed
        diff.push({
          type: 'removed',
          content: originalLine,
          originalLineNumber: i + 1,
        })
      } else if (originalLine === modifiedLine) {
        // Line unchanged
        diff.push({
          type: 'unchanged',
          content: originalLine,
          lineNumber: i + 1,
          originalLineNumber: i + 1,
        })
      } else {
        // Line modified - show both
        diff.push({
          type: 'removed',
          content: originalLine,
          originalLineNumber: i + 1,
        })
        diff.push({
          type: 'added',
          content: modifiedLine,
          lineNumber: i + 1,
        })
      }
    }

    return diff
  }, [originalText, modifiedText, options])

  const stats = useMemo(() => {
    const added = computeDiff.filter((line) => line.type === 'added').length
    const removed = computeDiff.filter((line) => line.type === 'removed').length
    const modified = Math.min(added, removed)
    const totalLines = Math.max(originalText.split('\n').length, modifiedText.split('\n').length)

    return { added, removed, modified, totalLines }
  }, [computeDiff, originalText, modifiedText])

  const handleClear = () => {
    setOriginalText('')
    setModifiedText('')
  }

  const handleLoadSample = () => {
    setOriginalText(`function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3
};`)

    setModifiedText(`function calculateTotal(items, tax = 0) {
  let total = 0;
  for (const item of items) {
    total += item.price * (1 + tax);
  }
  return Math.round(total * 100) / 100;
}

const config = {
  apiUrl: 'https://api.newdomain.com',
  timeout: 10000,
  retries: 5,
  cache: true
};`)
  }

  const copyDiff = () => {
    const diffText = computeDiff
      .map((line) => {
        const prefix = line.type === 'added' ? '+ ' : line.type === 'removed' ? '- ' : '  '
        return prefix + line.content
      })
      .join('\n')

    navigator.clipboard.writeText(diffText)
  }

  const DiffLineComponent = ({ line, index }: { line: DiffLine; index: number }) => {
    const getLineStyle = () => {
      switch (line.type) {
        case 'added':
          return 'bg-green-50 border-l-4 border-l-green-500 text-green-800 dark:bg-green-950 dark:text-green-200'
        case 'removed':
          return 'bg-red-50 border-l-4 border-l-red-500 text-red-800 dark:bg-red-950 dark:text-red-200'
        case 'unchanged':
          return 'bg-gray-50 border-l-4 border-l-gray-300 text-gray-700 dark:bg-gray-900 dark:text-gray-300'
        default:
          return ''
      }
    }

    const getPrefix = () => {
      switch (line.type) {
        case 'added':
          return '+'
        case 'removed':
          return '-'
        default:
          return ' '
      }
    }

    return (
      <div
        key={index}
        className={cn('flex items-start gap-2 px-3 py-1 font-mono text-sm', getLineStyle())}
      >
        <span className="w-6 text-center text-xs opacity-60">{getPrefix()}</span>
        <span className="w-8 text-right text-xs opacity-60">
          {line.type === 'removed' ? line.originalLineNumber : line.lineNumber}
        </span>
        <span className="flex-1 break-all whitespace-pre-wrap">{line.content || ' '}</span>
      </div>
    )
  }

  const SideBySideView = () => {
    const originalLines = originalText.split('\n')
    const modifiedLines = modifiedText.split('\n')
    const maxLines = Math.max(originalLines.length, modifiedLines.length)

    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-red-600 dark:text-red-400">Original</h3>
          <div className="overflow-hidden rounded-lg border">
            {Array.from({ length: maxLines }, (_, i) => (
              <div
                key={i}
                className={cn(
                  'flex items-start gap-2 px-3 py-1 font-mono text-sm',
                  i >= originalLines.length
                    ? 'bg-gray-100 dark:bg-gray-800'
                    : originalLines[i] !== (modifiedLines[i] || '')
                      ? 'border-l-4 border-l-red-500 bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200'
                      : 'border-l-4 border-l-gray-300 bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-300',
                )}
              >
                <span className="w-8 text-right text-xs opacity-60">{i + 1}</span>
                <span className="flex-1 break-all whitespace-pre-wrap">
                  {originalLines[i] || ''}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-green-600 dark:text-green-400">Modified</h3>
          <div className="overflow-hidden rounded-lg border">
            {Array.from({ length: maxLines }, (_, i) => (
              <div
                key={i}
                className={cn(
                  'flex items-start gap-2 px-3 py-1 font-mono text-sm',
                  i >= modifiedLines.length
                    ? 'bg-gray-100 dark:bg-gray-800'
                    : modifiedLines[i] !== (originalLines[i] || '')
                      ? 'border-l-4 border-l-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200'
                      : 'border-l-4 border-l-gray-300 bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-300',
                )}
              >
                <span className="w-8 text-right text-xs opacity-60">{i + 1}</span>
                <span className="flex-1 break-all whitespace-pre-wrap">
                  {modifiedLines[i] || ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitCompare className="h-5 w-5" />
            Text Diff Checker
          </CardTitle>
          <CardDescription>
            Compare two pieces of text and see the differences highlighted. Perfect for code
            reviews, configuration comparisons, or tracking changes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Options */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="ignore-whitespace"
                checked={options.ignoreWhitespace}
                onCheckedChange={(checked) =>
                  setOptions((prev) => ({ ...prev, ignoreWhitespace: checked }))
                }
              />
              <Label htmlFor="ignore-whitespace">Ignore whitespace</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="ignore-case"
                checked={options.ignoreCase}
                onCheckedChange={(checked) =>
                  setOptions((prev) => ({ ...prev, ignoreCase: checked }))
                }
              />
              <Label htmlFor="ignore-case">Ignore case</Label>
            </div>
          </div>

          {/* Input Areas */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="original">Original Text</Label>
              <Textarea
                id="original"
                placeholder="Paste your original text here..."
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="modified">Modified Text</Label>
              <Textarea
                id="modified"
                placeholder="Paste your modified text here..."
                value={modifiedText}
                onChange={(e) => setModifiedText(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleLoadSample} variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Load Sample
            </Button>
            <Button onClick={handleClear} variant="outline" size="sm">
              <RotateCcw className="mr-2 h-4 w-4" />
              Clear All
            </Button>
            {computeDiff.length > 0 && (
              <Button onClick={copyDiff} variant="outline" size="sm">
                <Copy className="mr-2 h-4 w-4" />
                Copy Diff
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {(originalText || modifiedText) && (
        <Card>
          <CardHeader>
            <CardTitle>Diff Results</CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-green-600">
                +{stats.added} added
              </Badge>
              <Badge variant="outline" className="text-red-600">
                -{stats.removed} removed
              </Badge>
              <Badge variant="outline">{stats.totalLines} total lines</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="unified" className="w-full">
              <TabsList>
                <TabsTrigger value="unified">Unified View</TabsTrigger>
                <TabsTrigger value="side-by-side">Side by Side</TabsTrigger>
              </TabsList>

              <TabsContent value="unified" className="mt-4">
                <div className="max-h-[600px] overflow-hidden overflow-y-auto rounded-lg border">
                  {computeDiff.length > 0 ? (
                    computeDiff.map((line, index) => (
                      <DiffLineComponent key={index} line={line} index={index} />
                    ))
                  ) : (
                    <div className="text-muted-foreground p-4 text-center">
                      No differences found
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="side-by-side" className="mt-4">
                <div className="max-h-[600px] overflow-y-auto">
                  <SideBySideView />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Help */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold">Color Legend</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-sm border-l-4 border-green-500 bg-green-200"></div>
                  <span>Added lines</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-sm border-l-4 border-red-500 bg-red-200"></div>
                  <span>Removed lines</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-sm border-l-4 border-gray-300 bg-gray-200"></div>
                  <span>Unchanged lines</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Tips</h4>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>• Use "Ignore whitespace" for code formatting changes</li>
                <li>• Use "Ignore case" for case-insensitive comparisons</li>
                <li>• Switch between unified and side-by-side views</li>
                <li>• Copy the diff output for sharing or documentation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
