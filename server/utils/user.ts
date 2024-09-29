import type { EnemyDropId } from "~/utils/drops"
import type { DungeonId, EnemyId } from "~/utils/dungeons"
import type { WeaponId } from "~/utils/weapons"

export interface DatabaseUser {
  id: string
  experience: number
  weapon: WeaponId
  gold: number
  inventory: Partial<Record<EnemyDropId, number>>
  weaponsBought: Array<WeaponId>
  updatedAt?: number
  createdAt?: number
  statistics: UserStatistics
}

export interface UserStatistics {
  totalGoldEarned: number
  totalDropsGathered: Partial<Record<EnemyDropId, number>>
  totalEnemiesDefeated: Partial<Record<EnemyId, number>>
  totalDungeonRuns: Partial<Record<DungeonId, number>>
}

export const starterUser: DatabaseUser = {
  id: "TEMP",
  experience: 0,
  gold: 0,
  weapon: "fists",
  inventory: {},
  weaponsBought: ["fists"],
  statistics: {
    totalGoldEarned: 0,
    totalDropsGathered: {},
    totalEnemiesDefeated: {},
    totalDungeonRuns: {},
  },
}

export const useUserService = (userId: string) => {
  const storage = useStorage("data")

  const getUser = async (): Promise<DatabaseUser> => {
    const user = await storage.getItem<DatabaseUser>(`users:${userId}:user`)

    if (!user) {
      return initializeUser()
    }

    // Makeshift migration for adding statistics to existing users
    if (!user.statistics) {
      user.statistics = {
        totalGoldEarned: 0,
        totalDropsGathered: {},
        totalEnemiesDefeated: {},
        totalDungeonRuns: {},
      }
    }

    // Makeshift migration for adding weaponsBought to existing users
    if (!user.weaponsBought) {
      user.weaponsBought = ["fists"]
    }

    return user
  }

  const setUser = async (user: DatabaseUser): Promise<DatabaseUser> => {
    await storage.setItem<DatabaseUser>(`users:${userId}:user`, {
      ...user,
      updatedAt: Date.now(),
    })
    return user
  }

  const initializeUser = async (): Promise<DatabaseUser> => {
    console.log("Initializing user", userId)
    return setUser({ ...starterUser, createdAt: Date.now(), updatedAt: Date.now(), id: userId })
  }

  const checkUserExistence = async (): Promise<boolean> => {
    const user = await storage.getItem<DatabaseUser>(`users:${userId}:user`)
    return !!user
  }

  return {
    getUser,
    setUser,
    initializeUser,
    checkUserExistence,
  }
}
