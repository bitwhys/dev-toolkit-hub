'use client'

import { useState } from 'react'
import { Search, X } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SnippetFiltersProps {
  onFiltersChange: (filters: {
    search: string
    language: string
    category: string
    tags: string[]
  }) => void
}

export function SnippetFilters({ onFiltersChange }: SnippetFiltersProps) {
  const [search, setSearch] = useState('')
  const [language, setLanguage] = useState('all')
  const [category, setCategory] = useState('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const languages = [
    'JavaScript',
    'TypeScript',
    'Python',
    'React',
    'Node.js',
    'CSS',
    'HTML',
    'Bash',
    'SQL',
    'Go',
    'Rust',
    'Java',
  ]

  const categories = [
    'Utilities',
    'Components',
    'Hooks',
    'Functions',
    'Algorithms',
    'Patterns',
    'Configurations',
    'Scripts',
    'Templates',
    'Examples',
  ]

  const popularTags = [
    'async',
    'api',
    'validation',
    'performance',
    'security',
    'testing',
    'database',
    'authentication',
    'responsive',
    'animation',
  ]

  const handleFiltersChange = () => {
    onFiltersChange({
      search,
      language,
      category,
      tags: selectedTags,
    })
  }

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      const newTags = [...selectedTags, tag]
      setSelectedTags(newTags)
      onFiltersChange({
        search,
        language,
        category,
        tags: newTags,
      })
    }
  }

  const removeTag = (tag: string) => {
    const newTags = selectedTags.filter((t) => t !== tag)
    setSelectedTags(newTags)
    onFiltersChange({
      search,
      language,
      category,
      tags: newTags,
    })
  }

  const clearFilters = () => {
    setSearch('')
    setLanguage('all')
    setCategory('all')
    setSelectedTags([])
    onFiltersChange({
      search: '',
      language: 'all',
      category: 'all',
      tags: [],
    })
  }

  return (
    <div className="bg-card space-y-4 rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
        <Input
          placeholder="Search snippets..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            handleFiltersChange()
          }}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Language</label>
          <Select
            value={language}
            onValueChange={(value) => {
              setLanguage(value)
              handleFiltersChange()
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="All languages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All languages</SelectItem>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang.toLowerCase()}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Category</label>
          <Select
            value={category}
            onValueChange={(value) => {
              setCategory(value)
              handleFiltersChange()
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat.toLowerCase()}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Tags</label>
        {selectedTags.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {selectedTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-1 h-auto p-0"
                  onClick={() => removeTag(tag)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-1">
          {popularTags
            .filter((tag) => !selectedTags.includes(tag))
            .map((tag) => (
              <Button
                key={tag}
                variant="outline"
                size="sm"
                className="h-6 text-xs"
                onClick={() => addTag(tag)}
              >
                {tag}
              </Button>
            ))}
        </div>
      </div>
    </div>
  )
}
