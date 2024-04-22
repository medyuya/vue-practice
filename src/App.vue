<script setup>
import { ref } from 'vue'
import TodoItem from './components/TodoItem.vue'

const newTodoText = ref('')
const todos = ref([])

let nextTodoId = 1

const addNewTodo = () => {
  if (newTodoText.value.trim() === '') {
    return
  }

  localStorage.setItem('todo_' + nextTodoId, newTodoText.value)

  todos.value.push({
    id: nextTodoId++,
    content: newTodoText.value
  })

  newTodoText.value = ''
}

const removeTodo = (targetId) => {
  let indexToRemove = todos.value.findIndex((item) => item.id === targetId)

  if (indexToRemove !== -1) {
    localStorage.removeItem('todo_' + targetId)
    todos.value.splice(indexToRemove, 1)
  }
}

const handleUpdate = (index, updateText) => {
  todos.value[index].content = updateText
}
</script>

<template>
  <form @submit.prevent="addNewTodo">
    <label for="new-todo">メモを追加する</label>
    <input v-model="newTodoText" placeholder="ex)買い物に行く" required />
    <button>追加</button>
  </form>

  <ul>
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :content="todo.content"
      @remove="removeTodo(todo.id)"
      @update="handleUpdate(todo.id, $event)"
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
