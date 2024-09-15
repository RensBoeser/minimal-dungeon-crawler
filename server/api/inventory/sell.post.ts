import { getUser, setUser, TEMP_USER_ID } from "~/server/utils/user"
import { drops } from "~/utils/drops"

export default defineEventHandler(async () => {
  const user = await getUser(TEMP_USER_ID)

  if (!user) {
    throw createError("User not found")
  }

  let soldGold = 0
  for (const drop of drops) {
    soldGold += user.inventory[drop.id] * drop.goldValue
    user.inventory[drop.id] = 0
  }

  user.gold += soldGold
  await setUser(TEMP_USER_ID, user)

  return {
    soldGold,
    gold: user.gold,
  }
})
