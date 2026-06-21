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
          <span class="text-slate-400">Task Management Tool</span>
        </div>
        <h1 class="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Sprint 4 Board
        </h1>
      </div>

      <!-- Team Members Avatars -->
      <div class="flex items-center -space-x-2.5">
        <div
          class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-xs font-bold text-white ring-2 ring-slate-950 shadow-lg"
          title="John Doe"
        >
          JD
        </div>
        <div
          class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-400 to-fuchsia-600 text-xs font-bold text-white ring-2 ring-slate-950 shadow-lg"
          title="Alice Lin"
        >
          AL
        </div>
        <div
          class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-xs font-bold text-white ring-2 ring-slate-950 shadow-lg"
          title="Steve Miller"
        >
          SM
        </div>
        <div
          class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-indigo-600 text-xs font-bold text-white ring-2 ring-slate-950 shadow-lg"
          title="Sarah Jenkins"
        >
          SJ
        </div>
        <button
          class="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-xs font-semibold text-slate-400 ring-2 ring-slate-950 hover:bg-slate-800 hover:text-slate-200 transition-all duration-200"
          title="Add member"
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
      </div>
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
              {{ groupedTasks[col]?.length || 0 }}
            </span>
          </div>

          <!-- Column Actions -->
          <div class="flex items-center gap-1 text-slate-500">
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
          <TaskCard :task="dummyTask" />
          <div
            v-for="task in groupedTasks[col]"
            :key="task.id"
            class="group flex flex-col rounded-xl border border-slate-900 bg-slate-950 p-4 shadow-sm hover:border-slate-800/80 hover:shadow-md hover:shadow-brand-950/10 cursor-grab active:cursor-grabbing hover:-translate-y-[2px] transition-all duration-300"
          >
            <!-- Card Head: Task ID & Priority -->
            <div class="flex items-center justify-between mb-2">
              <span
                class="text-2xs font-semibold text-slate-500 tracking-wider group-hover:text-slate-400 transition-colors"
              >
                {{ task.id }}
              </span>
              <span
                class="flex items-center gap-1 rounded-full px-2 py-0.5 text-3xs font-semibold uppercase tracking-wider"
                :class="[priorityMeta[task.priority].bg, priorityMeta[task.priority].text]"
              >
                <span>{{ priorityMeta[task.priority].icon }}</span>
                <span>{{ task.priority }}</span>
              </span>
            </div>

            <!-- Card Title -->
            <h3
              class="text-sm font-bold text-slate-200 line-clamp-2 leading-snug group-hover:text-white transition-colors"
            >
              {{ task.title }}
            </h3>

            <!-- Card Description -->
            <p class="mt-1 text-2xs text-slate-500 line-clamp-2 leading-relaxed">
              {{ task.description }}
            </p>

            <!-- Card Tags -->
            <div class="mt-3 flex flex-wrap gap-1.5">
              <span
                v-for="tag in task.tags"
                :key="tag"
                class="rounded-md border border-slate-900 bg-slate-900/30 px-1.5 py-0.5 text-3xs font-semibold text-slate-400"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Card Footer: Subtask progress and Assignee -->
            <div
              class="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between gap-2"
            >
              <!-- Assignee -->
              <div
                class="h-7 w-7 rounded-lg bg-gradient-to-br flex items-center justify-center text-3xs font-bold text-white ring-1 ring-slate-800 shadow"
                :class="task.assignee.color"
                :title="'Assigned to ' + task.assignee.name"
              >
                {{ task.assignee.initial }}
              </div>
            </div>
          </div>

          <!-- Empty state indicator per column if zero tasks -->
          <div
            v-if="!groupedTasks[col] || groupedTasks[col].length === 0"
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
            <span class="text-3xs font-medium tracking-wide">Empty Column</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { tasks as tasksData } from '../data/tasks.js'
import { users } from '../data/users.js'
import { statuses, statusMeta, priorityMeta } from '../data/statuses.js'
import { projects } from '../data/projects.js'
import TaskCard from '../components/TaskCard.vue'

// Initialize reactive tasks data
const tasks = ref(tasksData)

// Columns config - imported from statuses
const columns = statuses

// Column colors mapping - imported from statuses
const columnMeta = statusMeta

// Filtered tasks logic
const filteredTasks = computed(() => {
  return tasks.value
})

// Group tasks by column status
const groupedTasks = computed(() => {
  const groups = {}
  columns.forEach((col) => {
    groups[col] = tasks.value.filter((task) => task.status === col)
  })
  return groups
})

const dummyTask = {
  id: 'T-000',
  title: 'Sample Task Title',
  description: 'This is a sample task description to illustrate the card layout.',
  priority: 'High',
  tags: ['frontend', 'bug'],
  assignee: users[0],
  due_date: '2024-07-15',
}
</script>
