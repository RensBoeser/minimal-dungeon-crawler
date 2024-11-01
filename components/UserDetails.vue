<template>
  <UCard>
    <ul>
      <li class="text-sm flex gap-1">
        <span>{{ $t("ui.user.gold") }}:</span>

        <u-divider class="flex-1 mx-2" />

        <span class="font-mono text-yellow-300">{{ $n(user.gold) }}</span>
        <img width="20px" style="margin-left: 1px" src="/gameplay/gold.webp" alt="Gold" class="inline-block" />
      </li>

      <li>
        <div class="flex gap-1 text-sm">
          <span>{{ $t("ui.user.level") }}:</span>
          <span class="font-bold">lvl {{ userLevel.level }}</span>

          <u-divider class="flex-1 mx-2" />

          <span v-if="nextLevel?.requiredXp && nextLevel.requiredXp !== Infinity" class="font-mono text-lime-300">
            {{ $n(user.experience - userLevel.requiredXp) }}/{{ $n(nextLevel.requiredXp - userLevel.requiredXp) }} {{ $t("ui.user.xp") }}
          </span>
          <span v-else class="font-mono">({{ $n(user.experience) }} {{ $t("ui.user.xp") }})</span>
        </div>

        <UProgress size="sm" color="lime" :max="nextLevel.requiredXp - userLevel.requiredXp" :value="user.experience - userLevel.requiredXp" class="mb-2" />
      </li>
    </ul>

    <div class="flex gap-4">
      <div class="flex flex-col items-center flex-1">
        <u-divider class="mt-4 mb-2">{{ $t("ui.inventory.title") }}</u-divider>

        <user-inventory v-model:user="user" />
      </div>

      <div class="flex flex-col items-center flex-1">
        <u-divider class="mt-4 mb-2">{{ $t("ui.user.weapon") }}</u-divider>

        <USelectMenu :model-value="user.weapon" :options="user.weaponsBought" @update:model-value="equipWeapon">
          <ui-item-avatar size="2xl" :src="currentWeapon?.icon">
            <template v-if="user.weaponsBought.length > 1" #default>
              <u-icon name="i-material-symbols:expand-more" size="20" class="text-white relative left-1 top-1" />
            </template>
          </ui-item-avatar>

          <template #option="{ option: weaponId }">
            <img class="object-contain inline-block mr-2" :src="weapons.find((w) => w.id === weaponId)?.icon" :alt="$t(`weapons.${weaponId}.name`)" />
          </template>
        </USelectMenu>
        <span class="mt-2 text-sm">{{ $t(`weapons.${user.weapon}.name`) }}</span>
      </div>
    </div>
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
