<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import TaskCard from '@/components/tasks/TaskCard.vue'

const tasksStore = useTasksStore()
const newTaskTitle = ref('')

// Fetch tasks when the page loads
onMounted(async () => {
  await tasksStore.fetchTasks()
})

// Add new task
const addTask = async () => {
  if (newTaskTitle.value.trim() === '') return
  await tasksStore.addTask({ title: newTaskTitle.value, status: false })
  newTaskTitle.value = ''
}

// Background style
const appStyle = computed(() => ({
  background: 'linear-gradient(90deg, rgba(39, 16, 156, 1) 0%, rgba(0, 102, 212, 1) 25%, rgba(0, 225, 255, 1) 100%)',
  minHeight: '100vh',
  padding: '2rem'
}))
</script>

<template>
  <v-app :style="appStyle">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <!-- New Task Input -->
          <v-text-field
              v-model="newTaskTitle"
              label="New Task"
              outlined
              dense
              hide-details
              @keyup.enter="addTask"
          />
          <v-btn class="mb-4" color="primary" @click="addTask">Add Task</v-btn>

          <!-- Task List -->
          <div v-if="tasksStore.tasks.length">
            <TaskCard
                v-for="task in tasksStore.tasks"
                :key="task.id"
                :task="task"
            />
          </div>
          <div v-else class="text-white text-center mt-6">
            No tasks yet
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
.text-white {
  color: white;
}
</style>
