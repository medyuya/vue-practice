<script setup>
import { ref } from 'vue'
import TodoItem from './components/TodoItem.vue'
import { useTodos } from './hooks/useTodos.js'

const newTodoText = ref('')
const { todos, addNewTodo, removeTodo, updateTodo } = useTodos()

const handleAddNewTodo = () => {
  addNewTodo(newTodoText.value)
  newTodoText.value = ''
}

const handleRemoveTodo = (targetId) => {
  removeTodo(targetId)
}

const handleUpdateTodo = (targetId, updateText) => {
  updateTodo(targetId, updateText)
}
</script>

<template>
  <form @submit.prevent="handleAddNewTodo">
    <label>メモを追加する</label>
    <input v-model="newTodoText" placeholder="ex)買い物に行く" required />
    <button>追加</button>
  </form>

  <ul>
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :content="todo.content"
      @remove="handleRemoveTodo(todo.id)"
      @update="handleUpdateTodo(todo.id, $event)"
    >
    </TodoItem>
  </ul>
</template>

<style scoped>
ul {
  padding: 0px;
  list-style: none;
}

li {
  margin-top: 20px;
}
</style>
