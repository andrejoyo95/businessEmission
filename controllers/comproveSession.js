const axios = require('axios')

async function comproveSession(userType, token, sessionID) {
	let { businessSessionsURL } = require('../vars') //let url = 'https://businessSessions.herokuapp.com/comproveSession' 'http://localhost:9000/comproveSession'
    let url = businessSessionsURL + 'comproveSession'
    console.log('---AXIOS request to: ', url)
    if (token && sessionID) {
	    return axios.get(url, {
	        params: {
	        	userType: 'business',
	            token: token,
	            sessionID: sessionID
	        }
	    })
	    .then(async function (response) {
	        console.log('------response.data------')
	        console.log(response.data)
	        return await response.data
	    })
	    .catch(async function (error) {
	        console.log(error)
	        return await false
	    })
	} else {
		return {sign:'parts/goIn'}
	}
}

exports.comproveSession = comproveSession