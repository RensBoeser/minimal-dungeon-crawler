<template>
  <UDropdown :items="items">
    <UAvatar :chip-color="loggedIn ? undefined : 'orange'" icon="i-material-symbols:person" :src="user?.avatar_url" />

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

const { loggedIn, user, clear } = useUserSession()

const $router = useRouter()

const items = computed((): InstanceType<typeof UDropdown>["items"] => [
  [
    {
      label: user.value?.login ?? "Not signed in",
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
          icon: "i-heroicons-arrow-left-on-rectangle",
          click: async () => {
            await clear()
            $router.go(0)
          },
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
