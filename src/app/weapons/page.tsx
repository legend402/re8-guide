"use client"

import weapons from "@/content/weapons.json"
import { Sword, Crosshair, Zap, Timer, Package, Target } from "lucide-react"
import { useHighlightOnLoad } from "@/hooks/use-highlight"
import { weaponTypeColors, weaponTypeNames } from "@/data/weapons"
import Image from "next/image"

const weaponTypeIcons: Record<string, React.ReactNode> = {
  handgun: <Target className="h-5 w-5" />,
  shotgun: <Crosshair className="h-5 w-5" />,
  rifle: <Target className="h-5 w-5" />,
  magnum: <Zap className="h-5 w-5" />,
  special: <Package className="h-5 w-5" />,
  melee: <Sword className="h-5 w-5" />,
}

// 武器图片文件名映射
const weaponImageMap: Record<string, string> = {
  "lemi": "lemi.png",
  "m1911": "m1911.png",
  "v61": "v61.png",
  "usm-ai": "usm-ai.png",
  "dragoon": "dragoon.png",
  "m1897": "m1897.png",
  "w870-tac": "w870-tac.png",
  "syg-12": "syg-12.png",
  "f2-rifle": "f2-rifle.png",
  "wcx": "wcx.png",
  "wolfsbane": "wolfsbane.png",
  "stake": "stake.png",
  "gm79": "gm79.png",
  "rocket-pistol": "rocket-pistol.png",
  "handcannon": "handcannon.png",
  "knife": "knife.png",
}

export default function WeaponsPage() {
  useHighlightOnLoad()

  const handguns = weapons.filter(w => w.type === "handgun")
  const shotguns = weapons.filter(w => w.type === "shotgun")
  const rifles = weapons.filter(w => w.type === "rifle")
  const magnums = weapons.filter(w => w.type === "magnum")
  const special = weapons.filter(w => w.type === "special")
  const melee = weapons.filter(w => w.type === "melee")

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with icon */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-amber-500/10">
            <Sword className="h-8 w-8 text-amber-500" />
          </div>
          <h1 className="text-4xl font-bold">武器</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          完整武器库，包含获取位置、升级数据和战斗建议
        </p>
      </div>

      {/* Stats Overview */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={Target} label="手枪" value={handguns.length} color="blue" />
          <StatCard icon={Crosshair} label="霰弹枪" value={shotguns.length} color="red" />
          <StatCard icon={Zap} label="马格南" value={magnums.length} color="purple" />
          <StatCard icon={Package} label="特殊武器" value={special.length + melee.length} color="orange" />
        </div>
      </div>

      <div className="space-y-12">
        <WeaponSection title="手枪" type="handgun" weapons={handguns} />
        <WeaponSection title="霰弹枪" type="shotgun" weapons={shotguns} />
        <WeaponSection title="步枪" type="rifle" weapons={rifles} />
        <WeaponSection title="马格南" type="magnum" weapons={magnums} />
        <WeaponSection title="特殊武器" type="special" weapons={special} />
        {melee.length > 0 && <WeaponSection title="近战" type="melee" weapons={melee} />}
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: number; color: string }) {
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-500/10 text-blue-500",
    red: "bg-red-500/10 text-red-500",
    purple: "bg-purple-500/10 text-purple-500",
    orange: "bg-orange-500/10 text-orange-500",
  }

  return (
    <div className="bg-card rounded-xl border border-border p-4 text-center hover:border-amber-500/30 transition-all">
      <Icon className={`h-6 w-6 mx-auto mb-2 ${colorClasses[color]?.split(' ')[1] || 'text-amber-500'}`} />
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

function WeaponSection({ title, type, weapons }: { title: string; type: string; weapons: typeof import("@/content/weapons.json") }) {
  if (weapons.length === 0) return null

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <span className={`p-2 rounded-lg ${weaponTypeColors[type]?.split(' ')[0] || 'bg-amber-500/10'}`}>
          {weaponTypeIcons[type]}
        </span>
        {title}
        <span className="text-sm font-normal text-muted-foreground">({weapons.length})</span>
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {weapons.map((weapon) => (
          <div
            key={weapon.id}
            id={weapon.id}
            className="group bg-card rounded-xl border border-border overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 hover:-translate-y-1 scroll-mt-24"
          >
            {/* Weapon Image */}
            <div className="relative h-40 bg-black from-muted/50 to-muted flex items-center justify-center overflow-hidden">
              {weaponImageMap[weapon.id] ? (
                <Image
                  src={`/images/weapons/${weaponImageMap[weapon.id]}`}
                  alt={weapon.name}
                  width={200}
                  height={120}
                  className="object-contain max-h-32 w-auto drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="text-6xl opacity-20">🔫</div>
              )}
            </div>

            {/* Header */}
            <div className={`p-4 border-b ${weaponTypeColors[type] || 'bg-amber-500/10 text-amber-500 border-amber-500/30'}`}>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{weapon.name}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium bg-background/80 ${weaponTypeColors[type]?.split(' ')[1] || 'text-amber-500'}`}>
                  {weapon.ammoCapacity > 0 ? `${weapon.ammoCapacity}发` : '无限'}
                </span>
              </div>
              <p className="text-xs opacity-80 mt-1">{weaponTypeNames[type]}</p>
            </div>
            
            {/* Body */}
            <div className="p-4">
              <p className="text-muted-foreground text-sm mb-4">{weapon.description}</p>
              
              {/* Location */}
              <div className="mb-4 p-2 rounded-lg bg-muted/50 text-sm">
                <span className="text-muted-foreground">获取: </span>
                <span className="font-medium">{weapon.location}</span>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3">
                <StatBox 
                  icon={Target} 
                  label="威力" 
                  value={weapon.power} 
                  barColor="bg-red-500"
                  maxValue={3000}
                />
                <StatBox 
                  icon={Zap} 
                  label="射速" 
                  value={weapon.rateOfFire}
                  suffix="/s"
                  barColor="bg-yellow-500"
                  maxValue={2}
                />
                <StatBox 
                  icon={Timer} 
                  label="装填" 
                  value={weapon.reloadSpeed}
                  suffix="s"
                  barColor="bg-blue-500"
                  maxValue={4}
                  reverse
                />
              </div>

              {/* Attachments */}
              {weapon.attachments && weapon.attachments.length > 0 && (
                <div className="mt-4 pt-3 border-t">
                  <div className="text-xs text-muted-foreground mb-2">配件</div>
                  <div className="flex flex-wrap gap-1">
                    {weapon.attachments.map((att, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-xs bg-amber-500/10 text-amber-500">
                        {att}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function StatBox({ 
  icon: Icon, 
  label, 
  value, 
  suffix = '',
  barColor,
  maxValue,
  reverse = false
}: { 
  icon: React.ElementType
  label: string
  value: number
  suffix?: string
  barColor: string
  maxValue: number
  reverse?: boolean
}) {
  const percentage = reverse 
    ? Math.max(0, 100 - (value / maxValue) * 100)
    : Math.min(100, (value / maxValue) * 100)

  return (
    <div className="text-center p-2 rounded-lg bg-muted/30">
      <Icon className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
      <div className="text-lg font-bold">{value}{suffix}</div>
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="h-1 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full ${barColor} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
