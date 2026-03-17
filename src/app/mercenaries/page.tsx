import { Metadata } from "next"
import { Trophy, Target, Star, Zap, Flame, Award } from "lucide-react"
import mercenaries from "@/content/mercenaries.json"

const { stages, ranks, abilities } = mercenaries

export const metadata: Metadata = {
  title: "佣兵模式 | RE8 Village Guide",
  description: "生化危机8村庄佣兵模式攻略，包含关卡、评分和技巧",
}

export default function MercenariesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-yellow-500/10">
            <Trophy className="h-8 w-8 text-yellow-500" />
          </div>
          <h1 className="text-4xl font-bold">佣兵模式</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          挑战高分，解锁特殊武器和奖励
        </p>
      </div>

      {/* Ranks */}
      <section className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Award className="h-6 w-6 text-amber-500" />
          评价等级
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {ranks.map((r) => (
            <div
              key={r.rank}
              className={`${r.bgColor} rounded-xl border border-border p-4 text-center hover:border-amber-500/30 transition-all`}
            >
              <div className={`text-3xl font-bold mb-1 ${r.color}`}>{r.rank}</div>
              <div className="text-sm text-muted-foreground">{r.score}</div>
              <div className="text-xs text-muted-foreground mt-1">{r.requirement}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Abilities */}
      <section className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Zap className="h-6 w-6 text-yellow-500" />
          能力球效果
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {abilities.map((ability) => (
            <div
              key={ability.name}
              className="bg-card rounded-xl border border-border p-4 text-center hover:border-yellow-500/30 transition-all"
            >
              <Zap className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
              <h3 className="font-semibold text-sm">{ability.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{ability.effect}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stages */}
      <section className="max-w-4xl mx-auto">
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
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">难度:</span>
                  <span className={`font-medium ${
                    stage.difficulty === '入门' ? 'text-green-500' :
                    stage.difficulty === '中等' ? 'text-blue-500' :
                    stage.difficulty === '困难' ? 'text-orange-500' :
                    stage.difficulty === '极难' ? 'text-red-500' :
                    'text-purple-500'
                  }`}>{stage.difficulty}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">敌人:</span>
                  <span>{stage.enemies}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">解锁条件:</span>
                  <span className="text-xs text-muted-foreground">{stage.unlock}</span>
                </div>
                <div className="pt-2 mt-2 border-t">
                  <span className="text-xs text-amber-500">
                    💡 {stage.recommendation}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="max-w-4xl mx-auto mt-12 bg-amber-500/5 rounded-xl border border-amber-500/20 p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-amber-500" />
          技巧提示
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2 text-muted-foreground">
            <p className="flex items-start gap-2">
              <span className="text-amber-500">•</span>
              <span>连击数越高，得分倍率越高。保持连击是关键</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-amber-500">•</span>
              <span>收集蓝色球体获得能力加成，优先选择适合武器的能力</span>
            </p>
          </div>
          <div className="space-y-2 text-muted-foreground">
            <p className="flex items-start gap-2">
              <span className="text-amber-500">•</span>
              <span>保持移动，避免被包围。利用地形控制敌人数量</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-amber-500">•</span>
              <span>优先击杀高价值目标，快速积累分数</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
