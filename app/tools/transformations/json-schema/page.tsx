import { JsonSchemaConverter } from "@/components/tools/transformations/json-schema-converter"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "JSON Schema Converter - DevToolkit Hub",
  description:
    "Convert JSON Schema to OpenAPI Schema, TypeScript interfaces, or Zod schemas. Schema transformation tool.",
}

export default function JsonSchemaPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">JSON Schema Converter</h1>
        <p className="text-muted-foreground">
          Convert JSON Schema to OpenAPI Schema, TypeScript interfaces, or Zod schemas for type-safe development.
        </p>
      </div>
      <JsonSchemaConverter />
    </div>
  )
}
