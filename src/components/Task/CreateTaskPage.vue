<template>
  <form
    @submit.prevent="submit"
    class="grid gap-6 rounded-[32px] border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/30 lg:grid-cols-[1.7fr_1fr]"
  >
    <div class="space-y-6">
      <div class="rounded-[28px] border border-slate-800 bg-slate-900 p-6">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p class="text-2xs uppercase tracking-[0.24em] text-slate-500">Create issue</p>
            <h2 class="text-3xl font-bold text-white">New task details</h2>
          </div>
          <span
            class="inline-flex items-center rounded-full bg-blue-500/15 px-3 py-1 text-2xs font-semibold uppercase tracking-[0.18em] text-blue-300"
          >
            Task
          </span>
        </div>

        <div class="mt-6 grid gap-4">
          <div>
            <label class="text-2xs text-slate-400">Title</label>
            <input
              v-model="title"
              required
              placeholder="e.g. Fix modal alignment issue"
              class="mt-2 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white border border-slate-800 focus:border-blue-500 focus:ring-blue-500/25"
            />
            <div v-if="v$.title.$error" class="mt-2 text-2xs text-rose-400">
              <div v-if="v$.title.required?.$invalid">Title is required</div>
              <div v-if="v$.title.minLength?.$invalid">Title must be at least 3 characters</div>
            </div>
          </div>

          <div class="grid gap-4 md:grid-cols-3">
            <div>
              <label class="text-2xs text-slate-400">Project</label>
              <select
                v-model.number="projectId"
                class="mt-2 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white border border-slate-800 focus:border-blue-500 focus:ring-blue-500/25"
              >
                <option
                  v-for="projectItem in projects"
                  :key="projectItem.id"
                  :value="projectItem.id"
                >
                  {{ projectItem.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="text-2xs text-slate-400">Status</label>
              <select
                v-model="status"
                class="mt-2 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white border border-slate-800 focus:border-blue-500 focus:ring-blue-500/25"
              >
                <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
              </select>
              <div v-if="v$.status.$error" class="mt-2 text-2xs text-rose-400">
                Status is required
              </div>
            </div>
            <div>
              <label class="text-2xs text-slate-400">Type</label>
              <select
                v-model="taskType"
                class="mt-2 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white border border-slate-800 focus:border-blue-500 focus:ring-blue-500/25"
              >
                <option v-for="t in taskTypes" :key="t" :value="t">{{ t }}</option>
              </select>
              <div v-if="v$.taskType.$error" class="mt-2 text-2xs text-rose-400">
                Task type is required
              </div>
            </div>
          </div>

          <div>
            <label class="text-2xs text-slate-400">Description</label>
            <textarea
              v-model="description"
              rows="10"
              placeholder="Write a clear description, steps, and acceptance criteria"
              class="mt-2 w-full rounded-[28px] border border-slate-800 bg-slate-950 px-5 py-4 text-sm text-white focus:border-blue-500 focus:ring-blue-500/25"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="rounded-[28px] border border-slate-800 bg-slate-900 p-6">
        <p class="text-sm font-semibold text-white">Additional notes</p>
        <p class="mt-3 text-sm leading-6 text-slate-400">
          The full-page create experience gives you better space for writing long descriptions and
          selecting project context.
        </p>
      </div>
    </div>

    <aside class="space-y-6">
      <div class="rounded-[28px] border border-slate-800 bg-slate-900 p-6 space-y-4">
        <div>
          <p class="text-2xs uppercase tracking-[0.24em] text-slate-500">Priority</p>
          <select
            v-model="priority"
            class="mt-2 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white border border-slate-800 focus:border-blue-500 focus:ring-blue-500/25"
          >
            <option v-for="p in priorities" :key="p" :value="p">{{ p }}</option>
          </select>
        </div>

        <div>
          <p class="text-2xs uppercase tracking-[0.24em] text-slate-500">Assignee</p>
          <select
            v-model.number="assigneeId"
            class="mt-2 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white border border-slate-800 focus:border-blue-500 focus:ring-blue-500/25"
          >
            <option :value="null">Unassigned</option>
            <option v-for="u in users" :key="u.id" :value="u.id">{{ u.name }}</option>
          </select>
        </div>

        <div>
          <p class="text-2xs uppercase tracking-[0.24em] text-slate-500">Tags</p>
          <div class="mt-2 rounded-2xl bg-slate-950 px-4 py-3">
            <div class="flex flex-wrap gap-2 mb-3">
              <span
                v-for="(t, i) in tags"
                :key="t"
                class="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-2xs text-slate-200"
              >
                {{ t }}
                <button type="button" class="text-slate-400 hover:text-white" @click="removeTag(i)">
                  ✕
                </button>
              </span>
            </div>
            <input
              v-model="tagInput"
              @keydown.enter.prevent="addTagFromInput"
              placeholder="Type a tag and press Enter"
              class="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white border border-slate-800 focus:border-blue-500 focus:ring-blue-500/25"
            />
          </div>
        </div>
      </div>

      <div class="rounded-[28px] border border-slate-800 bg-slate-900 p-6">
        <p class="text-2xs uppercase tracking-[0.24em] text-slate-500">Preview</p>
        <div class="mt-3 rounded-3xl bg-slate-950 p-4 text-sm text-slate-200">
          <p class="font-semibold text-white">{{ title || 'Task title preview' }}</p>
          <p class="mt-2 text-slate-500">
            {{ project.name }} • {{ status }} • {{ priority }} • {{ taskType }}
          </p>
          <p class="mt-2 text-xs text-slate-400">Preview ID: {{ previewId }}</p>
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <button
          type="submit"
          class="rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-400"
        >
          Create task
        </button>
        <button
          type="button"
          class="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-900"
          @click="$emit('cancel')"
        >
          Cancel
        </button>
      </div>
    </aside>
  </form>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { statuses as defaultStatuses, taskTypes as defaultTaskTypes } from '../../data/statuses.js'
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'

const props = defineProps({
  status: { type: String, default: null },
  projectId: { type: [String, Number], default: null },
  projects: { type: Array, default: () => [] },
  users: { type: Array, default: () => [] },
  priorities: { type: Array, default: () => ['High', 'Medium', 'Low'] },
  statuses: { type: Array, default: () => defaultStatuses },
  taskTypes: { type: Array, default: () => defaultTaskTypes },
})

const emit = defineEmits(['cancel', 'create'])

const title = ref('')
const description = ref('')
const status = ref(props.status || (props.statuses && props.statuses[0]) || null)
const priority = ref('Medium')
const taskType = ref(props.taskTypes && props.taskTypes[0] ? props.taskTypes[0] : 'Task')
const projectId = ref(
  props.projectId ?? (props.projects && props.projects[0] ? props.projects[0].id : null),
)
const assigneeId = ref(null)
const tags = ref([])
const tagInput = ref('')

const statuses = computed(() => props.statuses)
const project = computed(
  () =>
    props.projects.find((p) => p.id === projectId.value) ||
    props.projects[0] || { key: 'T', name: 'Project' },
)
const previewRandom = Math.floor(Math.random() * 900) + 100
const previewId = computed(() => `${project.value.key || 'T'}-${previewRandom}`)

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

function addTagFromInput() {
  const t = tagInput.value.trim()
  if (!t) return
  if (!tags.value.includes(t)) tags.value.push(t)
  tagInput.value = ''
}

function removeTag(i) {
  tags.value.splice(i, 1)
}

async function submit() {
  const ok = await v$.value.$validate()
  if (!ok) return

  const assignee = props.users.find((u) => u.id === assigneeId.value) || null
  const projectObj = props.projects.find((p) => p.id === projectId.value) ||
    props.projects[0] || { key: 'T' }
  const id = `${projectObj.key || 'T'}-${Math.floor(Math.random() * 900) + 100}`

  const newTask = {
    id,
    title: title.value,
    description: description.value,
    type: taskType.value,
    status: status.value || props.status || statuses.value[0],
    priority: priority.value,
    tags: tags.value.slice(),
    subtasksCompleted: 0,
    subtasksTotal: 0,
    assignee: assignee
      ? { name: assignee.name, initial: assignee.initial, color: assignee.color }
      : { name: 'Unassigned', initial: 'U', color: 'from-slate-500 to-slate-700' },
  }

  emit('create', newTask)
}
</script>
