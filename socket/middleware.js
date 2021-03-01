let { io } = require('./socket')
// socket middleware
io.use((socket, next) => {
	//console.log('socket middleware')
	//console.log(socket.handshake.headers)
	let host = socket.handshake.headers.host
	if(host==='localhost:5000'){ 
		console.log('host admitido')
		next()
	} else {
		next(new Error('Host authentication error'))
	}
	console.log(host)
	next()
})