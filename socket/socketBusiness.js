//let messageOnConsole = false
let sessionClosed
async function socketBusiness(socket, eventStream, client_usedCode, io) { //let fs = require('fs')let num = {}
	//console.log('-----Business socket connected-----')
	sessionClosed = false
	socket.on(eventStream, function (image) {
		//if (!messageOnConsole) emissionWarning()
		socket.broadcast.emit(eventStream, image)
	})
	socket.on('disconnect', () => {
		console.log('----- Socket negocio desconectado-----')
		if (!sessionClosed){
			let clientsIDs = client_usedCode.map(element => element.clientID)
			let clientsDisconnected = 0
			clientsIDs.forEach(element => {
				io.sockets.connected[element].disconnect()
				clientsDisconnected++
			})
			console.log(`Al cerrar sesión, se ha desconectado a ${clientsDisconnected} espectadores`)
			sessionClosed = true
		}
	})
}

module.exports.socketBusiness = socketBusiness

/*function emissionWarning() {
	process.stdout.write("Emitiendo")
	messageOnConsole = true
	setTimeout(function () {
		process.stdout.clearLine()
		setTimeout(function () {
			messageOnConsole = false
		}, 1000)
	}, 2000)
	process.stdout.cursorTo(0)
}*/