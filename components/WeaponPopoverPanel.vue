<template>
  <div class="p-3 w-56 text-sm">
    <div class="flex gap-3 items-start">
      <img width="32px" class="mb-2 object-contain" :src="weapon.icon" :alt="$t(`weapons.${weapon.id}.name`)" />
      <div>
        <h1 class="font-medium">{{ $t(`weapons.${weapon.id}.name`) }}</h1>
        <p class="text-xs">{{ $t(`weapons.${weapon.id}.description`) }}</p>
      </div>
    </div>

    <UDivider class="mt-2">{{ $t("ui.general.stats") }}</UDivider>

    <table class="w-full">
      <tbody>
        <tr>
          <td>{{ $t("ui.weapon.damage") }}:</td>
          <td class="text-right font-mono">{{ weapon.damage }}</td>
        </tr>

        <tr>
          <td>{{ $t("ui.weapon.staminaCost") }}:</td>
          <td class="text-right font-mono">{{ weapon.staminaCost }}</td>
        </tr>

        <tr v-if="weapon.criticalChance">
          <td>{{ $t("ui.weapon.criticalChance") }}:</td>
          <td class="text-right font-mono">{{ weapon.criticalChance * 100 }}%</td>
        </tr>

        <tr v-if="weapon.criticalMultiplier">
          <td>{{ $t("ui.weapon.criticalMultiplier") }}:</td>
          <td class="text-right font-mono">{{ weapon.criticalMultiplier.toFixed(1) }}x</td>
        </tr>
      </tbody>
    </table>

    <template v-if="weapon.classModifiers">
      <UDivider class="mt-2">{{ $t("ui.weapon.classModifiers") }}</UDivider>

      <table class="w-full">
        <thead>
          <tr class="text-gray-500">
            <td class="text-left">{{ $t("ui.enemy.class") }}</td>
            <td class="text-right">{{ $t("ui.weapon.damage") }}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="[enemyClass, value] of Object.entries(weapon.classModifiers)" :key="enemyClass">
            <td>
              <!-- prettier-ignore -->
              <EnemyClassTag :enemy-class-id="(enemyClass as EnemyClassId)" />
            </td>
            <td class="text-right font-mono">{{ value }}x</td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { EnemyClassId } from "~/utils/dungeons"

const props = defineProps<{ weapon: Weapon }>()
const { weapon } = toRefs(props)
</script>
