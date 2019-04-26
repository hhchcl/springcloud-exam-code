import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
    common_headerInformation: false,
    common_headerMenu: false,
    common_footerHasMarginTop: true,
    count: 10
}

// 定义所需的 mutations
const mutations = {
    HEADERINFORMATION(state, value) {
        state.common_headerInformation = value
    },
    HEADERMENU(state, value) {
        state.common_headerMenu = value
    },
    FOOTERHASMARGINTOP(state, value) {
        state.common_footerHasMarginTop = value
    },
    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})