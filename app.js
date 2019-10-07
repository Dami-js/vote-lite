const express = require('express'),
  expressLayouts = require('express-ejs-layouts'),
  morgan = require('morgan'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  session = require('express-session'),
  passport = require('passport'),
  flash = require('connect-flash')


const app = express()

// express body parser
app.use(express.urlencoded({
  extended: false
}))

// cors
app.use(cors())
// Passport config
// require('./config/passport')(passport)

app.use('/assets', express.static('assets'))

mongoose.connect('mongodb://127.0.0.1:27017/votelux', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected')
}).catch(err => console.log(err))

// set view engine
app.use(expressLayouts);
app.set('view engine', 'ejs');



// express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash()) // now with this we can access req.flash from any where


// global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.login_error = req.flash('error')
  next()
})

// ROUTES
app.use('/', require('./routes/index'))
app.use('/voters', require('./routes/voters'))

// morgan middleware
app.use(morgan('combined'))

// connection
const PORT = process.env.PORT || 5600
app.listen(PORT, console.log(`Server started on http://localhost:${PORT}`))