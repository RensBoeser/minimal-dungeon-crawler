<template>
  <div>
    <UButton to="/" label="Back" variant="outline" icon="i-heroicons-chevron-left-20-solid" />

    <UCard class="mt-6">
      <template #header>
        <h1 class="text-xl">Features</h1>
      </template>
      <ul>
        <li>GitHub OAuth login</li>
        <li>Inventory system</li>
        <li>Weapon shop</li>
        <li>Experience system</li>
        <li>Enemy drops</li>
        <li>Dark mode</li>
        <li>Language switch</li>
      </ul>
    </UCard>
  </div>
</template>

<script setup lang="ts"></script>
