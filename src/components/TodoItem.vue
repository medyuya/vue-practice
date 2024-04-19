<script setup>
import { ref } from 'vue'

const textInput = ref('')
const emits = defineEmits(['update', 'remove'])

const submitForm = () => {
  if (textInput.value.trim() === '') {
    return
  }

  emits('update', textInput.value)
}

defineProps(['content', 'value'])
</script>

<template>
  <li>
    {{ content }}
    <form @submit.prevent="submitForm">
      <label for="update-todo">メモを編集する</label>
      <input v-model="textInput" required />
      <button>更新</button>
      <button @click="$emit('remove')">削除</button>
    </form>
  </li>
</template>
