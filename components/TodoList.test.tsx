import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TodoList from './TodoList'

describe('TodoList', () => {
  it('初期状態では空のメッセージが表示される', () => {
    render(<TodoList />)
    expect(screen.getByText('TODOがありません。上のフォームから追加してください。')).toBeInTheDocument()
  })

  it('TODOを追加できる', () => {
    render(<TodoList />)

    const input = screen.getByPlaceholderText('新しいTODOを入力...')
    const dateInput = screen.getByDisplayValue(/\d{4}-\d{2}-\d{2}/)
    const addButton = screen.getByText('追加')

    fireEvent.change(input, { target: { value: 'テストタスク' } })
    fireEvent.click(addButton)

    expect(screen.getByText('テストタスク')).toBeInTheDocument()
  })

  it('TODOを完了にできる', () => {
    render(<TodoList />)

    const input = screen.getByPlaceholderText('新しいTODOを入力...')
    const addButton = screen.getByText('追加')

    fireEvent.change(input, { target: { value: 'テストタスク' } })
    fireEvent.click(addButton)

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)

    expect(checkbox).toBeChecked()
  })

  it('TODOを削除できる', () => {
    render(<TodoList />)

    const input = screen.getByPlaceholderText('新しいTODOを入力...')
    const addButton = screen.getByText('追加')

    fireEvent.change(input, { target: { value: 'テストタスク' } })
    fireEvent.click(addButton)

    const deleteButton = screen.getByText('削除')
    fireEvent.click(deleteButton)

    expect(screen.queryByText('テストタスク')).not.toBeInTheDocument()
  })

  it('ソート順を切り替えられる', () => {
    render(<TodoList />)

    const input = screen.getByPlaceholderText('新しいTODOを入力...')
    const addButton = screen.getByText('追加')

    fireEvent.change(input, { target: { value: 'テストタスク' } })
    fireEvent.click(addButton)

    const sortButton = screen.getByText(/期限順:/)
    expect(sortButton).toHaveTextContent('昇順 ↑')

    fireEvent.click(sortButton)
    expect(sortButton).toHaveTextContent('降順 ↓')

    fireEvent.click(sortButton)
    expect(sortButton).toHaveTextContent('昇順 ↑')
  })

  it('完了タスクの表示/非表示を切り替えられる', () => {
    render(<TodoList />)

    const input = screen.getByPlaceholderText('新しいTODOを入力...')
    const addButton = screen.getByText('追加')

    fireEvent.change(input, { target: { value: 'テストタスク' } })
    fireEvent.click(addButton)

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)

    const toggleButton = screen.getByText(/完了タスク:/)
    expect(toggleButton).toHaveTextContent('表示')

    fireEvent.click(toggleButton)
    expect(toggleButton).toHaveTextContent('非表示')
    expect(screen.queryByText('テストタスク')).not.toBeInTheDocument()

    fireEvent.click(toggleButton)
    expect(toggleButton).toHaveTextContent('表示')
    expect(screen.getByText('テストタスク')).toBeInTheDocument()
  })

  it('統計情報が正しく表示される', () => {
    render(<TodoList />)

    const input = screen.getByPlaceholderText('新しいTODOを入力...')
    const addButton = screen.getByText('追加')

    fireEvent.change(input, { target: { value: 'タスク1' } })
    fireEvent.click(addButton)

    fireEvent.change(input, { target: { value: 'タスク2' } })
    fireEvent.click(addButton)

    expect(screen.getByText('アクティブ: 2')).toBeInTheDocument()
    expect(screen.getByText('完了: 0')).toBeInTheDocument()
    expect(screen.getByText('合計: 2')).toBeInTheDocument()

    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[0])

    expect(screen.getByText('アクティブ: 1')).toBeInTheDocument()
    expect(screen.getByText('完了: 1')).toBeInTheDocument()
  })
})
