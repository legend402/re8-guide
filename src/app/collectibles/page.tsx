import { Metadata } from "next"
import { CheckCircle, Scroll, Gem, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "收集品 | RE8 Village Guide",
  description: "生化危机8村庄全收集品追踪，包含辟邪山羊、文件、宝藏位置",
}

const collectibles = {
  goats: {
    title: "辟邪山羊",
    total: 20,
    description: "村庄中隐藏的辟邪山羊雕像，收集可获得奖励",
    items: [
      { id: 1, name: "山羊 #1", location: "村庄 - 教堂墓地", found: false },
      { id: 2, name: "山羊 #2", location: "村庄 - 路易莎家旁", found: false },
      { id: 3, name: "山羊 #3", location: "城堡 - 主厅二楼", found: false },
      { id: 4, name: "山羊 #4", location: "城堡 - 酒窖", found: false },
    ],
  },
  files: {
    title: "文件资料",
    total: 50,
    description: "散落在游戏中的文档和笔记，揭示故事背景",
    items: [
      { id: 1, name: "伊森的字条", location: "伊森家中", found: false },
      { id: 2, name: "村民日记", location: "村庄", found: false },
      { id: 3, name: "迪米特雷斯库家谱", location: "城堡", found: false },
    ],
  },
  treasures: {
    title: "宝藏",
    total: 15,
    description: "高价值物品，可以出售给公爵换取 Lei",
    items: [
      { id: 1, name: "迪米特雷斯库的项链", location: "击败迪米特雷斯库夫人", value: 50000, found: false },
      { id: 2, name: "水晶 torso", location: "击败迪米特雷斯库女儿", value: 25000, found: false },
      { id: 3, name: "贝伦加里奥的圣杯", location: "城堡宝藏", value: 18000, found: false },
    ],
  },
}

export default function CollectiblesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">收集品</h1>
        <p className="text-xl text-muted-foreground">
          追踪你的收集进度，完成全收集成就
        </p>
      </div>

      <div className="space-y-8">
        {/* Goats Section */}
        <section className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-amber-500" />
              <div>
                <h2 className="text-2xl font-bold">{collectibles.goats.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {collectibles.goats.description}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-amber-500">0</span>
              <span className="text-muted-foreground"> / {collectibles.goats.total}</span>
            </div>
          </div>
          <div className="space-y-2">
            {collectibles.goats.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <p className="text-sm text-muted-foreground">{item.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Files Section */}
        <section className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Scroll className="h-8 w-8 text-blue-500" />
              <div>
                <h2 className="text-2xl font-bold">{collectibles.files.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {collectibles.files.description}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-blue-500">0</span>
              <span className="text-muted-foreground"> / {collectibles.files.total}</span>
            </div>
          </div>
          <div className="space-y-2">
            {collectibles.files.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <p className="text-sm text-muted-foreground">{item.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Treasures Section */}
        <section className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Gem className="h-8 w-8 text-green-500" />
              <div>
                <h2 className="text-2xl font-bold">{collectibles.treasures.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {collectibles.treasures.description}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-green-500">0</span>
              <span className="text-muted-foreground"> / {collectibles.treasures.total}</span>
            </div>
          </div>
          <div className="space-y-2">
            {collectibles.treasures.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <p className="text-sm text-muted-foreground">{item.location}</p>
                  </div>
                </div>
                {item.value && (
                  <span className="text-sm text-green-500 font-medium">
                    {item.value.toLocaleString()} Lei
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
