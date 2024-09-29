<template>
  <UCard>
    <template #header>
      <h1 class="text-xl">{{ $t("ui.weapons.title") }}</h1>
    </template>

    <div class="flex flex-wrap gap-2">
      <WeaponItem v-for="weapon of weapons" :key="weapon.id" v-model:user="user" :weapon="weapon" :is-bought="user.weaponsBought.includes(weapon.id)" />
    </div>
  </UCard>
</template>

<script setup lang="ts">
const user = defineModel<DatabaseUser>("user", { required: true })
</script>
