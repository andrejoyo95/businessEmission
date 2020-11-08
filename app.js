const express = require('express');
app = express();
const server = require('http').Server(app);
io = require('socket.io')(server); ///socket.io/socket.io.js
let qs = require('querystring');
let cookieParser = require('cookie-parser'); 

const { pCloseSession } = require('./routes/pCloseSession');
const { pSignInBusinessServer } = require('./routes/pSignInBusinessServer')

/*const log = require('log'),
	log = new Log('debug')*/
const port = process.env.PORT || 5000;

app.use((req, res, next)=>{
  console.log(req.path)
  next()
})
app.use(cookieParser())

app.set('views', (__dirname +'/public/views')); //directory of views
//app.engine('html', require('ejs').renderFile); //if not 'cannot find module html'
app.set('view engine', 'ejs')
//app.set('view engine', 'html') //default extension for views

app.use(express.static(__dirname +'/public'));

/*app.use(function (req, res, next) {
	//comprobar login console.log('Time:', Date.now());
	if (true) {
		sign = 'parts/goIn'
	} else{
		sign = 'parts/goOut'
	}
  next();
});*/

app.get('/', function (req, res) {
    res.render('login', {title: 'Emisión', key: 'nino', emissionKey: 'apOPENCOh50ssIGw', error:''})
})

app.post('/signInBusinessServer', async function (req, res) {
	console.log('enebdeufyvenebdeufyvenebdeufyvenebdeufyvenebdeufyvenebdeufyvenebdeufyvenebdeufyvenebdeufyvenebdeufyvenebdeufyv')
	var body = ''
    req.on('data', function (data) {
        body += data;
        if (body.length > 1e6) req.connection.destroy()
	})
	req.on('end', async function () {
		console.log(body)
		var qsPost = qs.parse(body);
		console.log('qsPost: ', qsPost)
		let response = await pSignInBusinessServer(qsPost['key'], qsPost['user'], qsPost['password'])
		console.log('--------------------------response--------------------------')
		console.log(response)
		if (response.error) {
			console.log(response.error)
			res.render('login', {title: 'Emisión', key: 'nino', emissionKey: 'apOPENCOh50ssIGw', error: response.error})
		} else {
			res.cookie('userType', 'business', { maxAge: 300000, httpOnly: true })
			res.cookie('token', response.token, { maxAge: 300000, httpOnly: true })
			res.cookie('bSessionID', response.session, { maxAge: 300000, httpOnly: true })
			res.cookie('eventStream', response.eventStream, {maxAge: 300000, httpOnly: false})
			res.cookie('idEmission', response.idEmission, {maxAge: 300000, httpOnly: false})
			//res.cookie('emissionKey', idEmission, {maxAge: 300000, httpOnly: false})
			console.log(response)
			//res.send(response)
			res.redirect('/emission')
		}
	})
})
app.post('/closeSession', async function (req, res) {
	let cookies = req.cookies
	console.log('-.-.-.-.-.-..-.-.-.-..-.-.-.-.-.-.-.-.-.-.-.-.-..-.')
	console.log(cookies)
	let response = await pCloseSession(cookies.userType, cookies.token, cookies.bSessionID)
	console.log('---------------------------AXIOS response---------------------------')
	console.log(response)
	if (response.result=='Doc session deleted') {
		res.cookie('userType', 'business', { maxAge: 0, httpOnly: true })
		res.cookie('token', 'expired', { maxAge: 0, httpOnly: true })
		res.cookie('bSessionID', 'expired', { maxAge: 0, httpOnly: true })
		res.cookie('eventStream', 'expired', { maxAge: 0, httpOnly: true })
		res.cookie('idEmission', 'expired', {maxAge: 0, httpOnly: false})
		res.redirect('/')
	} else{
		res.redirect('/emission')
	}
})
app.get('/emission', function (req, res) {
	let logged = true
	if (logged) {
		res.render('emission', {title: 'Emisión', key: 'nino', emissionKey: 'apOPENCOh50ssIGw', error: ''})
	} else {
		res.redirect('/')
	}
})

app.get('*', function(req, res) {
    res.redirect('/');
})

require('./socket/socket');

server.listen(port, function() {
	console.log('Server on port ',port);
	//log.info('Servidor escuchando a través del puerto ',port)
})
