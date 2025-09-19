<script setup>
import { ref, reactive } from 'vue';

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const errorMessage = ref('');

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
  errorMessage.value = '';

  if (props.isSignup && formData.password !== formData.confirmPassword) {
    errorMessage.value = 'Passwords do not match';
    return;
  }

  emit('submit', { username: formData.username, password: formData.password });

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
        :type="showPassword ? 'text' : 'password'"
        label="Password"
        required
        variant="outlined"
        class="mb-4"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="showPassword = !showPassword"
    ></v-text-field>

    <v-text-field
        v-if="props.isSignup"
        v-model="formData.confirmPassword"
        :type="showConfirmPassword ? 'text' : 'password'"
        label="Confirm Password"
        required
        variant="outlined"
        class="mb-4"
        :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="showConfirmPassword = !showConfirmPassword"
        :error="!!errorMessage"
        :error-messages="errorMessage"
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