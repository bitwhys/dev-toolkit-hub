'use client'

import { useState } from 'react'
import { ArrowLeftRight, Check, Code, Copy } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'

export function HtmlJsxConverter() {
  const [copied, setCopied] = useState(false)
  const [htmlInput, setHtmlInput] = useState('')
  const [jsxOutput, setJsxOutput] = useState('')
  const [mode, setMode] = useState<'html-to-jsx' | 'jsx-to-html'>('html-to-jsx')

  const convertHtmlToJsx = (html: string): string => {
    let jsx = html

    // Convert self-closing tags
    jsx = jsx.replace(
      /<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)([^>]*?)>/gi,
      '<$1$2 />',
    )

    // Convert attributes
    jsx = jsx.replace(/class=/g, 'className=')
    jsx = jsx.replace(/for=/g, 'htmlFor=')
    jsx = jsx.replace(/tabindex=/g, 'tabIndex=')
    jsx = jsx.replace(/readonly=/g, 'readOnly=')
    jsx = jsx.replace(/maxlength=/g, 'maxLength=')
    jsx = jsx.replace(/cellpadding=/g, 'cellPadding=')
    jsx = jsx.replace(/cellspacing=/g, 'cellSpacing=')
    jsx = jsx.replace(/rowspan=/g, 'rowSpan=')
    jsx = jsx.replace(/colspan=/g, 'colSpan=')
    jsx = jsx.replace(/usemap=/g, 'useMap=')
    jsx = jsx.replace(/frameborder=/g, 'frameBorder=')
    jsx = jsx.replace(/contenteditable=/g, 'contentEditable=')
    jsx = jsx.replace(/crossorigin=/g, 'crossOrigin=')
    jsx = jsx.replace(/datetime=/g, 'dateTime=')
    jsx = jsx.replace(/enctype=/g, 'encType=')
    jsx = jsx.replace(/formaction=/g, 'formAction=')
    jsx = jsx.replace(/formenctype=/g, 'formEncType=')
    jsx = jsx.replace(/formmethod=/g, 'formMethod=')
    jsx = jsx.replace(/formnovalidate=/g, 'formNoValidate=')
    jsx = jsx.replace(/formtarget=/g, 'formTarget=')
    jsx = jsx.replace(/hreflang=/g, 'hrefLang=')
    jsx = jsx.replace(/marginheight=/g, 'marginHeight=')
    jsx = jsx.replace(/marginwidth=/g, 'marginWidth=')
    jsx = jsx.replace(/novalidate=/g, 'noValidate=')
    jsx = jsx.replace(/radiogroup=/g, 'radioGroup=')
    jsx = jsx.replace(/spellcheck=/g, 'spellCheck=')
    jsx = jsx.replace(/srcdoc=/g, 'srcDoc=')
    jsx = jsx.replace(/srclang=/g, 'srcLang=')
    jsx = jsx.replace(/srcset=/g, 'srcSet=')
    jsx = jsx.replace(/autofocus=/g, 'autoFocus=')
    jsx = jsx.replace(/autoplay=/g, 'autoPlay=')
    jsx = jsx.replace(/controls=/g, 'controls=')
    jsx = jsx.replace(/defer=/g, 'defer=')
    jsx = jsx.replace(/hidden=/g, 'hidden=')
    jsx = jsx.replace(/loop=/g, 'loop=')
    jsx = jsx.replace(/open=/g, 'open=')
    jsx = jsx.replace(/required=/g, 'required=')
    jsx = jsx.replace(/reversed=/g, 'reversed=')
    jsx = jsx.replace(/selected=/g, 'selected=')
    jsx = jsx.replace(/autoComplete=/g, 'autoComplete=')
    jsx = jsx.replace(/capture=/g, 'capture=')
    jsx = jsx.replace(/challenge=/g, 'challenge=')
    jsx = jsx.replace(/charset=/g, 'charSet=')
    jsx = jsx.replace(/cite=/g, 'cite=')
    jsx = jsx.replace(/classid=/g, 'classID=')
    jsx = jsx.replace(/cols=/g, 'cols=')
    jsx = jsx.replace(/content=/g, 'content=')
    jsx = jsx.replace(/contextmenu=/g, 'contextMenu=')
    jsx = jsx.replace(/controls=/g, 'controls=')
    jsx = jsx.replace(/coords=/g, 'coords=')
    jsx = jsx.replace(/data=/g, 'data=')
    jsx = jsx.replace(/dirname=/g, 'dirName=')
    jsx = jsx.replace(/download=/g, 'download=')
    jsx = jsx.replace(/draggable=/g, 'draggable=')
    jsx = jsx.replace(/dropzone=/g, 'dropzone=')
    jsx = jsx.replace(/form=/g, 'form=')
    jsx = jsx.replace(/high=/g, 'high=')
    jsx = jsx.replace(/href=/g, 'href=')
    jsx = jsx.replace(/icon=/g, 'icon=')
    jsx = jsx.replace(/id=/g, 'id=')
    jsx = jsx.replace(/inputmode=/g, 'inputMode=')
    jsx = jsx.replace(/is=/g, 'is=')
    jsx = jsx.replace(/itemid=/g, 'itemID=')
    jsx = jsx.replace(/itemprop=/g, 'itemProp=')
    jsx = jsx.replace(/itemref=/g, 'itemRef=')
    jsx = jsx.replace(/itemscope=/g, 'itemScope=')
    jsx = jsx.replace(/itemtype=/g, 'itemType=')
    jsx = jsx.replace(/keyparams=/g, 'keyParams=')
    jsx = jsx.replace(/keytype=/g, 'keyType=')
    jsx = jsx.replace(/kind=/g, 'kind=')
    jsx = jsx.replace(/label=/g, 'label=')
    jsx = jsx.replace(/lang=/g, 'lang=')
    jsx = jsx.replace(/list=/g, 'list=')
    jsx = jsx.replace(/low=/g, 'low=')
    jsx = jsx.replace(/manifest=/g, 'manifest=')
    jsx = jsx.replace(/max=/g, 'max=')
    jsx = jsx.replace(/media=/g, 'media=')
    jsx = jsx.replace(/mediagroup=/g, 'mediaGroup=')
    jsx = jsx.replace(/method=/g, 'method=')
    jsx = jsx.replace(/min=/g, 'min=')
    jsx = jsx.replace(/minlength=/g, 'minLength=')
    jsx = jsx.replace(/multiple=/g, 'multiple=')
    jsx = jsx.replace(/muted=/g, 'muted=')
    jsx = jsx.replace(/name=/g, 'name=')
    jsx = jsx.replace(/nonce=/g, 'nonce=')
    jsx = jsx.replace(/optimum=/g, 'optimum=')
    jsx = jsx.replace(/pattern=/g, 'pattern=')
    jsx = jsx.replace(/placeholder=/g, 'placeholder=')
    jsx = jsx.replace(/poster=/g, 'poster=')
    jsx = jsx.replace(/preload=/g, 'preload=')
    jsx = jsx.replace(/rel=/g, 'rel=')
    jsx = jsx.replace(/role=/g, 'role=')
    jsx = jsx.replace(/rows=/g, 'rows=')
    jsx = jsx.replace(/sandbox=/g, 'sandbox=')
    jsx = jsx.replace(/scope=/g, 'scope=')
    jsx = jsx.replace(/scoped=/g, 'scoped=')
    jsx = jsx.replace(/scrolling=/g, 'scrolling=')
    jsx = jsx.replace(/security=/g, 'security=')
    jsx = jsx.replace(/shape=/g, 'shape=')
    jsx = jsx.replace(/size=/g, 'size=')
    jsx = jsx.replace(/sizes=/g, 'sizes=')
    jsx = jsx.replace(/span=/g, 'span=')
    jsx = jsx.replace(/src=/g, 'src=')
    jsx = jsx.replace(/start=/g, 'start=')
    jsx = jsx.replace(/step=/g, 'step=')
    jsx = jsx.replace(/style=/g, 'style=')
    jsx = jsx.replace(/summary=/g, 'summary=')
    jsx = jsx.replace(/target=/g, 'target=')
    jsx = jsx.replace(/title=/g, 'title=')
    jsx = jsx.replace(/type=/g, 'type=')
    jsx = jsx.replace(/value=/g, 'value=')
    jsx = jsx.replace(/width=/g, 'width=')
    jsx = jsx.replace(/wmode=/g, 'wmode=')
    jsx = jsx.replace(/wrap=/g, 'wrap=')

    // Convert style attribute to object notation
    jsx = jsx.replace(/style="([^"]*)"/g, (match, styles) => {
      const styleObj = styles
        .split(';')
        .filter((style: string) => style.trim())
        .map((style: string) => {
          const [property, value] = style.split(':').map((s: string) => s.trim())
          if (property && value) {
            const camelCaseProperty = property.replace(/-([a-z])/g, (g: string) =>
              g[1].toUpperCase(),
            )
            return `${camelCaseProperty}: '${value}'`
          }
          return ''
        })
        .filter(Boolean)
        .join(', ')

      return `style={{${styleObj}}}`
    })

    // Convert comments
    jsx = jsx.replace(/<!--(.*?)-->/g, '{/* $1 */}')

    return jsx
  }

  const convertJsxToHtml = (jsx: string): string => {
    let html = jsx

    // Convert JSX comments back to HTML comments
    html = html.replace(/\{\/\*(.*?)\*\/\}/g, '<!--$1-->')

    // Convert style objects back to strings
    html = html.replace(/style=\{\{([^}]*)\}\}/g, (match, styles) => {
      const styleString = styles
        .split(',')
        .map((style: string) => {
          const [property, value] = style.split(':').map((s: string) => s.trim())
          if (property && value) {
            const kebabCaseProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase()
            const cleanValue = value.replace(/['"]/g, '')
            return `${kebabCaseProperty}: ${cleanValue}`
          }
          return ''
        })
        .filter(Boolean)
        .join('; ')

      return `style="${styleString}"`
    })

    // Convert JSX attributes back to HTML
    html = html.replace(/className=/g, 'class=')
    html = html.replace(/htmlFor=/g, 'for=')
    html = html.replace(/tabIndex=/g, 'tabindex=')
    html = html.replace(/readOnly=/g, 'readonly=')
    html = html.replace(/maxLength=/g, 'maxlength=')
    html = html.replace(/cellPadding=/g, 'cellpadding=')
    html = html.replace(/cellSpacing=/g, 'cellspacing=')
    html = html.replace(/rowSpan=/g, 'rowspan=')
    html = html.replace(/colSpan=/g, 'colspan=')
    html = html.replace(/useMap=/g, 'usemap=')
    html = html.replace(/frameBorder=/g, 'frameborder=')
    html = html.replace(/contentEditable=/g, 'contenteditable=')
    html = html.replace(/crossOrigin=/g, 'crossorigin=')
    html = html.replace(/dateTime=/g, 'datetime=')
    html = html.replace(/encType=/g, 'enctype=')
    html = html.replace(/formAction=/g, 'formaction=')
    html = html.replace(/formEncType=/g, 'formenctype=')
    html = html.replace(/formMethod=/g, 'formmethod=')
    html = html.replace(/formNoValidate=/g, 'formnovalidate=')
    html = html.replace(/formTarget=/g, 'formtarget=')
    html = html.replace(/hrefLang=/g, 'hreflang=')
    html = html.replace(/marginHeight=/g, 'marginheight=')
    html = html.replace(/marginWidth=/g, 'marginwidth=')
    html = html.replace(/noValidate=/g, 'novalidate=')
    html = html.replace(/radioGroup=/g, 'radiogroup=')
    html = html.replace(/spellCheck=/g, 'spellcheck=')
    html = html.replace(/srcDoc=/g, 'srcdoc=')
    html = html.replace(/srcLang=/g, 'srclang=')
    html = html.replace(/srcSet=/g, 'srcset=')
    html = html.replace(/autoFocus=/g, 'autofocus=')
    html = html.replace(/autoPlay=/g, 'autoplay=')
    html = html.replace(/inputMode=/g, 'inputmode=')
    html = html.replace(/itemID=/g, 'itemid=')
    html = html.replace(/itemProp=/g, 'itemprop=')
    html = html.replace(/itemRef=/g, 'itemref=')
    html = html.replace(/itemScope=/g, 'itemscope=')
    html = html.replace(/itemType=/g, 'itemtype=')
    html = html.replace(/keyParams=/g, 'keyparams=')
    html = html.replace(/keyType=/g, 'keytype=')
    html = html.replace(/mediaGroup=/g, 'mediagroup=')
    html = html.replace(/minLength=/g, 'minlength=')

    // Remove self-closing slashes for void elements
    html = html.replace(
      /<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)([^>]*?) \/>/gi,
      '<$1$2>',
    )

    return html
  }

  const handleConvert = () => {
    try {
      if (mode === 'html-to-jsx') {
        const result = convertHtmlToJsx(htmlInput)
        setJsxOutput(result)
      } else {
        const result = convertJsxToHtml(htmlInput)
        setJsxOutput(result)
      }
    } catch (error) {
      toast({
        title: 'Conversion Error',
        description: (error as Error).message,
        variant: 'destructive',
      })
    }
  }

  const swapInputOutput = () => {
    const temp = htmlInput
    setHtmlInput(jsxOutput)
    setJsxOutput(temp)
    setMode(mode === 'html-to-jsx' ? 'jsx-to-html' : 'html-to-jsx')
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
          <Code className="mr-2 h-5 w-5" />
          HTML ⇄ JSX Converter
        </CardTitle>
        <CardDescription>Convert between HTML and JSX syntax for React development</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Tabs
            value={mode}
            onValueChange={(value) => setMode(value as 'html-to-jsx' | 'jsx-to-html')}
          >
            <TabsList>
              <TabsTrigger value="html-to-jsx">HTML to JSX</TabsTrigger>
              <TabsTrigger value="jsx-to-html">JSX to HTML</TabsTrigger>
            </TabsList>
          </Tabs>

          <Button variant="outline" size="icon" onClick={swapInputOutput}>
            <ArrowLeftRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {mode === 'html-to-jsx' ? 'HTML Input' : 'JSX Input'}
            </label>
            <Textarea
              placeholder={mode === 'html-to-jsx' ? 'Enter HTML code...' : 'Enter JSX code...'}
              value={htmlInput}
              onChange={(e) => setHtmlInput(e.target.value)}
              className="h-64 font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              {mode === 'html-to-jsx' ? 'JSX Output' : 'HTML Output'}
            </label>
            <div className="relative">
              <Textarea
                value={jsxOutput}
                readOnly
                className="h-64 pr-10 font-mono"
                placeholder="Converted code will appear here..."
              />
              {jsxOutput && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(jsxOutput)}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </div>
        </div>

        <Button onClick={handleConvert} disabled={!htmlInput} className="w-full">
          Convert {mode === 'html-to-jsx' ? 'HTML to JSX' : 'JSX to HTML'}
        </Button>

        <div className="text-muted-foreground space-y-1 text-xs">
          <p>
            <strong>HTML to JSX conversions:</strong>
          </p>
          <ul className="ml-4 list-inside list-disc space-y-1">
            <li>class → className</li>
            <li>for → htmlFor</li>
            <li>Self-closing tags get proper JSX syntax</li>
            <li>Style strings become style objects</li>
            <li>HTML comments become JSX comments</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
