import type { EnemyDropId } from "./drops"

export const enemyIds = ["skeleton:straggler", "zombie:walker", "skeleton:warrior"]
export type EnemyId = typeof enemyIds[number]

export interface LootTableEntry {
  /** Name of the item */
  item: EnemyDropId
  /** Probability of the item dropping */
  probability: number
}

export interface Enemy {
  id: EnemyId
  name: string
  description: string
  sortOrder: number
  icon: string
  health: number
  /** Damage the enemy negates */
  armor: number
  /** Amount of XP the enemy gives */
  xp: number
  /** Chance of encountering the enemy */
  encounterRate: number
  /** Loot table of the enemy */
  lootTable: Array<LootTableEntry>
}

export type DungeonId = "cryptOfTheForgotten"

export interface Dungeon {
  id: DungeonId
  /** Name of the dungeon */
  name: string
  /** Description of the dungeon */
  description: string
  sortOrder: number,
  /** Enemies that can be found in the dungeon */
  enemies: Array<Enemy>
}

export const cryptOfTheForgotten: Dungeon = {
  id: "cryptOfTheForgotten",
  name: "Crypt of the Forgotten",
  description: "A dark and damp crypt filled with the undead.",
  sortOrder: 0,
  enemies: [
    {
      id: "skeleton:straggler",
      name: "Skeleton straggler",
      description: "A lone skeleton wandering the crypt.",
      sortOrder: 0,
      icon: "skeleton-straggler.png",
      health: 10,
      armor: 0,
      xp: 1,
      encounterRate: 0.5,
      lootTable: [
        { item: "bone", probability: 0.5 },
      ]
    },
    {
      id: "zombie:walker",
      name: "Zombie walker",
      description: "A slow-moving zombie.",
      sortOrder: 1,
      icon: "zombie-walker.png",
      health: 15,
      armor: 0,
      xp: 3,
      encounterRate: 0.3,
      lootTable: [
        { item: "rottenMeat", probability: 0.5 },
      ]
    },
    {
      id: "skeleton:warrior",
      name: "Skeleton warrior",
      description: "A well-armed skeleton.",
      sortOrder: 2,
      icon: "skeleton-warrior.png",
      health: 30,
      armor: 1,
      xp: 8,
      encounterRate: 0.1,
      lootTable: [
        { item: "bone", probability: 1 },
        { item: "rottenMeat", probability: 0.2 },
      ]
    }
  ]
}

export const dungeons: Array<Dungeon> = [
  cryptOfTheForgotten,
]