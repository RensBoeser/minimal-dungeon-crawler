<template>
  <UPopover mode="hover">
    <img width="20px" class="object-contain" :src="weapon.icon" :alt="$t(`weapons.${weapon.id}.name`)" />

    <template #panel>
      <div class="p-3 w-56 text-sm">
        <img width="32px" class="mb-2 object-contain" :src="weapon.icon" :alt="$t(`weapons.${weapon.id}.name`)" />
        <h1>{{ $t(`weapons.${weapon.id}.name`) }}</h1>
        <p class="text-xs">{{ $t(`weapons.${weapon.id}.description`) }}</p>

        <UDivider class="mt-2">{{ $t("ui.general.stats") }}</UDivider>

        <table class="w-full">
          <tbody>
            <tr>
              <td>{{ $t("ui.weapon.damage") }}:</td>
              <td class="text-right font-mono">{{ weapon.damage }}</td>
            </tr>

            <tr v-if="weapon.criticalChance">
              <td>{{ $t("ui.weapon.criticalChance") }}:</td>
              <td class="text-right font-mono">{{ weapon.criticalChance }}%</td>
            </tr>

            <tr v-if="weapon.criticalMultiplier">
              <td>{{ $t("ui.weapon.criticalMultiplier") }}:</td>
              <td class="text-right font-mono">{{ weapon.criticalMultiplier }}x</td>
            </tr>

            <tr>
              <td>{{ $t("ui.weapon.staminaCost") }}:</td>
              <td class="text-right font-mono">{{ weapon.staminaCost }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
const props = defineProps<{ weaponId: WeaponId }>()
const { weaponId } = toRefs(props)

const weapon = computed(() => {
  return weapons.find((weapon) => weapon.id === weaponId.value)!
})
</script>
