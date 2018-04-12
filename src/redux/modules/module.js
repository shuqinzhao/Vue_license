import {
  MODULE_MONITOR,
  MODULE_AIO,
  MODULE_BACKUP,
  MODULE_LICENSE,
  MODULE,
  STORAGE_OBJECT,
  BACKUP_MODULE_INFORMATION
} from '../../utils'

// Utils
const noop = () => {}
const getModule = () => {
  const record = STORAGE_OBJECT.getItem('module')

  return (record ? JSON.parse(record) : record)
}
const setModule = (record) => {
  STORAGE_OBJECT.setItem('module', (record ? JSON.stringify(record) : record))
}
const rmModule = () => {
  STORAGE_OBJECT.removeItem('module')
}
const generateModule = (data) => {
  const moduleTemp = {
    module: {},
    modules: [],
    active: ''
  }

  // Object.keys(MODULE) 得到的数组元素顺序依赖于浏览器(依赖 for...in 循环)
  const moduleKeys = [MODULE_MONITOR,
    MODULE_AIO,
    MODULE_BACKUP,
    MODULE_LICENSE
  ]
  moduleKeys.forEach((moduleKey, index, array) => {
    // data.hasMonitor data.hasData data.hasBackup
    if (data && data[MODULE[moduleKey].key]) {
      moduleTemp.module[MODULE[moduleKey].key] = data[MODULE[moduleKey].key]
      moduleTemp.module[MODULE[moduleKey].key].name = MODULE[moduleKey].name
      moduleTemp.modules.push(MODULE[moduleKey].key)

      if (moduleTemp.active === '') {
        moduleTemp.active = MODULE[moduleKey].key
      }
    }
  })

  if (moduleTemp.modules.length !== 0) {
    setModule(moduleTemp)
  }

  return moduleTemp
}

// Constants
const LOAD_MODULE_REQUEST = 'app/module/LOAD_MODULE_REQUEST'
const LOAD_MODULE_SUCCESS = 'app/module/LOAD_MODULE_SUCCESS'
const LOAD_MODULE_FAIL = 'app/module/LOAD_MODULE_FAIL'

const REMOVE_MODULE = 'app/module/REMOVE_MODULE'

const CHANGE_ACTIVE = 'app/module/CHANGE_ACTIVE'

// Actions
// const loadModuleRequest = () => ({
//   type: LOAD_MODULE_REQUEST
// })
const loadModuleSuccess = (data) => ({
  type: LOAD_MODULE_SUCCESS,
  data
})
// const loadModuleFail = (error) => ({
//   type: LOAD_MODULE_FAIL,
//   error
// })

const removeModule = () => ({
  type: REMOVE_MODULE
})
const changeActive = (active) => ({
  type: CHANGE_ACTIVE,
  active
})

const loadModule = (callback = noop) => {
  return (dispatch, getState) => {
    const module = getModule()

    if (module) {
      callback(module)
      return null
    }

    callback(BACKUP_MODULE_INFORMATION)
    return dispatch(loadModuleSuccess(BACKUP_MODULE_INFORMATION))
  }
}

export const actions = {
  removeModule,
  loadModule,
  changeActive
}

// Reducer
const initialState = Object.assign({}, {
  module: {},
  modules: [],
  active: '',
  error: '',
  isFetching: false
}, getModule())
const module = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_MODULE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case LOAD_MODULE_SUCCESS:
      return Object.assign({}, state, generateModule(action.data))
    case LOAD_MODULE_FAIL:
      console.log(action.error)
      return Object.assign({}, state)
    case REMOVE_MODULE:
      rmModule()
      return initialState
    case CHANGE_ACTIVE:
      const newState = Object.assign({}, getModule(), {
        active: action.active
      })
      setModule(newState)
      return newState
    default:
      return state
  }
}

export default module
