<template>
  <div class="py-2 flex gap-2 items-start">
    <h1 class="text-xl">Virtual Dungeon Crawler</h1>

    <div class="flex-1" />

    <LangSwitch />
    <ColorSwitch />
    <UButton to="https://github.com/RensBoeser/minimal-dungeon-crawler" icon="i-simple-icons-github" color="gray" variant="ghost" external />

    <AccountDropdown class="ml-1" />
  </div>
</template>

<script setup lang="ts"></script>
