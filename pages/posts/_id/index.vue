<template>
    <div class="container col-10">
        <div class="post col-md-6 mx-auto">
            <div class="mt-5">
                <img :src="'https://uber-s3.s3-ap-northeast-1.amazonaws.com/post/' + post.img_path" alt="" class="col-12 mx-auto">
                <p class="text-right col-md-12">{{post.created_at}}</p>
            </div>
            <button @click="deletePost(post.id)" class="text-right col-md-12" v-if="user.id === postUser.user_id">削除する</button>
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
                <div class="user_img d-flex mt-1" v-if="comment.user.user_img_path">
                    <img :src="'https://uber-s3.s3-ap-northeast-1.amazonaws.com/profile/' + comment.user.user_img_path" alt="" class="user">
                    <div class="name ml-1">{{comment.user.username}}</div>
                </div>
                <div class="user_img d-flex mt-1" v-else>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT5BxhOQJ1qlEmkDNRxsOHpcduHYuHdloVi4g&usqp=CAU" class="user" alt="">                    
                    <div class="name ml-1">{{comment.user.username}}</div>
                </div>
                
            <div class="comment ml-5">                    
                <div>{{comment.comment}}</div>
            </div>
        </div>
        <div class="post_comment mx-auto">
            <form @submit.prevent="postComment">
                <textarea v-model="comment" rows="4" class="mx-auto col-md-10 my-2 d-block"></textarea>
                <button class="btn submit mx-auto d-block">投稿する</button>
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
</style>

<script>
export default {
    data(){
        return{
            post:'',
            postUser:'',
            comment:''
        }
    },
    async asyncData({$axios,params}){
        const {data} = await $axios.$get(`/posts/${params.id}`)
        return {
            post:data.post,
            postUser:data.user,
            comments:data.comments
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
        }
    },
    
    
}
</script>