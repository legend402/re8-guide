import * as React from "react"
import { Metadata } from "next"
import { BookOpen, MapPin, Sword, Key, ChevronRight, AlertTriangle, CheckCircle } from "lucide-react"
import walkthrough from "@/content/walkthrough.json"

const { chapters } = walkthrough

export const metadata: Metadata = {
  title: "攻略 | RE8 Village Guide",
  description: "生化危机8村庄完整流程攻略，包含主线任务和关键收集品位置",
}

export default function WalkthroughPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-blue-500/10">
            <BookOpen className="h-8 w-8 text-blue-500" />
          </div>
          <h1 className="text-4xl font-bold">攻略</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          生化危机8村庄完整流程攻略
        </p>
      </div>

      {/* Progress Overview */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">章节进度</h2>
          <div className="flex items-center gap-2 flex-wrap">
            {chapters.map((chapter, index) => (
              <React.Fragment key={chapter.id}>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center text-xs font-bold">
                    {chapter.id}
                  </span>
                  <span className="text-sm hidden sm:inline">{chapter.title}</span>
                </div>
                {index < chapters.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Chapters */}
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
                <div className="bg-card rounded-xl border border-border overflow-hidden hover:border-amber-500/30 transition-all">
                  {/* Header */}
                  <div className="p-6 border-b">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {chapter.boss && (
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-500/10 text-red-500 flex items-center gap-1">
                          <Sword className="h-3 w-3" />
                          Boss: {chapter.boss}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-500/10 text-blue-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {chapter.location}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold">{chapter.title}</h2>
                      <span className="text-sm text-muted-foreground">{chapter.subtitle}</span>
                    </div>
                    <p className="text-muted-foreground">{chapter.description}</p>
                  </div>

                  {/* Steps */}
                  <div className="p-6 border-b">
                    <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      主要步骤
                    </h3>
                    <div className="space-y-2">
                      {chapter.steps.map((step, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                            {i + 1}
                          </span>
                          <span className="text-sm">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Items & Tips */}
                  <div className="grid md:grid-cols-2 gap-4 p-6">
                    <div>
                      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <Key className="h-4 w-4 text-amber-500" />
                        关键物品
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {chapter.keyItems.map((item, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 text-sm"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        攻略提示
                      </h3>
                      <p className="text-sm text-muted-foreground">{chapter.tips}</p>
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
