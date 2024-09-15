<template>
  <UCard>
    <template #header>
      <h1 class="text-xl">{{ $t('ui.inventory.title')}}</h1>
    </template>

    <div class="flex flex-col gap-2 h-56">
      <div>
        <ul>
          <li class="flex gap-1">
            <span>{{ $t('ui.user.gold') }}:</span>
            <span class="font-bold">{{ gold }}</span>
            <img width="20px" class="object-contain" src="~/public/gameplay/gold.webp" alt="Gold" />
          </li>
          <li class="flex gap-1">
            <span>{{ $t('ui.user.level') }}:</span>
            <span class="font-bold">{{ userLevel.level }}</span> <span v-if="nextLevel?.requiredXp && nextLevel.requiredXp !== Infinity">({{ $n(experience) }} / {{ $n(nextLevel?.requiredXp ?? 0) }} {{ $t('ui.user.xp') }})</span>
          </li>
          <li class="flex gap-1">
            <span>{{ $t('ui.user.stamina') }}:</span>
            <span class="font-bold">{{ userLevel.baseStamina }}</span>
          </li>
          <li class="flex gap-1">
            <span>{{ $t('ui.user.weapon') }}:</span>
            <weapon-icon :weapon-id="currentWeaponId" />
            <span class="font-bold">{{ $t(`weapons.${currentWeaponId}.name`) }}</span>
          </li>
        </ul>
      </div>

      <div>
        <h1 class="font-bold">{{ $t('ui.inventory.sellableLoot') }}</h1>

        <ul>
          <li
            v-for="[enemyDropId, amount] of (Object.entries(inventory) as [EnemyDropId, number][])"
            :key="enemyDropId"
            class="flex gap-1"
          >
            <span class="font-bold">{{ amount }}</span>
            <drop-icon :enemy-drop-id="enemyDropId" />
            <span>{{ $t(`drops.${enemyDropId}.name`, amount) }}</span>
          </li>
        </ul>
      </div>
    </div>

    <template #footer>
      <UButton block :disabled="hasEmptyInventory" @click="sellInventory">
        <span>{{ $t('actions.sell') }}</span>
        <div>
          <span>{{ inventoryValue }}</span>
          <img width="20px" class="object-contain inline" src="~/public/gameplay/gold.webp" alt="Gold" />
        </div>
      </UButton>
    </template>
  </UCard>
</template>

<script setup lang="ts">
const experience = defineModel<number>("experience", { required: true })
const currentWeaponId = defineModel<WeaponId>("weapon", { required: true })
const gold = defineModel<number>("gold", { required: true })
const inventory = defineModel<Record<EnemyDropId, number>>("inventory", { required: true })

const hasEmptyInventory = computed(() => Object.values(inventory.value).every((value) => value === 0))

const inventoryValue = computed(() => {
  let amount = 0
  for (const drop of drops) {
    amount += inventory.value[drop.id] * drop.goldValue
  }

  return amount
})

const userLevel = computed(() => getLevel(experience.value))
const nextLevel = computed(() => getNextLevel(experience.value))

const sellInventory = async () => {
  const { gold: newGold } = await $fetch("/api/inventory/sell", { method: "POST" })

  for (const key of (Object.keys(inventory.value) as EnemyDropId[])) {
    inventory.value[key] = 0
  }

  gold.value = newGold
}
</script>
