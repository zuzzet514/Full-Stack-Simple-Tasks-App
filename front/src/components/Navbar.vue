<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <v-app-bar
      color="black"
      dark
      flat
      height="60"
      style="position: fixed; top: 0; width: 100%; z-index: 10;"
  >
    <v-app-bar-title>Tasks</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-menu>
      <template #activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon size="36">mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>
            {{ authStore.token ? "Logged in" : "Guest" }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>



<style scoped>

</style>