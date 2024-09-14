import { drops } from "~/utils/drops"

export default defineEventHandler(async () => {
  const userStorage = useStorage("db")

  const userGold = (await userStorage.getItem<number>("user:gold")) ?? 0

  let soldGold = 0
  for (const drop of drops) {
    const currentAmount = (await userStorage.getItem<number>(`inventory:loot:${drop.id}`)) ?? 0
    await userStorage.setItem(`inventory:loot:${drop.id}`, 0)
    soldGold += currentAmount * drop.goldValue
  }

  await userStorage.setItem("user:gold", userGold + soldGold)

  return {
    soldGold,
    gold: userGold + soldGold,
  }
})
