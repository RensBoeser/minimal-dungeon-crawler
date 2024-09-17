<template>
  <UCard>
    <template #header>
      <h1 class="text-xl">{{ $t("ui.dungeonPicker.title") }}</h1>
    </template>

    <ul>
      <li>
        <span>{{ $t("ui.dungeonPicker.name") }}:</span>
        <UIcon class="inline-block mx-1" size="18" name="i-game-icons:crypt-entrance" />
        <span class="font-bold">{{ $t(`dungeons.${dungeon.id}.name`) }}</span>
      </li>

      <li class="text-sm text-gray-400 mb-2">{{ $t(`dungeons.${dungeon.id}.description`) }}</li>

      <li>
        <span>{{ $t("ui.dungeonPicker.enemies") }}:</span>
        <div class="flex flex-wrap gap-1">
          <enemy-icon v-for="enemy of dungeon.enemies" :key="enemy.id" :dungeon-id="dungeon.id" :enemy-id="enemy.id" />
        </div>
      </li>
    </ul>
  </UCard>
</template>

<script setup lang="ts">
const dungeon = dungeons[0]
</script>
