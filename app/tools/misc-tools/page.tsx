import { MiscTools } from "@/components/tools/misc-tools"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Miscellaneous Tools - DevToolkit Hub",
  description: "QR code generator, color picker, and other utility tools. Additional developer utilities in one place.",
}

export default function MiscToolsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Miscellaneous Tools</h1>
        <p className="text-muted-foreground">
          Additional utilities including QR code generation, color picker, and other helpful developer tools.
        </p>
      </div>
      <MiscTools />
    </div>
  )
}
