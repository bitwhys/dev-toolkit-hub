'use client'

import { useState } from 'react'
import { Check, Copy, Wifi } from 'lucide-react'

import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function NetworkUtilities() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  // IP Validator
  const [ipInput, setIpInput] = useState('')
  const [ipValidation, setIpValidation] = useState<{
    isValid: boolean
    type: string
    message: string
  } | null>(null)

  // CIDR Calculator
  const [cidrInput, setCidrInput] = useState('')
  const [cidrResult, setCidrResult] = useState<{
    networkAddress: string
    broadcastAddress: string
    firstUsable: string
    lastUsable: string
    totalHosts: number
    usableHosts: number
    subnetMask: string
  } | null>(null)

  // Subnet Calculator
  const [ipAddress, setIpAddress] = useState('')
  const [subnetMask, setSubnetMask] = useState('')
  const [subnetResult, setSubnetResult] = useState<{
    networkAddress: string
    broadcastAddress: string
    usableRange: string
    totalHosts: number
  } | null>(null)

  const validateIp = () => {
    // IPv4 regex
    const ipv4Regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

    // IPv6 regex (simplified)
    const ipv6Regex =
      /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/

    if (ipv4Regex.test(ipInput)) {
      // Check for special IPv4 addresses
      const octets = ipInput.split('.').map(Number)

      if (
        octets[0] === 10 ||
        (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) ||
        (octets[0] === 192 && octets[1] === 168)
      ) {
        setIpValidation({
          isValid: true,
          type: 'IPv4 (Private)',
          message: 'This is a valid private IPv4 address.',
        })
      } else if (octets[0] === 127) {
        setIpValidation({
          isValid: true,
          type: 'IPv4 (Loopback)',
          message: 'This is a loopback IPv4 address.',
        })
      } else if (octets[0] === 169 && octets[1] === 254) {
        setIpValidation({
          isValid: true,
          type: 'IPv4 (Link-local)',
          message: 'This is a link-local IPv4 address.',
        })
      } else {
        setIpValidation({
          isValid: true,
          type: 'IPv4 (Public)',
          message: 'This is a valid public IPv4 address.',
        })
      }
    } else if (ipv6Regex.test(ipInput)) {
      // Simplified IPv6 validation
      setIpValidation({
        isValid: true,
        type: 'IPv6',
        message: 'This is a valid IPv6 address.',
      })
    } else {
      setIpValidation({
        isValid: false,
        type: 'Invalid',
        message: 'This is not a valid IP address.',
      })
    }
  }

  const calculateCidr = () => {
    try {
      // Parse CIDR notation (e.g., "192.168.1.0/24")
      const [ip, prefixStr] = cidrInput.split('/')
      const prefix = Number.parseInt(prefixStr)

      if (isNaN(prefix) || prefix < 0 || prefix > 32) {
        throw new Error('Invalid CIDR prefix. Must be between 0 and 32.')
      }

      // Convert IP to binary
      const octets = ip.split('.').map(Number)
      if (octets.length !== 4 || octets.some((o) => isNaN(o) || o < 0 || o > 255)) {
        throw new Error('Invalid IP address format.')
      }

      // Calculate subnet mask
      const subnetMaskBinary = '1'.repeat(prefix) + '0'.repeat(32 - prefix)
      const subnetMaskOctets = []
      for (let i = 0; i < 32; i += 8) {
        subnetMaskOctets.push(Number.parseInt(subnetMaskBinary.substring(i, i + 8), 2))
      }

      // Calculate network address
      const networkOctets = octets.map((octet, i) => octet & subnetMaskOctets[i])

      // Calculate broadcast address
      const invertedMaskOctets = subnetMaskOctets.map((o) => 255 - o)
      const broadcastOctets = octets.map((octet, i) => octet | invertedMaskOctets[i])

      // Calculate first and last usable addresses
      const firstUsableOctets = [...networkOctets]
      const lastUsableOctets = [...broadcastOctets]

      if (prefix < 31) {
        firstUsableOctets[3] += 1
        lastUsableOctets[3] -= 1
      }

      // Calculate total hosts
      const totalHosts = Math.pow(2, 32 - prefix)
      const usableHosts = totalHosts > 2 ? totalHosts - 2 : totalHosts

      setCidrResult({
        networkAddress: networkOctets.join('.'),
        broadcastAddress: broadcastOctets.join('.'),
        firstUsable: firstUsableOctets.join('.'),
        lastUsable: lastUsableOctets.join('.'),
        totalHosts,
        usableHosts,
        subnetMask: subnetMaskOctets.join('.'),
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: (error as Error).message,
        variant: 'destructive',
      })
    }
  }

  const calculateSubnet = () => {
    try {
      // Parse IP and subnet mask
      const ipOctets = ipAddress.split('.').map(Number)
      const maskOctets = subnetMask.split('.').map(Number)

      if (ipOctets.length !== 4 || ipOctets.some((o) => isNaN(o) || o < 0 || o > 255)) {
        throw new Error('Invalid IP address format.')
      }

      if (maskOctets.length !== 4 || maskOctets.some((o) => isNaN(o) || o < 0 || o > 255)) {
        throw new Error('Invalid subnet mask format.')
      }

      // Calculate network address
      const networkOctets = ipOctets.map((octet, i) => octet & maskOctets[i])

      // Calculate broadcast address
      const invertedMaskOctets = maskOctets.map((o) => 255 - o)
      const broadcastOctets = ipOctets.map((octet, i) => octet | invertedMaskOctets[i])

      // Calculate first and last usable addresses
      const firstUsableOctets = [...networkOctets]
      const lastUsableOctets = [...broadcastOctets]

      // Check if it's a /31 or /32 network
      const isSingleHost = maskOctets.every((octet, i) => (i < 3 ? octet === 255 : octet >= 254))

      if (!isSingleHost) {
        firstUsableOctets[3] += 1
        lastUsableOctets[3] -= 1
      }

      // Calculate total hosts
      let totalHosts = 1
      for (let i = 0; i < 4; i++) {
        totalHosts *= 256 - maskOctets[i]
      }

      setSubnetResult({
        networkAddress: networkOctets.join('.'),
        broadcastAddress: broadcastOctets.join('.'),
        usableRange: `${firstUsableOctets.join('.')} - ${lastUsableOctets.join('.')}`,
        totalHosts: isSingleHost ? totalHosts : totalHosts - 2,
      })
    } catch (error) {
      toast({
        title: 'Error',
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Wifi className="mr-2 h-5 w-5" />
          IP & Network Utilities
        </CardTitle>
        <CardDescription>Validate IP addresses and calculate network information</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="ip" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
            <TabsTrigger value="ip">IP Validator</TabsTrigger>
            <TabsTrigger value="cidr">CIDR Calculator</TabsTrigger>
            <TabsTrigger value="subnet">Subnet Calculator</TabsTrigger>
          </TabsList>

          {/* IP Validator Tab */}
          <TabsContent value="ip" className="space-y-4">
            <div>
              <Label htmlFor="ip-input">IP Address</Label>
              <Input
                id="ip-input"
                placeholder="Enter an IP address..."
                value={ipInput}
                onChange={(e) => setIpInput(e.target.value)}
              />
            </div>

            <Button onClick={validateIp} disabled={!ipInput}>
              Validate IP
            </Button>

            {ipValidation && (
              <div
                className={`rounded-md p-4 ${ipValidation.isValid ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}
              >
                <h3
                  className={`font-medium ${ipValidation.isValid ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}
                >
                  {ipValidation.type}
                </h3>
                <p
                  className={`mt-1 text-sm ${ipValidation.isValid ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}
                >
                  {ipValidation.message}
                </p>
              </div>
            )}
          </TabsContent>

          {/* CIDR Calculator Tab */}
          <TabsContent value="cidr" className="space-y-4">
            <div>
              <Label htmlFor="cidr-input">CIDR Notation</Label>
              <Input
                id="cidr-input"
                placeholder="e.g., 192.168.1.0/24"
                value={cidrInput}
                onChange={(e) => setCidrInput(e.target.value)}
              />
            </div>

            <Button onClick={calculateCidr} disabled={!cidrInput}>
              Calculate
            </Button>

            {cidrResult && (
              <div className="bg-muted space-y-2 rounded-md p-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-muted-foreground text-xs">Network Address</Label>
                    <div className="font-mono">{cidrResult.networkAddress}</div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Broadcast Address</Label>
                    <div className="font-mono">{cidrResult.broadcastAddress}</div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">First Usable IP</Label>
                    <div className="font-mono">{cidrResult.firstUsable}</div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Last Usable IP</Label>
                    <div className="font-mono">{cidrResult.lastUsable}</div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Subnet Mask</Label>
                    <div className="font-mono">{cidrResult.subnetMask}</div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Total Hosts</Label>
                    <div className="font-mono">{cidrResult.totalHosts.toLocaleString()}</div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Usable Hosts</Label>
                    <div className="font-mono">{cidrResult.usableHosts.toLocaleString()}</div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2"
                  onClick={() =>
                    copyToClipboard(
                      `Network: ${cidrResult.networkAddress}
Broadcast: ${cidrResult.broadcastAddress}
First IP: ${cidrResult.firstUsable}
Last IP: ${cidrResult.lastUsable}
Subnet Mask: ${cidrResult.subnetMask}
Total Hosts: ${cidrResult.totalHosts}
Usable Hosts: ${cidrResult.usableHosts}`,
                    )
                  }
                >
                  {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                  Copy Results
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Subnet Calculator Tab */}
          <TabsContent value="subnet" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="ip-address">IP Address</Label>
                <Input
                  id="ip-address"
                  placeholder="e.g., 192.168.1.1"
                  value={ipAddress}
                  onChange={(e) => setIpAddress(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="subnet-mask">Subnet Mask</Label>
                <Input
                  id="subnet-mask"
                  placeholder="e.g., 255.255.255.0"
                  value={subnetMask}
                  onChange={(e) => setSubnetMask(e.target.value)}
                />
              </div>
            </div>

            <Button onClick={calculateSubnet} disabled={!ipAddress || !subnetMask}>
              Calculate
            </Button>

            {subnetResult && (
              <div className="bg-muted space-y-2 rounded-md p-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-muted-foreground text-xs">Network Address</Label>
                    <div className="font-mono">{subnetResult.networkAddress}</div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Broadcast Address</Label>
                    <div className="font-mono">{subnetResult.broadcastAddress}</div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Usable IP Range</Label>
                    <div className="font-mono text-xs">{subnetResult.usableRange}</div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Total Usable Hosts</Label>
                    <div className="font-mono">{subnetResult.totalHosts.toLocaleString()}</div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2"
                  onClick={() =>
                    copyToClipboard(
                      `Network: ${subnetResult.networkAddress}
Broadcast: ${subnetResult.broadcastAddress}
Usable Range: ${subnetResult.usableRange}
Total Hosts: ${subnetResult.totalHosts}`,
                    )
                  }
                >
                  {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                  Copy Results
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
