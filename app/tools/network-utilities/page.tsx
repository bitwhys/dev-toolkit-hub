import { NetworkUtilities } from "@/components/tools/network-utilities"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "IP & Network Utilities - DevToolkit Hub",
  description:
    "Validate IP addresses, calculate CIDR ranges, and perform subnet calculations. Network tools for developers.",
}

export default function NetworkUtilitiesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">IP & Network Utilities</h1>
        <p className="text-muted-foreground">
          Validate IP addresses, calculate CIDR ranges, and perform subnet calculations for network administration.
        </p>
      </div>
      <NetworkUtilities />
    </div>
  )
}
