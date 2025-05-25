"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Copy, Share2, Download, Eye, Calendar, User, Tag, Code, Star, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "date-fns"

interface SnippetMetaSidebarProps {
  snippet: {
    id: string
    title: string
    language: string
    category: string
    tags: string[]
    author: string
    authorAvatar?: string
    createdAt: Date
    updatedAt: Date
    views: number
    likes: number
    downloads: number
    isLiked: boolean
    isFavorited: boolean
    code: string
    description: string
  }
}

export function SnippetMetaSidebar({ snippet }: SnippetMetaSidebarProps) {
  const { toast } = useToast()
  const [isLiked, setIsLiked] = useState(snippet.isLiked)
  const [isFavorited, setIsFavorited] = useState(snippet.isFavorited)
  const [likes, setLikes] = useState(snippet.likes)
  const [copied, setCopied] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
    toast({
      title: isLiked ? "Removed like" : "Liked snippet",
      description: isLiked ? "Snippet removed from likes" : "Snippet added to likes",
    })
  }

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: isFavorited ? "Snippet removed from favorites" : "Snippet saved to favorites",
    })
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "Code snippet has been copied to your clipboard.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link copied",
      description: "Snippet link has been copied to your clipboard.",
    })
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([snippet.code], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${snippet.title.toLowerCase().replace(/\s+/g, "-")}.${getFileExtension(snippet.language)}`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    toast({
      title: "Download started",
      description: "Snippet file is being downloaded.",
    })
  }

  const getFileExtension = (language: string): string => {
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

  return (
    <div className="space-y-6">
      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant={isLiked ? "default" : "outline"} className="w-full justify-start" onClick={handleLike}>
            <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
            {isLiked ? "Liked" : "Like"} ({likes})
          </Button>

          <Button
            variant={isFavorited ? "default" : "outline"}
            className="w-full justify-start"
            onClick={handleFavorite}
          >
            <Star className={`h-4 w-4 mr-2 ${isFavorited ? "fill-current" : ""}`} />
            {isFavorited ? "Favorited" : "Favorite"}
          </Button>

          <Button variant="outline" className="w-full justify-start" onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? "Copied!" : "Copy Code"}
          </Button>

          <Button variant="outline" className="w-full justify-start" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>

          <Button variant="outline" className="w-full justify-start" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </CardContent>
      </Card>

      {/* Author Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Author</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={snippet.authorAvatar || "/placeholder.svg"} />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{snippet.author}</p>
              <p className="text-sm text-muted-foreground">Developer</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metadata */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Code className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Language</span>
            </div>
            <Badge variant="secondary">{snippet.language}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Category</span>
            </div>
            <Badge variant="outline">{snippet.category}</Badge>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Views</span>
              </div>
              <span className="text-sm font-medium">{snippet.views.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Download className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Downloads</span>
              </div>
              <span className="text-sm font-medium">{snippet.downloads.toLocaleString()}</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Created</span>
              </div>
              <span className="text-sm">{formatDistanceToNow(snippet.createdAt, { addSuffix: true })}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Updated</span>
              </div>
              <span className="text-sm">{formatDistanceToNow(snippet.updatedAt, { addSuffix: true })}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {snippet.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
