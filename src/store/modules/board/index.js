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
    registerSeminarContent: ({commit}, params) => {
        return new Promise((resolve, reject) => {
            instance.post(user.state.host + '/board/register', params, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-access-token': VueCookies.get("accessToken")
                }
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                //console.log(`seminar content register failure : ${err.response.data}`)
                reject(err.response.data);
            })
        })
    },


    // eslint-disable-next-line no-unused-vars
    readSeminarContentsByPage: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instance.post(user.state.host + '/board/readByPage', params).then(res => {
                resolve(res);
            }).catch(err => {
                //console.log(`read seminar contents in page ${params.currentPage} failure : ${err.response.data}`)
                reject(err.response.data);
            })
        }))
    },

    // eslint-disable-next-line no-unused-vars
    readSeminarContent: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instance.get(user.state.host + '/board/read/' + params).then(res => {
                resolve(res);
            }).catch(err => {
                //console.log(`read seminar content failure : ${err.response.data}`)
                reject(err.response.data);
            })
        }))
    },

    // eslint-disable-next-line no-unused-vars
    addViewCount: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instance.get(user.state.host + '/board/addViewCount/' + params).then(res => {
                resolve(res);
            }).catch(err => {
                //console.log(`read seminar content failure : ${err.response.data}`)
                reject(err.response.data);
            })
        }))
    },

    // eslint-disable-next-line no-unused-vars
    readTotalPage: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instance.post(user.state.host + '/board/getTotalPage', params).then(res => {
                resolve(res);
            }).catch(err => {
                //console.log(`read seminar total page count failure : ${err.response.data}`)
                reject(err.response.data);
            })
        }))
    },

    // eslint-disable-next-line no-unused-vars
    addComment: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instanceWithAuth.post(user.state.host + '/board/addComment', params).then(res => {
                resolve(res);
            }).catch(err => {
                //console.log(`add seminar comment failure : ${err.response.data}`)
                reject(err.response.data);
            })
        }))
    },

    // eslint-disable-next-line no-unused-vars
    checkAuthor: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instanceWithAuth.post(user.state.host + '/board/checkAuthor', params).then(res => {
                resolve(res.data.data['isAuthor'])
            }).catch(err => {
                //console.log(`check board's author failure : ${err.response.data}`)
                reject(err.response.data);
            })
        }))
    },

    // eslint-disable-next-line no-unused-vars
    checkCommentAuthor: ({commit}, params) => {
      return new Promise(((resolve, reject) => {
          instanceWithAuth.post(user.state.host + '/board/checkCommentAuthor', params).then(res => {
              resolve(res.data.data['isAuthor'])
          }).catch(err => {
              //console.log(`check board's comment author failure : ${err.response.data}`)
              reject(err.response.data);
          })
      }))
    },

    // eslint-disable-next-line no-unused-vars
    deleteBoardContent: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instanceWithAuth.post(user.state.host + '/board/delete', params).then(res => {
                resolve(res.data.msg)
            }).catch(err => {
                //console.log(`delete board content failure : ${err.response.data}`)
                reject(err.response.data);
            })
        }))
    },

    // eslint-disable-next-line no-unused-vars
    updateSeminarContent: ({commit}, params) => {
        return new Promise((resolve, reject) => {
            instance.post(user.state.host + '/board/update', params, {
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
    deleteCommentContent: ({commit}, params) => {
        return new Promise(((resolve, reject) => {
            instanceWithAuth.post(user.state.host + '/board/delete/comment', params).then(res => {
                resolve(res.data.msg)
            }).catch(err => {
                //console.log(`delete board comment failure : ${err.response.data}`)
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