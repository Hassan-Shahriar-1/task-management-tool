<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
    <div class="absolute inset-0 bg-black/60" @click="close"></div>

    <div
      class="relative w-full max-w-4xl max-h-[calc(100vh-4rem)] flex flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl"
    >
      <div
        class="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-3.5 flex-shrink-0"
      >
        <div>
          <h2 class="text-base font-bold text-white flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
            Create Task
          </h2>
        </div>
        <button
          type="button"
          @click="close"
          class="rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 p-1.5 transition-all cursor-pointer"
          title="Close"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="p-6 overflow-y-auto flex-grow">
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

defineProps({
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
