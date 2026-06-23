<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <!-- Top breadcrumb & board header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
      <div>
        <div
          class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500"
        >
          <span>Projects</span>
          <svg
            class="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="3"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span class="text-slate-400">Sprint 4 Board</span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <!-- View Toggle Group -->
        <div class="flex rounded-xl bg-slate-950 p-1 border border-slate-850">
          <div
            class="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow"
          >
            <!-- Board Icon -->
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
            <span>Board</span>
          </div>
          <router-link
            to="/tasks/list"
            class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <!-- List Icon -->
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span>List</span>
          </router-link>
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

    <!-- KANBAN BOARD CONTAINER -->
    <div class="grid grid-cols-1 gap-5 md:grid-cols-3 items-start">
      <!-- Each Column -->
      <div
        v-for="col in columns"
        :key="col"
        class="flex flex-col rounded-2xl border border-slate-900/60 bg-slate-900/30 p-3 pb-4 shadow-sm"
      >
        <!-- Column Header -->
        <div class="flex items-center justify-between px-1.5 pb-3">
          <div class="flex items-center gap-2">
            <!-- Indicator status dot -->
            <span class="h-2 w-2 rounded-full" :class="columnMeta[col].dot"></span>
            <span class="text-sm font-bold tracking-wide text-slate-300">{{ col }}</span>
            <span
              class="rounded-full bg-slate-900 px-2 py-0.5 text-2xs font-semibold text-slate-500"
            >
              {{ groupedFilteredTasks[col]?.length || 0 }}
            </span>
          </div>

          <!-- Column Actions -->
          <div class="flex items-center gap-1 text-slate-500">
            <button
              @click="openModal(col, projects[0]?.id)"
              class="rounded-lg p-1 hover:bg-slate-800 hover:text-slate-300 transition-colors"
              title="Add task"
            >
              <svg
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>

            <button
              class="rounded-lg p-1 hover:bg-slate-800 hover:text-slate-300 transition-colors"
            >
              <svg
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Task Cards Area -->
        <div class="flex flex-col gap-3 min-h-[300px] mt-1">
          <TaskCard
            v-for="task in groupedFilteredTasks[col]"
            :key="task.id"
            :task="task"
            @select="openDetails"
          />

          <!-- Empty state indicator per column if zero tasks -->
          <div
            v-if="!groupedFilteredTasks[col] || groupedFilteredTasks[col].length === 0"
            class="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-900/50 py-10 px-4 text-center text-slate-600"
          >
            <svg
              class="h-6 w-6 stroke-1 mb-1.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2"
              />
            </svg>
            <span class="text-3xs font-medium tracking-wide">No Data</span>
          </div>
        </div>
      </div>
    </div>

    <CreateTaskModal
      v-if="showModal"
      :status="selectedStatus"
      :project-id="selectedProjectId"
      :projects="projects"
      :users="users"
      :priorities="Object.keys(priorityMeta)"
      :statuses="columns"
      :task-types="taskTypes"
      @close="closeModal"
      @create="handleCreateTask"
    />

    <TaskDetailsModal
      v-if="selectedTask"
      :task="selectedTask"
      :projects="projects"
      :users="users"
      :statuses="columns"
      :task-types="taskTypes"
      :priorities="Object.keys(priorityMeta)"
      @close="closeDetailsModal"
      @update="handleUpdateTask"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTasks } from '../composables/useTasks.js'
import { statuses, statusMeta, priorityMeta, taskTypes } from '../data/statuses.js'
import { projects } from '../data/projects.js'
import { users } from '../data/users.js'
import TaskCard from '../components/Task/TaskCard.vue'
import CreateTaskModal from '../components/Task/CreateTaskModal.vue'
import TaskDetailsModal from '../components/Task/TaskDetailsModal.vue'

const {
  groupedFilteredTasks,
  isFilterExpanded,
  activeFiltersCount,
  hasActiveFilters,
  addTask,
  updateTask,
} = useTasks()

const showModal = ref(false)
const selectedStatus = ref(null)
const selectedProjectId = ref(null)
const selectedTask = ref(null)

function openModal(status, projectId) {
  selectedStatus.value = status
  selectedProjectId.value = projectId ?? projects[0]?.id
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  selectedStatus.value = null
  selectedProjectId.value = null
}

function handleCreateTask(task) {
  addTask(task)
  closeModal()
}

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

// Columns config - imported from statuses
const columns = statuses

// Column colors mapping - imported from statuses
const columnMeta = statusMeta
</script>
