import type { Metadata } from 'next'

import { CryptoUtilities } from '@/components/tools/crypto-utilities'

export const metadata: Metadata = {
  title: 'Cryptographic Utilities - DevToolkit Hub',
  description:
    'Generate cryptographic keys, create hashes, and encrypt/decrypt data. Secure crypto tools for developers.',
}

export default function CryptoUtilitiesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Cryptographic Utilities</h1>
        <p className="text-muted-foreground">
          Generate cryptographic keys, create hashes, and encrypt/decrypt data securely in your
          browser.
        </p>
      </div>
      <CryptoUtilities />
    </div>
  )
}
