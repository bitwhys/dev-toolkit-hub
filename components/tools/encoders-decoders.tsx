"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Code2, Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function EncodersDecoders() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  // Base64 Encoder/Decoder
  const [base64Input, setBase64Input] = useState("")
  const [base64Output, setBase64Output] = useState("")
  const [base64Mode, setBase64Mode] = useState("encode")

  // HTML Encoder/Decoder
  const [htmlInput, setHtmlInput] = useState("")
  const [htmlOutput, setHtmlOutput] = useState("")
  const [htmlMode, setHtmlMode] = useState("encode")

  // JWT Encoder
  const [jwtHeader, setJwtHeader] = useState(JSON.stringify({ alg: "HS256", typ: "JWT" }, null, 2))
  const [jwtPayload, setJwtPayload] = useState(
    JSON.stringify({ sub: "1234567890", name: "John Doe", iat: 1516239022 }, null, 2),
  )
  const [jwtSecret, setJwtSecret] = useState("")
  const [jwtOutput, setJwtOutput] = useState("")

  const encodeDecodeBase64 = () => {
    try {
      if (base64Mode === "encode") {
        setBase64Output(btoa(base64Input))
      } else {
        setBase64Output(atob(base64Input))
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      })
    }
  }

  const encodeDecodeHtml = () => {
    try {
      if (htmlMode === "encode") {
        const div = document.createElement("div")
        div.innerText = htmlInput
        setHtmlOutput(div.innerHTML)
      } else {
        const div = document.createElement("div")
        div.innerHTML = htmlInput
        setHtmlOutput(div.innerText)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      })
    }
  }

  const encodeJwt = () => {
    try {
      // Parse header and payload
      const header = JSON.parse(jwtHeader)
      const payload = JSON.parse(jwtPayload)

      // Base64Url encode header and payload
      const base64UrlEncode = (obj: any) => {
        const json = JSON.stringify(obj)
        const base64 = btoa(json)
        return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
      }

      const encodedHeader = base64UrlEncode(header)
      const encodedPayload = base64UrlEncode(payload)

      // For simplicity, we're not actually signing the token
      // In a real implementation, you would use a proper JWT library
      // that handles the cryptographic signing

      if (!jwtSecret) {
        toast({
          title: "Warning",
          description: "No secret provided. Token will not be properly signed.",
        })
      }

      // Create a dummy signature (this is NOT secure)
      const dummySignature = "dummySignature"

      // Combine the parts
      const token = `${encodedHeader}.${encodedPayload}.${dummySignature}`

      setJwtOutput(token)

      toast({
        title: "Note",
        description:
          "This is a simplified JWT encoding for demonstration purposes only. The signature is not cryptographically valid.",
      })
    } catch (error) {
      toast({
        title: "Error",
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
          <Code2 className="mr-2 h-5 w-5" />
          Encoders & Decoders
        </CardTitle>
        <CardDescription>Encode and decode data in various formats</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="base64" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
            <TabsTrigger value="base64">Base64 Encoder/Decoder</TabsTrigger>
            <TabsTrigger value="html">HTML Encoder/Decoder</TabsTrigger>
            <TabsTrigger value="jwt">JWT Encoder</TabsTrigger>
          </TabsList>

          {/* Base64 Encoder/Decoder Tab */}
          <TabsContent value="base64" className="space-y-4">
            <div className="flex space-x-2 mb-4">
              <Button variant={base64Mode === "encode" ? "default" : "outline"} onClick={() => setBase64Mode("encode")}>
                Encode
              </Button>
              <Button variant={base64Mode === "decode" ? "default" : "outline"} onClick={() => setBase64Mode("decode")}>
                Decode
              </Button>
            </div>

            <div>
              <Textarea
                placeholder={base64Mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
                value={base64Input}
                onChange={(e) => setBase64Input(e.target.value)}
                className="h-32"
              />
            </div>

            <Button onClick={encodeDecodeBase64} disabled={!base64Input}>
              {base64Mode === "encode" ? "Encode to Base64" : "Decode from Base64"}
            </Button>

            {base64Output && (
              <div className="relative">
                <div className="relative">
                  <Textarea value={base64Output} readOnly className="h-32 pr-10" />
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

          {/* HTML Encoder/Decoder Tab */}
          <TabsContent value="html" className="space-y-4">
            <div className="flex space-x-2 mb-4">
              <Button variant={htmlMode === "encode" ? "default" : "outline"} onClick={() => setHtmlMode("encode")}>
                Encode
              </Button>
              <Button variant={htmlMode === "decode" ? "default" : "outline"} onClick={() => setHtmlMode("decode")}>
                Decode
              </Button>
            </div>

            <div>
              <Textarea
                placeholder={htmlMode === "encode" ? "Enter text to HTML encode..." : "Enter HTML encoded text..."}
                value={htmlInput}
                onChange={(e) => setHtmlInput(e.target.value)}
                className="h-32"
              />
            </div>

            <Button onClick={encodeDecodeHtml} disabled={!htmlInput}>
              {htmlMode === "encode" ? "Encode HTML" : "Decode HTML"}
            </Button>

            {htmlOutput && (
              <div className="relative">
                <div className="relative">
                  <Textarea value={htmlOutput} readOnly className="h-32 pr-10" />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(htmlOutput)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* JWT Encoder Tab */}
          <TabsContent value="jwt" className="space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              Note: This is a simplified JWT encoder for educational purposes. For production use, use a proper JWT
              library.
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Header</label>
              <Textarea value={jwtHeader} onChange={(e) => setJwtHeader(e.target.value)} className="font-mono h-24" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Payload</label>
              <Textarea value={jwtPayload} onChange={(e) => setJwtPayload(e.target.value)} className="font-mono h-24" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Secret (optional)</label>
              <Textarea
                value={jwtSecret}
                onChange={(e) => setJwtSecret(e.target.value)}
                className="h-12"
                placeholder="Enter a secret key for signing..."
              />
            </div>

            <Button onClick={encodeJwt} disabled={!jwtHeader || !jwtPayload}>
              Encode JWT
            </Button>

            {jwtOutput && (
              <div className="relative">
                <div className="relative">
                  <Textarea value={jwtOutput} readOnly className="font-mono h-24 pr-10" />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(jwtOutput)}
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
