export default function({store,redirect}){
    if (store.getters["auth/authenticated"]) {
        console.log(store.getters["auth/user"].id)
        return redirect(`/users/`+store.getters["auth/user"].id)
    }
}