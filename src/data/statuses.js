// Statuses/Columns data
export const statuses = ['To Do', 'In Progress', 'Done']

export const statusMeta = {
  'To Do': { dot: 'bg-blue-500', bg: 'bg-blue-500/10', text: 'text-blue-400' },
  'In Progress': { dot: 'bg-amber-500', bg: 'bg-amber-500/10', text: 'text-amber-400' },
  Done: { dot: 'bg-emerald-500', bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
}

export const priorityMeta = {
  High: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20', icon: '🔥' },
  Medium: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/20',
    icon: '⚡',
  },
  Low: { bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-800', icon: '💤' },
}

export const taskTypes = ['Task', 'Bug', 'Feature', 'Improvement']

export const taskTypeMeta = {
  Task: { icon: '✓', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  Bug: { icon: '🐛', color: 'text-rose-400', bg: 'bg-rose-500/10' },
  Feature: { icon: '⭐', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  Improvement: { icon: '📈', color: 'text-amber-400', bg: 'bg-amber-500/10' },
}

export default { statuses, statusMeta, priorityMeta, taskTypes, taskTypeMeta }
