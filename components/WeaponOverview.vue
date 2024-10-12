<template>
  <UCard>
    <template #header>
      <h1 class="text-xl">{{ $t("ui.weapons.title") }}</h1>
    </template>

    <div class="flex flex-col gap-1">
      <shop-item
        v-for="weapon of weapons"
        :key="weapon.id"
        :cost="weapon.cost"
        :user-gold="user.gold"
        :is-bought="user.weaponsBought.includes(weapon.id)"
        :equipped="weapon.id === user.weapon"
        :src="weapon.icon"
        :title="$t(`weapons.${weapon.id}.name`)"
        :disabled="loading"
        @buy="() => buyWeapon(weapon.id)"
        @equip="() => equipWeapon(weapon.id)"
      >
        <template #info>
          <WeaponPopoverPanel :weapon="weapon" />
        </template>
      </shop-item>
    </div>
  </UCard>
</template>

<script setup lang="ts">
const user = defineModel<DatabaseUser>("user", { required: true })

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
