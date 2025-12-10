<template>
  <nav class="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        
        <div class="flex-shrink-0 cursor-pointer" @click="scrollToTop">
          <span class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Third Aragon
          </span>
        </div>

        <div class="hidden md:flex items-center space-x-8 text-sm font-medium">
          <a v-for="link in navLinks" :key="link.href" :href="link.href" class="text-gray-600 hover:text-blue-600 transition hover:-translate-y-0.5">
            {{ link.name }}
          </a>
          
          <button 
            v-if="!user"
            class="px-5 py-2 rounded-full bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 transition-transform transform hover:scale-105 shadow-lg flex items-center gap-2"
            @click="handleLogin"
          >
            <span>Login</span>
          </button>

          <div v-else class="flex items-center gap-4">
            <img 
              v-if="user.photo" 
              :src="user.photo" 
              alt="User" 
              class="h-8 w-8 rounded-full border border-gray-200 shadow-sm"
              :title="user.name"
            >
            <button 
              class="px-5 py-2 rounded-full border border-red-100 bg-red-50 text-red-600 font-medium text-sm hover:bg-red-100 transition-transform transform hover:scale-105"
              @click="handleLogout"
            >
              Logout
            </button>
          </div>
        </div>

        <div class="md:hidden flex items-center gap-3">
          <img 
             v-if="user && user.photo" 
             :src="user.photo" 
             alt="User" 
             class="h-8 w-8 rounded-full border border-gray-200"
          >

          <button @click="isOpen = !isOpen" class="text-slate-600 hover:text-blue-600 focus:outline-none p-2">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <div v-if="isOpen" class="md:hidden bg-white border-b border-gray-100 absolute w-full left-0 top-16 shadow-2xl py-4">
        <div class="px-4 space-y-3 flex flex-col items-center">
          <a 
            v-for="link in navLinks" 
            :key="link.href" 
            :href="link.href" 
            class="block px-3 py-2 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-md w-full text-center"
            @click="isOpen = false"
          >
            {{ link.name }}
          </a>
          <div class="pt-4 border-t border-gray-100 w-full flex justify-center">
            
            <button 
              v-if="!user"
              class="w-full max-w-xs px-5 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition shadow-md"
              @click="handleLogin"
            >
              Login with Google
            </button>

            <button 
              v-else
              class="w-full max-w-xs px-5 py-3 rounded-xl bg-red-50 text-red-600 border border-red-100 font-bold hover:bg-red-100 transition shadow-md"
              @click="handleLogout"
            >
              Logout ({{ user.name.split(' ')[0] }})
            </button>

          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref } from 'vue';


const { $user, $login, $logout } = useNuxtApp();

const user = $user; 
const isOpen = ref(false);

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

const handleLogin = async () => {
  isOpen.value = false;
  try {
    await $login();
  } catch (error) {
    console.error("Login failed:", error.message);
  }
};

const handleLogout = async () => {
  isOpen.value = false;
  try {
    await $logout();
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  isOpen.value = false;
};
</script>