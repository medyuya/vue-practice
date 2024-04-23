import { ref } from 'vue'
import * as localStorageHandlers from '../utils/localStorageHandlers.js'

export function useTodos() {
  const todos = ref(localStorageHandlers.get('todos'))

  let nextTodoId = crypto.randomUUID()

  const addNewTodo = (newText) => {
    if (newText.trim() === '') {
      return
    }

    let newTodo = {
      id: nextTodoId,
      content: newText
    }

    localStorageHandlers.create('todos', newTodo)

    todos.value.push({
      id: nextTodoId,
      content: newText
    })

    nextTodoId = crypto.randomUUID()
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

  return { todos, addNewTodo, removeTodo, updateTodo }
}
