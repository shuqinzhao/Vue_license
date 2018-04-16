const Mock = require('mockjs')

class UserAuth {
  build (name = 'admin') {
    return Mock.mock({
      'name': name,
      'mobile': '',
      'id': 1,
      'token': 'MnwxOjB8MTA6MTUxMDEwNDUyOXw5OnVzZXJfaW5mb3wzNjpleUp1WVcxbElqb2dJbUZrYldsdUlpd2dJbWxrSWpvZ01YMD18NWU2ZDNmMzJmZTk3MzQ2YTIyYjgxZjhjZjg4YmJiMDFlNThhYWM0Y2RjZGI4MTZjM2FiY2MzZDFmM2I5YWQ0Mg==',
      'create_time': '2017-10-12 10:39:18',
      'email': 'admin@woqutech.com',
    })
  }
}

module.exports = new UserAuth()
