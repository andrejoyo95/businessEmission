let {comproveSession} = require('../controllers/comproveSession')

async function root (req, res) {
    let cookies = req.cookies
    //console.log(cookies)
    let {userType, token, sessionID} = cookies
	let session = await comproveSession(userType, token, sessionID)
	if (session.keySession) {
		res.redirect('emission')
	} else{
	    res.render('login', {error:''})
	}
}

module.exports.root = root