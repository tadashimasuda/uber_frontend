export const state = () => ({
    isLoading: false,

});

export const mutations = {
    setLoading(state, payload) {
        state.isLoading = payload;
    },
};

export const actions = {
    async setPost({ commit },payload) {        
        await this.$axios.$post('/posts',payload).then(()=>{
            this.$router.push('/');
        }).catch(err=>{
            console.log(err)
        });
    },
    setLoading({ commit }, payload) {
        console.log('setLoad');

        commit("setLoading", payload);
    },
};

export const getters = {
};
