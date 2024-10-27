<template>
  <UCard>
    <ul class="flex-1">
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

      <li class="flex gap-1 items-center">
        <span>{{ $t("ui.user.weapon") }}:</span>
        <USelectMenu :model-value="user.weapon" :options="user.weaponsBought" @update:model-value="equipWeapon">
          <UButton variant="ghost" color="gray" trailing-icon="i-material-symbols:expand-more">
            <img width="20px" class="object-contain" :src="currentWeapon?.icon" :alt="$t(`weapons.${user.weapon}.name`)" />
            <span class="font-bold">{{ $t(`weapons.${user.weapon}.name`) }}</span>
          </UButton>

          <template #option="{ option: weaponId }">
            <span>
              <img
                width="20px"
                class="object-contain inline-block mr-2"
                :src="weapons.find((w) => w.id === weaponId)?.icon"
                :alt="$t(`weapons.${weaponId}.name`)"
              />
              <span class="font-bold">{{ $t(`weapons.${weaponId}.name`) }}</span>
            </span>
          </template>
        </USelectMenu>
      </li>
    </ul>

    <u-divider>{{ $t("ui.inventory.title") }}</u-divider>
    <user-inventory v-model:user="user" class="mt-2" />
  </UCard>
</template>

<script setup lang="ts">
const user = defineModel<DatabaseUser>("user", { required: true })

const userLevel = computed(() => getLevel(user.value.experience))
const nextLevel = computed(() => getNextLevel(user.value.experience))

const currentWeapon = computed(() => weapons.find((w) => w.id === user.value.weapon))

const loading = ref(false)

const equipWeapon = async (weaponToEquip: WeaponId) => {
  loading.value = true
  const { weapon: newWeaponId } = await $fetch("/api/weapon/equip", { method: "POST", body: { weapon: weaponToEquip } }).finally(() => (loading.value = false))

  user.value.weapon = newWeaponId
}
</script>
