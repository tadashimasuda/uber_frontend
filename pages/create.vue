<template>
    <div class="container col-10">
        <div class="post mt-5 mx-auto">
            <div id="image">
                <p id="img_title">本日の配達</p>
                <p id="img_area">{{ area }} エリア</p>
                <div id="img_time_count">
                    <span id="time">{{ time }}</span>
                    <span id="count" class="ml-4">{{ count }}件</span>
                </div>
                <div id="img_fee">
                    <span id="fee">{{ fee }}円</span>
            </div>
    </div>
        </div>
        <div class="col-md-5 border mx-auto mt-5">
            <form>
                <div class="form-group">
                    <label>エリア</label>
                    <input v-model="area" type="text" class="form-control">
                    <small class="form-text text-danger" v-if="errors.area">{{errors.area}}</small>
                </div>
                <div class="form-group ">
                    <label>配達件数</label>
                    <select v-model="count" class="form-control">
                        <option v-for="count in 50" :key="count.id" :value="count">
                        {{ count }}
                        </option>
                    </select>
                    <small class="form-text text-danger" v-if="errors.count">{{errors.count}}</small>
                </div>
                <div class="form-group ">
                    <label>報酬金額</label>
                    <input v-model="fee" type="text" class="form-control">
                    <small class="form-text text-danger" v-if="errors.fee">{{errors.fee}}</small>
                </div>
                <div class="form-group ">
                    <label>メッセージ</label>
                    <textarea v-model="message" cols="5" rows="5" class="form-control"></textarea>
                    <small class="form-text text-danger" v-if="errors.message">{{errors.message}}</small>
                </div>
                <div class="form-group ">
                    <label>開始時刻:</label>
                    <div class="start">
                        
                        <select v-model="start_hour" class="form-control col-4 d-inline-block" >
                            <option v-for="staer_hour in 24" :key="staer_hour.id" :value="staer_hour">
                                {{ staer_hour }}
                            </option>
                        </select>
                        <p class="col-1 d-inline-block">時</p>
                        <select v-model="start_min" class="form-control col-4  d-inline-block">
                            <option v-for="start_min in 59" :key="start_min.id" :value="start_min">
                                {{ start_min }}
                            </option>
                        </select>
                        <p class="col-1 d-inline-block">分</p>
                    <small class="form-text text-danger" v-if="errors.start_hour">{{errors.start_hour}}</small>
                    <small class="form-text text-danger" v-if="errors.start_min">{{errors.start_min}}</small>
                    </div>
                    <label>終了時刻</label>
                    <div class="end">
                        <select v-model="end_hour" class="form-control col-4 d-inline-block">
                            <option v-for="end_hour in 24" :key="end_hour.id" :value="end_hour">
                                {{ end_hour }}
                            </option>
                        </select>
                        <p class="col-1 d-inline-block">時</p>
                        <select v-model="end_min" class="form-control col-4  d-inline-block">
                            <option v-for="end_min in 59" :key="end_min.id" :value="end_min">
                                {{ end_min }}
                            </option>
                        </select>
                        <p class="col-1 d-inline-block">分</p>
                    <small class="form-text text-danger" v-if="errors.end_hour">{{errors.end_hour}}</small>
                    <small class="form-text text-danger" v-if="errors.end_min">{{errors.end_min}}</small>
                    </div>
                </div>
                <client-only placeholder="Loading...">
                    <CreateImgBtn @click="create"/>
               </client-only>   
        </form>
        </div>
    </div>
</template>

<script>
import CreateImgBtn from "@/components/CreateImgBtn";

export default {
    components: {
        CreateImgBtn,
    },
    data(){
        return{
                area:'',
                count:'',
                fee:'',
                transport:1,
                message:'',
                count:'',
                start_hour:'',
                start_min:'',
                end_hour:'',
                end_min:'',
                image:''
        }
    },
                
    computed:{
        time:function (){
            let start_time = this.start_hour *60 + this.start_min;
            let end_time = this.end_hour *60 + this.end_min;
            let diff=0
            if(start_time>end_time){
                diff = start_time-end_time;
            }else{
                diff = end_time-start_time;
            }
            let h = Math.floor(diff/60);
            let m =  diff % 60;

            return h + '時間' + m + '分'; 
        }
    },
    methods:{
        create(e){
            this.$store.dispatch("post/setPost", 
            {
                message: this.message,
                image: e,
                area: this.area,
                fee: this.fee,
                transport: this.transport,
                count: this.count,
                start_hour:this.start_hour,
                start_min:this.start_min,
                end_hour:this.end_hour,
                end_min:this.end_min,
            });
        }
    }
}
</script>

<style>
div#image{
  background-color: black;
  border: #35aa3e solid 20px;
  height: 300px;
  width: 600px;
  margin: 0 auto;
  color: #fff;
  font-weight: bold;
  text-align: center;
}
p#img_title {
  font-size: 20px;
}
p#img_area {
  font-size: 35px;
}
#time,#count {
  font-size: 40px;
}
div#img_fee {
  font-size: 65px;
}
@media screen and (max-width: 460px) {
  div#image {
    border: #35aa3e solid 10px;
    padding: 20px 0;
    height: 200px;
    width: 350px;
    margin: 0 auto;
    color: #fff;
    font-weight: bold;
    text-align: center;
    margin-top: 100px;
  }
  p#img_area {
    font-size: 16px;
  }
#time,#count {
    font-size: 30px;
  }
  div#img_fee {
    font-size: 35px;
  }
}
</style>