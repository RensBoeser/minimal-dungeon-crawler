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

      <li class="flex gap-1">
        <span>{{ $t("ui.user.weapon") }}:</span>
        <weapon-icon :weapon-id="user.weapon" />
        <span class="font-bold">{{ $t(`weapons.${user.weapon}.name`) }}</span>
      </li>
    </ul>
  </UCard>
</template>

<script setup lang="ts">
const user = defineModel<DatabaseUser>("user", { required: true })

const userLevel = computed(() => getLevel(user.value.experience))
const nextLevel = computed(() => getNextLevel(user.value.experience))
</script>
