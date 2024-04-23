import { ref } from 'vue'
import * as localStorageHandlers from '../utils/localStorageHandlers.js'

export const useTodos = () => {
  const todos = ref(localStorageHandlers.get('todos'))

  const addNewTodo = (newText) => {
    if (newText.trim() === '') {
      return
    }

    const freshTodoId = crypto.randomUUID()

    const newTodo = {
      id: freshTodoId,
      content: newText
    }

    localStorageHandlers.create('todos', newTodo)

    todos.value.push({
      id: freshTodoId,
      content: newText
    })
  }

  const removeTodo = (targetId) => {
    localStorageHandlers.remove('todos', targetId)

    const indexToRemove = todos.value.findIndex((item) => item.id === targetId)
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

  return { todos, addNewTodo, removeTodo, updateTodo }
}
