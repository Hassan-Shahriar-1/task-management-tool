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
          <TaskTypeIcon :type="task.type || 'Task'" class="h-5 w-5 flex-shrink-0" />
          <div>
            <p class="text-3xs text-slate-450 uppercase tracking-wider mt-0.5">
              {{ task.id }} &nbsp;
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            class="rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-all cursor-pointer flex items-center gap-1.5"
            @click="openEditPage"
            title="Edit task"
          >
            <EditIcon class="h-4 w-4" />
            <span>Edit</span>
          </button>
          <button
            type="button"
            class="rounded-xl bg-rose-600 hover:bg-rose-500 px-3.5 py-1.5 text-xs font-semibold text-white transition-all cursor-pointer flex items-center gap-1.5"
            @click="handleDelete"
            title="Delete task"
          >
            <DeleteIcon class="h-4 w-4" />
            <span>Delete</span>
          </button>
          <!-- Cross Close Icon Button -->
          <button
            type="button"
            @click="close"
            class="rounded-xl text-slate-400 hover:text-white hover:bg-slate-850 p-1.5 transition-all cursor-pointer ml-1"
            title="Close"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div class="space-y-6 p-6 overflow-y-auto flex-grow">
        <div class="grid grid-cols-1 md:grid-cols-[1.7fr_1fr] gap-8 items-start">
          <!-- Left Column: Description -->
          <div class="space-y-4 pr-2">
            <h3 class="text-[12px] uppercase tracking-[0.2em]">Title</h3>

            <p
              v-if="task.title"
              class="whitespace-pre-wrap text-sm text-slate-500 italic font-normal"
            >
              {{ task.title }}
            </p>
            <p v-else class="text-sm font-normal">-</p>

            <h3 class="text-[12px] uppercase tracking-[0.2em]">Description</h3>
            <p
              v-if="task.description"
              class="whitespace-pre-wrap text-sm text-slate-500 italic font-normal"
            >
              {{ task.description }}
            </p>
            <p v-else class="text-sm text-slate-500 italic font-normal">N/A</p>
          </div>

          <!-- Right Column: Sidebar (Minimal Attributes List) -->
          <div
            class="rounded-2xl border border-slate-800 bg-slate-900/25 backdrop-blur-md p-6 space-y-5"
          >
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

              <!-- Type Row -->
              <div class="flex items-center justify-between py-1 border-b border-slate-900/60">
                <span class="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500"
                  >Type</span
                >
                <span class="flex items-center gap-1.5 text-slate-300 font-medium">
                  <TaskTypeIcon :type="task.type || 'Task'" class="h-4 w-4" />
                  {{ task.type || 'Task' }}
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

              <!-- Created By Row -->
              <div class="flex items-center justify-between py-1 border-b border-slate-900/60">
                <span class="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500"
                  >Created By</span
                >
                <span class="flex items-center gap-2 text-slate-200 font-medium">
                  <span
                    class="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-bold text-white uppercase ring-1 ring-slate-800"
                    :class="task.reporter?.color || 'from-slate-700 to-slate-850'"
                    >{{ task.reporter?.initial || 'S' }}</span
                  >
                  {{ task.reporter?.name || 'System' }}
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
                    >N/A</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Reusable Global Confirm Modal -->
    <BaseConfirmModal
      v-if="showDeleteConfirm"
      title="Delete Task"
      message="Are you sure you want to delete this task? This action cannot be undone."
      confirm-label="Delete"
      cancel-label="Cancel"
      type="danger"
      @confirm="confirmDelete"
      @cancel="showDeleteConfirm = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { priorityMeta } from '../../data/statuses.js'
import dayjs from 'dayjs'
import TaskTypeIcon from '../icons/TaskTypeIcon.vue'
import { useTasks } from '../../composables/useTasks.js'
import EditIcon from '../icons/EditIcon.vue'
import DeleteIcon from '../icons/DeleteIcon.vue'

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
  // if (!props.task.status) return 'text-slate-300'
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

const { deleteTask } = useTasks()

function close() {
  emit('close')
}

function openEditPage() {
  emit('close')
  router.push({ name: 'task-edit', params: { id: props.task.id } })
}

const showDeleteConfirm = ref(false)

function handleDelete() {
  showDeleteConfirm.value = true
}

function confirmDelete() {
  deleteTask(props.task.id)
  showDeleteConfirm.value = false
  emit('close')
}
</script>
