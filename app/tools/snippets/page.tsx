'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Code, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { SnippetCard } from '@/components/code-snippets/snippet-card'
import { SnippetFilters } from '@/components/code-snippets/snippet-filters'

// Mock data - in a real app, this would come from an API
const mockSnippets = [
  {
    id: '1',
    title: 'React Custom Hook for API Calls',
    description:
      'A reusable custom hook for handling API requests with loading states and error handling',
    language: 'React',
    category: 'Hooks',
    tags: ['react', 'hooks', 'api', 'typescript'],
    author: 'John Doe',
    createdAt: new Date('2024-01-15'),
    views: 1250,
    likes: 89,
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
  },
  {
    id: '2',
    title: 'TypeScript Utility Types',
    description: 'Collection of useful TypeScript utility types for better type safety',
    language: 'TypeScript',
    category: 'Utilities',
    tags: ['typescript', 'types', 'utility', 'generics'],
    author: 'Jane Smith',
    createdAt: new Date('2024-01-10'),
    views: 2100,
    likes: 156,
    code: `// Deep readonly type
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// Pick by type
type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

// Omit by type
type OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K];
};

// Example usage
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

type StringFields = PickByType<User, string>; // { name: string; email: string; }
type NonStringFields = OmitByType<User, string>; // { id: number; isActive: boolean; }`,
  },
  {
    id: '3',
    title: 'CSS Grid Auto-Fit Layout',
    description:
      'Responsive grid layout that automatically adjusts columns based on container width',
    language: 'CSS',
    category: 'Components',
    tags: ['css', 'grid', 'responsive', 'layout'],
    author: 'Mike Johnson',
    createdAt: new Date('2024-01-08'),
    views: 890,
    likes: 67,
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
  },
  {
    id: '4',
    title: 'Modern Button Styles',
    description: 'A collection of modern button styles with hover effects and variants',
    language: 'CSS',
    category: 'Components',
    tags: ['css', 'buttons', 'ui', 'hover-effects'],
    author: 'Sarah Wilson',
    createdAt: new Date('2024-01-05'),
    views: 1450,
    likes: 112,
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
}

.btn.primary {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.btn.primary:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.btn.secondary {
  background-color: #6b7280;
  color: white;
}

.btn.outline {
  background-color: transparent;
  color: #3b82f6;
  border-color: #3b82f6;
}

.btn.outline:hover {
  background-color: #3b82f6;
  color: white;
}`,
  },
  {
    id: '5',
    title: 'Flexbox Card Layout',
    description: 'Responsive card layout using flexbox with equal height cards',
    language: 'CSS',
    category: 'Components',
    tags: ['css', 'flexbox', 'cards', 'responsive'],
    author: 'Alex Chen',
    createdAt: new Date('2024-01-03'),
    views: 756,
    likes: 45,
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
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-header {
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.card-content {
  padding: 1rem 1.5rem 1.5rem;
  grow: 1;
}`,
  },
  {
    id: '6',
    title: 'Python Data Validation Decorator',
    description: 'A decorator for validating function arguments with type checking',
    language: 'Python',
    category: 'Functions',
    tags: ['python', 'validation', 'decorator', 'types'],
    author: 'Sarah Wilson',
    createdAt: new Date('2024-01-05'),
    views: 1450,
    likes: 112,
    code: `from functools import wraps
from typing import get_type_hints, Any

def validate_types(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        # Get type hints for the function
        hints = get_type_hints(func)
        
        # Get function argument names
        arg_names = func.__code__.co_varnames[:func.__code__.co_argcount]
        
        # Validate positional arguments
        for i, (arg_name, arg_value) in enumerate(zip(arg_names, args)):
            if arg_name in hints:
                expected_type = hints[arg_name]
                if not isinstance(arg_value, expected_type):
                    raise TypeError(
                        f"Argument '{arg_name}' must be of type {expected_type.__name__}, "
                        f"got {type(arg_value).__name__}"
                    )
        
        return func(*args, **kwargs)
    
    return wrapper

# Example usage
@validate_types
def calculate_area(length: float, width: float) -> float:
    return length * width`,
  },
]

export default function SnippetsPage() {
  const [filteredSnippets, setFilteredSnippets] = useState(mockSnippets)

  const handleFiltersChange = (filters: {
    search: string
    language: string
    category: string
    tags: string[]
  }) => {
    let filtered = mockSnippets

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (snippet) =>
          snippet.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          snippet.description.toLowerCase().includes(filters.search.toLowerCase()) ||
          snippet.author.toLowerCase().includes(filters.search.toLowerCase()),
      )
    }

    // Language filter
    if (filters.language && filters.language !== 'all') {
      filtered = filtered.filter((snippet) => snippet.language.toLowerCase() === filters.language)
    }

    // Category filter
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter((snippet) => snippet.category.toLowerCase() === filters.category)
    }

    // Tags filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter((snippet) =>
        filters.tags.every((tag) => snippet.tags.includes(tag)),
      )
    }

    setFilteredSnippets(filtered)
  }

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center text-3xl font-bold">
              <Code className="mr-3 h-8 w-8" />
              Code Snippets
            </h1>
            <p className="text-muted-foreground max-w-3xl text-lg">
              Discover and share useful code snippets. Find solutions, learn new techniques, and
              contribute to the developer community.
            </p>
          </div>
          <Button asChild>
            <Link href="/tools/snippets/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Snippet
            </Link>
          </Button>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/*<div className="lg:col-span-1">*/}
        {/*  <SnippetFilters onFiltersChange={handleFiltersChange} />*/}
        {/*</div>*/}

        <div className="col-span-full">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-sm">
                {filteredSnippets.length} snippet{filteredSnippets.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {filteredSnippets.map((snippet) => (
                <SnippetCard key={snippet.id} snippet={snippet} />
              ))}
            </div>

            {filteredSnippets.length === 0 && (
              <div className="py-12 text-center">
                <Code className="text-muted-foreground mx-auto h-12 w-12" />
                <h3 className="mt-4 text-lg font-medium">No snippets found</h3>
                <p className="text-muted-foreground mt-2">
                  Try adjusting your filters or search terms to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
