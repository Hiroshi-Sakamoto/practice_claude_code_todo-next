'use client'

import { useState } from 'react'
import TodoList from '@/components/TodoList'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          TODOリスト
        </h1>
        <TodoList />
      </div>
    </main>
  )
}
