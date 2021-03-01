let {comproveVisualizationCode} = require('../controllers/comproveVisualizationCode')
let {controlOveruse} = require('../controllers/controlOveruse')

async function socketClient(socket, key, visualizationCode) { //let fs = require('fs')let num = {}
	let validVisualizationCode = await comproveVisualizationCode(key, visualizationCode) //console.log(validVisualizationCode)
	if(validVisualizationCode) {
		let usedCodes =  validVisualizationCode.usedCodes
		controlOveruse(socket, usedCodes, visualizationCode)
	} else {
		socket.disconnect()
		console.log('Credenciales de transmisión no válidos, socket desconectado.')
	}
}

module.exports.socketClient = socketClient