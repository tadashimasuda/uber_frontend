<template>
    <div class="container col-md-6 mt-5 shadow-lg py-5">
        <h2 class="text-center text-success">新規登録</h2>
        <form @submit.prevent="submit">
            <div class="form-group">
                <label>ユーザーネーム</label>
                <input v-model.trim="form.name" type="text" class="form-control" autofocus>
                <small class="form-text text-danger">ユーザーネームがエラーです</small>
            </div>
            <div class="form-group">
                <label>メールアドレス</label>
                <input v-model.trim="form.email" type="email" class="form-control">
                <small class="form-text text-danger">メールアドレスがエラーです</small>
            </div>
            <div class="form-group">
                <label >パスワード</label>
                <input v-model.trim="form.password" type="password" class="form-control">
                <small class="form-text text-danger">パスワードがエラーです</small>
            </div>
            <div class="form-group">
                <label >パスワード(確認用)</label>
                <input v-model.trim="form.password_confirmation" type="password" class="form-control">
                <small class="form-text text-danger">パスワード(確認用)がエラーです</small>
            </div>
            <div class="form-group">
                <label>配達手段</label>
                <select v-model="form.transport" class="form-control">
                    <option value=1>自転車</option>
                    <option value=2>バイク</option>
                    <option value=3>車</option>
                </select>
            </div>
            <div class="text-center">
               <button type="submit" class="btn btn-primary btn-lg bg-success border-0">ログイン</button>
            </div>
            <br>
            <small class="d-block text-center ">新規登録は<nuxt-link to="/register">こちら</nuxt-link></small>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            form:{
                email:'',
                name:'',
                password:'',
                password_confirmation:'',
                transport:''
            }
        }
    },
    methods:{
        async submit(){
            await this.$axios.$post('register',this.form)
            await this.$auth.loginWith('local',{
                data:{
                    email:this.form.email,
                    password:this.form.password,
                }
            })
            this.$router.push('/');
        }
    }
}
</script>