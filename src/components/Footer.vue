<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer
    class="mt-auto w-full border-t border-slate-900 bg-slate-950/60 py-8 transition-colors duration-300"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div class="flex flex-col items-center gap-2 sm:items-start">
          <div class="flex items-center gap-2">
           
           
          </div>
          <p class="inline-flex gap-3 text-xs text-slate-500">

            

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
            © {{ currentYear }} Task Management Tool. All rights reserved.
          </p>
        </div>

        <div class="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-slate-400">
          <a href="#" class="hover:text-brand-400 transition-colors duration-200">About</a>
          <a href="#" class="hover:text-brand-400 transition-colors duration-200">Privacy Policy</a>
          <a href="#" class="hover:text-brand-400 transition-colors duration-200"
            >Terms of Service</a
          >
        </div>

       
      </div>
    </div>
  </footer>
</template>
