<template>
  <UDropdown :items="items">
    <UAvatar :chip-color="loggedIn ? undefined : 'orange'" icon="i-material-symbols:person" :src="user?.generic.avatarUrl" />

    <template v-if="loggedIn" #account>
      <UAvatar v-if="user?.generic.avatarUrl" icon="i-material-symbols:person" :src="user.generic.avatarUrl" />

      <div class="text-left">
        <p class="truncate max-w-28">{{ user?.generic.username }}</p>
        <p class="truncate text-gray-400 max-w-28">{{ user?.generic.name }}</p>
      </div>

      <UIcon v-if="user?.generic.provider === 'github'" class="ml-auto" name="i-simple-icons:github" />
      <UIcon v-else-if="user?.generic.provider === 'discord'" class="ml-auto dark:text-indigo-400 text-indigo-400" name="i-simple-icons:discord" />
    </template>

    <template v-else #account="{ item }">
      <div class="text-left">
        <p>{{ item.label }}</p>
        <p class="text-xs text-gray-400">Please sign in to keep your progress safe</p>
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
      label: user.value?.generic.username ?? "Not signed in",
      slot: "account",
      disabled: true,
      class: "opacity-100 cursor-default",
    },
  ],
  [
    {
      label: "Code",
      icon: "i-heroicons-code-bracket",
      to: "https://github.com/RensBoeser/minimal-dungeon-crawler",
      external: true,
      target: "_blank",
    },
    {
      label: "Idea board",
      icon: "i-heroicons-book-open",
      to: "https://app.mural.co/t/rensie2960/m/rensie2960/1726247740200/4da1d3056cba2761efbca2f9ccdf46b8b6889d9f?sender=u5ca2d578e94fdf6f9e224957",
      external: true,
      target: "_blank",
    },
    {
      label: "About",
      icon: "i-heroicons-information-circle",
      to: "/about",
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
          label: "Sign in with Discord",
          icon: "i-simple-icons:discord",
          iconClass: "dark:text-indigo-400 text-indigo-400",
          slot: "login",
          to: "/api/auth/discord",
          external: true,
        },
        {
          label: "Sign in with Github",
          icon: "i-simple-icons:github",
          iconClass: "dark:text-white text-black",
          slot: "login",
          to: "/api/auth/github",
          external: true,
        },
      ],
  [
    {
      label: "Reset progress",
      icon: "i-heroicons-trash",
      labelClass: "text-red-500",
      iconClass: "dark:text-red-500 text-red-500",
      click: async () => {
        await resetProgress()
        $router.go(0)
      },
    },
  ],
])

const resetProgress = async () => {
  await $fetch("/api/game/reset", { method: "POST" })
}
</script>
