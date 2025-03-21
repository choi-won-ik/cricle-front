import { defineStore } from 'pinia';
import axios from 'axios';

export const useMemberStore = defineStore('member', {
    state: () => (
        {
            member: {
            idx: -1,
            userid: "",
            username: "",
            email: "",
            nickname: "",
            provider: ""
        }, 
        userInfo: {},
        isLogin: false
    }),
    persist: {
        storage: sessionStorage,
    },
    actions: {
        async login(user) {
            const response = await axios.post("/api/user/login", {userId:user.id, password:user.pw});
            if(response.status == 200) {
                this.isLogin = true;
            }
            return response;
        },

        async signup(user) {
            const response = await axios.post("/api/user/signup", 
                {userid:user.userid, password:user.password}
            );
            return response;
        },

        async logout() {
            this.isLogin = false;
            await axios.post("/api/logout");
        },
    }
})