Engilsh version is [here](https://github.com/hal-shu-sato/tomato-gacha/blob/main/README.md).

# tomato-gacha

トマトガシャ

# 必要環境&ライブラリ

- Node.js 12.18.4
- npm 6.14.6 or yarn 1.22.4
- discord.js 12.3.1
- log4js 6.3.0

# 導入

## 環境変数の設定

以下の環境変数を設定してください。

- DISCORD_TOKEN：BOT のトークン
- PREFIX：BOT のコマンドのプレフィックス
- SERVER：絵文字のあるサーバー ID
- SSR：SSR の絵文字 ID
- SR：SR の絵文字 ID
- C：C の絵文字 ID

## Yarn

```bash
git clone https://github.com/hal-shu-sato/tomato-gacha.git
yarn add
```

## NPM

```bash
git clone https://github.com/hal-shu-sato/tomato-gacha.git
npm install
```

# 使い方

## バッチ (簡単)

Yarn を使用している場合、「start.bat」を起動してください。

## ターミナル (Yarn)

```bash
cd tomato-gacha
yarn run start
```

## ターミナル (NPM)

```bash
cd tomato-gacha
npm run start
```

# コマンド

- `/tomato` - トマトガシャを引く。
- `/tomato fes` - トマトフェスガシャを引く。
- `/tomato help` - トマトガシャの提供割合を確認する。

# メモ

Mac と Linux の環境下ではテストをしていません。

# 開発者

- [ato lash](https://github.com/hal-shu-sato)
- ホームページ: http://halshusato.starfree.jp/
- Twitter: https://twitter.com/hal_shu_sato

# ライセンス

「トマトガシャ」のライセンスは、[MIT License](https://github.com/hal-shu-sato/tomato-gacha/blob/main/LICENSE)です。
