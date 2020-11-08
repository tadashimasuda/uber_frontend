<template>
    <div class="container col-md-9">
        <h3 class="mt-5">投稿一覧</h3>
        <div class="row mx-auto justify-content-center" v-if="posts">
        <div class="posts mt-4 col-md-3 ml-2 border" v-for="post in posts" :key="post.id">
                <nuxt-link :to="`/posts/${post.id}`">
                    <div class="post">
                        <img src="" alt="">
                    </div>
                </nuxt-link>
                <nuxt-link :to="`/users/${post.user.user_id}`">
                    <div class="user">
                        <p>{{post.user.username}}</p>
                    </div>
                </nuxt-link>
        </div>
        </div>
    </div>
</template>

<style scoped>
.post{
    height:150px;
}
h3{
    border-bottom: 2px solid green;
    display: inline-block;
}
</style>

<script>
export default {
    data() {
    return {
      posts: [],
    };
  },
  async asyncData({ $axios }) {
    let {data}  = await $axios.$get("/posts/all");
    return {
      posts: data,
    };
  },
}
</script>