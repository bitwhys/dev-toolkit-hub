"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Copy, Check, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function DateTimeTools() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  // Unix Timestamp Converter
  const [unixTimestamp, setUnixTimestamp] = useState("")
  const [humanDate, setHumanDate] = useState("")
  const [currentUnixTime, setCurrentUnixTime] = useState(0)

  // Timezone Converter
  const [localTime, setLocalTime] = useState("")
  const [timezones, setTimezones] = useState<string[]>([])
  const [selectedTimezones, setSelectedTimezones] = useState<string[]>([
    "America/New_York",
    "Europe/London",
    "Asia/Tokyo",
    "Australia/Sydney",
  ])
  const [timezoneResults, setTimezoneResults] = useState<{ timezone: string; time: string }[]>([])

  // ISO8601 Formatter
  const [isoInput, setIsoInput] = useState("")
  const [isoOutput, setIsoOutput] = useState("")
  const [isoFormat, setIsoFormat] = useState("iso")

  useEffect(() => {
    // Update current Unix timestamp every second
    const interval = setInterval(() => {
      setCurrentUnixTime(Math.floor(Date.now() / 1000))
    }, 1000)

    // Get list of timezones
    try {
      // This is a simplified list - in a real app, you'd use a complete timezone database
      const tzList = [
        "UTC",
        "America/New_York",
        "America/Chicago",
        "America/Denver",
        "America/Los_Angeles",
        "Europe/London",
        "Europe/Paris",
        "Europe/Berlin",
        "Asia/Tokyo",
        "Asia/Shanghai",
        "Asia/Singapore",
        "Australia/Sydney",
        "Pacific/Auckland",
      ]
      setTimezones(tzList)
    } catch (error) {
      console.error("Error getting timezones:", error)
    }

    return () => clearInterval(interval)
  }, [])

  const convertUnixTimestamp = () => {
    try {
      const timestamp = Number.parseInt(unixTimestamp)
      if (isNaN(timestamp)) {
        throw new Error("Invalid timestamp")
      }

      const date = new Date(timestamp * 1000)
      setHumanDate(date.toISOString())
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      })
    }
  }

  const convertHumanDate = () => {
    try {
      const date = new Date(humanDate)
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date")
      }

      setUnixTimestamp(Math.floor(date.getTime() / 1000).toString())
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      })
    }
  }

  const convertTimezones = () => {
    try {
      const date = localTime ? new Date(localTime) : new Date()
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date")
      }

      const results = selectedTimezones.map((timezone) => {
        try {
          const options: Intl.DateTimeFormatOptions = {
            timeZone: timezone,
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }

          return {
            timezone,
            time: new Intl.DateTimeFormat("en-US", options).format(date),
          }
        } catch (error) {
          return {
            timezone,
            time: "Error: Invalid timezone",
          }
        }
      })

      setTimezoneResults(results)
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      })
    }
  }

  const formatIso8601 = () => {
    try {
      const date = new Date(isoInput)
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date")
      }

      let formatted = ""
      switch (isoFormat) {
        case "iso":
          formatted = date.toISOString()
          break
        case "date":
          formatted = date.toISOString().split("T")[0]
          break
        case "datetime":
          formatted = date.toISOString().replace("T", " ").split(".")[0]
          break
        case "rfc3339":
          formatted = date.toISOString().replace(".000Z", "Z")
          break
        case "rfc2822":
          formatted = date.toUTCString()
          break
      }

      setIsoOutput(formatted)
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
          <Calendar className="mr-2 h-5 w-5" />
          Date & Time Tools
        </CardTitle>
        <CardDescription>Convert timestamps, work with timezones, and format dates</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="unix" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
            <TabsTrigger value="unix">Unix Timestamp</TabsTrigger>
            <TabsTrigger value="timezone">Timezone Converter</TabsTrigger>
            <TabsTrigger value="iso">ISO8601 Formatter</TabsTrigger>
          </TabsList>

          {/* Unix Timestamp Converter Tab */}
          <TabsContent value="unix" className="space-y-4">
            <div className="bg-muted p-4 rounded-md text-center">
              <div className="text-sm text-muted-foreground">Current Unix Timestamp</div>
              <div className="text-2xl font-mono font-bold">{currentUnixTime}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="unix-timestamp">Unix Timestamp</Label>
                <div className="flex">
                  <Input
                    id="unix-timestamp"
                    placeholder="e.g., 1609459200"
                    value={unixTimestamp}
                    onChange={(e) => setUnixTimestamp(e.target.value)}
                    className="font-mono"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="ml-2"
                    onClick={() => setUnixTimestamp(currentUnixTime.toString())}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                <Button onClick={convertUnixTimestamp} disabled={!unixTimestamp} size="sm">
                  Convert to Date
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="human-date">Human Readable Date</Label>
                <Input
                  id="human-date"
                  type="datetime-local"
                  value={humanDate ? humanDate.substring(0, 16) : ""}
                  onChange={(e) => setHumanDate(e.target.value)}
                />
                <Button onClick={convertHumanDate} disabled={!humanDate} size="sm">
                  Convert to Timestamp
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Timezone Converter Tab */}
          <TabsContent value="timezone" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="local-time">Date & Time (leave empty for current time)</Label>
              <Input
                id="local-time"
                type="datetime-local"
                value={localTime}
                onChange={(e) => setLocalTime(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Select Timezones</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Add a timezone" />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem
                      key={tz}
                      value={tz}
                      disabled={selectedTimezones.includes(tz)}
                      onSelect={() => {
                        if (!selectedTimezones.includes(tz)) {
                          setSelectedTimezones([...selectedTimezones, tz])
                        }
                      }}
                    >
                      {tz}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex flex-wrap gap-2 mt-2">
                {selectedTimezones.map((tz) => (
                  <div key={tz} className="bg-muted px-3 py-1 rounded-full text-sm flex items-center">
                    {tz}
                    <button
                      className="ml-2 text-muted-foreground hover:text-foreground"
                      onClick={() => setSelectedTimezones(selectedTimezones.filter((t) => t !== tz))}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={convertTimezones}>Convert Timezones</Button>

            {timezoneResults.length > 0 && (
              <div className="space-y-2">
                <div className="bg-muted p-4 rounded-md">
                  <div className="grid gap-2">
                    {timezoneResults.map((result) => (
                      <div
                        key={result.timezone}
                        className="flex justify-between items-center border-b border-border pb-2 last:border-0 last:pb-0"
                      >
                        <div className="font-medium">{result.timezone}</div>
                        <div className="font-mono">{result.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(timezoneResults.map((r) => `${r.timezone}: ${r.time}`).join("\n"))}
                >
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  Copy Results
                </Button>
              </div>
            )}
          </TabsContent>

          {/* ISO8601 Formatter Tab */}
          <TabsContent value="iso" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="iso-input">Date Input</Label>
              <Input
                id="iso-input"
                placeholder="e.g., 2023-01-01 or 2023-01-01T12:00:00Z"
                value={isoInput}
                onChange={(e) => setIsoInput(e.target.value)}
              />
              <div className="text-xs text-muted-foreground">
                Enter a date in any format. Current date will be used if empty.
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="iso-format">Output Format</Label>
              <Select value={isoFormat} onValueChange={setIsoFormat}>
                <SelectTrigger id="iso-format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="iso">ISO8601 (2023-01-01T12:00:00.000Z)</SelectItem>
                  <SelectItem value="date">Date only (2023-01-01)</SelectItem>
                  <SelectItem value="datetime">Date & Time (2023-01-01 12:00:00)</SelectItem>
                  <SelectItem value="rfc3339">RFC3339 (2023-01-01T12:00:00Z)</SelectItem>
                  <SelectItem value="rfc2822">RFC2822 (Sun, 01 Jan 2023 12:00:00 GMT)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={formatIso8601}>Format Date</Button>

            {isoOutput && (
              <div className="relative">
                <Label htmlFor="iso-output">Formatted Output</Label>
                <div className="flex">
                  <Input id="iso-output" value={isoOutput} readOnly className="font-mono" />
                  <Button variant="outline" size="icon" className="ml-2" onClick={() => copyToClipboard(isoOutput)}>
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
