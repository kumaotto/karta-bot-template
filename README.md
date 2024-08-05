# karta-bot-template
## インストール
プロジェクトの依存関係をインストールします。
```sh
npm install
```

## Wrangler ログイン
Cloudflare Wranglerにログインします。
```sh
wrangler login
```

## データベース設定
{db}には設定したいデータベース名を入力します。

```sh
wrangler d1 create {db}
```

出力された以下の文字列をコピーし、`wrangler.toml`に貼り付けます。
```sh
[[d1_databases]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "{db}"
database_id = "{出力されたデータベースID}"
```

## マイグレーション実行
データベースのマイグレーションを実行します。
```sh
wrangler d1 execute firstd1 --local --file=./sql/migration.sql
```

## ローカル実行
ローカル環境で開発サーバーを起動します。
```sh
wrangler dev --local
```

## デプロイ
プロジェクトをデプロイします。
```sh
wrangler publish
```