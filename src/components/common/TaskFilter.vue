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

const projectOptions = computed(() => {
  return projects.map((p) => ({
    label: p.name,
    value: p.id,
    icon: '',
  }))
})

const typeOptions = computed(() => {
  return taskTypes.map((t) => ({
    label: t,
    value: t,
    icon: taskTypeMeta[t]?.icon || '',
  }))
})

const priorityOptions = computed(() => {
  return Object.keys(priorityMeta).map((p) => ({
    label: p,
    value: p,
    icon: priorityMeta[p]?.icon || '⚡',
  }))
})

const assigneeOptions = computed(() => {
  return [
    ...users.map((u) => ({
      label: u.name,
      value: u.id,
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

</script>
