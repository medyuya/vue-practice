<script setup>
import { ref } from 'vue'
import TodoItem from './components/TodoItem.vue'

const newTodoText = ref('')
const todos = ref([
  {
    id: 1,
    content: 'Do the dishes'
  },
  {
    id: 2,
    content: 'Take out the trash'
  },
  {
    id: 3,
    content: 'Mow the lawn'
  }
])

let nextTodoId = 1

const addNewTodo = () => {
  if (newTodoText.value.trim() === '') {
    return
  }

  todos.value.push({
    id: nextTodoId++,
    content: newTodoText.value
  })

  newTodoText.value = ''
}

const removeTodo = (index) => {
  todos.value.splice(index, 1)
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
      v-for="(todo, index) in todos"
      :key="todo.id"
      :content="todo.content"
      @remove="removeTodo(index)"
      @update="handleUpdate(index, $event)"
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
