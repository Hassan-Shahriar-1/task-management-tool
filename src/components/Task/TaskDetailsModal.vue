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
          <p class="text-2xs uppercase tracking-[0.24em] text-slate-500">Task details</p>
          <h2 class="mt-2 text-3xl font-bold text-white">{{ task.title }}</h2>
          <p class="mt-1 text-sm text-slate-400">{{ task.id }} • {{ task.type || 'Task' }}</p>
        </div>

        <div class="flex items-center gap-3">
          <button
            type="button"
            class="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800"
            @click="openEditPage"
          >
            Edit
          </button>
          <button
            type="button"
            class="rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-400"
            @click="close"
          >
            Close
          </button>
        </div>
      </div>

      <div class="space-y-6 p-6">
        <div class="grid gap-4 md:grid-cols-2">
          <div class="rounded-3xl border border-slate-800 bg-slate-900 p-5">
            <p class="text-2xs uppercase tracking-[0.24em] text-slate-500">Description</p>
            <p class="mt-3 text-sm leading-7 text-slate-200">{{ task.description }}</p>
          </div>

          <div class="grid gap-4">
            <div class="rounded-3xl border border-slate-800 bg-slate-900 p-5">
              <p class="text-2xs uppercase tracking-[0.24em] text-slate-500">Status</p>
              <div class="mt-3 rounded-2xl bg-slate-950 p-4 text-sm font-semibold text-white">
                {{ task.status }}
              </div>
            </div>

            <div class="rounded-3xl border border-slate-800 bg-slate-900 p-5">
              <p class="text-2xs uppercase tracking-[0.24em] text-slate-500">Priority</p>
              <div class="mt-3 rounded-2xl bg-slate-950 p-4 text-sm font-semibold text-white">
                {{ task.priority }}
              </div>
            </div>

            <div class="rounded-3xl border border-slate-800 bg-slate-900 p-5">
              <p class="text-2xs uppercase tracking-[0.24em] text-slate-500">Assignee</p>
              <div class="mt-3 rounded-2xl bg-slate-950 p-4 text-sm font-semibold text-white">
                {{ task.assignee?.name || 'Unassigned' }}
              </div>
            </div>
          </div>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
          <div class="rounded-3xl border border-slate-800 bg-slate-900 p-5">
            <p class="text-2xs uppercase tracking-[0.24em] text-slate-500">Project</p>
            <div class="mt-3 rounded-2xl bg-slate-950 p-4 text-sm font-semibold text-white">
              {{ project.name }}
            </div>
          </div>
          <div class="rounded-3xl border border-slate-800 bg-slate-900 p-5">
            <p class="text-2xs uppercase tracking-[0.24em] text-slate-500">Type</p>
            <div class="mt-3 rounded-2xl bg-slate-950 p-4 text-sm font-semibold text-white">
              {{ task.type || 'Task' }}
            </div>
          </div>
          <div class="rounded-3xl border border-slate-800 bg-slate-900 p-5">
            <p class="text-2xs uppercase tracking-[0.24em] text-slate-500">Tags</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <span
                v-for="tag in task.tags"
                :key="tag"
                class="rounded-full bg-slate-800 px-3 py-1 text-2xs text-slate-200"
              >
                {{ tag }}
              </span>
              <span v-if="!task.tags || task.tags.length === 0" class="text-sm text-slate-500"
                >No tags</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  task: { type: Object, required: true },
  projects: { type: Array, default: () => [] },
  users: { type: Array, default: () => [] },
  statuses: { type: Array, default: () => [] },
  taskTypes: { type: Array, default: () => [] },
  priorities: { type: Array, default: () => [] },
})

const emit = defineEmits(['close'])
const router = useRouter()

const project = computed(
  () =>
    props.projects.find((projectItem) => projectItem.id === props.task.projectId) || {
      key: 'T',
      name: 'Project',
    },
)

function close() {
  emit('close')
}

function openEditPage() {
  emit('close')
  router.push({ name: 'task-edit', params: { id: props.task.id } })
}
</script>
