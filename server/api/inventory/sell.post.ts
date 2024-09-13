import { drops } from "~/utils/drops"

export default defineEventHandler(async () => {
  const userStorage = useStorage("db")

  const userBones = (await userStorage.getItem<number>("inventory:bone")) ?? 0
  const userRottenMeat = (await userStorage.getItem<number>("inventory:rottenMeat")) ?? 0
  const userGold = (await userStorage.getItem<number>("user:gold")) ?? 0

  const gold = userBones * drops.find(({ id }) => id === "bone")!.goldValue
  const gold2 = userRottenMeat * drops.find(({ id }) => id === "rottenMeat")!.goldValue

  await userStorage.setItem("user:gold", userGold + gold + gold2)
  await userStorage.setItem("inventory:bone", 0)
  await userStorage.setItem("inventory:rottenMeat", 0)

  return {
    soldGold: gold + gold2,
    gold: userGold + gold + gold2,
  }
})
