<template>
    <div class="container col-md-6 mt-5 shadow-lg py-5">
        <h2 class="text-center text-success">ログイン</h2>
        <form @submit.prevent="submit">
            <div class="form-group">
                <label>メールアドレス</label>
                <input v-model.trim="form.email" type="email" class="form-control" autofocus>
                <small class="form-text text-danger">メールアドレスがエラーです</small>
            </div>
            <div class="form-group">
                <label >パスワード</label>
                <input v-model.trim="form.password" type="password" class="form-control">
                <small class="form-text text-danger">パスワードがエラーです</small>
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
        return {
            form:{
                email:'',
                password:''
            }
        }
    },
    methods:{
        async submit(){
            await this.$auth.loginWith("local",{
                data:this.form
            })

            this.$router.push('/')
        } 
    }
}
</script>