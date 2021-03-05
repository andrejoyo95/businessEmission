const { controlOveruse } = require("../controllers/controlOveruse")

async function socketClient(socket, visualizationCode, io, client_usedCode, clientID, viewers) { //let fs = require('fs')let num = {}
	console.log('-----------------socketClient-----------------')
	controlOveruse(socket, client_usedCode, visualizationCode, clientID, viewers)
	let clients = Object.entries(io.engine.clients)
	console.log('ID de cliente: ', clients[clients.length-1][0])
	console.log('Código usado: ', visualizationCode)
}

module.exports.socketClient = socketClient