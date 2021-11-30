import VueCookies from "vue-cookies";
import { instance, instanceWithAuth } from "@/api/index";

const state = {
    host: 'http://127.0.0.1:3000',
    accessToken: null,
    role: '',
    emailAuthNumForSignUp: -1,
    emailAuthNumForResetPwd: -1,
    tempPassword: null
}

const getters = {
    isAdmin: (state) => {
        return state.role === 'admin'
    }
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
    setEmailAuthNumForSignUp (state, payload) {
        state.emailAuthNumForSignUp = payload.data.authNum;
    },
    resetEmailAuthNumForSignUp (state) {
        state.emailAuthNumForSignUp = -1;
    },
    setEmailAuthNumForResetPwd (state, payload) {
        state.emailAuthNumForResetPwd = payload.data.authNum;
    },
    resetEmailAuthNumForResetPwd (state) {
        state.emailAuthNumForResetPwd = -1;
    },
    setTempPwd (state, payload) {
        state.tempPassword = payload.data.pwd;
    },
    resetTempPwd (state) {
        state.tempPassword = null;
    }
}

const actions = {
    register: ({commit}, params) => {
        return new Promise((resolve, reject) => {
            instance.post(state.host + '/users/register', params).then(res => {
                //console.log('회원가입 요청 결과');
                //console.log(`${res.status}: ${res.data.msg}`);
                commit('setLoginToken', res.data);
                resolve(res);
            }).catch(err => {
                //console.log(`register failure : ${err.response.data}`)
                reject(err.response.data);
            })
        })
    },
    login: ({commit}, params) => {
      return new Promise((resolve, reject) => {
          instance.post(state.host + '/auth/login', params).then(res => {
              //console.log('login 요청 결과')
              //console.log(`${res.status} : ${res.data.msg}`)
              commit('setLoginToken', res.data);
              resolve(res);
          }).catch(err => {
              //console.log(`login failure : ${err.response.data}`)
              reject(err.response.data);
          })
      })
    },
    requestRefreshToken: ({commit}, params) => {
        // accessToken 재요청
        return new Promise((resolve, reject) => {
            instanceWithAuth.post(state.host + '/auth/check', params).then(res => {
                //console.log('accessToken 재요청 결과')
                //console.log(`${res.status} : ${res.data.msg}`)
                commit('setLoginToken', res.data);
                resolve(res.data);
            }).catch(err => {
                //console.log('refreshToken error : ', err.config);
                reject(err.response.data);
            })
        })
    },
    logout: ({commit}, params) => {
        return new Promise((resolve, reject) => {
            instance.post(state.host + '/users/logout', params).then(() => {
                //console.log('logout 결과')
                //console.log(`${res.status} : ${res.data.msg}`)
                commit('removeToken');
                resolve()
            }).catch(err => {
                //console.log(`logout error : ${err.response.data}`);
                commit('removeToken');
                reject(err.response.data)
            })
        })
    },
    emailAuth: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instance.post(state.host + '/auth/emailAuth', params).then(res => {
                //console.log('email auth 결과')
                //console.log(`${res.status} : ${res.data.msg}`)
                commit('setEmailAuthNumForSignUp', res.data);
                resolve()
            }).catch(err => {
                //console.log(`email auth failure : ${err.response.data}`)
                commit('resetEmailAuthNumForSignUp')
                reject(err.response.data);
            })
        }))
    },
    emailCheck: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instance.post(state.host + '/auth/emailCheck', params).then(res => {
                //console.log('send auth code for reset password 결과')
                //console.log(`${res.status} : ${res.data.msg}`)
                commit('setEmailAuthNumForResetPwd', res.data)
                resolve(res.data)
            }).catch(err => {
                //console.log(`send auth code for reset password error: ${err.response.data}`);
                commit('resetEmailAuthNumForResetPwd')
                reject(err.response.data);
            })
        }))
    },

    resetPwd: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instance.post(state.host + '/users/resetPwd', params).then(res => {
                //console.log('reset password 결과')
                //console.log(`${res.status} : ${res.data.msg}`)
                commit('setTempPwd', res.data)
                resolve()
            }).catch(err => {
                //console.log(`reset password error: ${err.response.data}`);
                commit('resetTempPwd')
                reject(err.response.data);
            })
        }))
    },

    // eslint-disable-next-line no-unused-vars
    isAdmin: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instanceWithAuth.post(state.host + '/users/isAdmin', params).then(res => {
                resolve(res.data.data['isAdmin'])
            }).catch(err => {
                reject(err.response.data);
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