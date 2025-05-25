import { DateTimeTools } from "@/components/tools/datetime-tools"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Date & Time Tools - DevToolkit Hub",
  description:
    "Convert Unix timestamps, work with timezones, and format dates. Complete datetime toolkit for developers.",
}

export default function DateTimeToolsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Date & Time Tools</h1>
        <p className="text-muted-foreground">
          Convert timestamps, work with timezones, and format dates in various standards including ISO8601.
        </p>
      </div>
      <DateTimeTools />
    </div>
  )
}
