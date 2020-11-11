<template>
    <div class="container col-12">
        <div class="user_img  mx-auto mt-5">
            <template v-if="userData.img_path">
                <img :src="`https://uber-s3.s3-ap-northeast-1.amazonaws.com/profile/${userData.img_path}`" class="user" alt=""><br>
            </template>
            <template v-else>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT5BxhOQJ1qlEmkDNRxsOHpcduHYuHdloVi4g&usqp=CAU" class="user" alt="">                    
            </template>
        </div>
        <h3 class="name text-center mt-2">{{userData.name}}</h3>
        <p class="text-center">
            <a :href="`http://twitter.com/'${userData.twitter_id}`" target="_blank">
                <i class="fab fa-twitter-square fa-2x"></i>
            </a>
        </p>
        <div class="profile col-md-8 mx-auto" v-if="userData.profile">
            <h4 class="border-bottom border-success d-inline-block pb-2">プロフィール</h4>
            <p class="ml-3 border">{{userData.profile}}</p>
        </div>
        <div class="text-center" v-if="userData.id === user.id">
            <nuxt-link :to="`/users/${user.id}/edit`">ユーザー情報編集</nuxt-link>
        </div>
        <div class="chart col-md-8 mx-auto">
            <h4 class="border-bottom border-success d-inline-block pb-2">最近の乗車履歴</h4>
            <!-- chart -->
            <div class="col-md-11 mx-auto">
                <BarChart :labels="chartData.created_at|created_at" :data="chartData.fee"/>
            </div>
                <div class="posts row col-md-12 mx-auto ml-1 ">
                    <div class="post col-md-6 " v-for="post in posts" :key="post.id">
                        <nuxt-link :to="`/posts/${post.id}`">
                            <img :src="`https://uber-s3.s3-ap-northeast-1.amazonaws.com/post/${post.img_path}`" class="border-bottom" alt="">
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
.post img{
    width: 100%;
}

</style>

<script>
import BarChart from "@/components/BarChart.vue";

export default {
  data() {
    return {
      userData: '',
      posts: [],
      chartData:[],
    };
  },
  async asyncData({ route,$axios }) {
    const id = route.params.id;
    let {data}  = await $axios.$get(`/user/${id}`);
    
    return {
      userData: data,
      posts:data.posts,
      chartData:data.chartData
    };
  },
  filters: {
    created_at:function(created_at){
        const new_date=[]
        for(let i=0;i<created_at.length;i++){
            new_date.push(created_at[i].substring(0,9));
        }
        return new_date;
    }
  }
};
</script>