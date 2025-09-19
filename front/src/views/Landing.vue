<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router'
import { useAuthStore } from "@/stores/auth.js";
import AuthTabs from '@/components/lading/AuthTabs.vue';

const authStore = useAuthStore()
const router = useRouter()

const appStyle = computed(() => {
  return {
    background: 'linear-gradient(90deg, rgba(39, 16, 156, 1) 0%, rgba(0, 102, 212, 1) 25%, rgba(0, 225, 255, 1) 100%)',
    minHeight: '100vh'
  };
});

const handleLogin = async (credentials) => {
  try {
    await authStore.login(credentials)
    await router.push('/home')
  } catch {
    alert('Invalid username or password')
  }
};

const handleSignup = async (userData) => {
  try {
    await authStore.signup(userData)
    await router.push('/home')
  } catch {
    alert('Signup failed')
  }
};

</script>

<template>
  <v-app :style="appStyle">
    <v-container fluid class="fill-height pa-0">
      <v-row no-gutters align="center" justify="center" class="fill-height">
        <v-col cols="12" sm="8" md="6" lg="4" xl="3">
          <AuthTabs
              @login="handleLogin"
              @signup="handleSignup"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app>

</template>

<style scoped>

.fill-height {
  min-height: 100vh;
}

</style>