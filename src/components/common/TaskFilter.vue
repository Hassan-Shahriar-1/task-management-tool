<template>
  <div class="w-full flex flex-col sm:flex-row sm:items-center gap-3.5">

    <div class="flex flex-wrap items-center gap-3 flex-grow">
      <MultiSelect
        v-model="selectedProjects"
        :options="projectOptions"
        placeholder="Project"
      />

      <MultiSelect
        v-model="selectedTypes"
        :options="typeOptions"
        placeholder="Type"
      />

      <MultiSelect
        v-model="selectedPriorities"
        :options="priorityOptions"
        placeholder="Priority"
      />

      <MultiSelect
        v-model="selectedAssignees"
        :options="assigneeOptions"
        placeholder="Assignee"
      />

      <button
        v-if="hasActiveFilters"
        @click="handleClearFilters"
        type="button"
        class="rounded-xl bg-rose-500/15 hover:bg-rose-600 border border-rose-500/25 hover:border-rose-500/50 px-4 py-2 text-xs font-bold text-rose-400 hover:text-white shadow-sm shadow-rose-950/20 transition-all cursor-pointer flex items-center gap-1.5"
      >
        <svg
          class="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 15.89M9 11l3-3 3 3"
          />
        </svg>
        <span>Clear filters</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTasks } from '../../composables/useTasks.js'
import { taskTypes, taskTypeMeta, priorityMeta } from '../../data/statuses.js'
import { projects } from '../../data/projects.js'
import { users } from '../../data/users.js'

const {
  selectedPriorities,
  selectedAssignees,
  selectedTypes,
  selectedProjects,
  hasActiveFilters,
  clearFilters,
} = useTasks()

// Options for MultiSelect: Project
const projectOptions = computed(() => {
  return projects.map((p) => ({
    label: p.name,
    value: p.id,
    icon: '',
  }))
})

// Options for MultiSelect: Type
const typeOptions = computed(() => {
  return taskTypes.map((t) => ({
    label: t,
    value: t,
    icon: taskTypeMeta[t]?.icon || '✓',
  }))
})

// Options for MultiSelect: Priority
const priorityOptions = computed(() => {
  return Object.keys(priorityMeta).map((p) => ({
    label: p,
    value: p,
    icon: priorityMeta[p]?.icon || '⚡',
  }))
})

// Options for MultiSelect: Assignee
const assigneeOptions = computed(() => {
  return [
    ...users.map((u) => ({
      label: u.name,
      value: u.name,
      colorClass: u.color,
      initial: u.initial,
    })),
    {
      label: 'Unassigned',
      value: 'Unassigned',
      icon: '👤',
    },
  ]
})



function handleClearFilters() {
  clearFilters()
}
</script>
