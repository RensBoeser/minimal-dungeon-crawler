import type { WeaponId } from "~/utils/weapons"

export default defineEventHandler(async () => {
  const userStorage = useStorage("db")

  const bone = (await userStorage.getItem<number>("inventory:bone")) ?? 0
  const rottenMeat = (await userStorage.getItem<number>("inventory:rottenMeat")) ?? 0

  const gold = (await userStorage.getItem<number>("user:gold")) ?? 0
  const experience = (await userStorage.getItem<number>("user:experience")) ?? 0
  const weapon = (await userStorage.getItem<WeaponId>("user:weapon")) ?? "fists"

  return {
    bone,
    rottenMeat,

    gold,
    experience,
    weapon,
  }
})
