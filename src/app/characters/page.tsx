"use client"

import { Users, Skull, UserCheck, Ghost } from "lucide-react"
import characters from "@/content/characters.json"
import { useHighlightOnLoad } from "@/hooks/use-highlight"

const roleIcons: Record<string, React.ReactNode> = {
  "主角": <UserCheck className="h-4 w-4" />,
  "配角": <Users className="h-4 w-4" />,
  "反派": <Skull className="h-4 w-4" />,
  "主要反派": <Ghost className="h-4 w-4" />,
  "商人": <Users className="h-4 w-4" />,
}

const roleColors: Record<string, string> = {
  "主角": "bg-green-500/10 text-green-500",
  "配角": "bg-blue-500/10 text-blue-500",
  "反派": "bg-red-500/10 text-red-500",
  "主要反派": "bg-purple-500/10 text-purple-500",
  "商人": "bg-amber-500/10 text-amber-500",
}

export default function CharactersPage() {
  useHighlightOnLoad()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-blue-500/10">
            <Users className="h-8 w-8 text-blue-500" />
          </div>
          <h1 className="text-4xl font-bold">角色</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          生化危机8村庄中的主要角色和反派
        </p>
      </div>

      {/* Characters Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {characters.map((character) => (
          <div
            key={character.id}
            id={character.id}
            className="group bg-card rounded-xl border border-border overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 hover:-translate-y-1 scroll-mt-24"
          >
            {/* Character Visual */}
            <div className="relative h-40 bg-gradient-to-br from-muted to-background overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                  backgroundSize: '16px 16px'
                }} />
              </div>
              
              {/* Character Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-red-500/20 flex items-center justify-center">
                  <Users className="h-10 w-10 text-muted-foreground/50" />
                </div>
              </div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              
              {/* Role Badge */}
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 ${roleColors[character.role] || 'bg-gray-500/10 text-gray-500'}`}>
                  {roleIcons[character.role]}
                  {character.role}
                </span>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-xl font-bold group-hover:text-amber-500 transition-colors">
                    {character.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">{character.nameEn}</p>
                </div>
                {character.status && (
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    character.status === '存活' ? 'bg-green-500/10 text-green-500' :
                    character.status === '已死亡' ? 'bg-red-500/10 text-red-500' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {character.status}
                  </span>
                )}
              </div>
              
              {character.title && (
                <p className="text-sm text-amber-500 mb-3">{character.title}</p>
              )}
              
              <p className="text-sm text-muted-foreground line-clamp-3">
                {character.description}
              </p>
              
              {character.appearsIn && (
                <div className="mt-3 pt-3 border-t">
                  <span className="text-xs text-muted-foreground">
                    登场: {character.appearsIn.join(", ")}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
