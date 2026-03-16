import { Metadata } from "next"
import { Package, FlaskConical, Key, Gem } from "lucide-react"

export const metadata: Metadata = {
  title: "物品 | RE8 Village Guide",
  description: "生化危机8村庄物品、道具、宝藏和合成配方",
}

const categories = [
  {
    id: "key",
    name: "关键道具",
    icon: Key,
    items: [
      { name: "断线钳", description: "切断链条和铁丝网", location: "村庄" },
      { name: "钥匙", description: "开启锁住的门", location: "多处" },
      { name: "曲柄", description: "操作机械装置", location: "水库" },
    ],
  },
  {
    id: "crafting",
    name: "合成材料",
    icon: FlaskConical,
    items: [
      { name: "草药", description: "恢复生命值", location: "各处" },
      { name: "化学液体", description: "合成弹药和医疗物品", location: "各处" },
      { name: "火药", description: "合成弹药", location: "各处" },
    ],
  },
  {
    id: "treasure",
    name: "宝藏",
    icon: Gem,
    items: [
      { name: "迪米特雷斯库的项链", description: "价值50000 Lei", location: "击败Boss" },
      { name: "水晶 torso", description: "价值25000 Lei", location: "击败Boss" },
    ],
  },
]

export default function ItemsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">物品</h1>
        <p className="text-xl text-muted-foreground">
          道具、材料、宝藏和合成配方
        </p>
      </div>

      <div className="space-y-12">
        {categories.map((category) => (
          <section key={category.id}>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <category.icon className="h-6 w-6 text-amber-500" />
              {category.name}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items.map((item, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl border border-border p-4 hover:border-amber-500/30 transition-all"
                >
                  <h3 className="font-semibold mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {item.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    位置: {item.location}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Crafting Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Package className="h-6 w-6 text-amber-500" />
            合成配方
          </h2>
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">医疗物品</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">急救喷雾</span>
                    <span className="text-muted-foreground">= 草药 + 化学液体</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">弹药</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-amber-500">手枪弹药</span>
                    <span className="text-muted-foreground">= 2x火药 + 2x生锈废料</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-500">霰弹枪弹药</span>
                    <span className="text-muted-foreground">= 2x火药 + 2x生锈废料 + 化学液体</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
