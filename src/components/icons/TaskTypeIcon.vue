<template>
  <component :is="typeIconMap[type] || TaskIcon" />
</template>

<script setup>
import TaskIcon from './TaskIcon.vue'
import BugIcon from './BugIcon.vue'
import FeatureIcon from './FeatureIcon.vue'
import ImprovementIcon from './ImprovementIcon.vue'

defineProps({
  type: {
    type: String,
    required: true,
  },
})

const typeIconMap = {
  Task: TaskIcon,
  Bug: BugIcon,
  Feature: FeatureIcon,
  Improvement: ImprovementIcon,
}
</script>
