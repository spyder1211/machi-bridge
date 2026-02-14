# まちブリッジ MVP デザインドキュメント

## 概要

自治体と企業のマッチングプラットフォーム「まちブリッジ」のMVPプロトタイプ。
企業・自治体・議員の三者がそれぞれのダッシュボードで価値を体験できるデモ。

**ゴール**: 「このプラットフォームがあると何が嬉しいか」を30秒で伝える。

## 技術スタック

- Vite + React (JavaScript)
- Tailwind CSS
- Noto Sans JP (Google Fonts)
- データ: アプリ内定数（API/DB不要）
- ルーティング: React state切替（react-router不要）
- デスクトップのみ

## アーキテクチャ

単一のReactアプリ。ヘッダーのロール切替タブで3つのダッシュボードを切り替え。

```
App.jsx
├── Header (ロゴ + ロール切替タブ)
├── CompanyDashboard (企業)
│   ├── SummaryCards
│   ├── FilterBar
│   ├── MatchingList
│   └── MunicipalitySidebar
├── MunicipalityDashboard (自治体: みらい市固定)
│   ├── PlanHeader
│   ├── KpiCards
│   ├── IssueAccordion (課題別 + マッチサービス)
│   └── CategoryChart
└── CouncilDashboard (議員: みらい市議会固定)
    ├── MunicipalityHeader
    ├── StatsCards
    ├── FilterBar
    └── BudgetIssueMap (予算款別課題マップ)
```

## データモデル

- `municipalities` (5件): 自治体 + 課題(issues) + KPI
- `services` (8件): 企業サービス + matchingIssueIds
- `budgetSections` (12件): 予算款マスター
- `categories` (6件): カテゴリマスター

全データは `src/data.js` に定義。

## ダッシュボード設計

### 企業ダッシュボード
- ログイン企業: 株式会社デジタルガバメント
- サマリーカード3枚 → マッチング一覧(フィルター付き) → サイドバー(自治体詳細)
- カードクリックでサイドバー連動

### 自治体ダッシュボード
- ログイン自治体: みらい市
- 基本計画ヘッダー → KPIカード → 課題アコーディオン(マッチサービス付き) → カテゴリ分布

### 議員ダッシュボード
- ログイン議員: みらい市議会
- 自治体概要 → 統計サマリー → 予算款別課題マップ(解決策付き) → フィルター

## デザイン

- プライマリ: 深緑〜ティール (#0f766e〜#14b8a6)
- 背景: #f8fafc / カード: #ffffff
- 予算款・カテゴリはモックデータ定義色
- KPI進捗はプログレスバーで視覚化

## スコープ外

- 認証・登録フロー
- フォームバリデーション・送信
- API/DB通信
- レスポンシブ対応
- ボタンはUIのみ（トースト通知で「デモ版」と表示）

## 詳細仕様

全ての詳細は `claude-code-mvp-prompt.md` を参照。
