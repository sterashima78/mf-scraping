# mf-scraping

MFの資産ページをスクレイピングして、金融商品を分類し、FireStoreに格納する。

## 実行時に必要な環境変数

- EMAIL: ログインメールアドレス
- PASSWORD: ログインパスワード
- SERVICE_ACCOUNT: firebaseの初期化情報のJSONをbase64エンコードしたもの
- CLASSIFY_RULE: 金融商品の分類ルールをJSONで記述したものをbase64エンコードしたもの

分類ルールは以下のようなもの。
配列のはじめから評価されて先にあたったカテゴリーに分類される。

```
[
    {
        "category": "日本株",
        "rule": "日経|トピックス"
    },
    {
        "category": "先進国株",
        "rule": "先進国|外国"
    },
    {
        "category": "その他",
        "rule": ".*"
    }
]
```