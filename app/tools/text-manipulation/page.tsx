import { TextManipulation } from "@/components/tools/text-manipulation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Text Manipulation Tools - DevToolkit Hub",
  description:
    "Transform text case, clean text, count characters, and test regular expressions. Complete text toolkit.",
}

export default function TextManipulationPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Text Manipulation</h1>
        <p className="text-muted-foreground">
          Transform, clean, and analyze text with case conversion, text cleaning, character counting, and regex testing.
        </p>
      </div>
      <TextManipulation />
    </div>
  )
}
