import { DataConverters } from "@/components/tools/data-converters"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Data Format Converters - DevToolkit Hub",
  description: "Convert between Base64, Hex, URL encoding, and different number bases. Fast data conversion tools.",
}

export default function DataConvertersPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Data Format Converters</h1>
        <p className="text-muted-foreground">
          Convert between different data formats and encodings including Base64, Hex, URL encoding, and number bases.
        </p>
      </div>
      <DataConverters />
    </div>
  )
}
