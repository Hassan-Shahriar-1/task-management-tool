<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/60" @click="close"></div>

    <div
      class="relative w-full max-w-2xl rounded-2xl bg-slate-950 p-6 shadow-lg border border-slate-800 my-8 max-h-[calc(100vh-8rem)] overflow-auto"
    >
      <button
        @click="close"
        aria-label="Close"
        class="absolute top-4 right-4 z-10 rounded-md bg-slate-800/60 p-2 text-slate-200 hover:bg-slate-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <!-- <div class="flex items-start justify-between mb-2 gap-2">
        <div>
          <div class="flex items-center gap-3">
            <div>
              <div class="text-2xs text-slate-400">{{ project.name }}</div>
            </div>
          </div>
          <div class="mt-2 text-2xs text-slate-400">
            Task ID preview: <span class="font-mono text-slate-200">{{ previewId }}</span>
          </div>
        </div>
      </div> -->

      <form @submit.prevent="submit">
        <div class="rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-6">
          <div>
            <p class="text-2xs uppercase tracking-[0.24em] text-slate-500">Create issue</p>
            <div class="mt-2 text-2xs text-slate-400">
              Task ID preview: <span class="font-mono text-slate-200">{{ previewId }}</span>
            </div>
            <!-- <h2 class="text-xl font-semibold text-white mt-1">{{ title || 'New issue' }}</h2> -->
          </div>

          <div>
            <label class="text-2xs text-slate-400">Title</label>
            <input
              v-model="title"
              required
              placeholder="e.g. Fix bug in task modal"
              class="mt-2 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white border border-slate-800 focus:border-blue-500 focus:ring-blue-500/25"
            />
            <div v-if="v$.title.$error" class="mt-2 text-2xs text-rose-400">
              <div v-if="v$.title.required?.$invalid">Summary is required</div>
              <div v-if="v$.title.minLength?.$invalid">Summary must be at least 3 characters</div>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="w-1/3">
              <label class="text-2xs text-slate-400">Project</label>
              <div class="mt-2 rounded-2xl bg-slate-900 px-3 py-2 text-sm text-slate-100">
                {{ project.name }}
              </div>
            </div>
            <div class="w-1/3">
              <label class="text-2xs text-slate-400">Status</label>
              <select
                v-model="status"
                class="mt-2 w-full rounded-2xl bg-slate-900 px-3 py-2 text-sm text-white border border-slate-800 focus:border-blue-500 focus:ring-blue-500/25"
              >
                <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
              </select>
              <div v-if="v$.status.$error" class="mt-2 text-2xs text-rose-400">
                Status is required
              </div>
            </div>
            <div class="w-1/3">
              <label class="text-2xs text-slate-400">Priority</label>
              <select
                v-model="priority"
                class="mt-2 w-full rounded-2xl bg-slate-900 px-3 py-2 text-sm text-white border border-slate-800 focus:border-blue-500 focus:ring-blue-500/25"
              >
                <option v-for="p in priorities" :key="p" :value="p">{{ p }}</option>
              </select>
            </div>
          </div>

          <div>
            <label class="text-2xs text-slate-400">Description</label>
            <textarea
              v-model="description"
              rows="6"
              placeholder="Add a description, steps, and acceptance criteria"
              class="mt-2 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white border border-slate-800 focus:border-blue-500 focus:ring-blue-500/25"
            ></textarea>
          </div>

          <div>
            <label class="text-2xs text-slate-400">Tags</label>
            <div class="mt-2 rounded-2xl border border-slate-800 bg-slate-950 p-3">
              <div class="flex flex-wrap gap-2 mb-3">
                <span
                  v-for="(t, i) in tags"
                  :key="t"
                  class="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-2xs text-slate-200"
                >
                  {{ t }}
                  <button
                    type="button"
                    class="text-slate-400 hover:text-white"
                    @click="removeTag(i)"
                  >
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

          <div class="flex gap-3 justify-end">
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
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { statuses as defaultStatuses } from '../data/statuses.js'
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'

const props = defineProps({
  status: { type: String, default: null },
  projectId: { type: [String, Number], default: null },
  projects: { type: Array, default: () => [] },
  users: { type: Array, default: () => [] },
  priorities: { type: Array, default: () => ['High', 'Medium', 'Low'] },
  statuses: { type: Array, default: () => defaultStatuses },
})

const emit = defineEmits(['close', 'create'])

const title = ref('')
const description = ref('')
const status = ref(props.status || (props.statuses && props.statuses[0]) || null)
const priority = ref('Medium')
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
}))

const v$ = useVuelidate(rules, { title, status, priority })

// keep projectId in sync if prop changes
watch(
  () => props.projectId,
  (v) => {
    if (v != null) projectId.value = v
  },
)

function close() {
  emit('close')
}

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
  emit('close')
}
</script>

<style scoped></style>
