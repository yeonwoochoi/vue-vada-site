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
    registerLectureContent: ({commit}, params) => {
        return new Promise((resolve, reject) => {
            instance.post(user.state.host + '/lecture/register', params, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-access-token': VueCookies.get("accessToken")
                }
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                //console.log(`Lecture content register failure : ${err.response.data}`)
                reject(err.response.data);
            })
        })
    },


    // eslint-disable-next-line no-unused-vars
    readLectureContentsByPage: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instance.post(user.state.host + '/lecture/readByPage', params).then(res => {
                resolve(res);
            }).catch(err => {
                //console.log(`read lecture contents in page ${params.currentPage} failure : ${err.response.data}`)
                reject(err.response.data);
            })
        }))
    },

    // eslint-disable-next-line no-unused-vars
    readLectureContent: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instance.get(user.state.host + '/lecture/read/' + params).then(res => {
                resolve(res);
            }).catch(err => {
                //console.log(`read lecture content failure : ${err.response.data}`)
                reject(err.response.data);
            })
        }))
    },

    // eslint-disable-next-line no-unused-vars
    addViewCount: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instance.get(user.state.host + '/lecture/addViewCount/' + params).then(res => {
                resolve(res);
            }).catch(err => {
                //console.log(`read lecture content failure : ${err.response.data}`)
                reject(err.response.data);
            })
        }))
    },

    // eslint-disable-next-line no-unused-vars
    readTotalPage: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instance.post(user.state.host + '/lecture/getTotalPage', params).then(res => {
                resolve(res);
            }).catch(err => {
                //console.log(`read lecture total page count failure : ${err.response.data}`)
                reject(err.response.data);
            })
        }))
    },

    // eslint-disable-next-line no-unused-vars
    addComment: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instanceWithAuth.post(user.state.host + '/lecture/addComment', params).then(res => {
                resolve(res);
            }).catch(err => {
                //console.log(`add lecture comment failure : ${err.response.data}`)
                reject(err.response.data);
            })
        }))
    },

    // eslint-disable-next-line no-unused-vars
    checkAuthor: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instanceWithAuth.post(user.state.host + '/lecture/checkAuthor', params).then(res => {
                resolve(res.data.data['isAuthor'])
            }).catch(err => {
                //console.log(`check lecture's author failure : ${err.response.data}`)
                reject(err.response.data);
            })
        }))
    },

    // eslint-disable-next-line no-unused-vars
    deleteLectureContent: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instanceWithAuth.post(user.state.host + '/lecture/delete', params).then(res => {
                resolve(res.data.msg)
            }).catch(err => {
                //console.log(`delete lecture content failure : ${err.response.data}`)
                reject(err.response.data);
            })
        }))
    },

    // eslint-disable-next-line no-unused-vars
    updateLectureContent: ({commit}, params) => {
        return new Promise((resolve, reject) => {
            instance.post(user.state.host + '/lecture/update', params, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-access-token': VueCookies.get("accessToken")
                }
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                //console.log(`lecture content update failure : ${err.response.data}`)
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