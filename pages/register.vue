<template>
    <div class="container col-md-6 mt-5 shadow-lg py-5">
        <h2 class="text-center text-success">新規登録</h2>
        <form>
            <div class="form-group">
                <label>ユーザーネーム</label>
                <input type="text" class="form-control">
                <small class="form-text text-danger">ユーザーネームがエラーです</small>
            </div>
            <div class="form-group">
                <label>メールアドレス</label>
                <input type="email" class="form-control">
                <small class="form-text text-danger">メールアドレスがエラーです</small>
            </div>
            <div class="form-group">
                <label >パスワード</label>
                <input type="password" class="form-control">
                <small class="form-text text-danger">パスワードがエラーです</small>
            </div>
            <div class="form-group">
                <label >パスワード(確認用)</label>
                <input type="password" class="form-control">
                <small class="form-text text-danger">パスワード(確認用)がエラーです</small>
            </div>
            <div class="text-center">
               <button type="submit" class="btn btn-primary btn-lg bg-success border-0">ログイン</button>
            </div>
            <br>
            <small class="d-block text-center ">新規登録は<nuxt-link to="/register">こちら</nuxt-link></small>
        </form>
    </div>
</template>