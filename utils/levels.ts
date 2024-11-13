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
  { level: 2, requiredXp: 50, baseStamina: 52, reward: { gold: 50 } },
  { level: 3, requiredXp: 150, baseStamina: 55, reward: { gold: 50 } },
  { level: 4, requiredXp: 300, baseStamina: 57, reward: { gold: 50 } },
  { level: 5, requiredXp: 500, baseStamina: 65, reward: { gold: 200 } },
  { level: 6, requiredXp: 800, baseStamina: 65, reward: { gold: 100 } },
  { level: 7, requiredXp: 1200, baseStamina: 65, reward: { gold: 100 } },
  { level: 8, requiredXp: 1700, baseStamina: 70, reward: { gold: 100 } },
  { level: 9, requiredXp: 2250, baseStamina: 70, reward: { gold: 100 } },
  { level: 10, requiredXp: 3000, baseStamina: 80, reward: { gold: 500 } },
  { level: 11, requiredXp: 4000, baseStamina: 80, reward: { gold: 250 } },
  { level: 12, requiredXp: 5500, baseStamina: 80, reward: { gold: 250 } },
  { level: 13, requiredXp: 7000, baseStamina: 85, reward: { gold: 250 } },
  { level: 14, requiredXp: 8500, baseStamina: 85, reward: { gold: 250 } },
  { level: 15, requiredXp: 10000, baseStamina: 90, reward: { gold: 1000 } },
  { level: 16, requiredXp: 12000, baseStamina: 90, reward: { gold: 500 } },
  { level: 17, requiredXp: 14500, baseStamina: 95, reward: { gold: 500 } },
  { level: 18, requiredXp: 17000, baseStamina: 95, reward: { gold: 500 } },
  { level: 19, requiredXp: 20000, baseStamina: 100, reward: { gold: 1000 } },
  { level: 20, requiredXp: 25000, baseStamina: 100, reward: { gold: 2000 } },
  { level: 21, requiredXp: Infinity, baseStamina: 90 },
]

export const getLevel = (xp: number): UserLevel => {
  const highestLevel = levels.reduce((accLevel, currentLevel) => (currentLevel.requiredXp <= xp ? currentLevel : accLevel), levels[0])

  return JSON.parse(JSON.stringify(highestLevel))
}

export const getNextLevel = (xp: number): UserLevel => {
  const nextLevel = levels.find((level) => level.requiredXp > xp)

  return JSON.parse(JSON.stringify(nextLevel))
}
