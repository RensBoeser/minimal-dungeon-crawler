<template>
  <tbody>
    <td v-for="modifier in Object.keys(modifiers)" :key="modifier" class="text-right font-mono">
      <tr>{{ modifier }}: {{ modifiers[modifier] }} </tr>
    </td>
  </tbody>
</template>

<script setup lang="ts">
const props = defineProps<{ modifiers: Record<string, number> }>()
const { modifiers } = toRefs(props)
</script>