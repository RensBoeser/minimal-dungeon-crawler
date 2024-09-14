export interface LevelUpResult {
  gold: number
}

export default defineEventHandler(async ():Promise<LevelUpResult>  => {
  const userStorage = useStorage("db")
  const userGold = (await userStorage.getItem<number>("user:gold")) ?? 0

  // TODO: balance gold gain per level
  const newGoldValue = userGold + 500
  await userStorage.setItem("user:gold", newGoldValue)

  return {
    gold: newGoldValue,
  }
})
