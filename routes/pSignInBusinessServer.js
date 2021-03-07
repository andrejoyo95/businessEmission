const qs = require('querystring')
const { login } = require('../controllers/login')

async function pSignInBusinessServer (req, res) {
    console.log('------------------------------pSignInBusinessServer--------------------------------')
    var body = ''
    req.on('data', function (data) {
        body += data;
        if (body.length > 1e6) req.connection.destroy()
    })
    req.on('end', async function () {
        console.log(body)
        var qsPost = qs.parse(body);
        console.log('qsPost: ', qsPost)
        let response = await login(qsPost['key'], qsPost['user'], qsPost['password'])
        console.log('--------------------------response--------------------------')
        console.log(response)
        if (response.error) {
            console.log(response.error)
            res.render('login', {error: response.error})
        } else {
            res.cookie('userType', 'business', { maxAge: 72000000, httpOnly: true })
            res.cookie('token', response.token, { maxAge: 72000000, httpOnly: true })
            res.cookie('sessionID', response.session, { maxAge: 72000000, httpOnly: true })
            res.cookie('eventStream', response.eventStream, {maxAge: 72000000, httpOnly: false})
            res.cookie('idEmission', response.idEmission, {maxAge: 72000000, httpOnly: false})
            //res.cookie('emissionKey', idEmission, {maxAge: 72000000, httpOnly: false})
            console.log(response)
            //res.send(response)
            //res.redirect('/emission')
            res.redirect('https://ayacuchoseguro.herokuapp.com/loginFromLocal')
        }
    })    
}

module.exports.pSignInBusinessServer = pSignInBusinessServer