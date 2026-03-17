"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Scroll, Gem, Shield, MapPin, Trophy, AlertCircle, ChevronDown, ChevronUp } from "lucide-react"
import collectibles from "@/content/collectibles.json"
import { areaColors, areaNames } from "@/data/collectibles"

const { goats: goatsList, files: filesList, treasures: treasuresList } = collectibles

export default function CollectiblesPage() {
  const [collectedGoats, setCollectedGoats] = useState<number[]>([])
  const [collectedFiles, setCollectedFiles] = useState<number[]>([])
  const [collectedTreasures, setCollectedTreasures] = useState<number[]>([])
  
  const [expandedGoats, setExpandedGoats] = useState(true)
  const [expandedFiles, setExpandedFiles] = useState(false)
  const [expandedTreasures, setExpandedTreasures] = useState(false)

  useEffect(() => {
    const savedGoats = localStorage.getItem('re8-collected-goats')
    const savedFiles = localStorage.getItem('re8-collected-files')
    const savedTreasures = localStorage.getItem('re8-collected-treasures')
    
    if (savedGoats) setCollectedGoats(JSON.parse(savedGoats))
    if (savedFiles) setCollectedFiles(JSON.parse(savedFiles))
    if (savedTreasures) setCollectedTreasures(JSON.parse(savedTreasures))
  }, [])

  useEffect(() => {
    localStorage.setItem('re8-collected-goats', JSON.stringify(collectedGoats))
  }, [collectedGoats])

  useEffect(() => {
    localStorage.setItem('re8-collected-files', JSON.stringify(collectedFiles))
  }, [collectedFiles])

  useEffect(() => {
    localStorage.setItem('re8-collected-treasures', JSON.stringify(collectedTreasures))
  }, [collectedTreasures])

  const toggleGoat = (id: number) => {
    setCollectedGoats(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    )
  }

  const toggleFile = (id: number) => {
    setCollectedFiles(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  const toggleTreasure = (id: number) => {
    setCollectedTreasures(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    )
  }

  const goatsByArea = goatsList.reduce((acc, goat) => {
    if (!acc[goat.area]) acc[goat.area] = []
    acc[goat.area].push(goat)
    return acc
  }, {} as Record<string, typeof goatsList>)

  const filesByArea = filesList.reduce((acc, file) => {
    if (!acc[file.area]) acc[file.area] = []
    acc[file.area].push(file)
    return acc
  }, {} as Record<string, typeof filesList>)

  const treasuresByArea = treasuresList.reduce((acc, treasure) => {
    if (!acc[treasure.area]) acc[treasure.area] = []
    acc[treasure.area].push(treasure)
    return acc
  }, {} as Record<string, typeof treasuresList>)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-amber-500/10">
            <Shield className="h-8 w-8 text-amber-500" />
          </div>
          <h1 className="text-4xl font-bold">收集品</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          追踪你的收集进度，完成全收集成就
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-12">
        <div className="grid md:grid-cols-3 gap-4">
          <ProgressCard 
            icon={Shield} 
            title="辟邪山羊" 
            current={collectedGoats.length} 
            total={20}
            color="amber"
            reward="Cynic奖杯 + 16,000 CP"
          />
          <ProgressCard 
            icon={Scroll} 
            title="文件资料" 
            current={collectedFiles.length} 
            total={47}
            color="blue"
            reward="揭示剧情背景"
          />
          <ProgressCard 
            icon={Gem} 
            title="宝藏" 
            current={collectedTreasures.length} 
            total={15}
            color="purple"
            reward="出售获得Lei"
          />
        </div>
      </div>

      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Goats Section */}
        <section className="bg-card rounded-xl border border-border overflow-hidden">
          <button 
            onClick={() => setExpandedGoats(!expandedGoats)}
            className="w-full p-6 border-b flex items-center justify-between hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-amber-500" />
              <div>
                <h2 className="text-2xl font-bold">辟邪山羊</h2>
                <p className="text-sm text-muted-foreground">
                  收集全部20个可获得Cynic奖杯和Heretic奖杯
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-3xl font-bold text-amber-500">{collectedGoats.length}</span>
                <span className="text-muted-foreground"> / 20</span>
              </div>
              {expandedGoats ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
            </div>
          </button>
          
          {expandedGoats && (
            <div className="p-6 space-y-6">
              {Object.entries(goatsByArea).map(([area, goats]) => (
                <div key={area}>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {areaNames[area]}
                    <span className="text-xs">({goats.length}个)</span>
                  </h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {goats.map((goat) => (
                      <div
                        key={goat.id}
                        onClick={() => toggleGoat(goat.id)}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                          collectedGoats.includes(goat.id) 
                            ? 'bg-green-500/10 border border-green-500/30' 
                            : 'bg-muted/50 hover:bg-muted border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle className={`h-5 w-5 transition-colors ${
                            collectedGoats.includes(goat.id) ? 'text-green-500' : 'text-muted-foreground'
                          }`} />
                          <div>
                            <span className={`font-medium ${collectedGoats.includes(goat.id) ? 'line-through opacity-60' : ''}`}>
                              {goat.name}
                            </span>
                            <p className="text-sm text-muted-foreground">{goat.location}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-xs ${areaColors[area] || 'bg-gray-500/10 text-gray-500'}`}>
                          {areaNames[area]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Files Section */}
        <section className="bg-card rounded-xl border border-border overflow-hidden">
          <button 
            onClick={() => setExpandedFiles(!expandedFiles)}
            className="w-full p-6 border-b flex items-center justify-between hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Scroll className="h-8 w-8 text-blue-500" />
              <div>
                <h2 className="text-2xl font-bold">文件资料</h2>
                <p className="text-sm text-muted-foreground">
                  散落在游戏中的47份文档和笔记
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-3xl font-bold text-blue-500">{collectedFiles.length}</span>
                <span className="text-muted-foreground"> / 47</span>
              </div>
              {expandedFiles ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
            </div>
          </button>
          
          {expandedFiles && (
            <div className="p-6 space-y-6 max-h-[600px] overflow-y-auto">
              {Object.entries(filesByArea).map(([area, files]) => (
                <div key={area}>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {areaNames[area]}
                    <span className="text-xs">({files.length}个)</span>
                  </h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        onClick={() => toggleFile(file.id)}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                          collectedFiles.includes(file.id) 
                            ? 'bg-green-500/10 border border-green-500/30' 
                            : 'bg-muted/50 hover:bg-muted border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle className={`h-5 w-5 transition-colors ${
                            collectedFiles.includes(file.id) ? 'text-green-500' : 'text-muted-foreground'
                          }`} />
                          <div>
                            <span className={`font-medium ${collectedFiles.includes(file.id) ? 'line-through opacity-60' : ''}`}>
                              {file.name}
                            </span>
                            <p className="text-sm text-muted-foreground">{file.location}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Treasures Section */}
        <section className="bg-card rounded-xl border border-border overflow-hidden">
          <button 
            onClick={() => setExpandedTreasures(!expandedTreasures)}
            className="w-full p-6 border-b flex items-center justify-between hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Gem className="h-8 w-8 text-purple-500" />
              <div>
                <h2 className="text-2xl font-bold">宝藏</h2>
                <p className="text-sm text-muted-foreground">
                  15个高价值物品，可以出售给公爵换取 Lei
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-3xl font-bold text-purple-500">{collectedTreasures.length}</span>
                <span className="text-muted-foreground"> / 15</span>
              </div>
              {expandedTreasures ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
            </div>
          </button>
          
          {expandedTreasures && (
            <div className="p-6 space-y-6 max-h-[500px] overflow-y-auto">
              {Object.entries(treasuresByArea).map(([area, treasures]) => (
                <div key={area}>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {areaNames[area]}
                    <span className="text-xs">({treasures.length}个)</span>
                  </h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {treasures.map((treasure) => (
                      <div
                        key={treasure.id}
                        onClick={() => toggleTreasure(treasure.id)}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                          collectedTreasures.includes(treasure.id) 
                            ? 'bg-green-500/10 border border-green-500/30' 
                            : 'bg-muted/50 hover:bg-muted border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle className={`h-5 w-5 transition-colors ${
                            collectedTreasures.includes(treasure.id) ? 'text-green-500' : 'text-muted-foreground'
                          }`} />
                          <div>
                            <span className={`font-medium ${collectedTreasures.includes(treasure.id) ? 'line-through opacity-60' : ''}`}>
                              {treasure.name}
                            </span>
                            <p className="text-sm text-muted-foreground">{treasure.location}</p>
                          </div>
                        </div>
                        <span className="text-sm text-purple-500 font-medium">
                          {treasure.value.toLocaleString()} Lei
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-amber-500/5 rounded-xl border border-amber-500/20 p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            收集提示
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
              <span>辟邪山羊被摧毁时会发出声音并破碎，注意聆听</span>
            </div>
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5" />
              <span>文件通常出现在桌子、书架和尸体旁边</span>
            </div>
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-purple-500 mt-0.5" />
              <span>宝藏通常藏在锁着的房间或需要解谜才能获得</span>
            </div>
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span>点击物品前的圆圈可以标记为已收集，进度会自动保存</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function ProgressCard({ 
  icon: Icon, 
  title, 
  current, 
  total, 
  color,
  reward 
}: { 
  icon: React.ElementType
  title: string
  current: number
  total: number
  color: string
  reward: string
}) {
  const colorClasses: Record<string, string> = {
    amber: "bg-amber-500/10 text-amber-500",
    blue: "bg-blue-500/10 text-blue-500",
    purple: "bg-purple-500/10 text-purple-500",
  }

  const percentage = Math.round((current / total) * 100)

  return (
    <div className="bg-card rounded-xl border border-border p-4 hover:border-amber-500/30 transition-all">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-xs text-muted-foreground">{reward}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mb-2">
        <span className={`text-2xl font-bold ${colorClasses[color].split(' ')[1]}`}>{current}</span>
        <span className="text-sm text-muted-foreground">/ {total}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full ${colorClasses[color].split(' ')[0].replace('/10', '')} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="mt-2 text-xs text-muted-foreground text-right">{percentage}%</div>
    </div>
  )
}
