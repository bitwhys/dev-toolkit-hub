import { JwtDecoder } from "@/components/tools/jwt-decoder"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "JWT Decoder - DevToolkit Hub",
  description: "Decode and verify JSON Web Tokens (JWT) online. Fast, secure, and privacy-focused JWT decoder tool.",
}

export default function JwtDecoderPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">JWT Token Decoder</h1>
        <p className="text-muted-foreground">
          Decode and verify JSON Web Tokens (JWT). All processing happens locally in your browser.
        </p>
      </div>
      <JwtDecoder />
    </div>
  )
}
