export const actions = {
    edit({commit},payload){
        // console.log(payload);
        this.$axios.$put('/user',payload).then((res)=>{
            this.$router.push('/');
        }).catch(err=>{
            console.log(err);
        })
    },
};