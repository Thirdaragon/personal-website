<template>
  <div class="border-l-2 border-gray-100 pl-4 mb-6 hover:border-blue-200 transition-colors">
    <div class="flex items-start gap-3">
      <img 
        :src="comment.userPhoto || 'https://placehold.co/100'" 
        class="w-8 h-8 rounded-full bg-gray-200 object-cover border border-white shadow-sm" 
        alt="Avatar"
      />
      
      <div class="flex-1">
        <div class="bg-gray-50 p-3 rounded-2xl rounded-tl-none relative group">
          <div class="flex justify-between items-center mb-1">
            <span class="font-bold text-sm text-slate-800">{{ comment.userName }}</span>
            <span class="text-xs text-gray-400">{{ formatDate(comment.createdAt) }}</span>
          </div>
          <p class="text-slate-700 text-sm leading-relaxed">{{ comment.text }}</p>
        </div>
        
        <button 
          v-if="user" 
          @click="showReplyForm = !showReplyForm" 
          class="text-xs font-bold text-slate-500 mt-1 ml-2 hover:text-blue-600 hover:underline transition-colors"
        >
          {{ showReplyForm ? 'Cancel' : 'Reply' }}
        </button>
      </div>
    </div>

    <div v-if="showReplyForm" class="mt-3 ml-11 flex gap-2 animate-fade-in-up">
      <input 
        v-model="replyText" 
        type="text" 
        placeholder="Write a reply..." 
        class="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" 
        @keyup.enter="submitReply"
      />
      <button 
        @click="submitReply" 
        class="px-3 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors"
      >
        Send
      </button>
    </div>

    <div v-if="replies.length > 0" class="mt-4 ml-8 space-y-4 border-l border-gray-100 pl-4">
      <div v-for="reply in replies" :key="reply.id" class="flex items-start gap-3">
        <img 
          :src="reply.userPhoto || 'https://placehold.co/100'" 
          class="w-6 h-6 rounded-full bg-gray-200 object-cover border border-white shadow-sm" 
        />
        <div class="bg-gray-50 p-2.5 rounded-xl rounded-tl-none flex-1">
          <div class="flex justify-between items-center mb-0.5">
             <span class="font-bold text-xs text-slate-800">{{ reply.userName }}</span>
             <span class="text-[10px] text-gray-400">{{ formatDate(reply.createdAt) }}</span>
          </div>
          <p class="text-slate-600 text-xs">{{ reply.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps(['blogId', 'comment']);
const { $db, $collection, $addDoc, $query, $orderBy, $onSnapshot, $serverTimestamp, $user } = useNuxtApp();

const user = $user;

const showReplyForm = ref(false);
const replyText = ref('');
const replies = ref([]);

onMounted(() => {
  const repliesRef = $collection($db, `blogs/${props.blogId}/comments/${props.comment.id}/replies`);
  const q = $query(repliesRef, $orderBy('createdAt', 'asc'));
  
  $onSnapshot(q, (snapshot) => {
    replies.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  });
});

const submitReply = async () => {
  if (!replyText.value.trim()) return;
  
  try {
    const repliesRef = $collection($db, `blogs/${props.blogId}/comments/${props.comment.id}/replies`);
    
    await $addDoc(repliesRef, {
      text: replyText.value,
      userName: user.value.name || 'Anonymous',
      userPhoto: user.value.photo || null,
      createdAt: $serverTimestamp()
    });
    
    replyText.value = '';
    showReplyForm.value = false; 
  } catch (e) {
    console.error("Reply error:", e);
    alert("Reply failed: " + e.message);
  }
};

const formatDate = (timestamp) => {
  if (!timestamp) return '';
  return new Date(timestamp.seconds * 1000).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
};
</script>