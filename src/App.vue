<script setup>
import { ref } from 'vue'
import TodoItem from './components/TodoItem.vue'

const newTodoText = ref('')
const todos = ref([
  {
    id: 1,
    title: 'Do the dishes'
  },
  {
    id: 2,
    title: 'Take out the trash'
  },
  {
    id: 3,
    title: 'Mow the lawn'
  }
])

let nextTodoId = 1

const addNewTodo = () => {
  todos.value.push({
    id: nextTodoId++,
    title: newTodoText.value
  })

  newTodoText.value = ''
}

const removeTodo = (index) => {
  todos.value.splice(index, 1)
}

const handleUpdate = (index, updateText) => {
  todos.value[index].title = updateText
}
</script>

<template>
  <form @submit.prevent="addNewTodo">
    <label for="new-todo">メモを追加する</label>
    <input v-model="newTodoText" placeholder="ex)買い物に行く" />
    <button>追加</button>
  </form>

  <ul>
    <TodoItem
      v-for="(todo, index) in todos"
      :key="todo.id"
      :title="todo.title"
      @remove="removeTodo(index)"
      @update="handleUpdate(index, $event)"
    >
    </TodoItem>
  </ul>
</template>
