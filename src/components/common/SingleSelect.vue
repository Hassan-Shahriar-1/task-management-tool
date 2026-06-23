<template>
  <div class="relative inline-block text-left" ref="selectRef">
    <label v-if="label" class="block text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
      {{ label }}
    </label>

    <button
      type="button"
      @click="toggleDropdown"
      class="flex min-w-[140px] items-center justify-between gap-2.5 rounded-xl border border-slate-850 bg-slate-950 px-3.5 py-2 text-xs font-semibold text-slate-200 shadow-sm transition-all hover:bg-slate-900/60 hover:text-white hover:border-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 cursor-pointer"
      :class="{ 'border-indigo-500 ring-4 ring-indigo-500/10': isOpen }"
    >
      <div class="flex items-center gap-2">
        <component
          v-if="selectedOption?.icon && typeof selectedOption.icon !== 'string'"
          :is="selectedOption.icon"
          class="h-4 w-4 flex-shrink-0 rounded"
        />
        <span v-else-if="selectedOption?.icon" class="text-xs">{{ selectedOption.icon }}</span>
        <span>{{ selectedOption?.label || placeholder }}</span>
      </div>
      <svg
        class="h-3.5 w-3.5 text-slate-500 transition-transform duration-200"
        :class="{ 'rotate-180 text-indigo-400': isOpen }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0 -translate-y-1"
      enter-to-class="transform scale-100 opacity-100 translate-y-0"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100 translate-y-0"
      leave-to-class="transform scale-95 opacity-0 -translate-y-1"
    >
      <div
        v-if="isOpen"
        class="absolute left-0 mt-1.5 z-50 min-w-[180px] max-h-60 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950 p-1.5 shadow-xl backdrop-blur-md"
      >
        <div
          v-for="option in parsedOptions"
          :key="option.value"
          @click="selectOption(option)"
          class="flex items-center justify-between gap-3 px-3 py-2 rounded-lg cursor-pointer text-xs text-slate-350 hover:bg-slate-900 hover:text-white transition-all"
          :class="{ 'bg-slate-900 text-white font-semibold': option.value === modelValue }"
        >
          <div class="flex items-center gap-2">
            <component
              v-if="option.icon && typeof option.icon !== 'string'"
              :is="option.icon"
              class="h-4 w-4 flex-shrink-0 rounded"
            />
            <span v-else-if="option.icon" class="text-xs">{{ option.icon }}</span>
            <span>{{ option.label }}</span>
          </div>
          <svg
            v-if="option.value === modelValue"
            class="h-3.5 w-3.5 text-indigo-400 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean, Object],
    default: null,
  },
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Select option',
  },
  label: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const selectRef = ref(null)

const parsedOptions = computed(() => {
  return props.options.map((opt) => {
    if (typeof opt === 'string' || typeof opt === 'number') {
      return { label: opt.toString(), value: opt }
    }
    return opt
  })
})

const selectedOption = computed(() => {
  return parsedOptions.value.find((opt) => opt.value === props.modelValue) || null
})

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function selectOption(option) {
  emit('update:modelValue', option.value)
  isOpen.value = false
}

function handleClickOutside(event) {
  if (selectRef.value && !selectRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
