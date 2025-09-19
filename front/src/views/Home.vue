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
  <v-container>
    <v-app-bar color="primary" dark>
      <v-app-bar-title>Tasks</v-app-bar-title>
      <v-spacer />
      <v-menu>
        <template #activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>{{ authStore.token ? "Logged in" : "Guest" }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-container>
      <h2>My Tasks</h2>
    </v-container>
  </v-container>
</template>
