import { defineStore } from "pinia";

export const AdminStore = defineStore("admin", {
    state: () => {
        return {
            token: "",
            id: "",
            account: "",
            rember: ""
        }
    },
    getters: {},
    actions: {}
})