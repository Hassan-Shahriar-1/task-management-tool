<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer
    class="mt-auto w-full border-t border-slate-900 bg-slate-950/60 py-8 transition-colors duration-300"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <!-- Left: Brand Info -->
        <div class="flex flex-col items-center gap-2 sm:items-start">
          <div class="flex items-center gap-2">
            <div
              class="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-tr from-brand-600 to-violet-500 text-white"
            >
              <svg
                class="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <span class="text-sm font-semibold tracking-tight text-slate-300">
              Task <span class="text-brand-400">Management</span>
            </span>
          </div>
          <p class="text-xs text-slate-500">
            © {{ currentYear }} Task Management Tool. All rights reserved.
          </p>
        </div>

        <!-- Middle: Links -->
        <div class="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-slate-400">
          <a href="#" class="hover:text-brand-400 transition-colors duration-200">About</a>
          <a href="#" class="hover:text-brand-400 transition-colors duration-200">Documentation</a>
          <a href="#" class="hover:text-brand-400 transition-colors duration-200">Privacy Policy</a>
          <a href="#" class="hover:text-brand-400 transition-colors duration-200"
            >Terms of Service</a
          >
          <a href="#" class="hover:text-brand-400 transition-colors duration-200">System Status</a>
        </div>

        <!-- Right: Social Links -->
        <div class="flex gap-4">
          <!-- Github -->
          <a
            href="#"
            class="rounded-lg border border-slate-800 bg-slate-900/20 p-2 text-slate-500 hover:bg-slate-900 hover:text-slate-300 transition-all duration-200"
          >
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path
                fill-rule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.646.64.699 1.026 1.592 1.026 2.683 0 3.842-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
          <!-- Twitter -->
          <a
            href="#"
            class="rounded-lg border border-slate-800 bg-slate-900/20 p-2 text-slate-500 hover:bg-slate-900 hover:text-slate-300 transition-all duration-200"
          >
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
