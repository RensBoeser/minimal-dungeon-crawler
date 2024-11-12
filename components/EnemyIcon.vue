<template>
  <UPopover mode="hover">
    <img v-bind="$attrs" width="24px" class="object-contain" :src="enemy.icon" :alt="$t(`enemies.${enemy.id}.name`)" />

    <template #panel>
      <div class="p-3 w-56 text-sm">
        <div class="flex gap-3 items-start">
          <img width="32px" class="mb-2 object-contain" :src="enemy.icon" :alt="$t(`enemies.${enemy.id}.name`)" />
          <div>
            <h1 class="font-medium">{{ $t(`enemies.${enemy.id}.name`) }}</h1>
            <p class="text-xs">{{ $t(`enemies.${enemy.id}.description`) }}</p>

            <div v-if="Array.isArray(enemy.class)" class="mt-1 flex flex-wrap gap-1">
              <EnemyClassTag v-for="enemyClass of enemy.class" :key="enemyClass" :enemy-class-id="enemyClass" />
            </div>
            <div v-else class="mt-1">
              <EnemyClassTag :enemy-class-id="enemy.class" />
            </div>
          </div>
        </div>

        <UDivider class="mt-2">{{ $t("ui.general.stats") }}</UDivider>

        <table class="w-full">
          <tbody>
            <tr>
              <td>{{ $t("ui.enemy.xp") }}:</td>
              <td class="text-right font-mono dark:text-lime-300 text-lime-600">{{ enemy.xp }} XP</td>
            </tr>
            <tr>
              <td>{{ $t("ui.enemy.health") }}:</td>
              <td class="text-right font-mono dark:text-green-300 text-green-500">{{ enemy.health }} HP</td>
            </tr>
            <tr v-if="enemy.armor">
              <td>{{ $t("ui.enemy.armor") }}:</td>
              <td class="text-right font-mono text-blue-400">{{ enemy.armor }}</td>
            </tr>
            <tr v-if="enemy.blockChance">
              <td>{{ $t("ui.enemy.blockChance") }}:</td>
              <td class="text-right font-mono">{{ enemy.blockChance * 100 }}%</td>
            </tr>
          </tbody>
        </table>

        <UDivider class="mt-2">{{ $t("ui.enemy.drops") }}</UDivider>

        <div class="flex flex-wrap gap-1 mt-2 justify-center">
          <DropIcon v-for="lootTableItem of enemy.lootTable" :key="lootTableItem.item" :enemy-drop-id="lootTableItem.item" disabled />
        </div>
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
const props = defineProps<{ dungeonId: DungeonId; enemyId: EnemyId }>()
const { enemyId, dungeonId } = toRefs(props)

const dungeon = computed(() => {
  return dungeons.find((dungeon) => dungeon.id === dungeonId.value)!
})

const enemy = computed(() => {
  return dungeon.value.enemies.find((enemy) => enemy.id === enemyId.value)!
})
</script>
