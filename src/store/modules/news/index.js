import VueCookies from "vue-cookies";
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
    registerNewsContent: ({commit}, params) => {
        return new Promise((resolve, reject) => {
            instance.post(user.state.host + '/news/register', params, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-access-token': VueCookies.get("accessToken")
                }
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                //console.log(`news content register failure : ${err.response.data}`)
                reject(err.response.data);
            })
        })
    },


    // eslint-disable-next-line no-unused-vars
    readNewsContentsByPage: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instance.post(user.state.host + '/news/readByPage', params).then(res => {
                resolve(res);
            }).catch(err => {
                //console.log(`read news contents in page ${params.currentPage} failure : ${err.response.data}`)
                reject(err.response.data);
            })
        }))
    },

    // eslint-disable-next-line no-unused-vars
    readNewsContent: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instance.get(user.state.host + '/news/read/' + params).then(res => {
                resolve(res);
            }).catch(err => {
                //console.log(`read news content failure : ${err.response.data}`)
                reject(err.response.data);
            })
        }))
    },

    // eslint-disable-next-line no-unused-vars
    addViewCount: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instance.get(user.state.host + '/news/addViewCount/' + params).then(res => {
                resolve(res);
            }).catch(err => {
                //console.log(`read news content failure : ${err.response.data}`)
                reject(err.response.data);
            })
        }))
    },

    // eslint-disable-next-line no-unused-vars
    readTotalPage: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instance.post(user.state.host + '/news/getTotalPage', params).then(res => {
                resolve(res);
            }).catch(err => {
                //console.log(`read news total page count failure : ${err.response.data}`)
                reject(err.response.data);
            })
        }))
    },

    // eslint-disable-next-line no-unused-vars
    updateNewsContent: ({commit}, params) => {
        return new Promise((resolve, reject) => {
            instance.post(user.state.host + '/news/update', params, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-access-token': VueCookies.get("accessToken")
                }
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                //console.log(`news content update failure : ${err.response.data}`)
                reject(err.response.data);
            })
        })
    },

    // eslint-disable-next-line no-unused-vars
    deleteNewsContent: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instanceWithAuth.post(user.state.host + '/news/delete', params).then(res => {
                resolve(res.data.msg)
            }).catch(err => {
                //console.log(`delete news content failure : ${err.response.data}`)
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