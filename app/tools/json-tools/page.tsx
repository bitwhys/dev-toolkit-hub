import { JsonTools } from "@/components/tools/json-tools"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "JSON Tools - DevToolkit Hub",
  description: "Format, minify, validate, and compare JSON data. Complete JSON toolkit for developers.",
}

export default function JsonToolsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">JSON Tools</h1>
        <p className="text-muted-foreground">
          Format, minify, convert, and compare JSON data with our comprehensive JSON toolkit.
        </p>
      </div>
      <JsonTools />
    </div>
  )
}
