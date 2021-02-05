let { server } = require('../app')
let io = require('socket.io')(server)
//let {comproveEmissionKey} = require('../controllers/comproveEmissionKey')
let {comproveVisualizationCode} = require('../controllers/comproveVisualizationCode')

// middleware
io.use((socket, next) => {
	console.log('middleware middleware middleware middleware middleware')
	console.log(socket.handshake.headers)
	let host = socket.handshake.headers.host
	if(host==='localhost:5000'){ 
		console.log('host admitido')
		console.log(host)
		next()
	} else {
		next(new Error('Host authentication error'))
	}
	console.log(host)
	next()
})
io.on('connection', async function(socket) {
	let emissionKey = socket.handshake.query.emissionKey
	let event = socket.handshake.query.eventStream
 	let key = socket.handshake.query.key
	console.log('emissionKey: ', emissionKey, 'event: ', event, 'key: ', key)
	console.log('COOKIE: ', socket.handshake.headers.cookie)
		
	if (emissionKey) { //code==='emission'  validEmissionKey
		var fs = require('fs');
		let num = {}
		socket.on(event, function (image) {
			if (event!='') {
				




				socket.broadcast.emit(event, image)
				console.log('eventCatched using code: ',event)
			} else{
				console.log('socket.js ---------> no event')
			}
		})
		console.log('-----Business socket connected-----')
		socket.on('disconnect', () => {
			console.log('----- Socket negocio desconectado-----')			
		})
	} else {
		let visualizationCode = socket.handshake.query.visualizationCode
		let validVisualizationCode = await comproveVisualizationCode(key, visualizationCode)
		console.log(validVisualizationCode)
		if(validVisualizationCode) {
			let usedCodes =  validVisualizationCode.usedCodes
			const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0)
			let currentNumberUses = countOccurrences(usedCodes, visualizationCode)
			if (currentNumberUses>2) {				
				socket.disconnect()
				console.log('El código ha sido usado demasiadas veces, socket desconectado.')
			} else {
				console.log('-----Client socket connected-----')
			}
			console.log('Código usado ', currentNumberUses+1, ' veces')
		} else {
			socket.disconnect()
			console.log('Credenciales de transmisión no válidos, socket desconectado.')
		}
	}

	socket.on('disconnect', () => {
	  console.log('Desconexión')
	})
})