<script setup>
import { ref, watch } from 'vue'
import { useTasksStore } from '@/stores/tasks'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const tasksStore = useTasksStore()

const isEditing = ref(false)
const editedTitle = ref(props.task.title)

const localStatus = ref(props.task.status)

// Keep editedTitle in sync if task updates from backend
watch(() => props.task.title, (newTitle) => {
  editedTitle.value = newTitle
})

watch(localStatus, async (newStatus, oldStatus) => {
  if (newStatus !== oldStatus) {
    try {
      await tasksStore.updateTask(props.task._id, { status: newStatus })
    } catch (err) {
      console.error('Error updating task status:', err)
      localStatus.value = oldStatus // revert if API fails
    }
  }
})

watch(() => props.task.status, (newStatus) => {
  localStatus.value = newStatus
})

// Toggle status (completed)
const toggleStatus = async () => {
  try {
    const updatedStatus = !localStatus.value
    localStatus.value = updatedStatus
    await tasksStore.updateTask(props.task._id, { status: updatedStatus })
  } catch (err) {
    console.error('Error updating task:', err)
    // revert UI if error
    localStatus.value = props.task.status
  }
}

// Save edited title
const saveTitle = async () => {
  if (editedTitle.value.trim() === '') return
  try {
    await tasksStore.updateTask(props.task._id, {title: editedTitle.value})
    isEditing.value = false
  } catch (err) {
    console.error('Error updating task title:', err)
  }
}

// Delete task
const deleteTask = async () => {
  try {
    await tasksStore.deleteTask(props.task._id)
  } catch (err) {
    console.error('Error deleting task:', err)
  }
}
</script>

<template>
  <v-card class="mb-3">
    <v-card-text class="d-flex align-center justify-space-between">
      <!-- Checkbox for status -->
      <v-checkbox
          v-model="localStatus"
          :label="''"
      ></v-checkbox>

      <!-- Title / Edit Input -->
      <div class="flex-grow-1">
        <v-text-field
            v-if="isEditing"
            v-model="editedTitle"
            dense
            hide-details
            @keyup.enter="saveTitle"
            @blur="saveTitle"
        />
        <span
            :class="{ 'text-decoration-line-through': localStatus }"
        >
            {{ props.task.title }}
        </span>
      </div>

      <!-- Menu for Edit/Delete -->
      <v-menu>
        <template #activator="{ props: menuProps }">
          <v-btn icon v-bind="menuProps">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="isEditing = true">
            <v-list-item-title>Edit</v-list-item-title>
          </v-list-item>
          <v-list-item @click="deleteTask">
            <v-list-item-title>Delete</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.text-decoration-line-through {
  text-decoration: line-through;
}
</style>
