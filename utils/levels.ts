export interface LevelUpReward {
  // TODO: Add more types of rewards
  gold?: number
}

export interface UserLevel {
  /** The level */
  level: number
  /** The XP required */
  requiredXp: number
  baseStamina: number
  /** Reward for leveling up */
  reward?: LevelUpReward
}

export const levels: Array<UserLevel> = [
  { level: 1, requiredXp: 0, baseStamina: 50 },
  { level: 2, requiredXp: 100, baseStamina: 50, reward: { gold: 50 } },
  { level: 3, requiredXp: 200, baseStamina: 55, reward: { gold: 50 } },
  { level: 4, requiredXp: 400, baseStamina: 55, reward: { gold: 50 } },
  { level: 5, requiredXp: 650, baseStamina: 65, reward: { gold: 100 } },
  { level: 6, requiredXp: 1000, baseStamina: 65, reward: { gold: 100 } },
  { level: 7, requiredXp: 1400, baseStamina: 65, reward: { gold: 100 } },
  { level: 8, requiredXp: 1800, baseStamina: 70, reward: { gold: 100 } },
  { level: 9, requiredXp: 2300, baseStamina: 70, reward: { gold: 100 } },
  { level: 10, requiredXp: 3000, baseStamina: 80, reward: { gold: 200 } },
  { level: 11, requiredXp: Infinity, baseStamina: 80 },
]

export const getLevel = (xp: number) => {
  const highestLevel = levels.reduce((accLevel, currentLevel) => (currentLevel.requiredXp <= xp ? currentLevel : accLevel), levels[0])

  return JSON.parse(JSON.stringify(highestLevel))
}

export const getNextLevel = (xp: number) => {
  const nextLevel = levels.find((level) => level.requiredXp > xp)

  return JSON.parse(JSON.stringify(nextLevel))
}
