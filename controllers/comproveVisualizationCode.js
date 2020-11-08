const axios = require('axios')

async function comproveVisualizationCode(key, code) {
    let url = 'https://visualization-codes-services.herokuapp.com/comproveVisualizationCode'
    //let url = 'http://localhost:9000/comproveVisualizationCode'

    console.log('key: ', key)
    console.log('code: ', code)

    return axios.get(url, {
        params: {
            route: key,
            code: code
        }
    })
    .then(async function (response) {
        console.log(response.data)
        return await response.data
    })
    .catch(async function (error) {
        console.log(error)
        return await false
    })
}

exports.comproveVisualizationCode = comproveVisualizationCode