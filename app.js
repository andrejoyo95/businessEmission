const express = require('express')
let app = express() //refactoring app = express();
const server = require('http').Server(app); //refactoring io = require('socket.io')(server); ///socket.io/socket.io.js

module.exports.express = express
module.exports.app = app
module.exports.server = server

/*const log = require('log'),
	log = new Log('debug')*/
require('./settings')
require('./routes/router')
require('./socket/socket')

const port = process.env.PORT || 5000;
server.listen(port, function() {
	console.log('Server on port ',port);
	//log.info('Servidor escuchando a través del puerto ',port)
})

module.exports.port = port