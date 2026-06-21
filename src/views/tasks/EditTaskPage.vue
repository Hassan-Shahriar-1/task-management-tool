<template>
  <div class="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
    <div class="mb-8">
      <router-link
        to="/"
        class="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-all"
      >
        <svg
          class="h-4 w-4 stroke-2 group-hover:-translate-x-0.5 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Go back
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
