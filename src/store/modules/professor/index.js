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
    registerProfessor: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instanceWithFiles.post(user.state.host + '/professor/register', params).then(res => {
                resolve(res);
            }).catch(err => {
                //console.log(`register failure : ${err.response.data}`)
                reject(err.response.data);
            })
        }))
    },

    // eslint-disable-next-line no-unused-vars
    readProfessorByIdx: ({commit}, params) => {
        return new Promise((resolve, reject) => {
            instance.get(user.state.host + '/professor/read/' + params).then(res => {
                resolve(res.data.data);
            }).catch(err => {
                //console.log(`read failure : ${err.response.data}`)
                reject(err.response.data);
            })
        })
    },

    // eslint-disable-next-line no-unused-vars
    readProfessorAll: ({commit}) => {
        return new Promise((resolve, reject) => {
            instance.get(user.state.host + '/professor/readAll').then(res => {
                resolve(res.data.data);
            }).catch(err => {
                //console.log(`read all failure : ${err.response.data}`)
                reject(err.response.data);
            })
        })
    },

    // eslint-disable-next-line no-unused-vars
    updateProfessor: ({commit}, params) => {
        return new Promise((resolve, reject) => {
            instanceWithAuth.post(user.state.host + '/professor/update', params).then(res => {
                resolve(res);
            }).catch(err => {
                //console.log(`update professor failure : ${err.response.data}`)
                reject(err.response.data);
            })
        })
    },

    // eslint-disable-next-line no-unused-vars
    deleteProfessor: ({commit}, params) => {
        return new Promise((resolve, reject) => {
            instanceWithAuth.post(user.state.host + '/professor/delete', params).then(res => {
                resolve(res);
            }).catch(err => {
                //console.log(`delete professor failure : ${err.response.data}`)
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