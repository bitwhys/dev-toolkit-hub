"use client"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CodeBlock } from "@/components/code-snippets/code-block"
import { SnippetMetaSidebar } from "@/components/code-snippets/snippet-meta-sidebar"
import { CSSPreview } from "@/components/code-snippets/css-preview"
import { Eye, Heart, Calendar, User } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

// Mock data - in a real app, this would come from an API
const mockSnippets = [
  {
    id: "1",
    title: "React Custom Hook for API Calls",
    description: "A reusable custom hook for handling API requests with loading states and error handling",
    language: "React",
    category: "Hooks",
    tags: ["react", "hooks", "api", "typescript"],
    author: "John Doe",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-16"),
    views: 1250,
    likes: 89,
    downloads: 234,
    isLiked: false,
    isFavorited: false,
    code: `import { useState, useEffect } from 'react';

export function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}`,
    guide: `## Usage Guide

This custom hook simplifies API calls in React components by handling common patterns like loading states and error handling.

### Basic Usage

\`\`\`tsx
import { useApi } from './hooks/useApi';

function UserProfile({ userId }: { userId: string }) {
  const { data: user, loading, error } = useApi<User>(\`/api/users/\${userId}\`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
\`\`\`

### Features

- **Type Safety**: Full TypeScript support with generics
- **Loading States**: Automatic loading state management
- **Error Handling**: Built-in error catching and state management
- **Automatic Refetch**: Refetches when URL changes
- **Clean API**: Simple and intuitive interface

### Advanced Usage

You can extend this hook to include features like:
- Request cancellation with AbortController
- Retry logic for failed requests
- Caching mechanisms
- Request debouncing

### Dependencies

This hook requires React 16.8+ for hooks support.`,
  },
  {
    id: "3",
    title: "CSS Grid Auto-Fit Layout",
    description: "Responsive grid layout that automatically adjusts columns based on container width",
    language: "CSS",
    category: "Components",
    tags: ["css", "grid", "responsive", "layout"],
    author: "Mike Johnson",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-08"),
    views: 890,
    likes: 67,
    downloads: 123,
    isLiked: false,
    isFavorited: false,
    hasPreview: true,
    code: `.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.grid-item {
  background: #f0f0f0;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.grid-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* For smaller screens */
@media (max-width: 768px) {
  .auto-grid {
    grid-template-columns: 1fr;
  }
}`,
    previewHTML: `<div class="auto-grid">
  <div class="grid-item">Card 1</div>
  <div class="grid-item">Card 2</div>
  <div class="grid-item">Card 3</div>
  <div class="grid-item">Card 4</div>
  <div class="grid-item">Card 5</div>
  <div class="grid-item">Card 6</div>
</div>`,
    guide: `## CSS Grid Auto-Fit Layout Guide

This CSS Grid layout automatically adjusts the number of columns based on the available space, making it perfect for responsive card layouts.

### How It Works

The key is the \`repeat(auto-fit, minmax(250px, 1fr))\` value:

- **\`auto-fit\`**: Creates as many columns as can fit in the container
- **\`minmax(250px, 1fr)\`**: Each column is at least 250px wide, but can grow to fill available space
- **\`gap: 1rem\`**: Adds consistent spacing between grid items

### Responsive Behavior

- **Large screens**: Multiple columns side by side
- **Medium screens**: Fewer columns, items grow wider
- **Small screens**: Single column layout (via media query)

### Use Cases

Perfect for:
- Product grids
- Card layouts
- Image galleries
- Dashboard widgets
- Blog post previews

### Browser Support

Supported in all modern browsers. For older browsers, consider a flexbox fallback.`,
  },
  {
    id: "4",
    title: "Modern Button Styles",
    description: "A collection of modern button styles with hover effects and variants",
    language: "CSS",
    category: "Components",
    tags: ["css", "buttons", "ui", "hover-effects"],
    author: "Sarah Wilson",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
    views: 1450,
    likes: 112,
    downloads: 89,
    isLiked: false,
    isFavorited: false,
    hasPreview: true,
    code: `.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
}

.btn:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Primary Button */
.btn.primary {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.btn.primary:hover {
  background-color: #2563eb;
  border-color: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

/* Secondary Button */
.btn.secondary {
  background-color: #6b7280;
  color: white;
  border-color: #6b7280;
}

.btn.secondary:hover {
  background-color: #4b5563;
  border-color: #4b5563;
  transform: translateY(-1px);
}

/* Outline Button */
.btn.outline {
  background-color: transparent;
  color: #3b82f6;
  border-color: #3b82f6;
}

.btn.outline:hover {
  background-color: #3b82f6;
  color: white;
  transform: translateY(-1px);
}`,
    previewHTML: `<div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
  <button class="btn primary">Primary Button</button>
  <button class="btn secondary">Secondary Button</button>
  <button class="btn outline">Outline Button</button>
</div>`,
    guide: `## Modern Button Styles Guide

A comprehensive button system with consistent styling and smooth hover effects.

### Button Variants

#### Primary Button
- Used for main actions
- High contrast and attention-grabbing
- Blue color scheme with hover effects

#### Secondary Button
- Used for secondary actions
- Gray color scheme
- Less prominent than primary

#### Outline Button
- Used for tertiary actions
- Transparent background with colored border
- Fills with color on hover

### Features

- **Consistent Sizing**: All buttons have the same height and padding
- **Smooth Transitions**: 0.2s ease-in-out for all state changes
- **Hover Effects**: Subtle lift effect with \`translateY(-1px)\`
- **Focus States**: Accessible focus indicators
- **Flexible**: Works with \`<button>\` and \`<a>\` elements

### Accessibility

- Focus indicators for keyboard navigation
- Sufficient color contrast ratios
- Semantic HTML structure

### Customization

Easy to extend with additional variants:
- Danger/destructive buttons
- Success buttons
- Different sizes (small, large)
- Icon buttons`,
  },
  {
    id: "5",
    title: "Flexbox Card Layout",
    description: "Responsive card layout using flexbox with equal height cards",
    language: "CSS",
    category: "Components",
    tags: ["css", "flexbox", "cards", "responsive"],
    author: "Alex Chen",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03"),
    views: 756,
    likes: 45,
    downloads: 67,
    isLiked: false,
    isFavorited: false,
    hasPreview: true,
    code: `.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1rem;
}

.card {
  flex: 1 1 300px;
  min-width: 300px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-header {
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #1f2937;
}

.card-content {
  padding: 1rem 1.5rem 1.5rem;
  flex-grow: 1;
}

.card-content p {
  margin: 0;
  color: #6b7280;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .card {
    min-width: 100%;
  }
  
  .card-container {
    gap: 1rem;
  }
}`,
    previewHTML: `<div class="card-container">
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Card Title 1</h3>
    </div>
    <div class="card-content">
      <p>This is some example content for the first card. It demonstrates how the layout works.</p>
    </div>
  </div>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Card Title 2</h3>
    </div>
    <div class="card-content">
      <p>This card has different content length to show how flexbox handles equal heights automatically.</p>
    </div>
  </div>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Card Title 3</h3>
    </div>
    <div class="card-content">
      <p>The third card completes the layout demonstration.</p>
    </div>
  </div>
</div>`,
    guide: `## Flexbox Card Layout Guide

A responsive card layout that automatically adjusts to different screen sizes while maintaining equal heights.

### Key Features

#### Responsive Behavior
- **Desktop**: Cards arrange in rows, growing to fill available space
- **Tablet**: Fewer cards per row, maintaining minimum width
- **Mobile**: Single column layout for optimal readability

#### Equal Heights
- All cards in a row have the same height
- Content areas expand to fill available space
- Consistent visual alignment

### Flexbox Properties Explained

#### Container (\`.card-container\`)
- \`display: flex\`: Creates flex container
- \`flex-wrap: wrap\`: Allows cards to wrap to new lines
- \`gap: 1.5rem\`: Consistent spacing between cards

#### Cards (\`.card\`)
- \`flex: 1 1 300px\`: Grow, shrink, with 300px base
- \`min-width: 300px\`: Prevents cards from getting too narrow

### Hover Effects

- Subtle lift animation (\`translateY(-4px)\`)
- Enhanced shadow for depth
- Smooth transitions for professional feel

### Use Cases

Perfect for:
- Product showcases
- Team member profiles
- Feature highlights
- Blog post previews
- Service offerings`,
  },
]

interface SnippetPageProps {
  params: {
    id: string
  }
}

export default function SnippetPage({ params }: SnippetPageProps) {
  const snippet = mockSnippets.find((s) => s.id === params.id)

  if (!snippet) {
    notFound()
  }

  const shouldShowPreview = snippet.language === "CSS" && snippet.hasPreview

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-3 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{snippet.title}</h1>
              <p className="text-lg text-muted-foreground">{snippet.description}</p>
            </div>
            <Badge variant="secondary" className="text-sm">
              {snippet.language}
            </Badge>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>by {snippet.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDistanceToNow(snippet.createdAt, { addSuffix: true })}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{snippet.views.toLocaleString()} views</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{snippet.likes} likes</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{snippet.category}</Badge>
            {snippet.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* CSS Preview */}
        {shouldShowPreview && (
          <>
            <CSSPreview
              css={snippet.code}
              html={snippet.previewHTML}
              title="Live Preview"
              description="Interactive preview of the CSS styling"
            />
            <Separator />
          </>
        )}

        {/* Code Block */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Code</h2>
          <CodeBlock
            code={snippet.code}
            language={snippet.language}
            title={`${snippet.title}.${getFileExtension(snippet.language)}`}
            showLineNumbers={true}
          />
        </div>

        {/* Guide/Overview */}
        {snippet.guide && (
          <>
            <Separator />
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Guide & Overview</h2>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div dangerouslySetInnerHTML={{ __html: parseMarkdown(snippet.guide) }} />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1">
        <SnippetMetaSidebar snippet={snippet} />
      </div>
    </div>
  )
}

function getFileExtension(language: string): string {
  const extensions: Record<string, string> = {
    JavaScript: "js",
    TypeScript: "ts",
    Python: "py",
    React: "jsx",
    CSS: "css",
    HTML: "html",
    Bash: "sh",
    SQL: "sql",
    Go: "go",
    Rust: "rs",
    Java: "java",
  }
  return extensions[language] || "txt"
}

// Simple markdown parser for the guide content
function parseMarkdown(markdown: string): string {
  return markdown
    .replace(/^## (.*$)/gim, '<h2 class="text-lg font-semibold mt-6 mb-3">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-base font-medium mt-4 mb-2">$1</h3>')
    .replace(/^#### (.*$)/gim, '<h4 class="text-sm font-medium mt-3 mb-2">$1</h4>')
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-muted p-4 rounded-lg overflow-x-auto"><code>$2</code></pre>')
    .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/^(?!<[h|l|p])(.+)$/gm, '<p class="mb-4">$1</p>')
}
