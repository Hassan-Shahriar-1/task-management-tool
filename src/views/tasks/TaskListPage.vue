<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <!-- Top breadcrumb & header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
      <div>
        <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          <span>Projects</span>
          <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span class="text-slate-400">Sprint 4 Board</span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div class="flex rounded-xl bg-slate-950 p-1 border border-slate-850">
          <router-link
            to="/"
            class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-all"
          >
            <!-- Board Icon -->
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
            <span>Board</span>
          </router-link>
          <div class="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow">
            <!-- List Icon -->
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span>List</span>
          </div>
        </div>

        <router-link
          to="/tasks/create"
          class="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-900"
        >
          + Create task
        </router-link>
      </div>
    </div>

    <!-- Search & Filter Controls -->
    <div class="flex flex-col mb-6 p-4 rounded-2xl border border-slate-900 bg-slate-950/40 backdrop-blur-md">
      <!-- Top Row: Search and Toggle Button -->
      <div class="flex items-center justify-between gap-4 w-full">
        <TaskSearchBar class="flex-grow max-w-sm" />

        <!-- Filter Toggle Button -->
        <button
          @click="isFilterExpanded = !isFilterExpanded"
          type="button"
          class="flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold shadow-sm transition-all hover:bg-slate-900 hover:text-white cursor-pointer select-none"
          :class="isFilterExpanded || hasActiveFilters ? 'border-indigo-500 bg-indigo-600/10 text-indigo-400' : 'border-slate-800 bg-slate-950 text-slate-350 hover:border-slate-700'"
        >
          <svg
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <span>Filters</span>
          <span
            v-if="activeFiltersCount > 0"
            class="flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-indigo-600 px-1 text-[9px] font-bold text-white shadow-sm"
          >
            {{ activeFiltersCount }}
          </span>
        </button>
      </div>

      <!-- Collapsible Bottom Row: Filter Options -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-y-95 opacity-0 origin-top"
        enter-to-class="transform scale-y-100 opacity-100 origin-top"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform scale-y-100 opacity-100 origin-top"
        leave-to-class="transform scale-y-95 opacity-0 origin-top"
      >
        <div
          v-show="isFilterExpanded || hasActiveFilters"
          class="mt-4 pt-4 border-t border-slate-900/60"
        >
          <TaskFilter />
        </div>
      </transition>
    </div>

    <div class="overflow-x-auto rounded-2xl border border-slate-900 bg-slate-950 shadow-xl">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-slate-900 bg-slate-900/35 text-[10px] font-bold uppercase tracking-wider text-slate-450">
            <th class="px-6 py-4">Ticket No</th>
            <th class="px-6 py-4">Title</th>
            <th class="px-6 py-4 text-center">Priority</th>
            <th class="px-6 py-4">Due Date</th>
            <th class="px-6 py-4">Assign To</th>
            <th class="px-6 py-4">Created By</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-900/60">
          <tr
            v-for="task in filteredTasks"
            :key="task.id"
            @click="openDetails(task)"
            class="group hover:bg-slate-900/30 transition-all duration-200 cursor-pointer"
          >
            <td class="px-6 py-4.5">
              <span class="text-xs font-semibold text-slate-450 tracking-wider">
                {{ task.id }}
              </span>
            </td>

            <td class="px-6 py-4.5">
              <div class="flex items-center gap-2.5">
                <TaskTypeIcon :type="task.type" class="h-4.5 w-4.5 flex-shrink-0" />
                <span class="text-sm font-bold text-slate-200 group-hover:text-white transition-colors line-clamp-1">
                  {{ task.title }}
                </span>
              </div>
            </td>

            <td class="px-6 py-4.5 text-center">
              <PriorityBadge :priority="task.priority" />
            </td>

            <td class="px-6 py-4.5">
              <div class="text-xs text-slate-350 font-medium">
                {{ task.due_date ? task.due_date : '-' }}
              </div>
            </td>

            <td class="px-6 py-4.5">
              <div class="flex items-center gap-2">
                <div
                  v-if="task.assignee && task.assignee.name !== 'Unassigned'"
                  class="h-6 w-6 rounded-full bg-gradient-to-br flex items-center justify-center text-[10px] font-bold text-white ring-1 ring-slate-800 shadow-sm"
                  :class="task.assignee?.color"
                >
                  {{ task.assignee?.initial }}
                </div>
                <div
                  v-else
                  class="h-6 w-6 rounded-full bg-slate-900 border border-slate-850 flex items-center justify-center text-slate-550 shadow-sm"
                >
                  <svg class="h-2.5 w-2.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                  </svg>
                </div>
                <span class="text-xs text-slate-300 font-semibold truncate max-w-[120px]">
                  {{ task.assignee?.name || 'Unassigned' }}
                </span>
              </div>
            </td>

            <td class="px-6 py-4.5">
              <div class="flex items-center gap-2">
                <div
                  class="h-6 w-6 rounded-full bg-gradient-to-br flex items-center justify-center text-[10px] font-bold text-white ring-1 ring-slate-800 shadow-sm"
                  :class="task.reporter?.color || 'from-slate-700 to-slate-850'"
                >
                  {{ task.reporter?.initial || 'S' }}
                </div>
                <span class="text-xs text-slate-300 font-semibold truncate max-w-[120px]">
                  {{ task.reporter?.name || 'System' }}
                </span>
              </div>
            </td>
          </tr>

          <tr v-if="filteredTasks.length === 0">
            <td colspan="6" class="px-6 py-12 text-center text-slate-650 italic text-sm">
              No tasks found matching current filters.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <TaskDetailsModal
      v-if="selectedTask"
      :task="selectedTask"
      :projects="projects"
      :users="users"
      :statuses="statuses"
      :task-types="taskTypes"
      :priorities="Object.keys(priorityMeta)"
      @close="closeDetailsModal"
      @update="handleUpdateTask"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTasks } from '../../composables/useTasks.js'
import { statuses, priorityMeta, taskTypes } from '../../data/statuses.js'
import { projects } from '../../data/projects.js'
import { users } from '../../data/users.js'
import PriorityBadge from '../../components/Task/PriorityBadge.vue'
import TaskTypeIcon from '../../components/icons/TaskTypeIcon.vue'
import TaskDetailsModal from '../../components/Task/TaskDetailsModal.vue'

const {
  filteredTasks,
  isFilterExpanded,
  activeFiltersCount,
  hasActiveFilters,
  updateTask,
} = useTasks()
const selectedTask = ref(null)

function openDetails(task) {
  selectedTask.value = task
}

function closeDetailsModal() {
  selectedTask.value = null
}

function handleUpdateTask(task) {
  updateTask(task)
  selectedTask.value = { ...selectedTask.value, ...task }
}
</script>

<style scoped></style>
