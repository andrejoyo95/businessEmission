let {closeSession} = require('../controllers/closeSession')

async function pCloseSession (req, res) {
    console.log('------------------------------pCloseSession--------------------------------')
    let cookies = req.cookies
    console.log('-.-.-.-.-.-..-.-.-.-..-.-.-.-.-.-.-.-.-.-.-.-.-..-.')
    console.log(cookies)
    let response = await closeSession(cookies.userType, cookies.token, cookies.sessionID)
    console.log('---------------------------AXIOS response---------------------------')
    console.log(response)
    if (response.result=='Doc session deleted') {
        res.cookie('userType', 'business', { maxAge: 0, httpOnly: true })
        res.cookie('token', 'expired', { maxAge: 0, httpOnly: true })
        res.cookie('sessionID', 'expired', { maxAge: 0, httpOnly: true })
        res.cookie('eventStream', 'expired', { maxAge: 0, httpOnly: true })
        res.cookie('idEmission', 'expired', {maxAge: 0, httpOnly: false})
        //res.redirect('/')
        res.redirect('https://ayacuchoseguro.herokuapp.com/logout/business')
    } else{
        res.redirect('/emission')
    }
}

module.exports.pCloseSession = pCloseSession