import type { EnemyDropId } from "~/utils/drops"
import type { RunDungeonResult } from "~/utils/dungeons"
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

  const getRuns = async (limit = 10): Promise<Array<RunDungeonResult>> => {
    const runs = (await storage.getItem<Array<RunDungeonResult>>(`users:${userId}:runs`)) ?? []
    return runs.slice(0, limit).toReversed()
  }

  const addRun = async (run: RunDungeonResult): Promise<RunDungeonResult> => {
    const runs = (await storage.getItem<Array<RunDungeonResult>>(`users:${userId}:runs`)) ?? []
    runs.unshift({ ...run, index: runs.length })
    await storage.setItem(`users:${userId}:runs`, runs)

    return { ...run, index: runs.length - 1 }
  }

  return {
    getUser,
    setUser,
    getRuns,
    addRun,
  }
}
