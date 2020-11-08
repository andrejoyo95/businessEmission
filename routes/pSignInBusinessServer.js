const axios = require('axios')

async function pSignInBusinessServer (key, user, password) {
    console.log('from route pSignInBusinessServer: ', key, user, password)
    let url = 'https://sign-in-business-services.herokuapp.com/signInBusinessServer'
    //let url = 'http://localhost:7000/signInBusinessServer'
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

module.exports.pSignInBusinessServer = pSignInBusinessServer