<template>
  <UCard>
    <template #header>
      <h1 class="text-xl">Inventory</h1>
    </template>

    <div class="flex flex-col gap-2">
      <div>
        <ul>
          <li class="flex gap-1">
            <span>Gold:</span>
            <span class="font-bold">{{ gold }}</span>
            <img width="18px" class="object-contain" src="~/public/gameplay/gold.webp" alt="Gold" />
          </li>
          <li class="flex gap-1">
            <span>Level:</span>
            <span class="font-bold">{{ userLevel.level }} ({{ experience }} / {{ nextLevel?.requiredXp }})</span>
          </li>
          <li class="flex gap-1">
            <span>Stamina:</span>
            <span class="font-bold">{{ userLevel.stamina }}</span>
          </li>
          <li class="flex gap-1">
            <span>Weapon:</span>
            <img v-if="weapon === 'woodenSword'" width="18px" class="object-contain" src="~/public/weapons/wooden-sword.webp" alt="Wooden Sword" />
            <img v-else-if="weapon === 'stoneSword'" width="18px" class="object-contain" src="~/public/weapons/stone-sword.webp" alt="Iron Sword" />
            <span class="font-bold">{{ weapon }}</span>
          </li>
        </ul>
      </div>

      <div>
        <h1 class="font-bold">Loot</h1>

        <ul>
          <li class="flex gap-1">
            <span class="font-bold">{{ inventory.bone }}</span>
            <img width="18px" class="object-contain" src="~/public/loot/bone.webp" alt="Bone" />
            <span>Bones</span>
          </li>

          <li class="flex gap-1">
            <span class="font-bold">{{ inventory.rottenMeat }}</span>
            <img width="18px" class="object-contain" src="~/public/loot/rotten-flesh.webp" alt="Rotten Flesh" />
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
</template>

<script setup lang="ts">
const experience = defineModel<number>("experience", { required: true })
const weapon = defineModel<WeaponId>("weapon", { required: true })
const gold = defineModel<number>("gold", { required: true })
const inventory = defineModel<Record<EnemyDropId, number>>("inventory", { required: true })

const hasEmptyInventory = computed(() => Object.values(inventory.value).every((value) => value === 0))
const inventoryValue = computed(() => {
  const boneValue = inventory.value.bone * drops.find((drop) => drop.id === "bone")!.goldValue
  const rottenMeatValue = inventory.value.rottenMeat * drops.find((drop) => drop.id === "rottenMeat")!.goldValue

  return boneValue + rottenMeatValue
})

const userLevel = computed(() => getLevel(experience.value))
const nextLevel = computed(() => getNextLevel(experience.value))

const sellInventory = async () => {
  const { gold: newGold } = await $fetch("/api/inventory/sell", { method: "POST" })

  inventory.value.bone = 0
  inventory.value.rottenMeat = 0

  gold.value = newGold
}
</script>
