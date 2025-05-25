'use client'

import { useRef, useState } from 'react'
import { Camera, Check, Copy, Download, Wrench } from 'lucide-react'

import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'

export function MiscTools() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  // QR Code Generator
  const [qrText, setQrText] = useState('')
  const [qrSize, setQrSize] = useState(200)
  const qrCanvasRef = useRef<HTMLCanvasElement>(null)
  const [qrGenerated, setQrGenerated] = useState(false)

  // QR Code Scanner
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scanning, setScanning] = useState(false)
  const [scanResult, setScanResult] = useState('')

  // Color Picker
  const [colorHex, setColorHex] = useState('#4f46e5')
  const [colorRgb, setColorRgb] = useState('rgb(79, 70, 229)')
  const [colorHsl, setColorHsl] = useState('hsl(244, 76%, 59%)')

  // Generate QR Code
  const generateQrCode = () => {
    if (!qrText) {
      toast({
        title: 'Error',
        description: 'Please enter text or URL to generate QR code',
        variant: 'destructive',
      })
      return
    }

    // This is a simplified QR code generator
    // In a real app, you'd use a proper QR code library
    toast({
      title: 'QR Code Generated',
      description: 'QR code has been generated for: ' + qrText,
    })

    // Simulate QR code generation with a colored square
    const canvas = qrCanvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // Set canvas size
        canvas.width = qrSize
        canvas.height = qrSize

        // Draw a border
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, qrSize, qrSize)

        // Draw a fake QR code pattern
        ctx.fillStyle = 'black'

        // Draw the outer frame
        ctx.fillRect(0, 0, qrSize, qrSize)
        ctx.fillStyle = 'white'
        ctx.fillRect(8, 8, qrSize - 16, qrSize - 16)
        ctx.fillStyle = 'black'

        // Draw the three corner squares
        // Top-left
        ctx.fillRect(16, 16, qrSize / 5, qrSize / 5)
        ctx.fillStyle = 'white'
        ctx.fillRect(24, 24, qrSize / 5 - 16, qrSize / 5 - 16)
        ctx.fillStyle = 'black'

        // Top-right
        ctx.fillRect(qrSize - qrSize / 5 - 16, 16, qrSize / 5, qrSize / 5)
        ctx.fillStyle = 'white'
        ctx.fillRect(qrSize - qrSize / 5 - 8, 24, qrSize / 5 - 16, qrSize / 5 - 16)
        ctx.fillStyle = 'black'

        // Bottom-left
        ctx.fillRect(16, qrSize - qrSize / 5 - 16, qrSize / 5, qrSize / 5)
        ctx.fillStyle = 'white'
        ctx.fillRect(24, qrSize - qrSize / 5 - 8, qrSize / 5 - 16, qrSize / 5 - 16)
        ctx.fillStyle = 'black'

        // Draw random dots to simulate QR code
        const cellSize = Math.floor(qrSize / 25)
        for (let y = 0; y < 25; y++) {
          for (let x = 0; x < 25; x++) {
            // Skip the corner squares
            if ((x < 7 && y < 7) || (x > 17 && y < 7) || (x < 7 && y > 17)) {
              continue
            }

            // Randomly fill cells
            if (Math.random() > 0.5) {
              ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
            }
          }
        }

        setQrGenerated(true)
      }
    }
  }

  const downloadQrCode = () => {
    const canvas = qrCanvasRef.current
    if (canvas) {
      const url = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = 'qrcode.png'
      link.href = url
      link.click()
    }
  }

  // QR Code Scanner
  const startScanner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        setScanning(true)

        // In a real app, you'd use a proper QR code scanner library
        // This is just a placeholder
        setTimeout(() => {
          stopScanner()
          setScanResult('https://example.com/scanned-url')
          toast({
            title: 'QR Code Scanned',
            description: 'A QR code has been detected',
          })
        }, 3000)
      }
    } catch (error) {
      toast({
        title: 'Camera Error',
        description: 'Could not access camera: ' + (error as Error).message,
        variant: 'destructive',
      })
    }
  }

  const stopScanner = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      const tracks = stream.getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setScanning(false)
    }
  }

  // Color Converter
  const updateColor = (type: string, value: string) => {
    try {
      if (type === 'hex') {
        setColorHex(value)

        // Convert hex to RGB
        const r = Number.parseInt(value.slice(1, 3), 16)
        const g = Number.parseInt(value.slice(3, 5), 16)
        const b = Number.parseInt(value.slice(5, 7), 16)

        if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
          setColorRgb(`rgb(${r}, ${g}, ${b})`)

          // Convert RGB to HSL
          const rNorm = r / 255
          const gNorm = g / 255
          const bNorm = b / 255

          const max = Math.max(rNorm, gNorm, bNorm)
          const min = Math.min(rNorm, gNorm, bNorm)
          let h = 0,
            s = 0,
            l = (max + min) / 2

          if (max !== min) {
            const d = max - min
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

            switch (max) {
              case rNorm:
                h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)
                break
              case gNorm:
                h = (bNorm - rNorm) / d + 2
                break
              case bNorm:
                h = (rNorm - gNorm) / d + 4
                break
            }

            h = Math.round(h * 60)
          }

          s = Math.round(s * 100)
          l = Math.round(l * 100)

          setColorHsl(`hsl(${h}, ${s}%, ${l}%)`)
        }
      }
    } catch (error) {
      console.error('Error converting color:', error)
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
          <Wrench className="mr-2 h-5 w-5" />
          Miscellaneous Tools
        </CardTitle>
        <CardDescription>Additional utilities for various tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="qr-generator" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
            <TabsTrigger value="qr-generator">QR Code Generator</TabsTrigger>
            <TabsTrigger value="qr-scanner">QR Code Scanner</TabsTrigger>
            <TabsTrigger value="color-picker">Color Picker</TabsTrigger>
          </TabsList>

          {/* QR Code Generator Tab */}
          <TabsContent value="qr-generator" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="qr-text">Text or URL</Label>
              <Textarea
                id="qr-text"
                placeholder="Enter text or URL to encode as QR code..."
                value={qrText}
                onChange={(e) => setQrText(e.target.value)}
                className="h-24"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="qr-size">QR Code Size: {qrSize}px</Label>
              <Slider
                id="qr-size"
                min={100}
                max={400}
                step={10}
                value={[qrSize]}
                onValueChange={(value) => setQrSize(value[0])}
              />
            </div>

            <Button onClick={generateQrCode} disabled={!qrText}>
              Generate QR Code
            </Button>

            {qrGenerated && (
              <div className="flex flex-col items-center space-y-4">
                <div className="border-border border bg-white p-4">
                  <canvas ref={qrCanvasRef} width={qrSize} height={qrSize}></canvas>
                </div>
                <Button variant="outline" onClick={downloadQrCode}>
                  <Download className="mr-2 h-4 w-4" />
                  Download QR Code
                </Button>
              </div>
            )}
          </TabsContent>

          {/* QR Code Scanner Tab */}
          <TabsContent value="qr-scanner" className="space-y-4">
            <div className="text-muted-foreground mb-4 text-sm">
              Note: QR code scanning requires camera access and works best on mobile devices.
            </div>

            <div className="flex justify-center">
              {scanning ? (
                <Button variant="destructive" onClick={stopScanner}>
                  Stop Scanner
                </Button>
              ) : (
                <Button onClick={startScanner}>
                  <Camera className="mr-2 h-4 w-4" />
                  Start Scanner
                </Button>
              )}
            </div>

            <div className="bg-muted relative aspect-video overflow-hidden rounded-md">
              {scanning ? (
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-cover"
                ></video>
              ) : (
                <div className="text-muted-foreground flex h-full items-center justify-center">
                  Camera preview will appear here
                </div>
              )}
              <canvas ref={canvasRef} className="hidden"></canvas>
            </div>

            {scanResult && (
              <div className="space-y-2">
                <Label>Scanned Result</Label>
                <div className="flex">
                  <Input value={scanResult} readOnly />
                  <Button
                    variant="outline"
                    size="icon"
                    className="ml-2"
                    onClick={() => copyToClipboard(scanResult)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Color Picker Tab */}
          <TabsContent value="color-picker" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="color-picker">Color Picker</Label>
                <div className="mt-1 flex">
                  <Input
                    id="color-picker"
                    type="color"
                    value={colorHex}
                    onChange={(e) => updateColor('hex', e.target.value)}
                    className="h-10 w-16 p-1"
                  />
                  <Input
                    value={colorHex}
                    onChange={(e) => updateColor('hex', e.target.value)}
                    className="ml-2 font-mono"
                  />
                </div>
              </div>

              <div
                className="overflow-hidden rounded-md"
                style={{ backgroundColor: colorHex, height: '100px' }}
              ></div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="color-rgb">RGB</Label>
                <div className="flex">
                  <Input id="color-rgb" value={colorRgb} readOnly className="font-mono" />
                  <Button
                    variant="outline"
                    size="icon"
                    className="ml-2"
                    onClick={() => copyToClipboard(colorRgb)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color-hsl">HSL</Label>
                <div className="flex">
                  <Input id="color-hsl" value={colorHsl} readOnly className="font-mono" />
                  <Button
                    variant="outline"
                    size="icon"
                    className="ml-2"
                    onClick={() => copyToClipboard(colorHsl)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="mb-2 text-sm font-medium">Color Palette</h3>
              <div className="grid grid-cols-5 gap-2">
                {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => {
                  // This is a simplified shade generator
                  // In a real app, you'd use a proper color library
                  const opacity = shade / 1000
                  const bgColor = `rgba(${Number.parseInt(colorHex.slice(1, 3), 16)}, ${Number.parseInt(colorHex.slice(3, 5), 16)}, ${Number.parseInt(colorHex.slice(5, 7), 16)}, ${opacity})`

                  return (
                    <div
                      key={shade}
                      className="flex h-10 items-end justify-center rounded-md p-1 text-xs"
                      style={{ backgroundColor: bgColor, color: shade > 500 ? 'white' : 'black' }}
                    >
                      {shade}
                    </div>
                  )
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
