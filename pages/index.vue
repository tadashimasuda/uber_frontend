<template>
  <div class="container col-11">
    <p class="text-center mt-5">
      配達記録の共有&個人データ管理が簡単にできるサイトです。<br />ツイッターで簡単にぶやけます。
    </p>
    <div class="text-center">
      <button class="btn btn-danger mt-3">
        <nuxt-link to="/login" class="text-white">ログインしてはじめる</nuxt-link>
      </button>
    </div>
    <h4 class="text-center new_post mt-4 pb-4">最新投稿！</h4>
    <div id="carouselExampleControls" class="carousel slide col-md-7 mx-auto border" data-ride="carousel">
    <div class="carousel-inner">
        <div class="carousel-item active">
          <nuxt-link :to="`/posts/${posts.posts[0].id}`">
            <img class="d-block w-100" src='https://picsum.photos/250/120' alt="First slide">
          </nuxt-link>
        </div>
        <div class="carousel-item">
          <nuxt-link :to="`/posts/${posts.posts[1].id}`">
            <img class="d-block w-100" :src="'https://uber-s3.s3-ap-northeast-1.amazonaws.com/post/' + posts.posts[1].img_path" alt="Second slide">
          </nuxt-link>
        </div>
        <div class="carousel-item">
          <nuxt-link :to="`/posts/${posts.posts[2].id}`">
            <img class="d-block w-100" :src="'https://uber-s3.s3-ap-northeast-1.amazonaws.com/post/' + posts.posts[2].img_path" alt="Third slide">
          </nuxt-link>
        </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>
    </div>
    <div class="text-center">
      <button class="btn btn-lg mt-5 text-primary bg-white border-primary">
        <nuxt-link to="/create">
          <i class="fas fa-plus pr-1"></i>投稿する
        </nuxt-link>
      </button>
    </div>
    <h4 class="text-center crown mt-5 pb-4">
      <i class="fas fa-crown text-warning pr-1"></i>報酬ランキング
    </h4>
    <div class="users row mt-5 justify-content-center" v-if="posts.feeRank.length>5">
      <div class="text-center mb-3 mx-2 col-md-2 user_icon">
        <img src="" alt="" /><br>
        <p>{{posts.feeRank[0].name}}</p>
        <p>{{posts.feeRank[0].total_fee}}</p>
      </div>
      <div class="text-center mb-3 mx-2 col-md-2 user_icon">
        <img src="" alt="" /><br>
        <p>{{posts.feeRank[1].name}}</p>
        <p>{{posts.feeRank[1].total_fee}}</p>
      </div>
    </div>
    <div v-else>
        データが存在しません
    </div>
</div>
</template>

<style scoped>
.new_post,
.crown {
  border-bottom: 2px dashed;
}
.user_icon {
  border-radius: 50%;
}
.user_icon img {
  height: 60px;
  width: 60px;
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
    let data  = await $axios.$get("/posts");
    console.log(data)
    return {
      posts: data,
    };
  },
};
</script>
