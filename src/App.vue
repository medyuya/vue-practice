<script setup>
import { ref } from 'vue'
import TodoItem from './components/TodoItem.vue'
import * as localStorageHandlers from './utils/localStorageHandlers.js'

const newTodoText = ref('')
const todos = ref(localStorageHandlers.get('todos'))

// console.log(todos.value[todos.value.length - 1].id + 1)
let nextTodoId = 1

const addNewTodo = () => {
  if (newTodoText.value.trim() === '') {
    return
  }

  let newTodo = {
    id: nextTodoId,
    content: newTodoText.value
  }

  localStorageHandlers.create('todos', newTodo)

  todos.value.push({
    id: nextTodoId++,
    content: newTodoText.value
  })

  newTodoText.value = ''
}

const removeTodo = (targetId) => {
  localStorageHandlers.remove('todos', targetId)

  let indexToRemove = todos.value.findIndex((item) => item.id === targetId)
  todos.value.splice(indexToRemove, 1)
}

const updateTodo = (updateId, updateContent) => {
  localStorageHandlers.update('todos', updateId, updateContent)

  todos.value = todos.value.map((todo) => {
    if (todo.id === updateId) {
      return { ...todo, content: updateContent }
    }

    return todo
  })
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
      @update="updateTodo(todo.id, $event)"
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
