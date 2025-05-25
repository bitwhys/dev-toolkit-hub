'use client'

import { Eye } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface CSSPreviewProps {
  css: string
  html?: string
  title?: string
  description?: string
}

export function CSSPreview({ css, html, title = 'Preview', description }: CSSPreviewProps) {
  // Default HTML structure for common CSS patterns
  const getDefaultHTML = (css: string): string => {
    if (css.includes('grid') && css.includes('auto-fit')) {
      return `
        <div class="auto-grid">
          <div class="grid-item">Item 1</div>
          <div class="grid-item">Item 2</div>
          <div class="grid-item">Item 3</div>
          <div class="grid-item">Item 4</div>
          <div class="grid-item">Item 5</div>
          <div class="grid-item">Item 6</div>
        </div>
      `
    }

    if (css.includes('flexbox') || css.includes('flex')) {
      return `
        <div class="flex-container">
          <div class="flex-item">Item 1</div>
          <div class="flex-item">Item 2</div>
          <div class="flex-item">Item 3</div>
        </div>
      `
    }

    if (css.includes('button') || css.includes('btn')) {
      return `
        <div class="button-container">
          <button class="btn">Primary</button>
          <button class="btn secondary">Secondary</button>
          <button class="btn outline">Outline</button>
        </div>
      `
    }

    if (css.includes('card')) {
      return `
        <div class="card">
          <div class="card-header">Card Title</div>
          <div class="card-content">
            <p>This is some card content that demonstrates the styling.</p>
          </div>
        </div>
      `
    }

    // Default fallback
    return `
      <div class="demo-container">
        <div class="demo-item">Demo Content</div>
      </div>
    `
  }

  const previewHTML = html || getDefaultHTML(css)

  // Convert CSS to wireframe style by adding grayscale and simplified styling
  const wireframeCSS = `
    /* Wireframe base styles */
    .preview-container * {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #666 !important;
      border-color: #ccc !important;
    }
    
    .preview-container {
      background: #f8f9fa;
      border: 2px dashed #ddd;
      padding: 1rem;
      min-height: 200px;
    }
    
    /* Apply user CSS with wireframe modifications */
    ${css
      .replace(/color:\s*[^;]+;/g, 'color: #666;')
      .replace(/background-color:\s*[^;]+;/g, 'background-color: #f0f0f0;')
      .replace(/background:\s*[^;]+;/g, 'background: #f0f0f0;')
      .replace(/#[0-9a-fA-F]{3,6}/g, '#e0e0e0')}
    
    /* Wireframe-specific overrides */
    .preview-container .grid-item,
    .preview-container .flex-item,
    .preview-container .demo-item,
    .preview-container .card {
      background: #e9ecef !important;
      border: 1px solid #dee2e6 !important;
      color: #6c757d !important;
    }
    
    .preview-container .btn {
      background: #e9ecef !important;
      border: 1px solid #dee2e6 !important;
      color: #6c757d !important;
      cursor: pointer;
    }
    
    .preview-container .btn:hover {
      background: #dee2e6 !important;
    }
    
    .preview-container .card-header {
      background: #dee2e6 !important;
      border-bottom: 1px solid #ced4da !important;
      font-weight: 600;
    }
  `

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Eye className="mr-2 h-5 w-5" />
          {title}
        </CardTitle>
        {description && <p className="text-muted-foreground text-sm">{description}</p>}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <style dangerouslySetInnerHTML={{ __html: wireframeCSS }} />
          <div className="preview-container" dangerouslySetInnerHTML={{ __html: previewHTML }} />
          <p className="text-muted-foreground text-xs">
            Preview shown in wireframe style. Actual colors and styling may vary.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
