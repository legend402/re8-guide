import { Metadata } from "next"
import weapons from "@/content/weapons.json"

export const metadata: Metadata = {
  title: "武器 | RE8 Village Guide",
  description: "生化危机8村庄全武器数据，包含威力、射速、装填速度等详细属性",
}

export default function WeaponsPage() {
  const handguns = weapons.filter(w => w.type === "handgun")
  const shotguns = weapons.filter(w => w.type === "shotgun")
  const rifles = weapons.filter(w => w.type === "rifle")
  const magnums = weapons.filter(w => w.type === "magnum")
  const special = weapons.filter(w => w.type === "special")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">武器</h1>
        <p className="text-xl text-muted-foreground">
          完整武器库，包含获取位置、升级数据和战斗建议
        </p>
      </div>

      <div className="space-y-12">
        <WeaponSection title="手枪" weapons={handguns} />
        <WeaponSection title="霰弹枪" weapons={shotguns} />
        <WeaponSection title="步枪" weapons={rifles} />
        <WeaponSection title="马格南" weapons={magnums} />
        <WeaponSection title="特殊武器" weapons={special} />
      </div>
    </div>
  )
}

function WeaponSection({ title, weapons }: { title: string; weapons: typeof import("@/content/weapons.json") }) {
  if (weapons.length === 0) return null

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="w-1 h-8 bg-amber-500 rounded-full" />
        {title}
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        {weapons.map((weapon) => (
          <div
            key={weapon.id}
            className="bg-card rounded-xl border border-border p-6 hover:border-amber-500/30 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{weapon.name}</h3>
                <p className="text-sm text-muted-foreground">{weapon.location}</p>
              </div>
              <span className="px-2 py-1 rounded text-xs font-medium bg-amber-500/10 text-amber-500">
                {weapon.ammoCapacity}发
              </span>
            </div>
            <p className="text-muted-foreground mb-4">{weapon.description}</p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground block">威力</span>
                <span className="font-semibold">{weapon.power}</span>
              </div>
              <div>
                <span className="text-muted-foreground block">射速</span>
                <span className="font-semibold">{weapon.rateOfFire}/s</span>
              </div>
              <div>
                <span className="text-muted-foreground block">装填</span>
                <span className="font-semibold">{weapon.reloadSpeed}s</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
