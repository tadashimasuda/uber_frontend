<template>
    <div class="container col-md-6 mt-5 shadow-lg py-5">
        <h2 class="text-center text-success">ユーザー情報編集</h2>
        <form @submit.prevent="edit" enctype="multipart/form-data">
            <div class="form-group">
                <label>ユーザー名</label>
                <input v-model.trim="name" type="text" class="form-control">
                <small class="form-text text-danger" v-if="errors.name">{{errors.name[0]}}</small>
            </div>
            <div class="form-group">
                <label>メールアドレス</label>
                <input v-model.trim="email" type="email" class="form-control">
                <small class="form-text text-danger" v-if="errors.email">{{errors.email[0]}}</small>
            </div>
            <div class="form-group">
                <label>パスワード</label>
                <input v-model.trim="password" type="password" class="form-control" autofocus>
                <small class="form-text text-danger" v-if="errors.password">{{errors.password[0]}}</small>
            </div>
            <div class="form-group">
                <label>パスワード(確認用)</label>
                <input v-model.trim="password_confirmation" type="password" class="form-control" autofocus>
                <!-- <small class="form-text text-danger" v-if="errors.password">{{errors.password[0]}}</small> -->
            </div>
            <div class="form-group">
                <label>ユーザー画像</label>
                <input  type="file"  @change="updateImage" name="file">
                <!-- <input type="file" accept="image/png,image/jpeg,image/gif" @change="onFileChange"> -->
            </div>
            <div class="form-group">
                <label>Twitter</label>
                <input v-model.trim="twitter_id" type="text" class="form-control">
                <small class="form-text text-danger" v-if="errors.twitter_id">{{errors.twitter_id[0]}}</small>
            </div>
            <div class="form-group">
                <label>配達手段</label>
                <select v-model="transport" class="form-control">
                <option value="1">自転車</option>
                <option value="2">バイク</option>
                <option value="3">車</option>
                </select>
                <small class="form-text text-danger" v-if="errors.transport">{{errors.transport[0]}}</small>
            </div>
            <div class="text-center">
                <input type="button" @click="edit" value="編集">
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return {
                name:'',
                email:'',
                password:'',
                password_confirmation:'',
                twitter_id:'',
                image:'',
                transport:'',
        }
    },
    async asyncData({$axios}){
        const data = await $axios.$get('/user');
        return {
            name:data.data.name,
            email:data.data.email,
            transport:data.data.transport,
        };
    },
    
    methods: {
        updateImage(e) {
            let upload_file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(upload_file);
            reader.onloadend = (image) =>{
                this.image = reader.result;
            }
        },
        edit(){
            console.log(data);
            const data = {
                name:this.name,              
                email:this.email,
                password:this.password,
                password_confirmation:this.password_confirmation,
                twitter_id:this.twitter_id,
                image:this.image,
                transport:this.transport,
            }
            this.$store.dispatch("edit",data);
        }
	},
    head() {
		return {
            title: 'ユーザー情報編集| Uber配達員メーター',
            meta:[
                {
                    hid:"description",
                    name:"description",
                    content:"ユーザー情報編集　簡単登録で配達パートナーで情報共有！　稼げるエリアや地域、稼げる時間帯を共有",
                }
            ]
		}
	},
}
</script>