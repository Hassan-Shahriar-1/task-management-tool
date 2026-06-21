<template>
  <div class="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
    <div class="mb-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <section
        class="space-y-6 rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-lg shadow-slate-950/20"
      >
        <div class="space-y-3">
          <p class="text-2xs uppercase tracking-[0.24em] text-slate-500">Create task</p>
          <h1 class="text-4xl font-extrabold tracking-tight text-white">Create a new issue</h1>
          <p class="max-w-xl text-sm leading-6 text-slate-400">
            Use this page to create a full task with project selection, status, priority, and a
            detailed description. It is designed as a separate Jira-style page, not a popup modal.
          </p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="rounded-3xl bg-slate-900 p-4">
            <p class="text-2xs uppercase tracking-[0.24em] text-slate-500">Why use this page?</p>
            <ul class="mt-4 space-y-3 text-sm text-slate-300">
              <li class="flex gap-2">
                <span class="text-emerald-400">•</span> Add task details with more room and clarity.
              </li>
              <li class="flex gap-2">
                <span class="text-emerald-400">•</span> Select project and status directly on the
                page.
              </li>
              <li class="flex gap-2">
                <span class="text-emerald-400">•</span> Better experience for longer descriptions.
              </li>
            </ul>
          </div>

          <div class="rounded-3xl bg-slate-900 p-4">
            <p class="text-2xs uppercase tracking-[0.24em] text-slate-500">Quick links</p>
            <div class="mt-4 space-y-2 text-sm text-slate-300">
              <router-link
                to="/"
                class="block rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-900"
              >
                Back to board
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <CreateTaskForm
          :status="statuses[0]"
          :project-id="projects[0]?.id"
          :projects="projects"
          :users="users"
          :priorities="Object.keys(priorityMeta)"
          :statuses="statuses"
          :task-types="taskTypes"
          @cancel="goBack"
          @create="handleCreate"
        />
      </section>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import CreateTaskForm from '../components/Task/CreateTaskPage.vue'
import { useTasks } from '../composables/useTasks.js'
import { projects } from '../data/projects.js'
import { users } from '../data/users.js'
import { statuses, priorityMeta, taskTypes } from '../data/statuses.js'

const router = useRouter()
const { addTask } = useTasks()

function goBack() {
  router.push('/')
}

function handleCreate(task) {
  addTask(task)
  router.push('/')
}
</script>
