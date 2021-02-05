let { app } = require('../app')
const { root } = require('./root');
const { pSignInBusinessServer } = require('./pSignInBusinessServer')
const { gEmission } = require('./gEmission')
const { pCloseSession } = require('./pCloseSession');

app.get('/', root)
app.post('/signInBusinessServer', pSignInBusinessServer)
app.get('/emission', gEmission)
app.post('/closeSession', pCloseSession)

app.get('*', function(req, res) {
    res.redirect('/')
})