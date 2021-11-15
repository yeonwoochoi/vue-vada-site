import VueCookies from "vue-cookies";
import { instance } from "@/api";
import user from '@/store/modules/users/index'

const state = {
    seminarContents: [],
}

const getters = {
    getSeminarContents: function (state) {
        return state.seminarContents
    },
}

const mutations = {
    updateSeminarContents (state, payload) {
        state.seminarContents = payload.data
    }
}

const actions = {
    registerSeminarContent: ({commit}, params) => {
        return new Promise((resolve, reject) => {
            instance.post(user.state.host + '/board/register', params, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-access-token': VueCookies.get("accessToken")
                }
            }).then(res => {
                console.log('Seminar 게시글 등록 요청 결과');
                console.log(`${res.status}: ${res.msg}`);
                commit('updateSeminarContents', res.data);
                resolve(res.data);
            }).catch(err => {
                console.log(`seminar content register failure : ${err.response.data}`)
                reject(err.response.data);
            })
        })
    },
    readAllSeminarContents: ({commit}) => {
        return new Promise(((resolve, reject) => {
            instance.get(user.state.host + '/board/readAll').then(res => {
                console.log('Seminar 게시글 모두 읽기 요청 결과');
                console.log(`${res.status}: ${res.msg}`);
                commit('updateSeminarContents', res.data);
                resolve(res);
            }).catch(err => {
                console.log(`read all seminar contents failure : ${err.response.data}`)
                reject(err.response.data);
            })
        }))
    },
    // eslint-disable-next-line no-unused-vars
    readSeminarContent: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instance.get(user.state.host + '/board/read/' + params).then(res => {
                console.log('Seminar 게시글 읽기 요청 결과');
                console.log(`${res.status}: ${res.msg}`);
                resolve(res);
            }).catch(err => {
                console.log(`read seminar content failure : ${err.response.data}`)
                reject(err.response.data);
            })
        }))
    },
    // eslint-disable-next-line no-unused-vars
    addViewCount: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instance.get(user.state.host + '/board/addViewCount/' + params).then(res => {
                console.log('Seminar 게시글 조회수 증가 요청 결과');
                console.log(`${res.status}: ${res.msg}`);
                resolve(res);
            }).catch(err => {
                console.log(`read seminar content failure : ${err.response.data}`)
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