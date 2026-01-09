# CLAUDE.md（プロジェクト固有ルール）

project: practice_claude_code_todo-next

---

## 0. 前提

- 本プロジェクトは **共通ルール `~/.claude/CLAUDE.me` を必ず継承** する
- ここに記載の内容は、本プロジェクトにおける **上書き・補足ルール** とする
- コマンドはすべて **提示のみ**。実行はユーザーが行う

---

## 1. 作業環境

- 環境：WSL2 / Ubuntu 24.04（ローカル）
- 作業ディレクトリ：
  `/home/makuroboy/projects/practice_claude_code_todo-next`
- Node.js / npm は **ローカル環境に既存インストール済みのものを使用**
- 依存追加（`npm install`）は **事前承認必須**

---

## 2. コマンド（本プロジェクト標準）

```bash
# 開発
npm run dev        # 開発サーバー起動 (http://localhost:3000)

# 本番相当確認
npm run build      # 本番用ビルド作成
npm run start      # 本番サーバー起動

# コード品質
npm run lint       # ESLint 実行

# テスト
npm test           # テスト実行（定義されている場合）
npm run test       # 上記が未定義の場合の代替
```

---

## 3. アーキテクチャ概要

- フレームワーク：Next.js（App Router）
- 言語：TypeScript
- スタイリング：Tailwind CSS
- データ永続化：なし（クライアント側のみ）

---

## 4. プロジェクト構造

```
.
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   └── TodoList.tsx
├── public/
├── package.json
└── CLAUDE.md
```

---

## 5. 状態管理方針

- すべての状態は `components/TodoList.tsx` に集約
- グローバル状態管理ライブラリは使用しない
- 永続化なし（リロードで消える前提）

---

## 6. Todo データモデル

```ts
interface Todo {
  id: number
  text: string
  completed: boolean
  dueDate: string
}


---

## 7. 機能仕様

1. 期限管理（作成日 +7 日）
2. 期限切れ警告表示
3. 期限順ソート（なし / 昇順 / 降順）
4. 完了タスク表示切替
5. クライアント限定

---

## 8. スタイリング方針

- Tailwind CSS のみ使用
- 条件付きスタイルは JSX 内で明示

---

## 9. テスト実装ルール

- 実挙動を検証
- 無意味なアサーション禁止
- 境界値テスト必須

---

## 10. 禁止事項

- 状態管理ライブラリ追加
- 永続化
- 無断 npm install
- 責務不明確な分割

---

## 11. 変更時の必須提示物

- 変更ファイル一覧
- 変更理由
- 影響範囲
- テスト結果

---

## 12. 優先順位

1. ~/.claude/CLAUDE.me
2. 本ファイル
3. 既存コード
