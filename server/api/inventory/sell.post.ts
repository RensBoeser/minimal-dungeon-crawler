import { drops } from "~/utils/drops"

export default defineEventHandler(async (event) => {
  const { getUser, setUser: setUser } = useUserService(event.context.userId)
  const user = await getUser()

  if (!user) {
    throw createError("User not found")
  }

  let soldGold = 0
  for (const drop of drops) {
    soldGold += (user.inventory[drop.id] ?? 0) * drop.goldValue
    user.inventory[drop.id] = 0
  }

  user.gold += soldGold
  user.statistics.totalGoldEarned += soldGold
  await setUser(user)

  return {
    soldGold,
    gold: user.gold,
  }
})
