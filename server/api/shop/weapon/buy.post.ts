import { z } from "zod"
import { weaponIds, weapons } from "~/utils/weapons"

const buyWeaponSchema = z.object({
  weapon: z.enum(weaponIds),
})

export default defineEventHandler(async (event) => {
  const { weapon } = await readValidatedBody(event, (body) => buyWeaponSchema.parse(body))

  const userStorage = useStorage("db")

  const userGold = await userStorage.getItem<number>("user:gold") ?? 0

  const weaponCost = weapons.find(({ id }) => id === weapon)!.cost
  console.log(userGold, weaponCost)

  if (userGold < weaponCost) {
    throw createError({
      status: 400,
      statusMessage: "You don't have enough gold to buy this sword."
    })
  }

  await userStorage.setItem("user:gold", userGold - weaponCost)
  await userStorage.setItem("user:weapon", weapon)

  return {
    weapon,
    gold: userGold - weaponCost,
  }
})