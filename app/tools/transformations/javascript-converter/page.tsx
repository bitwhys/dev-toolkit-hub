import { JavaScriptConverter } from "@/components/tools/transformations/javascript-converter"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "JavaScript Converter - DevToolkit Hub",
  description: "Convert JavaScript to TypeScript or JSON. Transform JS code between different formats and languages.",
}

export default function JavaScriptConverterPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">JavaScript Converter</h1>
        <p className="text-muted-foreground">
          Convert JavaScript to TypeScript with type annotations or extract data as JSON.
        </p>
      </div>
      <JavaScriptConverter />
    </div>
  )
}
