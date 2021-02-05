const axios = require('axios')

async function login (key, user, password) {
    console.log('from route pSignInBusinessServer -> login: ', key, user, password)
    let { businessLogInOut } = require('../vars') //let url = 'https://sign-in-business-services.herokuapp.com/signInBusinessServer' 'http://localhost:7000/signInBusinessServer'
    let url = businessLogInOut + 'signInBusinessServer'
    return axios.post(url, {
        key: key,
        user: user,
        password: password
    })
    .then(async function (response) {
        console.log(response.data)
        return await response.data
    })
    .catch(async function (error) {
        console.log(error)
        return await error
    })
}

module.exports.login = login