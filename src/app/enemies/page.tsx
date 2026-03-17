"use client"

import enemies from "@/content/enemies.json"
import { Trophy, Target, MapPin, Skull, Zap, Flame, Crosshair } from "lucide-react"
import { useHighlightOnLoad } from "@/hooks/use-highlight"
import { categoryColors, categoryIconNames } from "@/data/enemies"

const categoryIcons: Record<string, React.ReactNode> = {
  "普通敌人": <Target className="h-4 w-4" />,
  "小Boss": <Zap className="h-4 w-4" />,
  "Boss": <Skull className="h-4 w-4" />,
  "最终Boss": <Trophy className="h-4 w-4" />,
  "特殊敌人": <Flame className="h-4 w-4" />,
}

export default function EnemiesPage() {
  useHighlightOnLoad()

  const bosses = enemies.filter(e => e.category === "Boss" || e.category === "最终Boss")
  const miniBosses = enemies.filter(e => e.category === "小Boss")
  const normalEnemies = enemies.filter(e => e.category === "普通敌人")
  const specialEnemies = enemies.filter(e => e.category === "特殊敌人")

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-red-500/10">
            <Skull className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="text-4xl font-bold">敌人</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          敌人和Boss攻略，弱点分析和战斗建议
        </p>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={Target} label="普通敌人" value={normalEnemies.length} color="blue" />
          <StatCard icon={Zap} label="小Boss" value={miniBosses.length} color="orange" />
          <StatCard icon={Skull} label="Boss" value={bosses.filter(b => b.category === "Boss").length} color="red" />
          <StatCard icon={Trophy} label="最终Boss" value={bosses.filter(b => b.category === "最终Boss").length} color="purple" />
        </div>
      </div>

      {/* All Enemies Grid */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Crosshair className="h-6 w-6 text-amber-500" />
          敌人图鉴
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Bosses First */}
          {bosses.map((enemy) => (
            <EnemyCard key={enemy.id} enemy={enemy} featured />
          ))}
          
          {/* Mini Bosses */}
          {miniBosses.map((enemy) => (
            <EnemyCard key={enemy.id} enemy={enemy} />
          ))}
          
          {/* Special Enemies */}
          {specialEnemies.map((enemy) => (
            <EnemyCard key={enemy.id} enemy={enemy} />
          ))}
          
          {/* Normal Enemies */}
          {normalEnemies.map((enemy) => (
            <EnemyCard key={enemy.id} enemy={enemy} />
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: number; color: string }) {
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-500/10 text-blue-500",
    orange: "bg-orange-500/10 text-orange-500",
    red: "bg-red-500/10 text-red-500",
    purple: "bg-purple-500/10 text-purple-500",
  }

  return (
    <div className="bg-card rounded-xl border border-border p-4 text-center hover:border-amber-500/30 transition-all">
      <Icon className={`h-6 w-6 mx-auto mb-2 ${colorClasses[color]?.split(' ')[1] || 'text-amber-500'}`} />
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

interface EnemyCardProps {
  enemy: typeof import("@/content/enemies.json")[0]
  featured?: boolean
}

function EnemyCard({ enemy, featured }: EnemyCardProps) {
  const colorClass = categoryColors[enemy.category] || "bg-gray-500/10 text-gray-500 border-gray-500/30"
  const isBoss = enemy.category === "Boss" || enemy.category === "最终Boss"

  if (featured || isBoss) {
    return (
      <div 
        id={enemy.id}
        className="col-span-full group bg-card rounded-xl border border-border overflow-hidden hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 scroll-mt-24"
      >
        <div className={`p-4 border-b ${colorClass}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {categoryIcons[enemy.category]}
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-background/80">
                {enemy.category}
              </span>
            </div>
            {enemy.rewards && (
              <span className="text-xs opacity-80">
                掉落: {enemy.rewards.join(", ")}
              </span>
            )}
          </div>
          <h3 className="text-2xl font-bold mt-2">{enemy.name}</h3>
        </div>
        
        <div className="p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <MapPin className="h-4 w-4" />
            {enemy.location}
          </div>
          
          <p className="text-muted-foreground mb-4">{enemy.description}</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
              <h4 className="font-semibold mb-2 text-red-500 flex items-center gap-2">
                <Target className="h-4 w-4" />
                弱点
              </h4>
              <div className="flex flex-wrap gap-2">
                {enemy.weaknesses.map((w, i) => (
                  <span key={i} className="px-2 py-0.5 rounded text-xs bg-red-500/10 text-red-500">
                    {w}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
              <h4 className="font-semibold mb-2 text-amber-500 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                攻略建议
              </h4>
              <p className="text-sm text-muted-foreground">{enemy.strategy}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      id={enemy.id}
      className="group bg-card rounded-xl border border-border overflow-hidden hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg scroll-mt-24"
    >
      <div className={`p-3 border-b ${colorClass}`}>
        <div className="flex items-center gap-2">
          {categoryIcons[enemy.category]}
          <span className="px-2 py-0.5 rounded text-xs font-medium bg-background/80">
            {enemy.category}
          </span>
        </div>
        <h3 className="text-lg font-bold mt-1">{enemy.name}</h3>
      </div>
      
      <div className="p-3">
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
          <MapPin className="h-3 w-3" />
          {enemy.location}
        </div>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{enemy.description}</p>
        
        <div className="space-y-2">
          <div>
            <span className="text-xs text-muted-foreground">弱点: </span>
            <span className="text-xs">{enemy.weaknesses.join(", ")}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
