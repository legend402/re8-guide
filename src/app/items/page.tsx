import { Metadata } from "next"
import { 
  Package, 
  FlaskConical, 
  Key, 
  Gem, 
  Heart, 
  Crosshair, 
  Bomb, 
  Flame,
  Sparkles,
  Utensils,
  Fish,
  Beef,
  Bird,
  ChefHat
} from "lucide-react"
import items from "@/content/items.json"

const { craftingRecipes, keyItems, materials, treasures, ingredients, dishes } = items

export const metadata: Metadata = {
  title: "物品 | RE8 Village Guide",
  description: "生化危机8村庄物品、道具、宝藏和合成配方",
}

export default function ItemsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-emerald-500/10">
            <Package className="h-8 w-8 text-emerald-500" />
          </div>
          <h1 className="text-4xl font-bold">物品</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          道具、材料、宝藏和合成配方
        </p>
      </div>

      <div className="space-y-12 max-w-6xl mx-auto">
        {/* Crafting Recipes */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <FlaskConical className="h-6 w-6 text-amber-500" />
            合成配方
            <span className="text-sm font-normal text-muted-foreground">({craftingRecipes.length}种)</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {craftingRecipes.map((recipe, index) => (
              <div
                key={index}
                className="group bg-card rounded-xl border border-border p-4 hover:border-amber-500/30 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10">
                    <FlaskConical className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{recipe.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{recipe.effect}</p>
                    <div className="mt-2 p-2 rounded bg-muted/50 text-sm">
                      <span className="text-muted-foreground">材料: </span>
                      <span>{recipe.materials}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Items */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Key className="h-6 w-6 text-blue-500" />
            关键道具
            <span className="text-sm font-normal text-muted-foreground">({keyItems.length}种)</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {keyItems.map((item, index) => (
              <div
                key={index}
                className="bg-card rounded-xl border border-border p-4 hover:border-blue-500/30 transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Key className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold">{item.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                <p className="text-xs text-muted-foreground">位置: {item.location}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Materials */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Package className="h-6 w-6 text-green-500" />
            合成材料
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {materials.map((item, index) => (
              <div
                key={index}
                className="bg-card rounded-xl border border-border p-4 hover:border-green-500/30 transition-all"
              >
                <h3 className="font-semibold mb-1">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Treasures */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Gem className="h-6 w-6 text-purple-500" />
            宝藏
            <span className="text-sm font-normal text-muted-foreground">({treasures.length}种)</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {treasures.map((item, index) => (
              <div
                key={index}
                className="bg-card rounded-xl border border-border p-4 hover:border-purple-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Gem className="h-5 w-5 text-purple-500" />
                    <h3 className="font-semibold">{item.name}</h3>
                  </div>
                  <span className="text-sm font-bold text-purple-500">
                    {item.value.toLocaleString()} Lei
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">位置: {item.location}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cooking System */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Utensils className="h-6 w-6 text-orange-500" />
            公爵厨房 - 食材与料理
          </h2>
          
          {/* Ingredients */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-muted-foreground" />
              食材
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ingredients.map((item, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl border border-border p-4 hover:border-orange-500/30 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="h-5 w-5 text-orange-500" />
                    <h4 className="font-semibold">{item.name}</h4>
                    {item.type === 'rare' && (
                      <span className="px-2 py-0.5 rounded text-xs bg-amber-500/10 text-amber-500">稀有</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Dishes */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-muted-foreground" />
              料理
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {dishes.map((dish, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl border border-border p-4 hover:border-orange-500/30 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Utensils className="h-5 w-5 text-orange-500" />
                    <h4 className="font-semibold">{dish.name}</h4>
                  </div>
                  <p className="text-sm text-green-500 mb-1">效果: {dish.effect}</p>
                  <p className="text-xs text-muted-foreground">材料: {dish.ingredients}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
