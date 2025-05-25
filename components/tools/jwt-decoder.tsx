'use client'

import type React from 'react'
import { useState } from 'react'
import { AlertCircle, CheckCircle2, Key } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'

export function JwtDecoder() {
  const [jwt, setJwt] = useState('')
  const [decodedHeader, setDecodedHeader] = useState<any>(null)
  const [decodedPayload, setDecodedPayload] = useState<any>(null)
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)

  const decodeJwt = (token: string) => {
    setError(null)

    try {
      if (!token || token.trim() === '') {
        setDecodedHeader(null)
        setDecodedPayload(null)
        setIsValid(null)
        return
      }

      const parts = token.split('.')
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format. Expected 3 parts separated by dots.')
      }

      // Decode header
      const headerBase64 = parts[0]
      const headerJson = atob(headerBase64.replace(/-/g, '+').replace(/_/g, '/'))
      const header = JSON.parse(headerJson)
      setDecodedHeader(header)

      // Decode payload
      const payloadBase64 = parts[1]
      const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'))
      const payload = JSON.parse(payloadJson)
      setDecodedPayload(payload)

      // Check if token is expired
      if (payload.exp) {
        const expiryDate = new Date(payload.exp * 1000)
        const now = new Date()
        setIsValid(expiryDate > now)
      } else {
        setIsValid(null) // No expiry date to check
      }
    } catch (err) {
      setError((err as Error).message)
      setDecodedHeader(null)
      setDecodedPayload(null)
      setIsValid(null)
    }
  }

  const handleJwtChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newJwt = e.target.value
    setJwt(newJwt)
    decodeJwt(newJwt)
  }

  const formatJson = (json: any) => {
    return JSON.stringify(json, null, 2)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Key className="mr-2 h-5 w-5" />
          JWT Token Decoder
        </CardTitle>
        <CardDescription>Decode and verify JSON Web Tokens (JWT)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Textarea
              placeholder="Paste your JWT token here..."
              className="h-24 font-mono"
              value={jwt}
              onChange={handleJwtChange}
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isValid !== null && (
            <Alert variant={isValid ? 'default' : 'destructive'}>
              {isValid ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertTitle>{isValid ? 'Valid Token' : 'Expired Token'}</AlertTitle>
              <AlertDescription>
                {isValid ? 'This token has not expired yet.' : 'This token has expired.'}
              </AlertDescription>
            </Alert>
          )}

          {(decodedHeader || decodedPayload) && (
            <Tabs defaultValue="payload" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="header">Header</TabsTrigger>
                <TabsTrigger value="payload">Payload</TabsTrigger>
              </TabsList>
              <TabsContent value="header">
                <div className="bg-muted mt-2 rounded-md p-4">
                  <pre className="font-mono text-sm break-all whitespace-pre-wrap">
                    {decodedHeader ? formatJson(decodedHeader) : 'No header data'}
                  </pre>
                </div>
              </TabsContent>
              <TabsContent value="payload">
                <div className="bg-muted mt-2 rounded-md p-4">
                  <pre className="font-mono text-sm break-all whitespace-pre-wrap">
                    {decodedPayload ? formatJson(decodedPayload) : 'No payload data'}
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
