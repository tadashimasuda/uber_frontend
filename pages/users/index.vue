<template>
    <div class="container col-md-9">
        <h3 class="pb-2 users_title my-5">登録されている配達員一覧</h3>
        <div class="col-md-7 mx-auto users">
            <div class="user py-2 mb-2 border " v-for="user in users" :key="user.id">
                <nuxt-link :to="{ path:'/users/'+ user.id, params:{id:user.id}}" class="d-flex flex-row">
                    <div class="user_img" v-if="user.img_path">
                        <img :src="'https://uber-s3.s3-ap-northeast-1.amazonaws.com/profile/' + user.img_path" class="user ml-2" alt="">                    
                    </div>
                    <div class="user_img" v-else>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT5BxhOQJ1qlEmkDNRxsOHpcduHYuHdloVi4g&usqp=CAU" class="user ml-2" alt="">                    
                    </div>
                    <div class="name col-md-10">
                        <p class="name pt-2 text-dark">
                            {{user.name}}
                            <i class="fas fa-caret-right float-right mt-1"></i>
                        </p>
                    </div>
                </nuxt-link>
            </div>
        </div>
        <nav>
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
<style>
.users_title{
    font-size: 120%;
    border-bottom: 2px solid green;
}
.user_img img{
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
      users: [],
      links:[]
    };
  },
  async asyncData({ $axios,error }) {
    try {
        let {data,links}  = await $axios.$get("/users");
        return {
        users: data,
        links
        };        
    } catch (error) {
        console.log(error);
    }


  },
  methods:{
      async loadMore(key) {
        let {data} =  await this.$axios.$get(key)
        return this.users = {...this.users, ...data}
      },
  },
    head() {
        return {
            title: '配達員一覧| Uber配達員メーター',
            meta:[
                {
                    hid:"description",
                    name:"description",
                    content:"配達員の一覧ページです。　地域、エリアを入力して共有　簡単登録で配達パートナーで情報共有！　稼げるエリアや地域、稼げる時間帯を共有",
                }
            ]
        }
    },
};
</script>