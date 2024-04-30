import { ref } from 'vue'
import * as localStorageHandlers from '../utils/localStorageHandlers.js'

const TODOS_STORAGE_KEY = 'todos'

export const useTodos = () => {
  const todos = ref(localStorageHandlers.get(TODOS_STORAGE_KEY))

  const addNewTodo = (newText) => {
    const freshTodoId = crypto.randomUUID()

    const newTodo = {
      id: freshTodoId,
      content: newText
    }

    localStorageHandlers.create(TODOS_STORAGE_KEY, newTodo)

    todos.value.push(newTodo)
  }

  const removeTodo = (targetId) => {
    localStorageHandlers.remove(TODOS_STORAGE_KEY, targetId)

    const indexToRemove = todos.value.findIndex((todo) => todo.id === targetId)
    todos.value.splice(indexToRemove, 1)
  }

  const updateTodo = (targetId, updateText) => {
    localStorageHandlers.update(TODOS_STORAGE_KEY, targetId, updateText)

    todos.value = todos.value.map((todo) =>
      todo.id === targetId ? { ...todo, content: updateText } : todo
    )
  }

  return { todos, addNewTodo, removeTodo, updateTodo }
}
