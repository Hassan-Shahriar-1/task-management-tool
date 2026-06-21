<template>
  <div class="mx-auto max-w-3xl px-4 py-2 sm:px-6 lg:px-8">
    <div class="mb-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
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
import CreateTaskForm from '../components/Task/CreateTaskForm.vue'
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
