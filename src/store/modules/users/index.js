import VueCookies from "vue-cookies";
import { instance, instanceWithAuth } from "@/api/index";

const state = {
    host: 'http://127.0.0.1:3000',
    accessToken: null,
    role: '',
    emailAuthNum: -1
}

const getters = {
}

const mutations = {
    setLoginToken (state, payload) {
        VueCookies.set('accessToken', payload.data.accessToken, '60s');

        localStorage.id = payload.data.id;
        state.role = payload.data.role;
        state.accessToken = payload.data.accessToken;
    },
    removeToken (state) {
        VueCookies.remove('accessToken');

        localStorage.id = null;
        state.role = null;
        state.accessToken = null;
    },
    setEmailAuthNum (state, payload) {
        state.emailAuthNum = payload.data.authNum;
    },
    resetEmailAuthNum (state) {
        state.emailAuthNum = -1;
    }
}

const actions = {
    register: ({commit}, params) => {
        return new Promise((resolve, reject) => {
            instance.post(state.host + '/users/register', params).then(res => {
                console.log('회원가입 요청 결과');
                console.log(`${res.status}: ${res.msg}`);
                commit('setLoginToken', res.data);
                resolve(res);
            }).catch(err => {
                console.log(err.message);
                reject(err.response.data.msg);
            })
        })
    },
    login: ({commit}, params) => {
      return new Promise((resolve, reject) => {
          instance.post(state.host + '/auth/login', params).then(res => {
              console.log('login 요청 결과')
              console.log(`${res.status} : ${res.msg}`)
              commit('setLoginToken', res.data);
              resolve(res);
          }).catch(err => {
              console.log(err.response.data.msg);
              reject(err.response.data.msg);
          })
      })
    },
    requestRefreshToken: ({commit}, params) => {
        // accessToken 재요청
        return new Promise((resolve, reject) => {
            instanceWithAuth.post(state.host + '/auth/check', params).then(res => {
                console.log('accessToken 재요청 결과')
                console.log(`${res.status} : ${res.msg}`)
                commit('setLoginToken', res.data);
                resolve(res.data);
            }).catch(err => {
                console.log('refreshToken error : ', err.config);
                reject(err.response.data.msg);
            })
        })
    },
    logout: ({commit}, params) => {
        return new Promise((resolve, reject) => {
            instance.post(state.host + '/users/logout', params).then(res => {
                console.log('logout 결과')
                console.log(`${res.status} : ${res.msg}`)
                commit('removeToken');
                resolve()
            }).catch(err => {
                console.log(`logout error : ${err.config}`);
                commit('removeToken');
                reject(err.config.data)
            })
        })
    },
    emailAuth: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instance.post(state.host + '/auth/emailAuth', params).then(res => {
                console.log('email auth 결과')
                console.log(`${res.status} : ${res.msg}`)
                commit('setEmailAuthNum', res.data);
                resolve()
            }).catch(err => {
                console.log(`email auth error: ${err.config}`);
                commit('resetEmailAuthNum')
                reject(err.response.data.msg);
            })
        }))
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}