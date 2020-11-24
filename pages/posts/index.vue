<template>
    <div class="container col-md-9">
        <h3 class="mt-5">投稿一覧</h3>
        <div class="row mb-3" v-if="posts">
            <div class="posts mt-4 col-md-6 shadow-sm" v-for="post in posts" :key="post.id">
                    <nuxt-link :to="`/posts/${post.id}`">
                        <div class="post">
                            <img :src="`https://uber-s3.s3-ap-northeast-1.amazonaws.com/post/` + post.img_path" alt="">
                        </div>
                    </nuxt-link>
                    <nuxt-link :to="`/users/${post.user.user_id}`">
                        <div class="user d-flex my-1">
                            <template v-if="user.img_path">
                                <img :src="`https://uber-s3.s3-ap-northeast-1.amazonaws.com/profile/` + user.img_path" class="user ml-2 my-1" alt=""><br>
                            </template>
                            <template v-else>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT5BxhOQJ1qlEmkDNRxsOHpcduHYuHdloVi4g&usqp=CAU" class="user ml-2 my-1" alt="">                    
                            </template>
                            <p class="mt-3 ml-1 text-dark">{{post.user.username}}</p>
                        </div>
                    </nuxt-link>
            </div>
        </div>
        <nav class="mb-5">
            <ul class="pagination justify-content-center">
                <li v-for="(key, value) in links" :key="value" class="page-item">
                <template v-if="key">
                    <a @click="loadMore(key)" href="#" class="page-link">
                        <template v-if="value =='first'">1</template>
                        <template v-if="value =='last'">最後へ</template>
                        <template v-if="value =='prev'">前へ</template>
                        <template v-if="value =='next'">次へ</template>
                    </a>
                </template>
                </li>
            </ul>
        </nav>
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
      links:[],
    };
  },
  async asyncData({ $axios, error }) {
    try {
        let {data,links}  = await $axios.$get("/posts/all");
        return {
            posts: data,
            links
        };
    } catch (err) {
      console.log(err);
    }
  },
  methods:{
      async loadMore(key) {
        try {
            let {data} =  await this.$axios.$get(key)
            return this.posts = {...this.posts, ...data}
        } catch (err) {
            console.log({
                statusCode: err.response.status,
                message: err.response.data.message,
        });
        }
    },
  },
  head() {
    return {
        title: '配達記録一覧| Uber配達員メーター',
        meta:[
          {
            hid:"description",
            name:"description",
            content:`配達パートナーによる投稿記録ページです。　${this.posts.length}件の配達を今すぐ見てみましょう！　簡単登録で配達パートナーで情報共有！　稼げるエリアや地域、稼げる時間帯を共有`,
          }
        ]
    }
    },
}
</script>