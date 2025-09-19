<script setup>
import { computed, onMounted } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import TaskCard from '@/components/tasks/TaskCard.vue'
import AddTaskForm from '@/components/tasks/AddTaskForm.vue'
import Navbar from "@/components/Navbar.vue";

const tasksStore = useTasksStore()

// Fetch tasks when the page loads
onMounted(async () => {
  await tasksStore.fetchTasks()
})

// Background style
const appStyle = computed(() => ({
  background: 'linear-gradient(90deg, rgba(39, 16, 156, 1) 0%, rgba(0, 102, 212, 1) 25%, rgba(0, 225, 255, 1) 100%)',
  minHeight: '100vh',
  padding: '2rem'
}))
</script>

<template>
  <v-app :style="appStyle">
    <Navbar/>



    <v-container fluid style="padding-top: 80px;">

      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <!-- Add Task Form -->
          <AddTaskForm />

          <!-- Task List -->
          <div v-if="tasksStore.tasks.length">
            <TaskCard
                v-for="task in tasksStore.tasks"
                :key="task._id"
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
