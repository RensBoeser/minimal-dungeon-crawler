import type { EnemyDropId } from "~/utils/drops"
import { drops } from "~/utils/drops"
import { TEMP_USER_ID, useUserService } from "../utils/user"

export default defineNitroPlugin(async () => {
  const storage = useStorage("db")
  storage.clear()

  const { setUser } = useUserService(TEMP_USER_ID)

  console.log("Setting up user")

  await setUser({
    id: TEMP_USER_ID,
    experience: 0,
    gold: 0,
    weapon: "fists",
    inventory: drops.reduce((acc, drop) => ({ ...acc, [drop.id]: 0 }), {}) as Record<EnemyDropId, number>,
  })
})
