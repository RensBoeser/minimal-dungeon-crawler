<template>
  <div>
    <div class="flex flex-wrap gap-1">
      <!-- prettier-ignore -->
      <ui-item-avatar
        v-for="[enemyDropId, amount] of (Object.entries(user.inventory).filter(([_, amount]) => !!amount) as Array<[EnemyDropId, number]>)"
        :key="enemyDropId"
        :src="drops.find((drop) => drop.id === enemyDropId)!.icon"
        :count="amount"
      >
        <template #panel>
          <DropPopoverPanel :enemy-drop-id="enemyDropId" />
        </template>
      </ui-item-avatar>

      <ui-item-avatar v-for="emptyItem of emptyInventorySlots" :key="emptyItem" />
    </div>

    <UButton class="mt-2" :disabled="hasEmptyInventory" :loading="loading" @click="sellInventory">
      <span>{{ $t("actions.sell") }}</span>
      <div>
        <span>{{ $n(inventoryValue) }}</span>
        <img width="20px" class="object-contain inline" src="~/public/gameplay/gold.webp" alt="Gold" />
      </div>
    </UButton>
  </div>
</template>

<script setup lang="ts">
const user = defineModel<DatabaseUser>("user", { required: true })

const loading = ref(false)

const hasEmptyInventory = computed(() => Object.values(user.value.inventory).every((value) => value === 0))

const inventoryValue = computed(() => {
  let amount = 0
  for (const drop of drops) {
    amount += (user.value.inventory[drop.id] ?? 0) * drop.goldValue
  }

  return amount
})

const inventorySize = 7
const emptyInventorySlots = computed(() => inventorySize - Object.values(user.value.inventory).filter((amount) => !!amount).length)

const sellInventory = async () => {
  loading.value = true
  const { gold: newGold } = await $fetch("/api/inventory/sell", { method: "POST" }).finally(() => (loading.value = false))

  for (const key of Object.keys(user.value.inventory) as EnemyDropId[]) {
    user.value.inventory[key] = 0
  }

  user.value.gold = newGold
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-delayed-enter-active {
  transition: opacity 0.5s ease 0.5s;
}

.fade-delayed-leave-active {
  transition: none;
}

.fade-delayed-enter-from,
.fade-delayed-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
