<template>
  <UPopover mode="hover">
    <img width="20px" class="object-contain" :src="enemyDrop.icon" :alt="$t(`drops.${enemyDropId}.name`)" />

    <template #panel>
      <div class="p-2 max-w-xs text-sm">
        <img width="20px" class="object-contain" :src="enemyDrop.icon" :alt="$t(`drops.${enemyDropId}.name`)" />
        <h1 class="my-1">{{ $t(`drops.${enemyDropId}.name`) }}</h1>
        <p class="text-xs">{{ $t(`drops.${enemyDropId}.description`) }}</p>

        <UDivider class="my-2"/>

        <ul>
          <li>
            <span>{{ $t('ui.drops.sellValue') }}: <span class="font-bold">{{ enemyDrop.goldValue }}</span></span>
            <img width="20px" class="object-contain inline ml-1" src="~/public/gameplay/gold.webp" alt="Gold" />
          </li>
        </ul>
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