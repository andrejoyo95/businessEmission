const axios = require('axios')

async function closeSession (userType, token, sessionID) {
    console.log('------------------------------closeSession--------------------------------')
    let { businessLogInOut } = require('../vars') //let url = 'https://sign-in-business-services.herokuapp.com/closeSession' 'http://localhost:7000/closeSession'
    let url = businessLogInOut + 'closeSession'
    console.log('---AXIOS request to: ', url)
    console.log('from route pCloseSession: ', userType, token, sessionID)
    return axios.post(url, {
        userType: userType,
        token: token,
        sessionID: sessionID
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

module.exports.closeSession = closeSession