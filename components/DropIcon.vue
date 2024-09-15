<template>
  <UPopover mode="hover">
    <img width="20px" class="object-contain" :src="enemyDrop.icon" :alt="$t(`drops.${enemyDropId}.name`)" />

    <template #panel>
      <div class="p-2 max-w-56 text-sm">
        <img width="20px" class="object-contain" :src="enemyDrop.icon" :alt="$t(`drops.${enemyDropId}.name`)" />
        <h1>{{ $t(`drops.${enemyDropId}.name`) }}</h1>
        <p class="text-xs">{{ $t(`drops.${enemyDropId}.description`) }}</p>

        <UDivider class="mt-2">{{ $t('ui.general.stats')}}</UDivider>

        <table class="w-full">
          <tbody>
            <tr>
              <td>{{ $t('ui.drop.sellValue') }}:</td>
              <td class="text-right font-mono">
                <span>{{ enemyDrop.goldValue }}</span>
                <img width="20px" class="object-contain inline pl-1" src="~/public/gameplay/gold.webp" alt="Gold" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
const props = defineProps<{ enemyDropId: EnemyDropId }>()
const { enemyDropId } = toRefs(props)

const enemyDrop = computed(() => {
  return drops.find((drop) => drop.id === enemyDropId.value)!
})
</script>