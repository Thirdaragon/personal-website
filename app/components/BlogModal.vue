<template>
  <div class="fixed inset-0 z-[60] overflow-y-auto bg-white/95 backdrop-blur-sm" v-if="blog">
    
    <div class="fixed top-6 right-6 z-50 flex items-center gap-3">
      <button 
        v-if="isAdmin"
        @click="deleteBlogPost"
        class="group flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 border border-red-100"
      >
        <span class="text-sm font-bold hidden group-hover:inline">Delete</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>

      <button @click="$emit('close')" class="p-2 bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>

    <div class="max-w-3xl mx-auto px-4 py-12 md:py-20 animate-fade-in-up">
      <span class="text-blue-600 font-bold tracking-wide uppercase text-sm bg-blue-50 px-3 py-1 rounded-md">{{ blog.category }}</span>
      <h1 class="text-3xl md:text-5xl font-extrabold text-slate-900 mt-4 mb-6 leading-tight">{{ blog.title }}</h1>
      <div class="flex items-center gap-4 text-gray-500 text-sm mb-8 border-b border-gray-100 pb-8">
        <span>{{ blog.date }}</span>
      </div>

      <img :src="blog.image" class="w-full h-64 md:h-[500px] object-cover rounded-3xl shadow-2xl mb-12" />

      <div class="prose prose-lg text-slate-700 max-w-none mb-16 whitespace-pre-wrap leading-loose">
        {{ blog.content }}
      </div>

      <hr class="border-gray-200 mb-12" />

      <div class="bg-gray-50 rounded-3xl p-6 md:p-10">
        <h3 class="text-2xl font-bold mb-8 text-slate-900">Comments ({{ comments.length }})</h3>

        <div v-if="user" class="flex gap-4 mb-10">
          <img :src="user.photo || 'https://placehold.co/100'" class="w-10 h-10 rounded-full border border-white shadow-sm" />
          <div class="flex-1">
            <textarea 
              v-model="newComment" 
              rows="3" 
              placeholder="Share your thoughts..." 
              class="w-full p-4 bg-white rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none shadow-sm"
            ></textarea>
            <div class="flex justify-end mt-2">
              <button @click="postComment" class="px-5 py-2 bg-slate-900 text-white rounded-lg font-medium text-sm hover:bg-slate-800 transition">
                Post Comment
              </button>
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-8 bg-white rounded-2xl border border-gray-200 mb-10 shadow-sm">
          <p class="text-gray-500 mb-2">Log in to join the conversation.</p>
          <p class="text-xs text-slate-400">Use the Login button in the Navbar</p>
        </div>

        <div class="space-y-6">
          <CommentItem 
            v-for="comment in comments" 
            :key="comment.id" 
            :blogId="blog.id" 
            :comment="comment" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps(['blog']);
const emit = defineEmits(['close', 'refresh']);

const { 
  $db, 
  $collection, 
  $addDoc, 
  $deleteDoc, 
  $doc, 
  $query, 
  $orderBy, 
  $onSnapshot, 
  $serverTimestamp, 
  $user 
} = useNuxtApp();


const user = $user;

const comments = ref([]);
const newComment = ref('');


const adminEmails = ['third.aragon123@gmail.com'];
const isAdmin = computed(() => {
  return user.value && adminEmails.includes(user.value.email);
});

watch(() => props.blog, (newBlog) => {
  if (newBlog) {
    const commentsRef = $collection($db, `blogs/${newBlog.id}/comments`);
    const q = $query(commentsRef, $orderBy('createdAt', 'desc'));
    
    $onSnapshot(q, (snapshot) => {
      comments.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
  }
}, { immediate: true });


const postComment = async () => {
  if (!newComment.value.trim()) return;
  
  try {
    await $addDoc($collection($db, `blogs/${props.blog.id}/comments`), {
      text: newComment.value,
      userName: user.value.name || 'Anonymous',
      userPhoto: user.value.photo || null,
      uid: user.value.uid,
      createdAt: $serverTimestamp()
    });
    newComment.value = '';
  } catch (e) {
    alert("Error: " + e.message); 
  }
};


const deleteBlogPost = async () => {
  if (confirm("Delete this post?")) {
    try {
      await $deleteDoc($doc($db, 'blogs', props.blog.id));
      emit('refresh');
      emit('close');
    } catch (e) {
      alert("Delete failed: " + e.message);
    }
  }
};
</script>