async function controlOveruse(socket, usedCodes, visualizationCode) {
	const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0)
	
	let currentNumberUses = countOccurrences(usedCodes, visualizationCode)
	if (currentNumberUses>2) {				
		socket.disconnect()
		console.log('El código ha sido usado demasiadas veces, socket desconectado.')
	} else {
		console.log('-----Client socket connected-----')
	}
	console.log('El código', visualizationCode, ' ha sido usado ', currentNumberUses+1, ' veces')
}

module.exports.controlOveruse = controlOveruse