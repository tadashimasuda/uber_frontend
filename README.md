# README
### Frontend(SSR)
backend( [github]:https://github.com/tadashimasuda/uber_backend )

## 作った理由
    自分自身のuber配達経験とTwitterで配達履歴を報告するユーザーが多数見かけられたので制作。Uber配達は収入増加のため効率よく回りたいのでそれなりの情報がほしい。よって、情報共有可能なサービスを制作。

## アプリ概要 (URL:[https://uber-post.netlify.app])
Uber配達員の配達報告・管理サービス
1. ユーザーがアプリにアクセス
2. NuxtからLaravelのAPIを実行
3. AWS S3への投稿された画像の保存
4. フロントエンドのツイートリンクからツイート
5. TwitterからS3にアクセス

![uber](https://user-images.githubusercontent.com/51233312/103137855-29b97180-4710-11eb-9367-079a3fc00a69.png)

生成される画像イメージ
![post](https://uber-s3.s3-ap-northeast-1.amazonaws.com/post/13e343b9-fdc8-4f52-a6cf-d6bc2798e891)

## 注力した点（Nuxt.js）
- 初めてのバックエンドとフロントエンドを切り離し
- html2canvasを用いてDOMを画像化しているのでNuxtのライフサイクルのタイミング
- jwt(json web token)を認証機能として採用した。

## 機能
- ログイン機能
- 新規登録機能
- ユーザー情報編集機能
- ユーザー詳細（投稿履歴、過去五日間のグラフデータ、これまでの獲得金額）
- ユーザー一覧
- 投稿機能
- 投稿一覧
- ページネーション
- ユーザーランキング表示（報酬額順）

## 使用した言語、技術、サービス
- 言語
    - Frontend : Nuxt.js
    - Backend : Laravel

- DB
    -Mysql

- 技術
    - 認証周り
        jwt(json web token),Nuxt Auth module
    
    - Cors
        laravel-cors
    
    - 画像生成
        html2canvas

- サービス
    - ストレージサービス
        AWS S3
## 課題
   - Twitter連携の実装
   - デザインの修正
   - ドメインの取得
