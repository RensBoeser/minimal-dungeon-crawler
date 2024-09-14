import { drops } from "~/utils/drops"
import type { WeaponId } from "~/utils/weapons"

export default defineNitroPlugin(async () => {
  const storage = useStorage("db")
  storage.dispose()

  Promise.all([
    // Inventory
    ...drops.map(drop => storage.setItem<number>(`inventory:loot:${drop.id}`, 0)),

    // User stats
    storage.setItem<number>("user:experience", 0),
    storage.setItem<WeaponId>("user:weapon", "fists"),
    storage.setItem<number>("user:gold", 0),
  ])
})
