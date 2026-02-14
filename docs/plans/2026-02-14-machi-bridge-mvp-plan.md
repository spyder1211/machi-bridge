# まちブリッジ MVP 実装計画

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 自治体×企業マッチングプラットフォームのMVPデモを構築し、企業・自治体・議員の3ダッシュボードで価値を体験できるようにする。

**Architecture:** Vite + React の単一アプリ。ヘッダーのロール切替タブで3ダッシュボードを切り替える。データは全てアプリ内定数。ルーティングはReact stateのみ。

**Tech Stack:** Vite, React (JavaScript), Tailwind CSS, Noto Sans JP

**詳細仕様:** `claude-code-mvp-prompt.md` を必ず参照すること。モックデータ、ダッシュボード設計、デザイン方針の全詳細が記載されている。

---

### Task 1: プロジェクト初期化

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/index.css`, `tailwind.config.js`

**Step 1: Vite + React プロジェクトをスキャフォールド**

```bash
npm create vite@latest . -- --template react
```

既存ファイル（docs/）はそのまま残す。上書き確認が出たらスキップ。

**Step 2: Tailwind CSS をインストール・設定**

```bash
npm install
npm install -D tailwindcss @tailwindcss/vite
```

`vite.config.js` に Tailwind プラグインを追加:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

`src/index.css` の先頭に追加:

```css
@import "tailwindcss";
```

**Step 3: Google Fonts 読み込み**

`index.html` の `<head>` に追加:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
```

`src/index.css` に追加:

```css
body {
  font-family: 'Noto Sans JP', sans-serif;
}
```

**Step 4: 開発サーバーで動作確認**

```bash
npm run dev
```

ブラウザで表示されることを確認。

**Step 5: コミット**

```bash
git add -A
git commit -m "feat: scaffold Vite + React + Tailwind project"
```

---

### Task 2: モックデータ定義

**Files:**
- Create: `src/data.js`

**Step 1: `src/data.js` を作成**

`claude-code-mvp-prompt.md` のセクション4「モックデータ」から以下をすべてコピー:
- `municipalities` (5件、各issuesを含む)
- `services` (8件)
- `budgetSections` (12件)
- `categories` (6件)

全て `export const` で定義する。

**Step 2: App.jsx からインポートして確認**

```jsx
import { municipalities, services } from './data'
console.log('municipalities:', municipalities.length, 'services:', services.length)
```

ブラウザコンソールで `municipalities: 5 services: 8` が出ることを確認。

**Step 3: コミット**

```bash
git add src/data.js
git commit -m "feat: add mock data (municipalities, services, budgets, categories)"
```

---

### Task 3: アプリ骨格 + ヘッダー + ロール切替

**Files:**
- Modify: `src/App.jsx`
- Create: `src/components/Header.jsx`

**Step 1: Header コンポーネントを作成**

ロール切替タブ付きヘッダー:
- ロゴ「まちブリッジ」
- 3つのタブ: 🏢 企業 / 🏛 自治体 / 🎓 議員
- 選択中タブはティール色 (#0f766e) + 下線
- 各タブ下に一言キャッチ（仕様書セクション3参照）

Props: `activeRole`, `onRoleChange`

**Step 2: App.jsx でロール state を管理**

```jsx
const [activeRole, setActiveRole] = useState('company')
```

ロールに応じてプレースホルダーの div を切替表示（後で各ダッシュボードに置換）。

**Step 3: 動作確認**

タブクリックで切替わること、アクティブ色が変わることを確認。

**Step 4: コミット**

```bash
git add src/App.jsx src/components/Header.jsx
git commit -m "feat: add header with role switching tabs"
```

---

### Task 4: 共通UIコンポーネント

**Files:**
- Create: `src/components/ui/Badge.jsx`
- Create: `src/components/ui/ProgressBar.jsx`
- Create: `src/components/ui/SummaryCard.jsx`
- Create: `src/components/ui/Toast.jsx`

**Step 1: Badge コンポーネント**

予算款バッジ・カテゴリバッジを表示。Props: `label`, `color`
背景を薄い色、テキストを濃い色で表示。

**Step 2: ProgressBar コンポーネント**

KPI進捗バーを表示。Props: `current`, `target`, `label`
数値から%を計算して表示。

**Step 3: SummaryCard コンポーネント**

サマリーカード（数値 + ラベル）。Props: `value`, `label`, `icon`

**Step 4: Toast コンポーネント**

デモ版ボタンクリック時の通知。アプリレベルで state 管理。
「デモ版のため、この機能は実装されていません」と表示し、3秒で自動消去。

**Step 5: 動作確認**

各コンポーネントを仮表示して見た目を確認。

**Step 6: コミット**

```bash
git add src/components/ui/
git commit -m "feat: add shared UI components (Badge, ProgressBar, SummaryCard, Toast)"
```

---

### Task 5: 企業ダッシュボード

**Files:**
- Create: `src/components/company/CompanyDashboard.jsx`
- Create: `src/components/company/MatchingCard.jsx`
- Create: `src/components/company/MunicipalitySidebar.jsx`
- Create: `src/components/company/FilterBar.jsx`
- Modify: `src/App.jsx` (プレースホルダーを置換)

**Step 1: CompanyDashboard の骨格**

株式会社デジタルガバメントとしてログイン中の体。
`services` からid=1のサービスを取得し、`matchingIssueIds` を使って全自治体の課題をフィルタリング。

**Step 2: サマリーカード3枚**

仕様書セクション5.1の①を実装:
- マッチ自治体数
- 対象課題数
- カバー予算款

**Step 3: FilterBar**

フィルターUI: 都道府県、カテゴリ、予算款、優先度。
state管理してマッチング一覧をフィルタリング。

**Step 4: MatchingCard**

仕様書セクション5.1の②のカードデザインを実装:
- 自治体名・県名・人口
- マッチ課題名・説明
- 予算款バッジ・カテゴリバッジ・優先度
- KPIプログレスバー
- マッチサービス名
- 「この自治体に提案する」ボタン（Toast表示）

**Step 5: MunicipalitySidebar**

右カラム。選択中自治体の基本計画情報:
- 計画名、方向性テキスト、全課題リスト
- 初期状態は最初のマッチ自治体を選択
- MatchingCardクリックでサイドバー連動

**Step 6: App.jsx に組み込み**

プレースホルダーを CompanyDashboard に置換。

**Step 7: 動作確認**

- サマリーカードの数値が正しいか
- フィルターが動作するか
- カードクリックでサイドバーが切り替わるか
- ボタンクリックでToastが出るか

**Step 8: コミット**

```bash
git add src/components/company/ src/App.jsx
git commit -m "feat: implement company dashboard with matching list and sidebar"
```

---

### Task 6: 自治体ダッシュボード

**Files:**
- Create: `src/components/municipality/MunicipalityDashboard.jsx`
- Create: `src/components/municipality/PlanHeader.jsx`
- Create: `src/components/municipality/KpiCard.jsx`
- Create: `src/components/municipality/IssueAccordion.jsx`
- Create: `src/components/municipality/CategoryChart.jsx`
- Modify: `src/App.jsx`

**Step 1: MunicipalityDashboard 骨格**

みらい市（id=1）固定表示。

**Step 2: PlanHeader**

仕様書セクション5.2の①:
- 計画名、方向性テキスト

**Step 3: KpiCard 横並び**

仕様書セクション5.2の②:
- 各課題のKPI、プログレスバー、バッジ、優先度

**Step 4: IssueAccordion**

仕様書セクション5.2の③:
- アコーディオン開閉
- 課題詳細、KPI詳細
- マッチする企業サービスカード（`matchingIssueIds` で逆引き）
- 「詳細を見る」「オファーを送る」ボタン（Toast）

**Step 5: CategoryChart**

カテゴリ別・予算款別の課題分布。
CSS のみで簡易な棒グラフを実装（charting ライブラリ不要）。

**Step 6: App.jsx に組み込み、動作確認**

**Step 7: コミット**

```bash
git add src/components/municipality/ src/App.jsx
git commit -m "feat: implement municipality dashboard with KPI cards and issue accordion"
```

---

### Task 7: 議員ダッシュボード

**Files:**
- Create: `src/components/council/CouncilDashboard.jsx`
- Create: `src/components/council/BudgetIssueMap.jsx`
- Create: `src/components/council/StatsCards.jsx`
- Modify: `src/App.jsx`

**Step 1: CouncilDashboard 骨格**

みらい市議会議員固定表示。

**Step 2: StatsCards**

仕様書セクション5.3の③:
- 課題総数、高優先度数、対応予算款数、解決策候補数

**Step 3: FilterBar（企業ダッシュボードのFilterBarを再利用）**

予算款、優先度、カテゴリで絞り込み。

**Step 4: BudgetIssueMap**

仕様書セクション5.3の②:
- 予算款をグループヘッダーとして課題カードを配置
- 各課題にKPIプログレスバー
- 解決策の選択肢（マッチサービス）を表示
- 「関連サービスをすべて見る」ボタン（Toast）

**Step 5: MunicipalityHeader**

自治体概要: 自治体名、人口、計画名、方向性。

**Step 6: App.jsx に組み込み、動作確認**

**Step 7: コミット**

```bash
git add src/components/council/ src/App.jsx
git commit -m "feat: implement council dashboard with budget-issue map"
```

---

### Task 8: 全体仕上げ

**Files:**
- Modify: 各コンポーネント

**Step 1: ロール切替トランジション**

切替時にフェードまたはスライドのトランジションを追加。
Tailwind の `transition` + `opacity` で実装。

**Step 2: ホバーエフェクト**

カードのホバー時に薄い影 (`hover:shadow-lg`)、ボタンのホバー色変化。

**Step 3: AI解析注釈**

ダッシュボード下部に控えめに表示:
「この情報はAIにより自治体の基本計画から自動抽出されたものです」

**Step 4: 余白・フォントサイズ微調整**

全体を通して確認。カード間余白、テキストサイズ、色味。

**Step 5: 動作確認**

全3ダッシュボードを切り替えて一通り操作。

**Step 6: コミット**

```bash
git add -A
git commit -m "feat: polish UI transitions, hover effects, and spacing"
```

---

### Task 9: 最終確認 + プッシュ

**Step 1: 全機能を通しで確認**

- 企業ダッシュボード: フィルター、カードクリック、サイドバー連動
- 自治体ダッシュボード: KPIカード、アコーディオン開閉、マッチサービス
- 議員ダッシュボード: 予算款別マップ、フィルター、統計サマリー
- Toast通知、タブ切替トランジション

**Step 2: ビルド確認**

```bash
npm run build
```

エラーなくビルドが完了すること。

**Step 3: プッシュ**

```bash
git push origin main
```
