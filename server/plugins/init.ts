import type { EnemyDropId } from "~/utils/drops";
import { drops } from "~/utils/drops"
import { setUser, TEMP_USER_ID } from "../utils/user"

export default defineNitroPlugin(async () => {
  const storage = useStorage("db")
  storage.dispose()

  await setUser(TEMP_USER_ID, {
    id: "1",
    experience: 0,
    gold: 0,
    weapon: "fists",
    inventory: drops.reduce((acc, drop) => ({ ...acc, [drop.id]: 0 }), {}) as Record<EnemyDropId, number>,
  })
})
