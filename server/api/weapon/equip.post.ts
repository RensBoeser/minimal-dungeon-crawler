import { z } from "zod"
import { weaponIds } from "~/utils/weapons"

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

  if (!user.weaponsBought.includes(weapon)) {
    throw createError({
      status: 400,
      statusMessage: "You can't equip a weapon you haven't bought.",
    })
  }

  user.weapon = weapon
  await setUser(user)

  return {
    weapon,
    gold: user.gold,
  }
})
