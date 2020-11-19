<template>
  <div class="container col-11">
    <p class="text-center mt-5">
      配達記録の共有&個人データ管理が簡単にできるサイトです。<br />ツイッターで簡単にぶやけます。
    </p>
    <div class="tweet_btn text-center">
      <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-size="large" data-show-count="false"></a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    </div>
    <div class="text-center">
      <button class="btn btn-danger mt-3">
        <nuxt-link to="/login" class="text-white">ログインしてはじめる</nuxt-link>
      </button>
    </div>
    <h4 class="text-center new_post mt-4 pb-4">最新投稿</h4>
    <template v-if="posts.length">
      <div id="carouselExampleControls" class="carousel slide col-md-5 mx-auto mt-3" data-ride="carousel">
      <div class="carousel-inner">
          <div class="carousel-item active" v-if="posts[0]">
            <nuxt-link :to="`/posts/${posts[0].id}`">
              <img class="d-block w-100" :src="'https://uber-s3.s3-ap-northeast-1.amazonaws.com/post/' + posts[0].img_path" alt="First slide">
            </nuxt-link>
          </div>
          <div class="carousel-item" v-if="posts[1]">
            <nuxt-link :to="`/posts/${posts[1].id}`">
              <img class="d-block w-100" :src="'https://uber-s3.s3-ap-northeast-1.amazonaws.com/post/' + posts[1].img_path" alt="First slide">
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
    </template>
    <template v-else>
          <p class="text-center">データが存在しません</p>
    </template>
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
    <template v-if="feeRank.length > 5">
      <div class="users row mt-5 justify-content-center" >
      <div class="text-center mb-3 mx-2 col-md-2 user_icon" v-for="x in 5" :key="x.id">
        <nuxt-link :to="`/users/${feeRank[x].user_id}`">
          <p class="text-dark">{{x}}位</p>
          <template v-if="feeRank[x].img_path">
            <img src="" alt="" /><br>
          </template>
          <template v-else>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT5BxhOQJ1qlEmkDNRxsOHpcduHYuHdloVi4g&usqp=CAU" class="user ml-2" alt="">                    
          </template>
          <p class="text-dark">{{feeRank[x].name}}さん</p>
          <p class="text-dark">{{feeRank[x].total_fee}}円</p>
        </nuxt-link>
      </div>
    </div>
    </template>
    <template v-else>
      <p class="text-center">データが存在しません</p>
    </template>
    <p class="text-right">
      <nuxt-link to="/users">配達員一覧へ</nuxt-link>
    </p>
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
      feeRank:[]
    };
  },
  async asyncData({ $axios, error }) {
    await $axios.$get('/posts').then( res => {
      return {
        posts: res.posts,
        feeRank:res.feeRank
      }
    }).catch (err=>{
        error({
          statusCode: err.response.status,
          message: err.response.data.message,
        });
    })
  },
  head() {
			return {
        title: 'Uber配達員メーター | 配達記録ができるサイト',
        meta:[
          {
            hid:"description",
            name:"description",
            content:"ウーバーイーツ配達員の記録&管理サービスです。　配達パートナーの投稿を共有して効率よくウーバーイーツをしよう！　稼げるエリアや地域、稼げる時間帯を共有",
          },
          {hid:"og:type",property:"og:type",content:"article"},
          { 
            hid:"og:title",
            property:"og:title",
            content:"Uber配達員メーター | 配達記録ができるサイト"
          },
          {
            hid:"og:discription",
            property:"og:discription",
            content:"ウーバーイーツ配達員の記録&管理サービスです。　配達パートナーの投稿を共有して効率よくウーバーイーツをしよう！　稼げるエリアや地域、稼げる時間帯を共有",
          },
          {
            hid:"og:image",
            property:"og:image",
            content:"https://uber-s3.s3-ap-northeast-1.amazonaws.com/top_image.png",
          },
          {
            hid:"twitter:card",
            property:"twitter:card",
            content:"summary_large_image",
          },
          {
            hid:"twitter:image:src",
            property:"twitter:image",
            content:"https://uber-s3.s3-ap-northeast-1.amazonaws.com/top_image.png",
          }
        ]
			}
		},
};
</script>
