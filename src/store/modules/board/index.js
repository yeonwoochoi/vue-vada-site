import VueCookies from "vue-cookies";
import { instance } from "@/api/index";

import user from '@/store/modules/users/index'

const host = user.state.host;

const state = {
    seminarContents: []
}

const getters = {

}

const mutations = {
    updateSeminarContents (state, payload) {
        state.seminarContents = payload.data.seminarContents
    }
}

const actions = {
    // eslint-disable-next-line no-unused-vars
    registerSeminarContent: ({commit}, params) => {
        console.log(params)
        return new Promise((resolve, reject) => {
            instance.post(host + '/board/register', params, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-access-token': VueCookies.get("accessToken")
                }
            }).then(res => {
                console.log('Seminar 게시글 등록 요청 결과');
                //console.log(`${res.status}: ${res.msg}`);
                //commit('updateSeminarContents', res.data);
                resolve(res);
            }).catch(err => {
                console.log(`seminar content register failure : ${err.response.data}`)
                reject(err.response.data);
            })
        })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}