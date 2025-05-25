import type { Metadata } from 'next'

import { TextDiff } from '@/components/tools/text-diff'

export const metadata: Metadata = {
  title: 'Text Diff Checker | DevToolkit Hub',
  description:
    'Compare two pieces of text and see the differences highlighted. Perfect for code reviews, configuration comparisons, or tracking changes.',
  keywords: [
    'text diff',
    'compare text',
    'diff checker',
    'code comparison',
    'text comparison',
    'developer tools',
  ],
}

export default function TextDiffPage() {
  return <TextDiff />
}
