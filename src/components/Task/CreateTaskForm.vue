<template>
  <form
    @submit.prevent="submit"
    class="space-y-6 rounded-[32px] border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/30"
  >
    <div class="grid gap-4 sm:grid-cols-2">
      <div>
        <label class="text-2xs uppercase tracking-[0.24em] text-slate-500">Project</label>
        <select
          v-model.number="projectId"
          class="mt-2 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white border border-slate-800 focus:border-blue-500 focus:ring-blue-500/25"
        >
          <option v-for="projectItem in projects" :key="projectItem.id" :value="projectItem.id">
            {{ projectItem.name }}
          </option>
        </select>
      </div>

      <div>
        <label class="text-2xs uppercase tracking-[0.24em] text-slate-500">Issue type</label>
        <select
          v-model="taskType"
          class="mt-2 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white border border-slate-800 focus:border-blue-500 focus:ring-blue-500/25"
        >
          <option v-for="t in taskTypes" :key="t" :value="t">{{ t }}</option>
        </select>
      </div>

      <div>
        <label class="text-2xs uppercase tracking-[0.24em] text-slate-500">Reporter</label>
        <select
          v-model.number="reporterId"
          class="mt-2 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white border border-slate-800 focus:border-blue-500 focus:ring-blue-500/25"
        >
          <option :value="null">Select reporter</option>
          <option v-for="u in users" :key="u.id" :value="u.id">{{ u.name }}</option>
        </select>
      </div>

      <div>
        <label class="text-2xs uppercase tracking-[0.24em] text-slate-500">Assignee</label>
        <select
          v-model.number="assigneeId"
          class="mt-2 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white border border-slate-800 focus:border-blue-500 focus:ring-blue-500/25"
        >
          <option :value="null">Unassigned</option>
          <option v-for="u in users" :key="u.id" :value="u.id">{{ u.name }}</option>
        </select>
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <div>
        <label class="text-2xs uppercase tracking-[0.24em] text-slate-500">Status</label>
        <select
          v-model="status"
          class="mt-2 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white border border-slate-800 focus:border-blue-500 focus:ring-blue-500/25"
        >
          <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>

      <div>
        <label class="text-2xs uppercase tracking-[0.24em] text-slate-500">Priority</label>
        <select
          v-model="priority"
          class="mt-2 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white border border-slate-800 focus:border-blue-500 focus:ring-blue-500/25"
        >
          <option v-for="p in priorities" :key="p" :value="p">{{ p }}</option>
        </select>
      </div>
    </div>

    <div>
      <label class="text-2xs tracking-[0.24em] text-slate-500">Title</label>
      <input
        v-model="title"
        required
        placeholder="Add issue title here"
        class="mt-2 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white border border-slate-800 focus:border-blue-500 focus:ring-blue-500/25"
      />
      <div v-if="v$.title.$error" class="mt-2 text-2xs text-rose-400">
        <div v-if="v$.title.required?.$invalid">Summary is required</div>
        <div v-if="v$.title.minLength?.$invalid">Summary must be at least 3 characters</div>
      </div>
    </div>

    <div>
      <label class="text-2xs uppercase tracking-[0.24em] text-slate-500">Description</label>
      <textarea
        v-model="description"
        rows="8"
        placeholder="Add issue description here"
        class="mt-2 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white border border-slate-800 focus:border-blue-500 focus:ring-blue-500/25"
      ></textarea>
    </div>

    <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
      <button
        type="button"
        class="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-900"
        @click="close"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-400"
      >
        {{ submitButtonLabel }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { statuses as defaultStatuses, taskTypes as defaultTaskTypes } from '../../data/statuses.js'
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'

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
