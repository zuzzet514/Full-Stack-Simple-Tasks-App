<script setup>
import { ref } from 'vue';
import AuthForm from './AuthForm.vue';

const emit = defineEmits(['login', 'signup']);
const tab = ref('login');
</script>

<template>
  <v-card class="auth-tabs-wrapper">
    <v-tabs
        v-model="tab"
        bg-color="primary"
        center-active
        grow
    >
      <v-tab value="login">Login</v-tab>
      <v-tab value="signup">Sign Up</v-tab>
    </v-tabs>

    <v-card-text class="pa-6">
      <v-window v-model="tab">
        <v-window-item value="login">
          <AuthForm
              :is-signup="false"
              @toggle-mode="tab = 'signup'"
              @submit="emit('login', $event)"
          />
        </v-window-item>

        <v-window-item value="signup">
          <AuthForm
              :is-signup="true"
              @toggle-mode="tab = 'login'"
              @submit="emit('signup', $event)"
          />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.auth-tabs-wrapper {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
</style>