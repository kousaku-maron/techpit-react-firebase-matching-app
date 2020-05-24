# 環境構築

* 下記ファイルを作成。(自分用テンプレ)
```
.eslintrc.json
.prettierrc.json
tsconfig.json
webpack.config.js
```

* パッケージの作成
```
yarn init
```

* 必要なライブラリインストール
```
yarn add ....
```

* `package.json`にコマンド追加
```
scripts
husky
lint-staged
```

* `.gitignore`の作成
* vscodeの設定ファイル追加
* typesの追加

* アプリのエントリーファイル作成
```
src/index.html
src/index.tsx
src/App.tsx
```

* アプリの起動
```
yarn dev
```

# Firebaseプロジェクトの設定

Firebase Consoleでプロジェクトを作成する。
「プロジェクトを設定」からGoogle Cloud Platform（GCP）リソース ロケーションを「asia-northeast1」を選択する。
Databaseから「テストモードで開始」でデータベースを作成する。
Storageからストレージを作成する。

```
> firebase login
> firebase init
```

利用するサービスを選択する。
```
? Which Firebase CLI features do you want to set up for this folder? Press Space to select features, then Enter to confirm your choices. 
❯◯ Database: Deploy Firebase Realtime Database Rules
 ◉ Firestore: Deploy rules and create indexes for Firestore
 ◉ Functions: Configure and deploy Cloud Functions
 ◉ Hosting: Configure and deploy Firebase Hosting sites
 ◉ Storage: Deploy Cloud Storage security rules
 ◯ Emulators: Set up local emulators for Firebase features
```

プロジェクトを選択する。
```
? Please select an option: (Use arrow keys)
❯ Use an existing project 
  Create a new project 
  Add Firebase to an existing Google Cloud Platform project 
  Don't set up a default project 
```

cloud functionsは"typescript"を、TSLintは"n"選択する。
```
? What language would you like to use to write Cloud Functions? TypeScript
? Do you want to use TSLint to catch probable bugs and enforce style? (Y/n) n
? Do you want to install dependencies with npm now? (Y/n) n
```

publicフォルダ削除し、appフォルダ作成し、フロントエンド環境構築のコードを移動。
`firebase.json`の`hosting`の設定を修正する。
ルートに`.gitignore`を追加。

# Firebaseに繋ぐ

Firebase Console
「プロジェクトを設定」からPlatformをWebでアプリを作成する。
表示される`Firebase configuration`をコピーしておく。

ライブラリインストール後、`firebase.ts`作成。
```
yarn add firebase
```

# Facebook Authの設定

* Facebook for Developpers
アプリを作成する。
「設定」の「ベーシック」から`アプリID`と`app secret`をコピーしておく。
「プロダクト」から「Facebookログイン」を選択し、プラットフォームを「Web」で作成する。

* Firebase Console
「Authentication」で、`Facebook`を有効化し、メモした`アプリID`と`app secret`を入力する。
表示されているリダイレクトURLをコピーしておく。

* Facebook for Developper
「プロダクト」の「Facebookログイン」の設定から、メモした`リダイレクトURL`を「有効なOAuthリダイレクトURI」に入力し、保存する。

# Google Authの設定

* Firebase Console
「Authentication」で、`Google`を有効化する。

# 認証サービス作成

下記ファイル作成。
```
services/auth.ts
>  認証に使う純粋な関数のみで、hooksは書いていない。
```

# 認証情報のStore作成

Store設計の参考
https://mizchi.hatenablog.com/entry/2019/02/08/154010
※Fluxの説明を入れないといけない。(重たい)

auth storeの作成。
```
store/auth/*
```

# 認証情報を扱うHooks作成

`useAuthEffect`作成。

```
services/auth.ts
```

# トップページ作成

仮で、トップページに自身のuidが表示されるようにしておく。

```
components/templates/Layout.tsx
components/pages/MainPage.tsx
```

# サインイン・サインアウト実装

authサービスを利用して、モーダルにてサインインできるようにする。

```
components/organisms/SignInDialog.tsx
```

レイアウトにヘッダーを追加し、authサービスを利用して、サインアウトできるようにする。

```
components/organisms/Header.tsx
```
