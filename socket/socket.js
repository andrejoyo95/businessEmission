let { server } = require('../app')
let io = require('socket.io')(server)
module.exports.io = io
//let {comproveEmissionKey} = require('../controllers/comproveEmissionKey')
let { socketBusiness } = require('./socketBusiness')
let { socketClient } = require('./socketClient')

require('./middleware')
let connectedIDs = []

io.on('connection', async function(socket) {
	console.log('----------------------socket ID--------------------: ', socket.id)
	connectedIDs.push(socket.id)
	console.log('connectedIDs connectedIDs connectedIDs connectedIDs connectedIDs ', connectedIDs) //console.log(socket) console.log(socket.conn)
	let { emissionKey, eventStream, key, visualizationCode } = socket.handshake.query
	console.log('emissionKey: ', emissionKey, 'eventStream: ', eventStream, 'key: ', key, 'visualizationCode: ', visualizationCode) //console.log('COOKIE: ', socket.handshake.headers.cookie)
	if (emissionKey) { //code==='emission'  validEmissionKey = comproveEmissionKey(emissionKey)
		socketBusiness(socket, eventStream)
	} else {
		socketClient(socket, key, visualizationCode)
	}
})