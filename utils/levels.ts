import cloneDeep from "lodash/cloneDeep"

export interface UserLevel {
  /** The level */
  level: number
  /** The XP required */
  requiredXp: number
  stamina: number
}

export const levels: Array<UserLevel> = [
  { level: 1, requiredXp: 0, stamina: 50 },
  { level: 2, requiredXp: 100, stamina: 50 },
  { level: 3, requiredXp: 200, stamina: 55 },
  { level: 4, requiredXp: 400, stamina: 55 },
  { level: 5, requiredXp: 650, stamina: 65 },
  { level: 6, requiredXp: 1000, stamina: 65 },
  { level: 7, requiredXp: 1400, stamina: 65 },
  { level: 8, requiredXp: 1800, stamina: 70 },
  { level: 9, requiredXp: 2300, stamina: 70 },
  { level: 10, requiredXp: 3000, stamina: 80 },
  { level: 11, requiredXp: Infinity, stamina: 80 },
]

export const getLevel = (xp: number) => {
  const highestLevel = levels.reduce((accLevel, currentLevel) => (currentLevel.requiredXp <= xp ? currentLevel : accLevel), levels[0])

  return cloneDeep(highestLevel)
}

export const getNextLevel = (xp: number) => {
  const nextLevel = levels.find((level) => level.requiredXp > xp)

  return cloneDeep(nextLevel)
}
