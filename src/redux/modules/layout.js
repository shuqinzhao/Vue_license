// Constants
const HIDE_LOADING = 'app/layout/HIDE_LOADING'
const SHOW_LOADING = 'app/layout/SHOW_LOADING'

const HIDE_TOPBAR = 'app/layout/HIDE_TOPBAR'
const SHOW_TOPBAR = 'app/layout/SHOW_TOPBAR'

const HIDE_FOOTER = 'app/layout/HIDE_FOOTER'
const SHOW_FOOTER = 'app/layout/SHOW_FOOTER'

const HIDE_SIDEBAR = 'app/layout/HIDE_SIDEBAR'
const SHOW_SIDEBAR = 'app/layout/SHOW_SIDEBAR'

// Actions
const hideLoading = () => ({
  type: HIDE_LOADING
})
const showLoading = () => ({
  type: SHOW_LOADING
})
const hideTopbar = () => ({
  type: HIDE_TOPBAR
})
const showTopbar = () => ({
  type: SHOW_TOPBAR
})
const hideFooter = () => ({
  type: HIDE_FOOTER
})
const showFooter = () => ({
  type: SHOW_FOOTER
})
const hideSidebar = () => ({
  type: HIDE_SIDEBAR
})
const showSidebar = () => ({
  type: SHOW_SIDEBAR
})

export const actions = {
  hideLoading,
  showLoading,
  hideTopbar,
  showTopbar,
  hideFooter,
  showFooter,
  hideSidebar,
  showSidebar
}

// Reducer
const initialState = {
  shwoLoading: true,
  showTopbar: true,
  showFooter: true,
  showSidebar: true
}
const layout = (state = initialState, action = {}) => {
  switch (action.type) {
    case HIDE_LOADING:
      return Object.assign({}, state, {
        shwoLoading: false
      })
    case SHOW_LOADING:
      return Object.assign({}, state, {
        shwoLoading: true
      })
    case HIDE_TOPBAR:
      return Object.assign({}, state, {
        showTopbar: false
      })
    case SHOW_TOPBAR:
      return Object.assign({}, state, {
        showTopbar: true
      })
    case HIDE_FOOTER:
      return Object.assign({}, state, {
        showFooter: false
      })
    case SHOW_FOOTER:
      return Object.assign({}, state, {
        showFooter: true
      })
    case HIDE_SIDEBAR:
      return Object.assign({}, state, {
        showSidebar: false
      })
    case SHOW_SIDEBAR:
      return Object.assign({}, state, {
        showSidebar: true
      })
    default:
      return state
  }
}

export default layout
