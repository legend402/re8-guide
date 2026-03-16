import { Metadata } from "next"
import Image from "next/image"
import characters from "@/content/characters.json"

export const metadata: Metadata = {
  title: "角色 | RE8 Village Guide",
  description: "生化危机8村庄全角色介绍，包括伊森·温特斯、四大贵族、米兰达母亲等",
}

export default function CharactersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">角色</h1>
        <p className="text-xl text-muted-foreground">
          生化危机8村庄中的主要角色和反派
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map((character) => (
          <div
            key={character.id}
            className="group relative bg-card rounded-xl border border-border overflow-hidden hover:border-amber-500/50 transition-all"
          >
            <div className="aspect-[4/3] bg-muted relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <span className="text-6xl">👤</span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-amber-500/10 text-amber-500">
                  {character.role}
                </span>
                {character.title && (
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground">
                    {character.title}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold mb-1 group-hover:text-amber-500 transition-colors">
                {character.name}
              </h2>
              <p className="text-sm text-muted-foreground mb-3">{character.nameEn}</p>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {character.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
