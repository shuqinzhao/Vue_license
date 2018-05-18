import {
  MODULE_LICENSE,
  fetch,
} from '../utils'

export const userLoginApi = (data) => {
  return fetch(MODULE_LICENSE, `/login`, {
    method: 'post',
    body: JSON.stringify(data)
  })
}