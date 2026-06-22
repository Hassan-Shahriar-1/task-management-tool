<template>
  <form
    @submit.prevent="submit"
    class="space-y-8"
  >
    <div class="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-8 items-start">
      <!-- Left Column: Primary Content -->
      <div class="space-y-6">
        <div>
          <label class="text-[10px] uppercase tracking-[0.2em] text-slate-450 font-semibold">Title</label>
          <input
            v-model="title"
            required
            placeholder="Add issue title here"
            class="mt-2 w-full rounded-2xl bg-slate-950 px-4 py-3.5 text-lg font-semibold text-white placeholder-slate-700 border border-slate-850 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/15 transition-all"
          />
          <div v-if="v$.title.$error" class="mt-2 text-2xs text-rose-400">
            <div v-if="v$.title.required?.$invalid">Summary is required</div>
            <div v-if="v$.title.minLength?.$invalid">Summary must be at least 3 characters</div>
          </div>
        </div>

        <div>
          <label class="text-[10px] uppercase tracking-[0.2em] text-slate-450 font-semibold">Description</label>
          <textarea
            v-model="description"
            rows="12"
            placeholder="Add issue description here..."
            class="mt-2 w-full rounded-2xl bg-slate-950 px-4 py-3.5 text-sm text-slate-350 placeholder-slate-700 border border-slate-850 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/15 transition-all resize-none leading-relaxed"
          ></textarea>
        </div>
      </div>

      <!-- Right Column: Sidebar (Glassmorphism card) -->
      <div class="rounded-2xl border border-slate-800 bg-slate-900/25 backdrop-blur-md p-6 space-y-6">
        <h3 class="text-2xs font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-800/60">Attributes</h3>
        
        <div class="space-y-4">
          <div>
            <label class="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">Project</label>
            <select
              v-model.number="projectId"
              class="mt-1.5 w-full rounded-xl bg-slate-950 px-3.5 py-2.5 text-xs text-slate-200 border border-slate-850 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 transition-all"
            >
              <option v-for="projectItem in projects" :key="projectItem.id" :value="projectItem.id">
                {{ projectItem.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">Issue type</label>
            <div class="relative mt-1.5" ref="typeDropdownRef">
              <button
                type="button"
                @click="isTypeDropdownOpen = !isTypeDropdownOpen"
                class="w-full rounded-xl bg-slate-950 px-3.5 py-2.5 text-xs text-slate-200 border border-slate-850 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 transition-all flex items-center justify-between cursor-pointer"
              >
                <div class="flex items-center gap-2">
                  <TaskTypeIcon :type="taskType" class="h-4 w-4 flex-shrink-0" />
                  <span>{{ taskType }}</span>
                </div>
                <svg
                  class="h-4 w-4 text-slate-450 transition-transform duration-200"
                  :class="{ 'rotate-180': isTypeDropdownOpen }"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                v-if="isTypeDropdownOpen"
                class="absolute left-0 right-0 mt-2 z-50 rounded-xl border border-slate-800 bg-slate-950 p-1.5 shadow-xl"
              >
                <div
                  v-for="t in taskTypes"
                  :key="t"
                  @click="selectTaskType(t)"
                  class="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-xs text-slate-350 hover:bg-slate-900 hover:text-white transition-all"
                  :class="{ 'bg-slate-900 text-white font-semibold': taskType === t }"
                >
                  <div class="flex items-center gap-2">
                    <TaskTypeIcon :type="t" class="h-4 w-4 flex-shrink-0" />
                    <span>{{ t }}</span>
                  </div>
                  <svg
                    v-if="taskType === t"
                    class="h-4 w-4 text-indigo-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label class="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">Reporter</label>
            <select
              v-model.number="reporterId"
              class="mt-1.5 w-full rounded-xl bg-slate-950 px-3.5 py-2.5 text-xs text-slate-200 border border-slate-850 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 transition-all"
            >
              <option :value="null">Select reporter</option>
              <option v-for="u in users" :key="u.id" :value="u.id">{{ u.name }}</option>
            </select>
          </div>

          <div>
            <label class="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">Assignee</label>
            <select
              v-model.number="assigneeId"
              class="mt-1.5 w-full rounded-xl bg-slate-950 px-3.5 py-2.5 text-xs text-slate-200 border border-slate-850 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 transition-all"
            >
              <option :value="null">Unassigned</option>
              <option v-for="u in users" :key="u.id" :value="u.id">{{ u.name }}</option>
            </select>
          </div>

          <div>
            <label class="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">Status</label>
            <select
              v-model="status"
              class="mt-1.5 w-full rounded-xl bg-slate-950 px-3.5 py-2.5 text-xs text-slate-200 border border-slate-850 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 transition-all"
            >
              <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>

          <div>
            <label class="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">Priority</label>
            <select
              v-model="priority"
              class="mt-1.5 w-full rounded-xl bg-slate-950 px-3.5 py-2.5 text-xs text-slate-200 border border-slate-850 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 transition-all"
            >
              <option v-for="p in priorities" :key="p" :value="p">
                {{ priorityMeta[p]?.icon }} &nbsp; {{ p }}
              </option>
            </select>
          </div>

          <div>
            <label class="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">Due date</label>
            <input
              type="date"
              v-model="dueDate"
              class="mt-1.5 w-full rounded-xl bg-slate-950 px-3.5 py-2.5 text-xs text-slate-200 border border-slate-850 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 transition-all [color-scheme:dark]"
            />
          </div>

          <div>
            <label class="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">Tags</label>
            <div class="mt-1.5 flex flex-col gap-2">
              <div class="flex gap-2">
                <input
                  type="text"
                  v-model="newTag"
                  @keydown.enter.prevent="addTag"
                  placeholder="Press Enter to add tag"
                  class="w-full rounded-xl bg-slate-950 px-3.5 py-2.5 text-xs text-slate-200 border border-slate-850 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 transition-all"
                />
                <button
                  type="button"
                  @click="addTag"
                  class="rounded-xl bg-slate-900 border border-slate-850 px-3 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-all cursor-pointer flex-shrink-0"
                >
                  Add
                </button>
              </div>
              
              <!-- Tag Pills -->
              <div class="flex flex-wrap gap-1.5 mt-1">
                <span
                  v-for="tag in tags"
                  :key="tag"
                  class="inline-flex items-center gap-1 rounded-md border border-slate-800 bg-slate-900/30 px-2 py-0.5 text-[11px] text-slate-250 font-medium"
                >
                  {{ tag }}
                  <button
                    type="button"
                    @click="removeTag(tag)"
                    class="hover:text-red-400 text-[10px] font-bold cursor-pointer transition-colors px-0.5"
                  >
                    ×
                  </button>
                </span>
                <span v-if="tags.length === 0" class="text-3xs text-slate-600 italic">No tags added yet</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions Footer -->
    <div class="flex flex-col gap-3 sm:flex-row sm:justify-end pt-6 border-t border-slate-900/60">
      <button
        type="button"
        class="rounded-xl border border-slate-800 bg-transparent px-5 py-2.5 text-xs font-medium text-slate-400 hover:bg-slate-900 hover:text-white transition-all cursor-pointer"
        @click="close"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 text-xs font-medium text-white shadow-md shadow-indigo-600/10 transition-all cursor-pointer"
      >
        {{ submitButtonLabel }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { statuses as defaultStatuses, taskTypes as defaultTaskTypes, priorityMeta } from '../../data/statuses.js'
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import dayjs from 'dayjs'
import TaskTypeIcon from '../icons/TaskTypeIcon.vue'

const isTypeDropdownOpen = ref(false)
const typeDropdownRef = ref(null)

const selectTaskType = (t) => {
  taskType.value = t
  isTypeDropdownOpen.value = false
}

const handleOutsideClick = (event) => {
  if (typeDropdownRef.value && !typeDropdownRef.value.contains(event.target)) {
    isTypeDropdownOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  window.removeEventListener('click', handleOutsideClick)
})

const props = defineProps({
  task: { type: Object, default: null },
  status: { type: String, default: null },
  projectId: { type: [String, Number], default: null },
  projects: { type: Array, default: () => [] },
  users: { type: Array, default: () => [] },
  priorities: { type: Array, default: () => ['High', 'Medium', 'Low'] },
  statuses: { type: Array, default: () => defaultStatuses },
  taskTypes: { type: Array, default: () => defaultTaskTypes },
  submitLabel: { type: String, default: '' },
})

const emit = defineEmits(['cancel', 'create', 'update'])

const title = ref(props.task?.title || '')
const description = ref(props.task?.description || '')
const status = ref(
  props.task?.status || props.status || (props.statuses && props.statuses[0]) || null,
)
const priority = ref(props.task?.priority || 'Medium')
const taskType = ref(
  props.task?.type || (props.taskTypes && props.taskTypes[0] ? props.taskTypes[0] : 'Task'),
)
const projectId = ref(
  props.task?.projectId ??
    props.projectId ??
    (props.projects && props.projects[0] ? props.projects[0].id : null),
)
const assigneeId = ref(
  props.task?.assignee
    ? (props.users.find((u) => u.name === props.task.assignee.name)?.id ?? null)
    : null,
)
const reporterId = ref(
  props.task?.reporter
    ? (props.users.find((u) => u.name === props.task.reporter.name)?.id ?? null)
    : null,
)
const tags = ref(props.task?.tags ? [...props.task.tags] : [])
const newTag = ref('')

function addTag() {
  const trimmed = newTag.value.trim()
  if (trimmed && !tags.value.includes(trimmed)) {
    tags.value.push(trimmed)
  }
  newTag.value = ''
}

function removeTag(tagToRemove) {
  tags.value = tags.value.filter((tag) => tag !== tagToRemove)
}

const dueDate = ref(
  props.task?.due_date ? dayjs(props.task.due_date).format('YYYY-MM-DD') : ''
)

const statuses = computed(() => props.statuses)
const isEdit = computed(() => !!props.task)
const submitButtonLabel = computed(() => {
  if (props.submitLabel) return props.submitLabel
  return isEdit.value ? 'Save changes' : 'Create task'
})

watch(
  () => props.task,
  (task) => {
    if (!task) return
    title.value = task.title || ''
    description.value = task.description || ''
    status.value = task.status || props.status || (props.statuses && props.statuses[0]) || null
    priority.value = task.priority || 'Medium'
    taskType.value =
      task.type || (props.taskTypes && props.taskTypes[0] ? props.taskTypes[0] : 'Task')
    projectId.value =
      task.projectId ??
      props.projectId ??
      (props.projects && props.projects[0] ? props.projects[0].id : null)
    assigneeId.value = task.assignee
      ? (props.users.find((u) => u.name === task.assignee.name)?.id ?? null)
      : null
    reporterId.value = task.reporter
      ? (props.users.find((u) => u.name === task.reporter.name)?.id ?? null)
      : null
    tags.value = task.tags ? [...task.tags] : []
    dueDate.value = task.due_date ? dayjs(task.due_date).format('YYYY-MM-DD') : ''
  },
  { immediate: true },
)

const rules = computed(() => ({
  title: { required, minLength: minLength(3) },
  status: { required },
  priority: { required },
  taskType: { required },
}))

const v$ = useVuelidate(rules, { title, status, priority, taskType })

watch(
  () => props.projectId,
  (v) => {
    if (v != null) projectId.value = v
  },
)

function close() {
  emit('cancel')
}

async function submit() {
  const ok = await v$.value.$validate()
  if (!ok) return

  const assignee = props.users.find((u) => u.id === assigneeId.value) || null
  const projectObj = props.projects.find((p) => p.id === projectId.value) ||
    props.projects[0] || { key: 'T' }
  const id = props.task?.id || `${projectObj.key || 'T'}-${Math.floor(Math.random() * 900) + 100}`

  const reporter = props.users.find((u) => u.id === reporterId.value) || null

  const taskPayload = {
    id,
    title: title.value,
    description: description.value,
    type: taskType.value,
    status: status.value || props.status || statuses.value[0],
    priority: priority.value,
    projectId: projectId.value,
    tags: tags.value.slice(),
    due_date: dueDate.value || null,
    subtasksCompleted: props.task?.subtasksCompleted ?? 0,
    subtasksTotal: props.task?.subtasksTotal ?? 0,
    assignee: assignee
      ? { name: assignee.name, initial: assignee.initial, color: assignee.color }
      : { name: 'Unassigned', initial: 'U', color: 'from-slate-500 to-slate-700' },
    reporter: reporter
      ? { name: reporter.name, initial: reporter.initial, color: reporter.color }
      : null,
  }

  if (isEdit.value) {
    emit('update', taskPayload)
  } else {
    emit('create', taskPayload)
  }
}
</script>
