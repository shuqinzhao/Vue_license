const Mock = require('mockjs')

class UserAuth {
  build (name = 'admin') {
    return Mock.mock({
      "token": "f4c2d738-cb65-4807-bbd6-69ca290574c5",
      "user": "license",
      "role": "admin",
    })
  }
}

module.exports = new UserAuth()
