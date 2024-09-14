export const weaponIds = ["fists", "woodenSword", "stoneSword"] as const
export type WeaponId = (typeof weaponIds)[number]

export interface Weapon {
  id: WeaponId
  sortOrder: number
  icon?: string
  /** Cost of the sword in the shop */
  cost: number
  /** Amount of damage per hit */
  damage: number
  /** Amount of armor penetration */
  armorPenetration: number
  /** Amount of stamina consumed per hit */
  staminaCost: number
  /** Minimum level requirement */
  levelRequirement?: number
  /** Chance of landing a critical hit */
  criticalChance?: number
  /** Multiplication of damage on critical hit */
  criticalMultiplier?: number
}

export const fists: Weapon = {
  id: "fists",
  sortOrder: 0,
  icon: "weapons/fists.webp",
  cost: 0,
  damage: 1,
  armorPenetration: 0,
  staminaCost: 1,
}

export const woodenSword: Weapon = {
  id: "woodenSword",
  sortOrder: 1,
  icon: "weapons/wooden-sword.webp",
  cost: 100,
  damage: 2,
  armorPenetration: 0,
  staminaCost: 1,
}

export const stoneSword: Weapon = {
  id: "stoneSword",
  sortOrder: 2,
  icon: "weapons/stone-sword.webp",
  cost: 500,
  damage: 2.5,
  armorPenetration: 1,
  staminaCost: 1,
  levelRequirement: 5,
  criticalChance: 0.1,
  criticalMultiplier: 1.2,
}

export const weapons: Array<Weapon> = [fists, woodenSword, stoneSword]
