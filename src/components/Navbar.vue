<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const activeLink = ref('Dashboard')

const navLinks = [
  { name: 'Dashboard', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Team', path: '/team' },
  { name: 'Settings', path: '/settings' },
]
</script>

<template>
  <nav
    class="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md transition-colors duration-300"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Left: Brand Logo -->
        <div class="flex items-center gap-3">
          <RouterLink to="/" class="flex items-center gap-2.5 group">
            <div
              class="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-violet-500 shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-300"
            >
              <svg
                class="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
              <!-- Ambient Glow -->
              <div
                class="absolute inset-0 -z-10 rounded-xl bg-gradient-to-tr from-brand-500 to-violet-400 opacity-0 blur-md group-hover:opacity-75 transition-opacity duration-300"
              ></div>
            </div>
            <span
              class="bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-lg font-bold tracking-tight text-transparent"
            >
              Task
              <span
                class="bg-gradient-to-r from-brand-400 to-violet-400 bg-clip-text text-transparent"
                >Management</span
              >
            </span>
          </RouterLink>
        </div>

        <!-- Middle: Navigation Links -->
        <div class="hidden md:flex items-center gap-1">
          <RouterLink
            v-for="link in navLinks"
            :key="link.name"
            :to="link.path"
            @click="activeLink = link.name"
            class="relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200"
            :class="[
              activeLink === link.name
                ? 'text-slate-100 bg-slate-900/60'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30',
            ]"
          >
            {{ link.name }}
            <!-- Smooth underline for active state -->
            <span
              v-if="activeLink === link.name"
              class="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-brand-500 to-violet-500"
            ></span>
          </RouterLink>
        </div>

        <!-- Right: User Profile controls -->
        <div class="flex items-center gap-4">
          <button
            class="relative rounded-xl border border-slate-800 bg-slate-900/40 p-2 text-slate-400 hover:bg-slate-900 hover:text-slate-200 focus:outline-none transition-all duration-200"
          >
            <span class="sr-only">View notifications</span>
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span class="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"
              ></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
          </button>

          <!-- User Avatar -->
          <div class="relative flex items-center gap-3">
            <button
              class="flex rounded-xl ring-2 ring-slate-800 hover:ring-brand-500/50 transition-all duration-200"
            >
              <div
                class="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-400 to-brand-600 flex items-center justify-center text-xs font-bold text-white shadow-inner"
              >
                JD
              </div>
            </button>
            <div class="hidden lg:flex flex-col text-left">
              <span class="text-xs font-semibold text-slate-300">John Doe</span>
              <span class="text-[10px] text-slate-500">Product Owner</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
