import { ref, computed } from 'vue'
import { tasks as initialTasks } from '../data/tasks.js'
import { statuses } from '../data/statuses.js'

const STORAGE_KEY = 'todo.tasks'
const tasks = ref([])
let loaded = false

function loadTasks() {
  if (loaded) return
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      tasks.value = JSON.parse(raw).map((task) => ({
        type: task.type || 'Task',
        ...task,
      }))
      loaded = true
      return
    }
  } catch (error) {
    console.error('Failed to load tasks from localStorage:', error)
  }
  tasks.value = initialTasks
  saveTasks()
  loaded = true
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.value))
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error)
  }
}

function addTask(task) {
  tasks.value.unshift(task)
  saveTasks()
}

function updateTask(updatedTask) {
  const index = tasks.value.findIndex((task) => task.id === updatedTask.id)
  if (index !== -1) {
    tasks.value[index] = { ...tasks.value[index], ...updatedTask }
    saveTasks()
  }
}

const groupedTasks = computed(() => {
  const groups = {}
  statuses.forEach((status) => {
    groups[status] = tasks.value.filter((task) => task.status === status)
  })
  return groups
})

export function useTasks() {
  loadTasks()
  return {
    tasks,
    groupedTasks,
    addTask,
    updateTask,
    saveTasks,
  }
}
