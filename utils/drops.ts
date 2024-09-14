export const drops = [
  {
    id: "bone",
    sortOrder: 0,
    icon: "loot/bone.webp",
    goldValue: 1,
  },
  {
    id: "rottenMeat",
    sortOrder: 1,
    icon: "loot/rotten-flesh.webp",
    goldValue: 2,
  },
  {
    id: "oldCoin",
    sortOrder: 2,
    icon: "loot/old-coin.webp",
    goldValue: 10,
  }
] as const

export type EnemyDropId = (typeof drops)[number]["id"]
