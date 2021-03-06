let { server } = require('../app')
let io = require('socket.io')(server)
module.exports.io = io
//let {comproveEmissionKey} = require('../controllers/comproveEmissionKey')
let { socketBusiness } = require('./socketBusiness')
let { socketViewers } = require('./socketViewers')
let { socketClient } = require('./socketClient')

require('./middleware')
let viewers = [0]
let client_usedCode = []
io.on('connection', async function(socket) {
	//console.log("------------------------ socket ------------------------")
	let { emissionKey, eventStream, key, visualizationCode } = socket.handshake.query //console.log('emissionKey: ', emissionKey, 'eventStream: ', eventStream, 'key: ', key, 'visualizationCode: ', visualizationCode) //console.log('COOKIE: ', socket.handshake.headers.cookie)
	if (emissionKey=='businessEmission') { //code==='emission'  validEmissionKey = comproveEmissionKey(emissionKey)
		if (eventStream){
			socketBusiness(socket, eventStream)
		} else {
			socketViewers(socket)
		}
	} else {
		let clientID = socket.id
		//console.log('socket client ID: ', clientID)
		socketClient(socket, visualizationCode, io, client_usedCode, clientID, viewers)
		console.log('client_usedCode:')
		console.log(client_usedCode)
		console.log('Espectadores: ', viewers[0])

		socket.on('disconnect', () => {
			viewers[0]--
			let client_usedCode_indexToRemove = client_usedCode.findIndex(element => element.clientID == clientID)
			client_usedCode.splice(client_usedCode_indexToRemove, 1)
			console.log('client_usedCode:')
			console.log(client_usedCode)
			console.log('Cliente desconectado ', clientID)
			console.log('Espectadores: ', viewers[0])
			
			socket.broadcast.emit('viewers', viewers[0])
		})
	}
})