export const weaponIds = ["fists", "woodenSword", "stoneSword", "ironSword", "diamondSword", "netheriteSword"] as const
export type WeaponId = (typeof weaponIds)[number]
export type ClassModifier = Record<string, number>

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
  /** Class modifiers */
  classModifiers?: ClassModifier
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
}

export const ironSword: Weapon = {
  id: "ironSword",
  sortOrder: 3,
  icon: "weapons/iron-sword.webp",
  cost: 2000,
  damage: 3,
  armorPenetration: 2,
  staminaCost: 1,
  criticalChance: 0.1,
  criticalMultiplier: 1.5,
  classModifiers: {
    undead: 1.05,
  },
}

export const diamondSword: Weapon = {
  id: "diamondSword",
  sortOrder: 4,
  icon: "weapons/diamond-sword.webp",
  cost: 8000,
  damage: 4,
  armorPenetration: 3,
  staminaCost: 1,
  criticalChance: 0.2,
  criticalMultiplier: 1.8,
  classModifiers: {
    undead: 1.15,
  },
}

export const netheriteSword: Weapon = {
  id: "netheriteSword",
  sortOrder: 5,
  icon: "weapons/netherite-sword.webp",
  cost: 20000,
  damage: 5,
  armorPenetration: 4,
  staminaCost: 1,
  criticalChance: 0.3,
  criticalMultiplier: 2,
  classModifiers: {
    undead: 1.15,
    nether: 1.2,
  },
}

export const weapons: Array<Weapon> = [fists, woodenSword, stoneSword, ironSword, diamondSword, netheriteSword]
