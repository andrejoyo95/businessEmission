let { io } = require('./socket')
// socket middleware
io.use((socket, next) => {
	console.log()
	console.log()
	console.log('--------------------socket middleware--------------------')
	//console.log(socket.handshake.headers)
	let host = socket.handshake.headers.host
	if(host==='localhost:5000'){ 
		console.log('host admitido')
		next()
	} else {
		next(new Error('Host authentication error'))
	}
	//console.log(host)
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