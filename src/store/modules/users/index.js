import axios from 'axios';
import VueCookies from "vue-cookies";

const state = {
    host: 'http://127.0.0.1:3000',
    accessToken: null,
    refreshToken: null,
    id: '',
    role: '',
}

const getters = {
    getToken () {
        let ac = VueCookies.get('accessToken');
        let rf = VueCookies.get('refreshToken');
        return {
            access: ac,
            refresh: rf
        };
    }
}

const mutations = {
    loginToken (state, payload) {
        VueCookies.set('accessToken', payload.accessToken, '60s');
        VueCookies.set('refreshToken', payload.refreshToken, '1h');
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
    },
    refreshToken(state, payload) {
        // accessToken resetting
        VueCookies.set('accessToken', payload.accessToken, '60s');
        VueCookies.set('refreshToken', payload.refreshToken, '1h');
        state.accessToken = payload;
    },
    removeToken () {
        VueCookies.remove('accessToken');
        VueCookies.remove('refreshToken');
    },
    /*
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
     */
}

const actions = {
    login: ({commit}, params) => {
      return new Promise((resolve, reject) => {
          axios.post('/auth/login', params).then(res => {
              commit('loginToken', res.data.auth_info);
              resolve(res);
          })
              .catch(err => {
                  console.log(err.message);
                  reject(err.message);
              })
      })
    },
    refreshToken: ({commit}) => {
        // accessToken 재요청
        return new Promise((resolve, reject) => {
            axios.post('/auth/check').then(res => {
                commit('refreshToken', res.data.auth_info);
                resolve(res.data.auth_info);
            }).catch(err => {
                console.log('refreshToken error : ', err.config);
                reject(err.config.data);
            })
        })
    },
    logout: ({commit}) => {
        commit('removeToken');
        location.reload();
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}