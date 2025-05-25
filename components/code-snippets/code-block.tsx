'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'

interface CodeBlockProps {
  code: string
  language: string
  title?: string
  showLineNumbers?: boolean
}

export function CodeBlock({ code, language, title, showLineNumbers = true }: CodeBlockProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    toast({
      title: 'Copied to clipboard',
      description: 'Code has been copied to your clipboard.',
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split('\n')

  return (
    <div className="relative">
      {title && (
        <div className="bg-muted flex items-center justify-between rounded-t-lg border-b px-4 py-2">
          <span className="text-sm font-medium">{title}</span>
          <span className="text-muted-foreground text-xs uppercase">{language}</span>
        </div>
      )}

      <div className="relative">
        <pre
          className={`bg-muted overflow-x-auto p-4 text-sm ${title ? 'rounded-t-none' : 'rounded-lg'} rounded-b-lg`}
        >
          <code className="language-{language.toLowerCase()}">
            {showLineNumbers ? (
              <div className="flex">
                <div className="text-muted-foreground border-border mr-4 border-r pr-4 select-none">
                  {lines.map((_, index) => (
                    <div key={index} className="text-right">
                      {index + 1}
                    </div>
                  ))}
                </div>
                <div className="flex-1">
                  {lines.map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
              </div>
            ) : (
              code
            )}
          </code>
        </pre>

        <Button variant="outline" size="sm" className="absolute top-2 right-2" onClick={handleCopy}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
