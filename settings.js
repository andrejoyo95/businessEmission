let { express } = require('./app')
let { app } = require('./app')
let cookieParser = require('cookie-parser')

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