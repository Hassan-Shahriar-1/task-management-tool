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
          class="rounded-xl border border-slate-850 bg-slate-950 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-900 hover:text-white transition-all cursor-pointer"
          @click="close"
        >
          Close
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
