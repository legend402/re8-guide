import { Metadata } from "next"
import { GitGraph, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "流程图 | RE8 Village Guide",
  description: "生化危机8村庄章节流程图，可视化展示游戏进度",
}

const regions = [
  {
    id: "village",
    name: "村庄",
    color: "from-emerald-500 to-green-600",
    chapters: [
      { id: 1, name: "猎杀开始", boss: false },
      { id: 2, name: "村庄探索", boss: false },
      { id: 3, name: "城堡入口", boss: false },
    ],
  },
  {
    id: "castle",
    name: "城堡",
    color: "from-purple-500 to-violet-600",
    chapters: [
      { id: 4, name: "城堡大厅", boss: false },
      { id: 5, name: "三位女儿", boss: true },
      { id: 6, name: "迪米特雷斯库夫人", boss: true },
    ],
  },
  {
    id: "beneviento",
    name: "贝内文托家",
    color: "from-blue-500 to-cyan-600",
    chapters: [
      { id: 7, name: "人偶屋", boss: false },
      { id: 8, name: "多娜", boss: true },
    ],
  },
  {
    id: "reservoir",
    name: "水库",
    color: "from-cyan-500 to-teal-600",
    chapters: [
      { id: 9, name: "洪水区域", boss: false },
      { id: 10, name: "莫罗", boss: true },
    ],
  },
  {
    id: "factory",
    name: "工厂",
    color: "from-orange-500 to-red-600",
    chapters: [
      { id: 11, name: "地下工厂", boss: false },
      { id: 12, name: "海森伯格", boss: true },
    ],
  },
  {
    id: "final",
    name: "最终决战",
    color: "from-red-500 to-rose-600",
    chapters: [
      { id: 13, name: "要塞", boss: false },
      { id: 14, name: "米兰达母亲", boss: true },
    ],
  },
]

export default function FlowPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <GitGraph className="h-10 w-10 text-amber-500" />
          流程图
        </h1>
        <p className="text-xl text-muted-foreground">
          可视化展示游戏章节流程和区域分布
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {regions.map((region, regionIndex) => (
          <div key={region.id} className="relative">
            {/* Region Header */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${region.color} text-white font-semibold mb-4`}>
              <span>{region.name}</span>
              <ArrowRight className="h-4 w-4" />
            </div>

            {/* Chapters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pl-4">
              {region.chapters.map((chapter) => (
                <Link
                  key={chapter.id}
                  href={`/walkthrough#chapter-${chapter.id}`}
                  className="group relative bg-card rounded-xl border border-border p-4 hover:border-amber-500/50 transition-all"
                >
                  {chapter.boss && (
                    <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white">
                      BOSS
                    </span>
                  )}
                  <div className="text-sm text-muted-foreground mb-1">章节 {chapter.id}</div>
                  <div className="font-semibold group-hover:text-amber-500 transition-colors">
                    {chapter.name}
                  </div>
                </Link>
              ))}
            </div>

            {/* Connector */}
            {regionIndex < regions.length - 1 && (
              <div className="flex justify-center my-6">
                <div className="w-0.5 h-8 bg-gradient-to-b from-transparent via-amber-500 to-transparent" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="max-w-4xl mx-auto mt-12 p-6 bg-card rounded-xl border border-border">
        <h2 className="text-lg font-semibold mb-4">图例</h2>
        <div className="flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-red-500" />
            <span>Boss战</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-amber-500" />
            <span>可点击跳转</span>
          </div>
        </div>
      </div>
    </div>
  )
}
