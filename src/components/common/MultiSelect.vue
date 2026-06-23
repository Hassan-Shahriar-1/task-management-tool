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
      <div class="flex items-center gap-1.5 truncate max-w-[160px]">
        <span>{{ placeholder }}</span>
        <span
          v-if="modelValue.length > 0"
          class="flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-indigo-600/30 px-1 text-[9px] font-bold text-indigo-400 border border-indigo-500/20"
        >
          {{ modelValue.length }}
        </span>
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
        class="absolute left-0 mt-1.5 z-50 min-w-[200px] max-h-60 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950 p-1.5 shadow-xl backdrop-blur-md"
      >
        <div class="space-y-0.5">
          <div
            v-for="option in parsedOptions"
            :key="option.value"
            @click.stop="toggleOption(option.value)"
            class="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-xs text-slate-350 hover:bg-slate-900 hover:text-white transition-all select-none"
            :class="{ 'bg-slate-900/40 text-white font-medium': isSelected(option.value) }"
          >
            <div
              class="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border transition-all"
              :class="
                isSelected(option.value)
                  ? 'border-indigo-500 bg-indigo-600'
                  : 'border-slate-800 bg-slate-900 group-hover:border-slate-700'
              "
            >
              <svg
                v-if="isSelected(option.value)"
                class="h-3 w-3 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>

            <div
              v-if="option.avatarUrl"
              class="h-5 w-5 rounded-full overflow-hidden flex-shrink-0 bg-slate-850"
            >
              <img :src="option.avatarUrl" alt="" class="h-full w-full object-cover" />
            </div>
            <div
              v-else-if="option.colorClass"
              class="h-5 w-5 rounded-full bg-gradient-to-br flex items-center justify-center text-[8px] font-bold text-white shadow-sm flex-shrink-0"
              :class="option.colorClass"
            >
              {{ option.initial }}
            </div>
            <component
              v-else-if="option.icon && typeof option.icon !== 'string'"
              :is="option.icon"
              class="h-4 w-4 flex-shrink-0 rounded"
            />
            <span v-else-if="option.icon" class="text-xs flex-shrink-0">{{ option.icon }}</span>

            <span class="truncate">{{ option.label }}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Filter options',
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

function isSelected(value) {
  return props.modelValue.includes(value)
}

function toggleOption(value) {
  const current = [...props.modelValue]
  const index = current.indexOf(value)
  if (index === -1) {
    current.push(value)
  } else {
    current.splice(index, 1)
  }
  emit('update:modelValue', current)
}

function toggleDropdown() {
  isOpen.value = !isOpen.value
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
