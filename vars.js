let env
try {
	env = require('../index').env
	console.log(env)
} catch {
	console.log(env)
}
console.log('---------------vars: env---------------')
console.log(env)

let urls = {}
if (env==='dev') {
    businessLogInOut = 'http://localhost:7000/',
    businessSessionsURL = 'http://localhost:9000/',
    businessInfoURL = 'http://localhost:9001/'
} else {
    businessLogInOut = 'https://sign-in-business-services.herokuapp.com/',
    businessSessionsURL = 'https://business-sessions.herokuapp.com/'
    businessInfoURL = 'https://business-info.herokuapp.com/'
}

module.exports = {
    businessLogInOut,
	businessSessionsURL,
    businessInfoURL
}