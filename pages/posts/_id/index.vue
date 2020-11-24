<template>
    <div class="container col-md-11">
        <div class="post col-md-5 mx-auto">
            <div class="mt-5">
                <img :src="'https://uber-s3.s3-ap-northeast-1.amazonaws.com/post/' + post.img_path" alt="" class="col-12 mx-auto">
                <p class="text-right col-md-12">{{post.created_at}}</p>
            </div>
            <div @click="deletePost(post.id)" class="btn text-right col-md-12" v-if="user.id === postUser.id">削除する</div>
        </div>
        <div class="tweet_btn text-center">
            <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-size="large" data-show-count="false"></a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
        </div>
        <div class="col-md-4 mx-auto mt-2 shadow-sm">
            <nuxt-link :to="{ path:'/users/'+ postUser.id, params:{id:postUser.id}}">
                <div class="user d-flex">
                    <img :src="`https://uber-s3.s3-ap-northeast-1.amazonaws.com/profile/${postUser.img_path}`" class="ml-2 my-1" alt="">
                    <p class="mt-2 ml-3 text-dark">{{postUser.name}}</p>
                    <i class="fas fa-caret-right text-dark mt-3 ml-auto"></i>
                </div>
            </nuxt-link>
        </div>
        <div class="message col-md-10 mx-auto mt-5" v-if="post.message">
            <h3 class="message_title text-left">メッセージ</h3>
            <div class="col-md-10" style="white-space: pre-wrap; word-wrap:break-word;" v-text="post.message"></div>
        </div>
        <p class="text-center mt-4"><i class="far fa-thumbs-up"></i>{{post.like_count}}件</p>
        <div class="text-center mt-4">
            <div class="btn btn-outline-primary" @click="likePost(post.id)"><i class="far fa-thumbs-up"></i>いいね</div>
        </div>
        <div class="col-md-10 mx-auto mt-4">
            <h4 class="comment_title">コメント</h4>
            <div class="border-bottom mt-4" v-for="comment in comments" :key="comment.id">
                <div class="user_img d-flex mt-1" v-if="comment.user.user_img_path">
                    <img :src="'https://uber-s3.s3-ap-northeast-1.amazonaws.com/profile/' + comment.user.user_img_path" alt="" class="user">
                    <div class="name ml-1">{{comment.user.username}}</div>
                </div>
                <div class="user_img d-flex mt-1" v-else>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT5BxhOQJ1qlEmkDNRxsOHpcduHYuHdloVi4g&usqp=CAU" class="user" alt="">                    
                    <div class="name ml-1">{{comment.user.username}}</div>
                </div>
                
            <div class="comment ml-5" style="white-space: pre-wrap; word-wrap:break-word;">                    
                <div>{{comment.comment}}</div>
            </div>
        </div>
        <div class="post_comment mx-auto">
            <small class="form-text text-danger" v-if="errors.comment">{{errors.comment[0]}}</small>
            <form @submit.prevent="postComment">
                <textarea v-model="comment" rows="4" class=" border mx-auto col-md-12 my-2 mt-3 d-block"></textarea>
                <button class="btn submit col-md-12 mx-auto d-block">投稿する</button>
            </form>
        </div>
    </div>
    </div>
</template>

<style scoped>
.message_title,.comment_title{
    border-bottom: 2px solid green;
    display: inline-block;
}
.user_img img{
    height:20px; 
    width:20px;
    border: 1px solid black;
    border-radius: 50%;
}
.user img{
    height:50px; 
    width:50px;
    border: 1px solid black;
    border-radius: 50%;
}
.user p{
    font-size: 25px;
    text-decoration: none;
}
</style>

<script>
export default {
    data(){
        return{
            post:'',
            postUser:'',
            likes_user_id:'',
            comment:''
        }
    },
    async asyncData({$axios,params}){
        try {
            const {data} = await $axios.$get(`/posts/${params.id}`); 
            return {
                post:data.post,
                postUser:data.user,
                likes_user_id:data.likes_user_id,
                comments:data.comments
            }   
        } catch (error) {
            console.log(error);
        }   
    },
    methods:{
       async postComment({$axios,params}){
            await this.$axios.$post(`/posts/${this.$route.params.id}/comment`,{comment:this.comment}).then(()=>{
                location.reload();
            }).catch(err =>{
                console.log(err)
            })
        },
        async deletePost(id){
            await this.$axios.$delete(`/posts/${id}`);
            this.$router.push('/')
        },
        async likePost({params},id){
            const userFromVuex = this.$store.getters["auth/user"];
            if (userFromVuex){
                //投稿者か否か
                if (userFromVuex.id === this.postUser.user_id) {
                    alert('投稿者はいいねできません。')
                }else{
                    if(this.likes_user_id.some(id => id === userFromVuex.id)){
                        alert('いいね済みです。')
                    }else{
                        await this.$axios.$post(`/posts/${this.$route.params.id}/likes`);
                        const {data} = await this.$axios.$get(`/posts/${this.$route.params.id}`);
                        this.post=data.post,
                        this.postUser=data.user,
                        this.likes_user_id=data.likes_user_id,
                        this.comments=data.comments
                     }
                }
            }else{
                alert('ログインしてください')
            }
        }
    },
    head() {
        return {
            title: '本日の配達| Uber配達員メーター',
            meta:[
            {
                hid:"description",
                name:"description",
                content:`${this.user.name}さんの${this.post.created_at}　${this.post.area}の配達詳細ページです。　簡単登録で配達パートナーで情報共有！　稼げるエリアや地域、稼げる時間帯を共有`,
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
                content:`${this.user.name}さんの${this.post.created_at}　${this.post.area}の配達詳細ページです。　簡単登録で配達パートナーで情報共有！　稼げるエリアや地域、稼げる時間帯を共有`,
            },
            {
                hid:"og:image",
                property:"og:image",
                content:`https://uber-s3.s3-ap-northeast-1.amazonaws.com/post/${this.post.img_path}`,
            },
            {
                hid:"twitter:card",
                property:"twitter:card",
                content:`summary_large_image`,
            },
            {
                hid:"twitter:image:src",
                property:"twitter:image:src",
                content:`https://uber-s3.s3-ap-northeast-1.amazonaws.com/post/${this.post.img_path}`,
            }
        ]
        }
    },
}
</script>