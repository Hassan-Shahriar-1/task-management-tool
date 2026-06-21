<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
    <div class="absolute inset-0 bg-black/60" @click="close"></div>

    <div
      class="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl"
    >
      <div
        class="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-5"
      >
        <div>
          <p class="text-2xs uppercase tracking-[0.24em] text-slate-500">Create task</p>
          <h2 class="mt-2 text-3xl font-bold text-white">New issue</h2>
        </div>
        <button
          type="button"
          class="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-900"
          @click="close"
        >
          Close
        </button>
      </div>

      <div class="p-6">
        <CreateTaskForm
          :status="status"
          :project-id="projectId"
          :projects="projects"
          :users="users"
          :priorities="priorities"
          :statuses="statuses"
          :task-types="taskTypes"
          @cancel="close"
          @create="createTask"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import CreateTaskForm from './CreateTaskForm.vue'

const props = defineProps({
  status: { type: String, default: null },
  projectId: { type: [String, Number], default: null },
  projects: { type: Array, default: () => [] },
  users: { type: Array, default: () => [] },
  priorities: { type: Array, default: () => ['High', 'Medium', 'Low'] },
  statuses: { type: Array, default: () => [] },
  taskTypes: { type: Array, default: () => [] },
})

const emit = defineEmits(['close', 'create'])

function close() {
  emit('close')
}

function createTask(task) {
  emit('create', task)
}
</script>

<style scoped></style>
