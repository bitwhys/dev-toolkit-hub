import type { Metadata } from 'next'

import { CssConverter } from '@/components/tools/transformations/css-converter'

export const metadata: Metadata = {
  title: 'CSS Converter - DevToolkit Hub',
  description:
    'Convert CSS to JavaScript objects or Tailwind CSS classes. Transform styles between different formats.',
}

export default function CssConverterPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">CSS Converter</h1>
        <p className="text-muted-foreground">
          Convert CSS to JavaScript objects for CSS-in-JS libraries or transform to Tailwind CSS
          classes.
        </p>
      </div>
      <CssConverter />
    </div>
  )
}
