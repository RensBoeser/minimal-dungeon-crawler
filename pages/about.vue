<template>
  <div class="flex flex-col items-center">
    <div class="flex flex-col gap-4">
      <UButton to="/" label="Back" variant="outline" icon="i-heroicons-chevron-left-20-solid" class="self-start" />

      <h1 class="text-3xl">Technologies</h1>

      <UDivider />

      <section class="flex">
        <div class="mr-4 mt-2">
          <UIcon name="i-unjs:nitro" class="text-4xl text-gray-400" />
        </div>
        <div>
          <h2 class="text-xl">Nitro backend + Typescript</h2>
          <p>Backend built with Nitro using Typescript.</p>
        </div>
      </section>

      <section class="flex">
        <div class="mr-4 mt-2">
          <UIcon name="vscode-icons:file-type-nuxt" class="text-4xl" />
        </div>
        <div>
          <h2 class="text-xl">Vue.js 3 + Nuxt.js 3 + Typescript</h2>
          <p>Frontend built with Vue.js 3 and Nuxt.js 3 using Typescript.</p>
        </div>
      </section>

      <section class="flex">
        <div class="mr-4 mt-2">
          <UIcon name="i-simple-icons:vercel" class="text-4xl" />
        </div>
        <div>
          <h2 class="text-xl">Cloud deployment using Vercel</h2>
          <p>Deployed on Vercel with automatic deployments on push to main.</p>
        </div>
      </section>

      <section class="flex">
        <div class="mr-4 mt-2">
          <UIcon name="i-simple-icons-github" class="text-4xl" />
        </div>
        <div>
          <h2 class="text-xl">GitHub OAuth login</h2>
          <p>Sign in with your GitHub account to save your progress.</p>
          <p>Stay logged out and play as a guest with a cookie as user id.</p>
        </div>
      </section>

      <section class="flex">
        <div class="mr-4 mt-2">
          <UIcon name="i-material-symbols:translate-rounded" class="text-4xl" />
        </div>
        <div>
          <h2 class="text-xl">i18n support</h2>
          <p>Internationalization support using Vue I18n.</p>
        </div>
      </section>

      <section class="flex">
        <div class="mr-4 mt-2">
          <UIcon name="i-vscode-icons:file-type-nuxt" class="text-4xl text-gray-400" />
        </div>
        <div>
          <h2 class="text-xl">Nuxt UI component library + Tailwind.css</h2>
          <p>UI components built with Nuxt UI.</p>
          <p>Responsive design using Tailwind.css with light and dark theme support.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
