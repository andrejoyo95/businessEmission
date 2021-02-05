let {comproveSession} = require('../controllers/comproveSession')
let {getBusinessName} = require('../controllers/getBusinessName')

async function gEmission (req, res) {
    console.log('------------------------------gEmission--------------------------------')
    let cookies = req.cookies
    console.log(cookies)
    let {userType, token, sessionID} = cookies
    let session = await comproveSession(userType, token, sessionID) //console.log(session)
    if (session.keySession) {
        let ejsData = session
        ejsData.title = 'Emisión'
        ejsData.key = session.keySession
        ejsData.emissionKey = 'apOPENCOh50ssIGw'
        ejsData.error = ''
        ejsData.businessName = await getBusinessName(session.keySession)
        res.render('emission', ejsData)
    } else {
        res.redirect('/')
    }
}

module.exports.gEmission = gEmission