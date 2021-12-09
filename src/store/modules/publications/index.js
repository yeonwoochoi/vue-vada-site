import {instance, instanceWithAuth} from "@/api";
import user from '@/store/modules/users/index'

const state = {

}

const getters = {

}

const mutations = {

}

const actions = {
    // eslint-disable-next-line no-unused-vars
    registerContent: ({commit}, params) => {
        return new Promise((resolve, reject) => {
            instanceWithAuth.post(user.state.host + '/publications/create').then(res => {
                resolve(res.data);
            }).catch(err => {
                //console.log(`publications content register failure : ${err.response.data}`)
                reject(err.response.data);
            })
        })
    },

    // eslint-disable-next-line no-unused-vars
    readAllContents: ({commit}) => {
        return new Promise(((resolve, reject) => {
            instance.get(user.state.host + '/publications/readAll').then(res => {
                resolve(res.data.data);
            }).catch(err => {
                //console.log(`read all publication contents failure : ${err.response.data}`)
                reject(err.response.data);
            })
        }))
    },

    // eslint-disable-next-line no-unused-vars
    readContentByIdx: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instance.get(user.state.host + '/publications/read/' + params).then(res => {
                resolve(res.data.data);
            }).catch(err => {
                //console.log(`read publication content by index failure : ${err.response.data}`)
                reject(err.response.data);
            })
        }))
    },

    // eslint-disable-next-line no-unused-vars
    updateContent: ({commit}, params) => {
        return new Promise((resolve, reject) => {
            instanceWithAuth.post(user.state.host + '/publications/update', params).then(res => {
                resolve(res.data);
            }).catch(err => {
                //console.log(`publication content update failure : ${err.response.data}`)
                reject(err.response.data);
            })
        })
    },

    // eslint-disable-next-line no-unused-vars
    deleteContent: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instanceWithAuth.post(user.state.host + '/publications/delete', params).then(res => {
                resolve(res.data.msg)
            }).catch(err => {
                //console.log(`delete publication content failure : ${err.response.data}`)
                reject(err.response.data);
            })
        }))
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}