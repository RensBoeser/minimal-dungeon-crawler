<template>
  <UPopover mode="hover">
    <img width="24px" class="object-contain" :src="weapon.icon" :alt="$t(`weapons.${weapon.id}.name`)" />

    <template #panel>
      <WeaponPopoverPanel :weapon="weapon" />
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
