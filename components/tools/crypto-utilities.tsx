"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FingerprintIcon as FingerPrint, Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function CryptoUtilities() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  // Key Generator
  const [keyType, setKeyType] = useState("rsa")
  const [keySize, setKeySize] = useState("2048")
  const [generatedKey, setGeneratedKey] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  // Hash Generator
  const [hashInput, setHashInput] = useState("")
  const [hashType, setHashType] = useState("sha256")
  const [hashOutput, setHashOutput] = useState("")

  // Encrypt/Decrypt
  const [encryptText, setEncryptText] = useState("")
  const [encryptionKey, setEncryptionKey] = useState("")
  const [encryptionAlgo, setEncryptionAlgo] = useState("aes-ctr")
  const [encryptedOutput, setEncryptedOutput] = useState("")

  const generateKey = async () => {
    setIsGenerating(true)
    try {
      let algorithm: any
      const exportFormat: "pkcs8" | "spki" | "raw" = "pkcs8"

      if (keyType === "rsa") {
        algorithm = {
          name: "RSA-OAEP",
          modulusLength: Number.parseInt(keySize),
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: "SHA-256",
        }
      } else if (keyType === "ec") {
        let namedCurve = "P-256"
        if (keySize === "384") namedCurve = "P-384"
        if (keySize === "521") namedCurve = "P-521"

        algorithm = {
          name: "ECDSA",
          namedCurve,
        }
      }

      const keyPair = await window.crypto.subtle.generateKey(algorithm, true, ["encrypt", "decrypt"])

      const privateKey = await window.crypto.subtle.exportKey(exportFormat, keyPair.privateKey)

      // Convert to base64
      const privateKeyBase64 = btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(privateKey))))

      setGeneratedKey(`-----BEGIN PRIVATE KEY-----\n${privateKeyBase64}\n-----END PRIVATE KEY-----`)
    } catch (error) {
      console.error("Error generating key:", error)
      toast({
        title: "Error generating key",
        description: (error as Error).message,
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const generateHash = async () => {
    if (!hashInput) return

    try {
      const encoder = new TextEncoder()
      const data = encoder.encode(hashInput)

      let hashAlgorithm = "SHA-256"
      if (hashType === "sha1") hashAlgorithm = "SHA-1"
      if (hashType === "sha512") hashAlgorithm = "SHA-512"
      if (hashType === "md5") {
        // Web Crypto API doesn't support MD5, so we'd need a custom implementation
        toast({
          title: "MD5 not supported",
          description: "MD5 is not supported by the Web Crypto API for security reasons.",
          variant: "destructive",
        })
        return
      }

      const hashBuffer = await window.crypto.subtle.digest(hashAlgorithm, data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")

      setHashOutput(hashHex)
    } catch (error) {
      console.error("Error generating hash:", error)
      toast({
        title: "Error generating hash",
        description: (error as Error).message,
        variant: "destructive",
      })
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "The content has been copied to your clipboard.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FingerPrint className="mr-2 h-5 w-5" />
          Cryptographic Utilities
        </CardTitle>
        <CardDescription>Generate cryptographic keys, hashes, and encrypt/decrypt data</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="keys" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="keys">Key Generator</TabsTrigger>
            <TabsTrigger value="hash">Hash Generator</TabsTrigger>
            <TabsTrigger value="encrypt">Encrypt/Decrypt</TabsTrigger>
          </TabsList>

          {/* Key Generator Tab */}
          <TabsContent value="keys" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="key-type">Key Type</Label>
                <Select value={keyType} onValueChange={setKeyType}>
                  <SelectTrigger id="key-type">
                    <SelectValue placeholder="Select key type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rsa">RSA</SelectItem>
                    <SelectItem value="ec">Elliptic Curve (EC)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="key-size">Key Size</Label>
                <Select value={keySize} onValueChange={setKeySize}>
                  <SelectTrigger id="key-size">
                    <SelectValue placeholder="Select key size" />
                  </SelectTrigger>
                  <SelectContent>
                    {keyType === "rsa" ? (
                      <>
                        <SelectItem value="512">512 bits</SelectItem>
                        <SelectItem value="1024">1024 bits</SelectItem>
                        <SelectItem value="2048">2048 bits</SelectItem>
                        <SelectItem value="4096">4096 bits</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="256">P-256</SelectItem>
                        <SelectItem value="384">P-384</SelectItem>
                        <SelectItem value="521">P-521</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={generateKey} disabled={isGenerating}>
              {isGenerating ? "Generating..." : "Generate Key"}
            </Button>

            {generatedKey && (
              <div className="relative">
                <Textarea value={generatedKey} readOnly className="font-mono h-48" />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(generatedKey)}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Hash Generator Tab */}
          <TabsContent value="hash" className="space-y-4">
            <div>
              <Label htmlFor="hash-input">Input Text</Label>
              <Textarea
                id="hash-input"
                placeholder="Enter text to hash..."
                value={hashInput}
                onChange={(e) => setHashInput(e.target.value)}
                className="h-24"
              />
            </div>

            <div>
              <Label htmlFor="hash-type">Hash Algorithm</Label>
              <Select value={hashType} onValueChange={setHashType}>
                <SelectTrigger id="hash-type">
                  <SelectValue placeholder="Select hash algorithm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sha1">SHA-1</SelectItem>
                  <SelectItem value="sha256">SHA-256</SelectItem>
                  <SelectItem value="sha512">SHA-512</SelectItem>
                  <SelectItem value="md5">MD5</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={generateHash} disabled={!hashInput}>
              Generate Hash
            </Button>

            {hashOutput && (
              <div className="relative">
                <Label htmlFor="hash-output">Hash Output</Label>
                <div className="flex">
                  <Input id="hash-output" value={hashOutput} readOnly className="font-mono" />
                  <Button size="sm" variant="ghost" className="ml-2" onClick={() => copyToClipboard(hashOutput)}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Encrypt/Decrypt Tab */}
          <TabsContent value="encrypt" className="space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              Note: For security reasons, browser-based encryption has limitations. For production use, consider
              server-side encryption.
            </div>

            <div>
              <Label htmlFor="encrypt-algo">Encryption Algorithm</Label>
              <Select value={encryptionAlgo} onValueChange={setEncryptionAlgo}>
                <SelectTrigger id="encrypt-algo">
                  <SelectValue placeholder="Select algorithm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aes-ctr">AES-CTR</SelectItem>
                  <SelectItem value="aes-cbc">AES-CBC</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="encrypt-text">Text to Encrypt</Label>
              <Textarea
                id="encrypt-text"
                placeholder="Enter text to encrypt..."
                value={encryptText}
                onChange={(e) => setEncryptText(e.target.value)}
                className="h-24"
              />
            </div>

            <div>
              <Label htmlFor="encrypt-key">Encryption Key/Password</Label>
              <Input
                id="encrypt-key"
                type="password"
                placeholder="Enter encryption key..."
                value={encryptionKey}
                onChange={(e) => setEncryptionKey(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                For AES, the key will be hashed to the appropriate length.
              </p>
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={() => {
                  toast({
                    title: "Feature in development",
                    description: "This feature is currently being implemented.",
                  })
                }}
                disabled={!encryptText || !encryptionKey}
              >
                Encrypt
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  toast({
                    title: "Feature in development",
                    description: "This feature is currently being implemented.",
                  })
                }}
                disabled={!encryptedOutput || !encryptionKey}
              >
                Decrypt
              </Button>
            </div>

            {encryptedOutput && (
              <div>
                <Label htmlFor="encrypted-output">Encrypted Output</Label>
                <div className="flex">
                  <Input id="encrypted-output" value={encryptedOutput} readOnly className="font-mono" />
                  <Button size="sm" variant="ghost" className="ml-2" onClick={() => copyToClipboard(encryptedOutput)}>
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
