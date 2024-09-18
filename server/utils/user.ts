import type { EnemyDropId } from "~/utils/drops"
import type { WeaponId } from "~/utils/weapons"

export interface DatabaseUser {
  id: string
  experience: number
  weapon: WeaponId
  gold: number
  inventory: Record<EnemyDropId, number>
}

export const TEMP_USER_ID = "TEMP"

export const useUserService = (userId: string) => {
  const storage = useStorage("data")

  const getUser = async (): Promise<DatabaseUser | null> => {
    const user = await storage.getItem<DatabaseUser>(`users:${userId}:user`)
    return user
  }

  const setUser = (user: DatabaseUser): Promise<void> => {
    return storage.setItem(`users:${userId}:user`, user)
  }

  return {
    getUser,
    setUser,
  }
}
