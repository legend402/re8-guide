import { Metadata } from "next"
import maps from "@/content/maps.json"

export const metadata: Metadata = {
  title: "地图 | RE8 Village Guide",
  description: "生化危机8村庄全地图指南，包含村庄、城堡、水库、工厂等区域的详细资料",
}

export default function MapsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">地图</h1>
        <p className="text-xl text-muted-foreground">
          探索村庄、城堡、水库和工厂的各个区域
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {maps.map((map) => (
          <div
            key={map.id}
            className="bg-card rounded-xl border border-border overflow-hidden hover:border-amber-500/50 transition-all"
          >
            <div className="aspect-video bg-muted relative flex items-center justify-center">
              <span className="text-6xl">🗺️</span>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold">{map.name}</h2>
                <span className="text-sm text-muted-foreground">{map.nameEn}</span>
              </div>
              <p className="text-muted-foreground mb-4">{map.description}</p>

              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-semibold text-amber-500 mb-2">主要区域</h3>
                  <div className="flex flex-wrap gap-2">
                    {map.areas.map((area, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded text-xs bg-muted text-muted-foreground"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-red-500 mb-2">敌人</h3>
                  <div className="flex flex-wrap gap-2">
                    {map.enemies.map((enemy, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded text-xs bg-red-500/10 text-red-500"
                      >
                        {enemy}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
