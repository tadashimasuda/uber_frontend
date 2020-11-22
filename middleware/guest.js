export default function({store,redirect}){
    if (store.getters["auth/authenticated"]) {
        return redirect(`/users/`+store.getters["auth/user"].id)
    }
}