<template>
  <div class="min-h-screen font-sans text-slate-800 bg-gray-50 selection:bg-blue-100 overflow-x-hidden">
    <NavBar />

    <header id="hero" class="bg-white pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden relative">
      <div class="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
          
          <div class="order-first lg:order-first relative mx-auto w-full max-w-[300px] sm:max-w-sm lg:max-w-md flex justify-center">
             <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-200/60 to-indigo-200/60 rounded-full blur-3xl -z-10 animate-blob"></div>
             
             <img
               :src="profileImage"
               alt="Regalado Aragon III"
               class="block w-auto h-auto max-w-full max-h-[400px] lg:max-h-none rounded-[2rem] shadow-2xl border-4 md:border-8 border-white transform transition-transform hover:scale-[1.01] object-cover"
             >
          </div>

          <div class="text-center lg:text-left flex flex-col items-center lg:items-start">
            <div class="inline-flex items-center justify-center lg:justify-start mb-6 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold border border-blue-100">
              <span class="mr-2">👋</span> Computer Engineering Student
            </div>
            
            <h1 class="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Hi, I'm Third.
              <span class="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Hardware meets Software.
              </span>
            </h1>
            
            <p class="mt-6 text-lg sm:text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              I am a dedicated Computer Engineering student at Samuel Christian College with a passion for embedded systems, circuit design, and full-stack development.
            </p>
            
            <div class="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4 w-full sm:w-auto">
              <a href="#contact" class="px-8 py-3.5 rounded-xl bg-blue-600 text-white font-bold text-center hover:bg-blue-700 transition shadow-lg shadow-blue-500/30 w-full sm:w-auto">
                Contact Me
              </a>
              <a href="#experience" class="px-8 py-3.5 rounded-xl bg-white text-slate-700 border border-slate-200 font-bold text-center hover:bg-gray-50 transition w-full sm:w-auto">
                My Experience
              </a>
            </div>
          </div>

        </div>
      </div>
    </header>

    <section id="about" class="py-20 md:py-24 bg-gray-50">
      <div class="max-w-4xl mx-auto px-6 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-6">About Me</h2>
        <p class="text-lg md:text-xl text-slate-600 leading-relaxed">
          I am a Computer Engineering student based in General Trias, Cavite. I possess strong analytical and technical skills, with experience ranging from 
          <strong>hardware diagnostics</strong> and <strong>circuit design</strong> to <strong>software development</strong>. 
          I am professional, reliable, and committed to continuous learning. Whether it's soldering a PCB or writing SQL queries, 
          I love delivering high-quality technical work.
        </p>
      </div>
    </section>

    <section id="skills" class="py-20 md:py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-slate-900">Technical Skills</h2>
          <p class="mt-4 text-slate-500 text-lg">My Core Competencies</p>
        </div>
        
        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div v-for="skill in skills" :key="skill.name" 
               class="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center hover:shadow-md transition hover:-translate-y-1 text-center">
            <span class="text-4xl mb-3">{{ skill.icon }}</span>
            <span class="font-semibold text-slate-700 text-sm md:text-base">{{ skill.name }}</span>
            <span class="text-xs text-slate-400 mt-1">{{ skill.desc }}</span>
          </div>
        </div>
      </div>
    </section>

    <section id="experience" class="py-20 md:py-24 bg-gray-50">
      <div class="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">Work History</h2>
        
        <div class="relative border-l-2 border-blue-200 ml-2 md:ml-0 space-y-12">
          <div v-for="(job, index) in experience" :key="index" class="relative pl-8 md:pl-12 group">
            <div class="absolute -left-[9px] top-2 h-4 w-4 rounded-full bg-blue-600 ring-4 ring-white group-hover:ring-blue-100 transition-all shadow-md"></div>
            
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 class="text-xl font-bold text-slate-900">{{ job.role }}</h3>
              <span class="text-sm font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full w-fit mt-2 sm:mt-0">
                {{ job.company }}
              </span>
            </div>
            <span class="block text-sm text-gray-500 mb-4 font-medium">{{ job.duration }}</span>
            <ul class="list-disc ml-5 text-slate-600 leading-relaxed space-y-1">
              <li v-for="(point, i) in job.description" :key="i">{{ point }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section id="blog" class="py-20 md:py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-slate-900">Latest Updates</h2>
          <p class="mt-4 text-slate-500 text-lg">My projects and learning journey.</p>
          
          <div v-if="isAdmin" class="mt-6 animate-fade-in-up">
            <button 
              @click="showAddModal = true"
              class="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium shadow-md hover:bg-indigo-700 transition flex items-center gap-2 mx-auto"
            >
              <span class="text-xl font-bold">+</span> Add New Blog
            </button>
          </div>
        </div>

        <div v-if="loading" class="text-center py-20 text-gray-400">Loading articles...</div>

        <div v-else class="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div 
            v-for="post in blogs" 
            :key="post.id" 
            class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col h-full mx-auto w-full max-w-md md:max-w-none"
          >
            <div class="h-48 overflow-hidden bg-gray-200">
              <img :src="post.image" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            
            <div class="p-6 flex-1 flex flex-col">
              <div class="flex justify-between items-center mb-3">
                <span class="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase tracking-wide">{{ post.category }}</span>
                <span class="text-xs text-gray-400">{{ post.date }}</span>
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{{ post.title }}</h3>
              <p class="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">{{ post.content }}</p>
              
              <button 
                @click="openReader(post)" 
                class="text-blue-600 font-semibold text-sm hover:underline mt-auto flex items-center gap-1"
              >
                Read Article <span>&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" class="py-20 md:py-24 bg-gray-50">
      <div class="max-w-3xl mx-auto px-6 sm:px-6 lg:px-8">
        <div class="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 text-center">
          <h2 class="text-3xl font-bold text-slate-900 mb-6">Let's Connect</h2>
          <p class="text-slate-600 mb-8 text-lg">
            I'm always open to discussing new projects, creative ideas, or opportunities in General Trias or Remote.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4 mb-8">
             <div class="flex items-center justify-center gap-2 text-slate-600">
                <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <span class="break-all">third.aragon123@gmail.com</span>
             </div>
             <div class="flex items-center justify-center gap-2 text-slate-600">
                <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <span>+63 975 216 8931</span>
             </div>
          </div>
          
          <form class="space-y-4 text-left">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Name" class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none" />
              <input type="email" placeholder="Email" class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none" />
            </div>
            <textarea rows="4" placeholder="Message" class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none"></textarea>
            <button class="w-full px-8 py-3.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-500 transition transform hover:scale-[1.02] shadow-lg shadow-blue-500/20">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>

    <TheFooter />

    <AddBlogModal 
      v-if="showAddModal" 
      @close="showAddModal = false" 
      @refresh="fetchBlogs" 
    />

    <BlogModal 
      v-if="selectedBlog" 
      :blog="selectedBlog" 
      @close="selectedBlog = null"
      @refresh="fetchBlogs" 
    />

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import profileImage from '@/assets/images/profile.jpg';

const { $db, $collection, $getDocs, $query, $orderBy, $user } = useNuxtApp();

const loading = ref(true);
const blogs = ref([]);
const showAddModal = ref(false);
const selectedBlog = ref(null);

const skills = ref([
  { name: 'C / C++', icon: '💻', desc: 'Programming' },
  { name: 'Python / Java', icon: '☕', desc: 'Programming' },
  { name: 'Arduino / ESP32', icon: '🤖', desc: 'Embedded Systems' },
  { name: 'Circuit Design', icon: '⚡', desc: 'Hardware' },
  { name: 'SQL / PL/SQL', icon: '🗄️', desc: 'Database' },
  { name: 'Linux / Bash', icon: '🐧', desc: 'OS & Scripting' },
  { name: 'Networking', icon: '🌐', desc: 'LAN/WAN' },
  { name: 'Troubleshooting', icon: '🔧', desc: 'Diagnostics' }
]);

const experience = ref([
  {
    role: 'Assistant Mechanic & Assistant Officer',
    company: 'R+M Auto & Truck Center',
    duration: 'Jan 2025 - Apr 2025',
    description: [
      'Performed basic troubleshooting of vehicles and supplies purchasing.',
      'Conducted basic PMS including engine oil changes, brake cleaning, and tune-ups.',
      'Managed supplies purchasing and inventory.'
    ]
  },
  {
    role: 'Associate Coordinator',
    company: 'PSG Global Solutions (Remote)',
    duration: 'Oct 2024 - Jan 2025',
    description: [
      'Managed job postings for US Nurse candidates.',
      'Validated candidate profiles and qualifications.',
      'Collaborated with the recruitment team to streamline hiring processes.'
    ]
  }
]);

const adminEmails = ['third.aragon123@gmail.com'];
const isAdmin = computed(() => {
  return $user.value && adminEmails.includes($user.value.email);
});

const fetchBlogs = async () => {
  loading.value = true;
  try {
    const q = $query($collection($db, 'blogs'), $orderBy('createdAt', 'desc'));
    const snapshot = await $getDocs(q);
    blogs.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching blogs:", error);
  } finally {
    loading.value = false;
  }
};

const openReader = (blog) => {
  selectedBlog.value = blog;
};

onMounted(() => {
  fetchBlogs();
});
</script>

<style>
html {
  scroll-behavior: smooth;
}

@keyframes blob {
  0% { transform: translate(-50%, -50%) scale(1); }
  33% { transform: translate(-45%, -55%) scale(1.1); }
  66% { transform: translate(-55%, -45%) scale(0.9); }
  100% { transform: translate(-50%, -50%) scale(1); }
}
.animate-blob {
  animation: blob 10s infinite ease-in-out;
}
</style>