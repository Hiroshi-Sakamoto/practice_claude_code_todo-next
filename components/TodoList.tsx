'use client'

import { useState } from 'react'

interface Todo {
  id: number
  text: string
  completed: boolean
  dueDate: string
}

const getDefaultDueDate = () => {
  const date = new Date()
  date.setDate(date.getDate() + 7)
  return date.toISOString().split('T')[0]
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')
  const [dueDateValue, setDueDateValue] = useState(getDefaultDueDate())
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [showCompleted, setShowCompleted] = useState(true)

  const addTodo = () => {
    if (inputValue.trim() === '') return
    if (dueDateValue === '') return

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      dueDate: dueDateValue,
    }

    setTodos([...todos, newTodo])
    setInputValue('')
    setDueDateValue(getDefaultDueDate())
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const getSortedTodos = () => {
    let filteredTodos = todos

    if (!showCompleted) {
      filteredTodos = todos.filter((todo) => !todo.completed)
    }

    return [...filteredTodos].sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime()
      const dateB = new Date(b.dueDate).getTime()

      if (sortOrder === 'asc') {
        return dateA - dateB
      } else {
        return dateB - dateA
      }
    })
  }

  const activeTodos = todos.filter((todo) => !todo.completed).length
  const completedTodos = todos.filter((todo) => todo.completed).length
  const sortedTodos = getSortedTodos()

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="新しいTODOを入力..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={dueDateValue}
            onChange={(e) => setDueDateValue(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTodo}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            追加
          </button>
        </div>
      </div>

      {todos.length > 0 && (
        <div className="mb-4 flex justify-between items-center">
          <div className="flex gap-4 text-sm text-gray-600">
            <span>アクティブ: {activeTodos}</span>
            <span>完了: {completedTodos}</span>
            <span>合計: {todos.length}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              完了タスク: {showCompleted ? '表示' : '非表示'}
            </button>
            <button
              onClick={toggleSortOrder}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              期限順: {sortOrder === 'asc' ? '昇順 ↑' : '降順 ↓'}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-center text-gray-400 py-8">
            TODOがありません。上のフォームから追加してください。
          </p>
        ) : (
          sortedTodos.map((todo) => {
            const isOverdue = new Date(todo.dueDate) < new Date() && !todo.completed
            const today = new Date().toISOString().split('T')[0]

            return (
              <div
                key={todo.id}
                className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors ${
                  isOverdue ? 'bg-red-50' : 'bg-gray-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <div className="flex-1">
                  <span
                    className={`block ${
                      todo.completed
                        ? 'line-through text-gray-400'
                        : 'text-gray-700'
                    }`}
                  >
                    {todo.text}
                  </span>
                  <span
                    className={`text-sm ${
                      isOverdue
                        ? 'text-red-600 font-semibold'
                        : todo.completed
                        ? 'text-gray-400'
                        : 'text-gray-500'
                    }`}
                  >
                    期限: {todo.dueDate}
                    {isOverdue && ' (期限切れ)'}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="px-3 py-1 bg-red-500 text-white border border-red-500 hover:bg-red-600 rounded transition-colors"
                >
                  削除
                </button>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
