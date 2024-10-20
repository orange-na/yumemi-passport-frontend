# ゆめみパスポート フロントエンドコーディング試験

![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/-React-45b8d8?style=flat-square&logo=react&logoColor=white)
![Next.js](https://img.shields.io/badge/-Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![Recharts](https://img.shields.io/badge/-Recharts-22ADF6?style=flat-square&logo=recharts&logoColor=white)
![Jest](https://img.shields.io/badge/-Jest-C21325?style=flat-square&logo=jest&logoColor=white)
![Playwright](https://img.shields.io/badge/-Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white)

このリポジトリは、ゆめみパスポートのフロントエンドコーディング試験の解答例です。試験では、RESAS API を使用して都道府県別の人口推移グラフを表示する Web アプリケーションを開発しました。

デプロイ先 URL: [https://yumemi-passport-frontend-murex.vercel.app/](https://yumemi-passport-frontend-murex.vercel.app/)

## 機能

- 都道府県のチェックボックスを選択すると、選択された都道府県の人口推移グラフが表示されます。
- グラフには、総人口、年少人口、生産年齢人口、老年人口の 4 つの区分が表示されます。
- グラフの表示期間は 1960 年から 2045 年までです。
- レスポンシブデザインに対応しており、モバイル端末でも快適に閲覧できます。

## 使用技術

- Next.js (App Router)
- React
- TypeScript
- CSS Modules
- Recharts
- Zustand
- Jest
- Playwright
- ESLint
- Prettier
- GitHub Actions

## プロジェクト構成

```
.
├── .github
│   └── workflows            # GitHub Actionsのワークフローファイルを格納
├── src
│   ├── app                  # Next.jsのApp Routerに関連するファイルを格納
│   ├── components           # 再利用可能なコンポーネントを格納
│   ├── config               # 設定ファイルを格納
│   ├── constants            # 定数を定義するファイルを格納
│   ├── e2e                  # E2Eテストのファイルを格納
│   ├── env                  # 環境変数の型定義ファイルを格納
│   ├── features             # 機能ごとのコンポーネントを格納
│   ├── libs                 # 外部ライブラリを格納
│   ├── stores               # 状態管理に関するファイルを格納
│   └── types                # 型定義ファイルを格納
├── .env                     # 環境変数を定義
├── .eslintrc.json           # ESLintの設定ファイル
├── README.md                # プロジェクトの説明文書
├── jest.config.ts           # Jestの設定ファイル
├── next.config.mjs          # Next.jsの設定ファイル
├── package.json             # プロジェクトの依存関係とスクリプトを定義
├── playwright.config.ts     # Playwrightの設定ファイル
└── tsconfig.json            # TypeScriptの設定ファイル
```

## セットアップ

1. リポジトリをクローン

```bash
$ git clone https://github.com/yourusername/yumemi-passport-frontend.git
```

2. 依存関係をインストール

```bash
$ cd yumemi-passport-frontend
$ npm install
```

3. 環境変数の設定

```bash
$ cp .env.sample .env
```

4. 開発サーバーを起動

```bash
$ npm run dev
```

## テスト

このプロジェクトでは、単体テストに Jest、E2E テストに Playwright を使用しています。

### 単体テスト

```bash
$ npm run test
```

### E2E テスト

```bash
$ npm run test:e2e
```

## デプロイ

このアプリケーションは、Vercel を使用してデプロイされています。

## 参考資料

- [RESAS API](https://opendata.resas-portal.go.jp/)
- [Next.js](https://nextjs.org/)
- [Recharts](https://recharts.org/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Playwright](https://playwright.dev/)
