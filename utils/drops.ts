export const drops = [
  {
    id: "bone",
    name: "Bone",
    description: "A bone from a skeleton.",
    sortOrder: 0,
    icon: "bone.webp",
    goldValue: 1
  },
  {
    id: "rottenMeat",
    name: "Rotten Meat",
    description: "A piece of rotten meat.",
    sortOrder: 1,
    icon: "rotten-flesh.webp",
    goldValue: 2
  },
] as const

export type EnemyDropId = typeof drops[number]["id"]