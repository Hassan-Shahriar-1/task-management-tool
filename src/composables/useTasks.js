import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { tasks as initialTasks } from '../data/tasks.js'
import { statuses } from '../data/statuses.js'
import { users } from '../data/users.js'

const STORAGE_KEY = 'todo.tasks'
const tasks = ref([])
let loaded = false

// Global filter states
const searchQuery = ref('')
const selectedPriorities = ref([])
const selectedAssignees = ref([])
const selectedTypes = ref([])
const selectedProjects = ref([])
const isFilterExpanded = ref(false)

const activeFiltersCount = computed(() => {
  let count = 0
  if (selectedProjects.value.length > 0) count += selectedProjects.value.length
  if (selectedPriorities.value.length > 0) count += selectedPriorities.value.length
  if (selectedAssignees.value.length > 0) count += selectedAssignees.value.length
  if (selectedTypes.value.length > 0) count += selectedTypes.value.length
  return count
})

const hasActiveFilters = computed(() => activeFiltersCount.value > 0)

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

function deleteTask(id) {
  tasks.value = tasks.value.filter((task) => task.id !== id)
  saveTasks()
}

const groupedTasks = computed(() => {
  const groups = {}
  statuses.forEach((status) => {
    groups[status] = tasks.value.filter((task) => task.status === status)
  })
  return groups
})

const filteredTasks = computed(() => {
  return tasks.value.filter((task) => {
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase().trim()
      const titleMatch = task.title?.toLowerCase().includes(q)
      const descMatch = task.description?.toLowerCase().includes(q)
      const idMatch = task.id?.toLowerCase().includes(q)
      const tagMatch = task.tags?.some((tag) => tag.toLowerCase().includes(q))
      if (!titleMatch && !descMatch && !idMatch && !tagMatch) {
        return false
      }
    }

    if (selectedPriorities.value.length > 0) {
      if (!selectedPriorities.value.includes(task.priority)) {
        return false
      }
    }

    // Assignee filter
    if (selectedAssignees.value.length > 0) {
      const assigneeName = task.assignee?.name || 'Unassigned'
      let assigneeId = 'Unassigned'
      if (assigneeName !== 'Unassigned') {
        const foundUser = users.find((u) => u.name === assigneeName)
        if (foundUser) {
          assigneeId = foundUser.id
        }
      }
      if (!selectedAssignees.value.includes(assigneeId)) {
        return false
      }
    }

    //  Type filter
    if (selectedTypes.value.length > 0) {
      const type = task.type || 'Task'
      if (!selectedTypes.value.includes(type)) {
        return false
      }
    }

    // Project filter
    if (selectedProjects.value.length > 0) {
      if (!selectedProjects.value.includes(task.projectId)) {
        return false
      }
    }

    return true
  })
})

const groupedFilteredTasks = computed(() => {
  const groups = {}
  statuses.forEach((status) => {
    groups[status] = filteredTasks.value.filter((task) => task.status === status)
  })
  return groups
})

function clearFilters() {
  searchQuery.value = ''
  selectedPriorities.value = []
  selectedAssignees.value = []
  selectedTypes.value = []
  selectedProjects.value = []
}

export function useTasks() {
  loadTasks()

  const router = useRouter()
  const route = useRoute()

  if (route && router) {
    //  Sync from route query on startup
    const syncFiltersFromRoute = (r) => {
      if (r.query.search !== undefined) {
        searchQuery.value = r.query.search
      }
      if (r.query.priority !== undefined) {
        selectedPriorities.value = r.query.priority ? r.query.priority.split(',') : []
      }
      if (r.query.assignee !== undefined) {
        selectedAssignees.value = r.query.assignee
          ? r.query.assignee.split(',').map((val) => (val === 'Unassigned' ? 'Unassigned' : (Number(val) || val)))
          : []
      }
      if (r.query.type !== undefined) {
        selectedTypes.value = r.query.type ? r.query.type.split(',') : []
      }
      if (r.query.project !== undefined) {
        selectedProjects.value = r.query.project ? r.query.project.split(',').map(Number) : []
      }
    }

    syncFiltersFromRoute(route)

    // Helper to check if two query objects are identical
    const isSameQuery = (q1, q2) => {
      const keys1 = Object.keys(q1)
      const keys2 = Object.keys(q2)
      if (keys1.length !== keys2.length) return false
      for (const key of keys1) {
        if (q1[key] !== q2[key]) return false
      }
      return true
    }

    // Watch filters and update route
    watch(
      [searchQuery, selectedPriorities, selectedAssignees, selectedTypes, selectedProjects],
      () => {
        const query = { ...route.query }

        if (searchQuery.value) {
          query.search = searchQuery.value
        } else {
          delete query.search
        }

        if (selectedPriorities.value.length > 0) {
          query.priority = selectedPriorities.value.join(',')
        } else {
          delete query.priority
        }

        if (selectedAssignees.value.length > 0) {
          query.assignee = selectedAssignees.value.join(',')
        } else {
          delete query.assignee
        }

        if (selectedTypes.value.length > 0) {
          query.type = selectedTypes.value.join(',')
        } else {
          delete query.type
        }

        if (selectedProjects.value.length > 0) {
          query.project = selectedProjects.value.join(',')
        } else {
          delete query.project
        }

        if (!isSameQuery(route.query, query)) {
          router.replace({ query }).catch((err) => {
            if (err.name !== 'NavigationDuplicated') throw err
          })
        }
      },
      { deep: true }
    )

    //  Watch route query changes (for back/forward navigation or manual URL edits)
    watch(
      () => route.query,
      (newQuery) => {
        const routeSearch = newQuery.search || ''
        if (searchQuery.value !== routeSearch) {
          searchQuery.value = routeSearch
        }

        const routePriorities = newQuery.priority ? newQuery.priority.split(',') : []
        if (JSON.stringify(selectedPriorities.value) !== JSON.stringify(routePriorities)) {
          selectedPriorities.value = routePriorities
        }

        const routeAssignees = newQuery.assignee
          ? newQuery.assignee.split(',').map((val) => (val === 'Unassigned' ? 'Unassigned' : (Number(val) || val)))
          : []
        if (JSON.stringify(selectedAssignees.value) !== JSON.stringify(routeAssignees)) {
          selectedAssignees.value = routeAssignees
        }

        const routeTypes = newQuery.type ? newQuery.type.split(',') : []
        if (JSON.stringify(selectedTypes.value) !== JSON.stringify(routeTypes)) {
          selectedTypes.value = routeTypes
        }

        const routeProjects = newQuery.project ? newQuery.project.split(',').map(Number) : []
        if (JSON.stringify(selectedProjects.value) !== JSON.stringify(routeProjects)) {
          selectedProjects.value = routeProjects
        }
      },
      { deep: true }
    )
  }

  return {
    tasks,
    groupedTasks,
    filteredTasks,
    groupedFilteredTasks,
    searchQuery,
    selectedPriorities,
    selectedAssignees,
    selectedTypes,
    selectedProjects,
    isFilterExpanded,
    activeFiltersCount,
    hasActiveFilters,
    clearFilters,
    addTask,
    updateTask,
    deleteTask,
    saveTasks,
  }
}
