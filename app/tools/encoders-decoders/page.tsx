import { EncodersDecoders } from "@/components/tools/encoders-decoders"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Encoders & Decoders - DevToolkit Hub",
  description:
    "Encode and decode Base64, HTML entities, and create JWT tokens. Essential encoding tools for developers.",
}

export default function EncodersDecodersPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Encoders & Decoders</h1>
        <p className="text-muted-foreground">
          Encode and decode data in various formats including Base64, HTML entities, and JWT tokens.
        </p>
      </div>
      <EncodersDecoders />
    </div>
  )
}
