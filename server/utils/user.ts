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

export const getUser = async (userId: string): Promise<DatabaseUser | null> => {
  const storage = useStorage("db")
  const user = await storage.getItem<DatabaseUser>(`user:${userId}`)
  return user
}

export const setUser = async (userId: string, user: DatabaseUser): Promise<void> => {
  const storage = useStorage("db")
  await storage.setItem(`user:${userId}`, JSON.stringify(user))
}