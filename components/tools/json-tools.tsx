"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FileJson, Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function JsonTools() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  // JSON Formatter
  const [jsonInput, setJsonInput] = useState("")
  const [jsonOutput, setJsonOutput] = useState("")

  // JSON to YAML
  const [jsonYamlInput, setJsonYamlInput] = useState("")
  const [jsonYamlOutput, setJsonYamlOutput] = useState("")
  const [jsonYamlMode, setJsonYamlMode] = useState("json-to-yaml")

  // JSON Diff
  const [jsonDiffInput1, setJsonDiffInput1] = useState("")
  const [jsonDiffInput2, setJsonDiffInput2] = useState("")
  const [jsonDiffOutput, setJsonDiffOutput] = useState("")

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      setJsonOutput(JSON.stringify(parsed, null, 2))
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: (error as Error).message,
        variant: "destructive",
      })
    }
  }

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      setJsonOutput(JSON.stringify(parsed))
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: (error as Error).message,
        variant: "destructive",
      })
    }
  }

  const convertJsonYaml = () => {
    toast({
      title: "Feature in development",
      description: "JSON to YAML conversion is currently being implemented.",
    })
  }

  const compareJson = () => {
    try {
      const obj1 = JSON.parse(jsonDiffInput1)
      const obj2 = JSON.parse(jsonDiffInput2)

      // Simple diff implementation
      const diff: any = {}

      // Find keys in obj1 that are different or missing in obj2
      Object.keys(obj1).forEach((key) => {
        if (!obj2.hasOwnProperty(key)) {
          diff[key] = { type: "removed", value: obj1[key] }
        } else if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
          diff[key] = {
            type: "changed",
            oldValue: obj1[key],
            newValue: obj2[key],
          }
        }
      })

      // Find keys in obj2 that are not in obj1
      Object.keys(obj2).forEach((key) => {
        if (!obj1.hasOwnProperty(key)) {
          diff[key] = { type: "added", value: obj2[key] }
        }
      })

      setJsonDiffOutput(JSON.stringify(diff, null, 2))
    } catch (error) {
      toast({
        title: "Invalid JSON",
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
          <FileJson className="mr-2 h-5 w-5" />
          JSON Tools
        </CardTitle>
        <CardDescription>Format, minify, convert, and compare JSON data</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="formatter" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
            <TabsTrigger value="formatter">JSON Formatter</TabsTrigger>
            <TabsTrigger value="converter">JSON ⇄ YAML</TabsTrigger>
            <TabsTrigger value="diff">JSON Diff</TabsTrigger>
          </TabsList>

          {/* JSON Formatter Tab */}
          <TabsContent value="formatter" className="space-y-4">
            <div>
              <Textarea
                placeholder="Paste your JSON here..."
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="font-mono h-40"
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={formatJson} disabled={!jsonInput}>
                Format JSON
              </Button>
              <Button variant="outline" onClick={minifyJson} disabled={!jsonInput}>
                Minify JSON
              </Button>
            </div>

            {jsonOutput && (
              <div className="relative">
                <div className="relative">
                  <Textarea value={jsonOutput} readOnly className="font-mono h-40 pr-10" />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(jsonOutput)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* JSON to YAML Tab */}
          <TabsContent value="converter" className="space-y-4">
            <div className="flex space-x-2 mb-4">
              <Button
                variant={jsonYamlMode === "json-to-yaml" ? "default" : "outline"}
                onClick={() => setJsonYamlMode("json-to-yaml")}
              >
                JSON to YAML
              </Button>
              <Button
                variant={jsonYamlMode === "yaml-to-json" ? "default" : "outline"}
                onClick={() => setJsonYamlMode("yaml-to-json")}
              >
                YAML to JSON
              </Button>
            </div>

            <div>
              <Textarea
                placeholder={jsonYamlMode === "json-to-yaml" ? "Paste your JSON here..." : "Paste your YAML here..."}
                value={jsonYamlInput}
                onChange={(e) => setJsonYamlInput(e.target.value)}
                className="font-mono h-40"
              />
            </div>

            <Button onClick={convertJsonYaml} disabled={!jsonYamlInput}>
              {jsonYamlMode === "json-to-yaml" ? "Convert to YAML" : "Convert to JSON"}
            </Button>

            {jsonYamlOutput && (
              <div className="relative">
                <div className="relative">
                  <Textarea value={jsonYamlOutput} readOnly className="font-mono h-40 pr-10" />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(jsonYamlOutput)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* JSON Diff Tab */}
          <TabsContent value="diff" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Textarea
                  placeholder="Paste first JSON here..."
                  value={jsonDiffInput1}
                  onChange={(e) => setJsonDiffInput1(e.target.value)}
                  className="font-mono h-40"
                />
              </div>

              <div>
                <Textarea
                  placeholder="Paste second JSON here..."
                  value={jsonDiffInput2}
                  onChange={(e) => setJsonDiffInput2(e.target.value)}
                  className="font-mono h-40"
                />
              </div>
            </div>

            <Button onClick={compareJson} disabled={!jsonDiffInput1 || !jsonDiffInput2}>
              Compare JSON
            </Button>

            {jsonDiffOutput && (
              <div className="relative">
                <div className="relative">
                  <Textarea value={jsonDiffOutput} readOnly className="font-mono h-40 pr-10" />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(jsonDiffOutput)}
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
