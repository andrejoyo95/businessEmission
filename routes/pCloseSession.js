
const axios = require('axios')

async function pCloseSession (userType, token, bSessionID) {
	let url = 'https://sign-in-business-services.herokuapp.com/closeSession'
	//let url = 'http://localhost:7000/closeSession'
    console.log('from route pCloseSession: ', userType, token, bSessionID)
    return axios.post(url, {
		userType: userType,
		token: token,
		sessionID: bSessionID
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

module.exports.pCloseSession = pCloseSession