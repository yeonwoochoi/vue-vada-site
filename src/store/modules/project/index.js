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
    registerProject: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instanceWithFiles.post(user.state.host + '/projects/register', params).then(res => {
                resolve(res);
            }).catch(err => {
                //console.log(`register failure : ${err.response.data}`)
                reject(err.response.data);
            })
        }))
    },

    // eslint-disable-next-line no-unused-vars
    readProjectByIdx: ({commit}, params) => {
        return new Promise((resolve, reject) => {
            instance.get(user.state.host + '/projects/read/' + params).then(res => {
                resolve(res);
            }).catch(err => {
                //console.log(`read failure : ${err.response.data}`)
                reject(err.response.data);
            })
        })
    },

    // eslint-disable-next-line no-unused-vars
    readProjectAll: ({commit}) => {
        return new Promise((resolve, reject) => {
            instance.get(user.state.host + '/projects/readAll').then(res => {
                resolve(res);
            }).catch(err => {
                //console.log(`read all failure : ${err.response.data}`)
                reject(err.response.data);
            })
        })
    },

    // eslint-disable-next-line no-unused-vars
    updateProject: ({commit}, params) => {
        return new Promise((resolve, reject) => {
            instanceWithAuth.post(user.state.host + '/projects/update', params).then(res => {
                resolve(res);
            }).catch(err => {
                //console.log(`update project failure : ${err.response.data}`)
                reject(err.response.data);
            })
        })
    },

    // eslint-disable-next-line no-unused-vars
    deleteProject: ({commit}, params) => {
        return new Promise((resolve, reject) => {
            instanceWithAuth.post(user.state.host + '/projects/delete', params).then(res => {
                resolve(res);
            }).catch(err => {
                //console.log(`delete project failure : ${err.response.data}`)
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