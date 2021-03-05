const axios = require('axios')

async function comproveVisualizationCode(key, code) {
    console.log('------------comproveVisualizationCode------------')
    let { visualizationCodesServices } = require('../vars') //let url = 'https://visualization-codes-services.herokuapp.com/comproveVisualizationCode' 'http://localhost:9000/comproveVisualizationCode'
    let url = visualizationCodesServices + 'comproveVisualizationCode'
    console.log('AXIOS request to: ', url)
    return axios.get(url, {
        params: {
            route: key,
            code: code
        }
    })
    .then(async function (response) {//console.log(response.data)
        return await response.data
    })
    .catch(async function (error) {
        console.log(error)
        return await false
    })
}

exports.comproveVisualizationCode = comproveVisualizationCode