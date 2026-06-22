<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
    <div class="absolute inset-0 bg-black/60" @click="close"></div>

    <div
      class="relative w-full max-w-4xl max-h-[calc(100vh-4rem)] flex flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl"
    >
      <div
        class="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-3.5 flex-shrink-0"
      >
        <div class="flex items-center gap-3">
          <component :is="typeIconMap[task.type || 'Task']" class="h-5 w-5 flex-shrink-0" />
          <div>
            <h2 class="text-base font-bold text-white leading-tight">{{ task.title }}</h2>
            <p class="text-3xs text-slate-450 uppercase tracking-wider mt-0.5">
              {{ task.id }} &nbsp;•&nbsp; {{ task.type || 'Task' }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button
            type="button"
            class="rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-all cursor-pointer"
            @click="openEditPage"
          >
            Edit
          </button>
          <button
            type="button"
            class="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-3.5 py-1.5 text-xs font-semibold text-white transition-all cursor-pointer animate-pulse"
            @click="close"
          >
            Close
          </button>
        </div>
      </div>

      <div class="space-y-6 p-6 overflow-y-auto flex-grow">
        <div class="grid grid-cols-1 md:grid-cols-[1.7fr_1fr] gap-8 items-start">
          <!-- Left Column: Description -->
          <div class="space-y-4 pr-2">
            <h3 class="text-[10px] uppercase tracking-[0.2em] text-slate-550 font-semibold">
              Description
            </h3>
            <p
              v-if="task.description"
              class="text-base leading-relaxed text-slate-300 whitespace-pre-wrap font-normal"
            >
              {{ task.description }}
            </p>
            <p v-else class="text-sm text-slate-600 italic font-normal">
              No description provided for this task.
            </p>
          </div>

          <!-- Right Column: Sidebar (Minimal Attributes List) -->
          <div
            class="rounded-2xl border border-slate-800 bg-slate-900/25 backdrop-blur-md p-6 space-y-5"
          >
            <h3
              class="text-2xs font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-800/60"
            >
              Attributes
            </h3>

            <div class="space-y-4 text-xs font-normal text-slate-300">
              <!-- Project Row -->
              <div class="flex items-center justify-between py-1 border-b border-slate-900/60">
                <span class="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500"
                  >Project</span
                >
                <span class="text-slate-200 font-medium flex items-center gap-1.5">
                  <span class="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                  {{ project.name }}
                </span>
              </div>

              <!-- Status Row -->
              <div class="flex items-center justify-between py-1 border-b border-slate-900/60">
                <span class="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500"
                  >Status</span
                >
                <span
                  class="rounded-lg bg-slate-950 px-2.5 py-1 text-xs text-slate-300 border border-slate-850"
                >
                  {{ task.status }}
                </span>
              </div>

              <!-- Priority Row -->
              <div class="flex items-center justify-between py-1 border-b border-slate-900/60">
                <span class="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500"
                  >Priority</span
                >
                <span class="flex items-center gap-1.5 text-slate-300 font-medium">
                  <span>{{ priorityMeta[task.priority]?.icon || '⚡' }}</span>
                  {{ task.priority }}
                </span>
              </div>

              <!-- Due Date Row -->
              <div class="flex items-center justify-between py-1 border-b border-slate-900/60">
                <span class="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500"
                  >Due Date</span
                >
                <span class="flex items-center gap-1.5 font-medium" :class="dueClass">
                  <span>📅</span>
                  {{ dueText }}
                </span>
              </div>

              <!-- Assignee Row -->
              <div class="flex items-center justify-between py-1 border-b border-slate-900/60">
                <span class="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500"
                  >Assignee</span
                >
                <span class="flex items-center gap-2 text-slate-200 font-medium">
                  <span
                    class="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white uppercase"
                    >{{ task.assignee?.initial || 'U' }}</span
                  >
                  {{ task.assignee?.name || 'Unassigned' }}
                </span>
              </div>

              <!-- Type Row -->
              <div class="flex items-center justify-between py-1 border-b border-slate-900/60">
                <span class="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500"
                  >Type</span
                >
                <span class="flex items-center gap-1.5 text-slate-300 font-medium">
                  <component :is="typeIconMap[task.type || 'Task']" class="h-4 w-4" />
                  {{ task.type || 'Task' }}
                </span>
              </div>

              <!-- Tags Row -->
              <div class="flex items-start justify-between py-1">
                <span
                  class="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500 mt-1"
                  >Tags</span
                >
                <div class="flex flex-wrap gap-1.5 justify-end max-w-[65%]">
                  <span
                    v-for="tag in task.tags"
                    :key="tag"
                    class="rounded-full bg-slate-950 px-2 py-0.5 text-3xs text-slate-350 border border-slate-850"
                  >
                    {{ tag }}
                  </span>
                  <span
                    v-if="!task.tags || task.tags.length === 0"
                    class="text-xs text-slate-600 italic"
                    >No tags</span
                  >
                </div>
              </div>
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
import { priorityMeta } from '../../data/statuses.js'
import dayjs from 'dayjs'
import TaskIcon from '../icons/TaskIcon.vue'
import BugIcon from '../icons/BugIcon.vue'
import FeatureIcon from '../icons/FeatureIcon.vue'
import ImprovementIcon from '../icons/ImprovementIcon.vue'

const typeIconMap = {
  Task: TaskIcon,
  Bug: BugIcon,
  Feature: FeatureIcon,
  Improvement: ImprovementIcon,
}

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

const dueStatus = computed(() => {
  if (!props.task.due_date) return null
  const due = dayjs(props.task.due_date).startOf('day')
  const today = dayjs().startOf('day')
  const tomorrow = dayjs().add(1, 'day').startOf('day')

  if (due.isBefore(today)) return 'overdue'
  if (due.isSame(today) || due.isSame(tomorrow)) return 'imminent'
  return 'upcoming'
})

const dueClass = computed(() => {
  if (props.task.status === 'Done') return 'text-slate-300'
  if (!dueStatus.value) return 'text-slate-300'
  if (dueStatus.value === 'overdue') return 'text-rose-400 font-semibold'
  if (dueStatus.value === 'imminent') return 'text-amber-400 font-semibold'
  return 'text-slate-300'
})

const dueText = computed(() => {
  if (!props.task.due_date) return 'No due date'
  const dateStr = dayjs(props.task.due_date).format('YYYY-MM-DD')
  if (props.task.status === 'Done') return dateStr
  if (dueStatus.value === 'overdue') return `${dateStr}`
  if (dueStatus.value === 'imminent') {
    return `${dateStr}`
  }
  return dateStr
})

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
