//let {getHosts} = require('../controllers/getHosts')
//let {comproveEmissionKey} = require('../controllers/comproveEmissionKey')
let {comproveVisualizationCode} = require('../controllers/comproveVisualizationCode')
//let {addUsedCode} = require('../controllers/addUsedCode')

// middleware
io.use((socket, next) => {
	console.log('middleware middleware middleware middleware middleware')
	console.log(socket.handshake.headers)
	let host = socket.handshake.headers.host
	//let hosts = hosts.includes(host) getHosts()
	if(host==='localhost:5000'){ 
		console.log('host admitido')
		console.log(host)
		next()
	} else {
		next(new Error('Host authentication error'))
	}
	/*if(validHost){console.log('host admitido')next()} else {next(new Error('Host authentication error'))}*///next()
	console.log(host)
	next()
})
io.on('connection', async function(socket) {
	let emissionKey = socket.handshake.query.emissionKey
	let event = socket.handshake.query.eventStream
 	let key = socket.handshake.query.key
	console.log('emissionKey: ', emissionKey, 'event: ', event, 'key: ', key)
	console.log('socketsocketsocketsocketsocketsocketsocket')
	console.log('COOKIE: ', socket.handshake.headers.cookie)
//si idEmission(emissionKey) es válido, escuchar evento correspondiente en servidor(socket.on(event)) y emitir(socket.broadcast.emit(event))
	//let validEmissionKey = await comproveEmissionKey(key, emissionKey)
	
	// COMPROBAR VALIDEZ DE EMISSIONKEY
	
	if (emissionKey) { //code==='emission'  validEmissionKey
		var fs = require('fs');
		let num = {}
		socket.on(event, function (image) {
			if (event!='') {
				if (num.event) {
					num.event++
				} else {
					num.event = 1
				}
				function decodeBase64Image(dataString) {
					var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
					  response = {};
				  
					if (matches.length !== 3) {
					  return new Error('Invalid input string');
					}
				  
					response.type = matches[1];
					response.data = new Buffer(matches[2], 'base64');
				  
					return response;
				}
				let img = decodeBase64Image(image)
				console.log('------------')
				console.log(num)
				console.log(typeof(num.event))
				let name = event+num.event+".jpg"
				console.log(name)
				fs.writeFile(name, img.data, function(err) { //... 
					console.log(num)
					console.log('err: ', err)
					console.log(typeof(img))
					console.log(typeof(image))
					console.log(img)
				})
				
				if (num.event===50){
					let images = []
					for (let i = 1; i < num.event; i++) {
 
						images.push(event+i+".jpg")
						
					}
					console.log('........................')
					console.log('........................')
					console.log('........................')
					console.log('........................')
					console.log('........................')
					console.log(images)
					var videoshow = require('videoshow')
					var videoOptions = {
						fps: 25, //loop: 5, // seconds transition: true, transitionDuration: 0.1, // seconds
						videoBitrate: 1024,
						videoCodec: 'libx264',
						size: '640x?', //audioBitrate: '128k', audioChannels: 2,
						format: 'mp4',
						pixelFormat: 'yuv420p'
					}
						
					videoshow(images, videoOptions)
					.save(event+'.mp4')
					.on('start', function (command) {
						console.log('ffmpeg process started:', command)
					})
					.on('error', function (err, stdout, stderr) {
						console.error('Error:', err)
						console.error('ffmpeg stderr:', stderr)
					})
					.on('end', function (output) {
						console.error('Video created in:', output)
					})
				}
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
		console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq')
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
			//await addUsedCode(key, visualizationCode) //is called on visualizationcodesServices
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