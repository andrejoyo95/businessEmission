//let messageOnConsole = false
async function socketBusiness(socket, eventStream) { //let fs = require('fs')let num = {}
	console.log('-----Business socket connected-----')
	socket.on(eventStream, function (image) {
		//if (!messageOnConsole) emissionWarning()
		socket.broadcast.emit(eventStream, image)
	})
	socket.on('disconnect', () => {
		console.log('----- Socket negocio desconectado-----')			
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