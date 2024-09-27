import type { EnemyDropId } from "./drops"

export const enemyIds = ["skeleton:straggler", "zombie:walker", "skeleton:warrior"]
export type EnemyId = (typeof enemyIds)[number]

export interface LootTableEntry {
  /** Name of the item */
  item: EnemyDropId
  /** Probability of an item dropping */
  probability: number
  /** Amount of the item that can drop */
  amount: number
}

export interface Enemy {
  id: EnemyId
  sortOrder: number
  icon: string
  health: number
  /** Damage the enemy negates */
  armor: number
  /** Amount of XP the enemy gives */
  xp: number
  /** Chance of encountering the enemy */
  encounterRate: number
  /** Block chance of enemy*/
  blockChance: number
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
  sortOrder: number
  /** Enemies that can be found in the dungeon */
  enemies: Array<Enemy>
}

export interface RunDungeonResult {
  run: DungeonRun
  user: DatabaseUser
}

export interface DungeonRun {
  dateTime: string
  dungeonId: DungeonId
  enemiesDefeated: Array<EnemyId>
  enemyDrops: Array<EnemyDropId>
  xpGained: number
  currentLevel: UserLevel
  levelledUpTo?: UserLevel
}

export const cryptOfTheForgotten: Dungeon = {
  id: "cryptOfTheForgotten",
  name: "Crypt of the Forgotten",
  description: "A dark and damp crypt filled with the undead.",
  sortOrder: 0,
  enemies: [
    {
      id: "skeleton:straggler",
      sortOrder: 0,
      icon: "characters/skeleton-straggler.png",
      health: 10,
      armor: 0,
      xp: 1,
      encounterRate: 0.5,
      blockChance: 0,
      lootTable: [{ item: "bone", probability: 0.4, amount: 2 }],
    },
    {
      id: "zombie:walker",
      sortOrder: 1,
      icon: "characters/zombie-walker.png",
      health: 15,
      armor: 0,
      xp: 3,
      encounterRate: 0.3,
      blockChance: 0,
      lootTable: [
        { item: "rottenMeat", probability: 0.3, amount: 2 },
        { item: "potteryShard", probability: 0.05, amount: 1 },
      ],
    },
    {
      id: "skeleton:warrior",
      sortOrder: 2,
      icon: "characters/skeleton-warrior.png",
      health: 30,
      armor: 1,
      xp: 8,
      encounterRate: 0.1,
      blockChance: 0.05,
      lootTable: [
        { item: "bone", probability: 0.9, amount: 2 },
        { item: "potteryShard", probability: 0.3, amount: 1 },
        { item: "oldCoin", probability: 0.05, amount: 1 },
      ],
    },
  ],
}

export const dungeons: Array<Dungeon> = [cryptOfTheForgotten]
