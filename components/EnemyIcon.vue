<template>
  <UPopover v-if="enemy" mode="hover">
    <img width="20px" class="object-contain" :src="enemy.icon" :alt="$t(`enemies.${enemy.id}.name`)" />

    <template #panel>
      <div class="p-2 max-w-56 text-sm">
        <img width="20px" class="object-contain" :src="enemy.icon" :alt="$t(`enemies.${enemy.id}.name`)" />
        <h1>{{ $t(`enemies.${enemy.id}.name`) }}</h1>
        <p class="text-xs">{{ $t(`enemies.${enemy.id}.description`) }}</p>

        <UDivider class="mt-2">{{ $t('ui.general.stats')}}</UDivider>

        <table class="w-full">
          <tbody>
            <tr>
              <td>{{ $t('ui.enemy.xp') }}</td>
              <td class="text-right font-mono">{{ enemy.xp }} XP</td>
            </tr>
            <tr>
              <td>{{ $t('ui.enemy.health') }}</td>
              <td class="text-right font-mono">{{ enemy.health }} HP</td>
            </tr>
            <tr>
              <td>{{ $t('ui.enemy.armor') }}</td>
              <td class="text-right font-mono">{{ enemy.armor }}</td>
            </tr>
          </tbody>
        </table>

        <UDivider class="mt-2">{{ $t('ui.enemy.drops')}}</UDivider>

        <div class="flex flex-wrap gap-1 mt-1">
          <DropIcon
            v-for="lootTableItem of enemy.lootTable"
            :key="lootTableItem.item"
            :enemy-drop-id="lootTableItem.item"
            disabled
          />
        </div>
      </div>
    </template>
  </UPopover>

  <span v-else>ERROR LOADING DROP</span>
</template>

<script setup lang="ts">
const props = defineProps<{ dungeonId: DungeonId, enemyId: EnemyId }>()
const { enemyId, dungeonId } = toRefs(props)

const dungeon = computed(() => {
  return dungeons.find((dungeon) => dungeon.id === dungeonId.value)
})

const enemy = computed(() => {
  return dungeon.value?.enemies.find((enemy) => enemy.id === enemyId.value)
})
</script>