<template>
  <UCard>
    <template #header>
      <h1 class="text-xl">{{ $t('ui.shop.title') }}</h1>
    </template>

    <h1>{{ $t('ui.shop.weapons') }}</h1>

    <ul class="flex flex-col gap-1">
      <li v-for="weaponShopItem of weaponShopItems" :key="weaponShopItem.id" class="flex items-center justify-between">
        <div class="flex gap-1 mr-4">
          <img width="18px" class="object-contain" :src="weaponShopItem.icon" :alt="$t(`weapons.${weaponShopItem.id}.name`)" />
          <span class="font-bold">{{ $t(`weapons.${weaponShopItem.id}.name`) }}</span>
        </div>

        <UButton
          :disabled="currentWeapon === weaponShopItem.id || gold < weaponShopItem.cost"
          :color="currentWeapon === weaponShopItem.id ? 'amber' : 'primary'"
          @click="() => buySword(weaponShopItem.id)"
        >
          <span v-if="currentWeapon === weaponShopItem.id"> {{ $t('actions.equipped') }} </span>

          <div v-else>
            {{ weaponShopItem.cost }}
            <img width="18px" class="object-contain inline-block" src="~/public/gameplay/gold.webp" :alt="$t('ui.user.gold')" />
          </div>
        </UButton>
      </li>
    </ul>
  </UCard>
</template>

<script setup lang="ts">
const currentWeapon = defineModel<WeaponId>("weapon", { required: true })
const gold = defineModel<number>("gold", { required: true })

const weaponShopItems = computed(() => weapons.filter((weapon) => weapon.cost))

const buySword = async (weaponToBuy: WeaponId) => {
  const { gold: newGoldBalance, weapon: newWeapon } = await $fetch("/api/shop/weapon/buy", { method: "POST", body: { weapon: weaponToBuy } })

  gold.value = newGoldBalance
  currentWeapon.value = newWeapon
}
</script>
