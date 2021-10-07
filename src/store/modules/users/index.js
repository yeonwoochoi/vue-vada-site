import axios from 'axios';
import router from '@/router/index'

const state = {
    host: 'http://127.0.0.1:3000',
    token: '',
    id: '',
    role: '',
}

const getters = {
    getId: function(state){
        console.log(state.id);
        return state.id;
    }
}

const mutations = {
    loginToken: function (state, payload) {
        state.token = payload;
    },
    logout: function (state) {
        if (state.token) {
            state.token = '';
            alert('로그아웃되었습니다.');
        }
    },
    userCheck: function (state) {
        axios.get(`${state.host}/auth/check`, {
            headers: {
                "x-access-token": state.token
            }
        })
            .then(
                res => {
                    state.id = res.data.token.id;
                    state.role = res.data.token.role;
                    return state.id;
                },
                () => {
                    console.log('로그인 정보가 없음');
                    router.push("/authentication/sign-in");
                }
            );
    }
}

const actions = {

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}