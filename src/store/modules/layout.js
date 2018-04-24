const HIDE_TOPBAR = 'app/layout/HIDE_TOPBAR'
const SHOW_TOPBAR = 'app/layout/SHOW_TOPBAR'

const hideTopbar = () => ({
  type: HIDE_TOPBAR,
})
const showTopbar = () => ({
  type: SHOW_TOPBAR,
})

const state = {
  showTopbar: true,
}

const mutations = {
  layout(state, action) {
    switch (action.type) {
      case HIDE_TOPBAR:
        return Object.assign({}, state, {
          showTopbar: false,
        })
      case SHOW_TOPBAR:
        return Object.assign({}, state, {
          showTopbar: true,
        })
      default:
        return state
    }
  }
}

export const actions = {
  hideTopbar,
  showTopbar,
}

export const layout = {
  state,
  actions,
}