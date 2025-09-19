<script setup>
import { ref } from 'vue'
import { useTasksStore } from '@/stores/tasks'

const tasksStore = useTasksStore()
const newTaskTitle = ref('')

// Add new task
const addTask = async () => {
  if (newTaskTitle.value.trim() === '') return
  await tasksStore.addTask({ title: newTaskTitle.value, status: false })
  newTaskTitle.value = ''
}
</script>

<template>
  <div class="mb-4 d-flex">
    <v-text-field
        v-model="newTaskTitle"
        label="New Task"
        outlined
        dense
        hide-details
        class="flex-grow-1"
        @keyup.enter="addTask"
        style="background-color: rgba(255, 255, 255, 0.1); border-radius: 4px;"
    />
    <v-btn color="primary" @click="addTask" class="ml-2">Add Task</v-btn>
  </div>
</template>


<style scoped>

</style>