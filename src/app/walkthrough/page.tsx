import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, BookOpen } from "lucide-react"

export const metadata: Metadata = {
  title: "攻略 | RE8 Village Guide",
  description: "生化危机8村庄完整流程攻略，包含主线任务和关键收集品位置",
}

const chapters = [
  {
    id: 1,
    title: "村庄入口",
    description: "伊森来到神秘的东欧村庄，寻找被绑架的女儿罗斯",
    boss: null,
    keyItems: ["手枪", "小刀"],
  },
  {
    id: 2,
    title: "城堡 Dimitrescu",
    description: "进入迪米特雷斯库夫人的城堡，躲避她的三个女儿",
    boss: "迪米特雷斯库夫人",
    keyItems: ["四大家族面具", "钥匙"],
  },
  {
    id: 3,
    title: "贝内文托家",
    description: "探索多娜·贝内文托的恐怖房屋，面对心理恐怖",
    boss: "多娜·贝内文托",
    keyItems: ["人偶"],
  },
  {
    id: 4,
    title: "莫罗水库",
    description: "穿越被洪水淹没的区域，与变异怪物莫罗战斗",
    boss: "莫罗",
    keyItems: ["曲柄"],
  },
  {
    id: 5,
    title: "海森伯格工厂",
    description: "深入海森伯格的机械工厂，面对 Soldat 军团",
    boss: "海森伯格",
    keyItems: ["机械零件"],
  },
  {
    id: 6,
    title: "最终决战",
    description: "与米兰达母亲的最终对决，拯救罗斯",
    boss: "米兰达母亲",
    keyItems: ["通关"],
  },
]

export default function WalkthroughPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">攻略</h1>
        <p className="text-xl text-muted-foreground">
          生化危机8村庄完整流程攻略
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 via-red-500 to-purple-500" />

          {/* Chapters */}
          <div className="space-y-8">
            {chapters.map((chapter) => (
              <div key={chapter.id} className="relative pl-20">
                {/* Chapter Number */}
                <div className="absolute left-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {chapter.id}
                </div>

                {/* Content */}
                <div className="bg-card rounded-xl border border-border p-6 hover:border-amber-500/30 transition-all">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {chapter.boss && (
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-500/10 text-red-500">
                        Boss: {chapter.boss}
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl font-bold mb-2">{chapter.title}</h2>
                  <p className="text-muted-foreground mb-4">{chapter.description}</p>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">关键物品:</span>
                    <div className="flex flex-wrap gap-2">
                      {chapter.keyItems.map((item, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-500"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
