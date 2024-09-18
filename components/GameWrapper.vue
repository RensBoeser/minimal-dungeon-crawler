<template>
  <div class="flex flex-wrap gap-4">
    <UserInventory v-model:experience="experience" v-model:weapon="weapon" v-model:gold="gold" v-model:inventory="inventory" class="min-w-96" />

    <DungeonRunner v-model:experience="experience" v-model:inventory="inventory" v-model:gold="gold" :weapon-id="weapon" class="min-w-96" />

    <div class="flex flex-col gap-4">
      <DungeonViewer class="min-w-96" />
      <WeaponShop v-model:weapon="weapon" v-model:gold="gold" class="min-w-96 flex-1" />
    </div>
  </div>
</template>

<script setup lang="ts">
const gold = ref(0)
const weapon = ref<WeaponId>("fists")
const experience = ref(0)

const inventory = ref<Record<EnemyDropId, number>>({
  bone: 0,
  rottenMeat: 0,
  potteryShard: 0,
  oldCoin: 0,
})

const getInventory = async () => {
  const currentUser = await $fetch("/api/inventory")

  inventory.value = currentUser.inventory
  gold.value = currentUser.gold
  experience.value = currentUser.experience
  weapon.value = currentUser.weapon
}

onMounted(getInventory)
</script>
