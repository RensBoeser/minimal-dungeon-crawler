import type { WeaponId } from "~/utils/weapons"

export default defineNitroPlugin(async () => {
  const storage = useStorage("db")
  storage.dispose()

  Promise.all([
    // Inventory
    storage.setItem<number>("inventory:bone", 0),
    storage.setItem<number>("inventory:rottenMeat", 0),

    // User stats
    storage.setItem<number>("user:experience", 0),
    storage.setItem<WeaponId>("user:weapon", "fists"),
    storage.setItem<number>("user:gold", 0),
  ])
})
