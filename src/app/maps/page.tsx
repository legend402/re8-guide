"use client"

import maps from "@/content/maps.json"
import { MapPin, Skull, Key, ArrowRight, Mountain, Castle, Home, Factory, Droplets, Shield } from "lucide-react"
import { useHighlightOnLoad } from "@/hooks/use-highlight"
import { areaColors } from "@/data/maps"

const areaIcons: Record<string, React.ReactNode> = {
  "village": <Home className="h-8 w-8" />,
  "castle": <Castle className="h-8 w-8" />,
  "beneviento": <Mountain className="h-8 w-8" />,
  "reservoir": <Droplets className="h-8 w-8" />,
  "factory": <Factory className="h-8 w-8" />,
  "stronghold": <Shield className="h-8 w-8" />,
  "ceremony": <MapPin className="h-8 w-8" />,
}

export default function MapsPage() {
  useHighlightOnLoad()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-emerald-500/10">
            <MapPin className="h-8 w-8 text-emerald-500" />
          </div>
          <h1 className="text-4xl font-bold">地图</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          探索村庄、城堡、水库和工厂的各个区域
        </p>
      </div>

      {/* Maps Grid */}
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {maps.map((map, index) => (
          <div
            key={map.id}
            id={map.id}
            className={`group bg-card rounded-xl border border-border overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 scroll-mt-24 ${index === 0 ? 'md:col-span-2' : ''}`}
          >
            {/* Map Visual Header */}
            <div className={`relative h-48 bg-gradient-to-br ${areaColors[map.id] || 'from-amber-500/20 to-yellow-600/20 text-amber-500'} overflow-hidden`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                  backgroundSize: '20px 20px'
                }} />
              </div>
              
              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-6 rounded-full bg-background/20 backdrop-blur-sm">
                  {areaIcons[map.id] || <MapPin className="h-8 w-8" />}
                </div>
              </div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              
              {/* Map Number */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-background/80">
                  区域 {index + 1}
                </span>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold group-hover:text-amber-500 transition-colors">{map.name}</h2>
                <span className="text-sm text-muted-foreground">{map.nameEn}</span>
              </div>
              
              <p className="text-muted-foreground mb-6">{map.description}</p>

              <div className="space-y-4">
                {/* Areas */}
                <div>
                  <h3 className="text-sm font-semibold text-amber-500 mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    主要区域 ({map.areas.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {map.areas.map((area, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-lg text-sm bg-muted hover:bg-amber-500/10 hover:text-amber-500 transition-colors cursor-default"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Enemies */}
                <div>
                  <h3 className="text-sm font-semibold text-red-500 mb-3 flex items-center gap-2">
                    <Skull className="h-4 w-4" />
                    敌人
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {map.enemies.map((enemy, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-lg text-sm bg-red-500/10 text-red-500"
                      >
                        {enemy}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Items */}
                <div>
                  <h3 className="text-sm font-semibold text-emerald-500 mb-3 flex items-center gap-2">
                    <Key className="h-4 w-4" />
                    关键物品
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {map.keyItems.map((item, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-lg text-sm bg-emerald-500/10 text-emerald-500"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Tips */}
      <div className="max-w-4xl mx-auto mt-12 p-6 bg-amber-500/5 rounded-xl border border-amber-500/20">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ArrowRight className="h-5 w-5 text-amber-500" />
          探索提示
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-amber-500 mt-0.5" />
            <span>村庄是主要枢纽，连接所有其他区域。建议先熟悉村庄布局。</span>
          </div>
          <div className="flex items-start gap-2">
            <Key className="h-4 w-4 text-emerald-500 mt-0.5" />
            <span>每个区域都有关键道具，收集后才能进入下一区域。</span>
          </div>
          <div className="flex items-start gap-2">
            <Skull className="h-4 w-4 text-red-500 mt-0.5" />
            <span>Boss战前记得保存并在公爵处补充弹药。</span>
          </div>
          <div className="flex items-start gap-2">
            <ArrowRight className="h-4 w-4 text-blue-500 mt-0.5" />
            <span>击败四大贵族的顺序会影响部分区域的难度。</span>
          </div>
        </div>
      </div>
    </div>
  )
}
