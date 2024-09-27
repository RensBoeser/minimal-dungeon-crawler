<template>
  <UCard>
    <template #header>
      <div class="flex gap-2">
        <h1 class="text-xl">{{ $t("ui.inventory.title") }}</h1>

        <div class="flex-1" />

        <UButton :disabled="hasEmptyInventory" @click="sellInventory">
          <span>{{ $t("actions.sell") }}</span>
          <div>
            <span>{{ $n(inventoryValue) }}</span>
            <img width="20px" class="object-contain inline" src="~/public/gameplay/gold.webp" alt="Gold" />
          </div>
        </UButton>
      </div>
    </template>

    <template #default>
      <TransitionGroup name="slide-fade" tag="ul" class="flex-1">
        <li
          v-for="[enemyDropId, amount] of Object.entries(user.inventory).filter(([_, amount]) => !!amount) as Array<[EnemyDropId, number]>"
          :key="enemyDropId"
          class="flex gap-1"
        >
          <span class="font-mono">{{ $n(amount) }}</span>
          <drop-icon :enemy-drop-id="enemyDropId" />
          <span>{{ $t(`drops.${enemyDropId}.name`, amount) }}</span>
        </li>
      </TransitionGroup>

      <Transition name="fade-delayed" appear>
        <div v-if="Object.values(user.inventory).every((value) => !value)">
          <span key="empty" class="text-gray-400">No items in inventory</span>
        </div>
      </Transition>
    </template>
  </UCard>
</template>

<script setup lang="ts">
const user = defineModel<DatabaseUser>("user", { required: true })

const hasEmptyInventory = computed(() => Object.values(user.value.inventory).every((value) => value === 0))

const inventoryValue = computed(() => {
  let amount = 0
  for (const drop of drops) {
    amount += (user.value.inventory[drop.id] ?? 0) * drop.goldValue
  }

  return amount
})

const sellInventory = async () => {
  const { gold: newGold } = await $fetch("/api/inventory/sell", { method: "POST" })

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
