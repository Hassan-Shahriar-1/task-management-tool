<template>
  <div class="relative w-full max-w-sm">
    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
     <SearchIcon />
    </div>

    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search by title, description or tag..."
      class="w-full rounded-xl border border-slate-850 bg-slate-950 py-2 pl-9 pr-9 text-xs font-semibold text-slate-200 placeholder-slate-650 transition-all hover:border-slate-700 hover:bg-slate-900/60 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
    />

    <button
      v-if="searchQuery"
      type="button"
      @click="clearSearch"
      class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
    >
      <svg
        class="h-3.5 w-3.5"
        fill="none"
        viewBox="0 0 28 28"
        stroke="currentColor"
        stroke-width="2.5"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { useTasks } from '../../composables/useTasks.js'
import SearchIcon from '../icons/SearchIcon.vue';

const { searchQuery } = useTasks()

function clearSearch() {
  searchQuery.value = ''
}
</script>
