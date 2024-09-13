<template>
  <div>
    <div>
      <button @click="() => setLocale('en')">en</button>
      <button @click="() => setLocale('nl')">nl</button>
      <p>{{ $t('welcome') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()
</script>