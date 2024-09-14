import { get } from "lodash"
import cloneDeep from "lodash/cloneDeep"

export interface UserLevel {
  /** The level */
  level: number
  /** The XP required */
  requiredXp: number
  baseStamina: number
}

export interface LevelUpResult {
  gold: number
}

export const levels: Array<UserLevel> = [
  { level: 1, requiredXp: 0, baseStamina: 50 },
  { level: 2, requiredXp: 100, baseStamina: 50 },
  { level: 3, requiredXp: 200, baseStamina: 55 },
  { level: 4, requiredXp: 400, baseStamina: 55 },
  { level: 5, requiredXp: 650, baseStamina: 65 },
  { level: 6, requiredXp: 1000, baseStamina: 65 },
  { level: 7, requiredXp: 1400, baseStamina: 65 },
  { level: 8, requiredXp: 1800, baseStamina: 70 },
  { level: 9, requiredXp: 2300, baseStamina: 70 },
  { level: 10, requiredXp: 3000, baseStamina: 80 },
  { level: 11, requiredXp: Infinity, baseStamina: 80 },
]

export const getLevel = (xp: number) => {
  const highestLevel = levels.reduce((accLevel, currentLevel) => (currentLevel.requiredXp <= xp ? currentLevel : accLevel), levels[0])

  return cloneDeep(highestLevel)
}

export const getNextLevel = (xp: number) => {
  const nextLevel = levels.find((level) => level.requiredXp > xp)

  return cloneDeep(nextLevel)
}

/** Calculates XP gain, returns new XP value */
export const handleXpGain = async (currentXp: number, xpGain: number): Promise<number> => {

  // XP gain from a user's boosts can be modified here.

  const newXpValue = currentXp + xpGain
  if (getLevel(currentXp).level < getLevel(newXpValue).level) {
    await levelUp()
  }

  return newXpValue
}

export const levelUp = async () => {
  // add gold to user
  await $fetch("/api/user/levelUp", { method: "POST" })

  // additionally, you could add a notification trigger here
}