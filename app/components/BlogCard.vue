<template>
  <div class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
    <div class="h-48 bg-gray-200 w-full overflow-hidden">
      <img 
        :src="`https://source.unsplash.com/random/800x600?${category}`" 
        alt="Blog Cover" 
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    
    <div class="p-6">
      <div class="flex items-center justify-between mb-3">
        <span class="text-xs font-semibold px-2 py-1 bg-blue-50 text-blue-600 rounded-md uppercase tracking-wide">{{ category }}</span>
        <span class="text-xs text-gray-400">{{ date }}</span>
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{{ title }}</h3>
      <p class="text-gray-600 text-sm line-clamp-3 mb-4">
        {{ excerpt }}
      </p>
      <button class="text-blue-600 font-semibold text-sm hover:underline flex items-center gap-1">
        Read Article <span>&rarr;</span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  excerpt: String,
  date: String,
  category: String
})
</script>