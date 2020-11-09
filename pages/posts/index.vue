<template>
    <div class="container col-md-9">
        <h3 class="mt-5">投稿一覧</h3>
        <div class="row" v-if="posts">
            <div class="posts mt-4 col-md-6" v-for="post in posts" :key="post.id">
                    <nuxt-link :to="`/posts/${post.id}`">
                        <div class="post">
                            <img :src="`https://uber-s3.s3-ap-northeast-1.amazonaws.com/post/` + post.img_path" alt="">
                        </div>
                    </nuxt-link>
                    <nuxt-link :to="`/users/${post.user.user_id}`">
                        <div class="user d-flex my-1">
                            <template v-if="user.img_path">
                                <img :src="`https://uber-s3.s3-ap-northeast-1.amazonaws.com/profile/` + post.user.img_path" class="user ml-2 my-1" alt=""><br>
                            </template>
                            <template v-else>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT5BxhOQJ1qlEmkDNRxsOHpcduHYuHdloVi4g&usqp=CAU" class="user ml-2 my-1" alt="">                    
                            </template>
                            <p class="mt-3 ml-1 text-dark">{{post.user.username}}</p>
                        </div>
                    </nuxt-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.post img{
    height: 100%;
    width: 100%;
} 
h3{
    border-bottom: 2px solid green;
    display: inline-block;
}
.user img{
    height:50px; 
    width:50px;
    border: 1px solid black;
    border-radius: 50%;
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