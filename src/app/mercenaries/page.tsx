import { Metadata } from "next"
import { Trophy, Target, Star } from "lucide-react"

export const metadata: Metadata = {
  title: "佣兵模式 | RE8 Village Guide",
  description: "生化危机8村庄佣兵模式攻略，包含关卡、评分和技巧",
}

const stages = [
  { id: 1, name: "村庄", difficulty: "入门", unlock: "初始解锁" },
  { id: 2, name: "城堡", difficulty: "中等", unlock: "A级评价解锁" },
  { id: 3, name: "工厂", difficulty: "困难", unlock: "A级评价解锁" },
  { id: 4, name: "疯狂村庄", difficulty: "极难", unlock: "A级评价解锁" },
  { id: 5, name: "村庄 II", difficulty: "困难", unlock: "B级评价解锁" },
  { id: 6, name: "城堡 II", difficulty: "极难", unlock: "B级评价解锁" },
  { id: 7, name: "工厂 II", difficulty: "专家", unlock: "B级评价解锁" },
  { id: 8, name: "疯狂村庄 II", difficulty: "专家", unlock: "B级评价解锁" },
]

const ranks = [
  { rank: "SSS", score: "最高", color: "text-yellow-500" },
  { rank: "SS", score: "非常高", color: "text-amber-500" },
  { rank: "S", score: "高", color: "text-orange-500" },
  { rank: "A", score: "良好", color: "text-green-500" },
  { rank: "B", score: "一般", color: "text-blue-500" },
  { rank: "C", score: "及格", color: "text-gray-500" },
]

export default function MercenariesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">佣兵模式</h1>
        <p className="text-xl text-muted-foreground">
          挑战高分，解锁特殊武器和奖励
        </p>
      </div>

      {/* Ranks */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-500" />
          评价等级
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {ranks.map((r) => (
            <div
              key={r.rank}
              className="bg-card rounded-xl border border-border p-4 text-center"
            >
              <div className={`text-3xl font-bold mb-1 ${r.color}`}>{r.rank}</div>
              <div className="text-sm text-muted-foreground">{r.score}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Stages */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Target className="h-6 w-6 text-red-500" />
          关卡列表
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className="bg-card rounded-xl border border-border p-6 hover:border-amber-500/30 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                    {stage.id}
                  </span>
                  <h3 className="text-xl font-bold">{stage.name}</h3>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  难度: {stage.difficulty}
                </span>
                <span className="text-xs text-muted-foreground">
                  {stage.unlock}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="mt-12 bg-amber-500/5 rounded-xl border border-amber-500/20 p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-amber-500" />
          技巧提示
        </h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• 连击数越高，得分倍率越高</li>
          <li>• 收集蓝色球体获得能力加成</li>
          <li>• 保持移动，避免被包围</li>
          <li>• 优先击杀高价值目标</li>
        </ul>
      </section>
    </div>
  )
}
