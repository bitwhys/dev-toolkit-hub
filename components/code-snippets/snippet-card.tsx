'use client'

import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Calendar, Eye, Heart } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface SnippetCardProps {
  snippet: {
    id: string
    title: string
    description: string
    language: string
    category: string
    tags: string[]
    author: string
    createdAt: Date
    views: number
    likes: number
    code: string
  }
}

export function SnippetCard({ snippet }: SnippetCardProps) {
  const previewCode =
    snippet.code.length > 150 ? snippet.code.substring(0, 150) + '...' : snippet.code

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">
              <Link href={`/tools/snippets/${snippet.id}`} className="hover:text-primary">
                {snippet.title}
              </Link>
            </CardTitle>
            <CardDescription>{snippet.description}</CardDescription>
          </div>
          <Badge variant="secondary">{snippet.language}</Badge>
        </div>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <span>by {snippet.author}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDistanceToNow(snippet.createdAt, { addSuffix: true })}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <pre className="bg-muted overflow-hidden rounded-md p-3 text-sm">
            <code>{previewCode}</code>
          </pre>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline">{snippet.category}</Badge>
              {snippet.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {snippet.tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{snippet.tags.length - 2}
                </Badge>
              )}
            </div>

            <div className="text-muted-foreground flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {snippet.views}
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                {snippet.likes}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
