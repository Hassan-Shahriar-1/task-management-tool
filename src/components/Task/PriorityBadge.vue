<template>
  <span
    :class="badgeClasses"
    class="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] flex items-center gap-1"
  >
    <span>{{ priorityIcon }}</span>
    <span>{{ priority }}</span>
  </span>
</template>

<script setup>
import { computed } from 'vue'
import { priorityMeta } from '../../data/statuses.js'

const props = defineProps({
  priority: {
    type: String,
    required: true,
  },
})

const priorityIcon = computed(() => priorityMeta[props.priority]?.icon || '')

const badgeClasses = computed(() => {
  const priorityColors = {
    High: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
    Medium: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    Low: 'bg-slate-500/10 text-slate-400 border border-slate-800',
  }

  return priorityColors[props.priority] || 'bg-slate-700/70 text-slate-300 border border-slate-800'
})
</script>
