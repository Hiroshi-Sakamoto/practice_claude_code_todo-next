import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Home from './page'

describe('Home', () => {
  it('ページタイトルが表示される', () => {
    render(<Home />)
    expect(screen.getByText('TODOリスト')).toBeInTheDocument()
  })

  it('ページタイトルが正しいスタイルクラスを持つ', () => {
    render(<Home />)
    const title = screen.getByText('TODOリスト')
    expect(title).toHaveClass('text-4xl', 'font-bold', 'text-center', 'text-gray-800', 'mb-8')
  })

  it('mainタグに正しい背景グラデーションクラスが適用される', () => {
    const { container } = render(<Home />)
    const main = container.querySelector('main')
    expect(main).toHaveClass('min-h-screen', 'bg-gradient-to-br', 'from-blue-50', 'to-indigo-100', 'py-12', 'px-4')
  })

  it('TodoListコンポーネントがレンダリングされる', () => {
    render(<Home />)
    // TodoListコンポーネントの初期状態のメッセージを確認
    expect(screen.getByText('TODOがありません。上のフォームから追加してください。')).toBeInTheDocument()
  })

  it('最大幅のコンテナが存在する', () => {
    const { container } = render(<Home />)
    const containerDiv = container.querySelector('.max-w-3xl')
    expect(containerDiv).toBeInTheDocument()
  })
})
