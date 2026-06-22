<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <!-- Backdrop Blur with Fade Animation -->
    <div
      class="absolute inset-0 bg-black/65 backdrop-blur-[4px] transition-opacity duration-300"
      @click="cancel"
    ></div>

    <!-- Modal Dialog with Scale In Animation -->
    <div
      class="relative w-full max-w-md transform overflow-hidden rounded-2xl border border-slate-850 bg-slate-950 p-6 shadow-2xl transition-all duration-300"
    >
      <div class="flex items-start gap-4">
        <!-- Warning / Danger Icon -->
        <div
          class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500"
          v-if="type === 'danger'"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <!-- Info / Primary Icon -->
        <div
          class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500"
          v-else
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <div class="flex-grow">
          <h3 class="text-sm font-bold text-white leading-6">{{ title }}</h3>
          <p class="mt-2 text-xs text-slate-400 leading-relaxed">{{ message }}</p>
        </div>
      </div>

      <!-- Action Footer -->
      <div class="mt-6 flex justify-end gap-3">
        <button
          type="button"
          class="rounded-xl border border-slate-850 bg-slate-900/40 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-850 hover:text-white transition-all cursor-pointer"
          @click="cancel"
        >
          {{ cancelLabel }}
        </button>
        <button
          type="button"
          class="rounded-xl px-4 py-2 text-xs font-semibold text-white shadow-lg transition-all cursor-pointer"
          :class="
            type === 'danger'
              ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/10'
              : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/10'
          "
          @click="confirm"
        >
          {{ confirmLabel }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Confirm Action',
  },
  message: {
    type: String,
    default: 'Are you sure you want to proceed?',
  },
  confirmLabel: {
    type: String,
    default: 'Confirm',
  },
  cancelLabel: {
    type: String,
    default: 'Cancel',
  },
  type: {
    type: String,
    default: 'danger', // 'danger' or 'primary'
  },
})

const emit = defineEmits(['confirm', 'cancel'])

function cancel() {
  emit('cancel')
}

function confirm() {
  emit('confirm')
}
</script>

<style scoped></style>
