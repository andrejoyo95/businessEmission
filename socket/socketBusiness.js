async function socketBusiness(socket, eventStream) { //let fs = require('fs')let num = {}
	socket.on(eventStream, function (image) {
		if (eventStream!='') {

			socket.broadcast.emit(eventStream, image)
			console.log('eventCatched using code: ',eventStream)
		} else{
			console.log('socket.js ---------> no eventStream')
		}
	})
	console.log('-----Business socket connected-----')
	
	socket.on('disconnect', () => {
		console.log('----- Socket negocio desconectado-----')			
	})
}

module.exports.socketBusiness = socketBusiness