import { Metadata } from "next"
import enemies from "@/content/enemies.json"

export const metadata: Metadata = {
  title: "敌人 | RE8 Village Guide",
  description: "生化危机8村庄全敌人图鉴，包含Boss攻略和弱点分析",
}

export default function EnemiesPage() {
  const bosses = enemies.filter(e => e.category === "Boss" || e.category === "最终Boss")
  const normalEnemies = enemies.filter(e => e.category === "普通敌人")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">敌人</h1>
        <p className="text-xl text-muted-foreground">
          敌人和Boss攻略，弱点分析和战斗建议
        </p>
      </div>

      {/* Boss Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="w-1 h-8 bg-red-500 rounded-full" />
          Boss战
        </h2>
        <div className="space-y-6">
          {bosses.map((enemy) => (
            <div
              key={enemy.id}
              className="bg-card rounded-xl border border-border p-6 hover:border-red-500/30 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-500/10 text-red-500">
                      {enemy.category}
                    </span>
                    <span className="text-sm text-muted-foreground">{enemy.location}</span>
                  </div>
                  <h3 className="text-2xl font-bold">{enemy.name}</h3>
                </div>
                {enemy.rewards && (
                  <div className="text-sm text-muted-foreground">
                    掉落: {enemy.rewards.join(", ")}
                  </div>
                )}
              </div>

              <p className="text-muted-foreground mb-4">{enemy.description}</p>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2 text-red-500">弱点</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {enemy.weaknesses.map((w, i) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-amber-500">攻略建议</h4>
                  <p className="text-sm text-muted-foreground">{enemy.strategy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Normal Enemies */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="w-1 h-8 bg-amber-500 rounded-full" />
          普通敌人
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {normalEnemies.map((enemy) => (
            <div
              key={enemy.id}
              className="bg-card rounded-xl border border-border p-6 hover:border-amber-500/30 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground">
                  {enemy.category}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{enemy.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{enemy.location}</p>
              <p className="text-sm text-muted-foreground mb-4">{enemy.description}</p>
              <div>
                <span className="text-xs text-muted-foreground">弱点: </span>
                <span className="text-sm">{enemy.weaknesses.join(", ")}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
