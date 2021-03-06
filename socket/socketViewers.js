async function socketViewers(socket) {
	//console.log('-----Viewers socket connected-----')
	socket.join('viewersRoom')
    
	socket.on('disconnect', () => {
		console.log('----- Socket viewers desconectado-----')
	})
}

module.exports.socketViewers = socketViewers