// Unified game data for search
// This file generates searchable items dynamically from content data

import weapons from "@/content/weapons.json"
import enemies from "@/content/enemies.json"
import characters from "@/content/characters.json"
import maps from "@/content/maps.json"
import items from "@/content/items.json"
import collectibles from "@/content/collectibles.json"
import walkthrough from "@/content/walkthrough.json"
import mercenaries from "@/content/mercenaries.json"

export interface SearchableItem {
  id: string
  title: string
  description: string
  category: string
  href: string
  icon: string
  keywords?: string[]
  extra?: Record<string, any>
}

// Helper function to generate keywords based on item data
function generateWeaponKeywords(weapon: typeof weapons[0]): string[] {
  const keywords: string[] = []
  
  // Add type-based keywords
  const typeMap: Record<string, string[]> = {
    handgun: ["手枪", "handgun", "副武器"],
    shotgun: ["霰弹枪", "喷子", "shotgun"],
    rifle: ["步枪", "rifle", "突击步枪", "狙击枪"],
    magnum: ["马格南", "magnum", "手炮", "高威力"],
    special: ["特殊武器", "榴弹", "火箭"],
    melee: ["近战", "小刀", "刀"]
  }
  
  if (typeMap[weapon.type]) {
    keywords.push(...typeMap[weapon.type])
  }
  
  // Add location-based keywords
  if (weapon.location.includes("佣兵")) keywords.push("佣兵模式", "解锁")
  if (weapon.location.includes("克里斯")) keywords.push("克里斯", "专属")
  if (weapon.location.includes("工厂")) keywords.push("工厂")
  if (weapon.location.includes("城堡")) keywords.push("城堡")
  if (weapon.location.includes("水库")) keywords.push("水库")
  if (weapon.location.includes("初始")) keywords.push("初始武器", "开局")
  if (weapon.location.includes("通关")) keywords.push("通关奖励", "奖励武器")
  if (weapon.location.includes("无限")) keywords.push("无限弹药")
  
  return keywords
}

function generateEnemyKeywords(enemy: typeof enemies[0]): string[] {
  const keywords: string[] = []
  
  // Add category-based keywords
  if (enemy.category === "Boss") keywords.push("Boss", "首领")
  if (enemy.category === "最终Boss") keywords.push("最终Boss", "最终首领", "最后")
  if (enemy.category === "小Boss") keywords.push("小Boss", "精英")
  
  // Add location-based keywords
  if (enemy.location.includes("村庄")) keywords.push("村庄")
  if (enemy.location.includes("城堡")) keywords.push("城堡")
  if (enemy.location.includes("工厂")) keywords.push("工厂")
  if (enemy.location.includes("水库")) keywords.push("水库")
  if (enemy.location.includes("要塞")) keywords.push("要塞")
  if (enemy.location.includes("贝内文托")) keywords.push("贝内文托", "恐怖")
  
  // Add weakness-based keywords
  keywords.push(...enemy.weaknesses)
  
  return keywords
}

function generateCharacterKeywords(character: typeof characters[0]): string[] {
  const keywords: string[] = []
  
  // Add role-based keywords
  if (character.role === "主角") keywords.push("主角", " protagonist", "好人")
  if (character.role === "反派" || character.role === "主要反派") {
    keywords.push("反派", "敌人", "Boss", "boss")
  }
  if (character.role === "配角") keywords.push("配角", "supporting")
  if (character.role === "商人") keywords.push("商人", "商店", "买东西", "升级")
  
  // Add English name
  if (character.nameEn) {
    keywords.push(character.nameEn)
  }
  
  return keywords
}

function generateMapKeywords(map: typeof maps[0]): string[] {
  const keywords: string[] = []
  
  // Add English name
  keywords.push(map.nameEn)
  
  // Add area-based keywords
  keywords.push(...map.areas)
  
  // Add enemy-based keywords
  keywords.push(...map.enemies)
  
  // Add special keywords
  if (map.id === "village") keywords.push("枢纽", "中心", "开始", "起点")
  if (map.id === "castle") keywords.push("吸血鬼", "夫人", "哥特")
  if (map.id === "beneviento") keywords.push("人偶", "恐怖", "最吓人", "baby")
  if (map.id === "reservoir") keywords.push("水", "莫罗", "鱼人", "乘船")
  if (map.id === "factory") keywords.push("机械", "海森伯格", "工业", "Soldat")
  if (map.id === "stronghold") keywords.push("军事", "狼人", "密集")
  if (map.id === "ceremony") keywords.push("最终", "Boss", "地下", "仪式")
  
  return keywords
}

// Generate searchable items from content data
export const searchableItems: SearchableItem[] = [
  // ==================== 角色 (Characters) ====================
  ...characters.map((character): SearchableItem => ({
    id: character.id,
    title: character.name,
    description: character.description,
    category: "角色",
    href: `/characters#${character.id}`,
    icon: "Users",
    keywords: generateCharacterKeywords(character)
  })),

  // ==================== 武器 (Weapons) ====================
  ...weapons.map((weapon): SearchableItem => ({
    id: weapon.id,
    title: weapon.name,
    description: weapon.description,
    category: "武器",
    href: `/weapons#${weapon.id}`,
    icon: "Sword",
    keywords: generateWeaponKeywords(weapon),
    extra: {
      type: weapon.type,
      power: weapon.power,
      location: weapon.location
    }
  })),

  // ==================== 敌人 (Enemies) ====================
  ...enemies.map((enemy): SearchableItem => ({
    id: enemy.id,
    title: enemy.name,
    description: enemy.description,
    category: "敌人",
    href: `/enemies#${enemy.id}`,
    icon: "Skull",
    keywords: generateEnemyKeywords(enemy),
    extra: {
      category: enemy.category,
      location: enemy.location,
      weaknesses: enemy.weaknesses
    }
  })),

  // ==================== 地图 (Maps) ====================
  ...maps.map((map): SearchableItem => ({
    id: map.id,
    title: map.name,
    description: map.description,
    category: "地图",
    href: `/maps#${map.id}`,
    icon: "MapPin",
    keywords: generateMapKeywords(map),
    extra: {
      areas: map.areas,
      enemies: map.enemies,
      keyItems: map.keyItems
    }
  })),

  // ==================== 物品分类 (Item Categories) ====================
  {
    id: "key-items",
    title: "关键道具",
    description: "钥匙、工具等重要道具",
    category: "物品",
    href: "/items",
    icon: "Package",
    keywords: ["钥匙", "道具", "工具", "关键", "重要", ...items.keyItems.map(i => i.name)]
  },
  {
    id: "crafting",
    title: "合成材料",
    description: "草药、火药等合成材料",
    category: "物品",
    href: "/items",
    icon: "Package",
    keywords: ["材料", "合成", "草药", "火药", "制作", ...items.materials.map(m => m.name)]
  },
  {
    id: "recipes",
    title: "合成配方",
    description: "弹药和药品制作配方",
    category: "物品",
    href: "/items",
    icon: "Package",
    keywords: ["配方", "合成", "弹药", "药品", "制作", ...items.craftingRecipes.map(r => r.name)]
  },
  {
    id: "cooking",
    title: "公爵厨房",
    description: "食材与料理系统",
    category: "物品",
    href: "/items",
    icon: "Utensils",
    keywords: ["食材", "料理", "烹饪", "公爵", "厨房", ...items.dishes.map(d => d.name), ...items.ingredients.map(i => i.name)]
  },

  // ==================== 收集品 (Collectibles) ====================
  {
    id: "goats",
    title: "辟邪山羊",
    description: `${collectibles.goats.length}个辟邪山羊收集`,
    category: "收集品",
    href: "/collectibles",
    icon: "Shield",
    keywords: ["山羊", "收集", "辟邪", "20个", "奖杯", "Cynic", "Heretic"]
  },
  {
    id: "files",
    title: "文件资料",
    description: `${collectibles.files.length}个文件资料收集`,
    category: "收集品",
    href: "/collectibles",
    icon: "Scroll",
    keywords: ["文件", "收集", "文档", "剧情", "47个", "笔记", "日记", "记录"]
  },
  {
    id: "treasures",
    title: "宝藏",
    description: `${collectibles.treasures.length}个高价值物品`,
    category: "收集品",
    href: "/collectibles",
    icon: "Gem",
    keywords: ["宝藏", "价值", "出售", "Lei", "钱", "水晶", "项链", "戒指", "皇冠"]
  },

  // ==================== 攻略 (Walkthrough) ====================
  ...walkthrough.chapters.map((chapter): SearchableItem => ({
    id: `chapter-${chapter.id}`,
    title: chapter.title,
    description: chapter.description,
    category: "攻略",
    href: "/walkthrough",
    icon: "BookOpen",
    keywords: [
      "攻略", "流程", "主线", "通关", "步骤",
      chapter.subtitle,
      chapter.location,
      ...(chapter.boss ? [chapter.boss, "Boss"] : []),
      ...chapter.keyItems
    ]
  })),
  {
    id: "flow",
    title: "流程图",
    description: "可拖拽章节流程图",
    category: "攻略",
    href: "/flow",
    icon: "GitGraph",
    keywords: ["流程图", "章节", "地图", "可视化", "拖拽"]
  },

  // ==================== 佣兵模式 (Mercenaries) ====================
  ...mercenaries.stages.map((stage): SearchableItem => ({
    id: `mercenary-stage-${stage.id}`,
    title: `${stage.name} - 佣兵模式`,
    description: `难度: ${stage.difficulty} | ${stage.recommendation}`,
    category: "佣兵模式",
    href: "/mercenaries",
    icon: "Trophy",
    keywords: [
      "佣兵", "挑战", "高分", "关卡",
      stage.difficulty,
      stage.enemies,
      stage.unlock
    ]
  })),
  ...mercenaries.abilities.map((ability): SearchableItem => ({
    id: `ability-${ability.name}`,
    title: ability.name,
    description: ability.effect,
    category: "佣兵模式",
    href: "/mercenaries",
    icon: ability.icon,
    keywords: ["佣兵", "能力", "能力球", "加成", ability.effect]
  })),
  {
    id: "mercenaries-overview",
    title: "佣兵模式",
    description: "挑战高分解锁奖励",
    category: "游戏模式",
    href: "/mercenaries",
    icon: "Trophy",
    keywords: ["佣兵", "挑战", "高分", "解锁", "SSS", "评价", "评分"]
  }
]

// Export for use in search
export default searchableItems

// Export statistics
export const searchStats = {
  total: searchableItems.length,
  byCategory: searchableItems.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)
}
