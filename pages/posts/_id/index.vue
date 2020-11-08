<template>
    <div class="container col-10">
        <div class="post border mt-5 mx-auto col-md-4">
            <img :src="'https://uber-s3.s3-ap-northeast-1.amazonaws.com/post/' + post.img_path" alt="" class="mx-auto">
            <p class="text-right">{{post.created_at}}</p>
        </div>
        <div class="message col-md-8 mx-auto mt-5" v-if="post.message">
            <h3 class="message_title text-left">メッセージ</h3>
            <p class="border">{{post.message}}</p>
        </div>
        <p class="text-center mt-4">s件</p>
        <div class="text-center mt-4">
            <button class="btn border text-center">いいね</button>
        </div>
        <div class="col-md-8 mx-auto mt-4">
            <h4 class="comment_title">コメント</h4>
            <div class="border" v-for="comment in comments" :key="comment.id">
                <div class="user_img d-flex mt-1">
                    <img :src="'https://uber-s3.s3-ap-northeast-1.amazonaws.com/profile/' + comment.user.user_img_path" alt="" class="user">
                    <div class="name ml-1">{{comment.user.username}}</div>
                </div>
            <div class="comment ml-5">                    
                <div>{{comment.comment}}</div>
            </div>
        </div>
    </div>
    </div>
</template>

<style scoped>
.post img{
    width:200px;
    height:150px;
}
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
</style>

<script>
export default {
    data(){
        return{
            post:'',
            comments:''
        }
    },
    async asyncData({$axios,params}){
        const {data} = await $axios.$get(`/posts/${params.id}`)
        return {
            post:data.post,
            comments:data.comments
        }
    }
}
</script>