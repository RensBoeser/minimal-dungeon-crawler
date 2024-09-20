<script setup>
const { loggedIn, user, clear } = useUserSession()
</script>

<template>
  <div v-if="loggedIn">
    {{ user.login }} ({{ user.id }})
    <UButton @click="clear">Logout</UButton>
  </div>
  <div v-else>
    <h1>Not logged in</h1>
    <UButton to="/api/auth/github" icon="i-simple-icons-github" label="Login with GitHub" color="black" external />
  </div>
</template>
