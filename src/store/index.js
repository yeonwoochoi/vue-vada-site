import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/users/index'
import board from './modules/board/index'
import project from './modules/project/index'
import news from './modules/news/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user: user,
    board: board,
    project: project,
    news: news
  }
})
