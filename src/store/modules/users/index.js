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
    },
    getHost() {
        return state.host;
    }
}

const mutations = {
    setLoginToken (state, payload) {
        VueCookies.set('accessToken', payload.accessToken, '60s');
        VueCookies.set('refreshToken', payload.refreshToken, '1h');

        state.id = payload.id;
        state.role = payload.role;
        state.accessToken = payload.token;
        state.refreshToken = payload.token;
    },
    setRefreshToken(state, payload) {
        // accessToken resetting
        VueCookies.set('accessToken', payload.token, '60s');
        VueCookies.set('refreshToken', payload.token, '1h');

        state.id = payload.id;
        state.role = payload.role;
        state.accessToken = payload.token;
    },
    removeToken () {
        VueCookies.remove('accessToken');
        VueCookies.remove('refreshToken');
    },
}

const actions = {
    register: ({commit}, params) => {
        return new Promise((resolve, reject) => {
            axios.post(state.host + '/users', params).then(res => {
                console.log('회원가입 요청 결과');
                console.log(`${res.status}: ${res.msg}`);
                commit('setLoginToken', res.data);
                resolve(res);
            })
                .catch(err => {
                    console.log(err.message);
                    reject(err.message);
                })
        })
    },
    login: ({commit}, params) => {
      return new Promise((resolve, reject) => {
          axios.post(state.host + '/auth/login', params).then(res => {
              console.log('login 요청 결과')
              console.log(`${res.status} : ${res.msg}`)
              commit('setLoginToken', res.data);
              resolve(res);
          })
              .catch(err => {
                  console.log(err.message);
                  reject(err.message);
              })
      })
    },
    requestRefreshToken: ({commit}) => {
        // accessToken 재요청
        return new Promise((resolve, reject) => {
            axios.post(state.host + '/auth/check').then(res => {
                console.log('accessToken 재요청 결과')
                console.log(`${res.status} : ${res.msg}`)
                commit('setRefreshToken', res.data);
                resolve(res.data);
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