<template>
  <UDropdown :items="items">
    <UAvatar :chip-color="loggedIn ? undefined : 'orange'" icon="i-material-symbols:person" />

    <template #account="{ item }">
      <div class="text-left">
        <p v-if="loggedIn">Signed in as</p>
        <p class="truncate font-medium text-gray-900 dark:text-white">{{ item.label }}</p>
        <p v-if="!loggedIn" class="mt-1 italic">Please sign in to keep your progress safe</p>
      </div>
    </template>
  </UDropdown>
</template>

<script setup lang="ts">
import type { UDropdown } from "#build/components"

const { loggedIn, session, clear } = useUserSession()

const items = computed((): InstanceType<typeof UDropdown>["items"] => [
  [
    {
      label: session.value.user?.login ?? "Not signed in",
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "About",
      icon: "i-heroicons-book-open",
      to: "/about",
    },
    {
      label: "Code",
      icon: "i-heroicons-code-bracket",
      to: "https://github.com/RensBoeser/minimal-dungeon-crawler",
      external: true,
    },
  ],
  loggedIn.value
    ? [
        {
          label: "Sign out",
          icon: "i-mdi:logout",
          click: clear,
        },
      ]
    : [
        {
          label: "Sign in with github",
          icon: "i-simple-icons-github",
          slot: "login",
          to: "/api/auth/github",
          external: true,
        },
      ],
])
</script>
