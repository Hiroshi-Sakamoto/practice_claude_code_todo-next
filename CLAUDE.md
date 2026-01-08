# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## コマンド

```bash
# 開発
npm run dev        # 開発サーバーを起動 (http://localhost:3000)

# 本番環境
npm run build      # 本番用ビルドを作成
npm run start      # 本番サーバーを起動

# コード品質
npm run lint       # ESLintを実行
```

## アーキテクチャ

TypeScriptとTailwind CSSで書かれたNext.js 14 App Routerアプリケーションです。

### プロジェクト構造

- `app/` - Next.js App Routerのページとレイアウト
  - `page.tsx` - メインページ（TodoListをレンダリングするクライアントコンポーネント）
  - `layout.tsx` - メタデータを含むルートレイアウト
  - `globals.css` - Tailwindディレクティブを含むグローバルスタイル
- `components/` - Reactコンポーネント
  - `TodoList.tsx` - すべての状態管理を含むメインTODOコンポーネント

### 状態管理

すべてのアプリケーション状態は、React hooksを使用して`components/TodoList.tsx`でローカルに管理されています:

- `todos` - TODOアイテムの配列
- `inputValue` - 新しいTODOのテキスト入力
- `dueDateValue` - 新しいTODOの日付入力（デフォルトは今日から7日後）
- `sortOrder` - ソート状態: 'none' | 'asc' | 'desc'
- `showCompleted` - 完了タスクの表示/非表示を切り替えるBoolean値

### Todoデータモデル

```typescript
interface Todo {
  id: number          // タイムスタンプベースの一意なID
  text: string        // タスクの説明
  completed: boolean  // 完了状態
  dueDate: string     // ISO日付文字列 (YYYY-MM-DD)
}
```

### 主要機能

1. **期限管理**: 新しいTODOは作成日から7日後がデフォルトの期限
2. **期限切れ検出**: 期限切れの未完了タスクは赤い背景と警告ラベルで表示
3. **ソート**: 期限順でソートなし、昇順（早い順）、降順（遅い順）を切り替え可能
4. **フィルタリング**: 完了タスクの表示/非表示を切り替え可能
5. **クライアント側のみ**: すべての状態は一時的（永続化/データベースなし）

### スタイリング

- Tailwind CSSユーティリティクラスのみを使用
- max-widthコンテナを使用したレスポンシブデザイン
- メインページにグラデーション背景
- 期限切れタスク（赤背景）と完了タスク（取り消し線）の条件付きスタイリング
