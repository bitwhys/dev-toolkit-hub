import { HtmlJsxConverter } from "@/components/tools/transformations/html-jsx-converter"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "HTML to JSX Converter - DevToolkit Hub",
  description: "Convert HTML to JSX and vice versa. Transform HTML syntax to React JSX components instantly.",
}

export default function HtmlJsxPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">HTML ⇄ JSX Converter</h1>
        <p className="text-muted-foreground">
          Convert between HTML and JSX syntax. Transform HTML elements to React JSX components and vice versa.
        </p>
      </div>
      <HtmlJsxConverter />
    </div>
  )
}
