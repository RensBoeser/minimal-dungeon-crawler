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
] as const

export type EnemyDropId = (typeof drops)[number]["id"]
