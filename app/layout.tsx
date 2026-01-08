import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TODOリスト',
  description: 'Next.jsで作成したシンプルなTODOリストアプリケーション',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
