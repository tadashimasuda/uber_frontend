<template>
    <div class="container col-10">
        <h3 class="pb-2 users_title my-5">登録されている配達員一覧</h3>
        <div class="col-md-7 mx-auto users">
            <div class="user py-2 mb-2 border " v-for="user in users" :key="user.id">
                <nuxt-link :to="{ path:'/users/'+ user.id, params:{id:user.id}}" class="d-flex flex-row">
                    <div class="user_img">
                        <img :src="'https://uber-s3.s3-ap-northeast-1.amazonaws.com/profile/' + user.img_path" class="user" alt="">                    
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
    </div>
</template>
<style>
.users_title{
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
    };
  },
  async asyncData({ $axios }) {
    let {data,links}  = await $axios.$get("/users");
    return {
      users: data,
      links
    };
  },
};
</script>