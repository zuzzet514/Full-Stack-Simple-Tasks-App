<script setup>
import { ref, reactive } from 'vue';

const props = defineProps({
  isSignup: Boolean
});

const emit = defineEmits(['toggle-mode', 'submit']);

const formData = reactive({
  username: '',
  password: '',
  confirmPassword: ''
});

const submitForm = () => {
  emit('submit', { ...formData });

  // Reset form
  formData.username = '';
  formData.password = '';
  formData.confirmPassword = '';
};

</script>

<template>
  <v-form @submit.prevent="submitForm">
    <v-text-field
        v-model="formData.username"
        label="Username"
        required
        variant="outlined"
        class="mb-4"
    ></v-text-field>

    <v-text-field
        v-model="formData.password"
        label="Password"
        type="password"
        required
        variant="outlined"
        class="mb-4"
    ></v-text-field>

    <v-text-field
        v-if="isSignup"
        v-model="formData.confirmPassword"
        label="Confirm Password"
        type="password"
        required
        variant="outlined"
        class="mb-4"
    ></v-text-field>

    <v-btn
        type="submit"
        block
        size="large"
        color="primary"
        class="mt-2"
    >
      {{ isSignup ? 'Sign Up' : 'Login' }}
    </v-btn>

    <div class="text-center mt-4">
      <a
          href="#"
          @click.prevent="emit('toggle-mode')"
          class="text-primary text-decoration-none"
      >
        {{ isSignup ? 'Already have an account? Login' : 'Need an account? Sign up' }}
      </a>
    </div>
  </v-form>
</template>

<style scoped>

</style>