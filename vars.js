let env
//console.log('---------------vars: env---------------')
try {
	env = require('../index').env
	//console.log('env: ', env)
} catch {
    //console.log('env: ', env)
}

if (env==='dev') {
    businessLogInOut = 'http://localhost:7000/',
    businessSessionsURL = 'http://localhost:9002/',
    businessInfoURL = 'http://localhost:9001/',
    visualizationCodesServices = 'http://localhost:9000/'
} else {
    businessLogInOut = 'https://sign-in-business-services.herokuapp.com/',
    businessSessionsURL = 'https://business-sessions.herokuapp.com/'
    businessInfoURL = 'https://business-info.herokuapp.com/',
    visualizationCodesServices = 'https://visualization-codes-services.herokuapp.com/'
}

module.exports = {
    businessLogInOut,
	businessSessionsURL,
    businessInfoURL,
    visualizationCodesServices
}