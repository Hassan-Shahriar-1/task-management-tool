<template>
  <div class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
    <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-2xs tracking-[0.24em] text-slate-500">Edit task</p>
        <h1 class="mt-3 text-4xl font-extrabold tracking-tight text-white">Edit issue</h1>
      </div>
      <router-link
        to="/"
        class="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800"
      >
        Back to board
      </router-link>
    </div>

    <div class="rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/10">
      <CreateTaskForm
        v-if="task"
        :task="task"
        :project-id="task.projectId"
        :projects="projects"
        :users="users"
        :priorities="Object.keys(priorityMeta)"
        :statuses="statuses"
        :task-types="taskTypes"
        submit-label="Save changes"
        @cancel="goBack"
        @update="handleUpdate"
      />
      <div v-else class="text-slate-400">Loading task...</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CreateTaskForm from '../../components/Task/CreateTaskForm.vue'
import { useTasks } from '../../composables/useTasks.js'
import { projects } from '../../data/projects.js'
import { users } from '../../data/users.js'
import { statuses, priorityMeta, taskTypes } from '../../data/statuses.js'

const route = useRoute()
const router = useRouter()
const { tasks, updateTask } = useTasks()

const task = computed(() => tasks.value.find((item) => item.id === route.params.id))
const projectId = computed(() => task.value?.projectId)

function goBack() {
  router.push('/')
}

function handleUpdate(updatedTask) {
  updateTask(updatedTask)
  router.push('/')
}
</script>
