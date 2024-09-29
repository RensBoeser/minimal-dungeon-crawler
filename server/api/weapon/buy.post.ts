import { z } from "zod"
import { weaponIds, weapons } from "~/utils/weapons"

const buyWeaponSchema = z.object({
  weapon: z.enum(weaponIds),
})

export default defineEventHandler(async (event) => {
  const { weapon } = await readValidatedBody(event, (body) => buyWeaponSchema.parse(body))

  const { getUser, setUser: setUser } = useUserService(event.context.userId)

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
  user.weaponsBought.push(weapon)

  await setUser(user)

  return {
    weapon,
    gold: user.gold,
  }
})
