async function comproveUserCredentials(userType, token, sessionID) {
	let model
	if (userType=='business') {
		model = 'BusinessSession'
	} else if (userType=='user') {
		model = 'UserSession'
	} else {
		return false
	}

	try {
		const businessSession = require('../models/'+ model)
		let doc = await businessSession.findOne({ token: token, _id: sessionID})
		console.log(doc)
		return doc
	} catch (err) {
		console.log('err' + err)
		return false
	}
}

exports.comproveUserCredentials = comproveUserCredentials