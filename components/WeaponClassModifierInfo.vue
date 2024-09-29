<template>
  <tr>
    <td v-for="modifier in Object.keys(modifiers)" :key="modifier" class="text-right font-mono">
      {{ modifier }}: {{ modifiers[modifier] }}
    </td>
  </tr>
  
</template>

<script setup lang="ts">
const props = defineProps<{ modifiers: Record<string, number> }>()
const { modifiers } = toRefs(props)
</script>