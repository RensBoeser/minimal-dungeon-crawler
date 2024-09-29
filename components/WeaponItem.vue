<template>
  <div class="min-w-36 p-2 dark:bg-black dark:bg-opacity-10 border border-gray-800 rounded flex flex-col gap-3">
    <h1 class="text-center">{{ $t(`weapons.${weapon.id}.name`) }}</h1>
    <div class="flex-1 flex justify-center">
      <img width="40px" class="object-contain" :src="weapon.icon" :alt="$t(`weapons.${weapon.id}.name`)" />
    </div>

    <div class="flex flex-col gap-1">
      <UPopover mode="click" overlay>
        <UButton variant="ghost" block color="gray" size="2xs">
          <span class="dark:text-gray-400">Info</span>
        </UButton>

        <template #panel>
          <WeaponPopoverPanel :weapon="weapon" />
        </template>
      </UPopover>

      <UButton v-if="user.weapon === weapon.id" color="cyan" variant="soft" block disabled>
        {{ $t("actions.equipped") }}
      </UButton>

      <UButton v-else-if="!isBought && user.gold >= weapon.cost" class="font-mono" block :disabled="loading" @click="() => buyWeapon(weapon.id)">
        {{ $n(weapon.cost) }}
        <img width="20px" class="object-contain inline-block" src="~/public/gameplay/gold.webp" :alt="$t('ui.user.gold')" />
      </UButton>

      <UButton v-else-if="!isBought" variant="soft" class="font-mono" block disabled>
        {{ $n(weapon.cost) }}
        <img width="20px" class="object-contain inline-block" src="~/public/gameplay/gold.webp" :alt="$t('ui.user.gold')" />
      </UButton>

      <UButton v-else block color="primary" variant="soft" :disabled="loading" @click="() => equipWeapon(weapon.id)">
        {{ $t("actions.equip") }}
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = defineModel<DatabaseUser>("user", { required: true })

const props = defineProps<{
  weapon: Weapon
  isBought?: boolean
}>()
const { weapon, isBought } = toRefs(props)

const loading = ref(false)

const buyWeapon = async (weaponToBuy: WeaponId) => {
  loading.value = true
  const { gold: newGoldBalance, weapon: newWeaponId } = await $fetch("/api/weapon/buy", { method: "POST", body: { weapon: weaponToBuy } }).finally(
    () => (loading.value = false),
  )

  user.value.gold = newGoldBalance
  user.value.weapon = newWeaponId
  user.value.weaponsBought.push(weaponToBuy)
}

const equipWeapon = async (weaponToEquip: WeaponId) => {
  loading.value = true
  const { weapon: newWeaponId } = await $fetch("/api/weapon/equip", { method: "POST", body: { weapon: weaponToEquip } }).finally(() => (loading.value = false))

  user.value.weapon = newWeaponId
}
</script>
