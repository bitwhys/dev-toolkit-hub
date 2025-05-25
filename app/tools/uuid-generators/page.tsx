import { UuidGenerators } from "@/components/tools/uuid-generators"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "UUID & Random Generators - DevToolkit Hub",
  description: "Generate UUIDs, secure passwords, and random strings. Reliable random generation tools for developers.",
}

export default function UuidGeneratorsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">UUID & Random Generators</h1>
        <p className="text-muted-foreground">
          Generate UUIDs, random strings, and secure passwords with customizable options.
        </p>
      </div>
      <UuidGenerators />
    </div>
  )
}
