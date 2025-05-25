"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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
      title: "Copied to clipboard",
      description: "Code has been copied to your clipboard.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split("\n")

  return (
    <div className="relative">
      {title && (
        <div className="flex items-center justify-between bg-muted px-4 py-2 rounded-t-lg border-b">
          <span className="text-sm font-medium">{title}</span>
          <span className="text-xs text-muted-foreground uppercase">{language}</span>
        </div>
      )}

      <div className="relative">
        <pre className={`bg-muted p-4 overflow-x-auto text-sm ${title ? "rounded-t-none" : "rounded-lg"} rounded-b-lg`}>
          <code className="language-{language.toLowerCase()}">
            {showLineNumbers ? (
              <div className="flex">
                <div className="select-none text-muted-foreground pr-4 border-r border-border mr-4">
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
