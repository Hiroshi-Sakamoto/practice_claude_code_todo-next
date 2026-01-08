import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import RootLayout from './layout'

describe('RootLayout', () => {
  it('childrenを正しくレンダリングする', () => {
    const { container } = render(
      <RootLayout>
        <div data-testid="test-child">Test Content</div>
      </RootLayout>
    )

    expect(container.querySelector('[data-testid="test-child"]')).toBeInTheDocument()
  })

  it('html要素にlang="ja"が設定されている', () => {
    const { container } = render(
      <RootLayout>
        <div>Test</div>
      </RootLayout>
    )

    const html = container.querySelector('html')
    expect(html).toHaveAttribute('lang', 'ja')
  })

  it('body要素が存在する', () => {
    const { container } = render(
      <RootLayout>
        <div>Test</div>
      </RootLayout>
    )

    expect(container.querySelector('body')).toBeInTheDocument()
  })
})
