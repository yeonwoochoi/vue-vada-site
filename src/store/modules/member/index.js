import {instance, instanceWithAuth, instanceWithFiles} from "@/api/index";
import user from '@/store/modules/users/index'

const state = {

}

const getters = {

}

const mutations = {

}

const actions = {
    // eslint-disable-next-line no-unused-vars
    registerMember: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instanceWithFiles.post(user.state.host + '/member/register', params).then(res => {
                resolve(res);
            }).catch(err => {
                //console.log(`register failure : ${err.response.data}`)
                reject(err.response.data);
            })
        }))
    },

    // eslint-disable-next-line no-unused-vars
    readMemberByIdx: ({commit}, params) => {
        return new Promise((resolve, reject) => {
            instance.get(user.state.host + '/member/read/' + params).then(res => {
                resolve(res.data.data);
            }).catch(err => {
                //console.log(`read failure : ${err.response.data}`)
                reject(err.response.data);
            })
        })
    },

    // eslint-disable-next-line no-unused-vars
    readMemberAll: ({commit}) => {
        return new Promise((resolve, reject) => {
            instance.get(user.state.host + '/member/readAll').then(res => {
                resolve(res.data.data);
            }).catch(err => {
                //console.log(`read all failure : ${err.response.data}`)
                reject(err.response.data);
            })
        })
    },

    // eslint-disable-next-line no-unused-vars
    updateMember: ({commit}, params) => {
        return new Promise((resolve, reject) => {
            instanceWithAuth.post(user.state.host + '/member/update', params).then(res => {
                resolve(res);
            }).catch(err => {
                //console.log(`update member failure : ${err.response.data}`)
                reject(err.response.data);
            })
        })
    },

    // eslint-disable-next-line no-unused-vars
    deleteMember: ({commit}, params) => {
        return new Promise((resolve, reject) => {
            instanceWithAuth.post(user.state.host + '/member/delete', params).then(res => {
                resolve(res);
            }).catch(err => {
                //console.log(`delete member failure : ${err.response.data}`)
                reject(err.response.data);
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}