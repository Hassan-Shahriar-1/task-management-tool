<template>
  <div class="flex flex-col gap-3 m-1 min-h-[22rem] max-h-[22rem]">
    <div
      @click="selectTask"
      class="group flex flex-col rounded-xl border border-slate-900 bg-slate-950 p-4 shadow-sm hover:border-slate-800/80 hover:shadow-md hover:shadow-brand-950/10 cursor-pointer hover:-translate-y-[2px] transition-all duration-300"
    >
      <!-- Card Head: Task ID, Type & Priority -->
      <div class="flex items-center justify-between mb-2 gap-3">
        <div class="flex items-center gap-2">
          <span
            class="text-2xs font-semibold text-slate-500 tracking-wider group-hover:text-slate-400 transition-colors"
          >
            {{ task.id }}
          </span>
          <span
            class="rounded-full bg-slate-800 px-2 py-1 text-2xs uppercase tracking-[0.22em] text-slate-300"
          >
            {{ task.type || 'Task' }}
          </span>
        </div>
        <PriorityBadge :priority="task.priority" />
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
          class="rounded-md border border-slate-900 bg-slate-900/30 px-1.5 py-0.5 text-sm text-slate-200"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Card Footer:  Due date and Assignee -->
      <div class="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between gap-2">
        <!-- Assignee -->
        <div
          class="h-7 w-7 rounded-lg bg-gradient-to-br flex items-center justify-center text-3xs font-bold text-white ring-1 ring-slate-800 shadow"
          :class="task.assignee?.color"
          :title="'Assigned to ' + (task.assignee?.name || 'Unassigned')"
        >
          {{ task.assignee?.initial || '?' }}
        </div>

        <div class="flex items-center gap-2">
          <div v-if="task.due_date" class="flex items-center gap-2">
            <IconCalendar :class="dueClass" />
            <span :class="['text-2xs font-semibold', dueClass]">{{ formattedDueDate }}</span>
          </div>
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

const dueClass = computed(() => {
  if (!dueStatus.value) return 'text-slate-400'
  if (dueStatus.value === 'overdue') return 'text-red-400'
  if (dueStatus.value === 'imminent') return 'text-amber-400'
  return 'text-slate-400'
})

const formattedDueDate = computed(() => {
  if (!props.task.due_date) return ''
  return dayjs(props.task.due_date).format('MMM D')
})
</script>
