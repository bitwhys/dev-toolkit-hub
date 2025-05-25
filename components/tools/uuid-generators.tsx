'use client'

import { useState } from 'react'
import { Check, Copy, FingerprintIcon as FingerPrint, RefreshCw } from 'lucide-react'

import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'

export function UuidGenerators() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  // UUID Generator
  const [uuidVersion, setUuidVersion] = useState('v4')
  const [uuidOutput, setUuidOutput] = useState('')
  const [uuidCount, setUuidCount] = useState(1)
  const [uuidList, setUuidList] = useState<string[]>([])

  // Password Generator
  const [passwordLength, setPasswordLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [passwordOutput, setPasswordOutput] = useState('')

  const generateUuid = () => {
    // Simple UUID v4 implementation
    const generateV4 = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    }

    // Simple UUID v1-like implementation (not truly v1, just for demo)
    const generateV1 = () => {
      const now = new Date()
      const timestamp = now.getTime()
      const timestampHex = timestamp.toString(16).padStart(12, '0')

      return `${timestampHex.slice(0, 8)}-${timestampHex.slice(8, 12)}-1${timestampHex.slice(12, 15)}-${Math.floor(Math.random() * 4 + 8).toString(16)}${Math.random().toString(16).slice(2, 5)}-${Math.random().toString(16).slice(2, 14)}`
    }

    const newUuids = []
    for (let i = 0; i < uuidCount; i++) {
      const uuid = uuidVersion === 'v4' ? generateV4() : generateV1()
      newUuids.push(uuid)
    }

    setUuidList(newUuids)
    setUuidOutput(newUuids.join('\n'))
  }

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-='

    let chars = ''
    if (includeUppercase) chars += uppercase
    if (includeLowercase) chars += lowercase
    if (includeNumbers) chars += numbers
    if (includeSymbols) chars += symbols

    if (chars.length === 0) {
      toast({
        title: 'Error',
        description: 'Please select at least one character type',
        variant: 'destructive',
      })
      return
    }

    let password = ''
    for (let i = 0; i < passwordLength; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    setPasswordOutput(password)
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
          <FingerPrint className="mr-2 h-5 w-5" />
          UUID & Random Generators
        </CardTitle>
        <CardDescription>Generate UUIDs, random strings, and secure passwords</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="uuid" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="uuid">UUID Generator</TabsTrigger>
            <TabsTrigger value="password">Password Generator</TabsTrigger>
          </TabsList>

          {/* UUID Generator Tab */}
          <TabsContent value="uuid" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="uuid-version">UUID Version</Label>
                <select
                  id="uuid-version"
                  className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  value={uuidVersion}
                  onChange={(e) => setUuidVersion(e.target.value)}
                >
                  <option value="v4">UUID v4 (Random)</option>
                  <option value="v1">UUID v1 (Time-based)</option>
                </select>
              </div>

              <div>
                <Label htmlFor="uuid-count">Count</Label>
                <Input
                  id="uuid-count"
                  type="number"
                  min="1"
                  max="100"
                  value={uuidCount}
                  onChange={(e) => setUuidCount(Number.parseInt(e.target.value) || 1)}
                />
              </div>

              <div className="flex items-end">
                <Button onClick={generateUuid} className="w-full">
                  Generate UUID{uuidCount > 1 ? 's' : ''}
                </Button>
              </div>
            </div>

            {uuidOutput && (
              <div className="relative">
                <div className="relative">
                  <Textarea value={uuidOutput} readOnly className="h-40 pr-10 font-mono" />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(uuidOutput)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Password Generator Tab */}
          <TabsContent value="password" className="space-y-4">
            <div>
              <Label htmlFor="password-length">Password Length: {passwordLength}</Label>
              <Slider
                id="password-length"
                min={4}
                max={64}
                step={1}
                value={[passwordLength]}
                onValueChange={(value) => setPasswordLength(value[0])}
                className="my-4"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-uppercase"
                  checked={includeUppercase}
                  onCheckedChange={(checked) => setIncludeUppercase(checked as boolean)}
                />
                <Label htmlFor="include-uppercase">Include Uppercase</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-lowercase"
                  checked={includeLowercase}
                  onCheckedChange={(checked) => setIncludeLowercase(checked as boolean)}
                />
                <Label htmlFor="include-lowercase">Include Lowercase</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-numbers"
                  checked={includeNumbers}
                  onCheckedChange={(checked) => setIncludeNumbers(checked as boolean)}
                />
                <Label htmlFor="include-numbers">Include Numbers</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-symbols"
                  checked={includeSymbols}
                  onCheckedChange={(checked) => setIncludeSymbols(checked as boolean)}
                />
                <Label htmlFor="include-symbols">Include Symbols</Label>
              </div>
            </div>

            <Button onClick={generatePassword}>Generate Password</Button>

            {passwordOutput && (
              <div className="relative mt-4">
                <Label htmlFor="password-output">Generated Password</Label>
                <div className="mt-1 flex">
                  <Input
                    id="password-output"
                    value={passwordOutput}
                    readOnly
                    className="font-mono"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="ml-2"
                    onClick={() => generatePassword()}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="ml-2"
                    onClick={() => copyToClipboard(passwordOutput)}
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
