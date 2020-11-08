<template>
    <div class="container col-12">
        <div class="user_img  mx-auto mt-5">
            <img :src="'https://uber-s3.s3-ap-northeast-1.amazonaws.com/profile/' + user.img_path" class="user" alt="">                    
        </div>
        <h3 class="name text-center mt-2">{{user.name}}</h3>
        <p class="text-center">
            <a href='http://twitter.com/' + user.twitter_id target="_blank">
                <i class="fab fa-twitter-square fa-2x"></i>
            </a>
        </p>
        <div class="profile col-md-8 mx-auto" v-if="user.profile">
            <h4 class="border-bottom border-success d-inline-block pb-2">プロフィール</h4>
            <p class="ml-3 border">{{user.profile}}</p>
        </div>
        <div class="chart col-md-8 mx-auto">
            <h4 class="border-bottom border-success d-inline-block pb-2">最近の乗車履歴</h4>
            <!-- chart -->
            <div class="row ml-5">
                <div class="posts border col-md-5 ml-1"  v-for="post in posts" :key="post.id">
                    {{post}}
                    <nuxt-link :to="`/posts/${post.id}`">
                        <img :src="'https://uber-s3.s3-ap-northeast-1.amazonaws.com/posts/' + post.img_path" class="border-bottom" alt="">
                    </nuxt-link>
                    <p class="text-right">{{post.created_at}}</p>
                </div>
            </div>
        </div> 
    </div>
</template>

<style scoped>
.user_img{
    width: 100px;
}
.user_img img{
    height:100px; 
    width:100px;
    border: 1px solid black;
    border-radius: 50%;
}
.fa-twitter-square{
    color:#1DA1F2;
}
.post{
    height:150px;
}
.post {
    width: 300px;
}
</style>

<script>
export default {
  data() {
    return {
      user: [],
      posts: [],
    };
  },
  async asyncData({ route,$axios }) {
    const id = route.params.id;
    let {data}  = await $axios.$get(`/user/${id}`);
    return {
      user: data,
      posts:data.posts
    };
  },
};
</script>