import type { EnemyDropId } from "~/utils/drops"
import { drops } from "~/utils/drops"
import type { WeaponId } from "~/utils/weapons"

export default defineEventHandler(async () => {
  const userStorage = useStorage("db")

  const inventory = {} as Record<EnemyDropId, number>
  for (const drop of drops) {
    const amount = (await userStorage.getItem<number>(`inventory:loot:${drop.id}`)) ?? 0
    inventory[drop.id] = amount
  }

  const gold = (await userStorage.getItem<number>("user:gold")) ?? 0
  const experience = (await userStorage.getItem<number>("user:experience")) ?? 0
  const weapon = (await userStorage.getItem<WeaponId>("user:weapon")) ?? "fists"

  return {
    inventory,

    gold,
    experience,
    weapon,
  }
})
