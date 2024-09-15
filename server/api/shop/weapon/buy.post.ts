import { z } from "zod"
import { TEMP_USER_ID, useUserService } from "~/server/utils/user"
import { weaponIds, weapons } from "~/utils/weapons"

const buyWeaponSchema = z.object({
  weapon: z.enum(weaponIds),
})

export default defineEventHandler(async (event) => {
  const { weapon } = await readValidatedBody(event, (body) => buyWeaponSchema.parse(body))

  const { getUser, setUser } = useUserService(TEMP_USER_ID)

  const user = await getUser()

  if (!user) {
    throw createError("User not found")
  }

  const weaponCost = weapons.find(({ id }) => id === weapon)!.cost

  if (user.gold < weaponCost) {
    throw createError({
      status: 400,
      statusMessage: "You don't have enough gold to buy this sword.",
    })
  }

  user.gold -= weaponCost
  user.weapon = weapon

  await setUser(user)

  return {
    weapon,
    gold: user.gold,
  }
})
