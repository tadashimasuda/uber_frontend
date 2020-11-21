<template>
    <div class="container col-md-6 mt-5 shadow-lg py-5">
        <h2 class="text-center text-success">ログイン</h2>
        <form @submit.prevent="login">
            <div class="form-group">
                <label>メールアドレス</label>
                <input v-model.trim="form.email" type="email" class="form-control" autofocus>
                <small class="form-text text-danger" v-if="errors.email">{{errors.email[0]}}</small>
            </div>
            <div class="form-group">
                <label >パスワード</label>
                <input v-model.trim="form.password" type="password" class="form-control">
                <small class="form-text text-danger" v-if="errors.password">{{errors.password[0]}}</small>
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
    middleware:['guest'],
    data(){
        return {
            form:{
                email:'',
                password:''
            }
        }
    },
    methods: {
		async login(){
      try {
        const response = await this.$auth.loginWith("local",{
          data:{
            email:this.form.email,
            password:this.form.password,
          }
        })
        this.$router.push({path:this.$route.query.redirect||'/'})
      } catch (error) {
        console.log(error)
      }
    }
	},
    head() {
		return {
      title: 'ログイン | Uber配達員メーター',
      meta:[
          {
            hid:"description",
            name:"description",
            content:"ログインしてはじめる！　簡単登録で配達パートナーで情報共有！　稼げるエリアや地域、稼げる時間帯を共有",
          }
        ]
		}
	},
}
</script>