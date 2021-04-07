let { io } = require('./socket')
// socket middleware
io.use((socket, next) => {
	console.log()
	console.log('--------------------socket middleware--------------------')
	//console.log(socket.handshake.headers)
	let host = socket.handshake.headers.host
	console.log('host:', host)
	console.log(socket.handshake.query)
	next()
})

let { comproveVisualizationCode } = require('../controllers/comproveVisualizationCode')

io.use(async (socket, next) => {
	let { emissionKey, key, visualizationCode } = socket.handshake.query
	if (emissionKey!='businessEmission'){
		let validVisualizationCode = await comproveVisualizationCode(key, visualizationCode) //console.log(validVisualizationCode)
		if(validVisualizationCode) {
			next()
		} else {
			socket.disconnect()
			console.log('Credenciales de transmisión no válidos, socket desconectado.')
			next(new Error("invalid"))
		}
	} else{
		next()
	}
})