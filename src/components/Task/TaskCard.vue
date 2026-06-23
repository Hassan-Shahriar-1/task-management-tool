<template>
  <div class="flex flex-col gap-3 m-1">
    <div
      @click="selectTask"
      class="group flex flex-col rounded-xl border bg-slate-950 p-4 shadow-sm hover:shadow-md hover:shadow-brand-950/10 cursor-pointer hover:-translate-y-[2px] transition-all duration-300"
      :class="
        isOverdue
          ? 'border-rose-500/40 hover:border-rose-500'
          : 'border-slate-900 hover:border-slate-800/80'
      "
    >
      <!-- Card Head: Task ID, Type & Priority -->
      <div class="flex items-center justify-between mb-2 gap-3">
        <div class="flex items-center gap-2">
          <span
            class="rounded-full py-0.5 text-2xs font-medium flex items-center gap-1.5"
            :class="taskTypeMeta[task.type || 'Task']?.bg || 'bg-slate-800'"
          >
            <TaskTypeIcon :type="task.type || 'Task'" class="h-3.5 w-3.5 flex-shrink-0" />
            <!-- <span :class="taskTypeMeta[task.type || 'Task']?.color || 'text-slate-300'">
              {{ task.type || 'Task' }}
            </span> -->
          </span>
          <span
            class="text-2xs font-semibold text-slate-500 tracking-wider group-hover:text-slate-400 transition-colors"
          >
            {{ task.id }}
          </span>
        </div>
        <PriorityBadge :priority="task.priority" />
      </div>

      <!-- Card Title and Assignee (Jira style - rightmost of title card) -->
      <div class="flex items-start justify-between gap-3 mt-1">
        <h3
          class="text-xs font-bold text-slate-200 line-clamp-2 leading-snug group-hover:text-white transition-colors flex-grow"
        >
          {{ task.title }}
        </h3>
        <!-- Assignee Circle Avatar -->
        <div
          v-if="task.assignee && task.assignee.name !== 'Unassigned'"
          class="h-6 w-6 rounded-full bg-gradient-to-br flex items-center justify-center text-[10px] font-bold text-white ring-1 ring-slate-800/80 shadow-sm flex-shrink-0"
          :class="task.assignee.color"
          :title="'Assigned to: ' + task.assignee.name"
        >
          {{ task.assignee.initial }}
        </div>
        <div
          v-else
          class="h-6 w-6 rounded-full bg-slate-900 border border-slate-850 flex items-center justify-center text-slate-550 shadow-sm flex-shrink-0"
          title="Unassigned"
        >
          <svg class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>

      <!-- Card Description -->
      <!-- <p class="mt-1 text-2xs text-slate-500 line-clamp-2 leading-relaxed">
        {{ task.description }}
      </p> -->

      <!-- Card Tags -->
      <div class="mt-3 flex flex-wrap gap-1.5">
        <span
          v-for="tag in task.tags"
          :key="tag"
          class="rounded-md border border-slate-900 bg-slate-900/30 px-1.5 py-0.5 text-2xs text-slate-300"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Card Footer: Created By & Due Date -->
      <div
        class="mt-3.5 pt-2.5 border-t border-slate-900/60 flex items-center justify-between gap-2 text-2xs"
      >
        <!-- Left Side: Created By -->
        <div class="flex items-center gap-1.5">
          <div
            class="h-4.5 w-4.5 rounded-full bg-gradient-to-br flex items-center justify-center text-[9px] font-bold text-white ring-1 ring-slate-800/80 shadow-sm"
            :class="task.reporter?.color || 'from-slate-700 to-slate-850'"
            :title="'Created by: ' + (task.reporter?.name || 'System')"
          >
            {{ task.reporter?.initial || 'S' }}
          </div>
          <span class="text-slate-500 font-medium">
            By
            <span class="text-slate-350 hover:text-white transition-colors">{{
              task.reporter?.name || 'System'
            }}</span>
          </span>
        </div>

        <!-- Right Side: Due Date -->
        <div v-if="task.due_date" class="flex items-center gap-1.5">
          <IconCalendar :class="dueClass" class="h-3.5 w-3.5" />
          <span :class="['font-semibold', dueClass]">{{ formattedDueDate }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import dayjs from 'dayjs'
import IconCalendar from '../icons/IconCalendar.vue'
import PriorityBadge from './PriorityBadge.vue'
import { taskTypeMeta } from '../../data/statuses.js'
import TaskTypeIcon from '../icons/TaskTypeIcon.vue'

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select'])

function selectTask() {
  emit('select', props.task)
}

const dueStatus = computed(() => {
  if (!props.task.due_date) return null
  const due = dayjs(props.task.due_date).startOf('day')
  const today = dayjs().startOf('day')
  const tomorrow = dayjs().add(1, 'day').startOf('day')

  if (due.isBefore(today)) return 'overdue'
  if (due.isSame(today) || due.isSame(tomorrow)) return 'imminent'
  return 'upcoming'
})

const isOverdue = computed(() => {
  return dueStatus.value === 'overdue' && props.task.status !== 'Done'
})

const dueClass = computed(() => {
  if (!dueStatus.value) return 'text-slate-400'
  if (dueStatus.value === 'overdue') return 'text-red-400'
  if (dueStatus.value === 'imminent') return 'text-amber-400'
  return 'text-slate-400'
})

const formattedDueDate = computed(() => {
  if (!props.task.due_date) return ''
  return dayjs(props.task.due_date).format('YYYY-MM-DD')
})
</script>
