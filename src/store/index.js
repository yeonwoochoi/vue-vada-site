import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/users/index'
import board from './modules/board/index'
import project from './modules/project/index'
import news from './modules/news/index'
import publications from './modules/publications/index'
import professor from './modules/professor/index'
import member from './modules/member/index'
import utils from './modules/utils/index'
import research from './modules/research/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user: user,
    research: research,
    board: board,
    project: project,
    news: news,
    publications: publications,
    member: member,
    professor: professor,
    utils: utils,
  }
})
