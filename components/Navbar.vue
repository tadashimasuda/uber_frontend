<template>
<nav class="navbar navbar-expand-lg navbar-light bg-success">
  <nuxt-link class="navbar-brand text-light" to="/">Uber配達員メーター</nuxt-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <nuxt-link class="nav-link" to="/">サンプル</nuxt-link>
      </li>
    </ul>
    <template v-if="!authenticated">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <nuxt-link class="nav-link" to="/login">ログイン</nuxt-link>
        </li>
      </ul>
    </template>
    <template v-if="authenticated">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link">{{user.name}}</a>
        </li>
        <li class="nav-item">
          <a @click.prevent="logout" class="nav-link">Logout</a>
        </li>
      </ul> 
    </template>
  </div>
</nav>
</template>

<script>
export default {
   methods:{
     logout(){
       this.$auth.logout()
     }
   }
}
</script>