<template>
  <UCard>
    <template #header>
      <div class="flex gap-2">
        <h1 class="text-xl">{{ $t("ui.inventory.title") }}</h1>

        <span class="flex-1" />
        <UButton icon="i-material-symbols:refresh" color="gray" variant="ghost" @click="getUser" />
      </div>
    </template>

    <div class="flex flex-col gap-2 h-72">
      <div>
        <ul>
          <li class="flex gap-1">
            <span>{{ $t("ui.user.gold") }}:</span>
            <span class="font-bold">{{ $n(user.gold) }}</span>
            <img width="20px" class="object-contain" src="~/public/gameplay/gold.webp" alt="Gold" />
          </li>
          <li class="flex gap-1">
            <span>{{ $t("ui.user.level") }}:</span>
            <span class="font-bold">{{ userLevel.level }}</span>
            <span v-if="nextLevel?.requiredXp && nextLevel.requiredXp !== Infinity" class="font-mono">
              ({{ $n(user.experience) }}/{{ $n(nextLevel?.requiredXp ?? 0) }} {{ $t("ui.user.xp") }})
            </span>
            <span v-else class="font-mono">({{ $n(user.experience) }} {{ $t("ui.user.xp") }})</span>
          </li>

          <li class="flex gap-1">
            <span>{{ $t("ui.user.stamina") }}:</span>
            <span class="font-bold">{{ $n(userLevel.baseStamina) }}</span>
          </li>
          <li class="flex gap-1">
            <span>{{ $t("ui.user.weapon") }}:</span>
            <weapon-icon :weapon-id="user.weapon" />
            <span class="font-bold">{{ $t(`weapons.${user.weapon}.name`) }}</span>
          </li>
        </ul>
      </div>

      <Transition name="fade" mode="out-in" appear>
        <div v-if="Object.keys(user.inventory).length" key="inventory">
          <h1>{{ $t("ui.inventory.sellableLoot") }}</h1>

          <TransitionGroup name="slide-fade" tag="ul">
            <li
              v-for="[enemyDropId, amount] of Object.entries(user.inventory).filter(([_, amount]) => !!amount) as Array<[EnemyDropId, number]>"
              :key="enemyDropId"
              class="flex gap-1"
            >
              <span class="font-bold">{{ $n(amount) }}</span>
              <drop-icon :enemy-drop-id="enemyDropId" />
              <span>{{ $t(`drops.${enemyDropId}.name`, amount) }}</span>
            </li>
          </TransitionGroup>

          <Transition name="fade-delayed" appear>
            <span v-if="Object.values(user.inventory).every((value) => !value)" key="empty" class="text-gray-400 italic">No items in inventory</span>
          </Transition>
        </div>
      </Transition>
    </div>

    <template #footer>
      <UButton block :disabled="hasEmptyInventory" @click="sellInventory">
        <span>{{ $t("actions.sell") }}</span>
        <div>
          <span>{{ $n(inventoryValue) }}</span>
          <img width="20px" class="object-contain inline" src="~/public/gameplay/gold.webp" alt="Gold" />
        </div>
      </UButton>
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

const userLevel = computed(() => getLevel(user.value.experience))
const nextLevel = computed(() => getNextLevel(user.value.experience))

const getUser = async () => {
  const currentUser = await $fetch("/api/inventory")
  user.value = currentUser
}

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
