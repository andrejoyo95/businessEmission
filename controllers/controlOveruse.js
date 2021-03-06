async function controlOveruse(socket, client_usedCode, visualizationCode, clientID, viewers) {
	//console.log('-----------------controlOveruse-----------------')
	const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0)
	let usedCodes = client_usedCode.map(a => a.visualizationCode)
	let currentNumberUses = countOccurrences(usedCodes, visualizationCode)
	if (currentNumberUses>2) {				
		socket.disconnect()
		console.log('El código ha sido usado demasiadas veces, socket desconectado.')
	} else {
		console.log('Cliente conectado. Número de clientes usando el mismo código: ', currentNumberUses+1)
		client_usedCode.push({ clientID : clientID, visualizationCode : visualizationCode })
		viewers[0]++		
		socket.broadcast.emit('viewers', viewers[0])
	}
}

module.exports.controlOveruse = controlOveruse