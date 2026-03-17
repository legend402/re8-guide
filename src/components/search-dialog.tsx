"use client"

import React, { useState, useEffect, useMemo, useRef } from "react"
import { useRouter } from "next/navigation"
import Fuse from "fuse.js"
import type { FuseResult } from "fuse.js"
import { Search, X } from "lucide-react"
import { searchableItems, SearchableItem } from "@/data/search-data"
import * as Icons from "lucide-react"

// Fuse.js configuration
const fuseOptions = {
  keys: [
    { name: "title", weight: 0.4 },
    { name: "description", weight: 0.3 },
    { name: "keywords", weight: 0.2 },
    { name: "category", weight: 0.1 }
  ],
  threshold: 0.3,        // Lower threshold = more strict matching
  includeScore: true,    // Include match score
  includeMatches: true,  // Include match information
  minMatchCharLength: 1,
  shouldSort: true,      // Sort by score
  ignoreLocation: true,  // Match anywhere in string
  useExtendedSearch: true
}

// Create Fuse instance
const fuse = new Fuse(searchableItems, fuseOptions)

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<FuseResult<SearchableItem>[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when dialog opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
      setQuery("")
      setResults([])
      setSelectedIndex(0)
    }
  }, [open])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange(false)
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [open, onOpenChange])

  // Perform search with Fuse.js
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const searchResults = fuse.search(query, { limit: 10 })
    setResults(searchResults)
    setSelectedIndex(0)
  }, [query])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : prev
          )
          break
        case "ArrowUp":
          e.preventDefault()
          setSelectedIndex(prev => prev > 0 ? prev - 1 : 0)
          break
        case "Enter":
          e.preventDefault()
          if (results[selectedIndex]) {
            handleSelect(results[selectedIndex].item)
          }
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, results, selectedIndex])

  const handleSelect = (item: SearchableItem) => {
    onOpenChange(false)
    setQuery("")
    
    // Store highlight info in sessionStorage
    const hash = item.href.split("#")[1]
    if (hash) {
      sessionStorage.setItem("re8-highlight-target", hash)
      sessionStorage.setItem("re8-highlight-title", item.title)
    }
    
    router.push(item.href)
  }

  // Get icon component dynamically
  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName]
    return IconComponent || Icons.HelpCircle
  }

  // Group results by category
  const groupedResults = useMemo(() => {
    const groups: Record<string, FuseResult<SearchableItem>[]> = {}
    results.forEach(result => {
      const category = result.item.category
      if (!groups[category]) groups[category] = []
      groups[category].push(result)
    })
    return groups
  }, [results])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={() => onOpenChange(false)}
      />
      
      {/* Dialog */}
      <div className="relative w-full max-w-[700px] mx-4 bg-card rounded-xl border border-border shadow-2xl overflow-hidden flex flex-col max-h-[70vh]">
        {/* Header with search input */}
        <div className="px-4 pt-4 pb-3 border-b">
          <div className="flex items-center gap-3">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              placeholder="搜索武器、敌人、角色、地图..."
              className="flex-1 bg-transparent border-none outline-none text-lg placeholder:text-muted-foreground"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1.5 rounded-full hover:bg-muted transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <kbd className="px-2 py-1 rounded border bg-muted">ESC</kbd>
              <span>关闭</span>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="flex-1 overflow-y-auto py-2">
          {results.length > 0 ? (
            <div className="space-y-4">
              {Object.entries(groupedResults).map(([category, categoryResults]) => (
                <div key={category}>
                  <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {category}
                    <span className="ml-2 text-muted-foreground/60">({categoryResults.length})</span>
                  </div>
                  <div>
                    {categoryResults.map((result, idx) => {
                      const globalIndex = results.findIndex(r => r.item.id === result.item.id)
                      const Icon = getIcon(result.item.icon)
                      const isSelected = globalIndex === selectedIndex
                      
                      return (
                        <button
                          key={result.item.id}
                          onClick={() => handleSelect(result.item)}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
                            isSelected 
                              ? 'bg-accent border-l-4 border-amber-500' 
                              : 'hover:bg-accent/50 border-l-4 border-transparent'
                          }`}
                        >
                          <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                            isSelected ? 'bg-amber-500/20' : 'bg-muted'
                          }`}>
                            <Icon className={`h-5 w-5 ${isSelected ? 'text-amber-500' : 'text-muted-foreground'}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">
                              {result.matches && result.matches[0] ? (
                                highlightMatches(result.item.title, result.matches[0].indices)
                              ) : (
                                result.item.title
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground truncate">
                              {result.item.description}
                            </div>
                            {result.score && result.score < 0.3 && (
                              <div className="text-xs text-green-500 mt-0.5">
                                最佳匹配
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100">
                            ↵
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : query ? (
            <div className="py-12 text-center text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">未找到相关结果</p>
              <p className="text-sm mt-1">尝试其他关键词或检查拼写</p>
              <div className="mt-4 text-xs text-muted-foreground/60">
                搜索提示: 支持模糊匹配，可以输入拼音、英文或部分关键字
              </div>
            </div>
          ) : (
            <div className="py-8 px-4">
              <p className="text-sm text-muted-foreground mb-4">热门搜索</p>
              <div className="flex flex-wrap gap-2">
                {["迪米特雷斯库夫人", "LEMI", "辟邪山羊", "马格南", "合成配方", "城堡", "莫罗"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-full bg-muted text-sm hover:bg-accent transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
              
              <div className="mt-6 text-xs text-muted-foreground/60 space-y-1">
                <p>搜索技巧:</p>
                <ul className="list-disc list-inside space-y-0.5 ml-2">
                  <li>支持模糊匹配，输入部分关键字即可</li>
                  <li>可使用拼音、英文或中文搜索</li>
                  <li>使用方向键 ↑↓ 选择，回车确认</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {results.length > 0 && (
          <div className="px-4 py-2 border-t text-xs text-muted-foreground flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded border bg-muted">↑↓</kbd>
                <span>选择</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded border bg-muted">↵</kbd>
                <span>确认</span>
              </span>
            </div>
            <span>
              共 {results.length} 个结果
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

// Helper function to highlight matched text
function highlightMatches(text: string, indices: ReadonlyArray<[number, number]>) {
  if (!indices || indices.length === 0) return text

  const parts: React.ReactElement[] = []
  let lastIndex = 0

  // Sort indices by start position
  const sortedIndices = [...indices].sort((a, b) => a[0] - b[0])
  
  // Merge overlapping indices
  const mergedIndices: [number, number][] = []
  for (const [start, end] of sortedIndices) {
    if (mergedIndices.length === 0 || start > mergedIndices[mergedIndices.length - 1][1] + 1) {
      mergedIndices.push([start, end])
    } else {
      mergedIndices[mergedIndices.length - 1][1] = Math.max(mergedIndices[mergedIndices.length - 1][1], end)
    }
  }

  mergedIndices.forEach(([start, end], i) => {
    // Add text before match
    if (start > lastIndex) {
      parts.push(<span key={`before-${i}`}>{text.slice(lastIndex, start)}</span>)
    }
    // Add highlighted match
    parts.push(
      <span key={`match-${i}`} className="text-amber-500 font-semibold bg-amber-500/10 px-0.5 rounded">
        {text.slice(start, end + 1)}
      </span>
    )
    lastIndex = end + 1
  })

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(<span key="after">{text.slice(lastIndex)}</span>)
  }

  return <>{parts}</>
}
