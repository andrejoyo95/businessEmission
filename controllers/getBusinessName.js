const axios = require('axios')

async function getBusinessName(routeName) {
	let { businessInfoURL } = require('../vars') //let url = 'https://businessInfo.herokuapp.com/businessName' 'http://localhost:9001/businessName'
    let url = businessInfoURL + 'businessName'
    console.log('---AXIOS request to: ', url)
    return axios.get(url, {
        params: {
        	routeName: routeName
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
}

module.exports.getBusinessName = getBusinessName