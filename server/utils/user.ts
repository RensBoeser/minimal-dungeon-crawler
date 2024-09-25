import { drops, type EnemyDropId } from "~/utils/drops"
import type { WeaponId } from "~/utils/weapons"

export interface DatabaseUser {
  id: string
  experience: number
  weapon: WeaponId
  gold: number
  inventory: Record<EnemyDropId, number>
  updatedAt?: number
  createdAt?: number
}

export const starterUser: DatabaseUser = {
  id: "TEMP",
  experience: 0,
  gold: 0,
  weapon: "fists",
  inventory: drops.reduce((acc, drop) => ({ ...acc, [drop.id]: 0 }), {}) as Record<EnemyDropId, number>,
}

export const useUserService = (userId: string) => {
  const storage = useStorage("data")

  const getUser = async (): Promise<DatabaseUser> => {
    const user = await storage.getItem<DatabaseUser>(`users:${userId}:user`)

    if (!user) {
      return initializeUser()
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
