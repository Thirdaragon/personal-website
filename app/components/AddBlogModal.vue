<template>
  <div class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 animate-fade-in-up">
      <h2 class="text-2xl font-bold mb-4">Add New Blog</h2>
      
      <form @submit.prevent="submitBlog" class="space-y-4">
        <input v-model="form.title" type="text" placeholder="Title" required class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        <input v-model="form.category" type="text" placeholder="Category (e.g., Tech)" required class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        <input v-model="form.image" type="text" placeholder="Image URL (e.g., Unsplash Link)" required class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        <textarea v-model="form.content" rows="4" placeholder="Blog Content..." required class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
        
        <div class="flex justify-end gap-3 pt-2">
          <button type="button" @click="$emit('close')" class="px-4 py-2 text-gray-500 hover:text-gray-700">Cancel</button>
          <button type="submit" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Post Blog</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const { $db, $collection, $addDoc, $serverTimestamp } = useNuxtApp();
const emit = defineEmits(['close', 'refresh']);

const form = ref({ title: '', category: '', image: '', content: '' });

const isSubmitting = ref(false); 

const submitBlog = async () => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;
  
  try {
    await $addDoc($collection($db, 'blogs'), {
      ...form.value,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      createdAt: $serverTimestamp()
    });
    alert('Blog posted!');
    emit('refresh');
    emit('close');
  } catch (e) {
    console.error(e);
    alert('Error: ' + e.message);
  } finally {
    isSubmitting.value = false;
  }
};

</script>