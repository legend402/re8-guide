import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, MapPin, Sword, Users, Trophy, Scroll, Home } from "lucide-react"

export const metadata: Metadata = {
  title: "RE8 Village Guide | 生化危机8村庄攻略",
  description: "生化危机8村庄(Resident Evil Village)完整攻略指南，包含角色、武器、敌人、地图、收集品等详细资料",
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Resident Evil 8
            </span>
            <br />
            <span className="text-foreground">Village Guide</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            最全面的《生化危机8：村庄》攻略与资料库
          </p>
          <p className="text-muted-foreground mb-8">
            角色档案 · 武器数据 · 敌人图鉴 · 地图攻略 · 收集追踪
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/walkthrough"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-amber-500 text-white font-semibold hover:bg-amber-600 transition-colors"
            >
              开始攻略
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/characters"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-amber-500 text-amber-500 font-semibold hover:bg-amber-500/10 transition-colors"
            >
              查看角色
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">快速导航</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <QuickLink href="/characters" icon={Users} label="角色" />
            <QuickLink href="/weapons" icon={Sword} label="武器" />
            <QuickLink href="/enemies" icon={Trophy} label="敌人" />
            <QuickLink href="/maps" icon={MapPin} label="地图" />
            <QuickLink href="/collectibles" icon={Scroll} label="收集品" />
            <QuickLink href="/flow" icon={ChevronRight} label="流程图" />
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">特色内容</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              href="/characters"
              title="迪米特雷斯库夫人"
              description="身高2.9米的吸血鬼夫人，四大贵族之一，游戏的标志性角色"
              tag="热门角色"
            />
            <FeatureCard
              href="/weapons"
              title="武器图鉴"
              description="完整的武器数据和升级信息，助你在村庄中生存"
              tag="攻略"
            />
            <FeatureCard
              href="/maps"
              title="地图指南"
              description="村庄、城堡、水库、工厂详细地图和收集品位置"
              tag="探索"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function QuickLink({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border hover:border-amber-500/50 hover:bg-accent transition-all group"
    >
      <Icon className="h-8 w-8 text-amber-500 group-hover:scale-110 transition-transform" />
      <span className="font-medium">{label}</span>
    </Link>
  )
}

function FeatureCard({ href, title, description, tag }: { href: string; title: string; description: string; tag: string }) {
  return (
    <Link
      href={href}
      className="block p-6 rounded-xl bg-card border border-border hover:border-amber-500/50 transition-all group"
    >
      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 mb-4">
        {tag}
      </span>
      <h3 className="text-xl font-semibold mb-2 group-hover:text-amber-500 transition-colors">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Link>
  )
}
