<template>
  <UContainer>
    <div class="my-2 flex justify-end">
      <ColorSwitch />
    </div>

    <UDivider class="mb-4"/>

    <div class="flex gap-4">
      <UCard class="w-80">
        <template #header>
          <h1 class="text-xl">Inventory</h1>
        </template>

        <div class="flex flex-col gap-2">
          <div>
            <ul>
              <li class="flex gap-1">
                <span>Gold:</span>
                <span class="font-bold">{{ user.gold }}</span>
                <img width="18px" class="object-contain" src="~/public/gold.webp" alt="Gold" >
              </li>
              <li class="flex gap-1">
                <span>Level:</span>
                <span class="font-bold">{{ userLevel.level }} ({{ user.experience }} / {{ nextLevel?.requiredXp }})</span>
              </li>
              <li class="flex gap-1">
                <span>Stamina:</span>
                <span class="font-bold">{{ userLevel.stamina }}</span>
              </li>
              <li class="flex gap-1">
                <span>Weapon:</span>
                <img v-if="user.weapon === 'woodenSword'" width="18px" class="object-contain" src="~/public/wooden-sword.webp" alt="Wooden Sword" >
                <img v-else-if="user.weapon === 'stoneSword'" width="18px" class="object-contain" src="~/public/stone-sword.webp" alt="Iron Sword" >
                <span class="font-bold">{{ user.weapon }}</span>
              </li>
            </ul>
          </div>

          <div>
            <h1 class="font-bold">Loot</h1>

            <ul>
              <li class="flex gap-1">
                <span class="font-bold">{{ inventory.bone }}</span>
                <img width="18px" class="object-contain" src="~/public/bone.webp" alt="Bone" >
                <span>Bones</span>
              </li>

              <li class="flex gap-1">
                <span class="font-bold">{{ inventory.rottenMeat }}</span>
                <img width="18px" class="object-contain" src="~/public/rotten-flesh.webp" alt="Rotten Flesh" >
                <span>Rotten Flesh</span>
              </li>

              <li>
                Sell value: <span class="font-bold">{{ inventoryValue }}</span>
              </li>
            </ul>
          </div>
        </div>

        <template #footer>
          <UButton block :disabled="hasEmptyInventory" @click="sellInventory">Sell</UButton>
        </template>
      </UCard>

      <UCard class="w-60">
        <template #header>
          <h1 class="text-xl">Dungeon</h1>
        </template>

        <ul>
          <li>
            <span>Type:</span>
            <UIcon class="inline-block mx-1" size="18" name="i-game-icons:crypt-entrance"/>
            <span class="font-bold">Crypt</span>
          </li>
        </ul>

        <template #footer>
          <UButton icon="i-ph:sword" class="mb-3" block :loading="recovering" @click="runDungeon">
            <span v-if="recovering">Recovering...</span>
            <span v-else>Run Dungeon</span>
          </UButton>
        </template>
      </UCard>

      <UCard>
        <template #header>
          <h1 class="text-xl">Shop</h1>
        </template>

        <h1>Weapons</h1>

        <ul class="flex flex-col gap-1">
          <li v-for="weapon of weaponShopItems" :key="weapon.id" class="flex items-center justify-between">
            <div class="flex gap-1 mr-4">
              <img width="18px" class="object-contain" :src="weapon.icon" :alt="weapon.name" >
              <span class="font-bold">{{ weapon.name }}</span>
            </div>

            <UButton
              :disabled="user.weapon === weapon.id || user.gold < weapon.cost"
              :color="user.weapon === weapon.id ? 'amber' : 'primary'"
              @click="() => buySword(weapon.id)"
            >
              <span v-if="user.weapon === weapon.id">
                Equipped
              </span>

              <div v-else>
                {{ weapon.cost }}
                <img width="18px" class="object-contain inline-block" src="~/public/gold.webp" alt="Gold" >
              </div>
            </UButton>
          </li>
        </ul>
      </UCard>

      <UCard class="flex-1 w-80">
        <template #header>
          <h1 class="text-xl">Past Runs</h1>
        </template>

        <ul class="max-h-80 overflow-y-auto">
          <template v-for="run of pastRuns.toReversed()" :key="run.dungeonId">
            <li>
              <DungeonResultItem :run="run" />
            </li>
            <UDivider class="my-2"/>
          </template>
        </ul>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">

import type { RunDungeonResult } from "./server/api/dungeon/run.post";
const user = ref<{
  gold: number
  weapon: WeaponId
  experience: number
}>({
  gold: 0,
  weapon: "fists",
  experience: 0
})

const inventory = ref<Record<EnemyDropId, number>>({
  bone: 0,
  rottenMeat: 0,
})

const recovering = ref(false)

const pastRuns = ref<Array<RunDungeonResult>>([])

const hasEmptyInventory = computed(() => Object.values(inventory.value).every((value) => value === 0))
const inventoryValue = computed(() => {
  const boneValue = inventory.value.bone * drops.find((drop) => drop.id === "bone")!.goldValue
  const rottenMeatValue = inventory.value.rottenMeat * drops.find((drop) => drop.id === "rottenMeat")!.goldValue

  return boneValue + rottenMeatValue
})

const userLevel = computed(() => getLevel(user.value.experience))
const nextLevel = computed(() => getNextLevel(user.value.experience))

const weaponShopItems = computed(() => weapons.filter((weapon) => weapon.cost))

const runDungeon = async () => {
  recovering.value = true
  const runDungeonResult = await $fetch("/api/dungeon/run", { method: "POST" })

  inventory.value.bone += runDungeonResult.enemyDrops.filter((drop) => drop === "bone").length
  inventory.value.rottenMeat += runDungeonResult.enemyDrops.filter((drop) => drop === "rottenMeat").length
  user.value.experience += runDungeonResult.xpGained

  pastRuns.value.push(runDungeonResult)

  setTimeout(() => {
    recovering.value = false
  }, 1000)

}

const getInventory = async () => {
  const currentUser = await $fetch("/api/inventory")

  inventory.value.bone = currentUser.bone
  inventory.value.rottenMeat = currentUser.rottenMeat
  user.value.gold = currentUser.gold
  user.value.experience = currentUser.experience
  user.value.weapon = currentUser.weapon
}

const sellInventory = async () => {
  const { gold } = await $fetch("/api/inventory/sell", { method: "POST" })

  inventory.value.bone = 0
  inventory.value.rottenMeat = 0

  user.value.gold = gold
}

const buySword = async (weaponToBuy: WeaponId) => {
  const { gold, weapon } = await $fetch("/api/shop/weapon/buy", { method: "POST", body: { weapon: weaponToBuy } })

  user.value.gold = gold
  user.value.weapon = weapon
}

onMounted(getInventory)
</script>