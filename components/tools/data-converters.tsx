'use client'

import { useState } from 'react'
import { ArrowLeftRight, Check, Copy, RefreshCw } from 'lucide-react'

import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'

export function DataConverters() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  // Base64 Converter
  const [base64Input, setBase64Input] = useState('')
  const [base64Output, setBase64Output] = useState('')
  const [base64Mode, setBase64Mode] = useState('encode')

  // Hex Converter
  const [hexInput, setHexInput] = useState('')
  const [hexOutput, setHexOutput] = useState('')
  const [hexMode, setHexMode] = useState('encode')

  // URL Encoder/Decoder
  const [urlInput, setUrlInput] = useState('')
  const [urlOutput, setUrlOutput] = useState('')
  const [urlMode, setUrlMode] = useState('encode')

  // Base Converter
  const [baseInput, setBaseInput] = useState('')
  const [baseOutput, setBaseOutput] = useState('')
  const [fromBase, setFromBase] = useState('10')
  const [toBase, setToBase] = useState('16')

  const convertBase64 = () => {
    try {
      if (base64Mode === 'encode') {
        setBase64Output(btoa(base64Input))
      } else {
        setBase64Output(atob(base64Input))
      }
    } catch (error) {
      toast({
        title: 'Conversion Error',
        description: (error as Error).message,
        variant: 'destructive',
      })
    }
  }

  const convertHex = () => {
    try {
      if (hexMode === 'encode') {
        // Text to Hex
        const hex = Array.from(hexInput)
          .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
          .join('')
        setHexOutput(hex)
      } else {
        // Hex to Text
        const hex = hexInput.replace(/\s+/g, '')
        const bytes = new Uint8Array(hex.length / 2)
        for (let i = 0; i < hex.length; i += 2) {
          bytes[i / 2] = Number.parseInt(hex.substring(i, i + 2), 16)
        }
        setHexOutput(new TextDecoder().decode(bytes))
      }
    } catch (error) {
      toast({
        title: 'Conversion Error',
        description: (error as Error).message,
        variant: 'destructive',
      })
    }
  }

  const convertUrl = () => {
    try {
      if (urlMode === 'encode') {
        setUrlOutput(encodeURIComponent(urlInput))
      } else {
        setUrlOutput(decodeURIComponent(urlInput))
      }
    } catch (error) {
      toast({
        title: 'Conversion Error',
        description: (error as Error).message,
        variant: 'destructive',
      })
    }
  }

  const convertBase = () => {
    try {
      const fromBaseInt = Number.parseInt(fromBase)
      const toBaseInt = Number.parseInt(toBase)

      // Parse the input in the source base
      const value = Number.parseInt(baseInput, fromBaseInt)

      // Convert to the target base
      if (isNaN(value)) {
        throw new Error('Invalid input for the selected base')
      }

      setBaseOutput(value.toString(toBaseInt).toUpperCase())
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

  const swapInputOutput = (converter: string) => {
    switch (converter) {
      case 'base64':
        setBase64Input(base64Output)
        setBase64Output('')
        break
      case 'hex':
        setHexInput(hexOutput)
        setHexOutput('')
        break
      case 'url':
        setUrlInput(urlOutput)
        setUrlOutput('')
        break
      case 'base':
        setBaseInput(baseOutput)
        setBaseOutput('')
        const tempBase = fromBase
        setFromBase(toBase)
        setToBase(tempBase)
        break
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <RefreshCw className="mr-2 h-5 w-5" />
          Data Format Converters
        </CardTitle>
        <CardDescription>Convert between different data formats and encodings</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="base64" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="base64">Text ⇄ Base64</TabsTrigger>
            <TabsTrigger value="hex">Text ⇄ Hex</TabsTrigger>
            <TabsTrigger value="url">URL Encode/Decode</TabsTrigger>
            <TabsTrigger value="base">Base Converter</TabsTrigger>
          </TabsList>

          {/* Base64 Converter Tab */}
          <TabsContent value="base64" className="space-y-4">
            <div className="flex items-center justify-between">
              <Select value={base64Mode} onValueChange={setBase64Mode}>
                <SelectTrigger className="max-w-48 min-w-40">
                  <SelectValue placeholder="Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="encode">Encode to Base64</SelectItem>
                  <SelectItem value="decode">Decode from Base64</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon" onClick={() => swapInputOutput('base64')}>
                <ArrowLeftRight className="h-4 w-4" />
              </Button>
            </div>

            <div>
              <Label htmlFor="base64-input">
                {base64Mode === 'encode' ? 'Text Input' : 'Base64 Input'}
              </Label>
              <Textarea
                id="base64-input"
                placeholder={
                  base64Mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'
                }
                value={base64Input}
                onChange={(e) => setBase64Input(e.target.value)}
                className="h-24 font-mono"
              />
            </div>

            <Button onClick={convertBase64} disabled={!base64Input}>
              {base64Mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
            </Button>

            {base64Output && (
              <div className="relative">
                <Label htmlFor="base64-output">
                  {base64Mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}
                </Label>
                <div className="relative">
                  <Textarea
                    id="base64-output"
                    value={base64Output}
                    readOnly
                    className="h-24 pr-10 font-mono"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(base64Output)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Hex Converter Tab */}
          <TabsContent value="hex" className="space-y-4">
            <div className="flex items-center justify-between">
              <Select value={hexMode} onValueChange={setHexMode}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="encode">Text to Hex</SelectItem>
                  <SelectItem value="decode">Hex to Text</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon" onClick={() => swapInputOutput('hex')}>
                <ArrowLeftRight className="h-4 w-4" />
              </Button>
            </div>

            <div>
              <Label htmlFor="hex-input">{hexMode === 'encode' ? 'Text Input' : 'Hex Input'}</Label>
              <Textarea
                id="hex-input"
                placeholder={
                  hexMode === 'encode' ? 'Enter text to convert...' : 'Enter hex to convert...'
                }
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value)}
                className="h-24 font-mono"
              />
            </div>

            <Button onClick={convertHex} disabled={!hexInput}>
              {hexMode === 'encode' ? 'Convert to Hex' : 'Convert to Text'}
            </Button>

            {hexOutput && (
              <div className="relative">
                <Label htmlFor="hex-output">
                  {hexMode === 'encode' ? 'Hex Output' : 'Text Output'}
                </Label>
                <div className="relative">
                  <Textarea
                    id="hex-output"
                    value={hexOutput}
                    readOnly
                    className="h-24 pr-10 font-mono"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(hexOutput)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* URL Encoder/Decoder Tab */}
          <TabsContent value="url" className="space-y-4">
            <div className="flex items-center justify-between">
              <Select value={urlMode} onValueChange={setUrlMode}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="encode">URL Encode</SelectItem>
                  <SelectItem value="decode">URL Decode</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon" onClick={() => swapInputOutput('url')}>
                <ArrowLeftRight className="h-4 w-4" />
              </Button>
            </div>

            <div>
              <Label htmlFor="url-input">Input</Label>
              <Textarea
                id="url-input"
                placeholder={
                  urlMode === 'encode' ? 'Enter text to URL encode...' : 'Enter URL encoded text...'
                }
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="h-24"
              />
            </div>

            <Button onClick={convertUrl} disabled={!urlInput}>
              {urlMode === 'encode' ? 'URL Encode' : 'URL Decode'}
            </Button>

            {urlOutput && (
              <div className="relative">
                <Label htmlFor="url-output">Output</Label>
                <div className="relative">
                  <Textarea id="url-output" value={urlOutput} readOnly className="h-24 pr-10" />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(urlOutput)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Base Converter Tab */}
          <TabsContent value="base" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="from-base">From Base</Label>
                <Select value={fromBase} onValueChange={setFromBase}>
                  <SelectTrigger id="from-base">
                    <SelectValue placeholder="From Base" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">Binary (2)</SelectItem>
                    <SelectItem value="8">Octal (8)</SelectItem>
                    <SelectItem value="10">Decimal (10)</SelectItem>
                    <SelectItem value="16">Hexadecimal (16)</SelectItem>
                    <SelectItem value="36">Base36</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="to-base">To Base</Label>
                <Select value={toBase} onValueChange={setToBase}>
                  <SelectTrigger id="to-base">
                    <SelectValue placeholder="To Base" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">Binary (2)</SelectItem>
                    <SelectItem value="8">Octal (8)</SelectItem>
                    <SelectItem value="10">Decimal (10)</SelectItem>
                    <SelectItem value="16">Hexadecimal (16)</SelectItem>
                    <SelectItem value="36">Base36</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Button variant="outline" size="icon" onClick={() => swapInputOutput('base')}>
                <ArrowLeftRight className="h-4 w-4" />
              </Button>
            </div>

            <div>
              <Label htmlFor="base-input">Input (Base {fromBase})</Label>
              <Textarea
                id="base-input"
                placeholder={`Enter a number in base ${fromBase}...`}
                value={baseInput}
                onChange={(e) => setBaseInput(e.target.value)}
                className="h-24 font-mono"
              />
            </div>

            <Button onClick={convertBase} disabled={!baseInput}>
              Convert from Base {fromBase} to Base {toBase}
            </Button>

            {baseOutput && (
              <div className="relative">
                <Label htmlFor="base-output">Output (Base {toBase})</Label>
                <div className="relative">
                  <Textarea
                    id="base-output"
                    value={baseOutput}
                    readOnly
                    className="h-24 pr-10 font-mono"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(baseOutput)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
