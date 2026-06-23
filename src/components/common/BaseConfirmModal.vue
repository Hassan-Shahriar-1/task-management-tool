<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <!-- Backdrop with soft blur -->
    <div
      class="absolute inset-0 bg-black/60 backdrop-blur-[3px] transition-opacity duration-300"
      @click="cancel"
    ></div>

    <!-- Modal Dialog (Sleek minimalist style) -->
    <div
      class="relative w-full max-w-[360px] transform overflow-hidden rounded-2xl border border-slate-900 bg-slate-950/95 p-6 shadow-2xl transition-all duration-300 flex flex-col"
    >
      <!-- Top Colored Accent Gradient Bar -->
      <div
        class="absolute top-0 left-0 right-0 h-[3px]"
        :class="
          type === 'danger'
            ? 'bg-gradient-to-r from-rose-500 via-red-500 to-rose-600'
            : 'bg-gradient-to-r from-indigo-500 via-brand-500 to-violet-600'
        "
      ></div>

      <!-- Content Layout -->
      <div class="flex flex-col gap-2">
        <!-- Title & Status Tag -->
        <div class="flex items-center justify-between gap-3">
          <h3 class="text-sm font-bold text-slate-100 tracking-tight">{{ title }}</h3>
          
          <!-- Subtle top right tag -->
          <span
            class="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider select-none border"
            :class="
              type === 'danger'
                ? 'bg-rose-950/20 text-rose-400 border-rose-900/30'
                : 'bg-indigo-950/20 text-indigo-400 border-indigo-900/30'
            "
          >
            {{ type === 'danger' ? 'Warning' : 'Confirm' }}
          </span>
        </div>

        <!-- Description Message -->
        <p class="text-xs text-slate-400 leading-relaxed pr-2">
          {{ message }}
        </p>
      </div>

      <!-- Action Buttons (Right-aligned, minimalist spacing) -->
      <div class="mt-6 flex justify-end gap-2.5 w-full">
        <button
          type="button"
          class="rounded-xl border border-slate-900 bg-slate-950 hover:bg-slate-900/60 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-all cursor-pointer"
          @click="cancel"
        >
          {{ cancelLabel }}
        </button>
        <button
          type="button"
          class="rounded-xl px-4 py-2 text-xs font-semibold text-white shadow-md transition-all cursor-pointer"
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
