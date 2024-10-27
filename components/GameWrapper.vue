<template>
  <div v-if="user" class="flex flex-wrap gap-4 mb-12">
    <UserDetails v-model:user="user" class="w-96 flex-grow" />

    <DungeonRunner v-model:user="user" class="w-96 flex-grow" />

    <div class="flex flex-col gap-4 w-80 flex-grow">
      <DungeonViewer />
      <WeaponOverview v-model:user="user" class="flex-1" />
    </div>
  </div>

  <div v-else class="flex items-center justify-center h-full">Loading...</div>
</template>

<script setup lang="ts">
import type { DatabaseUser } from "~/server/utils/user"

const { data: user } = useFetch<DatabaseUser>("/api/inventory")
</script>
