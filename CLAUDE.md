# メルカリ出品AIツール

## プロジェクト概要

メルカリ出品用の商品説明文・タイトルを自動生成するAI支援ツール。商品画像をアップロードすると、Google Gemini APIが画像を分析し、魅力的なタイトル候補（3種類）と詳細な商品説明文を自動生成する。女性向けファッションアイテムの出品を主なターゲットとしている。

### 主要機能

1. **画像アップロード & AI自動生成**
   - 商品画像から商品種類・色・特徴・ターゲット層を自動認識
   - タイトル候補3つを生成（40文字以内、メルカリ最適化）
   - 説明文を自動生成（600-900文字、自然な日本語）

2. **テンプレート管理**
   - ヘッダーテンプレート（送料無料・まとめ買い情報など）
   - フッターテンプレート（注意事項）
   - 締めの一文（カスタマイズ可能）

3. **過去データ復元**
   - Googleドキュメントからコピペして過去の商品情報を復元

4. **永続化ストレージ**
   - Zustand + localStorage で入力データと設定を保存
   - ブラウザを閉じても設定が保持される

---

## 技術スタック

### コア技術

| 技術 | バージョン | 用途 |
|------|-----------|------|
| **React** | 19.2.4 | UIフレームワーク |
| **TypeScript** | 5.9.3 | 型安全性 |
| **Vite** | 8.0.0 | ビルドツール・開発サーバー |
| **Zustand** | 5.0.11 | 状態管理（persist middleware使用） |
| **Tailwind CSS** | 3.4.19 | スタイリング |
| **Lucide React** | 0.577.0 | アイコン |

### AI/API

- **Google Gemini API** (v1beta)
  - モデル: `gemini-2.0-flash`
  - 画像認識 + テキスト生成
  - エンドポイント: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`

### 開発ツール

- ESLint 9.39.4
- TypeScript ESLint 8.56.1
- Autoprefixer 10.4.27
- PostCSS 8.5.8

---

## プロジェクト構造

```
mercari-app/
├── src/
│   ├── components/
│   │   ├── HomeScreen.tsx         # ホーム画面
│   │   ├── InputScreen.tsx        # 入力画面（画像アップロード）
│   │   ├── OutputScreen.tsx       # 出力画面（生成結果表示）
│   │   ├── RestoreScreen.tsx      # 復元画面
│   │   ├── SettingsScreen.tsx     # 設定画面
│   │   └── Button.tsx             # 共通ボタンコンポーネント
│   ├── App.tsx                    # ルートコンポーネント
│   ├── store.ts                   # Zustand状態管理
│   ├── geminiService.ts           # Gemini API連携
│   ├── aiGenerator.ts             # ローカルテキスト生成（現在未使用）
│   ├── index.css                  # グローバルスタイル
│   ├── App.css                    # App固有スタイル
│   └── main.tsx                   # エントリーポイント
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── eslint.config.js
```

---

## 設計判断とその理由

### 1. Gemini APIモデルの変遷

プロジェクト開始から以下のモデル変更を繰り返している：

```
gemini-1.5-flash-latest (初期)
  ↓
gemini-2.0-flash-exp (最新モデル試用)
  ↓
gemini-2.0-flash (exp削除、安定版へ)
  ↓
gemini-1.5-flash (品質低下のため戻す)
  ↓
gemini-2.0-flash (現在、未コミット) ← ★現在の状態
```

**理由**: 2.0系の方が画像認識精度が高いが、生成される日本語の自然さとのバランスを取る必要があった。最終的に `gemini-2.0-flash` が最適と判断（現在 src/geminiService.ts に未コミット変更あり）

### 2. v1beta エンドポイント使用

**理由**: inline_data形式での画像送信にはv1betaエンドポイントが必要。v1エンドポイントでは画像データの扱いが異なるため、v1betaを継続使用。

### 3. 画面分離アーキテクチャ

5つの独立した画面コンポーネント（Home, Input, Output, Restore, Settings）を作成し、`currentScreen` 状態で切り替え。

**理由**:
- SPA構造でルーティング不要（シンプル）
- 各画面の責務が明確
- モバイルファースト設計（全画面表示）

### 4. Zustand + persist選定

React Contextではなく、Zustandを選択。

**理由**:
- 状態管理のボイラープレートが少ない
- persist middlewareでlocalStorageへの永続化が簡単
- TypeScript統合が優れている
- リレンダリングの最適化が容易

### 5. カスタムカラーパレット（女性向けデザイン）

```javascript
{
  'warm-white': '#FDF8F5',
  'dusty-pink': '#E8B4B8',
  'rose-beige': '#D4A5A5',
  'rose-beige-hover': '#C49494',
  'text-gray': '#5D5D5D',
  'heading-gray': '#4A4A4A',
}
```

**理由**: メルカリ出品者（主に女性）にとって親しみやすい、柔らかく温かみのあるデザインを目指した。

### 6. プロンプトエンジニアリング

Gemini APIへのプロンプト（src/geminiService.ts:24-48）は以下を重視：

- **JSON形式のみ出力**（説明文や前置き不要）
- **自然な日本語生成**（AIらしさを消す）
- **絵文字制限**（♪と◎のみ）
- **3ブロック構造**（魅力→提案→詳細）
- **カラー・サイズ情報は含めない**（テンプレートで別途追加）

**理由**: メルカリの説明文として自然で、購入者に響く文章を生成するため。過度な絵文字やAIらしい定型文を避ける。

### 7. JSON抽出ロジック（src/geminiService.ts:102-113）

2段階でJSON抽出を試みる：
1. \`\`\`json ... \`\`\` で囲まれている場合に対応
2. { から } までを抽出

**理由**: Gemini APIのレスポンス形式が不安定なため、複数パターンに対応することでロバスト性を向上。

---

## 環境変数設定

### 必須環境変数

```bash
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 取得方法

1. [Google AI Studio](https://makersuite.google.com/app/apikey) にアクセス
2. 「API キーを取得」をクリック
3. 新しいAPIキーを作成
4. プロジェクトルートに `.env` ファイルを作成
5. 上記の環境変数を設定

**⚠️ 重要**: `.env` ファイルは `.gitignore` に含まれているため、Gitにコミットされません。

---

## セットアップ手順

```bash
# 1. 依存関係インストール
npm install

# 2. 環境変数設定
# .env ファイルを作成し、VITE_GEMINI_API_KEYを設定

# 3. 開発サーバー起動
npm run dev

# 4. ブラウザで http://localhost:5173 を開く
```

---

## 開発ワークフロー

### 開発コマンド

```bash
npm run dev       # 開発サーバー起動（ホットリロード有効）
npm run build     # 本番ビルド（dist/に出力）
npm run preview   # ビルド後のプレビュー
npm run lint      # ESLintでコードチェック
```

### ビルド

```bash
npm run build
```

以下が生成される：
- `dist/` - 静的ファイル（デプロイ可能）
- TypeScriptコンパイル + Viteバンドル

---

## 既知の問題・TODO

### 未完了のタスク

- [ ] **`.env.example` ファイル作成**: 新規開発者が環境変数設定をスムーズに行えるようにする
- [ ] **src/geminiService.ts の変更コミット**: `gemini-2.0-flash` への変更が未コミット（現在ワーキングツリーに差分あり）
- [ ] **エラーハンドリング改善**: Gemini APIエラー時のユーザーフレンドリーなメッセージ表示
- [ ] **画像プレビューのアスペクト比**: 縦長・横長画像の表示最適化
- [ ] **レスポンシブデザイン**: タブレット・デスクトップ表示の最適化（現在モバイルファースト）

### 既知のバグ

- **RestoreScreen**: 復元機能が現在ほぼ機能していない（パース精度が低い）
- **再生成ボタン**: タイトル・説明文の再生成が `aiGenerator.ts` のローカルロジックを使用しており、Gemini APIを使っていない（品質が低い）

---

## ハマりポイント・注意事項

### 1. Gemini API エンドポイント

❌ **NG**: `https://generativelanguage.googleapis.com/v1/models/...`  
✅ **OK**: `https://generativelanguage.googleapis.com/v1beta/models/...`

**理由**: inline_data形式での画像送信にはv1betaが必須。

### 2. 画像データ形式

```typescript
// ✅ 正しい形式
{
  inline_data: {
    mime_type: "image/jpeg",
    data: imageBase64.replace(/^data:image\/\w+;base64,/, "")  // ← プレフィックス削除が必要
  }
}
```

Base64プレフィックス（`data:image/jpeg;base64,`）を削除しないとAPIエラーになる。

### 3. JSON抽出の罠

Gemini APIのレスポンスは以下のいずれかの形式：

```
パターン1: ```json\n{...}\n```
パターン2: {...}
パターン3: Some text\n{...}\nSome text
```

`src/geminiService.ts:102-113` のロジックで全パターンに対応している。安易に `JSON.parse(textContent)` すると失敗する。

### 4. Zustand persist の挙動

`useMercariStore` は以下をlocalStorageに保存：
- `formData` (商品情報入力)
- `settings` (テンプレート設定)
- `generatedContent` (生成結果)
- `currentScreen` (現在の画面)

**注意**: ブラウザのlocalStorageをクリアするとすべてリセットされる。

### 5. 文字数カウントの誤差

`generatedContent.description.length` は文字数（改行・空白含む）をカウント。実際のメルカリの文字数制限（1000文字）とは若干ズレる可能性がある。

### 6. Gemini API料金

- **gemini-2.0-flash**: 無料枠あり（月間一定リクエスト数まで）
- 画像付きリクエストは通常のテキストリクエストより消費量が多い
- [料金ページ](https://ai.google.dev/pricing) で最新情報を確認

### 7. TypeScriptエラー回避

`aiGenerator.ts` の `any` 型使用（line 14）はRestoreScreen専用の一時的なコード。厳密な型定義は不要と判断。

---

## デプロイ情報

### 現在の状態

- **デプロイ先**: なし（ローカル開発のみ）
- **想定デプロイ先**: Vercel / Netlify / Cloudflare Pages

### デプロイ手順（Vercel例）

```bash
# 1. Vercelにログイン
npm i -g vercel
vercel login

# 2. デプロイ
vercel

# 3. 環境変数設定（Vercelダッシュボード）
# Settings > Environment Variables
# VITE_GEMINI_API_KEY = <your_key>

# 4. 再デプロイ
vercel --prod
```

**注意**: 環境変数はVercelダッシュボードで設定が必要（.envファイルはデプロイされない）。

---

## 開発履歴（主要コミット）

```
eb85ad7 - Gemini APIモデル修正：gemini-1.5-flashに変更
ae42ab2 - Gemini APIモデル修正：gemini-2.0-flash（-exp削除）
10e0a18 - Gemini APIモデル更新：gemini-2.0-flash-exp（最新モデル）
dca3c8a - Gemini APIモデル名修正：gemini-1.5-flash-latest、v1beta使用
293a467 - Gemini API修正：v1エンドポイント、inline_data形式、JSON抽出改善
c1f622b - デバッグ改善：APIキー修正、詳細ログ追加
dea475d - 説明文構造改善：カラー・サイズセクションを明示的に追加
99f46d0 - プロンプト改善：自然な日本語、3ブロック構造、絵文字制限
334d56b - 画像アップロード＆Gemini API連携実装：一括生成機能追加
c3bdb61 - 復元画面・設定画面改善：絵文字アイコン、説明文追加、デザイン統一
bbdc9f5 - 出力画面改善：番号付きタイトル、絵文字アイコン、入力修正ボタン追加
52133d4 - 入力画面修正：必須削除、カテゴリ削除、文字化け修正
835f076 - UI/UX大幅改善：新カラーパレット・タップしやすいボタン・カード形式レイアウト
761ed7b - UI/UX大幅改善：レスポンシブ対応、女性向けデザイン
0ab20eb - メルカリ出品AIツール初期実装
5faace7 - 初期セットアップ
```

---

## トラブルシューティング

### 「生成に失敗しました」エラー

**原因**:
1. Gemini APIキーが未設定 or 間違っている
2. APIリクエスト制限に達した
3. 画像ファイルが大きすぎる（推奨: 5MB以下）

**対策**:
1. `.env` ファイルの `VITE_GEMINI_API_KEY` を確認
2. ブラウザのコンソール（F12）でエラーログを確認
3. `src/geminiService.ts` の console.log で詳細確認

### ローカルストレージが消える

**原因**: ブラウザのシークレットモードやCookie削除

**対策**: 通常ブラウザで使用。設定は都度バックアップを推奨。

### ビルドエラー

```bash
# 依存関係の再インストール
rm -rf node_modules package-lock.json
npm install

# TypeScriptキャッシュクリア
rm -rf dist
npm run build
```

---

## 今後の拡張案

- [ ] 複数画像対応（商品の異なるアングル）
- [ ] タイトル・説明文の手動編集機能
- [ ] 生成履歴のエクスポート（CSV/JSON）
- [ ] カテゴリ別テンプレート（レディース、メンズ、キッズ、雑貨）
- [ ] メルカリAPIとの連携（自動出品）
- [ ] A/Bテスト機能（どのタイトルが売れやすいか分析）
- [ ] 多言語対応（英語、中国語など）

---

## 貢献者向けガイドライン

### コーディング規約

- **TypeScript**: `strict: true` を遵守
- **コンポーネント**: 1ファイル1コンポーネント
- **スタイリング**: Tailwind CSSのユーティリティクラスのみ使用（CSS-in-JSは使わない）
- **状態管理**: 新しいグローバル状態は `store.ts` に追加
- **絵文字**: プロンプト内では ♪ と ◎ のみ、UI内では自由

### Git規約

- コミットメッセージは日本語OK
- 1コミット1機能
- 破壊的変更は詳細に説明

---

## ライセンス

このプロジェクトはプライベートプロジェクトです。

---

## 連絡先・サポート

プロジェクト固有の質問は、このリポジトリのIssueで管理。

---

**最終更新**: 2026-04-10  
**プロジェクト開始**: 2025-03頃  
**現在のステータス**: 開発中（機能実装完了、UI改善継続中）
